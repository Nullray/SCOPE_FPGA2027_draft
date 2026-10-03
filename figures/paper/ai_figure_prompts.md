# AI figure prompt set (historical Figure 1 and current Figures 4--8)

All images were generated with the built-in image-generation tool. The input
style reference for new images was `system_architecture_ai.png`; it supplied
only the restrained white/navy, blue/orange/green, serif, two-column-paper
visual language. Each image was generated separately. The two corrective
edits targeted only the three-plane control-event route and the measurement
interval arrowheads. Original generated variants remain outside the repo.

The following concise prompts are reusable final production specifications.
For every figure: make an original computer-architecture paper diagram, use
crisp thin lines and ample whitespace, avoid gradients/3-D/product IDs/Greek
symbols, and keep text legible at its manuscript width.

The design-space plot in item 1 is retained as historical provenance; the
manuscript now uses `access_tradeoff_ai_v2.png`, with its prompt in
`access_tradeoff_ai_v2.prompt.md`. Current Figure 2 uses
`driver_contract_abstract_ai_v3.png`, with its prompt in the corresponding
`.prompt.md` file. The earlier five-lifeline Figure 2 remains as a comparison
variant, not a manuscript figure.

1. **Design space (`design_space_ai.png`).** Draw a qualitative two-axis map.
   Horizontal: “Programmability of device presentation”, fixed to
   software-defined. Vertical: “Physical execution”, modeled to physical.
   Place Direct attachment (triangle) upper-left, Device model (square)
   lower-right, and SCOPE (open circle) upper-right. Add “qualitative, not to
   scale”. No numerical ticks or implied fidelity measurement.

4. **Functional planes (`three_planes_ai.png`).** Draw three aligned horizontal
   bands: Software plane (DUT OS + native driver consumes logical device
   contract), Control plane (FPGA front-end exchanges control events with host
   software back-end; the latter performs virtualization and semantic
   mediation), and Data plane (physical device exchanges payload with DUT
   memory). Driver control events pass through FPGA front-end before back-end.
   Add the small note “SDN analogy: programmable control, separate data path”.
   Do not depict the planes as three physical machines.

5. **Ordering contracts (`coherence_contracts_ai.png`).** Three equal vertical
   four-step sequences: configuration write → image and route agree →
   acknowledge write → dependent access; descriptor stable → addresses
   translated → device-visible entry → physical doorbell; physical writeback
   → data visible in DUT memory → completion published → interrupt *may*
   assert. Downward arrows denote precedence, not latency. No cross-endpoint
   total order.

6. **Topology reconfiguration (`topology_reconfiguration_ai.png`).** Two sparse
   matched rows for separate runs: storage logical view → generic FPGA
   front-end → storage semantic adapter → compatible physical device; network
   logical view → *identical* generic FPGA front-end → network semantic
   adapter → compatible physical device. Connect the two FPGA depictions with
   “same provisioned capacity”. The adapters belong to the host software
   back-end. No hotplug, simultaneous test, or cross-protocol substitution.

7. **Metadata versus payload (`semantic_dma_ai.png`).** Two separate lanes.
   Top: published descriptor with DUT address → host software back-end
   translates DMA addresses → device-visible descriptor with reachable
   address → physical doorbell. Bottom: physical device ↔ DUT memory through
   FPGA DMA window; this host-local payload path bypasses software byte
   copying. Add “Host-local path shown; remote staging is not depicted”.

8. **Measurement boundaries (`measurement_boundaries_ai.png`).** Three
   separate horizontal intervals with endpoint ticks, **not arrowheads**:
   DUT BAR write to DUT acknowledgement via FPGA and host software; BAR event
   to physical doorbell via descriptor mediation; MMIO issue to end of timed
   MMIO along direct control path. No shared clock origin, no numbers, and no
   vertical inter-lane connectors. Add “Different requesters and paths — not
   an additive overhead decomposition”.

The image labels were visually checked against these semantics. Captions state
the interpretation and limits; neither image generation nor successful paper
compilation validates the underlying hardware ordering or pending experiment
results.
