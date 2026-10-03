# AI main-figure provenance

The manuscript uses system_architecture_ai.png. It was generated directly with
the built-in image-generation tool, using the author's two-phase figure as a
**style reference**, then edited with the same tool to remove an inaccurate
direct completion/interrupt return arrow. The unused intermediate variants
remain outside the repository. The earlier system_architecture.tex/PDF/SVG
remain for comparison but are not included in the manuscript.

## Visual research

Four accessible examples by Kan Shi and collaborators informed the visual
argument, rather than serving as artwork to copy:

- [TurboFuzz, Figure 1](https://arxiv.org/pdf/2509.10400): matched
  old/intermediate/proposed flow panels make the claimed difference explicit.
- [Lyra, Figure 1](https://arxiv.org/pdf/2512.13686): the same comparison
  grammar connects a new semantic mechanism to the full workflow.
- [Hassert, Figure 1](https://riscv-europe.org/summit/2025/media/proceedings/2025-05-14-RISC-V-Summit-Europe-P2.1.01-ZHANG-abstract.pdf):
  short before/after timelines isolate one architectural change.
- [PEDIA, Figure 1](https://www.pure.ed.ac.uk/ws/portalfiles/portal/486717247/ChengEtalFPGA2025LatencyInsensitivityTesting.pdf):
  one motivating example is carried across multiple aligned views.

The resulting rules are: lead with the research contrast, show an illustrative
artifact rather than an inventory of modules, visually separate control from
payload, and put correctness obligations near the mechanism that needs them.
The SCOPE main figure uses two phases because setup precedes native driver
enumeration while runtime mediation follows it. Its topology sketch is
illustrative capacity, not evidence of concurrent operation.

## Base generation prompt

~~~text
Use case: infographic-diagram
Asset type: main two-column overview figure for an ACM FPGA computer-architecture research paper about SCOPE, a software-defined peripheral subsystem.
Input image 1: visual-style reference ONLY. Learn its two dashed phase bands, restrained pastel grouping, left-to-right argumentative flow, small illustrative artifacts, and academic typography. Do not copy its content or exact layout.
Primary request: Create an ORIGINAL, publication-quality systems-research figure with two horizontal phases that explains the key idea of SCOPE through inputs, transformations, outputs, and correctness obligations. This is an analytical figure, not a hardware wiring schematic.
Canvas: wide landscape, approximately 2.1:1 ratio, pure white background, generous margins. Clean flat vector-like drawing, crisp thin strokes, readable at two-column paper width. Muted navy for DUT view, muted orange for mediated control, muted teal for physical data/execution. No gradient, shadow, 3-D, glossy art, photo, icon library, device logos, or model numbers.
Top dashed band title EXACTLY: "Phase 1  Configure the Logical Device View". Left show a simple abstract topology sketch with one root and two small generic endpoints, labelled "Topology policy". Center show a single larger light-blue area labelled "Host software back-end" containing only the concise phrases "Virtual state" and "Device binding". One arrow goes to a slim neutral interface labelled "FPGA front-end", then to a small abstract hierarchy at right labelled "DUT-visible PCIe hierarchy". At the far right, a restrained check mark and the phrase "Native driver enumerates". Show the conceptual transformation, not an electrical connection diagram.
Bottom dashed band title EXACTLY: "Phase 2  Mediate Control, Retain Physical Execution". Left show an abstract native driver producing a small queue entry and doorbell, labelled "Native driver" and "Descriptor + doorbell". The central "FPGA front-end" passes a "Control event" to the "Host software back-end", which performs "Semantic mediation" and "Address translation". At right, a plain abstract peripheral silhouette labelled "Physical device" receives the compatible operation. Beneath the control row, a clearly SEPARATE, thick muted-blue bidirectional arc links "DUT memory" directly to "Physical device", labelled "Payload DMA"; it must visibly bypass the host software back-end. A thin return arrow from physical execution toward the driver says "Completion + interrupt".
At bottom edge inside the second phase, three small concise check annotations, EXACT text: "Config before access" · "Translate before doorbell" · "Data before completion".
Critical semantics: the back-end is HOST SOFTWARE, never the physical device; physical device carries out real compatible operations; software-defined presentation does not imply arbitrary protocol substitution. The figure is conceptual and contains no timing or performance claims.
Text constraints: Use ONLY the exact quoted labels above, spelled accurately, no Greek letters, no equations, no extra explanatory paragraphs, no specific product names, no watermark. Avoid dense boxes: use boxes only as broad phase/role groups; depict topology, queue entry, physical device, and memory as minimal abstract artifacts. Make arrows non-overlapping and directions logically correct.
~~~

## Final corrective edit prompt

~~~text
Use case: precise-object-edit
Image 1 is the exact edit target. Make ONE deletion only: remove the thin BLACK long return arrow and its "Completion + interrupt" text from the bottom of Phase 2. This is the thin U-shaped black line that starts below "Physical device", runs left underneath the blue "Payload DMA" line, and ends at the left "Native driver". Erase that entire black return line, its arrowhead, and ONLY its "Completion + interrupt" label, leaving clean white space. Do not replace it with any new arrow, text, line, or object.
ABSOLUTELY preserve everything else pixel-identically as far as possible: top band, bottom band, every other arrow and arrow direction, the blue Payload DMA path, all labels including "Control event", all boxes, the three checkmark annotations, colors, sizes, borders, and layout. Do not reverse the left-to-right arrows between Native driver, FPGA front-end, Host software back-end, and Physical device. No new text.
~~~

The return path was removed because a direct device-to-driver arrow would
misstate the design: completion and interrupt state are mediated by the host
software back-end and presented through the FPGA front-end. The manuscript
explains that ordering separately; the image does not depict the return path.
