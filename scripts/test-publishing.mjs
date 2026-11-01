import {mkdtemp,cp,readFile,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
const temp=await mkdtemp(path.join(tmpdir(),'visibility-publishing-'));
try{
 for(const file of ['scripts','content','photos','media','styles.css','content.css','analytics.js','vercel.json'])await cp(file,path.join(temp,file),{recursive:true});
 const calendar=JSON.parse(await readFile('operations/editorial-calendar.json','utf8'));
 const file=path.join(temp,'content/articles',`${calendar[0].slug}.json`);
 const a=JSON.parse(await readFile(file,'utf8'));
 const run=()=>spawnSync(process.execPath,['scripts/build.mjs'],{cwd:temp,env:{...process.env,VERCEL_ENV:'production'},encoding:'utf8'});
 a.status='published';a.published='2026-01-01';a.reviewed='2026-01-01';await writeFile(file,JSON.stringify(a));
 const valid=run();assert.equal(valid.status,0,valid.stderr);
 const html=await readFile(path.join(temp,`dist/guides/${a.slug}/index.html`),'utf8');
 const ld=JSON.parse(html.match(/application\/ld\+json">(.*?)<\/script>/s)[1]);
 assert(ld['@graph'].some(x=>x['@type']==='Article'&&x.datePublished==='2026-01-01'));
 assert.equal(ld['@graph'].find(x=>x['@type']==='BreadcrumbList').itemListElement.length,3);
 assert.equal(JSON.parse(await readFile(path.join(temp,'dist/route-manifest.json'),'utf8')).length,8);
 a.published='2099-01-01';await writeFile(file,JSON.stringify(a));assert.notEqual(run().status,0,'Future article must not publish.');
 a.published='2026-01-01';a.evidence=[];await writeFile(file,JSON.stringify(a));assert.notEqual(run().status,0,'Article without evidence must not publish.');
 console.log('PASS: published article HTML/schema/breadcrumbs, future-date rejection and evidence requirement. Source drafts unchanged.');
}finally{await rm(temp,{recursive:true,force:true});}
