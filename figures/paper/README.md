# Publication figures

Editable draw.io reconstructions of the earlier Figures 1--8 are
available in [drawio/README.md](drawio/README.md), along with SVG/PNG previews
and exact-original reference pages. The revised Figure 5 now follows the
AI-first workflow: `coherence_commit_points_ai_v3.png` is the design reference,
and `drawio/fig05_commit_points_v3.drawio` reconstructs its text, layout,
arrows, commit dots, and palette as native editable objects. Its exported PNG
is included in the manuscript. The exact prompt is in
`coherence_commit_points_ai_v3.prompt.md`.

The manuscript includes seven figures. Figures 1--2, 4, and 6--7 use existing
AI-generated artwork; Figures 3 and 5 use native draw.io exports. Figure 3
first uses an AI alignment edit, then calibrates both title boxes fully inside
their stage frames with equal 31 px left and 18 px top insets. Its prompt
is `system_architecture_aligned_ai_v3.prompt.md`. Figures
1, 2, and 4--7 use single-column compositions; Figure 3
remains double-column to preserve its aligned two-phase overview. The current
single-column prompt set and semantic checks are in
single_column_ai_prompts.md, and the Figure 3 prompt is in
system_architecture_ai_v2.prompt.md. Earlier prompt and image variants remain
for comparison. Earlier PDF, SVG, and editable
TikZ versions remain for comparison but are not included. The shared
figure_style.tex applies only to those unused TikZ figures.

| Paper figure | Source | Visual argument |
| --- | --- | --- |
| Fig. 1 | access_tradeoff_scope_v2.png | Comparison of presentation, control, and execution |
| Fig. 2 | driver_contract_ai_single_v2.png | Motivating counterexample: reachability does not establish the native-driver contract |
| Fig. 3 | drawio/fig03_system_architecture_aligned_v3.png | Two-phase conceptual overview with equal inset phase titles and Phase 1 enumeration outcome at far right |
| Fig. 4 | sdn_planes_scope_v2.png | SDN and SCOPE v2 functional-plane analogy |
| Fig. 5 | drawio/fig05_commit_points_v3.png | Prerequisites, commit events, and released state for each endpoint |
| Fig. 6 | semantic_dma_ai_single_v2.png | Address transformation versus host-local payload movement |
| Fig. 7 | measurement_boundaries_ai_single_v2.png | Distinct measurement intervals without unverified values |

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
