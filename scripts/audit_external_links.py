#!/usr/bin/env python3
"""Check unique public destinations and retain their referring pages."""
import csv
import json
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urlsplit
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "frontend/out"


class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = set()

    def handle_starttag(self, tag, attrs):
        if tag != "a":
            return
        url = dict(attrs).get("href", "")
        parts = urlsplit(url)
        if parts.scheme in {"http", "https"} and parts.hostname not in {
            "crea8ivmedia.com", "www.crea8ivmedia.com"
        }:
            self.urls.add(url.split("#")[0])


def check(item):
    url, pages = item
    result = {"destination": url, "status": "", "classification": "", "final_url": "", "referring_pages": len(pages)}
    try:
        with urlopen(Request(url, headers={"User-Agent": "Mozilla/5.0"}), timeout=12) as response:
            result.update(status=response.status, final_url=response.url)
            result["classification"] = "authentication" if urlsplit(response.url).hostname == "accounts.google.com" else "reachable"
    except HTTPError as error:
        result["status"] = error.code
        result["classification"] = "bot_or_access_restriction" if error.code in {401, 403, 429} else "http_error"
    except (URLError, TimeoutError, OSError) as error:
        result.update(status=type(error).__name__, classification="manual_verification")
    result["source_urls"] = " | ".join(sorted(pages))
    return result


if __name__ == "__main__":
    destinations = {}
    for file in OUT.rglob("index.html"):
        parser = Links()
        parser.feed(file.read_text())
        page = "https://crea8ivmedia.com/" + str(file.parent.relative_to(OUT)).replace(".", "").strip("/") + "/"
        page = page.replace(".com//", ".com/")
        for url in parser.urls:
            destinations.setdefault(url, set()).add(page)
    with ThreadPoolExecutor(max_workers=8) as executor:
        results = list(executor.map(check, destinations.items()))
    target = ROOT / "project/documentation/external-link-audit-2026-10-14.csv"
    with target.open("w", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(results[0]))
        writer.writeheader()
        writer.writerows(results)
    counts = {}
    for result in results:
        counts[result["classification"]] = counts.get(result["classification"], 0) + 1
    print(json.dumps({"destinations": len(results), "classifications": counts, "report": str(target)}, indent=2))
