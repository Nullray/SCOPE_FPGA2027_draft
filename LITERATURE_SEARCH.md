# FENIKS citation-neighborhood search

Search date: 2026-09-22. AI-assisted targeted literature search and manuscript integration; not an exhaustive systematic review or an independent peer review.

> Superseded-use note (2026-09-23): the subsequent whole-manuscript suitability
> audit in `CITATION_AUDIT.md` retained Coyote and FVM but removed Nyx from the
> paper. Nyx is valid scholarship, but its dataflow-task virtualization does not
> carry a necessary claim about SCOPE's native-driver peripheral contract.

## Method

Applied academic-research-suite's bibliography, source-verification, and thematic-synthesis guidance. Start from `zhang2017feniks`, search forward citation candidates, inspect primary publications, and expand by mechanism (FPGA OS abstractions, device emulation, physical NVMe control). Retain the manuscript's ACM BibTeX style.

Queries included `"Feniks" "Coyote" FPGA`, `"Feniks" "virtualizing" FPGA`, `"Feniks" FPGA "2025"`, `"Feniks" "AmorphOS"`, and `site:usenix.org "FVM" "2020"`. Sources: USENIX proceedings and paper PDFs, ACM publication pages, author/institutional publication pages, and the ISCA 2025 program. Search-engine snippets served as discovery leads, not as the sole support for technical claims.

Include systems that clarify the abstraction presented to software, hardware/software partitioning, or physical-device execution. Exclude tangential application accelerators and duplicate records. Existing FOS, ViTAL, Hetero-ViTAL, FlexForge, and survey entries were preserved rather than re-added. No completeness or citation-count claim is made; a complete forward-citation graph was not retrieved.

## Added sources and claim anchors

| Key | Primary source and location | Use in manuscript | Relationship to seed |
|---|---|---|---|
| `korolija2020coyote` | [USENIX publication and BibTeX](https://www.usenix.org/conference/osdi20/presentation/roscoe); [paper](https://www.usenix.org/system/files/osdi20-korolija.pdf), section 1 and reference 63 | Virtual memory, communication, spatial/temporal sharing as FPGA execution abstractions | Direct citation of FENIKS verified in paper reference 63 |
| `miliadis2025nyx` | [ACM publication](https://doi.org/10.1145/3695053.3731094), sections 1 and 3; [author publication list](https://www.cslab.ntua.gr/research/publications/); [conference program](https://www.iscaconf.org/isca2025/program/) | Virtual FIFOs and hypervisor for shared dataflow execution; distinguishes accelerator execution from DUT peripheral semantics | Found in FENIKS citation-neighborhood search; ACM search result names Feniks in comparison table, but exact bibliography linkage was not independently retrieved |
| `kwon2020fvm` | [USENIX publication and BibTeX](https://www.usenix.org/conference/osdi20/presentation/kwon); [paper](https://www.usenix.org/system/files/osdi20-kwon.pdf), sections 1 and 4 | FPGA storage virtualization and direct physical NVMe control; motivates partitioning and resource-cost comparison | Mechanism-based expansion; not claimed to cite FENIKS |

All three are peer-reviewed systems conference papers. Titles, authors, years, and pages were checked against primary publication metadata; USENIX entries use official URLs, without inventing DOIs. Nyx uses its ACM DOI. Technical descriptions were checked in accessible primary text, but the papers' performance results were not independently reproduced. No numerical cross-system performance comparison was added.

## Synthesis and constraints

The planned claims were: Coyote integrates OS abstractions for FPGA workloads; Nyx supports shared dataflow execution; FVM combines device emulation with physical storage control. These support two comparisons, not superiority claims: accelerator-facing versus processor-DUT-facing abstractions, and FPGA-resident versus host-software mediation. The manuscript now explicitly acknowledges that virtual presentation plus physical execution predates SCOPE.

FVM appears in Related Work and Discussion with the same factual inventory: FPGA-resident storage virtualization, physical-device control, and reduction of host-side resource demand. SCOPE's prospective FPGA resource benefit is not attributed to FVM and remains unmeasured. No claims of arbitrary device compatibility, better timing fidelity, or novelty of peer-to-peer DMA were introduced.

Limitations: this pass did not re-audit all pre-existing references, perform a retraction/COI database audit, retrieve a complete Semantic Scholar/OpenAlex citation graph, or claim that the user has read the sources. New-source metadata and relevant technical claims were checked through primary web sources; no formal material-passport audit was executed.
