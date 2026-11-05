#!/usr/bin/env python3

import base64
import json
import os
import sys
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parent.parent
ENV_PATH = ROOT / ".env.local"


def load_env_file(path: Path) -> None:
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
        raise SystemExit(f"Missing required env var: {name}")
    return value


def main() -> int:
    load_env_file(ENV_PATH)

    site_url = require_env("WORDPRESS_SITE_URL").rstrip("/")
    username = require_env("WORDPRESS_USERNAME")
    app_password = require_env("WORDPRESS_APPLICATION_PASSWORD").replace(" ", "")

    credentials = f"{username}:{app_password}".encode("utf-8")
    auth_header = base64.b64encode(credentials).decode("ascii")

    endpoint = f"{site_url}/wp-json/wp/v2/users/me"
    request = Request(
        endpoint,
        headers={
            "Authorization": f"Basic {auth_header}",
            "Accept": "application/json",
            "User-Agent": "Codex-WordPress-Checker/1.0",
        },
    )

    try:
        with urlopen(request, timeout=20) as response:
            payload = json.load(response)
    except HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        print(f"HTTP {exc.code} while calling {endpoint}")
        print(body[:1000])
        return 1
    except URLError as exc:
        print(f"Network error while calling {endpoint}: {exc}")
        return 1

    print("WordPress API connection successful")
    print(f"Site: {site_url}")
    print(f"Authenticated user: {payload.get('name') or payload.get('slug')}")
    print(f"User id: {payload.get('id')}")
    print(f"Roles: {', '.join(payload.get('roles', []))}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
