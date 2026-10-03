# runtime / runtimes 全文用词检查

检查日期：2026-10-03。以下逐次检查保留当时的原文与建议；后续修改范围和验证结果见文末“本轮实施结果”。

## 检索范围与数量

检查当前 `main.tex`、全部章节、参考文献、论文实际使用的 PDF 图片和生成的 `main.pdf`。同时检索 `runtime`、`runtimes`、`run-time`、`run time`，不区分大小写。

正文、标题、图注及表格中共出现 **20 次**，分布在 **18 个源码位置**：`runtime` 14 次，`runtimes` 6 次。表 6 的一行含 3 次，因此位置数少于出现次数。当前摘要和参考文献中没有这些词；实际图片内部没有这些词。图 4 文件名中的 `configuration_runtime` 是资产命名，不属于可见论文内容。

PDF 中有一处 `runtimes` 被排版断为 `run-` / `times`；还原换行断词后，PDF 与源码均为 20 次。

## 语义区别

1. **运行阶段**：`runtime state`、`runtime submission`、`runtime I/O`、`runtime components`、`runtime resource allocation`。这里 runtime 是时间或阶段限定，不表示软件库。
2. **软件运行时**：Vortex/FSA runtime、adapted runtimes、runtime adaptation。这里 runtime 是具体的软件层，与驱动、应用及宿主后端有不同职责。

一个词具有这两种用法本身不是错误。应明确修饰对象和所在层，避免把 runtime 变成所有 DUT 软件的统称。表示设备运行阶段时，优先使用具体的状态或操作名称；指软件层时，使用设备名称或 accelerator 限定。

## 逐次检查

行号对应检查时的文件版本。

| 次序 | 位置 | 原表达 | 判断及建议 |
| --- | --- | --- | --- |
| 1 | `sections/01-introduction.tex:33` | configuration and runtime state | 可以理解为配置之外的队列、在途请求等状态，但过泛。建议 `configuration and operational state`，更准确地对应设备状态。 |
| 2 | `sections/01-introduction.tex:105` | adapted runtimes | 软件运行时含义合适；accelerators 已提供上下文。首次概述可写为 `adapted accelerator runtimes on the DUT`，明确它不指宿主语义后端。 |
| 3 | `sections/02-background-motivation.tex:62` | runtime submission | 运行阶段含义可以理解，但限定多余。建议 `request submission`，直接说明提交对象。 |
| 4 | `sections/02-background-motivation.tex:63` | Before runtime I/O | 含义合适，表示枚举、绑定和初始化之后的正常 I/O。建议 `Before normal I/O`，减少与软件运行时含义的交叉。 |
| 5 | `sections/07-related-work.tex:33` | runtime resource allocation | 合适，修饰 resource allocation，表示运行阶段的资源分配。可以保留；不应仅因出现 runtime 就认定是软件运行时，也不宜未经核对改成更强的在线重配置主张。 |
| 6 | `sections/03-overview.tex:48` | Runtime Components and Data Paths | 标题可以理解，但本节涵盖 FPGA 硬件和宿主软件，也含配置读服务。建议 `System Components and Data Paths`，覆盖范围更直接。 |
| 7 | `sections/03-overview.tex:51` | runtime components | 与上条是同一概念。若修改标题，正文同步改为 `system components`。 |
| 8 | `sections/03-overview.tex:86` | Runtime components of SDP | 同样建议随标题改为 `System components of SDP`。修改图注即可，图内部没有 runtime 标签。 |
| 9 | `sections/04-design.tex:94` | An adapted DUT runtime | 指软件运行时，含义合适。当前段落具体讨论 Vortex，建议 `An adapted Vortex runtime on the DUT`，避免让 DUT runtime 像一个跨设备的统一运行时名称。 |
| 10 | `sections/06-evaluation.tex:198`，表 4 Vortex 行 | Vortex driver and runtime | 合适，明确区分驱动和用户侧运行时。建议保留。 |
| 11 | `sections/06-evaluation.tex:200`，表 4 FSA 行 | FSA runtime | 合适，作为 FSA 设备访问软件层名称；现有跨层清单单列 FSA guest 运行时。首次描述可交代其负责的提交、同步和结果访问接口，而不需要把它描述成复杂的调度系统。 |
| 12 | `sections/06-evaluation.tex:270` | drivers, runtimes, and application workloads | 合适，列举不同软件层。可写成 `drivers, accelerator runtimes, and application workloads`，与其它软件层名称更容易区分。 |
| 13 | `sections/06-evaluation.tex:310`，表 6 行名 | DUT driver / runtime | 合适，这里明确是两类 DUT 软件。可保留；需要强调修改状态时，可写为 `DUT driver/runtime adaptation`。 |
| 14 | `sections/06-evaluation.tex:310`，表 6 FSA 单元格 | Runtime adaptation | 指对软件运行时的修改，作为定性状态可以保留。它不表示程序运行期间自动适配。保留现有表述时，正文应明确是 DUT 运行时的设备访问、同步等接口适配。 |
| 15 | `sections/06-evaluation.tex:310`，表 6 Vortex 单元格 | Runtime adaptation | 对运行时部分合适，但作为全部 DUT 软件改动的概括不充分：跨层清单还单列 guest 驱动和传输接口。若单元格代表整个 DUT 软件层，`Software adaptation` 更准确；若遵循现有表格约定保留，应明确相关驱动/传输接口也有适配，不能推出驱动未修改。 |
| 16 | `sections/06-evaluation.tex:333` | FSA and Vortex require runtime adaptation | 与表 6 的范围问题相同。现句后半部分说明 device-access interfaces，有一定限定，但仍容易被理解为仅改运行时库。建议 `FSA and Vortex require adaptation of the DUT software stack, including accelerator runtimes and device-access interfaces.` |
| 17 | `sections/07-related-work.tex:116` | adapted DUT runtimes | 合适，用于限定加速器依赖经过适配的软件运行时，区别于存储和网络的原生内核驱动。可保留；首次定义后无需反复扩展名称。 |
| 18 | `sections/08-discussion.tex:11` | adapted DUT runtimes | 合适，与功能验证的边界一致。可保留。 |
| 19 | `sections/08-discussion.tex:48` | total effort across remote software, DUT runtimes, and shared infrastructure | runtime 本身没有用错，但这里讨论总集成成本，DUT 软件还可能包括驱动和传输接口。建议将 `DUT runtimes` 改为 `DUT software`，避免范围过窄。 |
| 20 | `sections/09-conclusion.tex:17` | accelerators use adapted DUT runtimes | 合适，表达加速器采用适配运行时的接入方式。可保留。此句也不应被解释为只有运行时发生修改；完整适配范围由实验章节交代。 |

