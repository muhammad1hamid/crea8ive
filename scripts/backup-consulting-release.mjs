import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
const dir=path.join(root,'reports/consulting-editorial');
const out=path.join(root,'frontend/out');
const files=[];
function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){if(e.name==='_next')continue;const p=path.join(d,e.name);if(e.isDirectory())walk(p);else if(/\.(html|txt)$/.test(e.name)||/^sitemap.*\.xml$/.test(e.name))files.push(path.relative(out,p));}}
walk(out);
fs.writeFileSync(path.join(dir,'deploy-manifest.txt'),['_next',...files].join('\n')+'\n');
const env={};for(const line of fs.readFileSync(path.join(root,'.env.local'),'utf8').split('\n')){const m=line.match(/^([A-Z_]+)=(.*)$/);if(m)env[m[1]]=m[2].trim().replace(/^['"]|['"]$/g,'');}
if(!env.SSH_HOST||!env.SSH_USER||!env.SSH_KEY)throw Error('SSH key deployment configuration is required');
const quote=s=>"'"+s.replaceAll("'","'\\''")+"'";
const remote=env.SSH_REMOTE_PATH||'domains/crea8ivmedia.com/public_html';
const stamp=new Date().toISOString().replace(/[:.]/g,'-');
const archive=`crea8iv-editorial-backup-${stamp}.tar.gz`;
// Only published documents are overwritten in place. Hashed assets are additive
// in the established non-deleting deployment and remain available for rollback.
const command=`set -eu; cd ${quote(remote)}; list=$(mktemp); while IFS= read -r p; do if [ -f "$p" ]; then printf '%s\\n' "$p" >> "$list"; fi; done; tar -czf "$HOME/${archive}" -T "$list"; tar -tzf "$HOME/${archive}" >/dev/null; rm "$list"; printf 'Backup verified: %s\\n' "$HOME/${archive}"`;
const output=execFileSync('ssh',['-i',env.SSH_KEY,'-p',env.SSH_PORT||'65002','-o','BatchMode=yes','-o','StrictHostKeyChecking=yes',`${env.SSH_USER}@${env.SSH_HOST}`,command],{input:files.join('\n')+'\n',encoding:'utf8',timeout:120000});
fs.writeFileSync(path.join(dir,'backup.json'),JSON.stringify({createdAt:new Date().toISOString(),archive,documents:files.length,manifest:'deploy-manifest.txt',verification:output.trim(),rollback:'Extract this archive into the configured public_html directory. Do not delete old hashed assets. Newly added hashed assets can remain unused.'},null,2));
console.log(output.trim());
console.log(`${files.length} document paths plus additive hashed assets prepared for deployment.`);
