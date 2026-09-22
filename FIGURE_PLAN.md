# 配图清单与本轮结构修订

## 论文主线及改动

正文顺序为 Introduction → Background and Motivation → System Overview → Design → Evaluation → Related Work → Discussion and Limitations → Conclusion。

已删除独立 Implementation 章节和 main.tex 中的入口。原章节中的接口、语义适配器和顺序约束与 Design 重复，删除重复叙述；平台、QEMU 配置、13 个预置槽和单队列 INTx 边界集中到 Evaluation。原文件受 Git 跟踪，可从历史版本恢复。

Overview 新增三平面与 SDN 类比，Design 明确虚拟化与物理执行的语义边界，Discussion 展开可配置性、设备行为覆盖、时序保真度与中介开销的权衡。Introduction、摘要、现有架构图注和 Conclusion 同步衔接。SDN 引用采用 ONF《SDN Architecture》Issue 1.0，TR-502，2014，重点对应 §3.1、§4.2–4.4。

本轮已经完成并插入三张概念图：三平面、系统架构和一致性协议。论文插图由可复现的 TikZ 源文件生成矢量 PDF；早期 `.drawio` 文件仅保留为构图草稿。性能图和资源图仍等待口径一致的实验结果。

## 建议图集

| 建议图 | 放置位置 | 学术问题与必须表达的内容 | PPT 可复用素材 | 优先级与证据要求 |
| --- | --- | --- | --- | --- |
| 1. 三平面与虚拟化/直通分工 | Overview 的 Three Planes and the SDN Analogy | Software Plane 是 DUT OS/native drivers；Control Plane 管理逻辑视图、绑定及语义中介；Data Plane 包含真实设备与 DMA 路径。标出 virtualization → user-configurable view，passthrough → physical execution；两者可共存 | 第 3 页有完整三平面图，可复用构图与分层 | **已完成：** `figures/three_planes.tex` / `.pdf` |
| 2. 硬软件系统架构与路径 | Overview，替换当前 fig:overview，避免重复 | DUT / generic FPGA / host coordinator / semantic adapters / physical backends 的归属；控制路径、数据路径、完成/中断路径；本地与远端绑定 | 第 4 页有完整架构图 | **已完成：** `figures/system_architecture.tex` / `.pdf`；未把未经确认的 RDMA 作为实现路径 |
| 3. 可配置逻辑拓扑到物理后端的映射 | Design: Logical Topology Construction | 相同 FPGA bitstream 下的两个启动配置；逻辑 BDF、BAR、backend binding 与物理位置分别表示；注明 supported templates / fixed capacity / pre-boot configuration | 第 5 页提供文字流程，没有独立成图 | 建议；可作图 2 的子图。NVMe+NIC 同时运行仍未测，不能将示意映射画成已完成并发实验 |
| 4. 三个一致性约束的时序图 | Design，覆盖配置、提交和完成 | (a) configuration write → image/route update → acknowledge；(b) descriptor visibility → DMA translation → physical doorbell；(c) data visibility → completion → INTx。画出 DUT、FPGA、host、device 的责任和 happens-before 关系 | 第 6–8 页只有机制文字，可用来构建流程 | **已完成：** `figures/coherence_protocols.tex` / `.pdf` |
| 5. 控制路径代价 | Evaluation: Control-Path Measurements | 分面展示 Direct Control、Proxy Forwarding 和单独 NVMe semantic-submission 测量；说明 requester、起止点、单位及测量方法 | 第 12 页的表格提供另一组 cycle 数据，不能直接与正文混合 | 必需；补重复次数与离散度；不要由不同平台/计时边界计算“虚拟化额外开销”或分解未测组件 |
| 6. 数据路径性能与请求粒度 | Evaluation: NVMe / Network | 同设备同工作负载下 direct、on-board/P2P、host-remote/proxy 的吞吐/IOPS/延迟；以 block size、queue depth 展示中介成本摊薄；NIC 用单独面板且补直接基线 | 第 9 页有扫描计划；第 13–14 页有本机/板载结果表 | 必需；数据口径先核实。带宽、IOPS、RTT 不共用纵轴；未完成路径不画数据点 |
| 7. FPGA 容量与资源增长 | Evaluation: FPGA Cost and Capacity Scaling | 1/2/4/8/13 slots 对 LUT、FF、BRAM/URAM、Fmax；同约束下的绝对资源及增量斜率 | PPT 无现成资源结果图 | FPGA 论证优先补齐；必须实际综合后绘图，不能以示意直线替代测量；如果没有复制控制器的真实基线，不画其资源曲线 |
| 8. 可配置性与保真度的受控比较 | Evaluation 末或 Discussion | 固定 DUT/设备/负载/能力集，只改变可安全旁路的控制处理和 DMA 路径；报告配置覆盖、正确性、控制/尾延迟、CPU、吞吐与 FPGA 成本 | 第 3 页能提供概念素材；第 10 页仅提出 fault injection，未提供结果 | 可选增强；实验未完成时用定性比较表，避免没有定义量纲的“真实性分数”与虚构 Pareto 曲线 |

