# SDAP 配图必要性评估与修订计划

## 行动前判断（按本次修订前的图号）

| 原图 | 独立回答的问题 | 决定及理由 |
| --- | --- | --- |
| 1 接入方式比较 | 相比建模、直接连接与先前 SCOPE，SDAP 改变了什么？ | 保留。用于 Introduction 的问题定位，不展开内部实现。 |
| 2 SDN/SDAP 抽象类比 | 软件定义的配置、协调、执行职责如何对应？ | 保留。三个等价抽象层次是 Background 的概念解释，不替代系统架构。 |
| 3 系统架构 | 组件部署在哪里，本地与远端如何共用运行时职责？ | 保留并重绘。强调接口和状态归属，配置管理细节移交图 4。 |
| 4 配置与运行时 | 软件选择如何成为 OS 能发现、驱动能使用的设备视图？ | 保留配置生命周期；删去重复的运行时面板，其信息由图 3 的接口与图 6 的数据路径承接。 |
| 5 分布式提交条件 | 跨状态所有者何时可以释放配置、提交与完成？ | 保留。它表达次序与可见性条件，架构连接和地址可达性不能替代。 |
| 6 元数据与载荷 | 地址域转换如何允许载荷绕过软件字节复制？ | 保留。它展示图 3 中抽象载荷连接背后的 aperture 与引用关系，限定为 host-local。 |
| 7 NVMe 曲线 | 块大小如何影响本地与远端吞吐？ | 保留两个子图。实验结果不能用概念图或单点表替代。 |
| 8 Vortex 日志 | 功能测试是否执行并通过？ | 撤去独立图，将已有 32×32 卷积测试过程和结果并入 Functional Validation 正文。该摘录未提供表格和正文之外的定量信息。 |

最终保留七幅图；图 1–7 的编号不变。原图 8 的内容不丢失，日志图源也不删除。
不将架构、提交条件与地址机制合成一幅大图：三者分别解释部署、次序与可达性，
合并会再次造成密集连线和难以区分的箭头语义。

## 图 3 的具体布局与语义

- 用统一网格重建 FPGA、local host、remote host；本地与远端四个运行时组件在相同位置、使用相同尺寸和字体规则。
- 不在 remote 顶部补造 assignment manager。本地独有的配置管理放在图 4，图 3 专注运行时。
- 所有控制接口使用橙色；虚线表示状态/映射依赖；蓝色仅表示图中 host-local P2P payload。颜色按职责而非按位置选择。
- 箭头头部、控制线宽统一；接口与依赖分开布线，长线路使用明确的拐点，不穿过标签。
- 请求经过 access decoder 和 transport；响应直接回 access window；interrupt controller 独立通知 DUT。
- 两个后端均由 transport 接入 semantic adapter，adapter 使用 state store 与 address translator，再访问 assigned physical device。物理操作不能由 transport 绕过 adapter。
- RDMA 将两个 transport 接口相连；远端载荷以文字明确 host mediation + RDMA，不画成远端设备直接 P2P 访问 DUT memory。

## 图 4 的具体布局与语义

- 改为四个等宽阶段卡片：Select and bind、Install the view、Enumerate peripherals、Bind and initialize。
- 阶段动作、责任组件和产生的状态全部放在卡片内；卡片之间的等长无标签箭头只表示先后关系。
- 明确枚举由 DUT OS PCIe bus subsystem 执行，驱动随后绑定和初始化。
- 保留 pre-enumeration 和 supported composition 的边界；不暗示 hotplug 或已测量的任意组合并发 I/O。

## 正文与验证计划

1. 同步 System Architecture 的组件位置、路径说明及图 3 图注和无障碍描述。
2. 将两阶段使用叙述替换为配置生命周期，更新图 4 图注和描述。
3. 删除 Vortex 日志浮动图和引用，将原测试信息放回功能验证段落。
4. 更新当前配图索引，保留历史设计记录。
5. 导出原生 draw.io、SVG、PNG、矢量 PDF；检查字形边界、箭头与文字的交叠、组件对齐及箭头样式。
6. 编译 main.tex，检查引用、排版警告和实际论文尺寸下的图文布局。

## 完成记录

- 已保留图 1–7，撤去原图 8 浮动日志图，将 32×32 卷积过程及 `PASSED!` 结果并入功能验证正文。原摘录保存在 `figures/paper/vortex_functional_trace_excerpt.txt`。
- 图 3 从原生组件重新布局，不再继承旧图的混合字号和箭头样式。两端运行时模块按同一网格平移，配置管理职责由图 4 承接。
- 图 3 的配置/运行时访问、解码事件、响应和中断路径分开；两端物理控制均来自 semantic adapter。RDMA 仅连接 transport 接口，远端载荷注记明确 host mediation + RDMA。
- 图 4 删除重复运行时面板，改为四个等宽阶段组。箭头在阶段背景之后绘制，三个箭头头部均完整可见。
- System Overview 和 Evaluation 的正文、图注、无障碍描述及当前图形索引已同步。
- 两幅修订图均为原生 draw.io 单页源，并导出 SVG、PNG、矢量 PDF。组件、标题、注释使用固定的字体层次；所有有向关系的头部尺寸为 12、线宽为 2.6。
- 渲染检查覆盖实际字体字形与文字、连线、边框的交叠，以及连线穿过组件内部、字体、边界和箭头规格。图 3、图 4 均为零错误，记录见 `figures/paper/drawio/sdap_validation.json`。
- `latexmk -pdf -interaction=nonstopmode -halt-on-error main.tex` 成功完成（实际退出码 0）；`main.pdf` 为 14 页，七幅图的交叉引用正确，无未定义引用或 Overfull 警告。
- 已渲染全文 14 页，并检查图 3/4 所在第 7 页及其余保留图的实际版面。页面预览在 `tmp/pdfs/figure_review_20261002/`；概念图为矢量对象，性能曲线数据未改动。
- 原有 ACM reference-format 设置警告、Underfull 提示和待出版参考文献字段提示保留；不将这些现有提示表述为本次图形修订的新问题。
