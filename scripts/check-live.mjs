import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
const site=JSON.parse(await readFile('content/site.json','utf8'));
const routes=JSON.parse(await readFile('dist/route-manifest.json','utf8'));
const results=await Promise.all(routes.map(async({route})=>{
 const url=site.origin+route;const r=await fetch(url);const html=await r.text();
 assert.equal(r.status,200,url);assert.equal(r.url,url,`Unexpected redirect: ${url}`);
 assert(html.includes(`rel="canonical" href="${url}"`),`Canonical: ${url}`);
 assert(!/<meta name="robots" content="[^"]*noindex/.test(html),`HTML noindex: ${url}`);
 assert(!r.headers.get('x-robots-tag')?.includes('noindex'),`Header noindex: ${url}`);
 assert(html.includes('application/ld+json')&&html.includes(site.listing),`Missing schema/CTA: ${url}`);
 return {url,status:r.status,title:html.match(/<title>(.*?)<\/title>/s)?.[1],xRobotsTag:r.headers.get('x-robots-tag')};
}));
for(const [route,expected] of [['/robots.txt',200],['/sitemap.xml',200],['/does-not-exist-ai-visibility-check/',404],['/content/site.json',404],['/operations/product-facts.json',404],['/google37d6469328ca9513.html',200],['/media/product-walkthrough.mp4',200],['/media/product-walkthrough.vtt',200]]){
 const r=await fetch(site.origin+route);assert.equal(r.status,expected,route);
 if(route==='/robots.txt')assert((await r.text()).includes('OAI-SearchBot\nAllow: /'));
 if(route.endsWith('.vtt'))assert(r.headers.get('content-type')?.includes('text/vtt'));
 results.push({url:site.origin+route,status:r.status,contentType:r.headers.get('content-type')});
}
const apex=new URL(site.origin);apex.hostname=apex.hostname.replace(/^www\./,'');
const redirect=await fetch(apex,{redirect:'manual'});
results.push({url:apex.href,status:redirect.status,location:redirect.headers.get('location')});
const log={checked:new Date().toISOString(),product:site.name,results};
if(process.argv[2])await writeFile(process.argv[2],JSON.stringify(log,null,2)+'\n');
console.log(JSON.stringify(log,null,2));
assert([301,308].includes(redirect.status),'Apex redirect should be permanent (301 or 308).');
