# 按近期反馈开展的非实验章节表述修订

本轮范围为背景与动机、相关工作、系统架构及其机制、讨论和结论，共六个 TeX 文件。实验章节用于核对结论范围，未作修改。修订以本轮开始时的文件为基准，保留此前的修改。

## 近期细节反馈反映的表达偏好

你最近的反馈集中在读者能否明确理解一句话的含义，以及相邻句子能否形成自然的解释顺序。具体有以下特点。

| 特点 | 近期反馈中的例子 | 本轮采用的判断标准 |
| --- | --- | --- |
| 主语和指代明确 | independently implemented device behavior 难以理解；远程段落用 These responsibilities 开头不自然 | 直接写 DUT、驱动、FPGA 前端、主机后端或物理设备做什么；跨段指代必须有清楚的对象。 |
| 先说明能力，再解释实现 | 远程访问应先平铺直叙地说明“支持远程主机外设” | 先说明系统支持什么、产生什么作用，再解释组件分工、地址域转换和数据路径。 |
| 术语的含义和使用范围稳定 | runtime 的多种用法；host-local / host-remote；device view / hierarchy | 同一概念使用固定名称；确有不同含义的词分别定义，不以换词避免重复。 |
| 学术表述要落实到可理解的关系 | dependent operations / memory-visibility assumptions 过于概括 | 条件说明对应哪些状态或数据、对哪个组件可见，以及哪个动作必须等待。 |
| 功能和证据优先于实现清单 | 贡献点不应过度强调加速器 runtime 适配 | 功能总结突出系统支持和验证结果；软件接口细节仅在解释必要机制或适用范围时出现。 |
| 抽象层次应适合所在段落 | 图 1 不需要突出 PCIe；图注无需过长 | 概念讨论采用通用外设表述，具体实现段落保留 PCIe、ECAM、BAR、PRP 等必要术语；图注只承担图的识别与解释。 |
| 限定要准确，也要有位置 | 反复强调适配、限制或已有能力会打断阅读 | 保留影响结论的限定，在讨论中集中解释；不在每个功能段落重复同一组免责式表述。 |

这些标准不意味着删除所有 These / This，也不意味着回避技术术语。紧邻且明确的指代、已定义的术语、支撑机制成立的细节仍然保留。

## 修订记录

| 位置 | 发现的问题 | 已实施的修改 | 状态 |
| --- | --- | --- | --- |
| 背景与动机，Device Presentation and Physical Execution | 把“职责、契约、呈现”当作行为主体；“真实设备行为”的表达仍过于间接；成本与驱动要求之间的衔接含糊 | 用设备呈现与物理执行建立讨论顺序，直接说明物理外设如何参与集成测试；分别说明新协议适配与新增实例容量；明确驱动兼容是端点要求。 | RESOLVED |
| 背景与动机，Reachability and the Native-Driver Contract | “更强的契约”“有序交接”没有及时对应到动作 | 定义驱动要求，按枚举、资源配置、驱动绑定、队列初始化、请求与完成解释；写清请求元数据和输入数据先于物理提交、返回数据先于完成可见。 | RESOLVED |
| 背景与动机，SDN 对应关系和 Requirements | 同一职责对应关系重复出现；先列抽象约束，后补系统动作 | 先说明配置、控制中介、物理执行的分工，再说明前后端必须共同满足的设备协议要求；保留 SDN 类比与设备协议之间的区别。 | RESOLVED |
| 相关工作，三个小节 | consumer、partition、boundary、contract 等概括词密集；比较结论和本稿定位重复 | 用应用对象、接口与执行位置进行具体比较；保留 Device Lending、FVM、SCOPE 的机制差别；将 The Processor-DUT Boundary 改为 Peripheral Access for Processor DUTs。 | RESOLVED |
| 系统架构，章首和 Device View and Physical Bindings | 先引用配置流程图 4，后介绍总体图 3；视图、绑定、端点状态及容量混在一起 | 将总体图说明移至章首；按设备视图 → 物理绑定 → 端点状态与能力边界 → PCIe 实现 → 配置生命周期介绍。 | RESOLVED |
| 系统架构，System Components and Data Paths | logical authority、interchangeable copies 等表述间接；共享软件接口列举过细；远程段落夹带多个否定解释 | 明确本地后端维护 DUT 可见状态、远端后端协调物理执行；缩短软件生命周期接口清单；先说明支持远程外设，再解释两端与 RDMA 的分工。 | RESOLVED |
| 系统机制，State Ownership and Commit Points 及三个子小节 | 提交点只解释“依赖操作”，没有及时说明具体前提；可达性、可见性、完成响应混在抽象关系中 | 逐项定义 C1–C3 的动作及其前提；保留路由失效与生效顺序、readback fence、嵌套 PRP 翻译、CQE phase 检查等必要机制；明确 BAR 响应、物理提交与命令完成的区别。 | RESOLVED |
| 系统机制，Data--Completion Coherence | 直接 DMA 完成记录与软件检查的关系不够直观 | 明确 DUT 驱动可以独立于后端检查观察 CQE；后端检查负责请求跟踪和通知，不能替代数据先于完成可见的内存路径条件。 | RESOLVED |
| 讨论，三个小节 | 验证结果、成立前提与未来测量夹杂；LOC 描述间接；远程例子容易被理解成所有测量的路径 | 按已测结果 → 测量含义 → 尚不能推断的结论组织；明确 LOC 是局部代码统计，不代表总集成工作量；明确 host-staged NVMe 是示例。 | RESOLVED |
| 结论，两段 | 重复“realization、distributed state、adapted runtimes”等概括词；将测量项目写成很长的实现清单 | 简洁总结软件选择、前后端协调和远程支持；分别陈述未修改 NVMe/Ethernet 驱动与加速器正确性结果，再概括性能、资源、代码和故障响应证据。 | RESOLVED |

