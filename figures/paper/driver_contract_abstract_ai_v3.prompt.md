# Figure 2: abstract native-driver contract

Generated with the built-in image-generation tool on 2026-09-25. The current
manuscript asset is `driver_contract_abstract_ai_v3.png`. It replaces the
five-lifeline sequence diagram, which remains in the repository for comparison.

## Final prompt

> Use case: infographic-diagram. Produce a print-ready ABSTRACT CAUSAL FIGURE
> for an ACM FPGA paper, 2.2:1 wide landscape. IMPORTANT: fully opaque pure
> WHITE (#FFFFFF) rectangular background across every pixel; NO transparency
> and NO black background. Do not draw lifelines or name hardware/software
> components. The figure asks what a native driver needs beyond a forwarded
> doorbell. Draw two clean matched horizontal rows, separated by one hairline
> rule, with typographic labels and straight thin arrows only. Row (a) label
> exactly 'MMIO-only relay'. Show 'doorbell delivered' on the left, then a red
> vertical broken bar labeled 'DMA address unresolved', then two later outcomes
> in pale gray: 'data not guaranteed' and 'completion unsafe'. Do not draw an
> arrow across the broken bar. Row (b) label exactly 'Mediated device contract'.
> Show a continuous causal path with four concise states from left to right:
> 'stable submission' -> 'reachable DMA address' -> 'data visible' ->
> 'completion published'. Put one thin blue vertical precedence mark before
> 'reachable DMA address' and one before 'completion published'. Use no node
> circles, no module rectangles, no rounded cards, no pictograms, no flags, no
> checkmarks, no 3D, no gradients, no shadows, no decorative border.
> Restrained serif-compatible black typography, muted blue for obligations,
> muted red only for the broken guarantee. Exact English spelling as quoted.
> Generous but not excessive whitespace; legible at 16 cm printed width. The
> drawing expresses necessary logical dependencies, not a measured time line,
> protocol trace, or full architecture. No extra headings or legend.

## Semantic check

The diagram omits the physical device's work between address reachability and
data visibility. It does not measure latency or assert that every MMIO relay
necessarily publishes a premature completion. It states what MMIO forwarding
alone fails to guarantee.
