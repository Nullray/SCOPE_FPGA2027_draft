# Figure 3: aligned two-phase architecture

Generated with the built-in image-generation tool on 2026-09-25. The current
manuscript asset is `system_architecture_ai_v2.png`; the earlier
`system_architecture_ai.png` is retained for comparison. The final iteration
used the earlier figure as a semantic and stylistic reference.

## Final-iteration design brief

> Draw an original, print-ready two-phase conceptual architecture figure for
> a two-column ACM systems paper. Keep two full-width horizontal phases and a
> restrained academic style with serif-compatible labels, thin arrows, light
> fills, and opaque white background. In Phase 1, put the DUT-visible PCIe
> hierarchy at the far left, the FPGA front-end next, and the host software
> back-end next. Put topology policy, virtual state, and device binding inside
> the host software back-end. Configuration-state arrows point left, from the
> host software back-end through the FPGA front-end to the hierarchy. At the
> FAR RIGHT of Phase 1, put a green check beside the exact label “Native
> driver enumerates”; this is an outcome annotation, not an intermediate
> component of the leftward path. Align the Phase 1 FPGA front-end vertically
> with the Phase 2 FPGA front-end, and likewise align the two host software
> back-end boxes. Keep Phase 2 as a left-to-right sequence: native driver,
> FPGA front-end, host software back-end, compatible physical device. Keep a
> distinct blue payload-DMA path to DUT memory and the three bottom ordering
> checks. Avoid specific device vendors or model numbers, decorative icons,
> shadows, and dense implementation detail. All text must be legible at paper
> width.

## Semantic check

The far-right Phase 1 check reports the result of configuration and
presentation; it does not reverse the leftward configuration-state arrows.
The host software back-end is software, not the physical device. The blue
payload path applies to the illustrated host-local case, and the checks
express ordering obligations rather than experimental proof.
