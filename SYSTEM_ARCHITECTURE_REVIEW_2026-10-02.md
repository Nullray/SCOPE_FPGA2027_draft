# 系统章节压缩后的内容与篇幅审查

> 下文主体记录补写前的审查。已按作者要求完成系统章节补写并通读修订；结果和验证见文末“补写落实记录”。

审查对象为当前 `main.tex`、`sections/03-overview.tex`、被其引入的 `sections/04-design.tex`，以及当前 11 页的 `main.pdf`。已对照合并前备份、合并后全文语言修订前的备份和 Git 历史，并查看 PDF 第 4–7 页。本轮只生成审查记录，没有修改论文源码或 PDF。

## 结论

合并为一个 System Architecture 章节是合理的。C1–C3 的核心依赖、状态所有权、内存可见性假设、直接 DMA 完成和轮询、中断聚合等重要机制没有被删掉；后续语言修订还补强了 C1 的实际安装顺序和 C2 的 early response 边界。

但当前文字偏重抽象角色和提交条件，具体实现偏薄。最值得补充的是软件定义设备视图的实现、一个完整的设备语义适配实例，以及远端数据与完成路径。不能仅因图文约占两页就认为实现描述已经充分。建议补约 350–550 个英文词，使本章从约 1,384 词增加到约 1,750–1,950 词，并从背景、相关工作和讨论的重复解释中回收部分篇幅。

这些是针对本稿内容的编辑判断，不是会议规定的字数或比例要求。本轮未核查 FPGA 2027 的投稿页数政策，也未将建议内容插入排版后测量最终页数。

## 一、版本和篇幅

采用与前次合并检查一致的统计方法：计数英文词，包含标题和图注；排除 LaTeX 命令、引用编号、文件路径、注释和 `Description`。正文统计进一步排除图表环境，保留小节标题。比例不含摘要、参考文献。

| 版本 | 文字、标题和图注 | 正文及标题 | 说明 |
| --- | ---: | ---: | --- |
| 合并前两章 | 2,926 | 2,670 | `tmp/architecture_revision/03-overview.tex` 与 `04-design.tex` |
| 刚合并完成 | 1,265 | 1,151 | `tmp/logic_language_review_20261002/before/sections/` |
| 当前系统章节 | 1,384 | 1,270 | 当前两个架构源文件 |

相对合并前，当前文字与图注减少约 **52.7%**；相对刚合并的版本，后续修订增加了 119 词。早先记录的“10 页、1,265 词”对应中间版本，不能用于描述当前工作稿。

| 当前部分 | 正文及标题词数 | 占全文正文 |
| --- | ---: | ---: |
| 引言 | 731 | 12.4% |
| 背景与动机 | 918 | 15.5% |
| 相关工作 | 914 | 15.4% |
| 系统架构 | 1,270 | 21.5% |
| 实验 | 1,133 | 19.1% |
| 讨论 | 794 | 13.4% |
| 结论 | 159 | 2.7% |
| 合计 | 5,919 | 100% |

当前 PDF 共 **11 页**。系统章节从第 4 页右栏末尾开始，到第 7 页左栏开头的两行结束，内容主要位于第 5–6 页，包含图 3–6。其中第 7 页顶部已经浮入实验表格，所以不能把第 4–7 页整段算成四页系统内容。四幅图及图注、间距占据了明显面积；文字实现密度比视觉上的页数更低。

引言、背景和相关工作合计 2,563 词，占正文约 43.3%，约为系统正文的两倍。对以新设备视图和状态协调为主线的本稿，优先回收这些部分和讨论中的重复说明，比继续压缩系统机制更合适。实验正文不宜为了补设计而机械删减。

## 二、哪些重要内容保留了

