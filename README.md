# SDP FPGA 2027 draft

This is an anonymous ACM sigconf draft for FPGA 2027. Upload the whole ZIP to
Overleaf, select main.tex, and compile with pdfLaTeX.

The 2026-10-03 non-experimental review revises prose and conceptual figures,
while preserving the evaluation source. Figure 3 is now two-column with its
original artwork unchanged. See `NONEXPERIMENTAL_REVIEW_2026-10-03.md` for the
change record, verification, and remaining evidence boundaries.

## Current argument

The paper is titled **SDP: Software-Defined Peripherals for FPGA-Based Prototyping
of Open-Source Processors** and defines SDP as a **software-defined peripheral subsystem for FPGA
prototyping**. Software-defined composition is the outcome; dual decoupling is
the method that realizes it:

1. logical-device presentation is decoupled from physical-device attachment;
2. control semantics are decoupled from the data path.

Configuration retirement, physical submission, and completion publication
are the per-endpoint commit points that join distributed device state.
Their release conditions depend on installed configuration/routes and the
publication order provided by the memory path; a matching event identifier
does not by itself establish memory visibility.

System Overview and Design are consolidated into **System Architecture**.
`sections/03-overview.tex` presents the device view, bindings, and runtime
components, then includes `sections/04-design.tex` for state ownership and the
three commit mechanisms. Repeated summaries are removed. Essential platform
facts remain in the experimental setup; Related Work appears after Background.
The background explains the SDN-inspired software/control/data planes, and the
discussion distinguishes user configurability, physical-device execution, and
timing fidelity. Seven figures are included: six native editable diagrams
and sequential NVMe read/write curves. The accelerator log evidence is
reported in the functional-validation paragraph rather than a separate figure.
The access comparison appears in Introduction; the abstract SDN/SDP comparison
appears in Background. Conceptual components use rounded boxes, state and
metadata use folded boxes, and commit events use dots. All diagrams and chart
labels use Times New Roman. Figure 3 compares local and remote runtime
components on a shared grid; solid orange lines denote control interfaces,
dashed orange lines state/mapping dependencies, and blue lines host-local
payload. Figure 4 isolates selection, installation, OS enumeration, and driver
setup, with unlabeled precedence arrows. Figure 6 uses a compact device domain
and separate control and payload paths; translated payload references are
explained in the architecture text, without a metadata-to-aperture arrow.
`ARCHITECTURE_REVISION_2026-10-02.md` records the merged chapter and figure cleanup.
`REVISION_PLAN_2026-10-02.md` records the nine earlier requested changes and
their verification. `FIGURE_REVIEW_2026-10-02.md` records the subsequent
figure-necessity review and layout changes. `FIGURE_PLAN.md` preserves the figure design history.
`CITATION_AUDIT.md` records the claim--reference suitability
check and the removal of tangential citations.

SDP builds on the preceding SCOPE peripheral-borrowing substrate, reported
by the author as accepted at FPT 2026. `scope2026fpt` is cited in the introduction,
related work, and evaluation. Shared measurements are attributed to the prior
platform instead of presented as independent SDP results. The BibTeX entry
uses the author-confirmed nine-author list and marks the FPT paper as accepted
for publication. The anonymous manuscript cites it in the third person; FPT
DOI and page metadata remain pending. The FCCM poster is not added to the
bibliography, as requested by the author.
`PRIOR_WORK_AND_CITATION.md` records the citation format, overlap, and
submission-policy checks. Original FPT files retain their historical names.
Historical figure assets retain their original labels; the current manuscript
uses the SDP revisions in `figures/paper/drawio/*_sdap.pdf`; the filenames are
retained for source compatibility.

The 2026-09-27 targeted revision consolidates Overview into three subsections,
concentrates the additional native-driver-facing contract in the contribution
statement, and explains state authority and commit conditions in Design.
`REVISION_SCOPE_2026-09-27.md` records the changes and verification. Evaluation
and its placeholders are reserved for the author's later experimental update;
this revision does not optimize the page count.

Terminology is fixed throughout the manuscript: the **FPGA front-end** is the
generic DUT-facing hardware; the **host software back-end** is the
host-resident software subsystem that virtualizes logical device state and
mediates the control path; an **endpoint context** is its
per-logical-endpoint state and physical-device binding; and a **physical
device** is the real NVMe SSD or NIC. A device-semantic adapter is a per-type
component within the host software back-end. The term *back-end* never denotes
the physical device.

## Evidence boundary

The paper distinguishes three kinds of statements:

- **Implemented:** the fixed FPGA mechanisms, software-selected logical
  topology, ECAM shadow, BAR routing, device-semantic adapters, DMA translation, and
  aggregate INTx ordering.
- **Measured:** Proxy Forwarding BAR-write RTT (NVMe 29.92 microseconds, NIC
  28.06 microseconds), the separate NVMe 30.15/61.41 microsecond
  BAR-write/doorbell measurements, Direct Control latency, 99.1% 128-KiB
  sequential-read retention, and 956.81-nanosecond adjusted INTx injection.
- **Planned:** the NVMe+NIC concurrent run, direct NIC/remote baselines,
  NVMe write/block-size/queue-depth sweeps, and the 1/2/4/8/13-slot FPGA
  synthesis sweep.

The detailed claim-to-source mapping is in EVIDENCE_LEDGER.md. The 0..13 slots
are a provisioned capacity, not a measured 13-device result. The current paper
does not claim MSI/MSI-X, AER, hotplug, multi-queue, post-silicon reuse,
Vortex/GDS, or the complete 2 x 3 x 2 space.

## Before submission

- Add full command lines, repetitions, error bars, and resource-scaling
  synthesis results.
- Run the fixed-bitstream NVMe+NIC composition experiment.
- Reconcile wall-clock and cycle-count control-latency measurements using the
  path labels in the evidence ledger.
- Check that every claim is supported by the final experiments.
- Re-check the official FPGA 2027 call and ACM metadata.
- Keep author information, acknowledgments, grant numbers, and identifying
  repository links out of the review version.

The current draft intentionally treats post-silicon reuse and the full
2 x 3 x 2 design space as future work, because the supplied implementation and
measurements primarily establish the pre-silicon FPGA-prototyping path.
