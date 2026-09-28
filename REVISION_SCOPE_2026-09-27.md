# Targeted manuscript revision: method, contribution, and figures

This revision addresses review items 1, 2, 5, and 6 approved by the author.
It does not change `sections/06-evaluation.tex`, its results or placeholders,
the bibliography, or the submission layout. Page-count optimization is deferred.

## Claim and scope baseline

| Intended claim | Basis | Constraint on this revision |
| --- | --- | --- |
| Software-defined access is the goal; dual decoupling supplies the means | Current manuscript and author-approved terminology | Do not equate control/data separation alone with configurable presentation |
| v2 adds a software-selected native-driver-facing device contract over the borrowing substrate | Current FPT comparison and `PRIOR_WORK_AND_CITATION.md` | Do not claim routing, semantic adapters, or control/data separation as newly invented |
| Configuration retirement follows installation of consistent configuration and routing state | Original design text and archived revision patch | A matching sequence identifies the request; it does not independently prove visibility |
| Physical submission follows stable published work and visible translated references | Archived adapter description and current design | Stable repeated reads do not establish memory ordering; expose the memory-path assumptions |
| Completion publication depends on payload visibility, including polled completion | Current contract and archived completion handling | Delaying an interrupt cannot repair premature DMA-visible completion |
| Figures should distinguish motivation, mechanism, and configuration freedom | Approved review item 6 | No new measurements, device models, or concurrency-validation claims |

The implementation repositories referenced by `EVIDENCE_LEDGER.md` are not
present in this workspace. Mechanism wording is checked against the supplied
manuscript history and patch, not represented as a fresh source-code audit.
Memory-ordering assumptions and empirical validation remain explicit.

## Revision tracking

| Review item | Action | Location | Status |
| --- | --- | --- | --- |
| 1: obligations need an execution account | Explain authority, commit events, acknowledgment, stable snapshots, DMA visibility, and completion publication | Design; overview contract summary | Resolved in exposition; empirical ordering validation remains pending |
| 2: concentrate additional contribution | Separate inherited substrate from the native-driver-facing contract and its state coordination | Abstract, introduction, related work, conclusion | Resolved in positioning; no new originality or implementation-evidence claim |
| 5: remove conceptual repetition | Consolidate Overview into three logically connected subsections; leave Evaluation structure unchanged | Overview and transitions | Resolved within approved scope |
| 6: increase figure information | Retain Figure 2 as the counterexample, replace Figure 5 with commit points, replace the old configuration Figure 6 with a boundary table | Background, Design, figure documentation | Resolved; new Figure 5 generated first and reconstructed in draw.io |

## Verification

- Successful build: `latexmk -pdf -interaction=nonstopmode -halt-on-error '-outdir=.paper-review/method-contract-revision' main.tex`.
- Deliverable: `output/pdf/SCOPE_v2_method_revision.pdf`; all pages inspected as rendered PNGs, with the latest Figure 5 inspected again after font-weight calibration.
- Reference checks: 28 unique labels, 14 cited bibliography entries, seven included figures, no missing references, citations, or images. Overview has three subsections.
- Protected-file SHA-256 checks confirm that Evaluation, bibliography, and the Figure 3/Figure 4 image assets are unchanged by this revision.
- New draw.io Figure 5: 28 native cells, four edges, 15 exact labels; no bitmap on its editable page, no invalid terminals or overflowing text areas. Its reference page embeds the exact AI source bytes.
- `git diff --check` passes. Compilation has no unresolved citations/references or overfull horizontal boxes. The ACM reference-format warning, underfull boxes, and a 1.11 pt final-page vertical-box warning remain; submission layout and page-count work are deliberately deferred. Rendered content is not clipped.

These checks do not establish hardware memory-ordering correctness. Experimental
validation and auditing the unavailable implementation repositories remain outside
the completed revision.

## Figure revision workflow

The author's added requirement is applied to every future artwork revision:
first generate an AI version, then reproduce that version with native draw.io
elements, and inspect both versions side by side. Preserve the prompt, AI source,
editable drawing, and rendered preview. Match labels, grouping, relative layout,
palette, and arrow directions; do not silently substitute a different design.
For this Figure 5, native font rasterization and flat fills still differ from
the AI texture and glyph outlines. The exact-reference page is non-editable
and must not be presented as a pixel-identical native conversion.
