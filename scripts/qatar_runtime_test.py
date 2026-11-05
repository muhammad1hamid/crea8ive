#!/usr/bin/env python3
"""Read-only checks against the separately built local Next runtime on port 3121."""
import urllib.request, urllib.error, urllib.parse, json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
rows=[]
paths=['/qa/','/qa/ar/','/qa/services/seo/','/qa/ar/services/seo/','/qa/does-not-exist/','/enquiries/submit.php','/enquiries/submit%2ephp','/qa/no-source.php','/website-portfolio/buildscape/']
for path in paths:
    url='http://127.0.0.1:3121'+path
    data=b'{}' if '/enquiries/' in path else None
    for attempt in range(4):
        req=urllib.request.Request(url,data=data,headers={'Origin':'https://crea8ivmedia.com','Content-Type':'application/json'})
        try:
            with urllib.request.urlopen(req) as r:code=r.status;body=r.read().decode(errors='replace')
        except urllib.error.HTTPError as e:
            code=e.code;body=e.read().decode(errors='replace')
            if code in [307,308]:
                url=urllib.parse.urljoin(url,e.headers['Location']);continue
        break
    expected=503 if '/enquiries/' in path else 404 if 'does-not-exist' in path or 'no-source' in path else 200
    assert code==expected,(path,code,body[:100])
    assert '<?php' not in body,path
    if '/ar/' in path:assert '<html lang="ar-QA" dir="rtl"' in body,path
    rows.append({'path':path,'status':code,'passed':True})
(ROOT/'reports/qatar/runtime-release.json').write_text(json.dumps(rows,indent=2)+'\n')
print(rows)