## 最重要的修改方向

- 将架构小节标题、对应正文及图 3 图注中的 `runtime components` 一并改为 `system components`。
- 将 `runtime state` 改为 `operational state`，将 `runtime submission` 改为 `request submission`。它们都可以理解，但更具体的词能够直接对应正文机制。
- 在 Vortex 的具体机制段落中使用 `Vortex runtime on the DUT`，在首次概述中定义 `accelerator runtime` 的软件层含义。
- 对涉及整个 DUT 软件层的成本或修改范围，使用 `DUT software adaptation` / `DUT software`。软件运行时和驱动可以共同构成软件栈，但应保留它们的层次区别。

## 首次使用时可补的简短定义

可在首次概述 accelerator runtime 时加入：

> Here, accelerator runtimes refer to the DUT-side software layers that manage buffers, submit accelerator work, and observe completion.

这句话用于说明术语在本稿中的范围，不应据此把 kernel driver、宿主 adapter、remote agent 全部归入 runtime。实际平台有不同的软件划分；Vortex 的 guest 驱动和运行时在本地跨层清单中分别记录。

## 核对依据与边界

术语层次判断主要依据对应段落与图表的上下文。运行时与驱动的修改范围另参照 `device-integration-census/cross-layer-summary.md`、`SDP_LOC_TABLE_REVIEW_2026-10-03.md` 和 `外设接入成本.md`。

这些记录支持区分 FSA guest 运行时、Vortex guest 运行时及 Vortex guest 驱动；本轮没有重新计算代码量，也没有将较早报告中的待核实状态覆盖到较新的作者确认记录上。这里提出的是语言和范围表述建议，没有更改实验数据、软件栈标签或图片。

## 本轮实施结果

根据作者“接入成本和讨论那里不改，其他都按照你的建议修改”的要求，修改了其余 9 个建议位置：

- 引言将 `runtime state` 改为 `operational state`；首次概述使用 `adapted accelerator runtimes on the DUT`，并说明其负责缓冲区管理、工作提交和完成状态观察。
- 背景将 `runtime submission` 改为 `request submission`，将 `Before runtime I/O` 改为 `Before normal I/O`。
- 架构小节标题、正文和图 3 图注中的 `Runtime Components` / `runtime components` 统一为 `System Components` / `system components`。
- 设计章节的 Vortex 段落明确为 `An adapted Vortex runtime on the DUT`；功能验证总结使用 `drivers, accelerator runtimes, and application workloads`。

接入成本小节（含表 6 和相应说明）与讨论章节完整保留，已与修改前快照逐字节比较。表 4 的 `Vortex driver and runtime`、`FSA runtime`，相关工作的 `runtime resource allocation`、`adapted DUT runtimes`，以及结论中的 `adapted DUT runtimes` 均按原判断保留。摘要、参考文献和图片资产没有改动，总体架构图仍使用双栏排版。

修改后可见正文中的 `runtime` / `runtimes` 共 14 次，源码与 PDF 还原换行断词后的检索结果一致。`latexmk` 编译成功，全文仍为 12 页，保留 29 条参考文献；没有未定义引用、重复标签或水平溢出。已渲染并检查全部页面，更新 `main.pdf`，另存 `output/pdf/SDP_runtime_terminology_20261003.pdf`。

本轮修改前快照、差异、术语检索结果、编译记录和页面渲染保存在 `tmp/runtime_terminology_revision_20261003/`。
