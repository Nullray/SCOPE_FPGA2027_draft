# Editable reconstructions and AI-first figure revisions

## Current SDP figures (2026-10-03)

The non-experimental review enlarges Figure 3 to two columns in LaTeX without
changing its diagram or exports. Figure 1 uses protocol-neutral device views
and command routing for SCOPE; Figure 2 uses ONF plane names and larger single-column labels;
Figure 4 uses the architecture's device state manager terminology. Figure 5
now depicts prerequisite state and commit events, covering both software and
direct DMA completion publication without implying a common transport path.

The manuscript now uses the six `*_sdap.pdf` vector exports. Each has a native
single-page `.drawio`, an SVG, and a PNG preview with the same basename.

The architecture revision removes explanatory sentences and redundant titles
from the diagrams, retaining component names, short action labels, and commit
markers. Figure 6 has a compact device address domain and an independent blue
payload path; the metadata's payload-address references are explained in the
manuscript rather than drawn as another transport link. Current system labels
use SDP, while the `_sdap` filenames remain stable. Every figure is checked
for glyph overflow, label collisions, and relationship-line clearance.

| Figure | Current basename | Purpose |
| --- | --- | --- |
| 1 | `fig01_access_comparison_sdap` | Introduction: access organizations and the proposed native view |
| 2 | `fig02_sdn_abstraction_sdap` | Background: matched configuration, coordination, and execution roles |
| 3 | `fig03_system_architecture_sdap` | Aligned local/remote runtime components and control/payload interfaces |
| 4 | `fig04_configuration_runtime_sdap` | Selection, installation, OS enumeration, and driver setup |
| 5 | `fig05_distributed_commits_sdap` | Prerequisite visibility and three commit events |
| 6 | `fig06_metadata_payload_sdap` | Address domains, metadata adaptation, and the separate DMA aperture |

Rebuild with `node figures/paper/drawio/build_sdap_revision.mjs`, then
`node figures/paper/drawio/render_sdap_revision.mjs`. The renderer uses the
existing `mxgraph` and `puppeteer-core` packages in `.paper-review/drawio-tools`
and a headless Chrome browser. `sdap_manifest.json` identifies the outputs;
`sdap_validation.json` records font and text-bound checks on the rendered cells.
Figures 3 and 4 also check actual font glyph bounds against other labels,
every relationship segment and box outline, check lines against component
interiors, and verify uniform arrowhead sizes and line widths. Both commands
accept `--only=fig03_system_architecture_sdap,fig04_configuration_runtime_sdap`
to rebuild these figures while preserving the other current assets.
No bitmap/reference page or decorative device picture is included in these
current native diagrams. All labels use Times New Roman. Rounded boxes denote
components; folded boxes denote state/metadata; dots denote commits. In Figure
3, solid orange lines denote control interfaces and dashed orange lines
state/mapping dependencies; blue denotes host-local payload. Figure 4 uses
stage titles for actions and unlabeled arrows for precedence. Dashed containers
denote domains or groups. Figure 4's filename is retained for source stability;
its redundant runtime panel was removed. The Vortex log is now prose, leaving
seven manuscript figures. See `../../../FIGURE_REVIEW_2026-10-02.md` for the
necessity review and rationale.

The sections below are historical design records; their figure numbering and
SCOPE v2 names do not describe the current manuscript.

The original eight files reconstruct an earlier set of paper figures. They do not
reuse the old draw.io engineering diagrams in `figures/`. Current figure sources
are identified by the `\includegraphics` commands in the manuscript; several
historical reconstructions below are retained only as editable archives.
The older topology illustration remains archived and is not reintroduced.

## Current Figure 1: SDN and SCOPE v2 planes (2026-09-30)

- AI design: `../sdn_planes_comparison_ai_v3.png`.
- Editable reconstruction: [fig01_sdn_planes_v3.drawio](fig01_sdn_planes_v3.drawio).
- Manuscript export: [PNG](fig01_sdn_planes_v3.png); [SVG](fig01_sdn_planes_v3.svg).

The two panels align Software, Control, and Data planes while showing a
deliberately non-identical top tier: SDN applications express intent, whereas
SCOPE v2 native drivers consume the hierarchy selected by host software.
Separate up/down arrows distinguish intent from state, rules from events,
device access from the presented view, and operations from completions. The
SCOPE control plane contains the FPGA front-end and host software back-end;
the latter owns device assignment and semantic mediation. The blue payload
relation is conceptual and placement-dependent, not direct remote-device DMA.
The reconstruction follows the AI composition and palette but corrects its
arrow semantics and text placement. Its editable page is bitmap-free, and the
second page preserves the AI source for visual comparison. Render validation
reports no text overflow.