| 内容 | 当前位置 | 判断 |
| --- | --- | --- |
| 逻辑呈现与物理绑定、控制与载荷两种分离 | 4.1；`03-overview.tex:8–23` | 保留，足以承担概念说明 |
| 配置安装、OS 枚举和驱动初始化的区别 | 4.1；`03-overview.tex:25–35` | 保留；明确 OS 枚举中的配置写通过 C1 更新 |
| 本地逻辑权威与远端执行状态 | 4.2；`03-overview.tex:49–60` | 保留；没有错误地写成两端完全相同的状态副本 |
| 配置读快路径、控制事件、返回和中断接口 | 4.2；`03-overview.tex:40–47` | 保留了职责，缺少实际接口形式 |
| host-local P2P 与 host-mediated RDMA 的区别 | 4.2；`03-overview.tex:92–98` | 保留了边界，缺少具体远端流程 |
| C1：路由先失效、字段更新、有效性最后写、readback fence、匹配确认 | 4.3.1；`04-design.tex:34–47` | 比合并前更具体，应保留 |
| C2：稳定性检查、间接引用转换、所需输入与元数据可见后提交 | 4.3.2；`04-design.tex:52–67` | 保留了关键条件，应补设备实例 |
| BAR 接收响应不等于物理提交 | 4.3.2；`04-design.tex:57–59` | 明确保留，直接关联控制计时解释 |
| 请求匹配和稳定读取不能替代内存可见性 | 4.3；4.3.2 | 保留，应避免压缩成“收到 ACK 即正确” |
| C3：数据先于软件或 DMA 可见完成；延迟中断不能修复早可见 CQE | 4.3.3；`04-design.tex:93–108` | 保留，是论证轮询与通知的关键 |
| 共享 level 中断的端点状态独立性 | 4.3.3；`04-design.tex:110–116` | 保留，可与能力宣告的具体实现连接 |
| 新实例与新协议的成本、FPGA 容量边界 | 4.2；`03-overview.tex:100–107` | 保留；不必恢复独立的重复成本小节 |

因此，问题主要是实现说明不足，而不是三项提交机制被整体移除。

## 三、建议补强的内容

### A. 设备视图如何被实现：优先级最高

当前 4.1 说明“选择层次、安装镜像、OS 枚举”，但未交代选择如何成为标准 PCI 配置空间。更早的 Git 版本 `d4be27a` 中，Logical Topology Construction 和 Configuration-Space Virtualization 小节曾给出这些实现信息。

建议在 4.1 补一小段，说明：

- 当前原型在预置的 switch/slot 骨架内选择设备数量、顺序、受支持类型和物理绑定；由 manager 分配对应逻辑 BDF。文档没有支持“用户可任意构造 bridge graph”的证据。
- 后端生成 Type-1 bridge 和 Type-0 endpoint 配置镜像，包含身份、class、BAR 形状和实际支持的 capabilities。
- FPGA 通过标准 ECAM 暴露已提交镜像，未启用或未定义函数读为全一；Linux 使用标准 PCI host bridge 和 PCI core 枚举。
- 可宣告能力必须与实现一致，例如 82580 endpoint 使用 legacy INTx，隐藏 MSI/MSI-X；Vortex endpoint 使用其 transport/runtime，不应被纳入未经修改的 `nvme`/`igb` 原生驱动结论。

意义：这部分直接解释 SDP 相比既有寄存器借用新增的设备呈现机制。它比再次解释“两种解耦”更值得占篇幅。

建议增加约 100–130 词。具体原始地址、PCI ID 和各寄存器偏移可以留在实现文档中。

### B. 至少一个贯穿 C2/C3 的具体语义适配实例

当前 `04-design.tex:52–74` 只有“address-bearing metadata including indirect references”。更早版本曾明确写 NVMe 的 PRP/PRP list、CQE phase，以及 NIC 的 ring/descriptor/interrupt register 语义。直接合并前的备份已经把这些内容抽象化了，因此不能把这个缺口全归因于最后一次合并。

建议以 host-local NVMe 为主要例子，放在 4.3.2，并在 4.3.3 接一句：

1. 驱动在 DUT 内存发布 SQE 和 SQ tail。
2. 后端检查命令的稳定性，解析 PRP1/PRP2；PRP list 中的数据页和 next-list 引用也须转换，而不只改 SQE 的第一个指针。
3. 转换后的引用指向 FPGA coherent DMA aperture；完成元数据写回及所需可见性检查后才提交物理 doorbell。
4. 物理设备通过 aperture 传输 payload；适配器依据 phase、SQID 和 outstanding CID 验证完成，并维护本端点的 pending/interrupt 状态。

这只是实现例子，不能把稳定双读或 readback 自行提升为全系统正确性证明；现有发布顺序假设仍需保留。

随后用两三句解释复用范围：NIC 转换 ring/descriptor 的 buffer 地址并保持 cause/mask/reset 语义；Vortex 保持虚拟/物理 command queue 和完成状态，并通过专用 guest transport 使用既有 runtime。设备专用状态在后端，通用呈现、分派和传输机制可复用。

建议 NVMe 例子约 120–160 词，NIC/Vortex 对照约 60–90 词。Vortex 的 U280 RTL 简化、GDS/GIDS 不属于这部分架构适配，不应填入实现成本或贡献说明。FSA 具体机制仍缺核实，不补写未经证实的流程。

