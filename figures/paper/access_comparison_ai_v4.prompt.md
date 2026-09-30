# Figure 1 v4: Peripheral access and the native-driver boundary

## Scope and academic abstraction

Four matched schematic panels compare device modeling, direct attachment,
SCOPE prior work, and SCOPE v2. The comparison axis is the software consumer
and the presented device contract, not a ranking of speed, scalability, or
universal authenticity. Both SCOPE versions retain physical execution and
separate payload movement. The new v2 boundary is the supported software-selected
logical device hierarchy and device view used by native DUT kernel drivers.
"Hierarchy" describes the logical endpoint organization; "device view" also
includes the driver-visible behavior. The figure deliberately leaves the
current PCIe realization out of this methodological label, without asserting
support for other peripheral protocols.

The predecessor interpretation was checked against the author-provided
SCOPE_FPT_v8.pdf: Section III-A describes SCOPE-aware DUT-side drivers for direct
control and an explicit split-driver control plane for proxy forwarding. The
conclusion likewise distinguishes these from transparently attaching devices
to unmodified DUT drivers. The figure therefore uses "Adapted DUT software"
and "Dedicated interface" rather than depicting the predecessor as modeled,
FPGA-only, or incapable of physical DMA. The existing scope2026fpt entry remains
the manuscript citation; no FCCM poster citation is introduced.

## Palette sources and application

