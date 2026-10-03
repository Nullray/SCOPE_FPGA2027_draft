# 第六章精简与参考文献补充

日期：2026-10-03

## 第六章修改

论文第六章为 Discussion and Limitations，对应 `sections/08-discussion.tex`；`sections/06-evaluation.tex` 在当前论文中为第五章 Evaluation。

第六章英文正文由约 748 词缩减至 489 词，减少约 34.6%。此统计排除章节标题、标签及引用命令，保留正文中的数字与术语；不同分词方法会产生少量差异。

- 合并配置能力、物理执行与验证保真度的重复论述，保留驱动兼容性、行为覆盖和时序保真度三个维度。
- 将内存可见性条件放在验证边界之后，明确工作负载成功并不能证明所有执行中的发布顺序。
- 删除与相关工作重复的 FVM 比较，保留队列深度为一、控制访问计时边界、基线配置差异及整套 FPGA 配置资源统计的限定。
- 合并外设适配、远端路径和未验证能力的说明，保留 LOC 统计范围、iWARP 范围以及并发、隔离和扩展性尚未得到验证的边界。
- 增补 PCIe 性能研究的引用，支持性能受宿主实现和驱动行为影响这一一般性判断；没有用该文献替代本论文对测量差异的实证解释。

三个小节标题保持不变。

## 新增文献与引用依据

参考文献从 19 条增至 29 条。新增 10 条全部在正文中引用，没有仅加入 BibTeX 而未使用的条目。

下表中的“引用关系”指查到的文献发现路径；正文中的引用仍用于支持对应技术论述。

