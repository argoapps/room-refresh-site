import {readFile} from 'node:fs/promises';
const site=JSON.parse(await readFile('content/site.json','utf8'));
const routes=JSON.parse(await readFile('dist/route-manifest.json','utf8'));
const payload={host:new URL(site.origin).host,key:site.indexNowKey,keyLocation:`${site.origin}/${site.indexNowKey}.txt`,urlList:routes.map(p=>site.origin+p.route)};
if(!process.argv.includes('--submit')){console.log('Dry run. After production verification, run npm run indexnow -- --submit');console.log(JSON.stringify(payload,null,2));process.exit(0);}
const key=await fetch(payload.keyLocation);if(!key.ok||(await key.text()).trim()!==site.indexNowKey)throw new Error('Production key is not available. Deploy and verify first.');
for(const url of payload.urlList){const response=await fetch(url);if(!response.ok||!response.url.startsWith(site.origin+'/'))throw new Error(`Production URL failed: ${url}`);const html=await response.text();if(!html.includes(`rel="canonical" href="${url}"`)||html.includes('noindex'))throw new Error(`Production page not ready: ${url}`);}
const response=await fetch('https://api.indexnow.org/indexnow',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
if(![200,202].includes(response.status))throw new Error(`IndexNow rejected submission: ${response.status} ${await response.text()}`);
console.log(`IndexNow accepted ${payload.urlList.length} URLs (${response.status}). Acceptance does not guarantee indexing.`);
