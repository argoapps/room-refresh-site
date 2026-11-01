import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist');
const port=Number(process.env.PORT || 4173);
const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.xml':'application/xml','.txt':'text/plain','.png':'image/png','.jpg':'image/jpeg','.mp4':'video/mp4','.vtt':'text/vtt; charset=utf-8'};
http.createServer(async(req,res)=>{
  try {
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let file=path.resolve(root,`.${pathname}`);
    if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
    try{if((await stat(file)).isDirectory())file=path.join(file,'index.html');const body=await readFile(file);res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});res.end(body);}
    catch{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(path.join(root,'404.html')));}
  }catch{res.writeHead(400);res.end('Bad request');}
}).listen(port,'127.0.0.1',()=>console.log(`Preview: http://127.0.0.1:${port}`));
