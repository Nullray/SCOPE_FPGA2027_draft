# Architecture revision: shared roles and location extension

Selected AI reference: `system_organization_remote_ai_v9.png` (1638 x 960).
SHA-256: `afe0b63bed903fd11e0818e238e79a0d3f58895fcb27cdacecda7b42e20f72e5`.
Native editable reconstruction: `drawio/fig03_system_organization_v4.drawio`.

## Argument and evidence boundary

Device assignment combines supported hierarchy selection with compatible device and host-location allocation. Shared runtime responsibilities persist across locations, but local logical authority and remote execution state differ. RDMA instantiates remote attachment; it is not the method's transport innovation. The current remote data path is host-mediated, not proven FPGA-to-remote-device zero-copy or transparent PCIe extension. No new performance measurements are inferred.

Implementation-role sources are the author's supplied explanation and the read-only nm37_vswitch architecture documentation in [NEXST](https://github.com/Nullray/nexst/blob/nm37_vswitch/doc/RDMA_REMOTE_DEVICE_INTEGRATION_ARCHITECTURE.md) and [QEMU](https://github.com/Nullray/qemu/tree/nm37_vswitch). They support architecture roles, not new quantitative claims. No message formats, shadow queues/rings, staging resources or concrete device models appear in the figure.

## Native layout and semantic checks

The editable page has 64 native cells and 34 labels, without bitmap cells. A separate exact-reference page embeds the selected AI bytes. Native reconstruction follows the inspected AI grouping, labels, role colors, paths and arrow directions, with explicit equal-size runtime grids, shorter arrowheads on short interfaces, restored glyph centering and expanded label areas. These small layout corrections and native Times New Roman/flat fills are not claimed to reproduce AI rasterization pixel for pixel.

Corresponding Device state, Semantic mediation, Address translation and Cross-domain transport roles share dimensions, y positions and typography. Local assignment sets logical state and supplies a destination to local transport. Remote requests/results use teal: local transport -> local RDMA NIC <-> remote RDMA NIC -> remote transport -> remote semantic mediation, with returns on the same interfaces. The physical-operation interface originates from mediation and clears the remote transport's right edge; it does not bypass semantics. Navy denotes local control and state/service dependencies. Blue denotes only the direct host-local peripheral-to-DUT-memory P2P relation. Peripheral and RDMA NIC cells are exterior to software host frames.

The final exports pass XML/native-page/reference-byte, actual SVG glyph-bound, text-centering, shared-grid and remote-arrow terminal checks. The original author phase source and experiments remain unchanged.

## Initial AI design