### C. 远端数据路径需要一个有方向的说明

当前 4.2 和 4.3.3 描述了远端责任，但读者还无法判断 payload 在哪一端暂存、物理设备 DMA 到哪里，以及结果消息和数据返回的先后。缺少这些信息，也不利于理解 host-remote 性能差异。

固定版本的远端文档对 NVMe `shadow-queue` + `host-staging` 模式给出：

| 操作 | 数据路径 |
| --- | --- |
| WRITE | DUT DDR → 本地 QEMU copy → 本地 staging MR → 远端发起 RDMA READ → 远端 DMA payload → NVMe DMA read |
| READ | NVMe DMA write → 远端 DMA payload → 远端发起 RDMA WRITE → 本地 staging MR → 本地 QEMU copy → DUT DDR |

READ 的数据传输先完成，再返回完成消息，本地在 DUT 数据发布后发布 logical CQE。物理队列与 guest 队列的地址和进展由不同所有者维护。

建议将上述流程压成约 80–120 词的正文，并与 C2/C3 对应。只有确认论文实测使用的模式确实是该版本的 `shadow-queue` + `host-staging` 后，才能把它写成实验配置事实。该文档也包含 `semantic` 和 `peer-dmabuf` 模式，不能仅凭当前论文写了 RDMA 就认定实测采用哪一种。两端 buffer 大小、identity-DMA 初始化步骤和 RPC 细节无需放进主文。

### D. 通用前端和软件框架复用应当更具体

当前 4.2 将 FPGA 描述为若干泛化模块，而 QEMU 只在实验平台表中出现；读者难以判断哪些是共同实现，哪些由设备扩展。

建议补约 50–70 词，说明通用 manager 维护配置镜像、BAR 路由、共享事件通道/response mailbox 和 aggregate INTx；设备后端维护私有队列、地址和 pending 状态，通过公共生命周期、BAR 处理、poll 接口接入。必要时说明 FPGA 当前一个 BAR transaction 等待响应，公共前端不因此变成每设备一套 controller；专用 worker 与 FPGA 事务接收能力是不同的并发边界。

单共享 mailbox 属于当前实现的重要限制，不能因为正文只写“端点之间不要求全局顺序”就让读者推断硬件可以任意并行接收。提交条件没有要求全局顺序，与某个实现将控制接收串行化并不矛盾，应交代二者层次。

## 四、不建议恢复的内容

- 原 overview 和 design 各自重复的三项提交条件概述。
- 两种解耦的独立总结表及紧邻的逐句复述；现有文字已经说明其角色。
- 软件配置范围表和正文的重复列举；可直接补实际模板和配置字段。
- 多次重复本地逻辑权威、远端执行状态和 RDMA 仅承担传输的说明。
- 逐次强调物理执行不等于 timing fidelity 的大段说明；在首次定义、测量解释与讨论保留关键边界即可。
- 独立恢复 Capacity and Adaptation Cost 小节；现有 4.2 末段已经保留成本划分，未测的 slot sweep 应留在实验规划/讨论。
- 工程 runbook 级寄存器表、固定物理地址、重试时间和部署命令。

建议在现有 4.1、4.2、4.3 内补短段落，优先维持一个系统章节。若 NVMe/NIC/Vortex 对照超过一段，再考虑加入一个短的 Device-Specific Realizations 小节；不需要拆回两个章节，也不必再增加架构图。

## 五、核对来源与限制

**本地对照**：当前源码；`tmp/architecture_revision/` 中合并前两章；`tmp/logic_language_review_20261002/before/`；Git `HEAD` 和 `d4be27a` 的两章。较早版本的具体实现内容缺失与最后合并的压缩分别判断，没有混算为一次删除。

**固定版本实现文档**：均为 `Nullray/nexst` 的提交 `ade3572ff3a304454e3b68e2eca883b49c2b2e46`，本轮通过 GitHub 读取：

