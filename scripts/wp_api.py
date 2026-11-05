#!/usr/bin/env python3

import base64
import json
import os
from pathlib import Path
from typing import Any, Optional
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parent.parent
ENV_PATH = ROOT / ".env.local"


class WordPressAPIError(RuntimeError):
    pass


def load_env_file(path: Path = ENV_PATH) -> None:
    if not path.exists():
        return

    for raw_line in path.read_text().splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip())


def require_env(name: str) -> str:
    value = os.environ.get(name, "").strip()
    if not value:
        raise WordPressAPIError(f"Missing required env var: {name}")
    return value


class WordPressAPI:
    def __init__(self) -> None:
        load_env_file()
        self.site_url = require_env("WORDPRESS_SITE_URL").rstrip("/")
        self.username = require_env("WORDPRESS_USERNAME")
        password = require_env("WORDPRESS_APPLICATION_PASSWORD").replace(" ", "")
        token = base64.b64encode(f"{self.username}:{password}".encode("utf-8")).decode("ascii")
        self.headers = {
            "Authorization": f"Basic {token}",
            "Accept": "application/json",
            "Content-Type": "application/json",
            "User-Agent": "Codex-WordPress-Workflow/1.0",
        }

    def request_json(
        self,
        method: str,
        path: str,
        *,
        params: Optional[dict[str, Any]] = None,
        payload: Optional[dict[str, Any]] = None,
    ) -> Any:
        url = f"{self.site_url}{path}"
        if params:
            url = f"{url}?{urlencode(params, doseq=True)}"

        data = None
        if payload is not None:
            data = json.dumps(payload).encode("utf-8")

        request = Request(url, data=data, headers=self.headers, method=method.upper())

        try:
            with urlopen(request, timeout=30) as response:
                return json.load(response)
        except HTTPError as exc:
            body = exc.read().decode("utf-8", errors="replace")
            raise WordPressAPIError(f"HTTP {exc.code} for {url}\n{body[:1200]}") from exc
        except URLError as exc:
            raise WordPressAPIError(f"Network error for {url}: {exc}") from exc

    def get_items(self, content_type: str, *, per_page: int = 100, page: int = 1, fields: Optional[list[str]] = None) -> list[dict[str, Any]]:
        params: dict[str, Any] = {"per_page": per_page, "page": page}
        if fields:
            params["_fields"] = ",".join(fields)
        return self.request_json("GET", f"/wp-json/wp/v2/{content_type}", params=params)

    def get_all_items(self, content_type: str, *, fields: Optional[list[str]] = None, limit: Optional[int] = None) -> list[dict[str, Any]]:
        items: list[dict[str, Any]] = []
        page = 1

        while True:
            batch = self.get_items(content_type, per_page=100, page=page, fields=fields)
            if not batch:
                break
            items.extend(batch)
            if limit is not None and len(items) >= limit:
                return items[:limit]
            if len(batch) < 100:
                break
            page += 1

        return items

    def update_item(self, content_type: str, item_id: int, payload: dict[str, Any]) -> dict[str, Any]:
        return self.request_json("POST", f"/wp-json/wp/v2/{content_type}/{item_id}", payload=payload)
