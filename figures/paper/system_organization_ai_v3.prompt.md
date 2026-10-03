# Figure 3: static architecture with explicit internal relationships

Generated and inspected with the built-in image tool before native reconstruction
on 2026-09-29. The preceding drafts are retained, and v3 is the selected reference.

- Selected AI reference: `system_organization_ai_v3.png` (1254 × 1254).
- Native editable drawing: `drawio/fig03_system_organization_v1.drawio`.
- Manuscript preview: `drawio/fig03_system_organization_v1.png`.
- SVG preview: `drawio/fig03_system_organization_v1.svg`.

## Initial architecture design prompt

Use case: scientific-educational. Create a publication-quality COMPUTER ARCHITECTURE figure for an ACM FPGA paper, not a flowchart or technical-blog infographic. White flat background, near-square 1254 x 1254 canvas, two equal upright rectangular system regions, aligned tops and bottoms. No L-shaped silhouette. No phases, sequence numbers, checks, pictograms, 3D, decorative shadows, gradients, Greek letters, concrete device models, network servers, benchmarks, or performance claims. Use clean Times New Roman-like serif typography, dark navy #000B39. Every text label in a module must be centered horizontally and vertically, uncut, and clearly readable at single-column print size: normal labels about 44–47 pixels, group titles 48. Thin strokes, small identical corner radii.

This is the STATIC architecture of SCOPE v2, complementary to an existing two-phase usage figure. MUST use the following shared role colors: DUT/native driver and Host software back-end light blue #D4EBFF, outlines #1495FF; FPGA front-end pale orange #FFE8D7, outline #FF650C; DUT memory gray-blue #BFDEF6; Physical device pale sage #E1F1E8, outline #6FC4A6. Control/interface connections are thin dark navy; the distinct Payload DMA path is thicker blue #2799E8. Do not color the software back-end as a physical device.

Geometry guide in pixels, approximate but carefully aligned:
Left system outline x24 y62 w534 h1168, right outline x696 y62 w534 h1168, white interior, subdued gray/navy thin outline, slightly rounded rectangles. Title the left "FPGA prototype" and the right "Host system" at their top, centered, without overlapping the contents.
Within left: DUT block x56 y164 w470 h164 (light blue), bold centered "DUT" and centered "Native driver" beneath, no icons; FPGA front-end block x56 y428 w470 h402 (pale orange), bold centered exact header "FPGA front-end"; three aligned pale-orange inner cells x78 width426 height76 at y520,616,712 with exact centered labels "Device presentation", "Access routing", "Interrupt delivery". DUT memory block x56 y1010 w470 h158, centered exact label "DUT memory", simple rectangle with no memory icon.
Within right: Host software back-end block x728 y164 w470 h666 (light blue), bold centered title split onto TWO lines "Host software" / "back-end"; five aligned pale-blue inner cells x750 width426 height76 at y320,416,512,608,704, exact labels in this order "Topology policy", "Virtual state", "Device binding", "Semantic mediation", "Address translation". Physical device block x728 y1010 w470 h158 (pale sage), centered exact label "Physical device", no pictogram and no manufacturer/model.

Draw only these FIVE architectural connections, short and straight, with unambiguous endpoints:
1) DUT lower edge to front-end upper edge, vertical double-headed thin navy arrow. In the free space beside it, label "Device access" split into two lines if needed.
2) Front-end right edge to software back-end left edge, horizontal double-headed thin navy arrow at y650. Above it in the central gap, label "Control channel" on two lines. This is an interface carrying state updates, requests and responses, NOT the payload path.
3) Front-end lower edge to DUT memory upper edge, vertical double-headed blue arrow. Alongside it, centered two-line label "DMA window".
4) Software back-end lower edge to Physical device upper edge, vertical double-headed thin navy arrow. Alongside it, centered two-line label "Compatible operation".
5) DUT memory right edge to Physical device left edge, horizontal double-headed thick BLUE arrow at y1090. Above it in the central gap, label "Payload DMA" on two lines. It must NOT pass through host software. It denotes the abstract host-local memory path exposed by the FPGA DMA window, not an independent physical link or remote RDMA implementation.

Keep all inner modules inside their owning system region. Leave enough whitespace for labels and arrows, no box/text collisions. The control channel label and Payload DMA label must fit cleanly in the central gutter. Do not add any overall title, caption, figure number, extra legend, claim, or additional component. Make the overall visual compact, rectangular, balanced, scholarly, and systematic, with clear ownership and control/payload separation instead of a chronology. Render all exact text in English with no substitutions.