- [系统架构文档](https://github.com/Nullray/nexst/blob/ade3572ff3a304454e3b68e2eca883b49c2b2e46/doc/PROJECT_ARCHITECTURE.md)：第 1、3.1–3.4、4.1–4.5、6、7 节；用于核对标准 ECAM、配置镜像、设备状态、公共 manager、NVMe/IGB/Vortex 实现。
- [寄存器与接口规范](https://github.com/Nullray/nexst/blob/ade3572ff3a304454e3b68e2eca883b49c2b2e46/doc/VSWITCH_REGISTER_INTERFACE_SPEC.md)：第 3.1、4、5、6 节；用于核对请求匹配、readback fence、shadow/route 安装与事件接口。
- [远端接入架构](https://github.com/Nullray/nexst/blob/ade3572ff3a304454e3b68e2eca883b49c2b2e46/doc/RDMA_REMOTE_DEVICE_INTEGRATION_ARCHITECTURE.md)：第 2、4、6 节；用于核对远端模式、host-staging 路径和完成发布。该文档明确远端主线支持 NVMe/ixgbe，论文表 4 的 remote igb/Vortex/FSA 部署不能由此核实，仍需与实际实验版本对应。

以上文档支持“可以补哪些已实现机制”，不代表本轮取得新硬件测量、完整协议证明或新并发验证。FSA 接入细节及论文中远端设备所用版本仍保留为未核实项。

统计脚本、源码/PDF SHA-256、逐页标题位置、PDF 文本和三份固定版本文档副本位于 `tmp/system_architecture_review_20261002/`。脚本采用前次合并的词数方法，结果保存为 `metrics.json`。确认本轮审查后论文源码及 `main.pdf` 哈希未变化。

## 六、补写落实记录

作者随后要求实际补充内容、通读章节，并保持学术写法。现已修改 `sections/03-overview.tex` 和 `sections/04-design.tex`：

| 位置 | 补充内容 | 论证作用 |
| --- | --- | --- |
| 4.1；`03-overview.tex:25` | 预置 switch 骨架内的设备选择、逻辑 BDF、Type-1/Type-0 配置镜像、ECAM 和能力宣告 | 说明软件选择如何成为标准 PCI 枚举可见的设备视图 |
| 4.2；`03-overview.tex:73` | 公共 QEMU manager 与设备私有状态、公共接口、一个 outstanding BAR transaction 的实现限制 | 将架构复用落实到状态与职责划分，区分控制接收和设备执行 |
| 4.2；`03-overview.tex:123` | host-staged NVMe 的读写数据方向及两端队列所有权 | 解释跨地址域执行及额外数据移动，未将该实现模式认定为所有实验使用的模式 |
| 4.3.2；`04-design.tex:61` | NVMe SQE、PRP/PRP list 的间接引用转换、写回检查和物理提交 | 用实际协议实例解释 C2 的必要性及控制/载荷分离 |
| 4.3.2；`04-design.tex:85` | Ethernet descriptor/ring 与 Vortex command/queue 的适配差异 | 说明不同协议如何复用通用呈现、分派和传输机制 |
| 4.3.3；`04-design.tex:125` | CQE 的 phase、queue/command 匹配以及直接 DMA 发布条件 | 明确后端校验不能替代硬件数据先于完成的发布顺序 |

补充后的章节已逐段通读。最终叙述顺序为：设备视图与构造 → 生命周期 → 公共组件和状态所有权 → 本地/远端数据路径 → C1–C3 条件及具体协议实例。通读时还压缩了图 6 的重复路径解释，将 NVMe 完成实例放在通用完成条件之后，并将“无跨设备全局顺序”明确限定为提交合同的要求，避免与前端串行 BAR 接收混淆。

新增文字围绕设计选择、协议依赖、复用边界和代价展开，没有加入寄存器偏移、固定物理地址、函数名、部署命令或调试参数。Vortex 仅描述 guest transport、命令及队列状态适配，未把 U280 RTL 简化和 GDS/GIDS 作为 SDP 的架构工作；没有补写未核实的 FSA 机制或新增实验结果。

验证结果：

- 系统章节文字、标题和图注从 **1,384** 增至 **1,863** 词，净增 **479** 词；正文及标题 **1,749** 词，占全文正文约 **27.3%**。
- 同一 ACM 模板下全文仍为 **11 页**，系统内容从第 4 页末延续至第 7 页右栏，主要位于第 5–7 页。
- `latexmk` 编译成功，图 1–7 编号保持一致，无未定义引用、LaTeX 错误或 Overfull 盒子。仍有 Underfull 排版警告。
- 已单独查看系统章节第 5–7 页，并检查全部 11 页缩略图，未发现裁切、遮挡或图表溢出。
- SHA-256 比较确认，本轮论文源码仅修改上述两个系统文件；摘要、引言、背景、相关工作、实验、讨论、结论及参考文献均与补写前一致。
- 工作稿更新为 `main.pdf`；归档为 `output/pdf/SDP_architecture_completed_20261002.pdf`。

本轮备份、局部 patch、编译日志、检查结果和渲染图保存在 `tmp/system_architecture_completion_20261002/`。实现依据沿用前述三份固定版本文档。
