# SCOPE 论文配图规划与生成提示词

## 图3标题对齐更新（2026-09-27，优先于下方记录）

先对现有图3做 AI 局部修改，再复现为
`drawio/fig03_system_architecture_aligned_v3.drawio`。两个阶段标题框均放在
外框内部，左缩进统一为31 px、顶边距统一为18 px、高度统一为48 px。
正文使用其导出 PNG；内部模块和连线、双栏尺寸、右侧原生驱动枚举保持不变。
旧图保留；实验章节和数据未调整。

## 2026-09-27 修订（优先于下方历史规划）

当前正文共七张图：图2负责说明 MMIO 可达性不足的反例；图5改为每端点
提交点，先生成 `coherence_commit_points_ai_v3.png`，再原生复现为
`drawio/fig05_commit_points_v3.drawio`，正文采用其导出 PNG。旧图6的配置
示意改为 `tab:configuration-freedom`，原图7、图8自动顺延为图6、图7。
图3主架构和图4的 SDN 三平面图保持不变。实验结果与资源曲线继续等待真实数据。

每次改图都先生成 AI 版并检查，再以 draw.io 复现相同文字、结构、位置、
配色和箭头；保留原图精确参考页。原生可编辑版不声称逐像素恢复 AI 的
字形渲染与纹理。最新文件索引见 `figures/paper/README.md`。

更新日期：2026-09-25。Fig. 1--8 已由 AI 生成并插入论文；第二节新添 Fig. 2，第三节使用 Table 1 对照相关工作。现用图片文件为 `figures/paper/*_ai.png`；旧版 PDF、SVG、TikZ 和本文件下方的早期矢量绘图提示词仅供比较，下面的旧编号不代表当前稿件编号。现用 AI 提示词与语义核对点见 `figures/paper/ai_figure_prompts.md`、`figures/paper/driver_contract_ai.prompt.md` 和 `figures/paper/system_architecture_ai.prompt.md`。Fig. 9--10 等待实验数据，不能生成示意数据点。图内使用抽象设备类别，不出现厂商、型号或设备 ID。

## 总体视觉规范

所有图片应采用计算机体系结构论文常见的二维矢量风格，而不是产品宣传图或工程原理图：白色背景、无渐变、无阴影、无拟物图标、无透视和 3D 效果。使用 0.8--1.1 pt 线宽、8--9 pt 最终字号、少量圆角；颜色只承担语义编码，并且打印为灰度后仍能依靠线型、标记和分组区分。

统一颜色语义：深蓝表示 DUT 或 driver-visible state，橙色表示 control/metadata，绿色表示 physical device execution，灰色表示静态边界或未改变的基础设施。控制箭头用橙色实线，DMA/payload 用蓝色粗实线，completion/interrupt 用绿色实线；假设、可选路径和未来工作使用虚线。图中名称必须统一为 `FPGA Front-End`、`Host Software Back-End`、`Endpoint Context`、`Physical Device`、`Device-Semantic Adapter` 和 `Logical Endpoint`。其中 back-end 只指主机软件，不能指代物理设备。

输出优先级为 PDF/SVG 矢量图；如只能输出位图，使用 300 dpi、双栏宽 7.0 in 或单栏宽 3.35 in。不要在图内放完整句子，图内标签尽量不超过 5 个英文单词。caption 解释结论和边界，不重复图内所有标签。

## 推荐图序与插入位置

| 建议编号 | 图 | 状态 | 插入位置 | 回答的研究问题 |
| --- | --- | --- | --- | --- |
| Fig. 1 | 外设接入设计空间 | 已生成并插入 | Introduction 中 `The design balances two objectives...` 段之后、`SCOPE obtains this ability through dual decoupling` 之前 | 为什么直接连接、纯模型和 SCOPE 的取舍不同？ |
| Fig. 2 | 原生驱动 I/O 依赖链 | 已生成并插入 | Background and Motivation / `Real Devices and the Native-Driver Contract` | 为什么仅转发寄存器访问不足以使设备可用？ |
| Table 1 | 相关工作抽象边界 | 已插入 | Related Work / `The Processor-DUT Boundary` | 相邻研究改变了哪一层接口，面向哪个使用者？ |
| Fig. 3 | SCOPE 系统架构 | 已重绘并插入 | System Overview，首次定义四个架构角色之后 | 系统由谁呈现设备、谁中介控制、谁执行操作？ |
| Fig. 4 | 三平面与 SDN 类比 | 已重绘并插入 | `Three Planes and the SDN Analogy` 中，三平面定义之后 | 软件、控制和数据职责如何分离，SDN 类比的边界是什么？ |
| Fig. 5 | 三个一致性约束 | 已重绘并插入 | Design 开头，第一次引用三项 coherence invariants 之后 | 分离后的状态如何重新组成一个 driver-visible device？ |
| Fig. 6 | 同一 bitstream 下的拓扑重配置 | 已生成并插入 | Design / `Logical Topology Construction`，介绍 topology specification 的自然段之后 | “software-defined composition”具体改变了什么，什么保持不变？ |
| Fig. 7 | 描述符翻译与独立 DMA 路径 | 已生成并插入 | Design / `Endpoint Semantic Mediation` 末尾与 `DMA Data-Path Realization` 之间 | 控制为什么必须中介，而 payload 为什么不必经过软件？ |
| Fig. 8 | 控制路径计时边界 | 已生成边界图并插入；数值留在表中待核对 | Evaluation / `Control-Path Cost`，紧随 Table `tab:control` 的论述 | 各延迟测量到底计时了哪一段，为什么不能直接相减？ |
| Fig. 9 | 匹配的数据路径结果 | **待实验，优先级 P1** | Evaluation / NVMe 与 NIC Data Path 两小节，可做双面板图 | 相同 DUT、设备和负载下，介入路径相对 direct baseline 的性能是多少？ |
| Fig. 10 | FPGA 容量扩展曲线 | **待综合，优先级 P1** | Evaluation / `Limits` 之前，替代 `tab:resource-plan` | endpoint capacity 增长时 LUT/FF/BRAM/Fmax 如何变化？ |

