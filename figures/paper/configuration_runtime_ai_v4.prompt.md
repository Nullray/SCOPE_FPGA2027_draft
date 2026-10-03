# Figure 4: configuration and runtime use, author-aligned v4

The former Figure 3 is now the usage view; the new preceding Figure 3 is the
static architecture. Generated with the built-in image tool first on 2026-09-29,
then reconstructed as native draw.io objects. The input was a fresh rendering
of the author's modified v3 source, not its stale PNG.

AI reference: `configuration_runtime_ai_v4.png`.
Native figure: `drawio/fig04_configuration_runtime_v4.drawio`.
The author's `drawio/fig03_system_architecture_aligned_v3.drawio` stays unchanged.

## Initial AI edit

Use case: precise-object-edit. The referenced image is the AUTHOR'S CURRENT EDITABLE-FIGURE RENDER, the only target. Preserve the complete existing 1816 x 866 academic two-phase diagram and all labels/colors/arrow directions except the explicit module alignment changes below. Especially preserve the author's newly adjusted phase headers: their upper-left corners coincide with the outer frame corners and their rounding is identical. DO NOT restore the old inset header positions.

LOCK these outer/header coordinates and styling: upper frame x24 y27 w1767 h322 corner arc16; Phase 1 header x24 y27 w696 h48 arc16; lower frame x24 y377 w1767 h459 arc16; Phase 2 header x24 y377 w836 h48 arc16. Their exact labels remain "Phase 1  Configure the Logical Device View" and "Phase 2  Mediate Control, Retain Physical Execution". Keep the existing font, line weight, dashed outlines and pale blue/orange fills. The headers must continue sharing the upper-left outer-frame coordinates.

Align repeated architectural components across the two phases:
- Both orange "FPGA front-end" blocks must have x640, width171, height160. Upper block y131, lower block y452. Same navy/black two-line label, same font29 and same corner radius20. Use adequate whitespace, do not extend a block into the lower Payload DMA path.
- Both blue "Host software back-end" blocks must have x947 and width420. The UPPER height remains222 at y100, the LOWER height remains166 at y448, since their contents differ. Both titles use equal font31, bold, and the same left/right padding and centered text. Upper title at x961 y104 w392 h44; lower title at x961 y452 w392 h44.
- Upper inner backend fields "Topology policy", "Virtual state", "Device binding": x974 width366 height44 at y160,214,268. Lower fields "Semantic mediation", "Address translation": x974 width366 height44 at y503,557. Center the labels and use the same font29 and pale-blue style.
- Adjust only the adjacent arrow endpoints as needed so they still touch the resized modules. Keep configuration arrows pointing left and runtime control arrows pointing right.
- Put the existing label "Control event" onto two lines in the resized gap between front-end and software at x815 y453 w130 h72; keep its wording and font28.
- Keep the existing "Compatible operation" label in the gap after the software block, approximately x1374 y455 w141 h72. Do not overlap the backend or physical-device block.

KEEP unchanged: hierarchy panel, all endpoint symbols and labels, far-right Phase 1 check and "Native driver enumerates", lower-left native driver and descriptor/queue symbols, physical device, DUT memory, thick blue Payload DMA path, every lower ordering check and all their wording. Do not invent components, measurements, colors, hierarchy nodes, devices or decorative graphics. White flat background, serif typography, all module texts centered and legible. The result is a usage figure, not a redesigned static architecture.

## Focused alignment refinement

Precise academic-figure geometry correction. The reference is the TARGET image, 1816x866. It still has mismatched repeated module sizes. Fix ONLY four colored component rectangles and their internal content/adjacent arrow connections. Keep ALL other words, drawings, icons, colors, outer frames and phase titles unchanged. Especially the phase title upper-left corners MUST remain coincident with their respective outer frame upper-left corners and keep the current matching 16px corner rounding.

CRITICAL REQUIREMENT 1: The TWO orange FPGA front-end rectangles must become visibly IDENTICAL in width AND height and lie on the SAME vertical column. Replace the tall upper orange rectangle with a shorter 171px-wide x160px-high rectangle at x640 y131. Replace the narrow lower orange rectangle with a wider 171px-wide x160px-high rectangle at x640 y452. The left sides of BOTH rectangles must be at exactly x640 and their right sides at x811. Copy the same centered two-line "FPGA" / "front-end" typography and rounded corners into both. There must no longer be one tall rectangle and one narrow rectangle. Upper and lower need equal width and height.

CRITICAL REQUIREMENT 2: The TWO blue Host software back-end rectangles must also occupy the SAME column and have the SAME WIDTH. Upper blue rectangle x947 y100 width420 height222; lower blue rectangle x947 y448 width420 height166. Both left sides exactly947, both right sides1367. Heights may differ because the upper contains three items and lower contains two. Center both same-size bold title labels. Upper labels are exactly "Topology policy", "Virtual state", "Device binding". Lower labels exactly "Semantic mediation", "Address translation". Make all five internal item boxes the same width366 and same height44, x974. Keep their current vertical positions. Use the same normal serif font29 in all five. Keep the pale blue colors.

Keep all configuration arrows leftward and all runtime arrows rightward, adjust their endpoints to touch the resized modules. Keep "Control event" on two lines centered in the narrower gap. Keep "Compatible operation" on two lines centered in the gap after the blue block. DO NOT change the left hierarchy, lower descriptor/queue, native driver, physical device, blue DMA path, DUT memory, far-right enumeration check, or bottom checks. Do not alter ANY phase title placement or outer frame geometry. No extra text, guides, annotations, or ruler lines. The visual test is two orange rectangles with identical width/height/x, and two blue backends with identical width/x.

## Reconstruction constraints

The author-defined outer/header cells are copied unchanged: upper-left corners
coincide, arcSize16, header height48, header widths696/836. Both front-ends use
x640, width171 and height160. The top y131 is vertically centered on its peer
backend; the lower y451 puts the runtime interfaces on y531. Both backends use
x947 and width420, while heights222/166 remain distinct. All five inner software
fields use x974, width366, height44 and font29. Both backend titles use font31.

Only the repeated modules, their labels and adjacent control edges are changed.
The hierarchy, driver/queue/device/memory symbols, far-right enumeration outcome,
blue payload path and three lower checks are preserved from the author source.
AI edits can vary exact geometry; native coordinates enforce the author's rules.
Labels, roles, arrow directions and grouping are preserved, but native glyphs,
flat fills and exact geometric calibration are not claimed pixel-identical to
AI rasterization. The second page embeds the selected AI image's exact bytes.
