# 非实验章节通读与修订记录

本轮直接修订摘要、引言、背景与动机、相关工作、系统架构、讨论和结论，重点为语言严谨性、逻辑衔接、学术表达、术语与图文一致性。实验章节只用于核对论断范围，没有修改其源码、数据或图表。以本轮开始时的工作区内容为基准，保留此前尚未提交的修改。

## 已落实的修改

| 位置 | 发现的问题 | 修改 |
| --- | --- | --- |
| 摘要 | DUT 展开为 processor under test，与正文不一致；加速器软件适配范围不够明确 | 统一为 design under test；明确 Vortex 通过适配后的 DUT runtime 运行；将未验证结论写成证据范围 |
| 引言 | 问题表述容易被既有设备借用工作直接回答；重复使用较长的“解耦”术语 | 将问题聚焦于 FPGA 处理器原型的可选设备层次与跨地址域物理执行协调；用完整句子说明两种分离及其作用 |
| 贡献 | 原生驱动、加速器适配及局部实现成本容易被混为同一结论 | 区分未经修改的 NVMe/Ethernet 驱动与适配后的加速器 runtime；贡献总结覆盖已有的设备适配分析 |
| 背景 | peripheral integration tax 带有修辞色彩，且混合新协议和新增实例的成本 | 改为协议适配成本与接口容量成本；用两条连贯要求连接动机与架构 |
| 概念定义 | hierarchy、view、contract、coherence 容易产生层次混淆 | hierarchy 指端点及其组织，view 包含驱动可见行为，contract 指需保持的协议行为；说明本稿 coherence 不表示缓存一致性协议 |
| 系统架构 | assignment manager / state store / state manager 命名不统一；共享后端与设备专用部分边界不够清楚 | 统一描述 device state manager；明确共享服务与 semantic adapter 的职责；保留 ECAM、PRP、队列、C1–C3 等支撑机制的必要细节 |
| 系统机制 | 配置写退休与路由生效关系不够直接；Vortex 中 guest / virtual / logical 混用 | 将 C1 写成“相关路由更新安装后才允许配置写退休”；以 DUT、logical queue、physical queue 描述 Vortex 状态 |
| 相关工作 | 多次重复“这不是新贡献”“区别在于……”；FPGA 服务与混合原型的分段边界不够清楚 | 缩短重复的新颖性声明，保留与 Device Lending、FVM、SCOPE 的具体机制差别；恢复不同研究类别的段落分界 |
| 讨论 | 局部 LOC 容易被读成总接入成本；远端实现示例容易被读成所有测试采用的路径 | 明确 LOC 仅覆盖 local software back-end，不代表开发时间或完整跨层工作量；区分 host-staged NVMe 示例与被测 iWARP 配置 |
| 结论 | 与实验的加速器适配事实不完全一致；对未验证事项使用 open questions 过于宽泛 | 明确适配 runtime，补充局部后端代码分析，限定到测试操作及现有证据 |

没有删除支撑论证的实现机制，也没有添加新的性能数字、协议支持范围或正确性证明。

## 图片与版式

1. **图 1**：将 SCOPE 的单一“Register routing”改为“Register / command routing”，与正文的 mapped registers / split-driver commands 对齐，并更新图注。
2. **图 2**：核对 ONF 原始文档后，SDN 一侧使用 Application plane、Controller plane、Data plane；SDP 一侧使用对应职责名称。缩小画布宽度并增大相对字号，改善单栏可读性。
3. **图 3，总体架构图**：按用户追加要求，仅将 LaTeX 插图改为 `figure*` 和 `\textwidth`。原 `.drawio`、`.svg`、`.png`、`.pdf` 均未改动。图注说明远端 staging buffer 和 payload transfer 未展开，避免将控制连线误读为完整远端数据路径。
4. **图 4**：将配置安装阶段的 state store 统一为 device state manager，配置选择阶段保留 configuration tools。原四阶段结构和配色保留。
5. **图 5**：原图将逻辑完成放在统一的软件返回路径上，容易与正文的直接 DMA-visible CQE 产生矛盾。改为三个“前提可见性 → 提交事件 → 可继续的行为”，明确 C3 同时约束软件发布和直接 DMA 发布，避免暗示所有完成记录都经过软件转发。相对字号也有所提高。
6. **图 6**：检查了元数据路径、DMA aperture 和载荷路径的含义与可读性，保留原图。

修改的图均同步保留可编辑 draw.io、SVG、PNG 和矢量 PDF；构建脚本及图索引同步更新。

## 核对依据与范围

- 实现描述以现有正文、实验章节，以及仓库中此前保存的实现审查材料为依据。本轮未进行新硬件实验或完整协议验证。
- [ONF SDN Architecture 1.0](https://opennetworking.org/wp-content/uploads/2013/02/TR_SDN_ARCH_1.0_06062014.pdf)：核对 application / controller / data plane 的命名与职责划分，沿用已有 `onf2014architecture` 引用。
- [Device Lending 原论文](https://web-backend.simula.no/sites/default/files/publications/files/markussen.pdf)与 [FVM 官方论文页面](https://www.usenix.org/conference/osdi20/presentation/kwon)：用于限定与既有设备虚拟化工作的比较，未将透明访问或虚拟呈现加物理执行本身当作本稿独有贡献。
- 本轮不是完整的逐篇参考文献审计，未修改 `references.bib`。

## 验证结果

- `latexmk -pdf -interaction=nonstopmode -halt-on-error` 成功，最终 PDF 为 **12 页**，原稿为 11 页。增加主要来自总体架构图改为双栏，以及图 2、图 5 的可读性调整；本轮没有压缩会议模板来抵消篇幅增长。
- 无未定义引用、重复标签、缺失引用键或 Overfull hbox。
- 修改的四张图重新通过字体边界、文字碰撞和连线碰撞检查；保留的图沿用已有矢量资产，并作本轮视觉核对。
- 已检查最终全部 12 页的渲染总览，并放大检查架构、机制图和末页。未发现图文遮挡、裁切或图片模糊。
- 仍有 20 项 Underfull 排版警告、末页平衡产生的约 1.11 pt Overfull vbox，以及原有 `printacmref=false` 引发的 acmart 提示。这些没有产生可见裁切；没有通过改变官方版心或关闭检查来隐藏它们。
- SHA-256 比较确认：实验章节、参考文献、总体架构图四种资产和图 6 四种资产均与本轮开始时一致。

## 仍需后续证据或定稿决策的事项

- C1–C3 给出的是带有内存路径前提的提交条件。功能负载通过不能升级为所有并发执行和内存时序下的正确性证明，相关限定已保留。
- 新协议集成仍涉及远端实现、DUT runtime 和共享基础设施，现有局部 LOC 统计不覆盖总工作量。
- 远端 staging 模式与具体被测部署的对应关系，仍应由实现版本和运行配置确认；本轮没有据此增写未经核实的实验事实。
- 页数、ACM 元数据、参考格式和审稿版版权栏应在提交定稿时按正式要求统一处理；本轮未声称已经满足投稿政策。

工作稿为 `main.pdf`，归档为 `output/pdf/SDP_nonexperimental_review_20261003.pdf`。本轮备份、相对本轮初始状态的源码 patch、编译日志、验证 JSON 和页面渲染位于 `tmp/nonexperimental_review_20261003/`。
