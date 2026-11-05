"""Snapshot exported SEO/content contracts independently of section order."""
import collections
import hashlib
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class Inventory(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.skip = 0
        self.text = []
        self.meta = []
        self.links = set()
        self.headings = []
        self.heading = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in ("script", "style", "button"):
            self.skip += 1
        if tag == "meta":
            self.meta.append(attrs)
        if tag == "link" and attrs.get("rel") == "canonical":
            self.meta.append(attrs)
        if tag == "a" and attrs.get("href"):
            self.links.add(attrs["href"])
        if tag in ("h1", "h2", "h3", "title"):
            self.heading = [tag, []]

    def handle_endtag(self, tag):
        if tag in ("script", "style", "button"):
            self.skip -= 1
        if self.heading and tag == self.heading[0]:
            self.headings.append([tag, " ".join(" ".join(self.heading[1]).split())])
            self.heading = None

    def handle_data(self, data):
        if not self.skip:
            self.text.extend(re.findall(r"[\w]+", data.casefold()))
            if self.heading:
                self.heading[1].append(data)


def snapshot():
    result = {}
    for file in sorted((ROOT / "frontend/out").rglob("*.html")):
        parser = Inventory()
        parser.feed(file.read_text())
        result[str(file.relative_to(ROOT / "frontend/out"))] = {
            "words": dict(sorted(collections.Counter(parser.text).items())),
            "headings": sorted(parser.headings),
            "metadata": sorted(parser.meta, key=lambda value: json.dumps(value, sort_keys=True)),
            "links": sorted(parser.links),
        }
    return result


target = Path(sys.argv[2])
current = snapshot()
if sys.argv[1] == "snapshot":
    heroes = ["HeroSection.tsx", "HeroSection.css", "PremiumHero.css"]
    target.write_text(json.dumps({"pages": current, "heroes": {
        name: hashlib.sha256((ROOT / "frontend/src/components" / name).read_bytes()).hexdigest()
        for name in heroes
    }}, indent=2))
    print(f"Captured {len(current)} exported pages and {len(heroes)} locked hero files")
else:
    before = json.loads(target.read_text())
    failures = []
    for name, old in before["pages"].items():
        if current.get(name) != old:
            failures.append({"page": name, "changed": [key for key in old if old[key] != current.get(name, {}).get(key)]})
    for name, digest in before["heroes"].items():
        if hashlib.sha256((ROOT / "frontend/src/components" / name).read_bytes()).hexdigest() != digest:
            failures.append({"hero": name})
    if set(current) != set(before["pages"]):
        failures.append({"routeSetChanged": True})
    print(json.dumps({"pages": len(current), "differences": failures}, indent=2))
    sys.exit(bool(failures))
