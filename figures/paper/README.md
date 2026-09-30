# Publication figures

Figure placement now follows chapter function: Figure 1 is in the Introduction,
where the SDN analogy frames software-defined peripheral access. Figure 2 is
in Background 2.1, comparing device presentation and physical execution;
Figure 3 follows in 2.2 as the native-driver reachability counterexample.
System Overview distinguishes Figure 4's static architecture from Figure 5's
configuration and runtime use. The new architecture shows three
attachment locations in a double-column composition; the usage figure is also
double-column.

Editable draw.io reconstructions of the earlier Figures 1--8 are
available in [drawio/README.md](drawio/README.md), along with SVG/PNG previews
and exact-original reference pages. The commit-point figure (now Figure 6) follows the
AI-first workflow: `coherence_commit_points_ai_v3.png` is the design reference,
and `drawio/fig05_commit_points_v3.drawio` reconstructs its text, layout,
arrows, commit dots, and palette as native editable objects. Its exported PNG
is included in the manuscript. The exact prompt is in
`coherence_commit_points_ai_v3.prompt.md`.

The manuscript includes eight figures. Figures 1, 3, and 7--8 use existing
AI-generated artwork; Figures 2, 4--6 use native draw.io exports. Figure 2
uses a new AI-first comparison of device modeling, direct attachment, prior
SCOPE, and SCOPE v2. The predecessor's adapted DUT interface is distinguished
from v2's selected logical device hierarchy and native-driver-facing device
view; both retain physical execution. Its pale academic palette is informed
by Paul Tol's scientific colour schemes, with gray dashed simulation outputs
and green reserved for physical devices. All labels are centered and panel
observations use semicolons. The prompt, sources and revision record are in
`access_comparison_ai_v4.prompt.md`; the v3 comparison is archived.

Figure 4 uses `system_organization_remote_ai_v9.png` as its AI-first design and
`drawio/fig03_system_organization_v4.drawio` as its native reconstruction.
The three columns locate the FPGA prototype, local host, and remote host;
peripherals and RDMA NICs are outside the host frames. Device assignment combines
supported hierarchy selection with compatible device and location allocation.
Both hosts retain Device state, Semantic mediation, Address translation and
Cross-domain transport in the same runtime grid. Local state is logical;
remote state supports physical execution. Remote request/result interfaces
are teal, local control/service dependencies are navy, and host-local P2P DMA
is blue. Remote requests proceed from the RDMA NIC through transport to semantic
mediation; physical operations originate from mediation, not transport.
The front-end identifies accesses and transports events; responses return to
Device access window directly, while interrupt state has a separate delivery
path. These are interfaces and dependencies, not a fixed processing pipeline.
The prompt and semantic checks are in `system_organization_remote_ai_v9.prompt.md`.
Earlier architecture sources remain archived and unchanged.

Figure 5 builds on the author's modified
`drawio/fig03_system_architecture_aligned_v3.drawio`, whose phase-title
upper-left corners coincide with the outer frames and share their rounding.
That author source is preserved unchanged. An AI alignment edit precedes
`drawio/fig04_configuration_runtime_v6.drawio`, which preserves those header
geometries and styles. Device assignment replaces the separate hierarchy and
assignment fields; Device state remains the other configuration field.
The two phases now have equal front-end dimensions and equal backend
x/width/height, with equal software-field dimensions and typography.
The prompt is `configuration_runtime_ai_v6.prompt.md`. Figures 4 and 5 use
the same component names and role colors; one locates responsibilities and
interfaces, the other shows how those components configure and service I/O.
Figures 1--3 and 6--8 use single-column compositions; Figures 4 and 5
use double-column compositions. The earlier
single-column prompt set and semantic checks are in
single_column_ai_prompts.md, and an earlier architecture prompt is in
system_architecture_ai_v2.prompt.md. Earlier prompt and image variants remain
for comparison. Earlier PDF, SVG, and editable
TikZ versions remain for comparison but are not included. The shared
figure_style.tex applies only to those unused TikZ figures.

| Paper figure | Source | Visual argument |
| --- | --- | --- |
| Fig. 1 | sdn_planes_scope_v2.png | SDN and SCOPE v2 functional-plane analogy |
| Fig. 2 | drawio/fig01_access_comparison_v4.png | Four access organizations: modeling, direct attachment, SCOPE's adapted DUT interface, and v2's software-selected device hierarchy and native-driver-facing view |
| Fig. 3 | driver_contract_ai_single_v2.png | Motivating counterexample: reachability does not establish the native-driver contract |
| Fig. 4 | drawio/fig03_system_organization_v4.png | Shared mediation responsibilities with software-selected local or remote attachment; host-local P2P remains distinct from host-mediated RDMA |
| Fig. 5 | drawio/fig04_configuration_runtime_v6.png | Aligned two-phase local use, with unified Device assignment and the author's coincident-corner headers preserved |
| Fig. 6 | drawio/fig05_commit_points_v3.png | Prerequisites, commit events, and released state for each endpoint |
| Fig. 7 | semantic_dma_ai_single_v2.png | Address transformation versus host-local payload movement |
| Fig. 8 | measurement_boundaries_ai_single_v2.png | Distinct measurement intervals without unverified values |

The former topology-reconfiguration Figure 6 is archived, not deleted.
`tab:configuration-freedom` now states the configurable choices and their
constraints without implying an additional experimental configuration.

For every subsequent image revision, first produce and inspect an AI version,
then reconstruct it in draw.io. Verify identical label text, semantic ordering,
geometry, grouping, palette, and arrow directions. Deliver both versions and
an exact-original reference page. Native fonts and flat fills do not reproduce
AI glyph rendering or textures pixel for pixel; the separate reference page
preserves the original bytes and must not be described as editable geometry.

These are conceptual architecture figures, not wiring schematics. They expose
the choices and obligations that distinguish SCOPE: presentation versus
execution, control versus data, per-endpoint ordering, and software choice
over generic hardware capacity.
Device categories in figures are abstract; exact hardware identifiers belong
in the evaluation setup.

The comparison-first approach was informed by the introductory figures of
Kan Shi and collaborators' [ENCORE poster](https://riscv-europe.org/summit/2024/media/proceedings/posters/53_poster.pdf)
and [TurboFuzz paper](https://arxiv.org/pdf/2509.10400), along with
[Hassert](https://riscv-europe.org/summit/2025/media/proceedings/2025-05-14-RISC-V-Summit-Europe-P2.1.01-ZHANG-abstract.pdf)
and [PEDIA](https://www.pure.ed.ac.uk/ws/portalfiles/portal/486717247/ChengEtalFPGA2025LatencyInsensitivityTesting.pdf).
The author-provided reference image likewise organizes phases around outputs
and validation obligations. The SCOPE artwork is original and does not
reproduce any source figure.

Compile the full paper from the repository root; no separate figure build is
needed for the AI assets. Figures for matched data-path results and FPGA slot
scaling remain pending measured data and are deliberately absent. Before
submission, check the raster figures again at final print size and review the
venue's AI-artwork policy.
