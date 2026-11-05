#!/usr/bin/env python3

import argparse
import json
import sys
from pathlib import Path
from typing import Optional

from wp_api import WordPressAPI, WordPressAPIError


def load_text(path: Optional[str]) -> Optional[str]:
    if not path:
        return None
    return Path(path).read_text(encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description="Update a live WordPress page or post.")
    parser.add_argument("--type", choices=["pages", "posts"], required=True)
    parser.add_argument("--id", type=int, required=True)
    parser.add_argument("--title")
    parser.add_argument("--excerpt")
    parser.add_argument("--excerpt-file")
    parser.add_argument("--content")
    parser.add_argument("--content-file")
    parser.add_argument("--status", choices=["draft", "publish", "private"])
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    payload: dict[str, object] = {}
    if args.title is not None:
        payload["title"] = args.title
    if args.excerpt is not None:
        payload["excerpt"] = args.excerpt
    if args.excerpt_file:
        payload["excerpt"] = load_text(args.excerpt_file)
    if args.content is not None:
        payload["content"] = args.content
    if args.content_file:
        payload["content"] = load_text(args.content_file)
    if args.status is not None:
        payload["status"] = args.status

    if not payload:
        print("No update fields provided.", file=sys.stderr)
        return 1

    if args.dry_run:
        print(json.dumps(payload, indent=2, ensure_ascii=False))
        return 0

    try:
        api = WordPressAPI()
        result = api.update_item(args.type, args.id, payload)
    except WordPressAPIError as exc:
        print(str(exc), file=sys.stderr)
        return 1

    print("WordPress content update successful")
    print(f"Type: {args.type}")
    print(f"ID: {result.get('id')}")
    print(f"Slug: {result.get('slug')}")
    print(f"Status: {result.get('status')}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
