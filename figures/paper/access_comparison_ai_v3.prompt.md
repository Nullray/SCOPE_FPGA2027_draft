# Figure 1: Peripheral-access organizations

## Purpose and scope

The author-provided FPT figure supplies the three-stacked-schematic comparison
structure. The new drawing is original: it omits board slots, expansion cards,
device models and identifiers, proxy/direct mode modules, peripheral pools,
and unqualified speed, scalability, and visibility claims.

The logical argument is configurability versus retained physical execution:
modeling defines the interface and behavior; direct attachment retains physical
execution but constrains the visible view; SCOPE v2 uses a software-selected
supported view and binding, with mediated physical control. Its host software
back-end is not a physical device. The separate payload path is a schematic
host-local realization, not evidence of timing equivalence or universal
copy-free remote access. The figure caption credits the comparison framework
to the accepted FPT predecessor, using the existing `scope2026fpt` citation.

## Artifacts

- AI reference: `access_comparison_ai_v3.png` (1205 by 1306 pixels, opaque RGB).
- Native drawing: `drawio/fig01_access_comparison_v3.drawio`.
- Native previews: `drawio/fig01_access_comparison_v3.png` and `.svg`.
- Generator: `drawio/build_figures.mjs --only=fig01_access_comparison_v3`.
- Renderer: `drawio/render_figures.mjs --only=fig01_access_comparison_v3`.

The manuscript includes the native PNG at single-column width. The editable
page contains native cells, not a flattened bitmap. A separate, explicitly
non-editable reference page embeds the exact AI source bytes. Native Times
New Roman glyphs and uniform fills are not pixel-identical to AI glyphs and
residual shading. Layout and text-area calibration are documented in the
builder; the original responsibility-band Figure 1 remains unchanged.

## Built-in AI generation record

The built-in image-generation tool was used, not a CLI/API fallback. The first
candidate was rejected because of transparency and edge artifacts. A targeted
white-background cleanup produced opaque RGB art. A second targeted edit enlarged
supporting labels and wrapped the long selection/control annotations before
native reconstruction. The final image uses a colon in the first observation
and a semicolon in the other two; reconstruction follows the inspected image,
including these punctuation details.

## Verification

- Native reconstruction: 44 cells, 24 text labels, nine semantic arrows and
  three panel-divider lines. The renderer parses XML, verifies valid edge
  terminals, checks the bitmap-free editable page and English labels, and
  confirms that the exact-reference page embeds identical source bytes.
- The supporting annotations use separately positioned native text lines to
  match the AI spacing without clipping. Canvas/text-area checks report no
  errors; both AI and native versions were visually inspected side by side.
- Source SHA-256: `f605fd87d4a07c329ffdc11b098337fa57124e1dd581014daa590b6596c784f2`.
- `latexmk` builds the current manuscript successfully. All 12 pages were
  rendered and inspected, including Figure 1 and its caption on page 1.
  Figure 1 is included at 241.14749 TeX points width, approximately 361 ppi;
  its smallest native text is 40 source pixels, approximately 8.0 print points.
- All 28 labels, 14 cited bibliography entries, and seven included figures
  resolve. Evaluation, bibliography, the original Figure 1, and the other
  active artwork remain unchanged. No unresolved references/citations or
  horizontal overflow remains in the final build.
- Existing ACM-reference-format and underfull-box warnings, the 1.11 pt
  final-page vertical-box warning, and the sparse final reference page are
  retained; page-count/layout optimization remains outside this revision.

### Initial generation prompt