篇幅紧张时，采用图 1、2、4、5、6、7 六张主图；图 3 合并进图 2，图 8 用 Discussion 文字或表格。图 1 回答抽象分工，图 2 回答物理部署，二者标签须保持一致。

## 第 3 页三平面图的修改要点

原图的 Software Plane / Control Plane / Data Plane 与正文一致。但应把 Software Plane 明确写为 **DUT Software Plane**，防止与 host software backend 混淆。三平面划分依据职责，FPGA 与 host software 都可承担 Control Plane 的一部分。

Control Virtualization 与 Control Passthrough 是同一端点上的互补职责，不宜画成两个互斥产品模式。前者提供用户可配置的逻辑设备视图，后者使兼容操作仍由真实设备执行；需要重写 DMA 地址、协调完成状态或中断的操作仍需中介。Direct Control 微基准与此概念相关，但不等同于所有设备操作都能安全旁路。

补上 DUT memory 到真实设备的独立数据路径，避免竖向三层布局暗示所有 payload 都经过软件控制面。原图 Accelerator 应删除或标为 future extension；不能由图示推导出已完成 Vortex/FSA 验证。原图中央虚线若无清楚语义应移除，或明确标注 logical presentation / backend realization boundary。

建议英文图注：

> SDN-inspired separation of peripheral access into software, control, and data planes. The DUT software plane consumes a native device interface. Control virtualization makes the logical view and backend binding user-configurable, while passthrough retains physical execution of compatible operations after required adaptation. The data plane exchanges payload with DUT memory through a separately realized path. This combination preserves real-device execution within the exposed feature set, but does not imply direct-attachment timing or PCIe link fidelity.

## 第 4 页系统架构图的修改要点

图中 DUT 内的 PCIe Root Complex 和标为 PCIe 的前端连线可能让读者误以为验证完整物理 PCIe 链路。应根据实际接口改成 ECAM / BAR access，并标明本文验证边界；保留真实 Host–device PCIe 链路的独立标签。当前图缺少 DUT memory、DMA window 和独立 payload 箭头，这三项是控制/数据解耦的主要视觉证据。

把 Device Backends 分为 semantic adapters 与 physical devices 的对应关系；图中的 Host B、RDMA/Network 应按实际证据标注，不能暗示远端零拷贝已验证。FPGA 中保留通用模块，不画成每个设备复制一套 NVMe/NIC RTL。

## 画性能图前必须核实

- PPT 第 12 页：本机 NVMe BAR/doorbell 为 16.62/54.97 μs，板载为 2.45/4.81 μs，标为 cycle 计时；正文为 Proxy RTT 29.92 μs，以及另一组 BAR/doorbell 30.15/61.41 μs。它们可能属于不同路径或计时方法，应补实验配置、频率、起止事件和原始日志，不直接替换或拼接。
- PPT 第 13–14 页：128 KiB 顺序读为 13.52/13.28 MiB/s，4 KiB 随机读为 176.41/174.50 IOPS；正文分别为 2620.5/2596.3 MB/s 与 240372.3/236777.4 IOPS。差别远超 MB/MiB 换算，必须明确 requester、位置、负载和测量范围。
- 正文同时写随机读 QD=1 和约 240k IOPS，对应平均每次约 4.2 μs；若它与约 61 μs 的有效门铃提交属于同一路径、逐 I/O 串行处理，则不能同时解释。可能属于 Direct/P2P 与 Proxy 不同路径，需日志确认。本轮保留原数据，没有猜测修正。
- 第 13 页 NIC 数字与正文一致；第 14 页板载 NIC 栏为空。缺少的 direct/on-board NIC 基线不能按比例推算。
- 第 10 页的 Fault Injection、Vortex、FSA 是计划材料，不能画成已完成结果。并发 NVMe+NIC 和 1/2/4/8/13-slot 综合结果同样待补。

## 修订范围

本轮沿用原有测量值和证据边界，未把计划实验变成结果。学术性增强主要来自明确研究对象、三平面职责、正确性条件及可配置性与保真度的权衡，而不是删除所有原型细节。实验可复现所需的平台信息仍保留在 Evaluation。
