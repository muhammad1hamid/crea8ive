"""Read-only audit of the existing static export; writes evidence under reports/qatar.

Run: python3 scripts/qatar_baseline_audit.py
This inspects existing output, not a fresh build or production ranking data.
"""
import csv
import json
import re
from collections import defaultdict
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit, unquote
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "frontend/out"
REPORT = ROOT / "reports/qatar"
ORIGIN = "https://crea8ivmedia.com"


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ""
        self.description = ""
        self.canonical = ""
        self.robots = ""
        self.lang = ""
        self.h1 = 0
        self.links = set()
        self.alternates = []
        self.schemas = []
        self.schema_text = None
        self.in_title = False
        self.main_depth = 0
        self.ignore = 0
        self.words = []
        self.og_image = ""
        self.stack = []
        self.content_words = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag not in {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}:
            self.stack.append((tag, a.get("id") == "main-content"))
        if tag == "html": self.lang = a.get("lang", "")
        if tag == "title": self.in_title = True
        if tag == "h1": self.h1 += 1
        if tag == "main": self.main_depth += 1
        if tag in ("script", "style"): self.ignore += 1
        if tag == "script" and a.get("type") == "application/ld+json": self.schema_text = ""
        if tag == "meta":
            if a.get("name") == "description": self.description = a.get("content", "")
            if a.get("name") == "robots": self.robots = a.get("content", "")
            if a.get("property") == "og:image": self.og_image = a.get("content", "")
        if tag == "link" and a.get("rel") == "canonical": self.canonical = a.get("href", "")
        if tag == "link" and a.get("hreflang"): self.alternates.append(a)
        if tag == "a" and a.get("href"):
            url = urlsplit(urljoin(ORIGIN, a["href"]))
            if url.netloc == "crea8ivmedia.com": self.links.add(url.path)

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i][0] == tag:
                self.stack = self.stack[:i]
                break
        if tag == "title": self.in_title = False
        if tag == "main": self.main_depth = max(0, self.main_depth - 1)
        if tag == "script" and self.schema_text is not None:
            try: self.schemas.append(json.loads(self.schema_text))
            except ValueError: self.schemas.append({"invalidJSON": True})
            self.schema_text = None
        if tag in ("script", "style"): self.ignore = max(0, self.ignore - 1)

    def handle_data(self, data):
        if self.in_title: self.title += data
        if self.schema_text is not None: self.schema_text += data
        if self.main_depth and not self.ignore: self.words.extend(data.split())
        if not self.ignore and (self.main_depth or any(marker for _, marker in self.stack)):
            self.content_words.extend(data.split())


def target(path):
    relative = unquote(path).lstrip("/")
    return OUT / relative if Path(relative).suffix else OUT / relative / "index.html"


def types(value):
    found = set()
    if isinstance(value, dict):
        t = value.get("@type", [])
        found.update(t if isinstance(t, list) else [t])
        for child in value.values(): found.update(types(child))
    elif isinstance(value, list):
        for child in value: found.update(types(child))
    return found


def main():
    REPORT.mkdir(parents=True, exist_ok=True)
    sitemap = ET.parse(OUT / "sitemap.xml")
    urls = [node.text for node in sitemap.iter() if node.tag.endswith("}loc")]
    pages, resources, missing = [], [], []
    for url in urls:
        pathname = urlsplit(url).path
        file = target(pathname)
        if not file.exists():
            missing.append(pathname)
            continue
        if file.suffix != ".html":
            resources.append(pathname)
            continue
        p = Page()
        p.feed(file.read_text())
        pages.append(dict(path=pathname, title=p.title, description=p.description,
                          canonical=p.canonical, robots=p.robots, lang=p.lang, h1=p.h1,
                          mainWords=len(p.words), contentWords=len(p.content_words), ogImage=p.og_image, hreflang=p.alternates,
                          schemaTypes=sorted(types(p.schemas)),
                          invalidSchema=sum(bool(s.get("invalidJSON")) for s in p.schemas if isinstance(s, dict)),
                          links=sorted(p.links)))
    incoming = defaultdict(set)
    unresolved = defaultdict(set)
    for p in pages:
        for link in p["links"]:
            normalized = link.rstrip("/") or "/"
            if normalized != p["path"].rstrip("/"): incoming[normalized].add(p["path"])
            if not target(link).exists(): unresolved[link].add(p["path"])
    duplicates = {}
    for key in ("title", "description", "canonical"):
        groups = defaultdict(list)
        for p in pages: groups[p[key]].append(p["path"])
        duplicates[key] = {k: v for k, v in groups.items() if len(v) > 1}
    patterns = []
    for f in sorted((ROOT / "frontend/src/app").rglob("page.tsx")):
        relative = f.parent.relative_to(ROOT / "frontend/src/app")
        patterns.append({"route": "/" + (str(relative) + "/" if str(relative) != "." else ""), "source": str(f.relative_to(ROOT))})
    report = dict(generatedAt=datetime.now(timezone.utc).isoformat(),
                  scope="Existing static export, not a fresh build; unresolved paths can be redirects or backend endpoints.",
                  exportModifiedAt=datetime.fromtimestamp((OUT / "index.html").stat().st_mtime, timezone.utc).isoformat(),
                  sitemapCount=len(urls), htmlCount=len(pages), resources=resources, missingExportFiles=missing,
                  duplicateMetadata=duplicates, sourceRoutes=patterns,
                  possibleOrphans=[p["path"] for p in pages if p["path"] != "/" and not incoming[p["path"].rstrip("/")]],
                  unresolvedExportLinks={k: sorted(v) for k, v in unresolved.items()}, pages=pages)
    (REPORT / "baseline.json").write_text(json.dumps(report, indent=2) + "\n")
    with (REPORT / "routes.csv").open("w") as f:
        fields = ["path", "title", "description", "canonical", "robots", "lang", "h1", "mainWords", "contentWords", "ogImage"]
        writer = csv.DictWriter(f, fieldnames=fields, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(pages)
    print(json.dumps({k: report[k] for k in ["sitemapCount", "htmlCount", "missingExportFiles", "duplicateMetadata", "possibleOrphans"]}, indent=2))
    print("Unresolved local destinations:", len(unresolved))
    print("Missing description:", sum(not p["description"] for p in pages))
    print("Non-single H1:", [p["path"] for p in pages if p["h1"] != 1])
    print("Invalid schema:", sum(p["invalidSchema"] for p in pages))


if __name__ == "__main__": main()