| 新增文献 | 发现路径或已核实的引用关系 | 正文用途与核对来源 |
| --- | --- | --- |
| RAMP Gold，DAC 2010 | 附件参考文献 [14]；现有 FireSim 的参考文献 [54] 引用该文 | 相关工作 3.1：功能模型与时序模型分离的 FPGA 全系统仿真。[作者提供的论文](https://people.eecs.berkeley.edu/~krste/papers/rampgold-dac2010.pdf)，DOI：10.1145/1837274.1837390 |
| Virtio，SIGOPS OSR 2008 | 附件 [11]；现有 FVM 的参考文献 [60] 引用该文 | 相关工作 3.2：虚拟设备接口与既有设备协议的区分。[出版记录](https://doi.org/10.1145/1400097.1400108)，DOI：10.1145/1400097.1400108 |
| MDev-NVMe，USENIX ATC 2018 | 现有 FVM 的参考文献 [59] 引用该文；现有 SmartIO 的出版方参考文献记录也包含该文 | 相关工作 3.2：原生 NVMe 驱动、中介直通与主动轮询。[USENIX 页面及官方 BibTeX](https://www.usenix.org/conference/atc18/presentation/peng)，pp. 665–676 |
| Zero2M，TRETS 2026 | 附件 [9]；该文引用现有 FVM，属于前向引用检索结果 | 相关工作 3.2：FPGA NVMe 控制器内的租户 I/O 管理与原生存储栈兼容。[出版记录](https://doi.org/10.1145/3787489)，19(1)，Article 6，34 pages |
| LeapIO，ASPLOS 2020 | 从 Zero2M 的参考文献继续向后检索；出版方登记了 LeapIO 的 DOI | 相关工作 3.2：虚拟 NVMe、ARM SoC 存储服务卸载与统一地址空间。[Microsoft Research 页面](https://www.microsoft.com/en-us/research/publication/leapio-efficient-and-portable-virtual-nvme-storage-on-arm-socs/)，[作者版本全文](https://www.microsoft.com/en-us/research/wp-content/uploads/2020/01/LeapIO-ASPLOS20.pdf)，DOI：10.1145/3373376.3378531 |
| DONGLE 2.0，TRETS 2024 | 附件 [8]；作为 HLS 内核消费物理存储接口的直接相关工作 | 相关工作 3.1：统一内存/存储接口与 FPGA 主导 NVMe 访问。[出版记录](https://doi.org/10.1145/3650038)，17(3)，Article 45，32 pages |
| QEMU，USENIX FREENIX 2005 | 附件 [3]；现有 SimBricks 也引用 QEMU，但其参考条目为项目网站，不能据此声称它引用了这篇 2005 年论文 | 架构 4.2：为已使用的 QEMU 管理器提供工具出处。[USENIX 页面](https://www.usenix.org/conference/2005-usenix-annual-technical-conference/qemu-fast-and-portable-dynamic-translator)，[官方全文](https://www.usenix.org/legacy/publications/library/proceedings/usenix05/tech/freenix/full_papers/bellard/bellard.pdf)，pp. 41–46 |
| XiangShan，MICRO 2022 | 附件 [22]；实验平台本身需要出处 | 实验设置 5.1：仅补原型处理器出处。[项目论文列表](https://talks-pubs.xiangshan.cc/publications/)，[全文](https://talks-pubs.xiangshan.cc/publications/micro2022-xiangshan.pdf)，DOI：10.1109/MICRO56248.2022.00080 |
| Vortex，MICRO 2021 | 根据正文中实际使用的 GPGPU 平台补查原始论文 | 架构 4.3：为被适配的 Vortex 平台提供出处；SDP 的后端行为仍是本文实现。[作者页面](https://blaisetine.github.io/publications/micro-21/)，DOI：10.1145/3466752.3480128 |
| Understanding PCIe Performance for End Host Networking，SIGCOMM 2018 | 补充与性能解释直接相关的 PCIe 测量研究；未将其列为已证实的种子文献引用邻居 | 讨论 6.2：支持宿主 PCIe 实现和驱动行为影响性能的判断。[作者项目页面](https://www.cl.cam.ac.uk/research/srg/netos/projects/pcie-bench/)，DOI：10.1145/3230543.3230560 |

FVM、FireSim 和 SmartIO 的引用关系分别通过官方全文或出版方提交给 Crossref 的参考文献记录核对。Zero2M 到 FVM、LeapIO 的关系也在出版方参考文献记录中核实。核对记录保存于 `tmp/discussion_references_20261003/sources/`。

检索优先覆盖现有文献的后向参考文献和前向引用，再用附件及实际平台出处补充。没有把 IX、DirectCXL、SPDK、Rocket Chip、CeDMA 等候选全部加入；它们与当前论述的直接关系较弱，或不是本稿实际使用的工具与平台。

## 元数据与表述处理

- 逐条核对新增文献的作者、题名、年份、会议/期刊、页码或文章号，以及 DOI/官方链接。统一在题名中保护 FPGA、NVMe、RISC-V、HLS 等术语的大小写。
- QEMU 使用正确的 FREENIX 页码 41–46，没有沿用附件中把 41 写成卷号、仅列 p. 46 的格式。
- DONGLE 2.0 与 Zero2M 使用 ACM 文章号格式，分别为 Article 45 和 Article 6。
- XiangShan 保留正式作者名单；Vortex 最后一位作者按实际姓名 Hyesoon Kim 记录，修正机器元数据中姓名顺序颠倒的问题。
- 现有 FASED 条目维持已核实的 330–339 页，没有沿用附件中的 200–209 页。
- SCOPE 的 FPT 条目仍按作者已确认的接受状态记录；未为尚缺的页码和 DOI 填入猜测值，也未复用同题名 FCCM 记录的 DOI。
- 新增比较围绕接口、使用者和控制语义放置位置展开，没有把文献中的性能数字移植为 SDP 的性能证据。

## 验证与交付

- BibTeX 共 29 条，正文引用覆盖全部 29 条；没有缺失的引用键或重复键。
- 生成的 `main.bbl` 含 29 个条目，PDF 中没有未解析引用。
- 最终 `latexmk` 完整编译返回 0；全文仍为 12 页。最终 PDF 文本与已检查的渲染版本一致。
- 渲染检查了全文页面，重点检查新增相关工作、第六章和参考文献的分页、字号、链接及列宽；没有横向溢出或文字重叠。
- 仍有原稿已有的 ACM 顶部参考格式警告、SCOPE 接受状态条目的缺失出版字段提示，以及末页自动平衡产生的约 1.13 pt 纵向盒警告。没有为消除这些提示改变投稿模板或虚构出版信息。
- 与修改前快照比较，实验章节除补入 XiangShan 引用外，正文保持一致；图文件和总体架构图的双栏设置未修改。

本轮修改文件：`sections/08-discussion.tex`、`sections/07-related-work.tex`、`sections/03-overview.tex`、`sections/04-design.tex`、`sections/06-evaluation.tex`、`references.bib`。

更新稿：`main.pdf`。独立留存稿：`output/pdf/SDP_discussion_references_20261003.pdf`。

修改前快照：`tmp/discussion_references_20261003/before/`。

## 随后完成的摘要精简

根据同日追加要求，仅修改 `main.tex` 的摘要部分，将约 218 词缩减为 165 词，减少 24.3%。保留研究问题、两项解耦、容量与设备兼容性约束、配置与提交/完成协调、原生驱动和 Vortex 结果、两项 NVMe 吞吐量数据、故障注入及验证边界，并明确读吞吐量对应队列深度为一。

摘要修改前快照保存在 `tmp/abstract_revision_20261003/before/`。再次完成编译和首页、讨论与参考文献页面检查；仍为 12 页，29 条文献全部解析。`main.pdf` 为包含摘要精简的最新稿，另存 `output/pdf/SDP_abstract_shortened_20261003.pdf`。
