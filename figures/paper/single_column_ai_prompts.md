# Single-column figure prompt set

Generated with the built-in image-generation tool on 2026-09-26. The prior
wide images were used as semantic references. Each new image is an original
single-column composition, not a scaled-down copy. Figure 3 remains the
double-column `system_architecture_ai_v2.png`.

## Shared production constraint

> Use case: infographic-diagram. Draw an original academic architecture-paper
> figure for 3.3-inch final print width. Use opaque white, large
> serif-compatible labels (about 8 pt or larger at final size), thin rules and
> arrows, and restrained low-saturation blue, orange, and sage. Preserve the
> stated causal direction and exact labels. Avoid device model numbers,
> pictograms, gradients, shadows, dashboard cards, and tiny footnotes.

## Figure 1: access tradeoff

> Three vertically stacked aligned comparison bands: (a) Direct attachment,
> (b) Device modeling, (c) SCOPE. Each band has three key-value lines for DUT
> view, control, and execution. Direct attachment: fixed by attachment / in
> physical device / physical device. Device modeling: software-defined / in
> device model / modeled. SCOPE: software-defined / host mediation / physical
> device. Color only the heading strips and left rules in pale blue, orange,
> and sage respectively. No arrows or fidelity ranking.

## Figure 2: native-driver contract

> Two side-by-side vertical causal columns. Left, MMIO relay: doorbell
> delivered, a broken red boundary labelled DMA address unresolved, then
> unguaranteed data and unsafe completion in gray, with no arrow crossing the
> break. Right, mediated contract: stable submission, reachable DMA address,
> data visible, completion published, connected by downward precedence arrows.
> Blue ticks mark the two ordering obligations. No time axis.

## Figure 4: SDN analogy

> Two aligned three-plane stacks made of flat shallow parallelograms. SDN:
> Applications / Controller / Forwarding. SCOPE: Native drivers / FPGA + host
> software / Physical device + DUT memory. Cream, peach, and sage plane fills;
> a thin central divider. No cross-column arrows. Show analogous functional
> responsibility, not identical interfaces.

## Figure 5: coherence

> Three stacked horizontal rows with readable precedence arrows.
> Configuration: Image + route agree to Write completes. Submission: Entry
> stable to Addresses translated to Doorbell. Completion: Data visible to
> Completion to Interrupt may assert. The arrows indicate order, not latency.

## Figure 6: reconfiguration

> Two stacked rows labelled Run A: storage and Run B: network. Each row reads
> Logical view to FPGA front-end to Host adapter to Physical device. A single
> bracket connects the two FPGA positions and says same capacity. State that
> the runs are separate and use compatible physical devices.

## Figure 7: selective mediation

> Upper control-metadata lane: DUT descriptor to Host software back-end
> (translate DMA address) to Device-visible descriptor to Physical doorbell.
> Lower payload lane: Physical device and DUT memory connected by a thick blue
> bidirectional DMA-window arrow. A fine dependency link identifies the same
> submission. Do not depict software payload copying.

## Figure 8: measurement boundaries

> Three stacked measured intervals with endpoint ticks. Proxy BAR round trip:
> DUT write to DUT ack, FPGA + host software. Semantic submission: BAR event
> to Physical doorbell, Descriptor mediation. Direct control: MMIO issue to
> MMIO end, Direct path. State that requesters and paths differ, so the
> intervals are not an additive overhead decomposition. No numerical values.

## Semantic verification

The host software back-end is never the physical device. The SCOPE plane
analogy does not imply SDN interface equivalence. The reconfiguration rows are
separate runs. The DMA figure depicts only the host-local direct-payload path.
The timing and coherence figures do not imply measured proof of all ordering
relations.
