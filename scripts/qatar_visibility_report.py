#!/usr/bin/env python3
"""Render an offline dashboard from recorded observations, never simulated data."""
import csv, json, html
from pathlib import Path
from collections import Counter
ROOT = Path(__file__).resolve().parents[1]
source = ROOT / 'data/qatar/observations.csv'
rows = list(csv.DictReader(source.open(encoding='utf-8-sig')))
required = ['prompt', 'language', 'platform', 'mode', 'observed_at', 'mentioned', 'cited', 'evidence_url']
for i, row in enumerate(rows, 2):
    if any(not row.get(k, '').strip() for k in required):
        raise SystemExit(f'Row {i}: incomplete observation; required {required}')
    if row['mentioned'].lower() not in ['true', 'false'] or row['cited'].lower() not in ['true', 'false']:
        raise SystemExit(f'Row {i}: mentioned/cited must be true or false')
    if row['cited'].lower() == 'true' and not row['cited_url']:
        raise SystemExit(f'Row {i}: cited URL required')
count = len(rows)
mentions = sum(r['mentioned'].lower() == 'true' for r in rows)
citations = sum(r['cited'].lower() == 'true' for r in rows)
summary = {'observations': count, 'mentions': mentions if count else None, 'citations': citations if count else None, 'platforms': dict(Counter(r['platform'] for r in rows)), 'source': str(source.relative_to(ROOT)), 'note': 'Counts describe the recorded sample only. No observations does not mean zero visibility.'}
headers = ['prompt','language','platform','mode','observed_at','mentioned','cited','cited_url','evidence_url','notes']
body = ''.join('<tr>'+''.join('<td>'+html.escape(r.get(k,''))+'</td>' for k in headers)+'</tr>' for r in rows)
empty = '<p>No observations have been recorded. Collect dated evidence before interpreting visibility.</p>'
table = '<div class="table"><table><thead><tr>'+''.join('<th>'+html.escape(k.replace('_',' '))+'</th>' for k in headers)+'</tr></thead><tbody>'+body+'</tbody></table></div>' if count else empty
output = ROOT / 'reports/qatar/visibility-dashboard.html'
output.write_text('<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Qatar AI Visibility — Recorded Evidence</title><style>body{background:#111110;color:#eae7de;font:17px/1.6 system-ui;max-width:1200px;margin:60px auto;padding:24px}h1{font-size:42px}h1,th{color:#ff852f}.table{overflow:auto}td,th{padding:12px;text-align:left;border-bottom:1px solid #444}small{color:#b9b5ac}</style><main><p>CREA8IV MEDIA · QATAR</p><h1>AI visibility evidence</h1><p>'+str(count)+' recorded observations · Mentions: '+(str(mentions) if count else 'not measured')+' · Citations: '+(str(citations) if count else 'not measured')+'</p>'+table+'<small>Counts describe this sample only. Compare the same prompts, language, platform and search mode. A citation does not prove a lead or sale. Source: data/qatar/observations.csv.</small></main></html>',encoding='utf-8')
(ROOT / 'reports/qatar/visibility-summary.json').write_text(json.dumps(summary,indent=2)+'\n')
print(output)