Rebuild only this revision with `--only=fig01_sdn_planes_v3` on both
`build_figures.mjs` and `render_figures.mjs`.

## Current Figures 4 and 5: architecture and use (2026-09-29)

| Role | AI reference | Native editable diagram | Preview |
| --- | --- | --- | --- |
| Fig. 4: local/remote architecture | `../system_organization_remote_ai_v9.png` | [fig03_system_organization_v4.drawio](fig03_system_organization_v4.drawio) | [PNG](fig03_system_organization_v4.png), [SVG](fig03_system_organization_v4.svg) |
| Fig. 5: configuration and runtime | `../configuration_runtime_ai_v6.png` | [fig04_configuration_runtime_v6.drawio](fig04_configuration_runtime_v6.drawio) | [PNG](fig04_configuration_runtime_v6.png), [SVG](fig04_configuration_runtime_v6.svg) |

The double-column architecture locates responsibilities in the FPGA prototype,
local host and remote host; the two-phase figure explains host-local use of the
same components. Device assignment combines hierarchy selection and physical
device/location allocation. Both hosts share Device state, Semantic mediation,
Address translation and Cross-domain transport, with equal runtime module sizes,
vertical positions and typography. State is logical locally and execution-facing
remotely. Teal remote interfaces run through RDMA NICs, remote transport and
remote mediation. The remote physical-operation interface originates from
mediation and bypasses the transport box geometrically; it is not unmediated
passthrough. Local control and state/service dependencies are navy; host-local
P2P DMA is blue. All peripherals and RDMA NICs are outside host frames.
Frontend requests follow Device access window, Access event identification and
Cross-domain transport. Responses return directly to the window; interrupt state
goes through Interrupt delivery to the DUT. Configuration reads can use the
committed local copy. Links express interfaces and dependencies, not a fixed
pipeline. The blue edge connects local peripherals directly to DUT memory;
mapping and actual routing are abstracted. Remote payload remains host-mediated.

The usage baseline is the author's current edited
`fig03_system_architecture_aligned_v3.drawio`, not its stale PNG. This source
is preserved unchanged. Its phase headers meet their outer-frame upper-left
corners and retain identical rounding; those four frame/header cells are copied
unchanged in geometry and style in the new sibling. The phase-1 title uses
device hierarchy. Repeated front-ends and backends now have equal x/width/height;
all four inner software fields have equal x/width/height/font size. Phase 1 has
Device assignment and Device state. Enumeration stays at the
far right and existing memory, device, queue, checks, and payload cells are kept.

Prompts and semantic checks are in `../system_organization_remote_ai_v9.prompt.md` and
`../configuration_runtime_ai_v6.prompt.md`. Each selected AI image is generated
and inspected before native reconstruction. The new editable pages contain
64 and 77 native cells respectively, with no bitmaps; the second pages preserve
the exact AI source bytes. Text bounds and centering are checked against the
actual rendered glyphs. Native fonts and flat fills are not pixel-identical
to AI rasterization.

Rebuild only the two new revisions:

```powershell
node figures/paper/drawio/build_figures.mjs --only=fig03_system_organization_v4,fig04_configuration_runtime_v6
node figures/paper/drawio/render_figures.mjs --only=fig03_system_organization_v4,fig04_configuration_runtime_v6
```

Do not run the unfiltered historical generator: its old v3 function would
overwrite the author's manual phase-header edit. The archived inset-header
description below records an earlier revision, not the current layout.

## Current Figure 2: four peripheral-access organizations

- AI source: `../access_comparison_ai_v4.png`.
- Editable version: [fig01_access_comparison_v4.drawio](fig01_access_comparison_v4.drawio).
- Native previews: [PNG](fig01_access_comparison_v4.png), [SVG](fig01_access_comparison_v4.svg).
- Prompt, palette sources and revision record: `../access_comparison_ai_v4.prompt.md`.

Four aligned panels compare device modeling, direct attachment, prior SCOPE,
and SCOPE v2. The predecessor uses adapted DUT software; v2 adds a selected
logical device hierarchy and a coherent native-driver-facing view. Both retain
physical execution and separated payload movement. The label "device hierarchy"
keeps the methodological claim independent of the current PCIe realization;
"device view" remains the broader driver-visible behavioral contract.

