# SCOPE FPGA 2027 draft

This is an anonymous ACM sigconf draft for FPGA 2027. Upload the whole ZIP to
Overleaf, select main.tex, and compile with pdfLaTeX.

## Current argument

The paper defines SCOPE as a **software-defined peripheral subsystem for FPGA
prototyping**. Software-defined composition is the outcome; dual decoupling is
the method that realizes it:

1. device presentation is decoupled from backend implementation and placement;
2. control semantics are decoupled from the data path.

Configuration/route coherence, submission/DMA coherence, and data/completion
coherence preserve native-device behavior after the split.

The paper proceeds directly from Design to Evaluation; there is no separate
Implementation section. Essential platform facts are in the experimental setup.
The overview explains the SDN-inspired software/control/data planes, and the
discussion distinguishes user configurability, physical-device execution, and
timing fidelity. FIGURE_PLAN.md lists the required figures and reusable material
from 思路.pptx, including discrepancies that must be resolved before plotting.

## Evidence boundary

The paper distinguishes three kinds of statements:

- **Implemented:** the fixed FPGA mechanisms, software-selected logical
  topology, ECAM shadow, BAR routing, semantic adapters, DMA translation, and
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
