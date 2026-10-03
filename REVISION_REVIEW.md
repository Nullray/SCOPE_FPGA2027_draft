# FPGA 论文审查与执行记录

## 综合判断

当前稿件的核心研究问题清楚：在不修改 DUT 原生驱动、也不在 FPGA 中复制完整设备控制器的条件下，能否由软件决定 DUT 可见的外设组合及后端绑定。论文已有可投稿的架构主线，但实验完整度仍对应 **Major Revision**。主要风险来自基线和重复性信息不足，而不是系统机制描述不足。

## 已执行的修改

| 优先级 | 审查意见 | 执行结果 |
| --- | --- | --- |
| P1 | 独立 Implementation 章节与 Design 重复，使文章像工程报告 | 删除该章节；将平台和原型边界集中到 Evaluation |
| P1 | 三平面图缺少论文解释，SDN 类比容易被理解为表面命名 | 在 Overview 定义 DUT Software、Control、Data 三个功能平面，说明类比成立处及状态一致性带来的差异 |
| P1 | “虚拟化”和“直通”容易被写成互斥模式或无代价的组合 | 将二者定义为同一端点上的互补职责；明确真实设备执行不等于透明寄存器转发，也不保证直接连接的时序 |
| P1 | Evaluation 以 evidence ledger 和项目计划组织，缺少研究问题 | 改为配置能力、原生驱动兼容性、控制代价、数据路径四个问题；把 placeholder 集中到末尾并声明不参与结论 |
| P1 | 摘要信息过密，混合多个不可直接比较的计时边界 | 摘要保留代理 BAR RTT；撤下尚未核对来源的 NVMe 性能比例，明确数据路径和扩展性证据待补 |
| P1 | 一致性规则是核心正确性贡献，但缺少视觉表达 | 新增 configuration--route、submission--DMA、data--completion 三联图 |
| P2 | Related Work 对全系统仿真位置交代不足 | 加入并核验 FireSim 与 SimBricks，对模型可控性、真实设备执行和时序保真度作区分 |
| P2 | 现有 PPT 架构图会暗示完整 PCIe 链路和远端 RDMA 已验证 | 重绘系统架构，使用 Logical PCIe Interface，并只把已确认的通用控制和 DMA 边界画入主路径 |
| P2 | 图中控制路径和数据路径容易混淆 | 所有新图统一使用橙色表示控制/元数据、蓝色表示 payload/DMA，并在图中给出图例 |

## 仍需实验数据关闭的问题

1. **测量口径冲突。** PPT 第 12–14 页与正文的 NVMe 延迟、带宽和 IOPS 相差较大。需要以原始日志确认 requester、设备位置、计时起止点、DUT 频率、工具参数和单位。本轮没有把不同口径的数据拼接成额外开销。
2. **缺少统计信息。** 当前控制和数据结果没有统一记录重复次数、离散度和尾延迟。最终图至少应报告运行次数以及标准差、置信区间或分位数之一。
3. **NIC 缺少公平基线。** 已有数字只能证明双向数据路径工作，不能支持相对性能或线速结论。
4. **组合性仍未被实验验证。** NVMe 与 NIC 的独立运行不能推出二者并发时的正确性或性能隔离。
5. **FPGA 可扩展性仍是结构性假设。** 13 个预置槽是容量参数。需要 1/2/4/8/13 槽使用相同约束的综合结果，报告绝对资源、增量斜率和 Fmax。
6. **时序保真度需单独措辞。** 原生驱动成功证明的是被测操作的协议兼容性；门铃延迟、队列竞态、reset 并发和 PCIe link 行为需要各自证据。

## 已生成图

| 图 | 可复现矢量源文件 | 论文文件 | 状态 |
| --- | --- | --- | --- |
| 三平面与 virtualization/passthrough 分工 | `figures/three_planes.tex` | `figures/three_planes.pdf` | 已插入 Overview |
| 系统架构与控制/DMA 路径 | `figures/system_architecture.tex` | `figures/system_architecture.pdf` | 已插入 Overview |
| 三个一致性协议 | `figures/coherence_protocols.tex` | `figures/coherence_protocols.pdf` | 已插入 Design |

三张正式插图均由独立 TikZ 源文件编译为矢量 PDF，字体、颜色、线宽和箭头语义一致，并已在双栏论文页面中完成可读性检查。三个 `.drawio` 文件继续保留为早期草稿，但不再作为正式 PDF 的生成源。

## 下一轮建议

### 本轮整体审查与调整（2026-09-22）

本轮使用 academic-research-suite 的审查与修订指导，先检查主张和证据，再修改正文。这是单一助手的文稿审查，不是外部独立评审，也未复现实验或审计 RTL。

**Related Work 采用前置：Introduction → Background → Related Work → Overview → Design → Evaluation → Discussion → Conclusion。** 原因不是会议强制格式，而是本文的贡献依赖抽象对象及软硬件分工：读者需要先理解 FENIKS/Coyote 的加速器资源抽象、FVM 的设备虚拟化和模拟系统，再判断 SCOPE 的 DUT 外设契约有何不同。放在 Background 后既有术语基础，也避免到读完设计才发现已有相近机制。引言路线图和主文件已同步。

| 维度 | 具体问题 | 修改与剩余证据 |
| --- | --- | --- |
| 创新定位 | 虚拟呈现加物理执行并非独有贡献 | Related Work 增加 FVM、Coyote、Nyx 比较；区别落在 DUT 接口和语义分工，不宣称发明虚拟设备或 P2P |
| 测量内在一致性 | QD1 下 240372.3 IOPS 约为 4.16 微秒/I/O，不能未经解释与 61.41 微秒逐次提交视为同一路径 | Evaluation 明示口径冲突，数值保留为 provisional；摘要与结论不以其证明近原生性能 |
| 基线公平性 | ARM A53/RocketChip 与 XiangShan 不是同 requester 的消融 | 标明 contextual microbenchmarks，不用两组数相除声称代理额外开销 |
| 正确性证据 | 100 次中断触发/清除不证明数据先于 completion 可见 | 撤回该推论，增加 polling、reset、mask、并发情况下的顺序测试占位 |
| 机制严谨性 | MMIO 已接收不等于描述符稳定；序号匹配不等于跨域可见 | Design 写清 publication、translated descriptor visibility、shadow/route visibility 的证明义务；不声称实验已验证 |
| 概念与范围 | 三平面、双解耦、三条契约再叠加未来 2×3×2 空间，分散主线 | 保留有用机制解释；删除未实现组合表，改为当前范围段落，也消除该表的横向溢出 |
| 结论尺度 | “已建立性能边界”强于未核对的数据证据 | Conclusion 区分功能运行、控制延迟记录与待补数据路径结果 |

投稿成熟度仍为 **Major Revision**：这是对实验完整度的判断，而非要求继续润色到看起来证据充分。优先补原始测量来源和重复性信息，其次补顺序验证、NVMe+NIC 并发和同条件综合。本文档中“已执行”表示文字/结构修改完成，不表示对应硬件实验完成。

实验数据补齐后，优先生成三类定量图：控制路径按计时边界分面、NVMe/NIC 的 matched baseline、FPGA capacity synthesis。不要把 Direct Control、Proxy Forwarding 和 semantic submission 放在一个没有分面的柱状图中，因为它们不是同一个 timed operation。