当前 13 页编译稿已纳入 Fig. 1--8 和 Table 1。Fig. 9 和 Fig. 10 在数据完成后应优先替换 provisional 表格或合并为 Evaluation 的多面板结果图，而不是简单叠加页面。若必须压缩，可将三平面图并入系统架构图，但应保留动机图和一致性图各自承担的论证。

## Fig. 1：外设接入设计空间

建议版式：单栏或 1.5 栏宽的定性二维坐标图。横轴为 `Programmability of device presentation`，从 `fixed` 到 `software-defined`；纵轴为 `Physical execution retained`，从 `modeled` 到 `physical`. 三个标记分别为 `Direct attachment`（左上实心三角）、`Device model`（右下实心方形）和 `SCOPE`（右上空心圆）。用很浅的橙色弧线或箭头连接两个目标维度，在 SCOPE 旁标注 `virtualized presentation` 与 `physical execution`。必须在图注中声明坐标是 qualitative positioning，不是测量值，也不宣称 SCOPE 在所有 fidelity 维度上优于模型。

生成提示词：

> Create a publication-quality vector figure for a computer architecture paper, not an engineering block diagram. Draw one clean qualitative two-dimensional design-space plot on a white background. The x-axis is “Programmability of device presentation”, ranging from “fixed” to “software-defined”. The y-axis is “Physical execution retained”, ranging from “modeled” to “physical”. Place exactly three labeled markers: a filled black triangle “Direct attachment” near the upper-left, a filled dark-gray square “Device model” near the lower-right, and a larger hollow blue circle “SCOPE” near the upper-right. Add two short annotations beside SCOPE: “virtualized presentation” and “physical execution”. Use serif-compatible typography, thin black axes, no grid, no icons, no 3D, no shadows, no gradients, and ample whitespace. The plot is qualitative: do not add numerical ticks, scores, or a Pareto frontier. Ensure all labels remain legible at 3.35-inch column width. Export as editable SVG/PDF.

建议正文引导句：`Figure~\ref{fig:design-space} positions this tradeoff qualitatively: SCOPE makes presentation programmable while retaining physical execution, but mediation prevents it from inheriting direct-attachment timing automatically.`

## Fig. 2：SCOPE 系统架构（已有图复核提示词）

当前源文件：`figures/paper/system_architecture.tex`。图强调四个责任域和三条路径。DUT、FPGA Front-End、Host Software Back-End、Physical Device 从左到右排列；DUT memory 放在 DUT 内部；control event/response、DMA payload/writeback、interrupt 分别用不同颜色或线型。物理设备不能标为 backend，host software back-end 不能画成设备。

生成/重绘提示词：

> Draw a restrained full-width vector architecture figure for an ACM computer architecture paper. Use four lightly bounded vertical responsibility regions from left to right: “DUT”, “FPGA Front-End”, “Host Software Back-End”, and “Physical Device”. In the DUT show only “Native Driver” and “DUT Memory”. In the FPGA region show one compact abstraction labeled “Generic Interface Mechanisms” with a small subtitle “ECAM, routing, mailbox, DMA window, INTx”. In the software region show “Topology Manager”, “Endpoint Contexts”, and “Device-Semantic Adapters”, making clear that they are software. In the device region show one “Assigned NVMe SSD or NIC”. Draw only three semantically distinct paths: orange control/metadata arrows through the FPGA and host software back-end; a thick blue payload/writeback path directly between DUT memory and the physical device through the DMA window; and a green completion/interrupt return path. Include a tiny legend. Use flat vector geometry, no hardware icons, no PCB styling, no gradients or shadows, and no more than seven boxes. The visual message is responsibility partitioning, not implementation detail. Export as editable PDF/SVG at two-column width.

