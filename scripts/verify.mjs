import assert from 'node:assert/strict';
import {readFile,access,readdir} from 'node:fs/promises';
import path from 'node:path';
const s=JSON.parse(await readFile('content/site.json','utf8'));
const routes=JSON.parse(await readFile('dist/route-manifest.json','utf8'));
const titles=new Set(),descriptions=new Set();let checked=0;
const read=path=>readFile(path,'utf8');
for(const {route,modified} of routes){
 const html=await read(`dist${route}index.html`);
 const title=html.match(/<title>(.*?)<\/title>/s)?.[1],desc=html.match(/name="description" content="([^"]+)"/)?.[1];
 assert(title&&!titles.has(title),`Missing/duplicate title: ${route}`);titles.add(title);
 assert(desc&&!descriptions.has(desc),`Missing/duplicate description: ${route}`);descriptions.add(desc);
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,route);
 assert(html.includes(`rel="canonical" href="${s.origin}${route}"`),`Canonical: ${route}`);
 if(route==='/' && s.bingVerification) assert(html.includes(`name="msvalidate.01" content="${s.bingVerification}"`),'Bing ownership verification tag');
 assert(html.includes('id="main"')&&html.includes('Skip to content'),`Accessibility: ${route}`);
 const preview=process.env.VERCEL_ENV==='preview';
 assert(html.includes(`name="robots" content="${preview?'noindex, nofollow':'index, follow, max-image-preview:large'}"`),`Indexability: ${route}`);
 const ld=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
 assert(ld['@graph'].some(g=>g['@type']==='WebPage'),`Schema: ${route}`);
 assert(html.includes(s.listing),`Shopify CTA: ${route}`);
 assert(!/TODO|TBD|lorem ipsum|undefined|\[object Object\]/i.test(html),`Placeholder: ${route}`);
 for(const m of html.matchAll(/(?:href|src|poster)="([^"#]+)"/g)){
  const url=m[1].replaceAll('&amp;','&');
  if(!url.startsWith('/'))continue;
  let target=path.join('dist',url.split(/[?#]/)[0]);if(url.endsWith('/'))target=path.join(target,'index.html');
  await access(target).catch(()=>{throw new Error(`Broken local resource ${url} in ${route}`)});checked++;
 }
 const sitemap=await read('dist/sitemap.xml');assert(sitemap.includes(`<loc>${s.origin}${route}</loc><lastmod>${modified}</lastmod>`),`Sitemap: ${route}`);
}
const notFound=await read('dist/404.html');assert(notFound.includes('noindex, nofollow'));
assert(!(await read('dist/sitemap.xml')).includes('/404'));
assert.equal(await read(`dist/${s.indexNowKey}.txt`),s.indexNowKey);
const robots=await read('dist/robots.txt');assert(process.env.VERCEL_ENV==='preview'?robots.includes('Disallow: /'):robots.includes('OAI-SearchBot\nAllow: /'));
for(const file of await readdir('content/articles')){
 if(!file.endsWith('.json'))continue;
 const a=JSON.parse(await read(`content/articles/${file}`));
 if(a.status!=='published')assert(!routes.some(p=>p.route===`/guides/${a.slug}/`),`Draft leaked: ${a.slug}`);
}
assert((await read('dist/media/product-walkthrough.vtt')).startsWith('WEBVTT'));
const config=JSON.parse(await read('vercel.json'));assert.equal(config.outputDirectory,'dist');assert.equal(config.trailingSlash,true);
console.log(`PASS: ${routes.length} pages, ${checked} internal links/assets, metadata, JSON-LD, sitemap, captions, draft exclusion and 404 checks.`);
