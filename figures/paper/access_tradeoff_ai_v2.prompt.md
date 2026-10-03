# Figure 1: access responsibilities (AI revision)

Generated with the built-in image-generation tool on 2026-09-25. Source asset:
`access_tradeoff_ai_v2.png`. It replaces the plotted `design_space_ai.png` in
the manuscript; that earlier image is retained for comparison.

## Final generation prompt

> Create an original camera-ready academic systems-paper diagram, Figure 1,
> wide landscape aspect ratio 2.25:1 for a two-column ACM paper. This is a
> conceptual comparison, NOT an engineering schematic, marketing infographic,
> or flowchart. The central insight is that device PRESENTATION and EXECUTION
> are different design choices. Use a rigorous 3-column matched comparison
> with column titles exactly '(a) Direct attachment', '(b) Device modeling',
> '(c) SCOPE'. Across all columns use three horizontal conceptual strata in
> the same positions with left-side shared row headings exactly 'DUT-visible
> device', 'Control semantics', 'I/O execution'. In each column, show only one
> terse phrase per stratum: (a) 'fixed by attachment' / 'in physical device' /
> 'physical device'; (b) 'software-defined' / 'in device model' / 'modeled';
> (c) 'software-defined' / 'host mediation' / 'physical device'. Under the
> strata, a very slim conclusion line for each column: (a) 'real execution;
> fixed composition', (b) 'flexible composition; modeled execution', (c)
> 'flexible composition; real execution'. Add a subtle thin continuous vertical
> connection in (a) indicating view and execution are coupled. In (c), use
> two small crisp arrows from 'software-defined' and 'host mediation' toward
> 'physical device', indicating mediated connection, with the tiny label
> 'compatible binding'. Do not add extra labeled objects. The visual grammar
> should feel like a carefully typeset architecture-paper analytical figure:
> black and dark gray typography, precise columns, thin black rules, modest
> muted blue emphasis ONLY around column (c), abundant but purposeful
> whitespace, crisp opaque white background, no shadows, no gradients, no
> illustrations, no icons, no pictograms, no checkmarks, no flags, no emoji,
> no devices drawn, no colorful cards, no rounded shapes, no fanciful
> annotations. Exact spellings and punctuation in quoted text. Clear at 16 cm
> print width. The figure is QUALITATIVE and should not show axes, numeric
> metrics, or imply performance measurements.

## Semantic check

The three columns compare architectural responsibility, not measured
performance. The SCOPE arrows mean that a software-defined view and mediated
control are bound to compatible physical execution; they do not assert direct
unmediated passthrough or arbitrary protocol compatibility.