Use case: infographic-diagram.
Asset type: full-width, two-column computer-architecture research paper figure.
Input image: style and predecessor reference ONLY. Rebuild the software interiors to the approved specification below; preserve the restrained visual language, not the obsolete engineering labels.
Create a clean landscape SCOPE v2 architecture with THREE left-to-right rectangular regions: "FPGA prototype", "Local host", "Remote host". White background; flat pale blue software, pale apricot frontend, muted sage physical peripherals, gray-blue memory/RDMA NICs, navy serif typography and thin arrows. No gradient, shadows, 3D, pictorial icons, mathematical symbols, chip models, buffer boxes, protocol opcodes or numbered steps. Approximately 2048 by 1200; body labels comfortably readable at double-column publication size. ALL labels centered horizontally and vertically in their boxes.
LEFT FPGA:
Top pale blue DUT box with "DUT" and "Native driver"; apricot "FPGA front-end" below; gray-blue "DUT memory" at the bottom.
Frontend has FOUR functional boxes: upper LEFT "Device access window" on two lines; upper RIGHT "Access event identification" on two lines; lower RIGHT "Cross-domain transport" on two lines; lower LEFT "Interrupt delivery" on two lines.
Exact links: window RIGHT -> identification LEFT one-way; identification BOTTOM -> transport TOP one-way. A separate response/update line leaves transport LEFT, routes upward through whitespace and enters window BOTTOM, NOT via identification. A different short arrow from transport LEFT goes to interrupt RIGHT. Interrupt LEFT has its own left-margin line up to DUT LEFT; do not cross a box or share the response path. DUT and frontend have bidirectional "Device access" interface above the frontend. There is NO DMA-window intermediate box or frontend-to-memory DMA edge.
MIDDLE LOCAL SOFTWARE:
Parent title "Local software back-end". SIX boxes total.
An upper configuration row has "Hierarchy definition" LEFT and "Device assignment" RIGHT.
Below it the COMMON RUNTIME GRID is:
top wide "Device state" with a secondary line "Logical state";
middle LEFT "Semantic mediation", middle RIGHT "Address translation";
bottom wide "Cross-domain transport".
Hierarchy definition points to Device state. Device assignment supplies destination selection to the bottom transport using a thin dependency line in the empty right margin, outside the state/translation boxes. Device state is bidirectionally connected to Semantic mediation. Semantic mediation and Address translation are bidirectionally connected. Semantic mediation and Cross-domain transport are bidirectionally connected vertically.
The bottom transport has TWO independent output ports: LEFT labeled "Local" to exterior Local peripherals; RIGHT labeled "Remote" to the exterior LOCAL RDMA NIC. Do not hide the local/remote choice.
RIGHT REMOTE SOFTWARE:
Parent title "Remote software back-end". ONLY FOUR boxes, with EXACTLY THE SAME NAMES, DIMENSIONS, COLORS AND Y POSITIONS as the common runtime grid on Local host:
top wide "Device state" with secondary line "Execution state";
middle LEFT "Semantic mediation", middle RIGHT "Address translation";
bottom wide "Cross-domain transport".
The remote parent can start lower than the taller local parent to accommodate its smaller contents. Do not invent a remote hierarchy-definition, assignment-policy or shadow-context block just to fill space.
Same internal links: state <-> mediation; mediation <-> translation; mediation <-> transport. Remote transport interfaces with the exterior REMOTE RDMA NIC. Show a separate physical-operation connection between the remote software region and exterior Remote peripherals, not via the RDMA NIC. It may use a narrow clear right-side corridor if needed; it must not cross text or look like payload going through control semantics.
INTERFACES AND EXTERIOR RESOURCES:
Align frontend Cross-domain transport and LOCAL Cross-domain transport on a common centerline; connect them by a bidirectional navy "Control channel" in the inter-column gap.
Below and OUTSIDE each host frame lie its peripherals and its RDMA NIC. On the resource row, order LEFT TO RIGHT: DUT memory, Local peripherals, local RDMA NIC, remote RDMA NIC, Remote peripherals.
A straight blue bidirectional "Host-local P2P DMA" connects DUT memory directly to Local peripherals. No software or intermediate node on this host-local payload edge.
A teal bidirectional "RDMA link" connects the TWO RDMA NICs.
NEVER draw Remote peripherals directly to DUT memory or label that remote path zero-copy/P2P. The remote path is host-mediated; the caption will explain its memory-visibility obligations.
Native driver is the DUT driver, not host software. Corresponding local/remote runtime modules MUST match spatially. This is an architecture and dependency diagram, not a mandatory pipeline. No new research claims or performance numbers.
Use exact wording: NO "Topology", "Virtual state", "Device binding", "Shadow context", "Shadow queues", "Data coordination", "Execution mediation", "Completion coordination" or "Event transport".

## Shared runtime grid refinement

Use case: precise-object-edit.
Input image is the academic architecture EDIT TARGET. Make ONLY the following grid-alignment corrections. Keep the canvas size, all English labels, role colors, exterior resources, frontend request/response/interrupt wiring, DUT, memory and overall three-column composition unchanged.
The two software backends share FOUR runtime modules. Those matching modules MUST have the same width and height and exactly the same vertical positions. Use the current LOCAL grid as the y reference, but resize both local and remote grids to the same comfortably fitting widths.
For the supplied approximately 1639 x 960 image, use this common grid:
"Device state" boxes both about 380 wide x 86 high, top y=343. Local x approximately 683; remote x approximately 1198. Keep secondary text "Logical state" locally and "Execution state" remotely.
"Semantic mediation" left and "Address translation" right: boxes 175 wide x 92 high, top y=471 on BOTH hosts. Local x=683 and 888; remote x=1198 and 1403.
"Cross-domain transport" bottom boxes: 380 wide x 65 high, top y=595 on BOTH hosts, aligned with their respective state boxes.
Maintain identical typography and line breaks in the two semantic-mediation boxes and in the two address-translation boxes. Adjust short connecting arrows to the resized boxes; do not add or remove dependencies.
The FPGA's lower-right "Cross-domain transport" box should move just enough vertically that its CENTER aligns with the CENTER of the local software transport box (around y=627). The bidirectional Control channel must connect the centers horizontally, not the top edge of local transport. Keep "Control channel" above that edge.
The local Device assignment dependency line should use the empty right margin and terminate on the RIGHT edge of local Cross-domain transport. It must not pass through Address translation or Device state.
Keep Local/Remote branch labels and resource interfaces. Remote peripherals have a physical-operation interface to the remote SOFTWARE REGION, separate from the RDMA NIC; it is not a payload DMA path or transparent bus extension.
Keep the existing phase-free architecture design and no new modules. Do not introduce Topology, shadow words, buffers, DMA window boxes, models, numbers or decorative icons. All box labels centered in both directions. Flat, restrained publication style.

