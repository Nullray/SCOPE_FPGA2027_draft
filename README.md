# SCOPE FPGA 2027 draft

This is an anonymous ACM `sigconf` draft for FPGA 2027. Upload the whole ZIP to
Overleaf, select `main.tex`, and compile with pdfLaTeX.

## Current argument

The paper defines SCOPE as a **software-defined peripheral subsystem for FPGA
prototyping**. Software-defined capability is the outcome; dual decoupling is the
architecture that realizes it:

1. device presentation is decoupled from backend implementation and placement;
2. control semantics are decoupled from bulk data movement.

Configuration/route coherence, submission/DMA coherence, and data/completion
coherence preserve native-device behavior after the split.

## Before submission

- Replace every `\\TODO{...}` in the source.
- Replace the boxed architecture placeholder with the final figure.
- Add full experimental setup, repetitions, error bars, and resource-scaling
  synthesis results.
- Reconcile wall-clock and cycle-count control-latency measurements.
- Check that every claim is supported by the final experiments.
- Re-check the official FPGA 2027 call and ACM metadata.
- Keep author information, acknowledgments, grant numbers, and identifying
  repository links out of the review version.

The current draft intentionally treats post-silicon reuse and the full
`2 x 3 x 2` design space as future work, because the supplied implementation and
measurements primarily establish the pre-silicon FPGA-prototyping path.
