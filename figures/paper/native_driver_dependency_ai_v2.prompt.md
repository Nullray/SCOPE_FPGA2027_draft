# Figure 2: native-driver dependency (AI revision)

Generated with the built-in image-generation tool on 2026-09-25. Source asset:
`native_driver_dependency_ai_v2.png`. It replaces `driver_contract_ai.png` in
the manuscript; that earlier image is retained for comparison.

## Final generation prompt

> Create an original Figure 2 for a rigorous computer-architecture / FPGA
> research paper. Wide landscape 2.3:1, opaque white, flat vector-like
> academic sequence diagram; no drawings of devices, no icons, no flags, no
> clipart, no checkmarks, no colorful boxes, no rounded cards, no gradients or
> shadows. Show two VERTICALLY STACKED, matched sequence panels with identical
> five lifelines/column headings: 'Native driver', 'DUT memory', 'FPGA
> front-end', 'Host back-end', 'Physical device'. Use thin vertical gray
> lifelines, precise horizontal event arrows, sparse black text, one restrained
> muted red/orange broken dependency in panel (a), one restrained muted blue
> ordering line in panel (b). Panel (a) title: '(a) MMIO forwarding alone'.
> Events in causal top-to-bottom order: driver writes 'descriptor: DUT address'
> into DUT memory; driver sends 'doorbell' through FPGA front-end directly to
> physical device, bypassing host back-end; physical device sends dashed 'DMA
> at DUT address' toward DUT memory, but the arrow visibly terminates before
> memory at an explicit gap labelled 'not device-reachable'. This is the
> missing dependency, not a successful transfer. Panel (b) title: '(b)
> Mediated submission and completion'. Events in causal top-to-bottom order:
> driver writes 'stable descriptor' into DUT memory; FPGA front-end sends
> 'doorbell event' to host back-end; host back-end reads descriptor from DUT
> memory and translates its DMA reference, shown with small label 'translate
> address'; host back-end sends 'physical doorbell' to physical device;
> physical device moves 'payload / writeback' into DUT memory; ONLY AFTER THAT
> the host back-end reports 'completion' toward native driver through the FPGA
> front-end. Draw a thin horizontal separator between panels, not decorative
> borders. The architecture distinction MUST be unambiguous: FPGA front-end is
> hardware, Host back-end is SOFTWARE, Physical device is NOT the back-end.
> Keep line labels at most 2 or 3 words where possible, English only, exact
> spellings of quoted labels. Academic style like a careful paper figure,
> legible at 16 cm width, analytical and systematic but not cluttered, no
> numbers or unsupported performance claims. Avoid rendering the entire thing
> as five generic square modules or a marketing infographic.

## Semantic check

The failed DMA arrow is a conditional counterexample: an unmodified DUT
address is not necessarily reachable by an assigned physical device. The
second panel shows the host-local conceptual dependency, not a measured trace
or a claim that every backend transport uses the same DMA path. The host
back-end is software, separate from the physical device.