## Merged assignment and remote dependency correction

Precise revision of the supplied academic architecture diagram. Keep the three-column composition, English labels, publication typography, restrained flat pastel role colors, DUT, memory and external resources. No concrete device models, icons, buffers, shadow terminology, mathematical symbols, extra modules or DMA-window intermediary.
1. In the LOCAL software back-end ONLY, replace the two top boxes "Hierarchy definition" and "Device assignment" with ONE wide centered box labeled "Device assignment". It combines selected device hierarchy and physical-device / host-location assignment. From this box draw one navy dependency arrow to local Device state and one navy dependency down the empty right margin to local Cross-domain transport; this second arrow must not cross Device state or Address translation.
2. EXACT COMMON RUNTIME GRID for both back-ends: Device state full-width 380 x 86 at y=343; Semantic mediation left 175 x 92 and Address translation right 175 x 92 at y=471; Cross-domain transport full-width 380 x 65 at y=595. Local grid x=683 and right box x=888. Remote grid x=1198 and right box x=1403. Same widths, heights, typography, baseline positions and gaps; all text centered. Local state subtitle "Logical state"; remote subtitle "Execution state". Do not insert a blank placeholder module remotely.
3. Remote-control arrows must make causality unmistakable: local Cross-domain transport <-> local RDMA NIC <-> remote RDMA NIC <-> remote Cross-domain transport <-> remote Semantic mediation. Use one consistent muted TEAL (#148A99) for ALL these remote-access links, including the short vertical remote transport-to-mediation link. Keep navy for local control, state and translation interfaces. Keep bright blue ONLY for existing host-local P2P DMA directly between Local peripherals and DUT memory. No remote device-to-DUT-memory P2P arrow.
4. Remote physical operations MUST connect remote Semantic mediation to Remote peripherals, NOT originate from the Cross-domain transport box or its parent frame. Remove the old transport-to-peripheral vertical arrow. Add a clearly attached navy bidirectional service arrow from the lower-right edge of remote Semantic mediation, descend into the clear gap below the middle row, route rightward BELOW Address translation, then descend in a narrow clear corridor RIGHT of remote Cross-domain transport, then turn toward Remote peripherals and terminate on its top edge. Expand only the remote region right margin slightly if necessary to provide clean clearance. No unrelated box may be crossed; no apparent junction to the remote RDMA link. Remote semantic mediation retains navy bidirectional links to Device state above and Address translation on its right.
5. Align the FPGA Cross-domain transport center and local Cross-domain transport center; navy Control channel connects these centers horizontally. Retain frontend requests from Device access window to Access event identification to Cross-domain transport; replies go back directly to Device access window; interrupt state goes to Interrupt delivery then DUT.
Keep RDMA NICs and peripheral boxes OUTSIDE the host frames. Retain Local and Remote branch labels. White background, no shadows, gradients or decorative embellishment.

## Final layout cleanup

Precision layout cleanup of this architecture figure, preserve ALL wording, role colors, every arrow's source, destination and color, merged Device assignment and three columns. Do not change the dependency graph.
ONLY resize/reposition matching shared modules: use the REMOTE runtime boxes as the size reference (380 px state/transport width, 175 px middle module width, 86/92/65 px heights). Make the LOCAL Device state and Cross-domain transport about 35 px NARROWER, preserving their LEFT edges. Move and resize LOCAL Address translation left to align with the right end of the narrowed full-width boxes. Make local Semantic mediation exactly the same 175px width as remote Semantic mediation. Keep both hosts' corresponding boxes at matching y positions. The local wide Device assignment box may remain wider than the runtime grid. Its right-margin arrow still connects to the RIGHT side of local transport; never cross a node.
Move FPGA Cross-domain transport 10px lower so its center aligns with the local Cross-domain transport center. Adjust ONLY the short frontend response/identification/interrupt connectors and Control channel to keep proper attachment. Keep remote navy operation arrow clearly originating from Semantic mediation and routing around remote transport. Keep the teal NIC-to-transport-to-mediation request/result path. Do not insert any extra module, legend, symbol, or icon. Flat academic colors and no gradients.
