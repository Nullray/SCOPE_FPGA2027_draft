# Figure 3: device-access architecture with a remote RDMA extension

## Scope and semantic checks

- Generated with the built-in image tool before native draw.io reconstruction.
- Selected image: `system_organization_remote_ai_v6.png` (1725 x 912).
- SHA-256: `d813c9f35e291c2fc2f468af1cd07502c8e77d8d68ff5dd8dd3459bdc3d4fcf5`.
- User-selected names: Device access window, Access event identification, Event transport.
- Host-side control requests originate from the DUT/native driver relative to the peripheral; the local management host is not the DUT driver.
- The device access window exposes configuration/register interfaces, not the payload path. Identification associates control transactions with logical devices; device semantics remain in software.
- Local and remote host frames contain software. Assigned peripherals and RDMA NICs are separate exterior cells with explicit operation/attachment links.
- The host-local P2P edge directly joins Local peripherals and DUT memory. No DMA-window node, software byte relay, or remote P2P claim is introduced.
- Remote host plus NIC-to-NIC RDMA is the requested architectural extension, not a newly reported implementation or experimental result.
- The existing two-phase usage drawing, including the author's coincident-corner phase headers, is unchanged. Repeated high-level roles and colors continue to match.
- Native reconstruction follows the selected AI image's labels, box positions, grouping and edge directions. Exact source bytes are retained on a separate reference page; font rasterization and gradients are not claimed to be pixel-identical to native geometry.

## Exact generation prompt

```text
Use case: infographic-diagram, precise architecture revision.
Asset: an academic computer-architecture paper figure for ACM FPGA, spanning BOTH columns. Edit the supplied architecture reference into a wide three-column system organization diagram. Maintain its restrained role colors and serif typography, but make all fills flat and low-saturation. White background, no shadows, gradients, hardware icons, decorative symbols, mathematical symbols, model names, numbered stages, or presentation slogans. Use large readable Times-like English text, centered both horizontally and vertically inside every box. Aim for a clean landscape canvas roughly 2080 by 1100 pixels, with generous whitespace. It should read as an architecture and responsibility diagram, not an implementation flowchart.
Three placement regions from LEFT to RIGHT: "FPGA prototype", "Local host", "Remote host". The FPGA contains DUT, the generic front-end, and DUT memory. Host frames contain SOFTWARE ONLY. All assigned physical peripherals AND RDMA NICs MUST be outside and BELOW their host frames, visibly connected by attachment/operation links. This is intentional placement abstraction. Do not enclose peripherals inside a host boundary, and do not add another surrounding frame that encloses both.
Suggested grid (use for balance, not as printed measurements): FPGA frame x35..700 y50..1040; Local host frame x860..1450 y50..690; Remote host frame x1570..2040 y50..690. Exterior peripheral row and NIC row occupy y740..1010.
FPGA content:
- pale blue DUT box near the top, with two centered lines "DUT" and "Native driver".
- pale apricot rounded container "FPGA front-end" below DUT.
- inside front-end, top wide box "Device access window". This is the DUT-facing device-access aperture, not a device model and NOT a payload-transfer stage.
- beneath it, two side-by-side functional boxes "Access event identification" (left) and "Event transport" (right), equal height. Split identification over two or three lines to keep legible.
- bottom wide box "Interrupt delivery".
- "DUT memory" pale gray-blue box near bottom of FPGA frame, below front-end.
Frontend relations: thin navy bidirectional arrow between DUT and front-end, label "Device access". Device access window points down to Access event identification. Access event identification sends a control event to Event transport, with return response indicated by a small bidirectional link. Event transport sends committed configuration updates back upward into Device access window and interrupt-state updates down to Interrupt delivery. Keep these separate short links, not a loop or shared vertical rail. No arrow from frontend to DUT memory.
Local host content: one pale blue container "Host software back-end". Below its title, five lighter blue boxes with clear state dependencies: "Topology policy" at top; "Virtual state" left and "Device binding" right below; "Semantic mediation" left and "Address translation" right at bottom. Topology policy has arrows to state and binding. Virtual state is bidirectionally connected to mediation. Device binding points to mediation. Mediation has a bidirectional short link with Address translation. Do not insert queues, PCIe registers, physical BARs, mailboxes, sequence numbers, or an extra device-backend layer.
A navy bidirectional control interface directly connects Event transport in the FPGA to Semantic mediation in the local software; short label "Control channel", in empty space between frames. Align these two nodes on one horizontal baseline.
Remote host content: a pale blue box "Remote access service", placed toward the lower half of the host frame to avoid distracting empty height. It is a transport-facing remote service, not another authoritative logical-device model.
Outside Local host frame: one sage-green independent "Local peripherals" box at the lower LEFT side of this column, and one neutral gray-blue independent "RDMA NIC" box at the lower RIGHT side, with NIC above the peripheral baseline if needed.
Outside Remote host frame: an independent neutral gray-blue "RDMA NIC" at lower LEFT side, and an independent sage-green "Remote peripherals" box on the bottom peripheral baseline.
The local software has a short navy operation link to Local peripherals and a separate link to its RDMA NIC. Remote access service has separate navy links to its RDMA NIC and Remote peripherals. Do NOT route the peripheral-operation link through its NIC. Use separate vertical attachment paths that avoid crossing boxes.
The two RDMA NICs are horizontally aligned and connected NIC-to-NIC with a clearly labeled bidirectional "RDMA link". Use muted blue-teal for this link, contrasting with navy control and brighter blue payload. This link denotes the remote architectural extension, not measured performance; give the Remote host boundary and its extension edges a dashed outline.
A prominent straight bright blue bidirectional arrow directly connects Local peripherals to DUT memory across the bottom inter-column gap. Label it "Host-local P2P DMA". NO intermediate DMA window node, software relay, or local host memory node on this arrow. Do not draw a P2P arrow from Remote peripherals to DUT memory and do not imply the remote path has host-local P2P properties.
Legend on a quiet bottom strip if needed: a small dashed line followed by "Remote extension". No additional explanatory paragraphs inside the figure.
Use exact verbatim labels as listed. Retain recognizable role-color correspondence with the supplied figure: native driver and software pale blue, front-end pale apricot, DUT memory gray-blue, assigned peripherals muted sage. Use navy/neutral gray outlines and restrained blue/orange strokes; avoid saturated dashboard styling. All labels must be legible at two-column print size. Prevent arrow labels from touching shapes and keep full white outer margins.
```

## Rebuild

```powershell
node figures/paper/drawio/build_figures.mjs --only=fig03_system_organization_v3
node figures/paper/drawio/render_figures.mjs --only=fig03_system_organization_v3
```
