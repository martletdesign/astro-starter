import {spawn} from 'node:child_process';
import {mkdir,writeFile} from 'node:fs/promises';
import {chromium} from 'playwright';
import {PNG} from 'pngjs';
import pixelmatch from 'pixelmatch';

const pages=[['home','/'],['article','/article/'],['document','/document/']];
const sizes=[['desktop',1440,900],['mobile',390,844]];
const out='artifacts/visual-parity';
await mkdir(out,{recursive:true});
const servers=[
 spawn('python3',['-m','http.server','4811','--bind','127.0.0.1'],{cwd:'_baseline/dist',stdio:'ignore'}),
 spawn('python3',['-m','http.server','4812','--bind','127.0.0.1'],{cwd:'dist',stdio:'ignore'})
];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function ready(url){
 for(let i=0;i<40;i++){
   try{const r=await fetch(url);if(r.ok)return}catch{}
   await sleep(250);
 }
 throw Error('Local fixture server did not start: '+url);
}
const results=[];
let browser;
try{
 await Promise.all([ready('http://127.0.0.1:4811/'),ready('http://127.0.0.1:4812/')]);
 browser=await chromium.launch({headless:true});
 for(const [size,w,h] of sizes){
   const context=await browser.newContext({viewport:{width:w,height:h},deviceScaleFactor:1,reducedMotion:'reduce',colorScheme:'light'});
   for(const [label,path] of pages){
     const outputs=[];
     for(const [side,port] of [['baseline',4811],['candidate',4812]]){
       const page=await context.newPage();
       await page.goto('http://127.0.0.1:'+port+path,{waitUntil:'networkidle',timeout:30000});
       await page.evaluate(async()=>{
         await document.fonts.ready;
         const imgs=Array.from(document.images);
         await Promise.all(imgs.map(img=>img.complete?Promise.resolve():new Promise(resolve=>{img.addEventListener('load',resolve,{once:true});img.addEventListener('error',resolve,{once:true});setTimeout(resolve,3000)})));
       });
       await page.addStyleTag({content:'*,*::before,*::after{transition:none!important;animation:none!important;caret-color:transparent!important}'});
       const pathOut=out+'/'+label+'-'+size+'-'+side+'.png';
       await page.screenshot({path:pathOut,fullPage:true,animations:'disabled'});
       outputs.push(pathOut);
       await page.close();
     }
     const [a,b]=await Promise.all(outputs.map(async path=>PNG.sync.read(await (await import('node:fs/promises')).readFile(path))));
     let pixels,ratio=1,issue=null;
     if(a.width!==b.width||a.height!==b.height)issue='Dimensions differ: '+a.width+'x'+a.height+' vs '+b.width+'x'+b.height;
     else{
       const diff=new PNG({width:a.width,height:a.height});
       pixels=pixelmatch(a.data,b.data,diff.data,a.width,a.height,{threshold:0.12,includeAA:false});
       ratio=pixels/(a.width*a.height);
       await writeFile(out+'/'+label+'-'+size+'-diff.png',PNG.sync.write(diff));
     }
     const result={page:label,viewport:size,widthA:a.width,heightA:a.height,widthB:b.width,heightB:b.height,pixelsDifferent:pixels??null,ratio,issue};
     results.push(result);
     console.log('VISUAL_PARITY',JSON.stringify(result));
   }
   await context.close();
 }
 await writeFile(out+'/report.json',JSON.stringify(results,null,2)+'\n');
 const failures=results.filter(x=>x.issue||x.ratio>0.01);
 if(failures.length)throw Error('Visual parity failed in '+failures.length+' / '+results.length+' pages; see PNG diff artifact');
 console.log('VISUAL_PARITY_PASSED',results.length);
}finally{
 if(browser)await browser.close();
 for(const child of servers)child.kill();
}
