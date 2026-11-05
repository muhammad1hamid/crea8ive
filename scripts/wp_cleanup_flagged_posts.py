#!/usr/bin/env python3

import argparse
import csv
import json
import re
import sys
import time
from pathlib import Path
from typing import Any

from wp_api import WordPressAPI, WordPressAPIError


DEFAULT_PATTERN = r"(casino|slots|bingo|blackjack|roulette|deposit|bonus|bet|gambl|rummy|poker)"
FIELDS = ["id", "slug", "status", "title", "date", "modified"]


def normalize_title(item: dict[str, Any]) -> str:
    title = (item.get("title") or {}).get("rendered", "")
    return " ".join(str(title).split())


def find_flagged_posts(posts: list[dict[str, Any]], pattern: re.Pattern[str]) -> list[dict[str, Any]]:
    flagged: list[dict[str, Any]] = []
    for item in posts:
        slug = str(item.get("slug", ""))
        title = normalize_title(item)
        status = str(item.get("status", ""))
        if pattern.search(slug) or pattern.search(title):
            flagged.append(
                {
                    "id": int(item["id"]),
                    "slug": slug,
                    "status": status,
                    "title": title,
                    "date": str(item.get("date", "")),
                    "modified": str(item.get("modified", "")),
                }
            )
    return flagged


def write_csv(path: Path, rows: list[dict[str, Any]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=FIELDS)
        writer.writeheader()
        writer.writerows(rows)


def write_json(path: Path, rows: list[dict[str, Any]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(rows, indent=2, ensure_ascii=False), encoding="utf-8")


def apply_draft_updates(
    api: WordPressAPI,
    rows: list[dict[str, Any]],
    *,
    retries: int,
    pause_seconds: float,
) -> None:
    updated = 0
    skipped = 0
    failed = 0
    missing = 0
    for row in rows:
        if row["status"] == "draft":
            skipped += 1
            continue
        last_error = None
        for attempt in range(1, retries + 1):
            try:
                result = api.update_item("posts", int(row["id"]), {"status": "draft"})
                updated += 1
                print(
                    f"Updated posts:{result.get('id')} slug={result.get('slug')} "
                    f"status={result.get('status')} attempt={attempt}",
                    flush=True,
                )
                last_error = None
                break
            except WordPressAPIError as exc:
                if "rest_post_invalid_id" in str(exc):
                    missing += 1
                    print(
                        f"Missing post:{row['id']} slug={row['slug']}",
                        file=sys.stderr,
                        flush=True,
                    )
                    last_error = None
                    break
                last_error = exc
                print(
                    f"Retrying post:{row['id']} slug={row['slug']} "
                    f"attempt={attempt}/{retries} error={exc}",
                    file=sys.stderr,
                    flush=True,
                )
                if attempt < retries:
                    time.sleep(max(pause_seconds, 0.0) * attempt)
        if last_error is not None:
            failed += 1
            print(
                f"Failed post:{row['id']} slug={row['slug']}",
                file=sys.stderr,
                flush=True,
            )
        if pause_seconds > 0:
            time.sleep(pause_seconds)
    print(
        f"Summary: updated={updated} skipped={skipped} missing={missing} failed={failed}",
        flush=True,
    )


def main() -> int:
    parser = argparse.ArgumentParser(description="Find and safely draft flagged WordPress posts.")
    parser.add_argument("--limit", type=int, help="Only process the first N flagged posts.")
    parser.add_argument("--offset", type=int, default=0, help="Skip the first N flagged posts.")
    parser.add_argument("--pattern", default=DEFAULT_PATTERN, help="Regex used to flag posts by slug/title.")
    parser.add_argument("--report-prefix", default="reports/flagged_posts", help="Base path for CSV/JSON reports.")
    parser.add_argument("--retries", type=int, default=3, help="Retries per post update if the API connection resets.")
    parser.add_argument("--pause-seconds", type=float, default=0.15, help="Pause between post updates to reduce API strain.")
    parser.add_argument("--apply", action="store_true", help="Apply the cleanup by changing matching posts to draft.")
    args = parser.parse_args()

    try:
        pattern = re.compile(args.pattern, re.IGNORECASE)
    except re.error as exc:
        print(f"Invalid regex pattern: {exc}", file=sys.stderr)
        return 1

    try:
        api = WordPressAPI()
        posts = api.get_all_items("posts", fields=FIELDS)
        flagged = find_flagged_posts(posts, pattern)
    except WordPressAPIError as exc:
        print(str(exc), file=sys.stderr)
        return 1

    total_flagged = len(flagged)
    selected = flagged[args.offset :]
    if args.limit is not None:
        selected = selected[: args.limit]

    report_prefix = Path(args.report_prefix)
    write_csv(report_prefix.with_suffix(".csv"), flagged)
    write_json(report_prefix.with_suffix(".json"), flagged)

    print(f"Total posts scanned: {len(posts)}")
    print(f"Flagged posts found: {total_flagged}")
    print(f"Selected posts in this run: {len(selected)}")
    print(f"Report CSV: {report_prefix.with_suffix('.csv')}")
    print(f"Report JSON: {report_prefix.with_suffix('.json')}")

    if not selected:
        return 0

    preview = selected[:10]
    print("Preview:")
    for row in preview:
        print(f"- {row['id']} | {row['slug']} | {row['status']}")

    if not args.apply:
        return 0

    try:
        apply_draft_updates(
            api,
            selected,
            retries=max(args.retries, 1),
            pause_seconds=max(args.pause_seconds, 0.0),
        )
    except WordPressAPIError as exc:
        print(str(exc), file=sys.stderr)
        return 1

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
