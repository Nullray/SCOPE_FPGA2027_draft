// Native, bitmap-free SDP figures. Historical filenames are retained.
// Run: node figures/paper/drawio/build_sdap_revision.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;')
  .replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll('\n','&#xa;');
const C = { ink:'#172B46', line:'#50657A', blue:'#2879AC', teal:'#16838B',
  orange:'#B86A30', green:'#4D886C', software:'#E7F1FA', hardware:'#FFF0E4',
  physical:'#E8F3ED', state:'#F1F3F6', muted:'#566778' };
class Diagram {
  constructor(stem,w,h) { Object.assign(this,{stem,w,h,n:0,cells:[]}); }
  vertex(value,x,y,w,h,style) {
    const id='v'+ ++this.n;
    this.cells.push(`<mxCell id="${id}" value="${esc(value)}" style="${esc(style)}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
    return id;
  }
  text(value,x,y,w,h,size=30,bold=false,color=C.ink,align='center') {
    return this.vertex(value,x,y-8,w,h+12,`text;html=0;whiteSpace=wrap;overflow=visible;fillColor=none;strokeColor=none;fontFamily=Times New Roman;fontSize=${size};fontStyle=${bold?1:0};fontColor=${color};align=${align};verticalAlign=middle;spacing=0;`);
  }
  shape(kind,x,y,w,h,fill,stroke=C.line,dashed=false) {
    return this.vertex('',x,y,w,h,`shape=${kind};rounded=${kind==='rectangle'?1:0};absoluteArcSize=1;arcSize=12;whiteSpace=wrap;html=0;fillColor=${fill};strokeColor=${stroke};strokeWidth=2;${dashed?'dashed=1;dashPattern=6 4;':''}`);
  }
  box(value,x,y,w,h,fill=C.software,size=30,bold=false) {
    const id=this.shape('rectangle',x,y,w,h,fill);
    this.text(value,x+8,y+4,w-16,h-10,size,bold); return id;
  }
  state(value,x,y,w,h,size=30,fill=C.state) {
    const id=this.shape('note',x,y,w,h,fill);
    this.edge([[x+w-22,y],[x+w-22,y+22],[x+w,y+22]],C.line,{arrow:false,width:1.8});
    this.edge([[x+w-22,y],[x+w,y+22]],C.line,{arrow:false,width:1.8});
    this.text(value,x+10,y+8,w-28,h-18,size); return id;
  }
  region(title,x,y,w,h,fill='#FFFFFF',size=32) {
    this.shape('rectangle',x,y,w,h,fill,C.line,true);
    this.text(title,x+8,y+7,w-16,43,size,true);
  }
  edge(points,color=C.ink,{both=false,dashed=false,arrow=true,width=2.6}={}) {
    const id='e'+ ++this.n, p=points[0], q=points.at(-1);
    const bends=points.slice(1,-1).map(([x,y])=>`<mxPoint x="${x}" y="${y}"/>`).join('');
    this.cells.push(`<mxCell id="${id}" value="" style="html=0;noEdgeStyle=1;rounded=0;strokeColor=${color};strokeWidth=${width};startArrow=${both?'block':'none'};endArrow=${arrow?'block':'none'};startFill=1;endFill=1;startSize=12;endSize=12;${dashed?'dashed=1;dashPattern=5 4;':''}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="${p[0]}" y="${p[1]}" as="sourcePoint"/><mxPoint x="${q[0]}" y="${q[1]}" as="targetPoint"/>${bends?`<Array as="points">${bends}</Array>`:''}</mxGeometry></mxCell>`);
  }
  dot(x,y,r=9) {this.shape('ellipse',x-r,y-r,r*2,r*2,C.ink,C.ink);}
  band(label,x,y,w,h,color,size=32) {
    this.shape('rectangle',x,y,w,h,color,'none'); this.text(label,x+10,y+1,w-20,h-4,size,true,C.ink,'left');
  }
  trimTop(amount) {
    this.cells=this.cells.map(cell=>cell.replace(/\by="(-?\d+(?:\.\d+)?)"/g,
      (_,y)=>`y="${Number(y)-amount}"`));
    this.h-=amount;
  }
  write() {
    const model=`<mxGraphModel page="1" pageScale="1" pageWidth="${this.w}" pageHeight="${this.h}" background="#FFFFFF" grid="1" gridSize="10"><root><mxCell id="0"/><mxCell id="1" parent="0"/>${this.cells.join('\n')}</root></mxGraphModel>`;
    const data=`<mxfile host="app.diagrams.net" version="24.7.17"><diagram id="sdp" name="SDP native diagram">${model}</diagram></mxfile>`;
    fs.writeFileSync(path.join(here,this.stem+'.drawio'),data);
    return {figure:this.stem,width:this.w,height:this.h,font:'Times New Roman',native:true};
  }
}
function comparison() {
  // The introduction compares functional roles; runtime paths belong in Fig. 3.
  // Neutral system names avoid suggesting authorship of another submission.
  const d=new Diagram('fig01_access_comparison_sdap',1100,820);
  d.text('DUT software',40,7,260,45,36,true);
  d.text('Access abstraction',420,7,300,45,36,true);
  d.text('Execution',820,7,240,45,36,true);
  const rows=[
    ['(a) Device modeling','DUT OS +\nnative driver',
      'Device model','Modeled\nexecution',C.state,C.state],
    ['(b) Direct attachment','DUT OS +\nnative driver',
      'Attached\ndevice view','Physical\ndevice',C.hardware,C.physical],
    ['(c) SCOPE','Adapted\nDUT software',
      'Command routing','Host physical\ndevice',C.hardware,C.physical],
    ['(d) SDP','DUT OS +\nnative driver',
      'Selected\ndevice view','Host physical\ndevice',C.hardware,C.physical]
  ];
  rows.forEach(([title,consumer,access,execution,accessFill,executionFill],i)=>{
    const y=75+i*185;
    d.region(title,15,y,1070,175,'#FFFFFF',38);
    d.box(consumer,40,y+60,260,100,C.software,36);
    d.box(access,420,y+60,300,100,accessFill,36);
    d.box(execution,820,y+60,240,100,executionFill,36);
    d.edge([[300,y+110],[420,y+110]],C.ink,{both:true});
    d.edge([[720,y+110],[820,y+110]],C.ink,{both:true});
  });
  return d.write();
}
function sdn() {
  const d=new Diagram('fig02_sdn_abstraction_sdap',1100,735);
  const xs=[20,575], w=505;
  d.text('(a) SDN',20,5,w,48,38,true);
  d.text('(b) SDP',575,5,w,48,38,true);
  for(let col=0;col<2;col++) {
    const x=xs[col];
    const labels=col===0 ? ['Application plane','Controller plane','Data plane']
      : ['Configuration','Control mediation','Physical execution'];
    const blocks=col===0 ? ['Network configuration','SDN controller','Forwarding elements']
      : ['Peripheral configuration','SDP control subsystem','Physical I/O devices'];
    [70,310,550].forEach((y,i)=>{
      d.region(labels[i],x,y,w,165,'#FFFFFF',34);
      d.box(blocks[i],x+20,y+58,w-40,88,[C.software,C.hardware,C.physical][i],34,i===1);
    });
    for(const [y,left,right] of [[235,col===0?'Policy':'Composition','State'],[475,col===0?'Rules':'Operations','Events']]) {
      d.edge([[x+200,y],[x+200,y+75]],C.ink);
      d.edge([[x+320,y+75],[x+320,y]],C.line);
      d.text(left,x+5,y+16,180,44,32);
      d.text(right,x+335,y+16,160,44,32);
    }
  }
  return d.write();
}
function architecture() {
  const d=new Diagram('fig03_system_architecture_sdap',1740,890);
  d.region('FPGA prototype',20,70,500,770,'#FFFFFF',36);
  d.box('DUT OS + native driver',55,145,430,80,C.software,32);
  d.shape('rectangle',55,285,450,385,C.hardware);
  // The header stays to the right of the DUT-to-window interface.
  d.text('FPGA front-end',270,300,220,45,32,true);
  d.box('Device access\nwindow',65,365,220,85,C.hardware,32);
  d.box('Access\ndecoder',335,365,165,85,C.hardware,32);
  d.box('Interrupt\ncontroller',65,550,220,90,C.hardware,32);
  d.box('Transport\ninterface',335,550,165,90,C.hardware,32);
  d.edge([[172,225],[172,365]],C.orange,{both:true});
  d.text('Device access',195,239,190,40,28);
  d.edge([[285,397],[335,397]],C.orange);
  d.edge([[417,450],[417,550]],C.orange);
  d.text('Events',321,474,83,40,28);
  d.edge([[335,575],[310,575],[310,432],[285,432]],C.orange);
  d.text('Responses',125,482,155,40,28);
  d.edge([[335,612],[285,612]],C.orange);
  d.edge([[65,590],[40,590],[40,185],[55,185]],C.orange);
  d.text('Interrupt',58,448,137,40,28);
  d.box('DUT memory',55,735,430,90,C.state,32);

  // A single runtime grid serves both hosts. Configuration authority is
  // explained in the lifecycle figure, rather than an empty remote row.
  for(const [x,title,state] of [[595,'Local host','Logical state'],[1195,'Remote host','Execution state']]) {
    d.region(title,x,70,505,580,'#FFFFFF',36);
    d.text('Software back-end',x+20,128,480,43,32,true);
    d.box('Transport interface',x+35,200,450,80,C.software,32);
    d.box('Semantic\nadapter',x+35,420,245,95,C.software,32);
    d.box('Device state\nmanager',x+310,350,175,100,C.software,32);
    d.text(state,x+297,458,200,39,28);
    d.box('Address\ntranslator',x+310,530,175,95,C.software,32);
    d.edge([[x+157,280],[x+157,420]],C.orange,{both:true});
    d.text('Requests /\nresults',x+182,304,125,78,28);
    d.edge([[x+310,396],[x+295,396],[x+295,444],[x+280,444]],C.orange,{arrow:false,dashed:true});
    d.edge([[x+310,575],[x+295,575],[x+295,488],[x+280,488]],C.orange,{arrow:false,dashed:true});
    d.box(title==='Local host'?'Local physical\ndevice':'Remote physical\ndevice',x+35,735,300,90,C.physical,32);
    d.edge([[x+157,515],[x+157,735]],C.orange,{both:true});
    d.text('Operations /\nresults',x+180,656,180,70,28);
  }
  d.edge([[500,590],[565,590],[565,240],[630,240]],C.orange,{both:true});
  d.edge([[1080,240],[1230,240]],C.orange,{both:true});
  d.text('RDMA',1105,179,85,43,28);
  d.edge([[630,795],[485,795]],C.blue,{both:true,width:2.6});
  d.text('P2P\nDMA',531,715,90,72,28,false,C.blue);
  d.edge([[45,867],[110,867]],C.orange,{both:true});
  d.text('Control',122,843,220,44,28,false,C.ink,'left');
  d.edge([[485,867],[550,867]],C.orange,{arrow:false,dashed:true});
  d.text('Dependency',562,843,270,44,28,false,C.ink,'left');
  d.edge([[1120,867],[1185,867]],C.blue,{both:true});
  d.text('Payload',1197,843,230,44,28,false,C.ink,'left');
  d.trimTop(50);
  return d.write();
}
function usage() {
  const d=new Diagram('fig04_configuration_runtime_sdap',1640,375);
  const stages=[
    ['1. Select and bind','Configuration tools','Device hierarchy\n+ bindings',C.software],
    ['2. Install state','Device state manager\n+ FPGA front-end','Configuration image\n+ BAR routes',C.hardware],
    ['3. OS enumeration','DUT OS PCIe\nbus subsystem','Functions +\nresources',C.software],
    ['4. Bind and initialize','DUT OS +\nnative drivers','Initialized devices',C.software]
  ];
  stages.forEach(([title,role,state,fill],i)=>{
    const x=25+i*420;
    d.region(title,x,85,330,275,'#FFFFFF',32);
    d.box(role,x+15,150,300,88,fill,30);
    d.state(state,x+15,260,300,85,30);
  });
  // Relationships are painted after the stage backgrounds, keeping each
  // arrowhead visible at the next component boundary.
  for(let i=0;i<3;i++){
    const x=25+i*420;
    d.edge([[x+315,194],[x+435,194]],C.orange);
  }
  d.trimTop(65);
  return d.write();
}
function commits() {
  // Dependencies, not a universal transport route: completion may be
  // published by software or directly by device DMA.
  const d=new Diagram('fig05_distributed_commits_sdap',1100,735);
  const rows=[
    ['Configuration','Configuration image and\nBAR routes installed\nin the FPGA',
      'C1: retire write','DUT may use\nthe updated mapping',C.software],
    ['Submission','Translated metadata and\nrequired input data\nvisible to the device',
      'C2: submit work','Physical device\nmay execute',C.hardware],
    ['Completion','Corresponding data effects\nvisible in DUT memory',
      'C3: publish completion','Driver may consume\nthe completed result',C.physical]
  ];
  rows.forEach(([title,prereq,event,result,fill],i)=>{
    const y=15+i*210;
    d.band(title,15,y,1070,43,fill,36);
    d.state(prereq,25,y+64,475,128,34);
    d.box(result,650,y+110,425,92,fill,32);
    d.text(event,620,y+59,475,45,34,true);
    d.edge([[500,y+145],[650,y+145]],C.ink,{dashed:true});
    d.dot(575,y+145);
  });
  d.text('C3: software or direct DMA publication',20,650,1060,36,32);
  d.text('Completion precedes its interrupt notification',20,692,1060,36,32);
  return d.write();
}
function dma() {
  const d=new Diagram('fig06_metadata_payload_sdap',1000,480);
  d.region('DUT domain',15,15,230,450,'#FFFFFF',30);
  d.region('Host software back-end',270,15,430,300,'#FFFFFF',30);
  d.region('Device domain',765,15,220,325,'#FFFFFF',30);
  d.box('Native driver',40,85,180,70,C.software,28);
  d.state('Published\nwork',40,205,180,85,30);
  d.box('Payload\nmemory',40,370,180,75,C.state,30);
  d.box('Endpoint\nstate',290,85,180,75,C.software,30);
  d.box('Address\ntranslator',500,85,180,75,C.software,30);
  d.box('Semantic adapter',355,210,260,75,C.software,30);
  d.state('Translated\nmetadata',785,95,180,80,28);
  d.box('Physical\ndevice',785,240,180,80,C.physical,30);
  d.box('FPGA DMA\naperture',390,370,260,75,C.hardware,30);
  d.edge([[130,155],[130,205]],C.ink);
  d.edge([[220,247],[355,247]],C.orange);
  d.edge([[380,160],[380,210]],C.ink);
  d.edge([[590,160],[590,210]],C.ink,{both:true});
  d.edge([[615,247],[735,247],[735,135],[785,135]],C.orange);
  d.edge([[875,175],[875,240]],C.ink);d.dot(875,210);
  d.text('C2',896,191,62,42,26,true);
  // The device consumes translated metadata; payload addresses are explained
  // in the text, not drawn as a metadata-to-aperture transport relationship.
  d.edge([[875,320],[875,407],[650,407]],C.blue,{both:true,width:3.5});
  d.edge([[390,407],[220,407]],C.blue,{both:true,width:3.5});
  d.text('DMA',692,359,120,40,28,false,C.blue);
  return d.write();
}
const only=process.argv.find(a=>a.startsWith('--only='))?.slice(7).split(',');
const previous=fs.existsSync(path.join(here,'sdap_manifest.json'))?JSON.parse(fs.readFileSync(path.join(here,'sdap_manifest.json'),'utf8')):[];
const builders=[comparison,sdn,architecture,usage,commits,dma];
const manifest=builders.map((build,i)=>!only||!previous[i]||only.includes(previous[i].figure)?build():previous[i]);
fs.writeFileSync(path.join(here,'sdap_manifest.json'),JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify(manifest.map(f=>f.figure)));
