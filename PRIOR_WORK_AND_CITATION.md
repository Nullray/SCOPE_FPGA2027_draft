# SCOPE v2: prior work, citation, and submission checks

## Name and scope

The current manuscript is **SCOPE v2: A Software-Defined Peripheral Subsystem
for Processor Prototyping**. `\sys` denotes SCOPE v2; `\sysprevious` denotes
the preceding SCOPE framework. The original FPT manuscript and historical
figure versions retain their names and content.

The supplied `SCOPE_FPT_v8.pdf` gives this title:

> SCOPE: SCalable and Observable PEripheral-Borrowing Framework for FPGA-Based Prototyping

The PDF uses template author placeholders, draft figure boxes, and unresolved
references. It is usable for content comparison, but does not establish the
final accepted-version author metadata. FPT 2026 acceptance and the final
author list/order were subsequently confirmed by the author.

## How to cite before publication

There is no need to wait for the conference presentation to acknowledge the
accepted manuscript. Use its confirmed author list, title, conference and year,
with **Accepted for publication**. Do not invent a DOI, page range or publisher
metadata that has not been assigned. Update these fields when the proceedings
record becomes available, regardless of whether the conference has taken place.

The entry is `scope2026fpt` in `references.bib`. It uses the confirmed author
list in order: Jiarun Yan, Ao Liu, Si Zhang, Congwu Zhang, Yazhou Wang, Shiqi Liu,
Mingyu Chen, Yungang Bao, and Ke Zhang. The anonymous manuscript cites the work
in the third person, as permitted by the FPGA 2027 policy. Author emails and
affiliations are unnecessary in this bibliography entry.

Current BibTeX structure:

```bibtex
@inproceedings{scope2026fpt,
  author    = {Jiarun Yan and Ao Liu and Si Zhang and Congwu Zhang and Yazhou Wang and Shiqi Liu and Mingyu Chen and Yungang Bao and Ke Zhang},
  title     = {{SCOPE}: {SCalable} and Observable {PEripheral-Borrowing}
               Framework for {FPGA}-Based Prototyping},
  booktitle = {2026 International Conference on Field-Programmable Technology (FPT)},
  year      = {2026},
  note      = {Accepted for publication}
}
```

Use third-person descriptions such as “SCOPE provides ... [citation]” rather
than “our previous paper”. For the handling of a closely related, accepted but
not publicly available manuscript, seek direction from the program chair on
disclosure and supplementary material. No email or submission action has been
taken by this revision.

## What is inherited and what the v2 draft adds

The FPT manuscript already describes cross-domain routing, direct and proxy
control modes, payload/control separation, semantic adapters and interrupt
regeneration. Those components are not claimed as new relative to SCOPE.

The v2 draft focuses on software-selected PCIe presentation for native kernel
drivers and on configuration--route, submission--DMA, and data--completion
ordering obligations. These are its proposed additional boundary, not a
conclusion that enough new technical content has already been demonstrated
for another archival conference paper.

The introduction and related work now explain this relationship. Shared
numerical records are cited in the evaluation and relevant table captions:

| Current record | Same value present in supplied FPT PDF | Treatment in v2 |
| --- | --- | --- |
| NVMe/NIC proxy RTT | 29.92 / 28.06 microseconds | Prior-platform path characterization |
| ARM/RocketChip direct control | Direct-control table values | Prior-platform reference, not matched v2 baseline |
| NVMe P2P read records | 2620.5 / 2596.3 MB/s; 240372.3 / 236777.4 IOPS | Attributed to preceding platform; v2 end-to-end use unverified |
| Virtual interrupt injection | 100 trials, 956.81 ns | Inherited event-path evidence, not new ordering proof |
| Semantic submission | 30.15 / 61.41 microseconds not found in supplied PDF | Separate draft record; provenance pending |
| Native-driver NIC traffic | Not established by the supplied FPT PDF | Separate v2 draft evidence; raw logs still needed |

Matching numerical values do not prove that two descriptions came from the
same raw run. Until run-level provenance is resolved, the shared records should
not be counted as independent new v2 evidence.

## FPGA 2027 submission policy

The official [FPGA 2027 call](https://www.isfpga.org/call-for-papers/) states that
submissions must not be substantially similar to work already published,
accepted, or submitted elsewhere. It permits third-person self-citation and,
where needed for anonymity, masked citations. Therefore a new name and an
explicit citation do not by themselves establish eligibility. New architecture
mechanisms and independently sourced evaluation must distinguish v2 from the
accepted FPT paper. The final claim of sufficient novelty belongs with the
authors and program committee.

## Metadata requiring confirmation

1. Update the FPT entry when an official proceedings record assigns a DOI and
   pages. The author list/order has been confirmed; the title is taken from
   the supplied manuscript.
2. The author confirms that the same-title **FCCM 2026 single-page record** is
   their poster and requests that it not be added to this bibliography:
   [DBLP record](https://dblp.org/rec/conf/fccm/YanLZZWLZ26),
   DOI `10.1109/FCCM68464.2026.00059`, page 271. This record must not be relabeled
   as FPT or have its DOI copied into the FPT entry. It is not cited in this
   revision; overlap and disclosure checks should still account for it.
3. Confirm whether the supplied PDF is the final accepted content and whether
   the FPT proceedings record or accepted author manuscript is publicly
   available. Do not claim a public URL or assigned FPT DOI without evidence.

## Build verification

The renamed manuscript compiles with `latexmk -pdf` without unresolved
citations or references. The title, the two renamed figure headings, the
prior-work discussion, measurement attribution, and the complete FPT author
list were checked in rendered pages. The preview is
`output/pdf/SCOPE_v2_review.pdf` (11 pages including references after the
subsequent abstract shortening). The body
extends onto page 11, so it still needs shortening for the 10-page FPGA 2027
long-paper body limit. The previous final-page vertical-box warning no longer
appears; a bibliography column-balancing warning remains. The rendered
references do not overlap or clip. No page-size, font, or margin
adjustment was made to hide the page excess.

## Figure rename prompts and assets

Built-in image generation is used only to change the current-work headings.
The source targets are `access_tradeoff_ai_single_v2.png` and
`sdn_planes_ai_single_v2.png`; the updated assets are
`access_tradeoff_scope_v2.png` and `sdn_planes_scope_v2.png`.

Exact shared prompt, with `OLD`/`NEW` instantiated as `(c) SCOPE` /
`(c) SCOPE v2` or `(b) SCOPE` / `(b) SCOPE v2`:

> Use case: text-localization. Precisely edit this academic paper figure: change ONLY the single heading 'OLD' to 'NEW'. Spell SCOPE in uppercase, then a space, lowercase v and numeral 2. Keep its existing serif font, exact font size, weight, color and vertical alignment; use the ample existing horizontal space for the added suffix. Preserve EVERY other text label verbatim and every shape, line, color, fill, panel, margin, canvas dimension and layout exactly unchanged. Do not resize any lettering or redesign the figure. No additional content, no cropped edges. This is only the system-name change from SCOPE to SCOPE v2.
