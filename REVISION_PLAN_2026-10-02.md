# SDAP 正文与图形修订计划（2026-10-02）

范围：处理用户提出的九项问题，保留已有实验数值和证据边界；直接执行并编译、检查成稿。
图号以当前 `main.aux` 为准，不能从资产文件名推断。当前图 1 是 SDN 对照，图 2 是外设接入比较，图 3 是本地/远程架构，图 4 是配置/运行，图 5 是提交点，图 6 是语义 DMA。当前表 3 是 `tab:configuration-freedom`。

| 项目 | 实施方案 | 验收依据 |
| --- | --- | --- |
| 1. SDN 抽象与等价对应 | 每侧仅保留三个角色组件：配置应用/工具、控制子系统、执行资源。SDAP 顶层是 host-side peripheral configuration tools，表达 hierarchy selection 与 compatible device binding；不再把 DUT OS/driver 放在对应 SDN 配置应用的位置。 | 两侧每层同位置、同粒度；箭头分别表达配置、控制和反馈；图注说明是角色类比，非接口/时序等价。 |
| 2. 组件和过程区分 | 组件使用圆角矩形；过程用箭头动词；数据/状态使用折角框；提交事件用圆点。将 address translation 等框名改为 Address translator，将 semantic mediation 改为 Semantic adapter，其他名字形成统一词表。 | 六张概念图逐个框核对；相同组件名称全稿一致；正文解释这些是功能组件，并非宣称新增 RTL 引擎。 |
| 3. 调整章节与图序 | 原图 2 放 Introduction，成为新图 1；原图 1 放 Background，成为新图 2。Introduction 只用一句话提 SDN；Background 新增 SDN-inspired separation 小节，解释配置者、控制者、执行者。 | 源码顺序和最终 PDF 图序一致，引用和图注正确；SDN 详细讨论在第二章。 |
| 4. 表 3 改为正文 | 删除软件配置选择表，改为一段明确说明 composition、device contract、device assignment 及其各自容量/语义/DMA 约束。 | 三行的全部含义保留，无失效表引用；其余实验表保留。 |
| 5. 枚举术语 | 使用 peripheral enumeration，首次明确 PCIe enumeration by the DUT OS。补充枚举发现功能、读取配置/建立资源视图，随后 driver binding and initialization，再进行 I/O。修正 Native driver enumerates。 | 全稿无 DUT enumeration 或 native-driver enumeration；配置仍发生在初始枚举前，不引入 hotplug 声明。 |
| 6. 去掉硬件贴图 | 六张概念图全部使用可编辑原生形状；物理设备、内存、队列用语义组件或状态形状，不用显卡、板卡、网卡等装饰图标。 | 当前稿件实际引用的新图均无嵌入位图或硬件剪贴图。 |
| 7. 定制板卡名称 | Setup 使用 custom prototyping board with an AMD/Xilinx VU37P FPGA，删除 NM37 专有名称；保留验证所需芯片型号和实验条件。 | Setup 与平台表一致，正文没有 NM37。 |
| 8. 统一字体 | 根据当前图 4 的 editable XML，六张概念图统一 Times New Roman；标题加粗、正文常规，按最终栏宽检查字号。检查实验曲线字体，必要时仅更新样式，保持数据不变。 | 可编辑源字体一致；最终 PDF 的概念图文字清楚、无裁切，曲线标注风格一致。 |
| 9. 图 5/6 系统性 | 图 5 按 DUT、FPGA front-end、host back-end、physical device 分区，展示配置/提交/完成跨状态所有者的依赖和三个释放点。图 6 展示 DUT 与 physical-device 地址域、语义适配器、地址转换器、DMA aperture，以及元数据/载荷两条路径的耦合。 | 每张图回答一个独立机制问题；箭头真实反映已描述方法，不人为新增系统模块；保留 local P2P 与 remote RDMA 的区别及内存可见性假设。 |

执行顺序：先固定术语和图规，再改 Introduction/Background/Design/Setup；生成六张原生 draw.io 图并导出矢量 PDF；编译全文；核查标签、字体、图形类型、正文引用、原实验数据；渲染成稿检查。

权威依据：