## Fig. 3：三平面与 SDN 类比（已有图复核提示词）

当前源文件：`figures/paper/three_planes.tex`。该图是职责类比，不是部署拓扑。控制平面横跨 FPGA front-end 和 host software back-end；software plane 特指 DUT OS/native driver；data plane 包括 physical device 与 payload path。不要把 passthrough 画成与 virtualization 互斥的模式。

生成/重绘提示词：

> Create a conceptual three-plane figure in the visual language of a systems architecture paper. Use three horizontal bands with generous whitespace: “DUT Software Plane” at the top, “Control Plane” in the middle, and “Data Plane” at the bottom. The top band contains one label, “Native OS and Driver”, consuming a “Logical Device Contract”. The middle band contains exactly two coordinated roles, “FPGA Front-End: expose and route” and “Host Software Back-End: virtualize and mediate”, connected by a bidirectional control-event arrow. The bottom band contains “DUT Memory”, “DMA Path”, and “Physical Device”. Show an orange vertical relation labeled “configurable presentation” from the control plane to the logical contract, and a blue horizontal payload path from DUT memory to the physical device. Add a small side annotation: “Selective passthrough retains compatible physical execution after adaptation.” Do not imitate an SDN switch diagram literally; no network icons, no clouds, no 3D, and no decorative blocks. Keep labels short and readable at full-page two-column width. Export as vector PDF/SVG.

## Fig. 4：三个一致性约束（已有图复核提示词）

当前源文件：`figures/paper/coherence_contracts.tex`。保持三个并列 partial-order panels，不增加更多内部模块。每个面板只保留先决状态、publication point 和 driver-visible event。颜色必须和 Fig. 2 一致。

生成/重绘提示词：

> Create a full-width three-panel partial-order figure for a computer architecture paper. Panel A is “Configuration–Route”: configuration write, authoritative image and BAR route update, matching acknowledgement, then dependent DUT access. Panel B is “Submission–DMA”: driver publishes queue entry, device-semantic adapter observes and translates every DMA address, translated descriptor becomes device-visible, then physical doorbell. Panel C is “Data–Completion”: physical device writes payload, payload becomes visible in DUT memory, device-semantic adapter publishes completion, then virtual interrupt may assert. Use vertical event sequences with thin arrows and an explicit small “happens-before” label at the critical edge. Blue events are DUT-visible state, orange events are software-mediated state, green events are physical execution or final notification. Exactly five events per panel, no sequence-diagram lifelines, no clocks, no decorative icons. Export as vector PDF/SVG.

## Fig. 5：同一 bitstream 下的拓扑重配置

建议版式：左右两个 small multiples，分别为存储配置和网络配置。两个面板共享一条灰色底带 `Same FPGA Bitstream / Fixed Capacity`。每个面板只显示 logical endpoint、endpoint context 和 assigned physical device 三层映射；endpoint context 必须位于 Host Software Back-End 边界内。两种配置是分别验证的，不暗示并发实验已完成。

生成提示词：

> Draw a two-panel academic vector figure explaining software-defined topology construction. Both panels sit above one shared gray foundation labeled “Same FPGA Bitstream — fixed ECAM slots and route capacity”. Panel (a), “Storage configuration”, shows a logical storage endpoint mapped to an endpoint context inside the Host Software Back-End and then to an assigned physical storage device. Panel (b), “Network configuration”, shows the same slot and routing mechanism populated with a logical network endpoint, its endpoint context inside the Host Software Back-End, and an assigned physical network device. Highlight changed configuration objects in orange and unchanged FPGA capacity in gray. Add a small note “selected before DUT enumeration”. Do not show vendor names, model numbers, device IDs, hotplug, arbitrary topology growth, or simultaneous storage and network execution. No icons, gradients, shadows, or implementation registers. Export as two-column vector PDF/SVG.

建议正文引导句：`Figure~\ref{fig:topology-config} illustrates the supported degree of freedom: software changes the populated logical endpoint and its assignment, while the FPGA slot and route capacity remain fixed.`

## Fig. 6：描述符翻译与独立 DMA 路径

该图应补足现有架构图没有表达清楚的“地址翻译”和“字节移动”分离。不要画 NVMe 控制器全部寄存器，只画一次 submission 的抽象变换：`d(a_DUT)` 经 adapter 变为 `d(a_dev)`，随后物理设备通过 DMA window 访问同一 payload。

生成提示词：