- [Paul Tol's scientific colour schemes](https://sronpersonalpages.nl/~pault/):
  pale blue AACCEE and pale green BBDDBB are intended as backgrounds behind dark
  text; stronger schemes are appropriate for lines rather than large text-box
  fills. The selected fills D5E5F5 and DDECDD are lightened, restrained variants
  inspired by those hues, not verbatim scheme entries. Grey F2F2F2 separates
  simulation and generic interface abstractions.
- [Nature research figure guide](https://research-figure-guide.nature.com/figures/preparing-figures-our-specifications/):
  motivates accessible colours, legible labels, editable line/text elements,
  and avoidance of decorative icons, shadows, overlapping labels and coloured
  text. Its journal-specific fonts and sizes do not override this ACM paper's
  established Times New Roman figure style or minimum 8 pt print target.

Module typography is dark charcoal 26323D. Header strips are F3F4F5, controls are
steel grey 4F6070 and the payload arrow and its matching label are muted blue
4477AA. The source schemes
inform the choices; this customised diagram palette is not asserted to be a
fully validated colour-blind palette. Words and line styles preserve the
simulation/physical distinction without depending on colour: simulated
responses have a grey dashed outline; every green solid block names a physical
device. All four panel observations use semicolons, never the former colon.

## AI-first and editable-art workflow

The built-in image-generation tool was used, not an API/CLI fallback. An initial
four-panel reference was visually inspected. A targeted revision enlarges the
lower panel's labels and gives multiline module text equal margins. A further
terminology edit changes the selection annotation to "Software-selected" /
"device hierarchy and binding", following the author's preference not to
foreground PCIe. The final
selected AI reference is copied into this repository before native draw.io
reconstruction. Native cells preserve the selected labels, grouping, paths,
relative geometry and palette; the second page embeds exact AI PNG bytes.
Native fonts and flat fills are not claimed to be pixel-identical to AI glyph
rasterisation. No bitmap is used on the editable page.

The native reconstruction applies small, explicitly measured SVG-baseline
offsets for Times New Roman labels, preserving geometric centering while
correcting the glyph baseline. It enlarges the selection text's allocation
within the existing whitespace to prevent clipping, without reducing fonts.
These legibility corrections are intentional deviations from AI rasterization,
not a claim of exact editable recovery.

Files: access_comparison_ai_v4.png; drawio/fig01_access_comparison_v4.drawio,
.png and .svg. Historical v3 images and drawings are preserved. The introduction
and Figure 1 caption explain the added predecessor comparison. Other paper
sections, Evaluation, bibliography, tables and all other active figures stay
unchanged from the pre-edit worktree.

## Final source and checks

Selected AI source: 1142 x 1377 px, opaque RGB PNG. SHA-256:
`873416ed5bd5986f7605f44375c089c18e01756343237da65fafdf353da0deec`.
Original generation files remain under `E:/Codex/generated_images/`.

Native draw.io page: 50 cells, 15 edges, 26 English labels. Every label uses
horizontal center and vertical middle alignment; measured SVG glyph centers
differ from their allocated area centers by at most 0.5 px. All glyphs fit
their text areas. No bitmap appears on the editable page. The reference page
embeds the selected AI bytes exactly. Minimum type size is 38 px, approximately
8 pt at the manuscript's single-column width. The four observations retain
semicolons; simulated responses are gray/dashed; all three green blocks are
named physical devices. No performance or resource data are invented.

The pre-edit baseline confirms Evaluation, bibliography, all tables, all
historical artwork and every other section/image remain unchanged. The
introduction alone explains the four-way comparison and hierarchy/view
distinction.

## Final terminology revision prompt

```text
Make one precise terminology edit to this academic four-panel research figure. Preserve the entire full uncropped canvas, four panel geometries, all modules, all arrows and their directions, thin neutral borders, grey header strips, pale software blue, physical-device-only pale green, grey dashed simulated responses, scholarly serif fonts, and all other wording EXACTLY. Do not redesign or simplify the figure, do not add decorations or icons.

In panel (d), replace ONLY the unboxed two-line selection annotation that currently says "Software-selected" / "native view and binding".
Its exact replacement is:
"Software-selected"
"device hierarchy and binding"
Use two centered lines in that same annotation area above the DUT and FPGA front-end, large and fully legible, dark charcoal. Keep the second line completely inside the dashed FPGA prototype region with balanced side margins. This wording describes the logical DUT-visible device organization; DO NOT insert "PCIe" in any label.

All other labels must stay unchanged, including the FOUR semicolon observations:
"Configurable view; modeled execution"
"Physical execution; attachment-defined view"
"Dedicated interface; physical execution"
"Configurable native view; mediated timing"
The model's output must remain exactly "Simulated" / "responses", neutral grey with dashed outline, NOT a physical device.
Keep exactly three green actual-physical-device blocks, a separate blue Host software/back-end, and the separate DUT memory-to-device bidirectional payload path. No device model numbers, protocol packet fields, ISA names, claims of timing equivalence, Greek symbols, shadows, 3D, gradients or colored emphasis. Keep the RGB background opaque white and all module text horizontally and vertically centered. No change of typeface, font sizes, panel weights, or canvas proportions.
```

## Initial generation prompt

```text
Use case: scientific-educational.
Asset type: Figure 1 of an ACM FPGA / computer-architecture research paper, designed for readable SINGLE-COLUMN print.
Input image: the current Figure 1 is a structural reference, NOT an exact layout to preserve. Revise its comparative structure and palette and add the predecessor comparison specified below.

Create a precise, flat academic system-comparison figure with FOUR vertically stacked panels, aligned outer edges and matched module positions. The first three panels are compact and equal-height; the fourth is moderately taller for two paths. Near-portrait canvas around 1536 by 1792 pixels. Body and supporting labels approximately 54 px, panel headings about 62 px, so NOTHING becomes tiny at single-column print. Times New Roman scholarly serif to match the other paper figures. All module text, including ALL multiline labels, must be mathematically centered BOTH horizontally and vertically in its rectangle; equal padding on every side. Center panel headings in their header strips as well. Thin neutral outlines, small-radius rectangular modules, orthogonal arrows with clear terminals, no crossing labels.

Use an opaque pure-white RGB background everywhere. Academic palette inspired by Paul Tol pale schemes: very light neutral-grey headers #F3F4F5, neutral modeling/interface fills #F2F2F2, pale software blue #D5E5F5, pale physical-device sage green #DDECDD. Dark charcoal #26323D text in ALL labels. Restrained steel-grey control arrows #4F6070 and muted blue #4477AA payload arrows. No orange, neon colours, heavy saturated header bands, gradients, shadows, texture, transparency, icons, flags, checks, 3D, logos, numerical performance claims, Greek letters, hardware brands or concrete device models. Green MUST appear ONLY in actual physical-device boxes. Simulated responses MUST be neutral grey with a dashed outline, never green. Do not infer that software modeling means no native driver.

Panel (a) exact centered header "(a) Device modeling".
Three aligned blocks left to right, exact text "DUT\nNative driver" -> "Device model" -> "Simulated\nresponses".
DUT block pale blue, device-model block neutral grey, simulated-responses block neutral grey with dashed outline. Solid neutral forward arrows, no return edge.
Exact centered observation under this chain: "Configurable view; modeled execution".
The punctuation MUST be an actual SEMICOLON ';', NOT a colon ':'. This rule applies to every panel observation.

Panel (b) exact centered header "(b) Direct attachment".
At the SAME three positions: "DUT\nNative driver" -> "Fixed\nattachment" -> "Physical\ndevice".
DUT pale blue, attachment neutral grey, physical device sage green with solid outline. Neutral arrows.
Exact observation: "Physical execution; attachment-defined view".
Avoid slots, board wiring and expansion cards.

Panel (c) exact centered header "(c) SCOPE (prior work)".
At the SAME three positions: "Adapted DUT\nsoftware" -> "Borrowing\nsubstrate" -> "Physical\ndevice".
Adapted software pale blue, borrowing substrate neutral grey, physical device sage green identical in style to panel (b).
Exact observation: "Dedicated interface; physical execution".
This is the accepted FPT predecessor. It uses SCOPE-aware DUT access or an explicit split-driver interface and already retains real-device execution and separate payload movement. Do not label it as native-driver transparent, purely simulated, a virtual device model, or a circuit-only implementation. No comparative timing or capability ranking.

Panel (d) exact centered header "(d) SCOPE v2 (this work)".
A thin neutral dashed region labelled "FPGA prototype" contains the LEFT DUT and center FPGA front-end, and DUT memory below the DUT. Place the region title centered at its top, without touching any module or annotation.
Inside it, above the front-end, a clearly spaced unboxed centered annotation reads "Software-selected\nnative view and binding".
At runtime row height, show three modules: "DUT\nNative driver" (pale blue), "FPGA\nfront-end" (neutral grey), and "Host software\nback-end" (pale blue) outside the prototype on the right. DUT -> front-end -> software back-end. Label only the cross-region grey arrow "Control mediation", dark-charcoal text, above the arrow in whitespace.
Below the software back-end on the RIGHT, a solid-outline sage-green block reads "Compatible\nphysical device"; connect host software vertically down to it with a grey forward control arrow.
Below the DUT on the LEFT, show "DUT memory" in neutral grey, connected bidirectionally to the DUT.
A muted-blue bidirectional horizontal arrow labelled "Payload path" connects DUT memory directly to the compatible physical device across empty space, not through host software. This is a host-local path schematic, not a universal remote zero-copy claim.
Exact centered observation below the panel contents: "Configurable native view; mediated timing".
Keep all runtime labels inside their blocks, especially Host software/back-end and Compatible/physical device; do not let the second line sit below its box. If necessary add height and spacing rather than reduce fonts.

Scientific message: (c) and (d) both retain physical execution; the new boundary in (d) is the supported software-selected logical PCIe view consumed by unmodified native DUT drivers. Real execution does not imply direct-attachment timing. Four equal visual weights, not marketing hierarchy. Every quoted label must be rendered verbatim, no invented words or extra captions. Keep the final image print-clean and fully opaque white.
```

## Targeted legibility revision prompt

```text
Make a targeted SINGLE-COLUMN LEGIBILITY and FLAT-FILL revision of this four-panel academic figure. Keep all four panel titles, the first three panels' module geometry, all English wording and semicolons, the neutral simulated-responses dashed box, the three actual physical-device green boxes, and EVERY arrow direction unchanged. Preserve the comparative argument: the predecessor uses adapted DUT software, while v2 adds a selected native-driver view. Do not add modules, claims, devices, icons, or decorative marks.
Change only the following:
1. In the fourth panel, enlarge ALL body/supporting text to match the legible first-three-panel body typography, about 40 px on this 1161 px-wide image. In particular enlarge Host software/back-end, Compatible/physical device, FPGA/front-end, DUT/Native driver, DUT memory, the selection annotation, control label, payload label, prototype title, and bottom observation. ALL multiline text must be horizontally AND vertically centered within its own block, with equal top/bottom and side margins.
2. The control arrow label may wrap to exactly "Control\nmediation" to fit its whitespace. Keep that label well above its grey arrow and outside the host software rectangle. Make ALL text dark charcoal #26323D, including the "Payload path" label; the payload arrow itself stays muted blue #4477AA.
3. Give the fourth panel sufficient room: moderately increase ONLY its height and the total canvas height if necessary; move its runtime and lower-memory rows down and enlarge their rectangles to fit the larger labels. Never shrink fonts to fit. Keep the dashed FPGA prototype boundary, centered prototype heading, software-selected native-view annotation, the separate software back-end and physical device, DUT-to-memory bidirectionality, and the independent bottom payload path. Leave enough whitespace so no text touches an arrow or frame. All arrows must attach to block-edge midpoints.
4. Flatten every fill exactly: opaque pure white background #FFFFFF, header strips #F3F4F5, neutral boxes #F2F2F2, software/driver boxes #D5E5F5, actual physical-device boxes #DDECDD. Thin neutral-charcoal outlines, no gradient, texture, shadow, transparent pixels, or speckles.
Keep the following observations VERBATIM, with actual semicolons:
"Configurable view; modeled execution"
"Physical execution; attachment-defined view"
"Dedicated interface; physical execution"
"Configurable native view; mediated timing"
The simulated output wording remains "Simulated\nresponses" and is grey/dashed, never green. Keep the full uncropped figure. The result must be a restrained, print-clean computer-architecture research figure, not a poster.
```
