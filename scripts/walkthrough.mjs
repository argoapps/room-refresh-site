import {readFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
const s=JSON.parse(await readFile('content/site.json','utf8'));
const filter='[0:v]scale=1280:640:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2:color=white,setsar=1,fps=12,format=yuv420p[a];[1:v]scale=1280:640:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2:color=white,setsar=1,fps=12,format=yuv420p[b];[a][b]concat=n=2:v=1:a=0[v]';
const r=spawnSync('ffmpeg',['-y','-hide_banner','-loglevel','error','-loop','1','-t','12','-i',s.heroImage.slice(1),'-loop','1','-t','12','-i',s.setupImage.slice(1),'-filter_complex',filter,'-map','[v]','-an','-c:v','libx264','-preset','fast','-crf','24','-movflags','+faststart','-metadata',`title=${s.name}: existing product and setup images`,'media/product-walkthrough.mp4'],{stdio:'inherit'});
if(r.status!==0)throw new Error('ffmpeg walkthrough build failed');
console.log(`Created a 24-second silent walkthrough for ${s.name}. English captions are supplied separately in media/product-walkthrough.vtt.`);
