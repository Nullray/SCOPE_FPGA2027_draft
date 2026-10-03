// Render the actual editable mxGraph cells to SVG, vector PDF, and PNG.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(here,'../../..');
const toolRoot=path.join(root,'.paper-review/drawio-tools');
const require=createRequire(path.join(toolRoot,'package.json'));
const puppeteer=require('puppeteer-core');
const browser=await puppeteer.launch({
  executablePath:process.env.SCOPE_FIGURE_BROWSER||'C:/Program Files/Google/Chrome/Application/chrome.exe',
  userDataDir:path.join(root,'tmp/architecture_revision/chrome-profile'),
  headless:true,
  args:['--disable-gpu','--no-first-run','--disable-extensions','--disable-background-networking','--disable-sync']
});
const manifest=JSON.parse(fs.readFileSync(path.join(here,'sdap_manifest.json'),'utf8'));
const only=process.argv.find(a=>a.startsWith('--only='))?.slice(7).split(',');
const validations=[];
try {
  for(const f of manifest.filter(f=>!only||only.includes(f.figure))) {
    const raw=fs.readFileSync(path.join(here,f.figure+'.drawio'),'utf8');
    const page=await browser.newPage();
    await page.setViewport({width:f.width,height:f.height,deviceScaleFactor:1});
    await page.setContent(`<html><head><style>@page{size:${f.width}px ${f.height}px;margin:0}html,body{margin:0;background:white;width:${f.width}px;height:${f.height}px;overflow:hidden}#graph{overflow:hidden}#graph svg{display:block;overflow:hidden}*{-webkit-print-color-adjust:exact;print-color-adjust:exact}</style></head><body><div id="graph" style="width:${f.width}px;height:${f.height}px"></div></body></html>`);
    await page.evaluate(()=>{window.mxLoadResources=false;window.mxLoadStylesheets=false;});
    await page.addScriptTag({path:path.join(toolRoot,'node_modules/mxgraph/javascript/mxClient.js')});
    const result=await page.evaluate(({raw,w,h,figure})=>{
      const doc=new DOMParser().parseFromString(raw,'application/xml');
      if(doc.querySelector('parsererror'))throw Error('Invalid XML');
      const model=doc.querySelector('mxGraphModel');
      const cells=[...model.querySelectorAll('mxCell')];
      const errors=[],labels=[],glyphs=[];
      const measure=document.createElement('canvas').getContext('2d');
      for(const c of cells){
        const s=c.getAttribute('style')||'',v=c.getAttribute('value')||'';
        if(s.includes('image=')||s.includes('shape=stencil'))errors.push('Non-native asset');
        if(v){labels.push(v);if(!s.includes('fontFamily=Times New Roman'))errors.push('Wrong font: '+v);if(/\p{Script=Han}/u.test(v))errors.push('Non-English label');}
      }
      const graph=new mxGraph(document.getElementById('graph'));
      graph.setEnabled(false);graph.setHtmlLabels(false);graph.border=0;
      new mxCodec(doc).decode(model,graph.getModel());graph.view.validate();
      for(const c of Object.values(graph.getModel().cells)){
        if(!c.value||!c.vertex)continue;
        const s=graph.view.getState(c),b=s?.text?.boundingBox;
        if(b&&(b.x<-2||b.y<-2||b.x+b.width>w+2||b.y+b.height>h+2))errors.push('Outside canvas: '+c.value);
        if(b&&(b.width>s.width+4||b.height>s.height+4))errors.push('Text overflow: '+c.value);
        for(const t of s?.text?.node?.querySelectorAll('text')||[]){
          const g=t.getBBox(),r=t.getBoundingClientRect(),css=getComputedStyle(t);
          measure.font=`${css.fontStyle} ${css.fontWeight} ${css.fontSize} ${css.fontFamily}`;
          const m=measure.measureText(t.textContent);
          const anchor=css.textAnchor;
          const x=t.x.baseVal[0].value-(anchor==='middle'?m.width/2:anchor==='end'?m.width:0);
          const y=t.y.baseVal[0].value,ctm=t.getCTM();
          const a=new DOMPoint(x-m.actualBoundingBoxLeft,y-m.actualBoundingBoxAscent).matrixTransform(ctm);
          const b=new DOMPoint(x+m.actualBoundingBoxRight,y+m.actualBoundingBoxDescent).matrixTransform(ctm);
          glyphs.push({cell:c.id,label:c.value,x:a.x,y:a.y,w:b.x-a.x,h:b.y-a.y});
          if(g.x<s.x-3||g.y<s.y-3||g.x+g.width>s.x+s.width+3||g.y+g.height>s.y+s.height+3){errors.push('Glyph overflow: '+c.value);break;}
        }
      }
      // For each figure, inspect glyphs against
      // every segment, not only a label's allotted rectangle.
      let clearanceChecks=0;
      if(figure.startsWith('fig')){
        const hits=(p,q,r)=>{
          let lo=0,hi=1;const dx=q.x-p.x,dy=q.y-p.y;
          for(const [a,b] of [[-dx,p.x-r.x],[dx,r.x+r.w-p.x],[-dy,p.y-r.y],[dy,r.y+r.h-p.y]]){
            if(a===0){if(b<0)return false;continue;}
            const t=b/a;if(a<0)lo=Math.max(lo,t);else hi=Math.min(hi,t);if(lo>hi)return false;
          }return true;
        };
        const states=Object.values(graph.getModel().cells).map(c=>graph.view.getState(c)).filter(Boolean);
        for(let i=0;i<glyphs.length;i++)for(let j=i+1;j<glyphs.length;j++){
          const a=glyphs[i],b=glyphs[j];clearanceChecks++;
          if(a.cell!==b.cell&&a.x<b.x+b.w+2&&a.x+a.w+2>b.x&&a.y<b.y+b.h+2&&a.y+a.h+2>b.y)
            errors.push('Text intersects text: '+a.label+' / '+b.label);
        }
        const shapes=states.filter(s=>s.cell.vertex&&!s.cell.value&&s.style.fillColor!=='none'&&s.style.shape!=='ellipse');
        const components=shapes.filter(s=>!s.style.dashed&&!shapes.some(t=>t!==s&&t.x>s.x&&t.y>s.y&&t.x+t.width<s.x+s.width&&t.y+t.height<s.y+s.height));
        for(const s of states.filter(s=>s.cell.edge)){
          // Fold marks are shape details, not relationship lines.
          if(Number(s.style.strokeWidth)<2)continue;
          const pts=s.absolutePoints||[];
          for(const g of glyphs)for(let i=1;i<pts.length;i++){
            clearanceChecks++;
            if(hits(pts[i-1],pts[i],{x:g.x-4,y:g.y-4,w:g.w+8,h:g.h+8})){
              errors.push('Line intersects text: '+g.label);break;
            }
          }
          for(const c of components)for(let i=1;i<pts.length;i++){
            clearanceChecks++;
            if(hits(pts[i-1],pts[i],{x:c.x+4,y:c.y+4,w:c.width-8,h:c.height-8})){
              errors.push('Line crosses component interior: '+c.cell.id);break;
            }
          }
        }
        for(const s of states.filter(s=>s.cell.vertex&&!s.cell.value&&s.style.strokeColor!=='none'&&s.style.shape!=='ellipse'&&!/(?:^|;)strokeColor=none(?:;|$)/.test(s.cell.style||''))){
          const a={x:s.x,y:s.y},b={x:s.x+s.width,y:s.y},c={x:s.x+s.width,y:s.y+s.height},d={x:s.x,y:s.y+s.height};
          for(const g of glyphs)for(const [p,q] of [[a,b],[b,c],[c,d],[d,a]]){
            clearanceChecks++;
            if(hits(p,q,{x:g.x-2,y:g.y-2,w:g.w+4,h:g.h+4})){
              errors.push('Outline intersects text: '+g.label);break;
            }
          }
        }
        const heads=[...new Set(states.filter(s=>s.cell.edge&&s.style.endArrow==='block').map(s=>`${s.style.startSize}/${s.style.endSize}`))];
        if(heads.length!==1)errors.push('Inconsistent arrowhead sizes: '+heads.join(', '));
        const widthsByColor=new Map();
        for(const s of states.filter(s=>s.cell.edge&&s.style.endArrow==='block')){
          const widths=widthsByColor.get(s.style.strokeColor)||new Set();
          widths.add(s.style.strokeWidth);widthsByColor.set(s.style.strokeColor,widths);
        }
        for(const [color,widths] of widthsByColor)if(widths.size!==1)
          errors.push('Inconsistent arrow widths for '+color+': '+[...widths].join(', '));
      }
      const svg=document.querySelector('#graph svg');
      svg.setAttribute('xmlns','http://www.w3.org/2000/svg');svg.setAttribute('width',w);svg.setAttribute('height',h);svg.setAttribute('viewBox',`0 0 ${w} ${h}`);
      return {svg:new XMLSerializer().serializeToString(svg),labels,errors:[...new Set(errors)],nativeCells:cells.length-2,clearanceChecks};
    },{raw,w:f.width,h:f.height,figure:f.figure});
    fs.writeFileSync(path.join(here,f.figure+'.svg'),result.svg);
    await page.screenshot({path:path.join(here,f.figure+'.png')});
    await page.pdf({path:path.join(here,f.figure+'.pdf'),width:f.width+'px',height:f.height+'px',printBackground:true,preferCSSPageSize:true,margin:{top:0,right:0,bottom:0,left:0}});
    delete result.svg;validations.push({figure:f.figure,...result});
    console.log(f.figure,JSON.stringify(result.errors));await page.close();
  }
  const old=only&&fs.existsSync(path.join(here,'sdap_validation.json'))?JSON.parse(fs.readFileSync(path.join(here,'sdap_validation.json'),'utf8')):[];
  const merged=manifest.map(f=>validations.find(v=>v.figure===f.figure)||old.find(v=>v.figure===f.figure)).filter(Boolean);
  fs.writeFileSync(path.join(here,'sdap_validation.json'),JSON.stringify(merged,null,2)+'\n');
  if(validations.some(f=>f.errors.length))process.exitCode=1;
} finally {await browser.close();}
