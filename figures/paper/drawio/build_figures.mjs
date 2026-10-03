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
function fig1Comparison() {
  // Reconstruct the inspected AI comparison; keep the old Figure 1 intact.
  const d = new Drawing('fig01_access_comparison_v3', 'access_comparison_ai_v3.png', 1205, 1306);
  const ink = '#063460', blue = '#C8E7FC', orange = '#FFDBAF';
  const green = '#E0EFCD', header = '#C5E6FB', control = '#FF650C', payload = '#078BE6';
  function panel(y, height, title) {
    d.box('', 17, y, 1171, height, '#FFFFFF', ink, 1, { square: true, strokeWidth: 3 });
    d.band(19, y + 2, 1167, 74, header);
    d.line([[18, y + 77], [1186, y + 77]], ink, 2.5);
    d.text(title, 39, y, 1123, 74, 52, true, 'left', C.ink);
  }
  const block = (label, x, y, width, height, fill) =>
    d.box(label, x, y, width, height, fill, ink, 40, { arc: 14, strokeWidth: 3.5, color: '#000000' });
  const arrow = (a, b, x1, y1, x2, y2, opts = {}) =>
    d.arrow(a, b, x1, y1, x2, y2, { color: ink, width: 5, arrowSize: 19, ...opts });

  panel(15, 291, '(a) Device modeling');
  const modelDut = block('DUT\nNative driver', 42, 115, 315, 117, blue);
  const model = block('Device model', 441, 115, 323, 115, orange);
  const modeledIo = block('Modeled I/O', 848, 115, 316, 115, green);
  arrow(modelDut, model, 357, 173, 441, 173);
  arrow(model, modeledIo, 764, 173, 848, 173);
  d.text('Configurable view: model-limited behavior', 60, 233, 1085, 56, 40, false, 'center');

  panel(332, 355, '(b) Direct attachment');
  d.box('', 42, 423, 726, 186, '#FFFFFF', ink, 1, { square: true, dashed: true, strokeWidth: 2.5 });
  d.text('Prototype system boundary', 63, 414, 681, 56, 40, true, 'left');
  const directDut = block('DUT\nNative driver', 64, 473, 292, 115, blue);
  const attachment = block('Fixed attachment', 441, 473, 312, 114, orange);
  const directDevice = block('Physical device', 848, 473, 316, 114, green);
  arrow(directDut, attachment, 356, 530, 441, 530);
  arrow(attachment, directDevice, 753, 530, 848, 530);
  d.text('Physical execution; attachment-constrained view', 51, 614, 1102, 56, 40, false, 'center');

  panel(711, 580, '(c) SCOPE v2');
  d.box('', 42, 801, 585, 416, '#FFFFFF', ink, 1, { square: true, dashed: true, strokeWidth: 2.5 });
  d.text('FPGA prototype', 62, 797, 542, 56, 40, true, 'left');
  // Separate native text cells preserve the AI line spacing without clipping.
  d.text('Software-selected view', 62, 833, 542, 56, 40, true, 'left');
  d.text('and binding', 62, 871, 542, 56, 40, true, 'left');
  const scopeDut = block('DUT\nNative driver', 64, 928, 260, 103, blue);
  const frontEnd = block('FPGA\nfront-end', 394, 928, 215, 103, orange);
  const backEnd = block('Host software\nback-end', 875, 927, 290, 105, blue);
  const memory = block('DUT memory', 65, 1111, 260, 86, blue);
  const physical = block('Compatible\nphysical device', 881, 1101, 281, 109, green);
  arrow(scopeDut, frontEnd, 324, 979, 394, 979);
  d.down(scopeDut, memory, 194, 1031, 1111, { color: ink, both: true, width: 5, arrowSize: 18 });
  arrow(frontEnd, backEnd, 609, 980, 875, 980, { color: control, width: 5, arrowSize: 20 });
  d.text('Control', 637, 860, 230, 56, 40, true, 'center', control);
  d.text('mediation', 637, 899, 230, 56, 40, true, 'center', control);
  d.down(backEnd, physical, 1020, 1032, 1101, { color: control, width: 5, arrowSize: 20 });
  arrow(memory, physical, 325, 1155, 881, 1155, { color: payload, both: true, width: 7, arrowSize: 22 });
  d.text('Payload path', 487, 1081, 308, 55, 42, true, 'center', payload);
  d.text('Physical execution; mediated timing', 67, 1218, 1070, 56, 40, false, 'center');
  return d;
}
function fig1AcademicV4() {
  // AI-first four-way comparison; all historical definitions remain intact.
  // Minor lower-panel padding adjustments guarantee centered multiline text.
  const d = new Drawing('fig01_access_comparison_v4', 'access_comparison_ai_v4.png', 1142, 1377);
  const P = { ink: '#26323D', header: '#F3F4F5', neutral: '#F2F2F2',
    software: '#D5E5F5', physical: '#DDECDD', control: '#4F6070', payload: '#4477AA' };
  // mxGraph's SVG baseline places Times New Roman glyphs below the geometric
  // label center. Compensate in this figure only; verify the rendered glyphs,
  // not just align/verticalAlign, with the figure-specific centering check.
  const centered = (id, size) => {
    const offset = size === 50 ? -7 : -5.5;
    d.cells[d.cells.length - 1] = d.cells.at(-1).replace(
      'as="geometry"/>', `as="geometry"><mxPoint x="0" y="${offset}" as="offset"/></mxGeometry>`);
    return id;
  };
  const text = (value, x, y, w, h, size = 40, bold = false, color = P.ink) =>
    centered(d.text(value, x, y, w, h, size, bold, 'center', color), size);
  const block = (value, x, y, w, h, fill, opts = {}) =>
    centered(d.box(value, x, y, w, h, fill, P.ink, 40,
      { arc: 12, strokeWidth: 2.5, color: P.ink, ...opts }), 40);
  const arrow = (a, b, x1, y1, x2, y2, opts = {}) =>
    d.arrow(a, b, x1, y1, x2, y2,
      { color: P.control, width: 4.5, arrowSize: 16, ...opts });
  const panel = (y, h, title) => {
    d.box('', 17, y, 1108, h, '#FFFFFF', P.ink, 1,
      { square: true, strokeWidth: 2.4 });
    d.band(19, y + 2, 1104, 58, P.header);
    d.line([[18, y + 61], [1124, y + 61]], P.ink, 2);
    text(title, 36, y + 1, 1070, 59, 50, true);
  };
  const chain = (y, names, fills, dashedLast = false) => {
    const nodes = names.map((name, i) => block(name, [42, 426, 808][i],
      y, [298, 294, 294][i], 104, fills[i], { dashed: i === 2 && dashedLast }));
    arrow(nodes[0], nodes[1], 340, y + 52, 426, y + 52);
    arrow(nodes[1], nodes[2], 720, y + 52, 808, y + 52);
  };
  panel(14, 248, '(a) Device modeling');
  chain(95, ['DUT\nNative driver', 'Device model', 'Simulated\nresponses'],
    [P.software, P.neutral, P.neutral], true);
  text('Configurable view; modeled execution', 40, 208, 1060, 48);

  panel(282, 249, '(b) Direct attachment');
  chain(362, ['DUT\nNative driver', 'Fixed\nattachment', 'Physical\ndevice'],
    [P.software, P.neutral, P.physical]);
  text('Physical execution; attachment-defined view', 40, 477, 1060, 48);

  panel(550, 250, '(c) SCOPE (prior work)');
  chain(631, ['Adapted DUT\nsoftware', 'Borrowing\nsubstrate', 'Physical\ndevice'],
    [P.software, P.neutral, P.physical]);
  text('Dedicated interface; physical execution', 40, 745, 1060, 48);

  panel(820, 542, '(d) SCOPE v2 (this work)');
  d.box('', 42, 897, 633, 415, '#FFFFFF', P.control, 1,
    { square: true, dashed: true, strokeWidth: 2 });
  text('FPGA prototype', 56, 900, 605, 50, 40, true);
  text('Software-selected\ndevice hierarchy and binding', 55, 936, 607, 94, 38);
  const dut = block('DUT\nNative driver', 61, 1037, 258, 101, P.software);
  const front = block('FPGA\nfront-end', 418, 1037, 237, 101, P.neutral);
  const back = block('Host software\nback-end', 848, 1037, 260, 101, P.software);
  const memory = block('DUT memory', 61, 1198, 258, 96, P.neutral);
  const physical = block('Compatible\nphysical device', 848, 1192, 260, 108, P.physical);
  arrow(dut, front, 319, 1087.5, 418, 1087.5);
  arrow(front, back, 655, 1087.5, 848, 1087.5);
  text('Control\nmediation', 660, 977, 183, 93, 38);
  d.down(dut, memory, 190, 1138, 1198,
    { color: P.control, both: true, width: 4.5, arrowSize: 16 });
  d.down(back, physical, 978, 1138, 1192,
    { color: P.control, width: 4.5, arrowSize: 16 });
  arrow(memory, physical, 319, 1246, 848, 1246,
    { color: P.payload, both: true, width: 6, arrowSize: 19 });
  text('Payload path', 372, 1178, 430, 50, 40, true, P.payload);
  text('Configurable native view; mediated timing', 40, 1314, 1060, 45);
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

function figSdnPlanesV3() {
  // AI-first conceptual comparison, redrawn as native cells with corrected
  // directional semantics and the manuscript's front-end/back-end palette.
  const d = new Drawing('fig01_sdn_planes_v3', 'sdn_planes_comparison_ai_v3.png', 1983, 793);
  const ink = '#102F50', soft = '#F8F0E1', control = '#F9E6D8', data = '#E7F1E6';
  const blue = '#DCEBFA', orange = '#FBE5D5', gray = '#E4ECF3', green = '#DDEFE2';
  const plane = (x, y, h, fill, title) => {
    d.stencil(x, y, 925, h,
      '<move x="9" y="0"/><line x="100" y="0"/><line x="91" y="100"/><line x="0" y="100"/><close/>',
      fill, ink, 2.5);
    d.text(title, x + 102, y + 10, 720, 60, 42, true, 'left', ink);
  };
  const role = (title, subtitle, x, y, w, h, fill = blue, titleSize = 36, subSize = 28) => {
    const id = d.box('', x, y, w, h, fill, ink, 1,
      { arc: 13, strokeWidth: 2.5, square: true });
    if (subtitle) {
      d.text(title, x + 10, y + 8, w - 20, h * .46, titleSize, true, 'center', ink);
      d.text(subtitle, x + 10, y + h * .48, w - 20, h * .40, subSize, false, 'center', ink);
    } else d.text(title, x + 10, y + 2, w - 20, h - 4, titleSize, true, 'center', ink);
    return id;
  };
  d.text('(a) SDN', 290, 0, 400, 60, 46, true, 'center', ink);
  d.text('(b) SCOPE v2', 1274, 0, 450, 60, 46, true, 'center', ink);
  for (const x of [30, 1020]) {
    plane(x, 63, 177, soft, 'Software Plane');
    plane(x, 330, 205, control, 'Control Plane');
    plane(x, 615, 165, data, 'Data Plane');
  }

  role('Network\napplications', '', 205, 140, 275, 83, blue, 30);
  role('Policy / intent', '', 530, 140, 282, 83, blue, 34);
  d.line([[484, 182], [523, 182]], ink, 3, { arrow: true, arrowSize: 11 });
  role('DUT OS', '', 1204, 140, 275, 83, blue, 35);
  role('Native drivers\nconsume hierarchy', '', 1527, 140, 297, 83, blue, 29);

  const controller = d.box('', 243, 404, 498, 121, blue, ink, 1,
    { arc: 13, strokeWidth: 2.5, square: true });
  d.text('SDN controller', 258, 410, 468, 48, 38, true, 'center', ink);
  d.text('Network state', 262, 468, 214, 43, 30, false, 'center', ink);
  d.text('Rule selection', 498, 468, 214, 43, 30, false, 'center', ink);
  d.line([[490, 467], [490, 513]], '#8A9DAE', 2);
  const front = role('FPGA front-end', 'DUT-visible interface', 1128, 404, 290, 121, orange, 31, 26);
  const back = d.box('', 1475, 404, 350, 121, blue, ink, 1,
    { arc: 13, strokeWidth: 2.5, square: true });
  d.text('Host software\nback-end', 1485, 405, 330, 76, 29, true, 'center', ink);
  d.text('Assignment + mediation', 1485, 475, 330, 40, 27, false, 'center', ink);
  d.line([[1425, 465], [1468, 465]], ink, 3, { both: true, arrow: true, arrowSize: 12,
    source: front, target: back, anchors: 'exitX=1;exitY=0.5;entryX=0;entryY=0.5;' });

  role('Forwarding\nelement', '', 140, 694, 250, 72, blue, 25);
  role('Forwarding\nelement', '', 600, 694, 250, 72, blue, 25);
  d.line([[398, 730], [590, 730]], '#216895', 3.5, { arrow: true, arrowSize: 14 });
  d.text('Packet path', 401, 678, 186, 37, 29, false, 'center', ink);
  role('DUT memory', '', 1133, 694, 258, 72, gray, 31);
  role('Physical devices', '', 1570, 694, 250, 72, green, 29);
  d.line([[1400, 730], [1560, 730]], '#216895', 3.5, { both: true, arrow: true, arrowSize: 14 });
  d.text('Payload path', 1403, 678, 151, 37, 28, false, 'center', ink);

  const vertical = (x, y1, y2, label, direction, labelX, width) => {
    d.line(direction === 'down' ? [[x, y1], [x, y2]] : [[x, y2], [x, y1]],
      ink, 3, { arrow: true, arrowSize: 14 });
    d.text(label, labelX, y1 + 19, width, 46, 32, false, 'center', ink);
  };
  vertical(362, 245, 322, 'Intent', 'down', 212, 128);
  vertical(672, 245, 322, 'State', 'up', 693, 132);
  vertical(362, 540, 608, 'Rules', 'down', 218, 118);
  vertical(672, 540, 608, 'Events', 'up', 691, 145);
  vertical(1351, 245, 322, 'Device view', 'up', 1117, 218);
  vertical(1681, 245, 322, 'Device access', 'down', 1697, 226);
  vertical(1620, 540, 608, 'Operations', 'down', 1420, 184);
  vertical(1780, 540, 608, 'Completions', 'up', 1787, 184);
  return d;
}

function fig4UsageAligned() {
  // The author's live v3 drawing, not the stale generated PNG, is the baseline.
  // Write a sibling: never overwrite that manual edit with a historical build.
  const source = 'configuration_runtime_ai_v4.png';
  const bitmap = fs.readFileSync(path.join(paper, source));
  const w = bitmap.readUInt32BE(16), h = bitmap.readUInt32BE(20);
  if (Math.abs(w - 1816) > 2 || Math.abs(h - 866) > 2) throw Error('Unexpected usage reference aspect ratio');
  const d = new Drawing('fig04_configuration_runtime_v4', source, w, h);
  const raw = fs.readFileSync(path.join(here, 'fig03_system_architecture_aligned_v3.drawio'), 'utf8');
  const root = raw.match(/<diagram\b[^>]*id="editable"[^>]*>[\s\S]*?<root>([\s\S]*?)<\/root>/)?.[1];
  if (!root) throw Error('Missing author-edited native page');
  d.cells = [...root.matchAll(/<mxCell\b[^>]*?(?:\/>|>[\s\S]*?<\/mxCell>)/g)]
    .map(m => m[0]).filter(c => !/^<mxCell\b[^>]*id="[01]"(?:\s|\/|>)/.test(c));
  d.n = Math.max(...d.cells.map(c => Number(c.match(/id="[ve](\d+)"/)?.[1] ?? 0)));
  if (d.cells.length !== 78) throw Error('Author baseline changed; inspect it before rebuilding');
  const index = id => {
    const n = d.cells.findIndex(c => c.includes(`id="${id}"`));
    if (n < 0) throw Error('Missing author cell: ' + id);
    return n;
  };
  const geometry = (id, x, y, w, h, size) => {
    const offset = size ? `<mxPoint x="0" y="${-size * .14}" as="offset"/>` : '';
    d.cells[index(id)] = d.cells[index(id)].replace(/<mxGeometry\b[^>]*\/>|<mxGeometry\b[^>]*>[\s\S]*?<\/mxGeometry>/,
      `<mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry">${offset}</mxGeometry>`);
  };
  const style = (id, updates) => {
    d.cells[index(id)] = d.cells[index(id)].replace(/style="([^"]*)"/, (_, value) => {
      const parts = value.split(';').filter(s => s && !Object.hasOwn(updates, s.split('=')[0]));
      return `style="${parts.concat(Object.entries(updates).map(([k,v]) => k + '=' + v)).join(';')};"`;
    });
  };
  // Match repeated components exactly; backend heights remain content-driven.
  geometry('v14', 640, 131, 171, 160, 29);
  geometry('v40', 640, 451, 171, 160, 29);
  geometry('v15', 947, 100, 420, 222);
  geometry('v41', 947, 448, 420, 166);
  style('v41', {arcSize:20});
  geometry('v16', 961, 104, 392, 44, 31);
  geometry('v42', 961, 452, 392, 44, 31);
  style('v42', {fontSize:31});
  for (const [id,y] of [['v17',160],['v18',214],['v19',268],['v43',503],['v44',557]]) {
    geometry(id, 974, y, 366, 44, 29);
    style(id, {fontSize:29});
  }
  geometry('v59', 815, 453, 130, 72, 28);
  d.cells[index('v59')] = d.cells[index('v59')].replace('value="Control event"', 'value="Control&#xa;event"');
  geometry('v61', 1374, 455, 141, 72, 28);
  const edge = (id, points, anchors) => {
    const [a,b] = points;
    d.cells[index(id)] = d.cells[index(id)].replace(/<mxGeometry\b[^>]*>[\s\S]*?<\/mxGeometry>/,
      `<mxGeometry relative="1" as="geometry"><mxPoint x="${a[0]}" y="${a[1]}" as="sourcePoint"/><mxPoint x="${b[0]}" y="${b[1]}" as="targetPoint"/></mxGeometry>`);
    style(id, anchors);
  };
  edge('e20', [[947,211],[811,211]], {exitX:0,exitY:.5,entryX:1,entryY:.5});
  edge('e21', [[640,211],[512,211]], {exitX:0,exitY:.5,entryX:1,entryY:111/221});
  edge('e57', [[561,531],[640,531]], {exitX:1,exitY:19/37,entryX:0,entryY:.5});
  edge('e58', [[811,531],[947,531]], {exitX:1,exitY:.5,entryX:0,entryY:.5});
  edge('e60', [[1367,531],[1520,531]], {exitX:1,exitY:.5,entryX:0,entryY:83/165});
  // v1-v4 remain byte-for-byte cells from the author's coincident-corner edit.
  return d;
}

