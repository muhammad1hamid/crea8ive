import assert from 'node:assert/strict';
const endpoint='http://127.0.0.1:3118/enquiries/submit.php';
const payload={company:'LOCAL QA ONLY',country:'Qatar',name:'Test User',email:'qa@example.com',type:'project',requirements:'Isolated local test; not a customer lead.',consent:true,requestId:crypto.randomUUID(),service:'web-development',page:'/qatar/',landing_page:'/us/',source:'local-test',content:'test',website:'https://example.com',timeline:'Test only'};
async function send(body){const res=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json',Origin:'http://127.0.0.1:3118'},body:JSON.stringify(body)});return {status:res.status,body:await res.json()};}
const first=await send(payload); assert.equal(first.status,200,JSON.stringify(first));assert.equal(first.body.ok,true);
const repeat=await send(payload);assert.equal(repeat.body.reference,first.body.reference,'Idempotency');
assert.equal((await send({...payload,consent:false})).status,422);
assert.equal((await send({...payload,website:'javascript:alert(1)'})).status,422);
assert.equal((await send({...payload,company:''})).status,422);
console.log('PASS: Qatar global-form payload saved locally, retry idempotent, missing consent/invalid URL/missing company rejected.');
