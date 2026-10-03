# Figure 3: mechanisms and endpoint-to-memory P2P relation

Selected AI reference: `system_organization_ai_v5.png`.
Native diagram: `drawio/fig03_system_organization_v2.drawio`.
Manuscript image: `drawio/fig03_system_organization_v2.png`.

Generated with the built-in image tool before draw.io reconstruction. The prior
`system_organization_ai_v4.png` is retained as the inspected but superseded
DMA-window-as-node design. Prior native v1 and the author's phase-aligned source
are preserved unchanged.

## Exact edit prompt

Use case: precise-object-edit.
Asset: square academic computer-architecture figure for a single-column ACM systems paper.
Image 1 is the EDIT TARGET, the inspected previous AI diagram. Preserve its white background, two equal upright outer regions, navy serif type, pale blue software/DUT, pale orange FPGA front-end, pale sage physical device, thin interface arrows and existing host software dependency graph. Change only the frontend mechanisms and payload representation requested below. NO workflow numbering, device models, new claims, engineering ports, Greek symbols, gradients or decorative objects.

CRITICAL SEMANTIC CHANGE 1: "Device presentation" is an OUTCOME, not a hardware module. Remove that label entirely and replace it by the mechanism label EXACT "Configuration shadow". No module named "Device presentation".
Redraw the frontend interior using FOUR mechanisms, no unlabeled bus:
- Full-width top box: "Configuration shadow" on ONE centered line, at x75 y583 w438 h79.
- Middle-left box: "Access" newline "routing", x75 y701 w220 h132.
- Middle-right box: "Control" newline "exchange", x330 y701 w183 h132.
- Full-width bottom box: "Interrupt delivery" on ONE centered line, x75 y874 w438 h79.
All boxes have pale-orange fill, thin orange borders, equal corner radius, navy Times-style text around44px, with good padding. Make the orange outer container x56 y469 w478 h509; its existing "FPGA front-end" title remains centered at the top.
Clear frontend relationships:
a) Configuration shadow bottom-left area at x185 to Access routing top center x185: short DASHED TWO-WAY arrow (committed-state consistency, not a processing stage).
b) Configuration shadow bottom-right area at x421 to Control exchange top center x421: short solid navy TWO-WAY arrow (configuration writes and committed updates).
c) Access routing right edge to Control exchange left edge, horizontal navy TWO-WAY arrow through the 35px gap at y767 (control requests and responses).
d) Control exchange bottom to Interrupt delivery top at x421: navy ONE-WAY downward arrow (software-supplied interrupt state).
Draw these edges only in whitespace, never through words. Endpoints touch their corresponding boxes. No vertical aggregation rail.
Connect Control exchange RIGHT edge horizontally to the WHOLE Host software back-end left boundary at y767, navy TWO-WAY arrow. Place EXACT "Control" newline "channel" in the central gutter ABOVE the arrow, x557 y661 w141 h100, approximately42px, centered.

CRITICAL SEMANTIC CHANGE 2: show a DIRECT endpoint-to-memory P2P payload relation.
Delete the old blue "DMA window" rectangle inside the frontend, its label and the blue frontend-to-memory arrow. Delete the bent payload route that enters the front-end. The text "DMA window" MUST NOT appear in this new figure. Its memory-mapping role will be explained in the PAPER CAPTION, not rendered as a forwarding/relay box.
Restore aligned larger bottom resources: left "DUT memory" x56 y1002 w477 h153; right "Physical device" x724 y1002 w476 h153. Retain current pale gray-blue and sage fills, navy bold centered labels around50px.
Draw ONE straight horizontal thick BLUE DOUBLE-HEADED arrow DIRECTLY from DUT memory RIGHT edge x533 y1083 to Physical device LEFT edge x724 y1083. It has NO bends and NO intermediate box, no software node or frontend connection. This abstract endpoint-to-memory relation is P2P DMA without a host software payload copy. Center the exact label "P2P" newline "DMA" ABOVE that blue arrow in the central gutter at x557 y976 w141 h100, font42. Do not label it only as generic Payload DMA. No new direct cable icon; it is an architectural path.
Keep the existing navy software-to-physical-device interface vertical at x961 y893 to y1002, two-way. Keep its EXACT two-line "Compatible" / "operation" label to the right at x974 y897 w217 h100.
Keep top-left DUT, native driver and their Device access arrow unchanged. Keep ALL Host software back-end blocks/edges/text unchanged: Topology policy -> Virtual state and Device binding; Virtual state <-> Semantic mediation; Device binding -> Semantic mediation; Semantic mediation <-> Address translation. Keep regions "FPGA prototype" and "Host system", equal outer sizes and near-square silhouette.
Output only the final figure, with verbatim English labels, horizontal/vertical centering, visible arrowheads and no text collisions. The result depicts mechanisms in the frontend and ownership/services in software, not an outcome as a module. Caption will explain P2P uses an FPGA-exposed mapping, so do not draw an extra DMA relay.

## Methodological interpretation

Device presentation is the intended driver-visible result, not a front-end
mechanism. Configuration shadow, access routing, control exchange, and interrupt
delivery name actual responsibilities. The shadow and routing must represent
the same committed view. Configuration writes/updates and routed requests/responses
use control exchange; interrupt state received from software drives delivery.
These links express dependencies and interfaces, not fixed processing order.

The straight blue edge is an abstract endpoint-to-memory P2P payload relation
for the host-local mapped path. The FPGA DMA aperture provides reachability of
DUT memory, not a software payload relay. Omitting its box from this architecture
does not eliminate physical routing or the mapping from the implementation.
Visibility and completion order remain requirements. No dedicated new wire,
timing equivalence, unrestricted P2P topology, remote direct path, or measured
concurrent configuration is claimed. The mechanism-detail figure retains the
aperture where address transformation is the subject.

A terminology cross-check used the primary
[Linux PCI Peer-to-Peer DMA documentation](https://docs.kernel.org/driver-api/pci/p2pdma.html):
P2P resources may be exposed through a BAR and accessed using DMA mappings;
routing compatibility depends on the PCIe topology. This general check does
not assert that SCOPE uses the Linux P2PDMA API or establish new prototype results.

## Reconstruction and correspondence

Keep the whole backend graph, its exact five responsibility labels, the two
ownership regions, and role colors. Match the inspected AI layout and paths
with native cells; preserve exact original raster bytes on the separate
reference page. Native fonts and flat fills are not pixel-identical to AI
rasterization. Validate text centering, glyph bounds, edge endpoints, and the
absence of DMA-window and Device-presentation modules. P2P edge endpoints must
be exactly the memory and physical-device cells, not software or a relay.

The inspected AI output differs slightly from the proposed ruler coordinates:
its frontend occupies y469--1019, memory/device y1064--1164, and the P2P edge
is at y1114. The native reconstruction follows this inspected layout rather
than forcing the original draft coordinates. It has 39 cells, 13 edges and
21 labels; all actual SVG glyph bounds and two-axis centering checks pass.
The editable page contains no bitmap, and reference-byte identity is checked
against the selected AI PNG (SHA-256
`775791471593914fed13c97d575ab5d2b1c23d1949fe36c2240a621a386507b4`).

The preceding two-phase figure becomes Figure 4. It shows use of the same
front-end, software back-end, memory and physical-device roles, and uses the
same topology/state/binding/mediation/translation names and colors. Its author
phase-header corners and repeated-component alignment remain unchanged.
