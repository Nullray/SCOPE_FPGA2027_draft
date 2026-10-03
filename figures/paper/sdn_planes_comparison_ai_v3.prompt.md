# Figure 1 AI design prompt and semantic corrections

The built-in image generation tool produced the AI reference
`sdn_planes_comparison_ai_v3.png`. The request was a wide, two-panel academic
comparison of SDN and SCOPE v2 with three aligned, low-saturation
parallelogram planes in each panel: Software Plane, Control Plane, and Data
Plane. SDN shows network applications and intent, an SDN controller with
network state and rule selection, and forwarding elements carrying packets.
SCOPE v2 shows the DUT OS and native drivers, an FPGA front-end and host
software back-end, and DUT memory with compatible physical devices. The
front-end and back-end exchange control, while the data-plane payload relation
is conceptual and placement-dependent. The style is flat, white-background,
two-column paper artwork without icons, gradients, shadows, or device models.

The follow-up image edit specified the required directions: intent and rules
downward; state and events upward; device view and completions upward; device
access and operations downward. It also requested the paper's orange
front-end, blue software back-end, gray-blue DUT memory, and green physical
devices. The native draw.io reconstruction keeps this layout and color scheme,
corrects any residual ambiguity in the generated arrows, and centers every
label within its shape. The manuscript uses the validated native export.

## Final AI edit prompt

> Edit this academic comparison diagram, preserving its wide 2-panel layout,
> six pale parallelogram bands, typography scale, and overall white-background
> style. Make only these semantic corrections and matching palette adjustments.
> Put '(a) SDN' and '(b) SCOPE v2' above their respective columns rather than
> at bottom if there is room. In SDN, between Software and Control use exactly
> one DOWN arrow labeled 'Intent' and one UP arrow labeled 'State'; between
> Control and Data use exactly one DOWN arrow labeled 'Rules' and one UP arrow
> labeled 'Events'. Remove the erroneous Rules/Events arrows between Software
> and Control. In SCOPE v2, between Software and Control use exactly one UP
> arrow labeled 'Device view' and one DOWN arrow labeled 'Device access';
> between Control and Data use exactly one DOWN arrow labeled 'Operations' and
> one UP arrow labeled 'Completions'. The FPGA front-end and Host software
> back-end connect with a BIDIRECTIONAL arrow. Color FPGA front-end pale
> orange, Host software back-end pale blue, DUT memory pale gray-blue, Physical
> devices pale green. In the SCOPE Data Plane show a BIDIRECTIONAL blue arrow
> labeled 'Payload path' between DUT memory and Physical devices; do not imply
> direct remote DMA. Keep the labels Software Plane, Control Plane, Data Plane
> in both columns. Keep exact text spelling and no other text or arrows. No
> gradients, icons, shadows, or 3D.
