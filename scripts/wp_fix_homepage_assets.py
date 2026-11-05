#!/usr/bin/env python3

import argparse
import json
import re
from datetime import datetime
from pathlib import Path
from typing import Any, Optional
from urllib.parse import urlparse
from urllib.request import urlopen
import xml.etree.ElementTree as ET

from wp_api import ROOT, WordPressAPI


HOMEPAGE_ID = 2206
OLD_DOMAIN = "https://darkgray-eland-964548.hostingersite.com"
NEW_DOMAIN = "https://crea8ivmedia.com"
BACKUP_DIR = ROOT / "backups"


IMG_TAG_RE = re.compile(r"<img\b[^>]*>", re.IGNORECASE | re.DOTALL)
SRC_RE = re.compile(r'\bsrc=(["\'])(.*?)\1', re.IGNORECASE | re.DOTALL)
WIDTH_RE = re.compile(r"\bwidth=(['\"])(.*?)\1", re.IGNORECASE | re.DOTALL)
HEIGHT_RE = re.compile(r"\bheight=(['\"])(.*?)\1", re.IGNORECASE | re.DOTALL)
NUMERIC_VALUE_RE = re.compile(r"^\d+(?:\.\d+)?$")


def normalize_url(url: str) -> str:
    return url.replace(OLD_DOMAIN, NEW_DOMAIN)


def looks_like_svg(url: str, content_type: Optional[str]) -> bool:
    parsed = urlparse(url)
    if parsed.path.lower().endswith(".svg"):
        return True
    return bool(content_type and "svg" in content_type.lower())


def get_svg_size(raw: bytes) -> Optional[tuple[int, int]]:
    try:
        root = ET.fromstring(raw.decode("utf-8", errors="ignore"))
    except ET.ParseError:
        return None

    width = root.attrib.get("width", "").strip()
    height = root.attrib.get("height", "").strip()
    if width and height:
        width = width.replace("px", "")
        height = height.replace("px", "")
        if NUMERIC_VALUE_RE.match(width) and NUMERIC_VALUE_RE.match(height):
            return int(float(width)), int(float(height))

    view_box = root.attrib.get("viewBox", "").strip()
    if view_box:
        parts = re.split(r"[,\s]+", view_box)
        if len(parts) == 4 and all(NUMERIC_VALUE_RE.match(part) for part in parts):
            return int(float(parts[2])), int(float(parts[3]))

    return None


def get_jpeg_size(raw: bytes) -> Optional[tuple[int, int]]:
    if len(raw) < 4 or raw[0:2] != b"\xff\xd8":
        return None

    offset = 2
    while offset < len(raw):
        if raw[offset] != 0xFF:
            offset += 1
            continue
        while offset < len(raw) and raw[offset] == 0xFF:
            offset += 1
        if offset >= len(raw):
            return None
        marker = raw[offset]
        offset += 1
        if marker in {0xD8, 0xD9}:
            continue
        if offset + 1 >= len(raw):
            return None
        block_length = int.from_bytes(raw[offset:offset + 2], "big")
        if block_length < 2 or offset + block_length > len(raw):
            return None
        if marker in {
            0xC0, 0xC1, 0xC2, 0xC3,
            0xC5, 0xC6, 0xC7,
            0xC9, 0xCA, 0xCB,
            0xCD, 0xCE, 0xCF,
        }:
            if offset + 7 >= len(raw):
                return None
            height = int.from_bytes(raw[offset + 3:offset + 5], "big")
            width = int.from_bytes(raw[offset + 5:offset + 7], "big")
            return width, height
        offset += block_length
    return None


def get_png_size(raw: bytes) -> Optional[tuple[int, int]]:
    if len(raw) >= 24 and raw[:8] == b"\x89PNG\r\n\x1a\n":
        return int.from_bytes(raw[16:20], "big"), int.from_bytes(raw[20:24], "big")
    return None


def get_gif_size(raw: bytes) -> Optional[tuple[int, int]]:
    if len(raw) >= 10 and raw[:6] in {b"GIF87a", b"GIF89a"}:
        return int.from_bytes(raw[6:8], "little"), int.from_bytes(raw[8:10], "little")
    return None


def get_webp_size(raw: bytes) -> Optional[tuple[int, int]]:
    if len(raw) < 30 or raw[:4] != b"RIFF" or raw[8:12] != b"WEBP":
        return None

    chunk = raw[12:16]
    if chunk == b"VP8 " and len(raw) >= 30:
        return int.from_bytes(raw[26:28], "little") & 0x3FFF, int.from_bytes(raw[28:30], "little") & 0x3FFF
    if chunk == b"VP8L" and len(raw) >= 25:
        bits = int.from_bytes(raw[21:25], "little")
        width = (bits & 0x3FFF) + 1
        height = ((bits >> 14) & 0x3FFF) + 1
        return width, height
    if chunk == b"VP8X" and len(raw) >= 30:
        width = int.from_bytes(raw[24:27] + b"\x00", "little") + 1
        height = int.from_bytes(raw[27:30] + b"\x00", "little") + 1
        return width, height
    return None