## Readability and center-gutter refinement

Use case: precise-object-edit. The referenced image is the edit target: a static SCOPE v2 architecture figure. Refine ONLY horizontal spacing and the two central interface labels for single-column publication legibility. Keep its square 1254x1254 canvas, two rectangular ownership regions, all five major components and eight inner cells, every exact word, vertical ordering, vertical positions, all five links, serif font style, light-blue DUT/backend, pale-orange front-end, sage physical device, and navy vs blue arrow coding unchanged. Do not add a phase, icon, model, operation sequence, figure number or claim.

The central "Control channel" and "Payload DMA" labels are too small. Increase BOTH to the same roughly 44 px serif text size as inner cell labels, each on two centered lines. To make room, widen the central gutter and reduce the two system-region widths modestly, without altering the square overall outline:
Left system outline approximately x24 y80 width526 height1103. Right system outline x704 y80 width526 height1103. Left component boxes x50 width468, right component boxes x730 width468. Thus the free interval between opposing component edges is x518 to730, around212 px. All left-side DUT/front-end/memory edges align. All right-side software-back-end/physical-device edges align.
Keep DUT and backend top edges around y173. Keep front-end and backend bottom edges around y893. Keep memory and device around y1002 to1155. Maintain ALL existing component heights and vertical positions, taking the original image as source of truth.
Shrink inner cell widths to remain inside resized parent boxes with equal left/right padding. Keep the centered text readable and never change wording or cut it.
Place two-line "Control" / "channel" centered in the gutter above its navy arrow, around x527 y564 width194 height83; arrow at y650 from x518 to730.
Place two-line "Payload" / "DMA" centered in the gutter above its thick blue arrow, around x527 y995 width194 height86; arrow at y1090 from x518 to730. Do not let either label collide with a container edge or module label. All text must remain horizontally and vertically centered in its allocated region.
Maintain the DUT-to-front-end Device access link, front-end-to-DUT-memory DMA window link, and backend-to-physical-device Compatible operation link; move their horizontal centers only to match the resized columns. Retain the navy thin control/interface links and thick blue memory links, all double-headed. No other content edits. White background; flat low-saturation fills are preferred.

## Internal relationships refinement

Use case: precise-object-edit. Edit the referenced SCOPE v2 STATIC architecture diagram to show the LOGICAL RELATIONSHIPS among existing inner functions. This is the user's main requirement. Keep the square 1254x1254 image, two equal rectangular FPGA prototype/Host system ownership regions, every existing major component and EXACT label, shared colors, white background, serif typography, and large centered readable text. No sequence numbers, phases, checkmarks, new hardware, concrete models, implementation fields, decorative icons or performance claims. Keep all exterior component bounds and the DUT/memory/device positions approximately unchanged. The original stacks of independent little boxes must be replaced with the following connected internal structures.

HOST SOFTWARE BACK-END (light blue rectangle on the right):
Keep the title as two bold centered lines "Host software" / "back-end".
Inside its existing boundaries (approximately x722..1198, y173..893), arrange the SAME FIVE functions as a dependency/service graph, not a five-step pipeline:
A) At the top, one centered full-width box "Topology policy", approximately x750 y344 width420 height76.
B) Below, two equal boxes on the same row: left "Virtual state" on two lines (x750 y474 w190 h112); right "Device binding" on two lines (x980 y474 w190 h112).
C) On a lower row, two equal boxes: left "Semantic mediation" on two lines (x750 y700 w190 h136); right "Address translation" on two lines (x980 y700 w190 h136).
Use pale blue fill, thin blue outlines, ~42px serif text. Every label centered both ways, no clipping.
Draw thin navy dependency arrows from Topology policy downward to BOTH Virtual state and Device binding. These are configuration products selected by policy.
Draw a thin navy double-headed state-interaction arrow between Virtual state and Semantic mediation, traversing only the empty vertical gap.
Draw a thin navy single-headed dependency arrow from Device binding into the top-right portion of Semantic mediation, traversing the empty gap above the lower row, without crossing any boxes. It shows mediation uses the assigned compatible device.
Draw a short thin navy DOUBLE-headed horizontal arrow between Semantic mediation and Address translation in the empty lower-row gutter. It shows a service call/result, not a chronology.
The existing "Compatible operation" link should leave the software backend below the Semantic mediation side and reach the Physical device. Keep the exact two-line label and do not let it overlap the DMA link or physical-device text.
Do NOT connect Virtual state to Device binding as a sequential pipeline. Do NOT force Topology policy through all five functions in a chain.

