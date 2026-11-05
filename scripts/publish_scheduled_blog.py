#!/usr/bin/env python3

import argparse
import base64
import json
import mimetypes
import os
import re
from dataclasses import dataclass
from datetime import datetime, timezone
from html import escape
from pathlib import Path
from typing import Any

import requests

ROOT = Path(__file__).resolve().parent.parent
ENV_PATH = ROOT / ".env.local"


class PublishError(RuntimeError):
    pass


def load_env_file(path: Path = ENV_PATH) -> None:
    if not path.exists():
        return
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip())


def require_env(name: str) -> str:
    value = os.environ.get(name, "").strip()
    if not value:
        raise PublishError(f"Missing required env var: {name}")
    return value


@dataclass
class Draft:
    meta: dict[str, Any]
    body: str


def parse_frontmatter(text: str) -> Draft:
    if not text.startswith("---\n"):
        raise PublishError("Draft is missing YAML frontmatter.")
    try:
        _, raw_meta, body = text.split("---\n", 2)
    except ValueError as exc:
        raise PublishError("Unable to split draft frontmatter.") from exc

    meta: dict[str, Any] = {}
    current_list_key: str | None = None
    for raw_line in raw_meta.splitlines():
        if not raw_line.strip():
            continue
        if raw_line.startswith("  - "):
            if current_list_key is None:
                raise PublishError(f"Unexpected list item in frontmatter: {raw_line}")
            meta.setdefault(current_list_key, []).append(raw_line[4:].strip().strip('"'))
            continue
        current_list_key = None
        if ":" not in raw_line:
            raise PublishError(f"Invalid frontmatter line: {raw_line}")
        key, value = raw_line.split(":", 1)
        key = key.strip()
        value = value.strip()
        if not value:
            meta[key] = []
            current_list_key = key
            continue
        meta[key] = value.strip('"')
    return Draft(meta=meta, body=body.strip() + "\n")


def slugify(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")


def inline_markdown(text: str) -> str:
    text = escape(text)
    text = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", lambda m: f'<a href="https://crea8ivmedia.com{m.group(2)}">{escape(m.group(1))}</a>' if m.group(2).startswith("/") else f'<a href="{escape(m.group(2), quote=True)}">{escape(m.group(1))}</a>', text)
    text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
    return text


def parse_sections(body: str) -> tuple[list[dict[str, Any]], list[dict[str, str]]]:
    lines = body.splitlines()
    if lines and lines[0].strip().startswith("# "):
        lines = lines[1:]
    blocks: list[dict[str, Any]] = []
    faqs: list[dict[str, str]] = []
    i = 0
    in_faq = False
    stop_after_schema_notes = False

    while i < len(lines):
        line = lines[i].rstrip()
        stripped = line.strip()
        i += 1

        if not stripped:
            continue

        if stripped == "## Schema notes":
            stop_after_schema_notes = True
            break

        if stripped == "## FAQ":
            in_faq = True
            blocks.append({"type": "heading", "level": 2, "text": "FAQ"})
            continue

        if stripped.startswith("## "):
            blocks.append({"type": "heading", "level": 2, "text": stripped[3:].strip()})
            continue

        if stripped.startswith("### "):
            text = stripped[4:].strip()
            blocks.append({"type": "heading", "level": 3, "text": text})
            if in_faq:
                answer_lines: list[str] = []
                while i < len(lines) and not lines[i].strip():
                    i += 1
                while i < len(lines) and lines[i].strip() and not lines[i].startswith("### ") and not lines[i].startswith("## "):
                    answer_lines.append(lines[i].strip())
                    i += 1
                faqs.append({"question": text, "answer": " ".join(answer_lines).strip()})
                if answer_lines:
                    blocks.append({"type": "paragraph", "text": " ".join(answer_lines).strip()})
            continue

        if stripped.startswith("- "):
            items = [stripped[2:].strip()]
            while i < len(lines) and lines[i].strip().startswith("- "):
                items.append(lines[i].strip()[2:].strip())
                i += 1
            blocks.append({"type": "ul", "items": items})
            continue

        if re.match(r"\d+\.\s", stripped):
            items = [re.sub(r"^\d+\.\s+", "", stripped)]
            while i < len(lines) and re.match(r"\d+\.\s", lines[i].strip()):
                items.append(re.sub(r"^\d+\.\s+", "", lines[i].strip()))
                i += 1
            blocks.append({"type": "ol", "items": items})
            continue

        paragraph = [stripped]
        while i < len(lines):
            peek = lines[i].strip()
            if not peek or peek.startswith("#") or peek.startswith("- ") or re.match(r"\d+\.\s", peek):
                break
            paragraph.append(peek)
            i += 1
        blocks.append({"type": "paragraph", "text": " ".join(paragraph)})

    if stop_after_schema_notes:
        blocks = [block for block in blocks if not (block["type"] == "heading" and block["text"] == "Schema notes")]
    return blocks, faqs


def render_blocks(blocks: list[dict[str, Any]]) -> str:
    html: list[str] = []
    for block in blocks:
        if block["type"] == "heading":
            level = block["level"]
            html.append(f"<h{level}>{inline_markdown(block['text'])}</h{level}>")
        elif block["type"] == "paragraph":
            html.append(f"<p>{inline_markdown(block['text'])}</p>")
        elif block["type"] == "ul":
            items = "".join(f"<li>{inline_markdown(item)}</li>" for item in block["items"])
            html.append(f"<ul>{items}</ul>")
        elif block["type"] == "ol":
            items = "".join(f"<li>{inline_markdown(item)}</li>" for item in block["items"])
            html.append(f"<ol>{items}</ol>")
    return "\n".join(html)


def build_schema(meta: dict[str, Any], post_url: str, image_url: str, published_iso: str, faqs: list[dict[str, str]]) -> str:
    article = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": meta["title"],
        "description": meta["meta_description"],
        "image": image_url,
        "author": {"@type": "Organization", "name": "Crea8iv Media"},
        "publisher": {"@type": "Organization", "name": "Crea8iv Media"},
        "mainEntityOfPage": {"@type": "WebPage", "@id": post_url},
        "datePublished": published_iso,
        "dateModified": published_iso,
    }
    faq = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": item["question"],
                "acceptedAnswer": {"@type": "Answer", "text": item["answer"]},
            }
            for item in faqs
        ],
    }
    parts = [
        f"<script type=\"application/ld+json\">{json.dumps(article, ensure_ascii=False)}</script>"
    ]
    if faqs:
        parts.append(f"<script type=\"application/ld+json\">{json.dumps(faq, ensure_ascii=False)}</script>")
    return "\n".join(f"<p>{part}</p>" for part in parts)


