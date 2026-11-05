#!/usr/bin/env python3

import argparse
import csv
import sys
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

from wp_api import WordPressAPI, WordPressAPIError


FIELDS = [
    "id",
    "slug",
    "link",
    "status",
    "modified",
    "title",
    "excerpt",
    "yoast_head_json",
]


def clean_text(value: str) -> str:
    return " ".join(value.replace("\xa0", " ").split())


def describe_item(item: dict[str, Any], site_host: str) -> dict[str, Any]:
    yoast = item.get("yoast_head_json") or {}
    title = clean_text((item.get("title") or {}).get("rendered", ""))
    excerpt = clean_text((item.get("excerpt") or {}).get("rendered", ""))
    canonical = yoast.get("canonical", "") or ""
    canonical_host = urlparse(canonical).netloc
    meta_description = clean_text(yoast.get("og_description", "") or yoast.get("description", "") or "")
    yoast_title = clean_text(yoast.get("title", "") or title)

    issues: list[str] = []
    if canonical and canonical_host and canonical_host != site_host:
        issues.append(f"canonical-domain-mismatch:{canonical_host}")
    if not yoast_title:
        issues.append("missing-title")
    elif len(yoast_title) < 30:
        issues.append("title-too-short")
    elif len(yoast_title) > 65:
        issues.append("title-too-long")
    if not meta_description:
        issues.append("missing-meta-description")
    elif len(meta_description) < 70:
        issues.append("meta-description-too-short")
    elif len(meta_description) > 180:
        issues.append("meta-description-too-long")
    if not excerpt:
        issues.append("missing-excerpt")

    return {
        "id": item.get("id"),
        "slug": item.get("slug", ""),
        "status": item.get("status", ""),
        "modified": item.get("modified", ""),
        "title": title,
        "title_length": len(yoast_title),
        "meta_description_length": len(meta_description),
        "canonical": canonical,
        "canonical_host": canonical_host,
        "issues": ";".join(issues),
    }


def write_csv(path: Path, rows: list[dict[str, Any]]) -> None:
    if not rows:
        path.write_text("")
        return

    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)


def print_summary(content_type: str, rows: list[dict[str, Any]]) -> None:
    issue_counts: dict[str, int] = {}
    for row in rows:
        for issue in filter(None, row["issues"].split(";")):
            issue_counts[issue] = issue_counts.get(issue, 0) + 1

    print(f"\n{content_type.upper()} AUDIT")
    print(f"Items scanned: {len(rows)}")
    if not issue_counts:
        print("No SEO issues found by the current rules.")
    else:
        for issue, count in sorted(issue_counts.items(), key=lambda item: (-item[1], item[0])):
            print(f"- {issue}: {count}")

    flagged = [row for row in rows if row["issues"]]
    if flagged:
        print("\nTop flagged items:")
        for row in flagged[:10]:
            print(
                f"- #{row['id']} {row['slug']} | title={row['title_length']} chars | "
                f"meta={row['meta_description_length']} chars | {row['issues']}"
            )


def main() -> int:
    parser = argparse.ArgumentParser(description="Audit WordPress pages/posts using live Yoast output.")
    parser.add_argument("--type", choices=["pages", "posts", "both"], default="both")
    parser.add_argument("--output-dir", default="reports", help="Directory for CSV reports")
    parser.add_argument("--limit", type=int, help="Only scan the first N items per content type")
    args = parser.parse_args()

    try:
        api = WordPressAPI()
        site_host = urlparse(api.site_url).netloc
        output_dir = Path(args.output_dir)
        output_dir.mkdir(parents=True, exist_ok=True)

        targets = ["pages", "posts"] if args.type == "both" else [args.type]
        for target in targets:
            rows = [describe_item(item, site_host) for item in api.get_all_items(target, fields=FIELDS, limit=args.limit)]
            csv_path = output_dir / f"{target}_seo_audit.csv"
            write_csv(csv_path, rows)
            print_summary(target, rows)
            print(f"Saved report: {csv_path}")
    except WordPressAPIError as exc:
        print(str(exc), file=sys.stderr)
        return 1

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
