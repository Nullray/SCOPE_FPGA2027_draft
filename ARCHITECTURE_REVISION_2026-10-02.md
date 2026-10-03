# Architecture and figure revision

This revision implements the requested figure-text cleanup, Figure 6 layout
repair, and merger of the former System Overview and Design chapters.

## Changes

| Request | Result |
| --- | --- |
| Move descriptive language out of diagrams | Removed explanatory footers and redundant figure titles; shortened plane, lifecycle, and commit labels. Explanations remain in the architecture text and concise captions. |
| Compact the right-hand device domain in Figure 6 | Rebuilt the diagram with metadata and the physical device in a compact upper region. The payload path runs below the host back-end through the FPGA DMA aperture. |
| Resolve the metadata-to-aperture dashed link | Removed it. The submission subsection explains that translated metadata contains payload addresses resolved through the aperture. The diagram shows metadata preparation and consumption separately from blue payload DMA. |
| Merge Chapters 4 and 5 and reduce repetition | One Chapter 4, System Architecture, covers device views and bindings, runtime components and data paths, then state ownership and the three commit mechanisms. The architecture source includes the mechanism source; main.tex no longer includes a separate Design chapter. |

The three commit mechanisms retain configuration/image/route agreement before
write retirement; metadata and required-data visibility before the physical
doorbell; and DUT-visible data before logical completion and notification.
The text retains memory-ordering assumptions, the directly DMA-visible
completion case, local/remote state authority, shared-level interrupt
semantics, and the bounds on supported composition and FPGA capacity.

Current figure labels use SoPS. The `_sdap` filenames remain unchanged for
source compatibility; historical figure sources are preserved.

## Size and validation

- Manuscript: **12 pages to 10 pages**, using the same ACM format.
- Combined architecture prose, headings, and captions: approximately
  **2,926 to 1,265 English words** (56.8% reduction). This count excludes
  LaTeX commands, reference identifiers, and accessibility descriptions.
- Text inside the six diagrams: **471 to 291 word tokens** (38.2% reduction).
- All six editable draw.io files parse as XML and contain English labels.
- All six render validations report zero glyph overflow, text collisions,
  relationship-line collisions, and visible-outline collisions.
- Figure 6 has no dashed relationship edge; its dashed lines are region
  boundaries. Its C2 marker and separate payload-DMA path remain explicit.
- Figure numbers 1--6 are preserved, and the merged architecture is Chapter 4.
- LaTeX compilation resolves references and citations and has no overfull boxes.
- All ten PDF pages were rendered and visually inspected.

## Sources and outputs

- `sections/03-overview.tex`: System Architecture and runtime components.
- `sections/04-design.tex`: state ownership and commit mechanisms, included
  within the architecture chapter.
- `figures/paper/drawio/build_sdap_revision.mjs`: current native diagram sources.
- `figures/paper/drawio/render_sdap_revision.mjs`: SVG, PNG, and vector-PDF export
  with glyph and line-clearance validation for all six figures.
- `main.pdf`: refreshed working manuscript.
- `output/pdf/SoPS_architecture_revision_20261002.pdf`: reviewed PDF snapshot.

Build with:

```powershell
node figures/paper/drawio/build_sdap_revision.mjs
node figures/paper/drawio/render_sdap_revision.mjs
latexmk -pdf -interaction=nonstopmode -halt-on-error -outdir=tmp/architecture_revision/build -jobname=SoPS main.tex
```

The renderer uses a headless local Chrome process and a workspace-local
temporary profile. Review metrics and intermediate page images are in
`tmp/architecture_revision/`.