## 代表性改写

### 用可理解的动作替代抽象职责

原文：

> The remote state manager maintains execution state; logical authority remains local.

改为：

> The local back-end remains responsible for DUT-visible state, while the remote state manager tracks physical execution at the assigned host.

### 提交条件直接说明谁等待什么

原文：

> Each denotes the point at which a dependent operation may observe or consume the preceding state.

改为对三个点分别说明，例如：

> Configuration retirement (C1) allows the DUT to complete a configuration write after the updated configuration and routes are installed in the FPGA.

> Physical submission (C2) releases work after its metadata and required input data are visible to the device.

> Logical completion publication (C3) makes completion visible to the DUT driver after the corresponding data is visible in DUT memory.

### 将数据路径之间的关系落实到参与者

原文：

> The two paths are coupled by the translated buffer references released at C2.

改为：

> The adapter translates buffer references before C2, and the physical device then uses those references for payload DMA.

### 解释完成检查的实际作用

原文：

> The controller writes CQEs directly to DUT memory through the aperture, so back-end validation controls bookkeeping and notification.

改为：

> The controller writes CQEs directly to DUT memory through the aperture, so the host adapter checks completions for request tracking and notification. The DUT driver can observe CQEs independently of that check.

### 用测量对象界定 LOC 的含义

原文：

> The local back-end LOC counts ... locate this specialization ...

改为：

> The LOC counts ... describe the distribution of code within the local software back-end.

随后说明这些统计不测量开发时间或跨层总集成工作量。

## 保留的技术与证据边界

- device hierarchy 表示逻辑端点及组织关系；device view 包含层次与驱动可见行为；configuration image/state 专指配置镜像或状态。
- local host / remote host 用作主机名称，local-host / remote-host 用作定语；没有恢复 host-local / host-remote。
- 未修改原生 Linux 驱动的结论限定于已测试的 NVMe 与 Ethernet。加速器相关的必要软件适配事实仍在相关工作和具体 Vortex 接口说明中保留，不在每个结果总结里重复。
- FOS / ViTAL 的 runtime resource allocation 表示执行期间的资源分配，含义明确，保留该表达；历史图片文件名中的 runtime 不是正文术语。
- C1–C3 仍以前提成立为条件，包括协议合规驱动、有效 DMA 映射、兼容物理设备和所需内存顺序；没有改写为所有并发执行的正确性证明。
- 保留软件发布完成与直接 DMA 发布完成两种情况，以及队列条目稳定、请求标识匹配、缓存一致访问各自不能代替所需可见性顺序的限定。
- 队列深度一、完整 FPGA 配置比较、局部后端 LOC、单一 iWARP 配置、逐端点功能测试等证据范围仍明确说明。

## 文件与验证

修改文件：sections/02-background-motivation.tex、sections/07-related-work.tex、sections/03-overview.tex、sections/04-design.tex、sections/08-discussion.tex、sections/09-conclusion.tex。

修订前快照、逐项源码差异、文本统计、编译日志、页面渲染和核对结果保存在 tmp/nonexperimental_style_revision_20261003/。最终检查结果见其中的 verification.json。

本轮逐章核对引用与标签，未增加或删除引用键。摘要、引言、实验章节、参考文献文件，以及图片资产、图注和插图宽度均保持原样。总体架构图仍为双栏。

最终验证已完成：

- latexmk 编译成功，全文 12 页，参考文献 29 条，无未定义引用、重复标签或行宽溢出。
- 全部 12 页已渲染并检查；改写段落、C1–C3 说明和最后修正的换行另作页面级核对。
- 编译输入与当前源码哈希一致；六个修改文件以外的已记录源码和图片资产均与修订前一致。
- 已更新 main.pdf，并归档为 output/pdf/SDP_nonexperimental_style_20261003.pdf；两份 PDF 与已检查的构建产物哈希一致。

模板原有的一处 1.12575 pt 纵向排版提示仍存在，页面检查未见内容重叠或裁切，本轮未改动模板参数。