function fig4UsageSharedRoles() {
  // AI-first terminology update. Keep the author's aligned geometry and the
  // current v4 source untouched; only labels change in this sibling revision.
  const source = 'configuration_runtime_ai_v5.png';
  const bitmap = fs.readFileSync(path.join(paper, source));
  const w = bitmap.readUInt32BE(16), h = bitmap.readUInt32BE(20);
  const d = new Drawing('fig04_configuration_runtime_v5', source, w, h);
  const raw = fs.readFileSync(path.join(here, 'fig04_configuration_runtime_v4.drawio'), 'utf8');
  const root = raw.match(/<diagram\b[^>]*id="editable"[^>]*>[\s\S]*?<root>([\s\S]*?)<\/root>/)?.[1];
  if (!root) throw Error('Missing aligned usage baseline');
  d.cells = [...root.matchAll(/<mxCell\b[^>]*?(?:\/>|>[\s\S]*?<\/mxCell>)/g)]
    .map(m => m[0]).filter(c => !/^<mxCell\b[^>]*id="[01]"(?:\s|\/|>)/.test(c));
  const renames = new Map([
    ['Configure the Logical Device View', 'Configure the Device Hierarchy'],
    ['DUT-visible PCIe hierarchy', 'DUT-visible device hierarchy'],
    ['Host software back-end', 'Local software back-end'],
    ['Topology policy', 'Hierarchy definition'],
    ['Virtual state', 'Device state'],
    ['Device binding', 'Device assignment'],
    ['Payload DMA', 'Host-local payload DMA'],
  ]);
  for (const [oldLabel,newLabel] of renames) {
    if (!d.cells.some(c => c.includes(oldLabel))) throw Error('Missing usage label: ' + oldLabel);
    d.cells = d.cells.map(c => c.replaceAll(oldLabel, newLabel));
  }
  d.n = Math.max(...d.cells.map(c => Number(c.match(/id="[ve](\d+)"/)?.[1] ?? 0)));
  if (d.cells.length !== 78) throw Error('Aligned usage baseline changed; inspect before rebuilding');
  return d;
}

