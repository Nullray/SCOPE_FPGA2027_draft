# Editable reconstructions and AI-first figure revisions

The original eight files reconstruct the paper's previous Figures 1--8. They do not
reuse the old draw.io engineering diagrams in `figures/`. No Greek symbols,
device identifiers, modules, or claims have been added to the reference content.
The revised Figures 3 and 5 use `fig03_system_architecture_aligned_v3.png` and
`fig05_commit_points_v3.png`, exported from their native reconstructions.
Other existing manuscript image paths are unchanged.
The former topology Figure 6 is replaced by a configuration-boundary table;
the former Figures 7 and 8 consequently become Figures 6 and 7.

## Latest Figure 3: inset phase-title alignment

- AI source: `../system_architecture_aligned_ai_v3.png`.
- Editable version: [fig03_system_architecture_aligned_v3.drawio](fig03_system_architecture_aligned_v3.drawio).
- Native previews: [PNG](fig03_system_architecture_aligned_v3.png), [SVG](fig03_system_architecture_aligned_v3.svg).
- Prompt: `../system_architecture_aligned_ai_v3.prompt.md`.

Both phase titles are fully inside their frames, using equal 31 px left and
18 px top insets and 48 px height. Native coordinates correct the small spatial
variations in the AI edit. All internal module/edge cells are unchanged from
the preceding editable reconstruction. The second page embeds the exact AI
source as a non-editable comparison reference.

## Latest Figure 5: AI design followed by native reconstruction

- AI source: `../coherence_commit_points_ai_v3.png`.
- Editable version: [fig05_commit_points_v3.drawio](fig05_commit_points_v3.drawio).
- Native previews: [PNG](fig05_commit_points_v3.png), [SVG](fig05_commit_points_v3.svg).
- Prompt and semantic checks: `../coherence_commit_points_ai_v3.prompt.md`.

The labels, three bands, prerequisite/released-state regions, commit dots,
arrow directions, and optional interrupt note reproduce the AI design.
The editable page uses native Times New Roman text and flat fills, so its font
rasterization and fills are not pixel-identical to the AI source. The second
page embeds that exact source, separately labeled as a non-editable reference.

Every `.drawio` file has two explicitly distinguished pages:

1. **Editable reconstruction**: native text, rectangles, edges, ellipses, and
   editable stencil shapes. There are no bitmap cells on this page. Elements
   have been positioned against the current reference, preserving text,
   ordering, layout, palette, and canvas dimensions.
2. **Original PNG - exact reference (not editable)**: embeds the original PNG
   without resampling or alteration. Its decoded bytes are verified against
   the original file. It is a comparison reference, not a vector conversion.

The editable page is a reconstruction, **not a pixel-identical reproduction**.
AI-generated texture, spatially varying fills, glyph outlines, and anti-aliasing
are not recoverable as the original drawing instructions. Native renderings use
Times New Roman and flat sampled/approximated fills; some arrowheads and glyph
positions differ. If pixel identity is required, use the exact reference page
or keep the existing PNG. Do not describe the reference page as editable art.

## Files

| Figure | Editable file | Rendered preview |
| --- | --- | --- |
| 1: access responsibilities | [fig01_access_tradeoff.drawio](fig01_access_tradeoff.drawio) | [PNG](fig01_access_tradeoff.png) |
| 2: native-driver contract | [fig02_driver_contract.drawio](fig02_driver_contract.drawio) | [PNG](fig02_driver_contract.png) |
| 3: two-phase system overview | [fig03_system_architecture.drawio](fig03_system_architecture.drawio) | [PNG](fig03_system_architecture.png) |
| 4: SDN plane comparison | [fig04_sdn_planes.drawio](fig04_sdn_planes.drawio) | [PNG](fig04_sdn_planes.png) |
| 5: ordering obligations | [fig05_coherence_contracts.drawio](fig05_coherence_contracts.drawio) | [PNG](fig05_coherence_contracts.png) |
| 6: separate topology choices | [fig06_topology_reconfiguration.drawio](fig06_topology_reconfiguration.drawio) | [PNG](fig06_topology_reconfiguration.png) |
| 7: metadata versus payload | [fig07_semantic_dma.drawio](fig07_semantic_dma.drawio) | [PNG](fig07_semantic_dma.png) |
| 8: measurement intervals | [fig08_measurement_boundaries.drawio](fig08_measurement_boundaries.drawio) | [PNG](fig08_measurement_boundaries.png) |

SVG previews are also supplied next to the PNGs. Their shapes are rendered
directly from the editable mxGraph cells, not independently redrawn in SVG.
The figure 3 enumeration outcome remains at the far right of phase 1. The
figure 4 front-end and host software remain together in one control plane.

## Rebuild and checks

From the repository root:

```powershell
node figures/paper/drawio/build_figures.mjs
npm install --prefix .paper-review/drawio-tools mxgraph puppeteer-core --no-audit --no-fund
node figures/paper/drawio/render_figures.mjs
```

To rebuild only the latest revision without overwriting historical figures:

```powershell
node figures/paper/drawio/build_figures.mjs --only=fig05_commit_points_v3
node figures/paper/drawio/render_figures.mjs --only=fig05_commit_points_v3
```

For the Figure 3 alignment revision, use `--only=fig03_system_architecture_aligned_v3`
with both commands; the historical Figure 3 stays unchanged.

The render script uses local headless Chrome; set `SCOPE_FIGURE_BROWSER` to a
different Chromium executable if needed. The renderer dependency lives in the
ignored `.paper-review/` directory. The official draw.io desktop editor can
also open these files: [project](https://github.com/jgraph/drawio-desktop).
Opening or rendering these diagrams does not require uploading them to a service.

`manifest.json` records current-source names, dimensions and SHA-256 hashes.
`validation.json` records XML parsing, bitmap-free editable pages, valid edge
terminals, English labels, reference-byte identity, and text-area checks.
All eight editable pages have been rendered and visually inspected. Decorative
lines and the figure 7 filled bidirectional arrow are native geometry; semantic
control edges use cell terminals where applicable. Stencil plane labels are
separate editable text cells and should be selected together when moving them.

## Manuscript edits in this revision

The abstract was shortened from 258 to 171 whitespace-delimited source tokens
(approximately two-thirds; TeX macros and hyphenated terms affect this count),
and divided into problem, method, and evidence/limits paragraphs. It retains
the software-defined goal, both decouplings, and all three coherence relations.
The contribution statement now says **processor FPGA prototype**, not
**RISC-V SoC FPGA prototype**. The measured platform remains accurately
identified in the evaluation; no cross-ISA experiment is claimed.
