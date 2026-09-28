# Citation suitability audit

Audit date: 2026-09-23. Scope: every citation used by `main.tex` and `sections/*.tex`, together with its BibTeX entry and the claim immediately supported by the citation. The audit follows the `academic-research-suite` citation-compliance rule that a citation must support the stated mechanism, not merely share keywords with the manuscript.

## Outcome

- Before revision: 20 cited keys, 20 bibliography entries, no missing or orphan keys.
- After revision: 13 cited keys, 13 bibliography entries, no missing or orphan keys.
- Seven tangential references were removed from the manuscript and bibliography rather than retained to inflate coverage.
- Citations supporting motivation were moved into Introduction and Background; Related Work was rewritten around four mechanism-level comparisons.
- The FASED page range was completed. The removed RIFFA 2.0 entry had incorrect authors: the paper is by Matthew Jacobsen and Ryan Kastner, whereas the previous BibTeX mixed in names from other RIFFA-related records.
- Self-citation ratio cannot be evaluated while the submission is anonymous.

## Retained claim--reference alignment

| Reference key(s) | Claim retained in the manuscript | Audit result |
| --- | --- | --- |
| `karandikar2018firesim` | FPGA-accelerated, cycle-exact scale-out full-system simulation | Directly supported by the ISCA paper and IEEE metadata |
| `biancolin2019fased` | Parameterized, timing-faithful cache/DRAM models decoupled from FPGA-host memory behavior | Directly supported by the FPGA paper |
| `li2022simbricks` | Modular composition of host/device/network simulators with explicit interfaces and synchronization; use of NIC/switch RTL | Directly supported by the SIGCOMM paper |
| `vaishnav2018survey` | Resource-, node-, and multi-node-level classification of FPGA virtualization | Directly supported by the survey's classification |
| `zhang2017feniks` | Common FPGA-OS services and access to local PCIe and remote cloud resources | Directly supported by the Feniks paper; wording narrowed to what the paper states |
| `vaishnav2020fos` | Modular FPGA system stack and resource-elastic scheduling for dynamic workloads | Directly supported by the TRETS paper |
| `zha2020virtualizing` | ViTAL decouples compilation from runtime allocation and virtualizes on-board DRAM/Ethernet | Directly supported by the ASPLOS abstract and paper metadata |
| `zha2021heterovital` | Extension of the ViTAL abstraction to heterogeneous FPGA clusters | Directly supported by the ISCA title, abstract, and metadata |
| `korolija2020coyote` | Unified FPGA execution environment with virtual memory, communication/networking, and spatial/temporal sharing | Directly supported by the OSDI paper |
| `kwon2020fvm` | FPGA-resident storage virtualization that directly manages physical storage devices and reduces host resource demand | Directly supported by the OSDI paper; no claim that SCOPE invented physical execution behind a virtual device |
| `li2017composable` | Rack-scale composition of compute, memory, and I/O resources using a PCIe-switch prototype | Directly supported by the journal paper |
| `lim2024flexforge` | Disaggregation of on-card memory and host-side PCIe bandwidth from individual FPGA chips | Directly supported by the DATE paper; no claim that it virtualizes a DUT-visible device protocol |
| `onf2014architecture` | Analogy to application/controller/data-plane separation, with no claim of protocol equivalence | Directly supported by ONF TR-502; manuscript explicitly states the analogy's limit |

## Removed references and reasons

| Removed key | Reason for removal |
| --- | --- |
| `fleming2014leap` | LEAP is a portable FPGA application/OS-services framework; the earlier citation did not support a device-contract or physical-peripheral claim beyond the much broader idea of reusable infrastructure. |
| `jacobsen2013riffa` | RIFFA is a CPU--FPGA communication framework, not logical peripheral presentation. The claim was tangential, and the stored author list was incorrect. |
| `kelm2008hybridos` | HybridOS integrates reconfigurable accelerators with Linux applications; it does not materially sharpen SCOPE's DUT peripheral boundary. |
| `eskandari2019galapagos` | Galapagos organizes heterogeneous compute kernels and network communication, not native-driver peripheral semantics. |
| `tarafdar2017clusters` | Network FPGA cluster placement is related to resource deployment but not to construction of a DUT-visible PCIe function. |
| `handagala2022oct` | OCT establishes network-attached FPGA testbed capabilities; citing it here risked implying evidence for remote physical-device mediation that SCOPE has not evaluated. |
| `miliadis2025nyx` | Nyx virtualizes pipelined dataflow execution and scheduling. Virtual FIFOs and dataflow hypervisors are too remote from SCOPE's peripheral-contract contribution to justify a dedicated citation. |

These papers are legitimate research and may be cited in a broader survey. Their removal means only that they did not carry a necessary claim in this manuscript.

## Primary verification sources

- FireSim: <https://ieeexplore.ieee.org/document/8416816>
- FASED: <https://people.eecs.berkeley.edu/~krste/papers/FASED-FPGA2019.pdf>
- SimBricks: <https://www.simbricks.io/documents/22sigcomm_simbricks.pdf>
- Feniks: <https://www.microsoft.com/en-us/research/publication/the-feniks-fpga-operating-system-for-cloud-computing/>
- FOS: <https://doi.org/10.1145/3405794>
- ViTAL: <https://li.seas.upenn.edu/publication/zha-2020-asplos/>
- Hetero-ViTAL: <https://doi.org/10.1109/ISCA52012.2021.00044>
- Coyote: <https://www.usenix.org/conference/osdi20/presentation/roscoe>
- FVM: <https://www.usenix.org/conference/osdi20/presentation/kwon>
- Composable architecture: <https://doi.org/10.1016/j.future.2016.07.014>
- FlexForge: <https://doi.org/10.23919/DATE58400.2024.10546641>
- ONF SDN Architecture: <https://opennetworking.org/wp-content/uploads/2013/02/TR_SDN_ARCH_1.0_06062014.pdf>

## Remaining limitations

The audit verifies bibliographic existence, metadata where available, and local claim alignment. It does not reproduce any cited system, establish comparative performance across systems, or substitute for a complete retraction/COI database search. No retained citation is used to support SCOPE's own measured values; those must continue to trace to project logs and the evidence ledger.