> Draw a minimal academic dataflow figure that explains separation of address retargeting from byte movement. Use two horizontal lanes. The upper orange lane is “Control / metadata”: “Driver publishes d(a_DUT)” → “Device-Semantic Adapter” → a transformation symbol “τ: a_DUT ↦ a_dev” → “Physical doorbell”. The lower blue lane is “Payload / DMA”: “DUT Memory” ↔ “DMA Window / coherent alias” ↔ “Physical Device”. Connect the transformed descriptor to the physical device with one thin dependency arrow, but keep the blue payload path separate from the software adapter. Add one small invariant under the lanes: “publish d(a_dev) before doorbell; publish completion after payload visibility”. Use mathematical notation and whitespace instead of many modules. No protocol packet fields, icons, 3D, gradients, or decorative arrows. Two-column vector PDF/SVG, readable at 7-inch width.

建议正文引导句：`Figure~\ref{fig:semantic-dma} separates the metadata transformation from the payload path: the adapter rewrites reachability, whereas the physical device moves the bytes.`

## Fig. 7：控制路径计时边界

这张图的重点是区分三种计时边界。三个横向分面分别展示 Proxy BAR RTT、storage semantic submission 和 Direct Control。当前图不显示未经原始日志核对的数值；具体设备和 requester 型号保留在正文实验表格中。

生成提示词：

> Create a three-panel measurement-boundary figure for a systems paper, using path diagrams rather than a common bar chart. Panel (a), “Proxy BAR RTT”, highlights DUT BAR write → FPGA event channel → host software back-end → DUT acknowledgement. Panel (b), “Storage semantic submission”, highlights BAR event → queue inspection by the device-semantic adapter → DMA-address translation → physical doorbell. Panel (c), “Direct Control reference”, highlights requester MMIO → target. Put a note in the caption: “Different requesters and timing boundaries; values are not additive and do not form an overhead decomposition.” Use interval brackets, thin paths, and short labels; no shared y-axis, model numbers, device IDs, or visual implication of a matched ablation. Keep numerical values in the evaluation table until their raw-log provenance is verified. Export as full-width vector PDF/SVG.

生成门槛：必须先确认 requester、起止事件、时钟、重复次数和离散度。若 30.15/61.41 µs 与 29.92 µs 来自不同程序或设备状态，caption 必须说明。

## Fig. 8：匹配的数据路径结果（待实验）

建议版式：双面板。左侧 NVMe 展示 block size/QD sweep；右侧 NIC 展示 direction/message size sweep。比较路径必须使用同一 DUT、同一物理设备、同一 workload 参数。吞吐、IOPS 和 latency 不共用纵轴；必要时拆成 small multiples。每个点显示 95% CI 或明确的误差统计。

生成提示词：

> Create a publication-quality multi-panel performance figure from verified experimental data only. Panel group A reports NVMe throughput and tail latency over block size and queue depth for matched “direct/on-board”, “P2P”, and “software-mediated” paths using the same DUT and physical SSD. Panel group B reports NIC throughput and RTT distributions for matched direct and software-mediated paths using the same physical NIC, protocol, direction, message size, and stream count. Use colorblind-safe blue/orange/gray plus distinct markers and line styles. Show 95% confidence intervals and state the number of independent runs in the caption. Never combine throughput, IOPS, and latency on one y-axis; use small multiples. Do not plot pending configurations or interpolate missing values. Export as vector PDF at two-column width.

## Fig. 9：FPGA 容量与资源增长（待综合）

该图只能由 1/2/4/8/13-slot 使用相同约束和工具版本的综合结果生成。建议双面板：左图为 LUT/FF/BRAM 或 URAM 的绝对值及相对 1-slot 增量，右图为 Fmax。不能用示意直线代替综合数据，也不能拿未实现的“每设备完整控制器”作虚构基线。

生成提示词：

> Create a two-panel FPGA synthesis-scaling figure using only measured 1, 2, 4, 8, and 13 endpoint-slot builds under identical tool versions, target device, clocks, and constraints. Panel (a) plots absolute LUT, FF, and BRAM/URAM usage with distinct markers and a secondary annotation giving the incremental slope relative to the 1-slot build; use small multiples if resource magnitudes differ substantially. Panel (b) plots achieved Fmax versus endpoint slots with the target clock shown as a thin reference line. Include exact points, no fitted linear trend unless goodness-of-fit and residuals are reported, no extrapolation beyond 13 slots, and no fabricated controller-replication baseline. Use colorblind-safe colors and readable 8–9 pt typography. Export as vector PDF/SVG.

## 图片完成顺序

1. 已完成：Fig. 1--7，源文件和 PDF 位于 `figures/paper/`；Fig. 7 只绘制计时边界，不在图内写未经核对的数值。Fig. 4 是一致性图，Fig. 5 是拓扑配置图。
2. 完成 matched baseline 和重复实验后制作：Fig. 8。
3. 完成同约束综合 sweep 后制作：Fig. 9。
4. 投稿排版前检查 Fig. 1--7 的字号、灰度打印效果和浮动位置。