The palette uses restrained pale software blue, neutral gray and pale sage
green, informed by Paul Tol's scientific colour schemes. Green is reserved
for physical devices. Simulated responses use a neutral gray dashed box, not
the ambiguous old "Modeled I/O" label. Panel observations use semicolons.
Every label is horizontally and vertically centered; an SVG-baseline offset
corrects mxGraph's Times New Roman positioning. All 26 rendered label bounds
are within their allocated areas, with center error at most 0.5 px and no
clipping. The minimum 38 px label prints at approximately 8 pt in one column.

Rebuild only this revision using `--only=fig01_access_comparison_v4` on both
`build_figures.mjs` and `render_figures.mjs`. The bitmap-free editable page
contains 50 native cells, including 15 edges and 26 labels. Its second page
preserves the exact selected AI reference bytes. Native glyphs, flat fills and
centering corrections are not claimed to be pixel-identical to AI rendering.
The introduction and caption are updated; all other manuscript sections,
tables, bibliography and active figures are unchanged.

## Archived Figure 1 v3: three peripheral-access organizations

- AI source: `../access_comparison_ai_v3.png`.
- Editable version: [fig01_access_comparison_v3.drawio](fig01_access_comparison_v3.drawio).
- Native previews: [PNG](fig01_access_comparison_v3.png), [SVG](fig01_access_comparison_v3.svg).
- Prompt and revision record: `../access_comparison_ai_v3.prompt.md`.

The three stacked schematics distinguish a configurable device model, direct
physical attachment, and a software-selected native-driver-facing view with
host-mediated control. In SCOPE v2, the host software back-end is distinct
from the compatible physical device, and the host-local payload path does not
pass through software. The FPT figure supplies the comparison structure, not
the new artwork or a claim of timing equivalence. Its relationship is credited
in the manuscript caption. The earlier responsibility-band Figure 1 remains
archived as `fig01_access_tradeoff.drawio`.

Rebuild this revision only with `--only=fig01_access_comparison_v3` on both
`build_figures.mjs` and `render_figures.mjs`. The editable page matches the
AI reference's wording, grouping, relative geometry, colors, and paths. Native
font rasterization and flat fills are not pixel-identical to AI glyphs and
residual shading; the second page preserves the exact source bytes.

## Archived Figure 3: earlier inset phase-title alignment

- AI source: `../system_architecture_aligned_ai_v3.png`.
- Editable version: [fig03_system_architecture_aligned_v3.drawio](fig03_system_architecture_aligned_v3.drawio).
- Native previews: [PNG](fig03_system_architecture_aligned_v3.png), [SVG](fig03_system_architecture_aligned_v3.svg).
- Prompt: `../system_architecture_aligned_ai_v3.prompt.md`.

Both phase titles are fully inside their frames, using equal 31 px left and
18 px top insets and 48 px height. Native coordinates correct the small spatial
variations in the AI edit. All internal module/edge cells are unchanged from
the preceding editable reconstruction. The second page embeds the exact AI
source as a non-editable comparison reference.

## Current Figure 6 (formerly 5): AI design followed by native reconstruction

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

## Historical original reconstruction files

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
npm install --prefix .paper-review/drawio-tools mxgraph puppeteer-core --no-audit --no-fund
node figures/paper/drawio/build_figures.mjs --only=fig03_system_organization_v4,fig04_configuration_runtime_v6
node figures/paper/drawio/render_figures.mjs --only=fig03_system_organization_v4,fig04_configuration_runtime_v6
```

To rebuild only the latest revision without overwriting historical figures:

```powershell
node figures/paper/drawio/build_figures.mjs --only=fig05_commit_points_v3
node figures/paper/drawio/render_figures.mjs --only=fig05_commit_points_v3
```

The prior `fig03_system_architecture_aligned_v3.drawio` is the author's protected
baseline. Do not regenerate it; rebuild the new usage sibling instead.

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

## Archived manuscript edits in the initial reconstruction revision

The abstract was shortened from 258 to 171 whitespace-delimited source tokens
(approximately two-thirds; TeX macros and hyphenated terms affect this count),
and divided into problem, method, and evidence/limits paragraphs. It retains
the software-defined goal, both decouplings, and all three coherence relations.
The contribution statement now says **processor FPGA prototype**, not
**RISC-V SoC FPGA prototype**. The measured platform remains accurately
identified in the evaluation; no cross-ISA experiment is claimed.
