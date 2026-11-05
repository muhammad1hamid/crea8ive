import json,urllib.request,urllib.error,uuid,sqlite3,pathlib,os
ROOT=pathlib.Path(__file__).resolve().parents[1]
STORAGE=os.environ.get("CREA8IV_ENQUIRY_TEST_STORAGE", "")
if not STORAGE.startswith("/private/tmp/crea8iv-qatar-test-"): raise SystemExit("Set CREA8IV_ENQUIRY_TEST_STORAGE to a fresh /private/tmp/crea8iv-qatar-test-* directory used by the local PHP server.")
url='http://127.0.0.1:3118/enquiries/submit.php'
base=dict(name='Local endpoint QA',company='QA only',country='qatar',email='qa@example.invalid',type='project',requirements='Synthetic local test',phone='+974 0000 0000',service='seo',budget='scope-first',goal='Verify storage',preferredContact='email',language='en-QA',consent=True,requestId=str(uuid.uuid4()),page='/qa/contact/',landing_page='/qa/',source='qa-test',medium='local',campaign='qatar-verification',content='hero')
checks=[]
def send(data,origin='http://127.0.0.1:3118'):
 req=urllib.request.Request(url,json.dumps(data,ensure_ascii=False).encode(),headers={'Origin':origin,'Content-Type':'application/json'})
 try:
  with urllib.request.urlopen(req) as r:return r.status,json.load(r)
 except urllib.error.HTTPError as e:return e.code,json.load(e)
def check(name,condition):
 assert condition,name
 checks.append(name)
status,result=send(base);check('Valid Qatar enquiry saved',status==200 and result.get('ok') is True)
status,duplicate=send(base);check('Retries return same reference',status==200 and duplicate['reference']==result['reference'])
for label,patch in [('consent',{'consent':False}),('service',{'service':'invalid'}),('language',{'language':'bad'}),('phone',{'phone':'not a phone'}),('website',{'website':'javascript:alert(1)'}),('honeypot',{'website_check':'bot'})]:
 check('Reject invalid '+label,send(base|patch)[0]==422)
check('Reject wrong origin',send(base,'https://example.invalid')[0]==403)
check('Enforce body byte limit',send(base|{'requirements':'a'*17000})[0]==413)
check('Accept Arabic characters within field limit',send(base|{'requestId':str(uuid.uuid4()),'goal':'ن'*490})[0]==200)
db=sqlite3.connect(str(pathlib.Path(STORAGE)/'enquiries.sqlite'));stored=json.loads(db.execute('select payload from enquiries where request_id=?',(base['requestId'],)).fetchone()[0])
check('Persist Qatar market and attribution',all(stored[k]==v for k,v in {'market':'qatar','segment':'international','utm_source':'qa-test','utm_campaign':'qatar-verification','landing_page':'/qa/','language':'en-QA'}.items()))
check('Duplicate stores one row',db.execute('select count(*) from enquiries where request_id=?',(base['requestId'],)).fetchone()[0]==1)
(ROOT/'reports/qatar/endpoint-release.json').write_text(json.dumps({'checks':checks,'passed':len(checks),'scope':'Isolated local PHP/SQLite only'},indent=2));print(checks)
