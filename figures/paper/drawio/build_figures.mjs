// Reconstruct historical paper figures and subsequent AI-first revisions.
// Original PNGs are embedded ONLY on a separately named reference page.
// Run from any directory: node figures/paper/drawio/build_figures.mjs
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const paper = path.dirname(here);
const xml = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;').replaceAll('\n', '&#xa;');
const C = {
  ink: '#000B39', blue: '#1495FF', blueFill: '#DDEFFF', blueHead: '#B8DDFF',
  orange: '#FF650C', orangeFill: '#FFE8D7', orangeHead: '#FFCCA8',
  green: '#07995B', greenFill: '#DDF0E5', greenHead: '#BFE4D0',
  gray: '#85858E', grayFill: '#E6E6E8', blueDark: '#0A3476',
};
class Drawing {
  constructor(stem, source, w, h) {
    Object.assign(this, { stem, source, w, h, cells: [], n: 0 });
  }
  vertex(value, x, y, w, h, style, data = '') {
    const id = `v${++this.n}`;
    this.cells.push(`<mxCell id="${id}" value="${xml(value)}" style="${xml(style)}" vertex="1" parent="1"${data}><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
    return id;
  }
  text(value, x, y, w, h, size = 40, bold = false, align = 'center', color = C.ink) {
    return this.vertex(value, x, y, w, h,
      `text;html=0;whiteSpace=wrap;overflow=hidden;fillColor=none;strokeColor=none;fontFamily=Times New Roman;fontSize=${size};fontStyle=${bold ? 1 : 0};fontColor=${color};align=${align};verticalAlign=middle;spacing=0;`);
  }
  box(value, x, y, w, h, fill = C.blueFill, stroke = C.blue, size = 40, opts = {}) {
    return this.vertex(value, x, y, w, h,
      `rounded=${opts.square ? 0 : 1};absoluteArcSize=1;arcSize=${opts.arc ?? 24};whiteSpace=wrap;html=0;overflow=hidden;fillColor=${fill};strokeColor=${stroke};strokeWidth=${opts.strokeWidth ?? 3};fontFamily=Times New Roman;fontSize=${size};fontStyle=${opts.bold ? 1 : 0};fontColor=${opts.color ?? C.ink};spacing=4;align=center;verticalAlign=middle;${opts.dashed ? 'dashed=1;dashPattern=6 5;' : ''}`);
  }
  band(x, y, w, h, fill) { return this.box('', x, y, w, h, fill, 'none', 1, { square: true }); }
  line(points, color = C.ink, width = 3, opts = {}) {
    const id = `e${++this.n}`;
    const p = points[0], q = points.at(-1);
    let geometry = `<mxGeometry relative="1" as="geometry"><mxPoint x="${p[0]}" y="${p[1]}" as="sourcePoint"/><mxPoint x="${q[0]}" y="${q[1]}" as="targetPoint"/>`;
    if (points.length > 2) geometry += `<Array as="points">${points.slice(1, -1).map(([x, y]) => `<mxPoint x="${x}" y="${y}"/>`).join('')}</Array>`;
    geometry += '</mxGeometry>';
    const terminal = (opts.source ? ` source="${opts.source}"` : '') + (opts.target ? ` target="${opts.target}"` : '');
    const style = `html=0;noEdgeStyle=1;rounded=${opts.rounded ? 1 : 0};arcSize=20;strokeColor=${color};strokeWidth=${width};startArrow=${opts.both ? 'block' : 'none'};endArrow=${opts.arrow ? 'block' : 'none'};startFill=1;endFill=1;startSize=${opts.arrowSize ?? 20};endSize=${opts.arrowSize ?? 20};${opts.dashed ? 'dashed=1;dashPattern=3 2;' : ''}${opts.source ? 'exitX=1;exitY=0.5;exitDx=0;exitDy=0;' : ''}${opts.target ? 'entryX=0;entryY=0.5;entryDx=0;entryDy=0;' : ''}${opts.anchors ?? ''}`;
    this.cells.push(`<mxCell id="${id}" value="" style="${xml(style)}" edge="1" parent="1"${terminal}>${geometry}</mxCell>`);
    return id;
  }
  arrow(a, b, x1, y1, x2, y2, opts = {}) {
    return this.line([[x1, y1], [x2, y2]], opts.color ?? C.ink, opts.width ?? 5,
      { arrow: true, source: a, target: b, ...opts });
  }
  down(a, b, x, y1, y2, opts = {}) {
    return this.arrow(a, b, x, y1, x, y2,
      { anchors: 'exitX=0.5;exitY=1;entryX=0.5;entryY=0;', ...opts });
  }
  stencil(x, y, w, h, body, fill, stroke, width = 3) {
    const def = `<shape name="paper-shape" w="100" h="100" aspect="variable" strokewidth="inherit"><background><path>${body}</path></background><foreground><fillstroke/></foreground></shape>`;
    const packed = zlib.deflateRawSync(Buffer.from(encodeURIComponent(def))).toString('base64');
    return this.vertex('', x, y, w, h, `shape=stencil(${packed});fillColor=${fill};strokeColor=${stroke};strokeWidth=${width};`);
  }
  check(x, y, r) {
    this.vertex('', x, y, r, r, `shape=ellipse;fillColor=#388666;strokeColor=#388666;strokeWidth=2;`);
    this.line([[x + r * .24, y + r * .49], [x + r * .42, y + r * .67], [x + r * .76, y + r * .30]], '#FFFFFF', r * .09);
  }
  plane(value, x, y, w, h, fill, stroke, size = 50) {
    const id = this.stencil(x, y, w, h,
      '<move x="13" y="0"/><line x="100" y="0"/><line x="87" y="100"/><line x="0" y="100"/><close/>', fill, stroke);
    this.text(value, x + 35, y + 12, w - 70, h - 24, size, true, 'center', '#000000');
    return id;
  }
  page(name, content, id) {
    return `<diagram id="${id}" name="${xml(name)}"><mxGraphModel dx="${this.w}" dy="${this.h}" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="${this.w}" pageHeight="${this.h}" math="0" shadow="0" background="#FFFFFF"><root><mxCell id="0"/><mxCell id="1" parent="0"/>${content}</root></mxGraphModel></diagram>`;
  }
  write() {
    const png = fs.readFileSync(path.join(paper, this.source));
    if (png.readUInt32BE(16) !== this.w || png.readUInt32BE(20) !== this.h) throw Error('Source canvas changed: ' + this.stem);
    const reference = `<mxCell id="reference" value="" style="shape=image;imageAspect=0;aspect=fixed;image=data:image/png,${png.toString('base64')};" vertex="1" parent="1"><mxGeometry x="0" y="0" width="${this.w}" height="${this.h}" as="geometry"/></mxCell>`;
    const editable = this.page('Editable reconstruction', this.cells.join('\n'), 'editable');
    const ref = this.page('Original PNG - exact reference (not editable)', reference, 'reference');
    const data = `<mxfile host="app.diagrams.net" agent="Codex" compressed="false">${editable}${ref}</mxfile>\n`;
    fs.writeFileSync(path.join(here, `${this.stem}.drawio`), data);
    // A lightweight preview input excludes the reference bitmap, not the cells.
    fs.writeFileSync(path.join(here, `${this.stem}.editable.xml`), editable);
    return { figure: this.stem, source: this.source, width: this.w, height: this.h,
      nativeCells: this.n, referenceSha256: crypto.createHash('sha256').update(png).digest('hex') };
  }
}

function fig1() {
  const d = new Drawing('fig01_access_tradeoff', 'access_tradeoff_scope_v2.png', 1225, 1284);
  const titles = ['(a)  Direct attachment', '(b)  Device modeling', '(c)  SCOPE v2'];
  const values = [['fixed by attachment', 'in physical device', 'physical device'], ['software-defined', 'in device model', 'modeled'], ['software-defined', 'host mediation', 'physical device']];
  const fill = ['#D9EAFE', '#FFEAD3', '#DDF1DF'], accent = ['#0789FF', '#FF6500', '#009848'];
  [49, 464, 878].forEach((y, k) => {
    d.box('', 32, y, 1162, 387, '#FFFFFF', '#111111', 1, { square: true, strokeWidth: 2 });
    d.band(44, y + 2, 1148, 105, fill[k]); d.band(32, y, 12, 387, accent[k]);
    d.text(titles[k], 74, y + 7, 1080, 98, 60, true, 'left', '#000000');
    ['DUT view:', 'Control:', 'Execution:'].forEach((s, i) => {
      const yy = y + 125 + i * 83;
      d.text(s, 84, yy, 300, 66, 50, true, 'left', '#000000');
      d.line([[409, yy + 8], [409, yy + 63]], '#000000', 3);
      d.text(values[k][i], 479, yy, 680, 66, 50, false, 'left', '#000000');
    });
  });
  return d;
}
function fig2() {
  const d = new Drawing('fig02_driver_contract', 'driver_contract_ai_single_v2.png', 1024, 1536);
  for (const [x, title] of [[28, '(a) MMIO relay'], [518, '(b) Mediated contract']]) {
    d.box('', x, 73, 478, 1367, '#FFFFFF', '#B9E2FF', 1, { arc: 24, strokeWidth: 3 });
    d.band(x + 2, 75, 474, 108, '#CCE5FF'); d.text(title, x + 2, 91, 474, 86, 50, true);
  }
  const ys = [247, 530, 848, 1162];
  const left = ['Doorbell delivered', 'DMA address unresolved', 'Data not guaranteed', 'Completion unsafe'];
  const right = ['Stable submission', 'Reachable DMA address', 'Data visible', 'Completion published'];
  const a = [], b = [];
  ys.forEach((y, i) => {
    a.push(d.box(left[i], 52, y, 430, 144, [C.blueFill, C.orangeFill, C.grayFill, C.grayFill][i], [C.blue, C.orange, C.gray, C.gray][i], 40, { color: i > 1 ? '#515362' : C.ink }));
    b.push(d.box(right[i], 542, y, 432, 144, i < 2 ? C.blueFill : C.greenFill, i < 2 ? C.blue : C.green, 40));
  });
  for (let i = 0; i < 3; ++i) {
    d.down(a[i], a[i + 1], 267, ys[i] + 144, ys[i + 1] - 12, { color: [C.ink, '#DB3323', '#777981'][i], dashed: i === 1, width: i === 1 ? 8 : 5 });
    d.down(b[i], b[i + 1], 758, ys[i] + 144, ys[i + 1] - 12);
  }
  return d;
}
function fig3() {
  const d = new Drawing('fig03_system_architecture', 'system_architecture_ai_v2.png', 1816, 866);
  d.box('', 24, 40, 1767, 309, '#FFFFFF', C.blue, 1, { arc: 48, dashed: true, strokeWidth: 2.5 });
  d.box('', 24, 388, 1767, 448, '#FFFFFF', C.orange, 1, { arc: 48, dashed: true, strokeWidth: 2.5 });
  d.box('Phase 1   Configure the Logical Device View', 46, 24, 760, 53, C.blueFill, C.blue, 35, { bold: true, dashed: true, arc: 16 });
  d.box('Phase 2   Mediate Control, Retain Physical Execution', 46, 376, 870, 56, C.orangeFill, C.orange, 35, { bold: true, dashed: true, arc: 16, color: '#000000' });
  const hierarchy = d.box('', 79, 100, 433, 221, '#E6F3EC', '#6FC4A6', 1, { arc: 20, strokeWidth: 2 });
  d.text('DUT-visible PCIe hierarchy', 95, 107, 404, 46, 29, true, 'center', '#000000');
  const root = d.box('', 267, 158, 54, 40, '#ADCFEB', '#000000', 1, { square: true, strokeWidth: 3 });
  const ep1 = d.box('', 187, 231, 43, 41, '#C3E7D7', '#000000', 1, { square: true, strokeWidth: 3 });
  const ep2 = d.box('', 356, 231, 43, 41, '#C3E7D7', '#000000', 1, { square: true, strokeWidth: 3 });
  d.arrow(root, ep1, 270, 195, 210, 228, { width: 3, arrowSize: 14, anchors: 'exitX=0;exitY=1;entryX=0.5;entryY=0;' });
  d.arrow(root, ep2, 320, 195, 376, 228, { width: 3, arrowSize: 14, anchors: 'exitX=1;exitY=1;entryX=0.5;entryY=0;' });
  d.text('Endpoint', 134, 274, 140, 34, 28, false, 'center', '#000000');
  d.text('Endpoint', 312, 274, 140, 34, 28, false, 'center', '#000000');
  const fpga1 = d.box('FPGA\nfront-end', 640, 101, 171, 219, C.orangeFill, C.orange, 29, { color: '#000000', arc: 20, strokeWidth: 2 });
  const host1 = d.box('', 947, 100, 465, 222, '#D4EBFF', C.blue, 1, { arc: 20, strokeWidth: 2 });
  d.text('Host software back-end', 963, 104, 434, 44, 31, true);
  ['Topology policy', 'Virtual state', 'Device binding'].forEach((v, i) => d.box(v, 974, 160 + i * 54, 412, 44, '#E6F3FF', '#A1D0FA', 29, { arc: 14, strokeWidth: 2 }));
  d.arrow(host1, fpga1, 947, 207, 815, 207, { width: 3, arrowSize: 16, anchors: 'exitX=0;exitY=0.48;entryX=1;entryY=0.48;' });
  d.arrow(fpga1, hierarchy, 640, 207, 517, 207, { width: 3, arrowSize: 16, anchors: 'exitX=0;exitY=0.48;entryX=1;entryY=0.48;' });
  d.check(1506, 177, 66); d.text('Native driver\nenumerates', 1584, 178, 180, 72, 29);
  const driver = d.box('', 58, 450, 263, 161, '#D4EBFF', C.blue, 1, { arc: 16, strokeWidth: 2 });
  d.text('Native driver', 71, 455, 235, 38, 29);
  d.box('', 151, 504, 69, 56, '#FFFFFF', C.ink, 1, { square: true, strokeWidth: 3 });
  for (const y of [519, 533, 547]) d.line([[163, y], [208, y]], C.ink, 3);
  d.text('Descriptor + doorbell', 69, 567, 244, 34, 28);
  const queue = d.box('', 384, 512, 177, 37, '#DFEFFA', C.ink, 1, { square: true, strokeWidth: 3 });
  for (const x of [421, 457, 525]) d.line([[x, 513], [x, 548]], C.ink, 3);
  d.band(459, 514, 64, 34, '#FFFFFF');
  [478, 490, 502].forEach(x => d.vertex('', x, 529, 5, 5, `shape=ellipse;fillColor=${C.ink};strokeColor=none;`));
  const fpga2 = d.box('FPGA\nfront-end', 622, 452, 136, 160, C.orangeFill, C.orange, 29, { color: '#000000', arc: 20, strokeWidth: 2 });
  const host2 = d.box('', 959, 448, 384, 166, '#D4EBFF', C.blue, 1, { arc: 16, strokeWidth: 2 });
  d.text('Host software back-end', 974, 455, 355, 38, 29, true);
  d.box('Semantic mediation', 982, 503, 342, 44, '#E6F3FF', '#A1D0FA', 27, { arc: 14, strokeWidth: 2 });
  d.box('Address translation', 982, 557, 342, 44, '#E6F3FF', '#A1D0FA', 27, { arc: 14, strokeWidth: 2 });
  const device = d.box('', 1520, 448, 254, 165, '#E1F1E8', '#6FC4A6', 1, { arc: 16, strokeWidth: 2 });
  d.text('Physical device', 1534, 454, 226, 42, 29, false, 'center', '#000000');
  d.box('', 1564, 510, 167, 74, '#C1DCEF', '#000000', 1, { arc: 12, strokeWidth: 3 });
  [528, 542, 556].forEach(y => d.line([[1580, y], [1633, y]], '#000000', 3));
  for (const x of [1684, 1699, 1710]) d.vertex('', x - 4, 561, 9, 9, 'shape=ellipse;fillColor=#000000;strokeColor=none;');
  [1579, 1699].forEach(x => d.band(x, 585, 18, 12, '#000000'));
  d.arrow(driver, queue, 321, 531, 379, 531, { width: 3, arrowSize: 16 });
  d.arrow(queue, fpga2, 561, 531, 617, 531, { width: 3, arrowSize: 16 });
  d.arrow(fpga2, host2, 758, 534, 954, 534, { width: 3, arrowSize: 16 });
  d.text('Control event', 779, 493, 165, 37, 28);
  d.arrow(host2, device, 1347, 538, 1515, 538, { width: 3, arrowSize: 16 });
  d.text('Compatible\noperation', 1362, 455, 145, 72, 28);
  const mem = d.box('', 351, 621, 144, 76, '#BFDEF6', C.ink, 1, { square: true, strokeWidth: 3 });
  [638, 652, 666, 680].forEach(y => d.line([[375, y], [469, y]], C.ink, 3));
  d.text('DUT memory', 329, 699, 189, 36, 28);
  d.line([[1592, 616], [1592, 660], [501, 660]], '#2799E8', 11,
    { arrow: true, both: true, rounded: true, source: device, target: mem, arrowSize: 7, anchors: 'exitX=0.28;exitY=1;entryX=1;entryY=0.5;' });
  d.text('Payload DMA', 951, 669, 186, 36, 28);
  for (const [x, text, width] of [[243, 'Config before access', 320], [736, 'Translate before doorbell', 405], [1266, 'Data before completion', 390]]) {
    d.check(x, 774, 44); d.text(text, x + 64, 773, width, 49, 28, false, 'left');
  }
  return d;
}
function fig3Aligned() {
  const d = fig3();
  d.stem = 'fig03_system_architecture_aligned_v3';
  d.source = 'system_architecture_aligned_ai_v3.png';
  // Reconstruct the AI revision, preserving every internal module and edge.
  // Calibrate both inset title boxes to one exact geometric rule.
  const leftInset = 31, topInset = 18, titleHeight = 48;
  const replaceGeometry = (index, x, y, width, height) => {
    d.cells[index] = d.cells[index].replace(/<mxGeometry[^>]*\/>/,
      `<mxGeometry x="${x}" y="${y}" width="${width}" height="${height}" as="geometry"/>`);
  };
  replaceGeometry(0, 24, 27, 1767, 322);
  replaceGeometry(1, 24, 377, 1767, 459);
  replaceGeometry(2, 24 + leftInset, 27 + topInset, 760, titleHeight);
  replaceGeometry(3, 24 + leftInset, 377 + topInset, 934, titleHeight);
  for (const index of [2, 3]) {
    d.cells[index] = d.cells[index]
      .replace('dashed=1;dashPattern=6 5;', '')
      .replace('align=center;', 'align=left;spacingLeft=28;spacingRight=12;');
  }
  d.cells[2] = d.cells[2].replace('Phase 1   Configure', 'Phase 1  Configure');
  d.cells[3] = d.cells[3].replace('Phase 2   Mediate', 'Phase 2  Mediate');
  return d;
}
function fig4() {
  const d = new Drawing('fig04_sdn_planes', 'sdn_planes_scope_v2.png', 1254, 1254);
  d.line([[627, 118], [627, 1138]], '#85858B', 3);
  d.text('(a) SDN', 48, 130, 556, 103, 70, true, 'center', '#000000');
  d.text('(b) SCOPE v2', 663, 130, 572, 103, 70, true, 'center', '#000000');
  d.text('software-defined network', 66, 232, 524, 61, 45, true, 'center', '#000000');
  d.text('software-defined peripheral', 666, 232, 567, 61, 45, true, 'center', '#000000');
  const fills = ['#FBF0D6', '#FCE4D7', '#E0EED9'], strokes = ['#AB8139', '#CD7C49', '#487647'];
  ['Applications', 'Controller', 'Forwarding'].forEach((v, i) => d.plane(v, 39, [342, 593, 845][i], 570, i === 2 ? 211 : 196, fills[i], strokes[i], 50));
  ['Native drivers', 'FPGA + host software', 'Physical device +\nDUT memory'].forEach((v, i) => d.plane(v, 644, [342, 593, 845][i], 585, i === 2 ? 211 : 196, fills[i], strokes[i], 50));
  return d;
}
function fig5() {
  const d = new Drawing('fig05_coherence_contracts', 'coherence_contracts_ai_single_v2.png', 1230, 1278);
  d.text('Per-endpoint ordering contracts', 39, 61, 1152, 115, 78, true);
  const ys = [231, 528, 841], hs = [270, 284, 285];
  const names = ['Configuration', 'Submission', 'Completion'];
  const fills = [C.blueFill, C.orangeFill, C.greenFill], heads = [C.blueHead, C.orangeHead, C.greenHead], strokes = [C.blue, C.orange, '#00845C'];
  ys.forEach((y, i) => {
    d.band(26, y, 1179, hs[i], i === 0 ? '#F0F8FF' : i === 1 ? '#FFF5EE' : '#EFF8F2');
    d.band(26, y, 1179, 93, heads[i]); d.text(names[i], 58, y + 7, 1100, 79, 52, true, 'left');
  });
  const ca = d.box('Image + route agree', 51, 342, 487, 135, fills[0], strokes[0], 44);
  const cb = d.box('Write completes', 693, 342, 486, 135, fills[0], strokes[0], 44);
  d.arrow(ca, cb, 538, 412, 688, 412, { width: 8, arrowSize: 29 });
  for (const i of [1, 2]) {
    const labels = i === 1 ? ['Entry stable', 'Addresses\ntranslated', 'Doorbell'] : ['Data visible', 'Completion', 'Interrupt\nmay assert'];
    const b = labels.map((v, j) => d.box(v, [50, 456, 875][j], ys[i] + 110, [307, 318, 305][j], 154, fills[i], strokes[i], 43));
    d.arrow(b[0], b[1], 357, ys[i] + 187, 451, ys[i] + 187, { width: 8, arrowSize: 29 });
    d.arrow(b[1], b[2], 774, ys[i] + 187, 870, ys[i] + 187, { width: 8, arrowSize: 29 });
  }
  d.text('Required precedence, not measured latency;\nno cross-endpoint total order.', 188, 1155, 861, 90, 35);
  return d;
}
function fig6() {
  const d = new Drawing('fig06_topology_reconfiguration', 'topology_reconfiguration_ai_single_v2.png', 1254, 1254);
  const x = [28, 366, 662, 997], widths = [269, 225, 276, 229];
  [298, 782].forEach((y, row) => {
    const type = row ? 'network' : 'storage';
    d.text(`Run ${row ? 'B' : 'A'}: ${type}`, 44, row ? 674 : 177, 600, 87, 65, true, 'left');
    const labels = [`Logical view\n${type}`, 'FPGA\nfront-end', `Host adapter\n${type}`, 'Physical\ndevice'];
    const b = labels.map((v, i) => d.box(v, x[i], y, widths[i], 191,
      [C.blueFill, C.orangeFill, C.blueFill, '#D4EADD'][i], [C.blue, C.orange, C.blue, '#15A868'][i], 42));
    for (let i = 0; i < 3; ++i) d.arrow(b[i], b[i + 1], x[i] + widths[i] + 2, y + 97, x[i + 1] - 5, y + 97, { width: 5, arrowSize: 22 });
  });
  d.stencil(495, 501, 44, 269,
    '<move x="0" y="0"/><curve x1="50" y1="0" x2="50" y2="5" x3="50" y3="12"/><line x="50" y="38"/><curve x1="50" y1="47" x2="65" y2="50" x3="100" y3="50"/><curve x1="65" y1="50" x2="50" y2="53" x3="50" y3="62"/><line x="50" y="88"/><curve x1="50" y1="95" x2="50" y2="100" x3="0" y3="100"/>', 'none', C.orange, 7);
  d.text('same capacity', 558, 588, 336, 66, 43, false, 'left');
  d.text('Separate runs; compatible devices only.', 199, 1041, 852, 70, 42);
  return d;
}
function fig5v3() {
  const d = new Drawing('fig05_commit_points_v3', 'coherence_commit_points_ai_v3.png', 1254, 1254);
  d.text('Per-endpoint commit points', 94, 49, 1067, 129, 86, true);
  const names = ['Configuration', 'Submission', 'Completion'];
  const leftLabels = ['Image and\nroutes agree', 'Published work;\ntranslated state visible', 'Data visible;\ncompletion valid'];
  const commitLabels = ['Matching\nacknowledgment', 'Physical\ndoorbell', 'Completion\npublication'];
  const rightLabels = ['DUT write\ncompletes', 'Device owns\nthe work', 'DUT may\nconsume data'];
  const ys = [215, 506, 796];
  const body = ['#EDF7FF', '#FFF2E9', '#ECF7F0'];
  const heads = ['#BDE1FF', '#FFD0AF', '#BFE5D0'];
  const fills = ['#DDF0FF', '#FFEADD', '#E0F3E8'];
  const strokes = ['#108FFF', '#FF630C', '#008B59'];
  ys.forEach((y, i) => {
    d.box('', 27, y, 1200, 263, body[i], 'none', 1, { arc: 8 });
    d.band(27, y, 1200, 82, heads[i]);
    d.text(names[i], 55, y, 1096, 81, 59, true, 'left');
    const a = d.box(leftLabels[i], 49, y + 101, 393, 145, fills[i], strokes[i], i === 1 ? 37 : 42,
      { arc: 25, strokeWidth: 3, bold: true });
    const b = d.box(rightLabels[i], 820, y + 101, 385, 145, fills[i], strokes[i], 43,
      { arc: 25, strokeWidth: 3, bold: true });
    d.text(commitLabels[i], 449, y + 78, 355, 100, 37, true);
    d.arrow(a, b, 446, y + 188, 811, y + 188, { width: 4, arrowSize: 21,
      anchors: 'exitX=1;exitY=0.6;entryX=0;entryY=0.6;' });
    d.vertex('', 612, y + 173, 30, 30,
      'shape=ellipse;fillColor=#000B39;strokeColor=#FFFFFF;strokeWidth=2;');
  });
  d.line([[805, 1134], [934, 1134]], C.ink, 5, { arrow: true, arrowSize: 23 });
  d.text('Interrupt may assert', 946, 1108, 279, 52, 31, true);
  d.text('Required order within each endpoint.', 331, 1169, 626, 61, 36, true);
  return d;
}
function fig7() {
  const d = new Drawing('fig07_semantic_dma', 'semantic_dma_ai_single_v2.png', 1024, 1536);
  d.box('', 55, 55, 914, 945, '#FFFFFF', C.ink, 1, { arc: 36, strokeWidth: 5 });
  d.band(59, 60, 906, 105, '#D6EAFF'); d.text('Control metadata', 109, 67, 806, 84, 60, true);
  const a = d.box('DUT descriptor', 256, 200, 512, 122, '#E9F2FB', C.blueDark, 42, { strokeWidth: 4 });
  const b = d.box('', 209, 395, 606, 168, '#D5ECFF', '#078EFF', 42, { strokeWidth: 6 });
  d.text('Host software back-end', 240, 421, 545, 60, 43, true);
  d.text('translate DMA address', 238, 485, 548, 55, 38);
  const c = d.box('Device-visible descriptor', 242, 637, 540, 128, C.greenFill, '#008854', 41, { strokeWidth: 4 });
  const e = d.box('Physical doorbell', 288, 840, 447, 124, C.orangeFill, C.orange, 41, { strokeWidth: 4 });
  d.down(a, b, 512, 322, 390, { width: 8, arrowSize: 24 });
  d.down(b, c, 512, 563, 632, { width: 8, arrowSize: 24 });
  d.down(c, e, 512, 765, 835, { width: 8, arrowSize: 24 });
  d.box('', 49, 1106, 928, 356, '#FFFFFF', C.orange, 1, { arc: 32, strokeWidth: 5 });
  d.band(53, 1110, 920, 99, C.orangeFill); d.text('Payload movement', 87, 1115, 846, 78, 54, true, 'left');
  const mem = d.box('DUT memory', 77, 1269, 257, 137, C.blueFill, '#078EFF', 37, { strokeWidth: 4 });
  const dev = d.box('Physical device', 691, 1269, 259, 137, C.greenFill, C.green, 36, { strokeWidth: 4 });
  // A native polygon preserves the source's broad shaft and compact tips.
  d.stencil(337, 1307, 350, 62,
    '<move x="0" y="50"/><line x="10.57" y="0"/><line x="10.57" y="32.26"/><line x="89.43" y="32.26"/><line x="89.43" y="0"/><line x="100" y="50"/><line x="89.43" y="100"/><line x="89.43" y="67.74"/><line x="10.57" y="67.74"/><line x="10.57" y="100"/><close/>', '#168EDF', 'none', 0);
  d.text('DMA window', 347, 1272, 328, 50, 37);
  d.line([[782, 700], [823, 700], [823, 1265]], C.orange, 7,
    { arrow: true, dashed: true, source: c, target: dev, arrowSize: 24, anchors: 'entryX=0.51;entryY=0;' });
  d.text('same\nsubmission', 851, 1012, 157, 86, 31, false, 'left', '#F05A0A');
  return d;
}
function fig8() {
  const d = new Drawing('fig08_measurement_boundaries', 'measurement_boundaries_ai_single_v2.png', 1254, 1254);
  const color = ['#2867D5', '#FF5A0C', '#16A653'];
  const titles = ['Proxy BAR round trip', 'Semantic submission', 'Direct control'];
  const start = ['DUT write', 'BAR event', 'MMIO issue'], end = ['DUT ack', 'Physical doorbell', 'MMIO end'];
  const middle = ['FPGA + host software', 'Descriptor mediation', 'Direct path'];
  [230, 560, 890].forEach((y, i) => {
    d.text(titles[i], 52, y - 126, 1110, 84, 61, true, 'left', [ '#0736A4', '#F04A0A', '#00653B'][i]);
    d.line([[108, y], [1149, y]], color[i], 8);
    d.line([[108, y - 33], [108, y + 33]], color[i], 11);
    d.line([[1149, y - 33], [1149, y + 33]], color[i], 11);
    d.text(start[i], 51, y + 40, 268, 66, 41, false, 'left');
    d.text(end[i], i === 1 ? 945 : 1030, y + 40, i === 1 ? 298 : 204, 66, 40);
    d.text(middle[i], 320, y + 18, 614, 62, 40);
  });
  d.box('Different requesters and paths; not an additive overhead decomposition.', 30, 1058, 1196, 124, '#FFFFFF', C.ink, 37, { arc: 28, strokeWidth: 3 });
  return d;
}

const definitions = [
  ['fig01_access_tradeoff', fig1], ['fig02_driver_contract', fig2],
  ['fig03_system_architecture', fig3], ['fig04_sdn_planes', fig4],
  ['fig05_coherence_contracts', fig5], ['fig06_topology_reconfiguration', fig6],
  ['fig07_semantic_dma', fig7], ['fig08_measurement_boundaries', fig8],
  ['fig05_commit_points_v3', fig5v3],
  ['fig03_system_architecture_aligned_v3', fig3Aligned],
];
const only = process.argv.find(arg => arg.startsWith('--only='))?.slice(7).split(',') ?? [];
for (const stem of only) if (!definitions.some(([name]) => name === stem)) throw Error('Unknown figure: ' + stem);
const drawings = definitions.filter(([stem]) => !only.length || only.includes(stem)).map(([, build]) => build());
const updates = drawings.map(d => d.write());
const previous = only.length && fs.existsSync(path.join(here, 'manifest.json'))
  ? JSON.parse(fs.readFileSync(path.join(here, 'manifest.json'), 'utf8')) : [];
const manifest = [...previous.filter(f => !updates.some(u => u.figure === f.figure)), ...updates];
fs.writeFileSync(path.join(here, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(JSON.stringify(updates, null, 2));