function fig4UsageCombinedAssignment() {
  // Inspect the AI two-field revision first, then preserve the author's
  // frame/header cells and tighten the repeated component grid natively.
  const source = 'configuration_runtime_ai_v6.png';
  const png = fs.readFileSync(path.join(paper, source));
  const d = new Drawing('fig04_configuration_runtime_v6', source,
    png.readUInt32BE(16), png.readUInt32BE(20));
  const raw = fs.readFileSync(path.join(here, 'fig04_configuration_runtime_v5.editable.xml'), 'utf8');
  const root = raw.match(/<root>([\s\S]*?)<\/root>/)?.[1];
  if (!root) throw Error('Missing shared-role usage baseline');
  d.cells = [...root.matchAll(/<mxCell\b[^>]*?(?:\/>|>[\s\S]*?<\/mxCell>)/g)]
    .map(m=>m[0]).filter(c=>!/^<mxCell\b[^>]*id="[01]"(?:\s|\/|>)/.test(c));
  const index = id => {
    const i = d.cells.findIndex(c=>c.includes(`id="${id}"`));
    if (i<0) throw Error('Missing usage cell: '+id);
    return i;
  };
  const geometry = (id,x,y,w,h,size) => {
    const offset = size ? `<mxPoint x="0" y="${-size*.14}" as="offset"/>` : '';
    const i = index(id);
    d.cells[i] = d.cells[i].replace(/<mxGeometry\b[^>]*\/>|<mxGeometry\b[^>]*>[\s\S]*?<\/mxGeometry>/,
      `<mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry">${offset}</mxGeometry>`);
  };
  d.cells[index('v17')] = d.cells[index('v17')].replace('Hierarchy definition','Device assignment');
  d.cells.splice(index('v19'),1);
  geometry('v15',947,128,420,166);
  geometry('v16',961,132,392,44,31);
  geometry('v17',974,183,366,44,29);
  geometry('v18',974,237,366,44,29);
  // Expanded wording needs a wider label area, not a smaller font or clipping.
  geometry('v69',861,669,366,44,28);
  // The arrow and front-end centers remain at y=211; phase 2 is unchanged.
  // No cells are added after removal; use the actual native-cell count.
  d.n = d.cells.length;
  if (d.n!==77) throw Error('Unexpected usage cells; inspect the baseline');
  return d;
}

