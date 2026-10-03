// Render and validate the actual mxGraph cells (not a separate SVG drawing).
// Tool-only dependencies: npm install --prefix .paper-review/drawio-tools mxgraph puppeteer-core
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, '../../..');
const toolRoot = path.resolve(repo, '.paper-review/drawio-tools');
const require = createRequire(path.join(toolRoot, 'package.json'));
const puppeteer = require('puppeteer-core');
const executablePath = process.env.SCOPE_FIGURE_BROWSER || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const browser = await puppeteer.launch({ executablePath, headless: true,
  args: ['--disable-gpu', '--no-first-run', '--disable-extensions'] });
const manifest = JSON.parse(fs.readFileSync(path.join(here, 'manifest.json'), 'utf8'));
const only = process.argv.find(arg => arg.startsWith('--only='))?.slice(7).split(',') ?? [];
for (const stem of only) if (!manifest.some(f => f.figure === stem)) throw Error('Unknown figure: ' + stem);
const selected = manifest.filter(f => !only.length || only.includes(f.figure));
const results = [];
try {
  for (const f of selected) {
    const raw = fs.readFileSync(path.join(here, f.figure + '.drawio'), 'utf8');
    const stencils = [...new Set([...raw.matchAll(/shape=stencil\(([^)]+)\)/g)].map(m => m[1]))]
      .map((packed, n) => ({ packed, name: `paperStencil${n}`,
        xml: decodeURIComponent(zlib.inflateRawSync(Buffer.from(packed, 'base64')).toString()) }));
    const source = fs.readFileSync(path.resolve(here, '..', f.source));
    const ref = raw.match(/image=data:image\/png,([^;]+);/);
    if (!ref || !Buffer.from(ref[1], 'base64').equals(source)) throw Error('Reference bitmap mismatch: ' + f.figure);
    if (crypto.createHash('sha256').update(source).digest('hex') !== f.referenceSha256) throw Error('Stale source hash');
    const page = await browser.newPage();
    await page.setViewport({ width: f.width, height: f.height, deviceScaleFactor: 1 });
    await page.setContent(`<html><body style="margin:0;background:white"><div id="graph" style="position:relative;width:${f.width}px;height:${f.height}px;overflow:hidden"></div></body></html>`);
    await page.evaluate(() => { window.mxLoadResources = false; window.mxLoadStylesheets = false; });
    await page.addScriptTag({ path: path.join(toolRoot, 'node_modules/mxgraph/javascript/mxClient.js') });
    const result = await page.evaluate(({ raw, stencils, w, h }) => {
      const parse = value => {
        const doc = new DOMParser().parseFromString(value, 'application/xml');
        if (doc.querySelector('parsererror')) throw Error(doc.querySelector('parsererror').textContent);
        return doc;
      };
      const doc = parse(raw), diagrams = doc.querySelectorAll('diagram');
      if (diagrams.length !== 2) throw Error('Need editable and exact-reference pages');
      // Each draw.io page has its own cell-ID namespace; decode one document.
      const modelDoc = parse(new XMLSerializer().serializeToString(diagrams[0].querySelector('mxGraphModel')));
      const model = modelDoc.documentElement;
      const cells = [...model.querySelectorAll('mxCell')];
      const ids = new Set(cells.map(c => c.id));
      let edges = 0, labels = 0;
      for (const c of cells) {
        if (/\p{Script=Han}/u.test(c.getAttribute('value') || '')) throw Error('Non-English label');
        if ((c.getAttribute('style') || '').includes('image=')) throw Error('Bitmap on editable page');
        if (c.getAttribute('value')) ++labels;
        if (c.getAttribute('edge') === '1') {
          ++edges;
          for (const a of ['source', 'target']) {
            if (c.hasAttribute(a) && !ids.has(c.getAttribute(a))) throw Error('Invalid arrow terminal');
          }
        }
      }
      for (const s of stencils) {
        mxStencilRegistry.addStencil(s.name, new mxStencil(parse(s.xml).documentElement));
        for (const c of cells) {
          if (c.hasAttribute('style')) c.setAttribute('style', c.getAttribute('style').replace(`shape=stencil(${s.packed})`, `shape=${s.name}`));
        }
      }
      const graph = new mxGraph(document.getElementById('graph'));
      graph.setEnabled(false); graph.setHtmlLabels(false); graph.border = 0;
      new mxCodec(model.ownerDocument).decode(model, graph.getModel());
      graph.view.validate();
      const svg = document.querySelector('#graph svg');
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      svg.setAttribute('width', w); svg.setAttribute('height', h);
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      const errors = [];
      const all = graph.getModel().cells;
      for (const cell of Object.values(all)) {
        if (!cell.value) continue;
        const state = graph.view.getState(cell);
        if (state?.text?.boundingBox && cell.vertex) {
          const b = state.text.boundingBox;
          if (b.x < -1 || b.y < -1 || b.x + b.width > w + 1 || b.y + b.height > h + 1) errors.push('Text outside canvas: ' + cell.value);
          if (b.width > state.width + 5 || b.height > state.height + 5) errors.push('Text exceeds allotted area: ' + cell.value);
          // mxText boundingBox may itself be clipped; inspect actual SVG glyphs.
          const glyphs = state.text.node?.querySelectorAll('text') || [];
          for (const glyph of glyphs) {
            const g = glyph.getBBox();
            if (g.x < state.x - 2 || g.y < state.y - 2 || g.x + g.width > state.x + state.width + 2 || g.y + g.height > state.y + state.height + 2) {
              errors.push('SVG glyphs exceed text area: ' + cell.value + ' ' + JSON.stringify({ glyph: { x: g.x, y: g.y, w: g.width, h: g.height }, area: { x: state.x, y: state.y, w: state.width, h: state.height } }));
              break;
            }
          }
        }
      }
      return { svg: new XMLSerializer().serializeToString(svg), cells: cells.length - 2, edges, labels, errors };
    }, { raw, stencils, w: f.width, h: f.height });
    fs.writeFileSync(path.join(here, f.figure + '.svg'), result.svg);
    await page.screenshot({ path: path.join(here, f.figure + '.png') });
    delete result.svg;
    results.push({ figure: f.figure, exactReferenceBytes: true, ...result });
    console.log(f.figure, JSON.stringify(result));
    await page.close();
  }
  const previous = only.length && fs.existsSync(path.join(here, 'validation.json'))
    ? JSON.parse(fs.readFileSync(path.join(here, 'validation.json'), 'utf8')) : [];
  const validation = [...previous.filter(f => !results.some(r => r.figure === f.figure)), ...results];
  fs.writeFileSync(path.join(here, 'validation.json'), JSON.stringify(validation, null, 2) + '\n');
} finally { await browser.close(); }
