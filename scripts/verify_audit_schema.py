"""Validate exported JSON-LD and regression checks for the October audit."""
import json
from html.parser import HTMLParser
from pathlib import Path
from xml.etree import ElementTree

ROOT = Path(__file__).resolve().parents[1] / "frontend/out"


class Schema(HTMLParser):
    def __init__(self):
        super().__init__()
        self.capture = False
        self.buffer = ""
        self.graphs = []

    def handle_starttag(self, tag, attrs):
        if tag == "script" and dict(attrs).get("type") == "application/ld+json":
            self.capture = True
            self.buffer = ""

    def handle_data(self, data):
        if self.capture:
            self.buffer += data

    def handle_endtag(self, tag):
        if tag == "script" and self.capture:
            self.graphs.append(json.loads(self.buffer))
            self.capture = False


def nodes(value):
    if isinstance(value, dict):
        yield value
        for child in value.values():
            yield from nodes(child)
    elif isinstance(value, list):
        for child in value:
            yield from nodes(child)


count = 0
for file in ROOT.rglob("index.html"):
    parser = Schema()
    parser.feed(file.read_text())
    count += len(parser.graphs)
    for graph in parser.graphs:
        for node in nodes(graph):
            types = node.get("@type", [])
            if isinstance(types, str):
                types = [types]
            assert not ("Organization" in types and "industry" in node), str(file)
            assert not ("aggregateRating" in node and not node["aggregateRating"]), str(file)
    if file.parent.name == "tools":
        assert any(node.get("@type") == "ItemList" for graph in parser.graphs for node in nodes(graph))
    if "/tools/" in str(file) or "/software-products/" in str(file):
        assert not any(node.get("@type") == kind for graph in parser.graphs for node in nodes(graph) for kind in ["WebApplication", "SoftwareApplication"]), str(file)

assert count > 100, "No JSON-LD parsed"
sitemap = ElementTree.parse(ROOT / "sitemap.xml")
urls = [node.text for node in sitemap.findall(".//{*}loc")]
assert all(url.endswith("/") for url in urls), "Non-page resources in page sitemap"
assert "https://crea8ivmedia.com/case-studies/black-petals/" in urls
for service, targets in {
    "website-development": ["/ai-visibility-growth/", "/blog/aeo-vs-seo/", "/case-studies/black-petals/"],
    "google-business-profile-growth": ["/tools/patient-retention-roi-calculator/", "/blog/how-dentists-in-rawalpindi-can-rank-on-google-maps/", "/blog/google-business-profile-optimization-checklist/", "/blog/google-business-profile-optimization-checklist-for-restaurants-in-islamabad/"],
}.items():
    html = (ROOT / service / "index.html").read_text()
    for target in targets:
        assert f'href="{target}"' in html, f"Missing contextual link: {service} -> {target}"
print(json.dumps({"jsonLdBlocks": count, "sitemapPages": len(urls), "schemaRegressions": 0}))