def get_raster_size(raw: bytes) -> Optional[tuple[int, int]]:
    for parser in (get_png_size, get_gif_size, get_webp_size, get_jpeg_size):
        size = parser(raw)
        if size:
            return size
    return None


def get_image_size(url: str, cache: dict[str, Optional[tuple[int, int]]]) -> Optional[tuple[int, int]]:
    url = normalize_url(url)
    if url in cache:
        return cache[url]

    try:
        with urlopen(url, timeout=30) as response:
            raw = response.read()
            content_type = response.headers.get("Content-Type", "")
    except Exception:
        cache[url] = None
        return None

    size = None
    if looks_like_svg(url, content_type):
        size = get_svg_size(raw)
    else:
        size = get_raster_size(raw)

    cache[url] = size
    return size


def inject_dimensions(img_tag: str, size: Optional[tuple[int, int]]) -> str:
    if not size:
        return img_tag

    width, height = size
    updated = img_tag
    if not WIDTH_RE.search(updated):
        updated = updated.replace("<img", f'<img width="{width}"', 1)
    if not HEIGHT_RE.search(updated):
        updated = updated.replace("<img", f'<img height="{height}"', 1)
    return updated


def update_img_tag(img_tag: str, cache: dict[str, Optional[tuple[int, int]]], stats: dict[str, int]) -> str:
    src_match = SRC_RE.search(img_tag)
    if not src_match:
        return img_tag

    src = src_match.group(2)
    normalized_src = normalize_url(src)
    updated = img_tag

    if normalized_src != src:
        updated = updated.replace(src, normalized_src, 1)
        stats["staging_refs_replaced"] += 1

    if not WIDTH_RE.search(updated) or not HEIGHT_RE.search(updated):
        size = get_image_size(normalized_src, cache)
        if size:
            new_tag = inject_dimensions(updated, size)
            if new_tag != updated:
                stats["img_dimensions_added"] += 1
                updated = new_tag
        else:
            stats["img_dimension_lookups_failed"] += 1

    return updated


def update_markup(markup: str, cache: dict[str, Optional[tuple[int, int]]], stats: dict[str, int]) -> str:
    updated = normalize_url(markup)
    if updated != markup:
        stats["string_domain_replacements"] += markup.count(OLD_DOMAIN)

    def repl(match: re.Match[str]) -> str:
        return update_img_tag(match.group(0), cache, stats)

    return IMG_TAG_RE.sub(repl, updated)


def walk(node: Any, cache: dict[str, Optional[tuple[int, int]]], stats: dict[str, int]) -> Any:
    if isinstance(node, dict):
        return {key: walk(value, cache, stats) for key, value in node.items()}
    if isinstance(node, list):
        return [walk(value, cache, stats) for value in node]
    if isinstance(node, str):
        if OLD_DOMAIN in node or "<img" in node.lower():
            return update_markup(node, cache, stats)
        return node
    return node


def count_occurrences(node: Any, needle: str) -> int:
    if isinstance(node, dict):
        return sum(count_occurrences(value, needle) for value in node.values())
    if isinstance(node, list):
        return sum(count_occurrences(value, needle) for value in node)
    if isinstance(node, str):
        return node.count(needle)
    return 0


def save_backup(raw_elementor_data: str) -> Path:
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_path = BACKUP_DIR / f"homepage_elementor_data_{timestamp}.json"
    backup_path.write_text(raw_elementor_data)
    return backup_path


def main() -> None:
    parser = argparse.ArgumentParser(description="Fix homepage Elementor asset URLs and image dimensions.")
    parser.add_argument("--apply", action="store_true", help="Write changes back to WordPress.")
    args = parser.parse_args()

    api = WordPressAPI()
    page = api.request_json(
        "GET",
        f"/wp-json/wp/v2/pages/{HOMEPAGE_ID}",
        params={"context": "edit", "_fields": "id,slug,meta"},
    )

    raw_elementor_data = page["meta"]["_elementor_data"]
    elementor_data = json.loads(raw_elementor_data)

    before_staging_refs = count_occurrences(elementor_data, OLD_DOMAIN)
    stats = {
        "before_staging_refs": before_staging_refs,
        "string_domain_replacements": 0,
        "staging_refs_replaced": 0,
        "img_dimensions_added": 0,
        "img_dimension_lookups_failed": 0,
    }
    size_cache: dict[str, Optional[tuple[int, int]]] = {}

    updated_elementor_data = walk(elementor_data, size_cache, stats)
    after_staging_refs = count_occurrences(updated_elementor_data, OLD_DOMAIN)
    stats["after_staging_refs"] = after_staging_refs

    updated_raw = json.dumps(updated_elementor_data, separators=(",", ":"))

    print(json.dumps(stats, indent=2))

    if updated_raw == raw_elementor_data:
        print("No changes detected.")
        return

    backup_path = save_backup(raw_elementor_data)
    print(f"Backup saved to {backup_path}")

    if not args.apply:
        print("Dry run only. Re-run with --apply to update WordPress.")
        return

    api.update_item("pages", HOMEPAGE_ID, {"meta": {"_elementor_data": updated_raw}})
    print("Homepage Elementor data updated.")


if __name__ == "__main__":
    main()
