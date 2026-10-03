# Figure 4: SDN and SCOPE plane analogy

Generated with the built-in image-generation tool on 2026-09-25. The current
manuscript asset is `sdn_planes_comparison_ai_v2.png`. The style reference was
slide 3 of the author's `思路.pptx`; the previous `three_planes_ai.png` supplied
paper semantics only. The artwork is a new side-by-side composition.

## Final prompt

> Use case: infographic-diagram. Generate a NEW original Figure 4 for a
> two-column ACM systems/FPGA research paper. Image 1 is the AUTHOR'S slide 3
> and supplies the VISUAL GRAMMAR: three vertically stacked, shallow perspective
> PARALLELOGRAM plane slabs with restrained warm cream / light peach / pale sage
> fills, thin outlines, serious serif labels, ample white space. Image 2
> supplies the CURRENT PAPER SEMANTICS only; do not reproduce its rectangular-
> band layout. Make an exact SIDE-BY-SIDE comparison of two equal-width three-
> plane stacks, aligned row by row, separated by white gutter: left panel title
> '(a) Software-defined networking'; right panel title '(b) SCOPE peripheral
> subsystem'. In BOTH panels, each of the three planes MUST be a broad, single
> parallelogram, all with same slant and width. Left stack labels: top
> 'Application plane' with 'Network applications'; middle 'Control plane' with
> 'SDN controller'; bottom 'Data plane' with 'Network elements' and tiny 'packet
> forwarding'. Right stack labels: top 'Software plane' with 'DUT OS + native
> drivers'; middle 'Control plane' with BOTH labels 'FPGA front-end' and 'Host
> software back-end' INSIDE THE SAME SINGLE PARALLELOGRAM, connected by one
> short horizontal bidirectional arrow, no extra enclosing rectangle; bottom
> 'Data plane' with 'Physical device' and 'DUT memory' joined by a short
> horizontal arrow labeled 'payload DMA'. Use only small vertical arrows
> between adjacent planes: left top-middle 'service request', left middle-
> bottom 'forwarding control'; right top-middle 'native PCIe contract', right
> middle-bottom 'compatible operation'. The two columns express an
> architectural ANALOGY, not interface equivalence. No arrows between the SDN
> and SCOPE columns. Do not put physical devices inside the host software
> back-end. No device model numbers, no named protocol adapters, no switch or
> server pictograms, no flags, no checkmarks, no icons, no decorative shadows,
> no gradient, no 3-D blocks beyond the very shallow flat parallelogram
> perspective in the author's reference. Clear academic typography, crisp
> opaque white background, exact spelled labels, balanced full-width 2.25:1
> landscape layout, legible at 16 cm print width. Do not copy the reference
> artwork verbatim; make an original, cleaner paper figure using the
> parallelogram motif.

## Semantic check

The figure borrows only SDN's functional-plane separation. A native PCIe driver
is not an SDN application API client, and the back-end does not install generic
packet-forwarding rules. The FPGA front-end and host software back-end share
the SCOPE control plane; the physical device is in the data plane.