function fig3SystemOrganization() {
  // AI-first static architecture: preserve the inspected relational design.
  const d = new Drawing('fig03_system_organization_v1', 'system_organization_ai_v3.png', 1254, 1254);
  const P = {ink:C.ink, driver:'#D4EBFF', front:C.orangeFill,
    software:'#D4EBFF', item:'#E6F3FF', device:'#E1F1E8', memory:'#BFDEF6',
    payload:'#2799E8', region:'#38536B'};
  const center = (id,size) => {
    d.cells[d.cells.length - 1] = d.cells.at(-1).replace('as="geometry"/>',
      `as="geometry"><mxPoint x="0" y="${-size*.14}" as="offset"/></mxGeometry>`);
    return id;
  };
  const text = (v,x,y,w,h,size=44,bold=false) => center(d.text(v,x,y,w,h,size,bold,'center',P.ink),size);
  const node = (v,x,y,w,h,fill,stroke,size=44,opts={}) =>
    center(d.box(v,x,y,w,h,fill,stroke,size,{arc:18,strokeWidth:2.8,color:P.ink,...opts}),size);
  const link = (a,b,x1,y1,x2,y2,opts={}) => d.arrow(a,b,x1,y1,x2,y2,
    {color:P.ink,width:4,arrowSize:13,...opts});

  node('',33,80,522,1103,'#FFFFFF',P.region,1,{arc:24,strokeWidth:3.2});
  node('',700,80,522,1103,'#FFFFFF',P.region,1,{arc:24,strokeWidth:3.2});
  text('FPGA prototype',54,93,480,72,52,true);
  text('Host system',721,93,480,72,52,true);
  const dut = node('',56,173,477,195,P.driver,C.blue,1);
  text('DUT',76,207,437,76,52,true);
  text('Native driver',76,272,437,58,46);
  const front = node('',56,469,478,424,P.front,C.orange,1);
  text('FPGA front-end',73,490,444,87,52,true);
  const back = node('',722,173,478,720,P.software,C.blue,1);
  text('Host software\nback-end',739,193,444,132,52,true);
  const memory = node('DUT memory',56,1002,477,153,P.memory,C.blue,50,{bold:true});
  const device = node('Physical device',724,1002,476,153,P.device,'#6FC4A6',50,{bold:true});

  const presentation = node('Device presentation',75,583,378,79,'#FFF0E4',C.orange,44);
  const routing = node('Access routing',75,701,378,79,'#FFF0E4',C.orange,44);
  const interrupt = node('Interrupt delivery',75,799,378,72,'#FFF0E4',C.orange,44);
  // Shared interface rail is not a pipeline or a new hardware protocol engine.
  const rail = node('',494,581,8,290,P.ink,'none',1,{arc:8,strokeWidth:0});
  for (const [id,y] of [[presentation,622.5],[routing,740.5],[interrupt,835]])
    d.line([[453,y],[498,y]],P.ink,4.5,{source:id,target:rail,
      anchors:`exitX=1;exitY=0.5;entryX=0;entryY=${(y-581)/290};entryPerimeter=0;`});
  link(presentation,routing,264,662,264,701,{both:true,width:3,arrowSize:9,dashed:true,
    anchors:'exitX=0.5;exitY=1;entryX=0.5;entryY=0;'});

  const policy = node('Topology policy',739,342,444,95,P.item,C.blue,44);
  const state = node('Virtual\nstate',739,492,204,133,P.item,C.blue,44);
  const binding = node('Device\nbinding',979,492,204,133,P.item,C.blue,44);
  const mediation = node('Semantic\nmediation',739,700,204,143,P.item,C.blue,44);
  const translation = node('Address\ntranslation',979,700,204,143,P.item,C.blue,44);
  link(policy,state,894,437,841,492,{anchors:'exitX=0.35;exitY=1;entryX=0.5;entryY=0;'});
  link(policy,binding,1028,437,1081,492,{anchors:'exitX=0.65;exitY=1;entryX=0.5;entryY=0;'});
  link(state,mediation,841,625,841,700,{both:true,
    anchors:'exitX=0.5;exitY=1;entryX=0.5;entryY=0;'});
  link(binding,mediation,1014,625,906,700,{anchors:'exitX=0.17;exitY=1;entryX=0.82;entryY=0;'});
  link(mediation,translation,943,771.5,979,771.5,{both:true,width:3,arrowSize:9});

  link(dut,front,294.5,368,294.5,469,{both:true,
    anchors:'exitX=0.5;exitY=1;entryX=0.5;entryY=0;'});
  text('Device\naccess',321,369,191,100,42);
  link(rail,back,502,701,722,701,{both:true,width:4.5,
    anchors:`exitX=1;exitY=${120/290};entryX=0;entryY=${528/720};`});
  text('Control\nchannel',557,595,141,100,42);
  link(front,memory,294.5,893,294.5,1002,{both:true,color:P.payload,width:7,arrowSize:17,
    anchors:'exitX=0.5;exitY=1;entryX=0.5;entryY=0;'});
  text('DMA\nwindow',320,897,191,100,42);
  link(back,device,961,893,961,1002,{both:true,
    anchors:'exitX=0.5;exitY=1;entryX=0.5;entryY=0;'});
  text('Compatible\noperation',974,897,217,100,42);
  link(memory,device,533,1083,724,1083,{both:true,color:P.payload,width:8,arrowSize:17,
    anchors:`exitX=1;exitY=${81/153};entryX=0;entryY=${81/153};`});
  text('Payload\nDMA',557,976,141,100,42);
  return d;
}
function fig3SystemOrganizationP2P() {
  // Reconstruct the inspected v5 AI design: mechanisms, not goals-as-modules.
  // The direct P2P edge abstracts routing/mapping; it adds no physical link.
  const d = new Drawing('fig03_system_organization_v2', 'system_organization_ai_v5.png', 1254, 1254);
  const P = {ink:C.ink, driver:'#D4EBFF', front:C.orangeFill,
    software:'#D4EBFF', item:'#E6F3FF', device:'#E1F1E8', memory:'#BFDEF6',
    payload:'#2799E8', region:'#38536B'};
  const center = (id,size) => {
    d.cells[d.cells.length - 1] = d.cells.at(-1).replace('as="geometry"/>',
      `as="geometry"><mxPoint x="0" y="${-size*.14}" as="offset"/></mxGeometry>`);
    return id;
  };
  const text = (v,x,y,w,h,size=44,bold=false) => center(d.text(v,x,y,w,h,size,bold,'center',P.ink),size);
  const node = (v,x,y,w,h,fill,stroke,size=44,opts={}) =>
    center(d.box(v,x,y,w,h,fill,stroke,size,{arc:18,strokeWidth:2.8,color:P.ink,...opts}),size);
  const link = (a,b,x1,y1,x2,y2,opts={}) => d.arrow(a,b,x1,y1,x2,y2,
    {color:P.ink,width:4,arrowSize:13,...opts});

  node('',33,80,522,1103,'#FFFFFF',P.region,1,{arc:24,strokeWidth:3.2});
  node('',700,80,522,1103,'#FFFFFF',P.region,1,{arc:24,strokeWidth:3.2});
  text('FPGA prototype',54,93,480,72,52,true);
  text('Host system',721,93,480,72,52,true);
  const dut = node('',56,173,477,195,P.driver,C.blue,1);
  text('DUT',76,207,437,76,52,true);
  text('Native driver',76,272,437,58,46);
  const front = node('',56,469,478,550,P.front,C.orange,1);
  text('FPGA front-end',73,490,444,87,52,true);
  const back = node('',722,173,478,720,P.software,C.blue,1);
  text('Host software\nback-end',739,193,444,132,52,true);
  const memory = node('DUT memory',56,1064,477,100,P.memory,C.blue,50,{bold:true});
  const device = node('Physical device',724,1064,476,100,P.device,'#6FC4A6',50,{bold:true});

  const shadow = node('Configuration shadow',63,578,465,91,'#FFF0E4',C.orange,44);
  const routing = node('Access\nrouting',63,727,210,128,'#FFF0E4',C.orange,44);
  const exchange = node('Control\nexchange',329,727,199,128,'#FFF0E4',C.orange,44);
  const interrupt = node('Interrupt delivery',63,909,465,92,'#FFF0E4',C.orange,44);
  link(shadow,routing,168,669,168,727,{both:true,width:3,arrowSize:9,dashed:true,
    anchors:`exitX=${105/465};exitY=1;entryX=0.5;entryY=0;`});
  link(shadow,exchange,428.5,669,428.5,727,{both:true,width:3,arrowSize:9,
    anchors:`exitX=${365.5/465};exitY=1;entryX=0.5;entryY=0;`});
  link(routing,exchange,273,791,329,791,{both:true,width:3,arrowSize:9});
  link(exchange,interrupt,428.5,855,428.5,909,{width:3,
    anchors:`exitX=0.5;exitY=1;entryX=${365.5/465};entryY=0;`});

  const policy = node('Topology policy',739,342,444,95,P.item,C.blue,44);
  const state = node('Virtual\nstate',739,492,204,133,P.item,C.blue,44);
  const binding = node('Device\nbinding',979,492,204,133,P.item,C.blue,44);
  const mediation = node('Semantic\nmediation',739,700,204,143,P.item,C.blue,44);
  const translation = node('Address\ntranslation',979,700,204,143,P.item,C.blue,44);
  link(policy,state,894,437,841,492,{anchors:'exitX=0.35;exitY=1;entryX=0.5;entryY=0;'});
  link(policy,binding,1028,437,1081,492,{anchors:'exitX=0.65;exitY=1;entryX=0.5;entryY=0;'});
  link(state,mediation,841,625,841,700,{both:true,
    anchors:'exitX=0.5;exitY=1;entryX=0.5;entryY=0;'});
  link(binding,mediation,1014,625,906,700,{anchors:'exitX=0.17;exitY=1;entryX=0.82;entryY=0;'});
  link(mediation,translation,943,771.5,979,771.5,{both:true,width:3,arrowSize:9});

  link(dut,front,294.5,368,294.5,469,{both:true,
    anchors:'exitX=0.5;exitY=1;entryX=0.5;entryY=0;'});
  text('Device\naccess',321,369,191,100,42);
  link(exchange,back,528,785,722,785,{both:true,width:4.5,
    anchors:`exitX=1;exitY=${58/128};entryX=0;entryY=${612/720};`});
  text('Control\nchannel',557,675,141,100,42);
  link(back,device,961,893,961,1064,{both:true,
    anchors:`exitX=0.5;exitY=1;entryX=${237/476};entryY=0;`});
  text('Compatible\noperation',974,897,217,100,42);
  link(memory,device,533,1114,724,1114,{both:true,color:P.payload,width:8,arrowSize:17,
    anchors:'exitX=1;exitY=0.5;entryX=0;entryY=0.5;'});
  text('P2P\nDMA',557,1003,141,100,42);
  return d;
}
function fig3SystemOrganizationRemote() {
  // Reconstruct the inspected AI-first three-column architecture. Physical
  // resources remain exterior to software host frames; the remote branch is
  // an architectural extension, not an additional evaluated configuration.
  const d = new Drawing('fig03_system_organization_v3', 'system_organization_remote_ai_v6.png', 1725, 912);
  const P = { ink:C.ink, region:'#173F68', driver:'#D4EBFF', front:'#FFE8D7',
    frontItem:'#FFF0E4', software:'#D4EBFF', item:'#E6F3FF',
    memory:'#D8DFEB', nic:'#D8DFEB', device:'#E1F1E8',
    sage:'#55A889', payload:'#2799E8', rdma:'#1495A9' };
  const center = (id, size) => {
    d.cells[d.cells.length - 1] = d.cells.at(-1).replace('as="geometry"/>',
      `as="geometry"><mxPoint x="0" y="${-size*.14}" as="offset"/></mxGeometry>`);
    return id;
  };
  const text = (v,x,y,w,h,size=32,bold=false,color=P.ink) =>
    center(d.text(v,x,y,w,h,size,bold,'center',color),size);
  const node = (v,x,y,w,h,fill,stroke,size=32,opts={}) =>
    center(d.box(v,x,y,w,h,fill,stroke,size,
      {arc:14,strokeWidth:2.2,color:P.ink,...opts}),size);
  const link = (a,b,x1,y1,x2,y2,opts={}) => d.arrow(a,b,x1,y1,x2,y2,
    {color:P.ink,width:3.5,arrowSize:12,...opts});

  node('',35,54,568,777,'#FFFFFF',P.region,1,{arc:16,strokeWidth:2.6});
  node('',705,54,499,591,'#FFFFFF',P.region,1,{arc:16,strokeWidth:2.6});
  node('',1279,54,410,591,'#FFFFFF',P.region,1,
    {arc:16,strokeWidth:2.6,dashed:true});
  text('FPGA prototype',54,61,530,54,42,true);
  text('Local host',725,61,459,54,42,true);
  text('Remote host',1298,61,372,54,42,true);

  const dut = node('',56,124,528,130,P.driver,C.blue,1);
  text('DUT',76,140,488,48,38,true);
  text('Native driver',76,187,488,49,35);
  const front = node('',56,322,530,386,P.front,C.orange,1);
  text('FPGA front-end',74,329,494,50,38,true);
  const window = node('Device access window',69,388,505,65,P.frontItem,C.orange,32);
  const identify = node('Access event\nidentification',69,494,235,93,P.frontItem,C.orange,32);
  const transport = node('Event\ntransport',356,494,218,93,P.frontItem,C.orange,32);
  const irq = node('Interrupt delivery',69,628,505,67,P.frontItem,C.orange,32);
  const memory = node('DUT memory',56,731,431,80,P.memory,'#517499',37,{bold:true});

  const back = node('',725,128,459,495,P.software,C.blue,1);
  text('Host software back-end',741,141,427,53,36,true);
  const policy = node('Topology policy',745,207,422,75,P.item,C.blue,34);
  const state = node('Virtual\nstate',745,328,197,102,P.item,C.blue,32);
  const binding = node('Device\nbinding',973,328,196,102,P.item,C.blue,32);
  const mediation = node('Semantic\nmediation',745,490,193,98,P.item,C.blue,32);
  const translation = node('Address\ntranslation',984,490,185,98,P.item,C.blue,32);
  const remote = node('Remote access service',1303,430,363,153,P.item,C.blue,31);

  const localDevice = node('Local peripherals',772,726,210,91,P.device,P.sage,28);
  const localNic = node('RDMA NIC',1007,726,161,91,P.nic,'#517499',29);
  const remoteNic = node('RDMA NIC',1311,726,151,91,P.nic,'#517499',28);
  const remoteDevice = node('Remote peripherals',1480,726,211,91,P.device,P.sage,28);

  link(dut,front,320,254,320,322,{both:true,
    anchors:'exitX=0.5;exitY=1;entryX=0.5;entryY=0;'});
  text('Device access',355,267,210,43,28);
  link(window,identify,191,453,191,494,
    {anchors:`exitX=${122/505};exitY=1;entryX=${122/235};entryY=0;`});
  link(identify,transport,304,540,356,540,{both:true,
    anchors:`exitX=1;exitY=${46/93};entryX=0;entryY=${46/93};`});
  link(transport,window,458,494,458,453,
    {anchors:`exitX=${102/218};exitY=0;entryX=${389/505};entryY=1;`});
  link(transport,irq,458,587,458,628,
    {anchors:`exitX=${102/218};exitY=1;entryX=${389/505};entryY=0;`});

  link(policy,state,885,282,843.5,328,
    {anchors:`exitX=${140/422};exitY=1;entryX=0.5;entryY=0;`});
  link(policy,binding,1034,282,1071,328,
    {anchors:`exitX=${289/422};exitY=1;entryX=0.5;entryY=0;`});
  link(state,mediation,842,430,842,490,{both:true,
    anchors:`exitX=${97/197};exitY=1;entryX=${97/193};entryY=0;`});
  link(binding,mediation,1012,430,924,490,
    {anchors:`exitX=${39/196};exitY=1;entryX=${179/193};entryY=0;`});
  link(mediation,translation,938,540,984,540,{both:true,
    anchors:`exitX=1;exitY=${50/98};entryX=0;entryY=${50/98};`});
  link(transport,mediation,574,540,745,540,{both:true,width:4.2,
    anchors:`exitX=1;exitY=${46/93};entryX=0;entryY=${50/98};`});
  text('Control\nchannel',600,470,110,64,28);

  link(back,localDevice,864,623,864,726,{both:true,
    anchors:`exitX=${139/459};exitY=1;entryX=${92/210};entryY=0;`});
  link(back,localNic,1087.5,623,1087.5,726,{both:true,
    anchors:`exitX=${362.5/459};exitY=1;entryX=0.5;entryY=0;`});
  link(remote,remoteNic,1386.5,583,1386.5,726,{both:true,
    anchors:`exitX=${83.5/363};exitY=1;entryX=0.5;entryY=0;`});
  link(remote,remoteDevice,1585.5,583,1585.5,726,{both:true,
    anchors:`exitX=${282.5/363};exitY=1;entryX=0.5;entryY=0;`});
  link(memory,localDevice,487,777,772,777,{both:true,
    color:P.payload,width:7,arrowSize:15,
    anchors:`exitX=1;exitY=${46/80};entryX=0;entryY=${51/91};`});
  text('Host-local P2P DMA',494,732,271,43,28);
  link(localNic,remoteNic,1168,777,1311,777,{both:true,
    color:P.rdma,width:7,arrowSize:15,
    anchors:`exitX=1;exitY=${51/91};entryX=0;entryY=${51/91};`});
  text('RDMA link',1172,731,135,44,28);
  d.line([[1380,866],[1481,866]],P.region,2.6,{dashed:true});
  text('Remote extension',1492,843,218,44,28);
  return d;
}

