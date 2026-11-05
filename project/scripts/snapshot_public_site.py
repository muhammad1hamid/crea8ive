#!/usr/bin/env python3
"""Create a portable JSON snapshot and mirror downloadable page assets."""

from __future__ import annotations

import argparse
import json
import mimetypes
import re
import shutil
import sys
from hashlib import sha1
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import unquote, urlsplit
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
RAW_PAGES = ROOT / "database/snapshots/wordpress-pages.raw.json"
OUTPUT = ROOT / "public-website/astro/src/data/pages.json"
PUBLIC = ROOT / "public-website/astro/public"
REPORT = ROOT / "documentation/ASSET_MIRROR_REPORT.md"
WP_API = (
    "https://crea8ivmedia.com/wp-json/wp/v2/pages"
    "?per_page=100&status=publish"
    "&_fields=id,slug,link,title,content,excerpt,parent,menu_order,yoast_head_json"
)
URL_RE = re.compile(r"https?://[^\s\"'<>\\)]+", re.I)
DOWNLOAD_EXTENSIONS = {
    ".avif", ".css", ".gif", ".ico", ".jpeg", ".jpg", ".js", ".json",
    ".mp3", ".mp4", ".ogg", ".png", ".svg", ".webm", ".webp", ".woff",
    ".woff2",
}
INTERNAL_HOSTS = {"crea8ivmedia.com", "www.crea8ivmedia.com"}
ASSET_HOSTS = {
    "assets2.lottiefiles.com", "assets5.lottiefiles.com",
    "assets7.lottiefiles.com", "assets9.lottiefiles.com",
    "assets10.lottiefiles.com", "cdn.trustindex.io",
    "cdnjs.cloudflare.com", "crea8ivmedia.com", "images.unsplash.com",
    "lh3.googleusercontent.com", "lh5.googleusercontent.com", "unpkg.com",
    "www.crea8ivmedia.com",
}


def fetch(url: str) -> tuple[bytes, str]:
    request = Request(url, headers={"User-Agent": "Crea8ivMigration/1.0"})
    with urlopen(request, timeout=30) as response:
        return response.read(), response.headers.get_content_type()


def asset_path(url: str, content_type: str = "") -> Path:
    parsed = urlsplit(url)
    suffix = Path(parsed.path).suffix.lower()
    if not suffix:
        suffix = mimetypes.guess_extension(content_type) or ".bin"
    base = Path(unquote(parsed.path)).name or "asset"
    stem = Path(base).stem[:80] or "asset"
    digest = sha1(url.encode("utf-8")).hexdigest()[:12]
    return Path("assets/mirror") / parsed.netloc / f"{stem}-{digest}{suffix}"


def is_downloadable(url: str) -> bool:
    parsed = urlsplit(url)
    suffix = Path(parsed.path).suffix.lower()
    if suffix in DOWNLOAD_EXTENSIONS:
        return True
    if parsed.netloc in INTERNAL_HOSTS:
        return parsed.path.startswith("/wp-content/")
    return parsed.netloc in ASSET_HOSTS


def normalize_link(url: str) -> str:
    parsed = urlsplit(url)
    if parsed.netloc in INTERNAL_HOSTS:
        return parsed.path or "/"
    return url


def mirror_url(url: str, failures: list[str], mirrored: dict[str, str]) -> str:
    if url in mirrored:
        return mirrored[url]
    if not is_downloadable(url):
        return normalize_link(url)
    try:
        data, content_type = fetch(url)
    except (HTTPError, URLError, TimeoutError, ValueError) as error:
        failures.append(f"- `{url}`: `{error}`")
        return url
    relative = asset_path(url, content_type)
    destination = PUBLIC / relative
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_bytes(data)
    local_url = f"/{relative.as_posix()}"
    mirrored[url] = local_url
    return local_url


def rewrite_html(html: str, failures: list[str], mirrored: dict[str, str]) -> str:
    return URL_RE.sub(lambda match: mirror_url(match.group(0), failures, mirrored), html)


def rewrite_nested(value, failures: list[str], mirrored: dict[str, str]):
    if isinstance(value, dict):
        return {key: rewrite_nested(item, failures, mirrored) for key, item in value.items()}
    if isinstance(value, list):
        return [rewrite_nested(item, failures, mirrored) for item in value]
    if isinstance(value, str):
        return rewrite_html(value, failures, mirrored)
    return value


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--fetch-pages", action="store_true", help="Refresh the raw public REST snapshot.")
    parser.add_argument("--skip-assets", action="store_true", help="Only normalize pages JSON.")
    args = parser.parse_args()

    if args.fetch_pages:
        data, _ = fetch(WP_API)
        RAW_PAGES.parent.mkdir(parents=True, exist_ok=True)
        RAW_PAGES.write_bytes(data)
    if not RAW_PAGES.exists():
        raise SystemExit(f"Missing snapshot: {RAW_PAGES}")

    pages = json.loads(RAW_PAGES.read_text(encoding="utf-8"))
    failures: list[str] = []
    mirrored: dict[str, str] = {}
    normalized = []
    for page in pages:
        html = page.get("content", {}).get("rendered", "")
        excerpt = page.get("excerpt", {}).get("rendered", "")
        if not args.skip_assets:
            html = rewrite_html(html, failures, mirrored)
            excerpt = rewrite_html(excerpt, failures, mirrored)
        normalized.append(
            {
                "id": page["id"],
                "slug": page["slug"],
                "link": normalize_link(page.get("link", f"/{page['slug']}/")),
                "title": page.get("title", {}).get("rendered", page["slug"]),
                "content": html,
                "excerpt": excerpt,
                "parent": page.get("parent", 0),
                "menuOrder": page.get("menu_order", 0),
                "seo": rewrite_nested(page.get("yoast_head_json", {}), failures, mirrored) if not args.skip_assets else page.get("yoast_head_json", {}),
            }
        )

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(normalized, ensure_ascii=False, indent=2), encoding="utf-8")
    REPORT.write_text(
        "# Asset Mirror Report\n\n"
        f"- Pages snapshotted: `{len(normalized)}`\n"
        f"- Assets mirrored: `{len(mirrored)}`\n"
        f"- Download failures: `{len(failures)}`\n\n"
        "## Unresolved Downloads\n\n"
        + ("\n".join(failures) if failures else "None.\n"),
        encoding="utf-8",
    )
    shutil.copy2(RAW_PAGES, ROOT / "database/snapshots/wordpress-pages.latest.json")
    print(f"Snapshotted {len(normalized)} pages and mirrored {len(mirrored)} assets.")
    if failures:
        print(f"{len(failures)} downloads remain unresolved; see {REPORT}.", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
