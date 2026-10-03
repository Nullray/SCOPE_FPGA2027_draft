# Figure typography and style revision

This revision uses the built-in image generation tool to edit the existing
raster assets. Figure 3 is unchanged. Original PNGs are retained; revised
single-column assets use the `_ai_single_v2.png` suffix.

## Figures 4--8: exact shared prompt

Use case: precise-object-edit. Asset: existing single-column academic computer architecture figure. Make a subtle typography-only revision of the supplied image: reduce ALL headings, panel titles, node labels, annotations and footnotes uniformly by approximately 8% (to 92% of current size), preserving the current serif font, weight, hierarchy, colors and crisp readability at 3.3-inch print width. Leave all shapes, arrows, lines, positions, color fills, white background, canvas size and aspect ratio exactly unchanged. Keep words anchored in the SAME boxes or rows and centered as currently intended; allow the slight reduction to create more breathing room. Preserve EVERY word verbatim, ALL diagram semantics and the number/direction of arrows. Do not shrink the entire diagram or add outer margins; change only the actual lettering. No new elements, omitted labels, hardware models, Greek notation, shadow, ornament, or editorial text. This is a minor font-size correction, not a redesign.

## Figure 1: exact prompt

Precise typography-only edit of this academic paper figure. Keep the canvas dimensions and aspect ratio, all three stacked comparison panels, boundaries, blue/orange/green header bands, black outlines, column alignment, all colors, hierarchy, and EXACT text unchanged. Reduce every title and body label uniformly by about 8% (to 92% of its current size), retaining the same serif font, weight and readability. Keep the text anchored in its existing row and aligned columns, centered vertically; use the extra space as breathing room. Do NOT shrink the whole diagram, add whitespace borders, alter the canvas, invent labels, add icons, change wording, redraw the concept, or omit any rows. Maintain sharp publication-quality lettering on white. This is a subtle size adjustment, not a redesign.

## Figure 2: exact prompt

Edit Image 1, a single-column academic computer architecture paper figure. Image 2 is STYLE REFERENCE ONLY, do not copy its content. Preserve Image 1's causal comparison and all its exact words, two columns, order and distinctions. Restyle Image 1 to match Image 2 and the paper's other figures: restrained pale blue/pale orange/pale green fills, navy serif typography, thin colored outlines, white background, flat vector-like scientific diagram, no gradients or shadows, no hardware illustrations, no decorative icons. Create two subtle, equally sized vertical panels with pale-blue header bands, modest panel titles '(a) MMIO relay' and '(b) Mediated contract'. Keep the same ordered words in the left column: 'Doorbell delivered', 'DMA address unresolved', 'Data not guaranteed', 'Completion unsafe'; right: 'Stable submission', 'Reachable DMA address', 'Data visible', 'Completion published'. Use simple aligned state boxes and thin causal arrows. Left unresolved step has muted orange outline and a dashed interrupted link, downstream states gray to mark lack of guarantee. Right state boxes use pale blue and pale green with continuous dark arrows. Do NOT draw an arrow across the unresolved left boundary that suggests guaranteed data. Do NOT add Greek symbols, devices, legends or prose. Reduce all typography about 8% relative to Image 1, including headings, leaving slightly more breathing room; not tiny, body labels must remain crisp at 3.3-inch print width. Keep portrait canvas and complete uncropped diagram. Render every label verbatim without adding content.

Inputs: `driver_contract_ai_single_v1.png` (edit target),
`coherence_contracts_ai_single_v1.png` (style reference).

## Verification

Inspect generated labels and arrow semantics before integration. Review the
compiled paper at its actual column layout, not only the full-size PNGs. The
8% value is an editing target rather than an exact font-size measurement for
AI-generated raster text.

All seven new assets were visually inspected and integrated into the LaTeX
sources. The resulting 11-page PDF was compiled successfully; pages 1, 3, 5,
6, 7, 8, and 10 were rendered and reviewed for single-column readability and
cropping. No missing labels or overlaps were found. Figure 3 retains its
original image and double-column placement. The final log contains no
undefined references, undefined citations, or overfull boxes.