function fig3SystemOrganizationSharedRoles() {
  // AI-first shared-role architecture. Small grid/baseline corrections make
  // matching responsibilities equal-sized without changing the AI graph.
  const d = new Drawing('fig03_system_organization_v4', 'system_organization_remote_ai_v9.png',1638,960);
  const P = {ink:C.ink,region:'#173F68',software:'#D4EBFF',item:'#E6F3FF',
    front:'#FFE8D7',frontItem:'#FFF0E4',memory:'#D8DFEB',device:'#E1F1E8',
    sage:'#55A889',payload:'#2799E8',remote:'#148A99',resource:'#517499'};
  const center = (id,size) => {
    d.cells[d.cells.length-1]=d.cells.at(-1).replace('as="geometry"/>',
      `as="geometry"><mxPoint x="0" y="${-size*.14}" as="offset"/></mxGeometry>`);
    return id;
  };
  const text = (v,x,y,w,h,size=30,bold=false,color=P.ink) =>
    center(d.text(v,x,y,w,h,size,bold,'center',color),size);
  const node = (v,x,y,w,h,fill,stroke,size=30,opts={}) =>
    center(d.box(v,x,y,w,h,fill,stroke,size,{arc:14,strokeWidth:2.2,color:P.ink,...opts}),size);
  const link = (a,b,x1,y1,x2,y2,opts={}) => d.arrow(a,b,x1,y1,x2,y2,
    {color:P.ink,width:3.4,arrowSize:12,...opts});
  const route = (a,b,points,opts={}) => d.line(points,opts.color??P.ink,opts.width??3.4,
    {source:a,target:b,arrow:true,arrowSize:12,...opts});

  node('',33,66,541,789,'#FFFFFF',P.region,1,{arc:14});
  node('',629,66,500,629,'#FFFFFF',P.region,1,{arc:14});
  node('',1168,117,438,578,'#FFFFFF',P.region,1,{arc:14});
  text('FPGA prototype',50,75,507,55,44,true);
  text('Local host',648,75,462,55,44,true);
  text('Remote host',1185,126,404,55,42,true);

  const dut=node('',51,139,504,120,P.software,C.blue,1);
  text('DUT',70,158,466,43,37,true);
  text('Native driver',70,204,466,43,34);
  const front=node('',51,324,504,370,P.front,C.orange,1);
  text('FPGA front-end',70,330,466,49,37,true);
  const window=node('Device access\nwindow',87,398,207,90,P.frontItem,C.orange,30);
  const identify=node('Access event\nidentification',339,398,205,90,P.frontItem,C.orange,29);
  const irq=node('Interrupt\ndelivery',65,582,210,90,P.frontItem,C.orange,30);
  const fpgaTransport=node('Cross-domain\ntransport',339,582.5,205,90,P.frontItem,C.orange,29);
  const memory=node('DUT memory',51,750,406,90,P.memory,P.resource,36,{bold:true});

  node('',646,138,467,533,P.software,C.blue,1);
  node('',1184,190,416,481,P.software,C.blue,1);
  text('Local software back-end',658,146,443,47,36,true);
  text('Remote software back-end',1190,201,404,47,35,true);
  const assignment=node('Device assignment',662,210,438,82,P.item,C.blue,31);
  const grid = (x,subtitle) => {
    const state=node('',x,343,380,86,P.item,C.blue,1);
    text('Device state',x+10,348,360,37,31);
    text(subtitle,x+10,390,360,31,27);
    const mediation=node('Semantic\nmediation',x,470,175,90,P.item,C.blue,30);
    const translation=node('Address\ntranslation',x+205,470,175,90,P.item,C.blue,29);
    const transport=node('Cross-domain transport',x,595,380,65,P.item,C.blue,30);
    return {state,mediation,translation,transport,x};
  };
  const local=grid(662,'Logical state'), remote=grid(1197,'Execution state');
  const localDevice=node('Local\nperipherals',688,750,186,90,P.device,P.sage,29);
  const localNic=node('RDMA NIC',896,750,174,90,P.memory,P.resource,29);
  const remoteNic=node('RDMA NIC',1215,750,175,90,P.memory,P.resource,29);
  const remoteDevice=node('Remote\nperipherals',1418,750,186,90,P.device,P.sage,29);

  link(dut,front,306,259,306,324,{both:true,
    anchors:'exitX=0.506;exitY=1;entryX=0.506;entryY=0;'});
  text('Device access',340,271,210,44,29);
  link(window,identify,294,443,339,443);
  link(identify,fpgaTransport,443,488,443,582.5,
    {anchors:'exitX=0.5073;exitY=1;entryX=0.5073;entryY=0;'});
  route(fpgaTransport,window,[[339,603],[313,603],[313,536],[174,536],[174,488]],
    {anchors:`exitX=0;exitY=${20.5/90};entryX=${87/207};entryY=1;`});
  link(fpgaTransport,irq,339,627.5,275,627.5,
    {anchors:`exitX=0;exitY=0.5;entryX=1;entryY=${45.5/90};`});
  link(irq,dut,75,582,75,259,
    {anchors:`exitX=${10/210};exitY=0;entryX=${24/504};entryY=1;`});
  link(fpgaTransport,local.transport,544,627.5,662,627.5,{both:true,width:4.2});
  node('Control\nchannel',559.5,537,86,74,'#FFFFFF','none',25,{square:true,strokeWidth:0});

  link(assignment,local.state,774,292,774,343,
    {anchors:`exitX=${112/438};exitY=1;entryX=${112/380};entryY=0;`});
  route(assignment,local.transport,[[1088,292],[1088,627.5],[1042,627.5]],
    {anchors:`exitX=${426/438};exitY=1;entryX=1;entryY=0.5;`});
  for (const g of [local,remote]) {
    const x=g.x+97;
    link(g.state,g.mediation,x,429,x,470,{both:true,width:2.8,arrowSize:7,
      anchors:`exitX=${97/380};exitY=1;entryX=${97/175};entryY=0;`});
    link(g.mediation,g.translation,g.x+175,515,g.x+205,515,{both:true,width:2.8,arrowSize:7});
    link(g.transport,g.mediation,x,595,x,560,{both:true,width:2.8,arrowSize:7,
      color:g===remote?P.remote:P.ink,
      anchors:`exitX=${97/380};exitY=0;entryX=${97/175};entryY=1;`});
  }
  link(local.transport,localDevice,766,660,766,750,{both:true,
    anchors:`exitX=${104/380};exitY=1;entryX=${78/186};entryY=0;`});
  text('Local',774,699,100,43,27);
  link(local.transport,localNic,983,660,983,750,{both:true,color:P.remote,
    anchors:`exitX=${321/380};exitY=1;entryX=0.5;entryY=0;`});
  text('Remote',995,699,103,43,27);
  link(localNic,remoteNic,1070,795,1215,795,{both:true,color:P.remote,width:6.5,arrowSize:14});
  text('RDMA link',1073,755,137,38,25);
  link(remoteNic,remote.transport,1302.5,750,1302.5,660,{both:true,color:P.remote,
    anchors:`exitX=0.5;exitY=0;entryX=${105.5/380};entryY=1;`});
  // The physical operation is a mediation interface, not transport passthrough.
  // Its right-margin route clears every runtime node and the RDMA interface.
  route(remote.mediation,remoteDevice,[[1344,560],[1344,581],[1587,581],[1587,709],[1511,709],[1511,750]],
    {both:true,anchors:`exitX=${147/175};exitY=1;entryX=0.5;entryY=0;`});
  link(memory,localDevice,457,795,688,795,{both:true,color:P.payload,width:6.5,arrowSize:15});
  node('Host-local\nP2P DMA',481,718,180,74,'#FFFFFF','none',26,{square:true,strokeWidth:0});
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
  ['fig01_access_comparison_v3', fig1Comparison],
  ['fig01_access_comparison_v4', fig1AcademicV4],
  ['fig04_configuration_runtime_v4', fig4UsageAligned],
  ['fig04_configuration_runtime_v5', fig4UsageSharedRoles],
  ['fig04_configuration_runtime_v6', fig4UsageCombinedAssignment],
  ['fig03_system_organization_v1', fig3SystemOrganization],
  ['fig03_system_organization_v2', fig3SystemOrganizationP2P],
  ['fig03_system_organization_v3', fig3SystemOrganizationRemote],
  ['fig03_system_organization_v4', fig3SystemOrganizationSharedRoles],
  ['fig01_sdn_planes_v3', figSdnPlanesV3],
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