- [ONF SDN Architecture, TR-502](https://opennetworking.org/wp-content/uploads/2013/02/TR_SDN_ARCH_1.0_06062014.pdf)，应用层表达所需资源和行为，控制层协调执行；管理功能并不限于应用层。因此本图以配置应用作具体例子，不声称整个 SDN 应用层只属于 admin。
- [Linux PCI driver documentation](https://docs.kernel.org/PCI/pci.html)，PCI 层完成设备发现并将已发现、匹配的设备交给驱动 probe。枚举与功能驱动初始化须区分。
- 当前图 4 原生源 `fig04_configuration_runtime_v6.editable.xml` 明确使用 `fontFamily=Times New Roman`。

交付：修订后的 LaTeX、六张新 `.drawio` 与矢量 `.pdf`/预览 `.png`、可重建脚本、更新的 `main.pdf` 和九项验收记录。旧图保留用于追溯。

## 完成与验收记录

九项已完成。以下记录针对当前正文实际引用的资产，不以历史图的文件名或旧版 manifest 代替验证。

| 项目 | 当前证据 |
| --- | --- |
| 1 | 新图 2 两侧每层各一个组件，位置和粒度相同；顶层是 configuration application/tools，右侧包含 hierarchy and device binding。Background 2.1 区分操作者配置与 DUT 消费，也说明 SDN 管理并不限于顶层。 |
| 2 | 六张图逐图检查组件、状态和动作；架构及运行图采用统一的组件名。图 5 的状态框和图 6 的元数据框有折角，提交事件有圆点，流程动作不作为组件名。可编辑源与正文 Description 同步。 |
| 3 | `main.aux` 及最终页面核实：接入比较为图 1（PDF 第 2 页，Introduction）；SDN 对照为图 2（第 3 页，Background）；Related Work 始于第 4 页。详细 SDN 论述在 2.1，Introduction 仅一句带引用的说明。 |
| 4 | `tab:configuration-freedom` 及引用已删除；Design 5.1 的 “Software selection has three bounds” 段落保留 composition、device contract、assignment 与容量、端到端协议支持、DMA 可达性三类限制。表号自动重排，当前 Table 3 是实验平台表。 |
| 5 | 全稿无 DUT enumeration、native-driver enumeration；Background 2.3 明确外设枚举由 DUT OS 的 PCIe 总线子系统完成，随后是驱动匹配、绑定、初始化及运行 I/O。新图 4 与图注同步。 |
| 6 | 六张当前 draw.io 均为单页原生节点，无 image/stencil 位图；当前 `main.pdf` 所有页面 raster image 数为 0。板卡、显卡等装饰图标已删除。 |
| 7 | Setup 及平台表只写 custom board 和 AMD/Xilinx VU37P，未保留 NM37、NEXST 专名或无关引用 TODO。 |
| 8 | 六张可编辑源全部 Times New Roman；图形 PDF 嵌入 TimesNewRomanPSMT/TimesNewRomanPS-BoldMT。两张曲线也嵌入 TimesNewRomanPSMT。Fig. 8 是 LaTeX 原样日志摘录，其代码排版仍使用等宽字体；它不属于图片文字。 |
| 9 | 图 5 显示四个状态所有者、三类状态、C1/C2/C3 提交点及独立数据返回依赖；图 6 显示两个地址域、语义适配器、地址转换器、端点状态与 FPGA DMA aperture。图 6 的 C2 在元数据可见之后，未把远程 RDMA 画成本地 P2P。已按全文尺寸检查机制与箭头。 |

验证结果：`latexmk -pdf -interaction=nonstopmode -halt-on-error main.tex` 成功；14 页；无未解析引用、无 Overfull 盒子；`git diff --check` 通过。六图实际 mxGraph 渲染检查均为零文字边界错误，见 `figures/paper/drawio/sdap_validation.json`。全文页面已渲染并检查，图 1/2/3/4/5/6/7 的页面另做原尺寸查看；没有裁切或不可辨认标签。

实验曲线只替换文字层，保留原始 PDF。最终文件中的原向量路径/标记指令逐项一致：读图 156 条，写图 125 条，见 `figures/nvme_font_validation.json`。未修改实验测量数值，也未把新增示意图视为新的实验结果。

当前重建脚本：

- `figures/paper/drawio/build_sdap_revision.mjs`
- `figures/paper/drawio/render_sdap_revision.mjs`
- `figures/restyle_nvme_fonts.py`

旧 `.drawio`/AI 图均保留。当前稿件的矢量图路径以各节 `includegraphics` 为准。
