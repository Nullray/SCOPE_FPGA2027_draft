# Per-endpoint commit points

Generated with the built-in image-generation tool. The source style/edit target
was `coherence_contracts_ai_single_v2.png`; the new manuscript asset is
`coherence_commit_points_ai_v3.png`. The original image remains available.

## Exact prompt

Use case: infographic-diagram. Edit target: the referenced existing per-endpoint ordering figure in an academic computer-architecture paper. Redesign its CONTENT around commitment/publication points, preserving its restrained serif typography, three stacked blue/orange/green bands, white background, and clean single-column composition. This is an academic mechanism figure, not an engineering block diagram. Use flat, very pale fills with thin colored outlines, no gradients, icons, flags, device models, Greek letters, numerical measurements, or decorative imagery. Compact near-square canvas, ample spacing and comfortably legible text at 3.3 inch width.
Top heading, exact text: "Per-endpoint commit points".
Three independent horizontal rows, no arrows connecting rows. In each row: one prerequisite region on the left, a thin navy rightward arrow through ONE small filled commit dot at the center, one released state region on the right. Render the commit action as a small but legible TWO-LINE label immediately above the dot; it must not overlap arrows. Each region has short two-line serif labels. Use six regions total, not a proliferation of component boxes.
Blue row heading: "Configuration"
Left label: "Image and\nroutes agree"
Center action label: "Matching\nacknowledgment"
Right label: "DUT write\ncompletes"
Orange row heading: "Submission"
Left label: "Published work;\ntranslated state visible"
Center action label: "Physical\ndoorbell"
Right label: "Device owns\nthe work"
Green row heading: "Completion"
Left label: "Data visible;\ncompletion valid"
Center action label: "Completion\npublication"
Right label: "DUT may\nconsume data"
Below the green row add a small thin rightward arrow and the exact label "Interrupt may assert", clearly subsequent to the rightmost completion region, not preceding completion publication.
Bottom short note, exact text: "Required order within each endpoint".
Do not add latency scales, success checkmarks, measured-validation claims, cross-endpoint order, device identifiers, or new labels. The dots represent logical commit events, NOT hardware modules or proof that visibility is provided by acknowledgment. Arrows represent precedence, not time. All text must be accurately spelled, aligned and clean.

## Semantic checks

- Configuration acknowledgment follows installed image/route agreement.
- Physical submission follows published work and visible translated state.
- Completion publication follows data visibility and a valid completion.
- Interrupt assertion is conditional and subsequent to completion publication.
- Commit dots are logical events, not modules, timing measurements, or proof
  that sequence matching provides memory visibility.
- Completion publication may be controlled by software or the ordered DMA
  path, as explained in Design; notification delay is not a DMA visibility fence.