class WordPressClient:
    def __init__(self) -> None:
        load_env_file()
        self.site_url = require_env("WORDPRESS_SITE_URL").rstrip("/")
        username = require_env("WORDPRESS_USERNAME")
        password = require_env("WORDPRESS_APPLICATION_PASSWORD").replace(" ", "")
        token = base64.b64encode(f"{username}:{password}".encode("utf-8")).decode("ascii")
        self.session = requests.Session()
        self.session.headers.update(
            {
                "Authorization": f"Basic {token}",
                "User-Agent": "Codex-Scheduled-Blog-Publisher/1.0",
            }
        )

    def get(self, path: str, **kwargs: Any) -> requests.Response:
        response = self.session.get(f"{self.site_url}{path}", timeout=30, **kwargs)
        response.raise_for_status()
        return response

    def post(self, path: str, **kwargs: Any) -> requests.Response:
        response = self.session.post(f"{self.site_url}{path}", timeout=30, **kwargs)
        response.raise_for_status()
        return response

    def upload_media(self, image_path: Path, alt_text: str, title: str) -> dict[str, Any]:
        mime = mimetypes.guess_type(image_path.name)[0] or "image/webp"
        with image_path.open("rb") as handle:
            response = self.post(
                "/wp-json/wp/v2/media",
                headers={
                    "Content-Disposition": f'attachment; filename="{image_path.name}"',
                    "Content-Type": mime,
                },
                data=handle.read(),
            )
        media = response.json()
        update = self.post(
            f"/wp-json/wp/v2/media/{media['id']}",
            json={"alt_text": alt_text, "title": title},
            headers={"Content-Type": "application/json"},
        )
        return update.json()

    def find_post_by_slug(self, slug: str) -> list[dict[str, Any]]:
        response = self.get("/wp-json/wp/v2/posts", params={"slug": slug, "_fields": "id,slug,link,status,date,title"})
        return response.json()

    def create_post(self, payload: dict[str, Any]) -> dict[str, Any]:
        response = self.post("/wp-json/wp/v2/posts", json=payload, headers={"Content-Type": "application/json"})
        return response.json()


def main() -> int:
    parser = argparse.ArgumentParser(description="Publish a scheduled Crea8iv blog draft to WordPress.")
    parser.add_argument("--draft", required=True)
    parser.add_argument("--cover", required=True)
    parser.add_argument("--publish-datetime", help="ISO datetime in site local time. Defaults to current UTC timestamp.")
    args = parser.parse_args()

    draft_path = Path(args.draft)
    cover_path = Path(args.cover)
    draft = parse_frontmatter(draft_path.read_text(encoding="utf-8"))

    client = WordPressClient()
    existing = client.find_post_by_slug(draft.meta["slug"])
    if existing:
        print(json.dumps({"status": "exists", "post": existing[0]}, ensure_ascii=False))
        return 0

    media = client.upload_media(cover_path, draft.meta.get("cover_alt", draft.meta["title"]), draft.meta["title"])
    publish_value = args.publish_datetime or datetime.utcnow().replace(microsecond=0).isoformat()
    publish_dt = datetime.fromisoformat(publish_value)
    published_iso = publish_dt.astimezone(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")

    blocks, faqs = parse_sections(draft.body)
    content_html = render_blocks(blocks)
    post_url = f"https://crea8ivmedia.com/{draft.meta['slug']}/"
    schema_html = build_schema(draft.meta, post_url, media["source_url"], published_iso, faqs)
    final_content = f"{content_html}\n{schema_html}\n"

    payload = {
        "title": draft.meta["title"],
        "slug": draft.meta["slug"],
        "status": "publish",
        "date": publish_value,
        "excerpt": draft.meta["meta_description"],
        "content": final_content,
        "featured_media": media["id"],
    }

    post = client.create_post(payload)
    print(json.dumps({"status": "published", "post": post, "media": media}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