```text
Use case: scientific-educational.
Asset type: Figure 1 of an ACM FPGA / computer architecture research paper, a publication-quality conceptual comparison diagram.
Primary request: Create an ORIGINAL three-panel stacked comparison of peripheral-access approaches. The author supplied an older FPT figure with three vertically stacked system schematics. Borrow only that comparative structure. Do NOT copy its board modules, exact layout, red claims, or device labels. This is for SCOPE v2, whose contribution is a software-configurable native-driver-facing device view coordinated with physical execution, not simply peripheral borrowing.
Style: flat precise academic vector-like diagram on pure white; Times New Roman or a very similar scholarly serif; restrained pale blue, pale orange, and pale green fills; thin navy outlines; consistent small-radius rectangles and straight orthogonal arrows; no decorative icons, photos, shadows, gradients, textures, flags, logos, devices rendered as appliances, Greek letters, or graph axes. Keep all typography LARGE and crisp for single-column print at about 88 mm width. Use roughly 54 px for body labels on a 1536 px-wide canvas, about 64 px for the panel titles. Canvas nearly square or mildly portrait, around 1536 by 1664 px. Do not use an oversized global heading.
Composition: Three stacked, generously spaced framed panels with aligned left and right boundaries. Each title is fully inside a colored header strip, with balanced white space. Upper two panels compact and equally tall; the third is taller to explain its two paths. Do not make this a responsibility table; show actual abstract relationships with arrows and meaningful system boundaries.

Panel (a), header exact text "(a) Device modeling".
In a left-to-right chain show three simple major blocks: "DUT\nNative driver", "Device model", and "Modeled I/O". Navy arrows connect the three blocks. Below the chain, a short centered plain-text observation, exact text "Configurable view; model-limited behavior". This panel is a generic device-model approach, not an assertion that all FPGA simulation is slow.

Panel (b), header exact text "(b) Direct attachment".
At the SAME horizontal positions as (a), show "DUT\nNative driver", "Fixed attachment", and "Physical device". Navy arrows connect the blocks. A lightly outlined region may group the DUT and attachment as an abstract prototype boundary, but do not draw connectors, slots, expansion cards, or chip-specific modules. Below the chain use the exact observation "Physical execution; attachment-constrained view". Do not claim poor visibility or limited slots as universal facts.

Panel (c), header exact text "(c) SCOPE v2".
A pale-blue, thin-outline "FPGA prototype" region on the LEFT contains "DUT\nNative driver" and "FPGA\nfront-end" connected left-to-right with a navy arrow, and a small "DUT memory" block below the DUT. An unboxed annotation near the top of the region reads exactly "Software-selected view and binding". This is a logical abstraction, not circuit wiring.
On the RIGHT, aligned with the front-end, a pale-blue block reads "Host software\nback-end". It must clearly be SOFTWARE, not a physical device. Connect the FPGA front-end to the host software back-end with an ORANGE rightward arrow labeled "Control mediation".
Below the host software back-end, a separate pale-green block reads "Compatible\nphysical device". An orange downward arrow connects the host software back-end to that device, showing mediated physical control.
A BLUE bidirectional horizontal payload arrow connects the bottom DUT memory to the compatible physical device across empty space. Label it "Payload path". This depicts the host-local payload route abstractly; it must NOT go through the software back-end. No crossing text, no overlap with frames or blocks.
A short centered observation along the bottom inside panel (c) reads exactly "Physical execution; mediated timing".
If extra room is needed, increase the third panel height rather than shrinking any label.
Keep all arrows at clear block boundaries, with consistent arrowheads. Separate the logical view from the physical execution path. Backend always means the host software back-end. All devices must be generic; no NVMe/NIC model names, RISC-V, PCIe slots, FMC, board brands, or component registers. Do not add speed, throughput, scalability, authenticity rankings, check marks, mathematical symbols, or unsupported claims.
Render all quoted English text verbatim, using actual line breaks where indicated. This figure's argument is configurability versus retained physical execution with a timing boundary, not a claim of timing equivalence.
```

### White-background cleanup prompt

```text
Edit this academic architecture diagram ONLY to make it print-clean. Preserve exactly its three-panel arrangement, all English label text, all box coordinates, group boundaries, serif typography, arrow directions, and the distinction between orange control and blue payload. Do not add, remove, reorder, or resize any content.
Critical correction: EVERY black/transparent background area must become completely opaque PURE WHITE (#FFFFFF), with no black patches, cyan/green speckles, blue fringing, checkerboard, transparent pixels, halos, texture, or shadow. Text in these areas must become crisp solid dark navy, not outlined or hollow text. Keep the full panel frames and every observation readable on white. All pale-blue, pale-orange, and pale-green box fills must be clean uniform FLAT fills, not gradients. Lines and arrows must be crisp solid colors without antialiasing fringes of another hue.
Keep the entire image fully opaque and white-backed, suitable for printing as Figure 1 of an ACM computer architecture paper. All English wording must remain verbatim, including "Host software back-end", "Software-selected view and binding", "Control mediation", "Payload path", and "Compatible physical device". The DUT-to-memory bidirectional arrow must remain. Preserve the canvas extent and avoid cropping.
```

### Supporting-label legibility prompt

```text
Make a targeted SINGLE-COLUMN PRINT LEGIBILITY revision to this three-panel academic architecture diagram. Keep the same three stacked panels, English wording, 11 major block contents, path semantics, color roles, thin navy outlines, serif typography, and the two dashed prototype boundaries. All primary labels are already readable; keep those at their present size. Do not add device models, icons, mathematics, performance claims, or extra modules.
Increase the smaller supporting text to approximately the same readable size as the primary labels: the three bottom observations, "Prototype system boundary", "FPGA prototype", "Software-selected view and binding", "Control mediation", and "Payload path". At a 1205 px-wide canvas these supporting labels should be about 40 px, never tiny captions. Keep the panel headings larger.
You may line-break ONLY the long control annotation into "Control\nmediation" and the software-selection annotation into "Software-selected view\nand binding"; the words and meaning must not change. For the third panel, enlarge its height and the overall canvas slightly if necessary, moving its existing DUT/front-end/back-end row and memory/device row down to provide enough vertical room for the two-line software-selection annotation. The layout must have no text touching or overlapping blocks, arrows, or frames. Keep the upper two panels' geometry and left-to-right alignment unchanged.
The orange "Control mediation" label must sit clear above its rightward arrow, in the open gap between the FPGA front-end and the host software back-end. The blue "Payload path" label must sit clear above the blue bidirectional arrow; the payload must NOT pass through host software. Preserve DUT-to-memory bidirectionality and host-software-to-physical-device downward control.
Pure opaque WHITE background everywhere. Uniform flat pastel fills, no gradient, no texture, no transparency, no black speckles. All text solid navy, except the orange control label and blue payload label. Final result must look like a polished ACM computer architecture paper figure, not a poster or technical blog.
```
