#!/usr/bin/env python3

import argparse
import json
import sys
from pathlib import Path

from wp_api import WordPressAPI, WordPressAPIError


def load_updates(path: str) -> list[dict[str, object]]:
    data = json.loads(Path(path).read_text(encoding="utf-8"))
    if not isinstance(data, list):
        raise ValueError("Update file must contain a JSON list.")
    return data


def main() -> int:
    parser = argparse.ArgumentParser(description="Apply a batch of live WordPress page/post updates.")
    parser.add_argument("--file", required=True, help="Path to a JSON file containing updates.")
    parser.add_argument("--dry-run", action="store_true", help="Print updates without sending them.")
    args = parser.parse_args()

    try:
        updates = load_updates(args.file)
    except Exception as exc:
        print(f"Failed to load updates: {exc}", file=sys.stderr)
        return 1

    if args.dry_run:
        print(json.dumps(updates, indent=2, ensure_ascii=False))
        return 0

    try:
        api = WordPressAPI()
        for update in updates:
            content_type = str(update["type"])
            item_id = int(update["id"])
            payload = dict(update["payload"])
            result = api.update_item(content_type, item_id, payload)
            print(
                f"Updated {content_type}:{result.get('id')} "
                f"slug={result.get('slug')} status={result.get('status')}"
            )
    except (KeyError, TypeError, ValueError) as exc:
        print(f"Invalid update format: {exc}", file=sys.stderr)
        return 1
    except WordPressAPIError as exc:
        print(str(exc), file=sys.stderr)
        return 1

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