FPGA FRONT-END (pale orange rectangle on the left):
Keep its title "FPGA front-end". Keep the SAME three functional boxes: "Device presentation" (upper), "Access routing" (middle), "Interrupt delivery" (lower). Make their widths equal and leave space on the right for a common control-interface bus.
Place boxes approximately x78 width392 height76 at y578,704,808. Label text ~42px centered.
Between Device presentation and Access routing draw a SHORT DASHED NAVY DOUBLE-headed arrow in the vertical gap. This represents coupled committed-view state, not one function producing the next.
On the right inside the front-end, draw a thin straight vertical navy shared CONTROL BUS around x505 from the center of Device presentation to the center of Interrupt delivery. Connect each of the THREE boxes to that bus with a short horizontal line from its right edge. These lines represent a shared software-control interface, not a processing chain.
Connect the external "Control channel" between this shared bus and the LEFT EDGE of the entire host software back-end. Move that straight horizontal double-headed navy link to approximately y742, so it aligns with Access routing. Preserve the LARGE two-line centered "Control" / "channel" label above it in the central gutter around x550..696. Do not route it through an inner software box or indicate that configuration must pass through the semantic adapter.
Keep navy and dashed dependencies visually distinct from the thick BLUE memory paths.

EXTERIOR links remain Device access from DUT to front-end, DMA window from front-end to DUT memory, Compatible operation from software to physical device, and the BLUE double-headed Payload DMA between DUT memory and Physical device. Keep Payload DMA outside software and retain its readable two-line label. The overall drawing must remain a compact SQUARE architecture, not an L-shape or a flowchart. No added legend inside the artwork: the paper caption will explain that internal arrows denote dependencies/interfaces, not a fixed execution sequence. All original words must remain, with only line breaks changed.

## Architecture-to-usage correspondence

| Architectural role | Usage figure counterpart | Color |
| --- | --- | --- |
| DUT / Native driver | Native driver and its published work | Pale blue |
| FPGA front-end | Both FPGA front-end blocks | Pale orange |
| Host software back-end | Topology policy, virtual state, device binding; semantic mediation, address translation | Pale blue |
| DUT memory | Existing memory symbol and label | Gray-blue |
| Physical device | Existing compatible physical execution | Pale sage |
| Host-local memory path | Payload DMA path bypassing software | Blue |

Both diagrams use the exact same five software responsibility labels. The new
figure locates ownership and interfaces; the usage figure shows pre-enumeration
configuration followed by mediated I/O. It does not redefine the software
back-end to include the physical device.

## Meaning of internal links

Topology policy determines virtual state and device binding. Mediation consults
and updates virtual state, uses the selected binding, and invokes address
translation to prepare device-visible references. The branching graph is not
a fixed execution pipeline. In the front-end, presentation and routing share
a committed view (dashed coupling); all three generic functions connect to the
same software-control interface. The rail denotes shared service connectivity,
not a bus specification or a new protocol engine.

The control-channel and compatible-operation interfaces connect the whole
software boundary, not only the semantic adapter: configuration also traverses
this interface. The lower blue links abstract host-local DMA access through the
FPGA window. They do not add a new direct hardware interconnect, require software
payload copying, or claim remote RDMA, concurrent composition, timing equivalence,
new device protocols, or new measured performance.

## Native reconstruction and checks

The editable page has 41 native cells, including 14 edges and 21 labels, and no
bitmap cells. Grouping, exact label text, role colors, connection endpoints and
arrow directions follow the inspected AI reference. Interface-label areas are
calibrated to prevent two-line glyph overflow. Font baselines are adjusted for
actual two-axis centering in mxGraph's Times New Roman renderer. Shared-interface
branches are anchored horizontally, rather than projected onto rail end points.
The dashed presentation/routing style makes its state-coupling meaning explicit.
The original image remains on a separately identified exact reference page.

Native fonts, flat fills and calibrated coordinates are not claimed pixel-identical
to AI texture, glyph rasterization or minor spatial variation. Reference-byte
identity is verified independently from editable geometry. The usage sibling
preserves the author's manually edited phase headers and uses exact matched
module dimensions; its source and constraints are recorded separately in
`configuration_runtime_ai_v4.prompt.md`.
