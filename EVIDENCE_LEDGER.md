# SCOPE evidence ledger

This ledger separates claims that are implemented, claims supported by existing
measurements, and experiments that are still required. It is deliberately kept
outside the paper body so the paper can present the method at the right level of
abstraction.

| Paper claim | Implementation/design evidence | Measurement evidence | Status |
| --- | --- | --- | --- |
| Software-defined peripheral subsystem | nexst-nm37_vswitch/doc/PROJECT_ARCHITECTURE.md (logical topology and backend configuration); qemu-nm37_vswitch/hw/misc/scope_fpga_vswitch.c (backend array and configuration parser) | NVMe and 82580 paths have been exercised through the standard Linux drivers | Implemented; complete configuration matrix still needs to be recorded |
| Device-presentation--backend-implementation decoupling | virtual_pcie_switch_proxy.v; VSWITCH_REGISTER_INTERFACE_SPEC.md (ECAM shadow, route table, readiness); QEMU configuration owns logical BDFs and backend bindings | Architectural property; no performance number is used as proof | Implemented by design |
| Control-semantics--data-path decoupling | scope_fpga_vswitch_nvme_backend.c, scope_fpga_vswitch_igb_backend.c; PROJECT_ARCHITECTURE.md (control chain and coherent data chain) | 128-KiB P2P sequential read reaches 99.1% of the host-attached result | Measured |
| Proxy Forwarding control overhead | scope_fpga_vswitch.c packet/response path; backend dispatch in NVMe and IGB modules | DUT-observed BAR-write RTT: NVMe 29.92 microseconds, NIC 28.06 microseconds | Measured; not a device-internal completion time |
| Separate NVMe semantic-submission measurement | NVMe doorbell/queue mediation in scope_fpga_vswitch_nvme_backend.c and design notes | NVMe BAR write 30.15 microseconds; effective doorbell submission 61.41 microseconds | Measured; keep distinct from Proxy Forwarding RTT |
| Direct Control overhead | Direct MMIO path in the FPGA prototype and prior evaluation record | ARM A53: FPGA-side NVMe 1136.00 ns, host-side NVMe 1295.11 ns (+14.0%), host-side NIC 1143.38 ns; RocketChip: 1138.57 / 1616.35 / 1432.90 ns | Measured; report requester/path labels |
| Data/completion/interrupt coherence | VSWITCH_REGISTER_INTERFACE_SPEC.md ordering contracts; aggregate INTx handling in scope_fpga_vswitch.c | 100/100 trigger-and-clear trials succeeded; adjusted injection latency 956.81 ns | Measured |
| Configuration-only composition | Startup-time backend JSON and fixed FPGA routing mechanism; PROJECT_ARCHITECTURE.md sections 1 and 3 | Single-device NVMe and 82580 functional paths are recorded | Implemented/measured; NVMe+NIC simultaneous run pending |
| Generic endpoint scaling | SCOPE_VSWITCH_MAX_BACKENDS=13, parameterized route table and ECAM slots | No synthesis measurements for 1/2/4/8/13 slots are in the current record | Planned P1 experiment |
| Fair baseline | Existing host-attached vs on-board/P2P NVMe read comparison | 2620.5 vs 2596.3 MB/s (128-KiB sequential read); 240372.3 vs 236777.4 IOPS (4-KiB random read) | Partial; write, remote/proxy, NIC direct baseline and repetitions pending |
| Platform details | NEXST README and vSwitch design/interface documents: NM37/VU37P, XiangShan, Linux v5.16, x86/QEMU, XDMA, 82580 8086:150e | Current paper reports only confirmed values and marks missing command lines/error bars | Documented; reproducibility record pending |

## Boundary conditions

- The repository contains the paper and this ledger; the NEXST and QEMU source
  archives supplied for this revision are the implementation evidence.
- The ledger does not treat the 0..13 provisioned slots as a measured
  13-device result.
- It does not claim MSI/MSI-X, AER, hotplug, multi-queue, post-silicon reuse,
  Vortex/GDS integration, or the complete 2 x 3 x 2 design space.
- The current paper uses igb/Intel 82580 for the supplied NIC backend. A
  different remote ixgbe experiment must be reported as a separate backend
  and must not be silently merged with these results.
