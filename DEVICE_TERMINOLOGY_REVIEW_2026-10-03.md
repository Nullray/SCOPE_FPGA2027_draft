# device view / device hierarchy / peripheral hierarchy 术语检查

## 判断与统一原则

在本文的设备枚举、驱动绑定和软件配置语境中，**device hierarchy 是三者中术语依据最充分、适合作为结构主术语的表达**。这一判断来自相关驱动文档、虚拟化实现文档和已有参考论文的实际用法，不是全领域语料频次统计，也不采用搜索命中数排名。

三个表达不能全部机械替换成同一个词，因为结构与行为是不同概念。

| 表达 | 本文统一后的含义与用法 |
| --- | --- |
| **logical device hierarchy** | 暴露给 DUT 的逻辑端点及其组织关系，用于软件选择、枚举、设备组合等结构性表述；上下文清楚时使用 **device hierarchy**。 |
| **device view** | 本文定义的整体设备呈现，包含逻辑设备层次及暴露给 DUT 驱动的行为；用于驱动所消费的接口及其一致性等较宽的表述。 |
| **peripheral hierarchy** | 本文原来与 device hierarchy 指向同一结构，统一为 device hierarchy，不再交替使用。 |
| **configuration state / configuration image** | 专指配置状态或配置镜像，不再用 committed view / FPGA-visible view 泛指这一局部状态。 |

第二章明确写为：

> A logical device hierarchy specifies the endpoints exposed to the DUT and their organization. In this paper, the device view comprises this hierarchy and the behavior exposed to DUT drivers.

其中 **In this paper** 明确说明 device view 的范围是本文约定，避免将其表述成已有标准的正式定义。

## 外部用法依据

1. [Linux：Device Power Management Basics](https://docs.kernel.org/driver-api/pm/devices.html#call-sequence-guarantees)。文档用 device hierarchy 描述父子设备组织及遍历次序，并将它与硬件总线拓扑联系起来，支持本文将 hierarchy 限定为结构概念。
2. [Windows：Specifying Driver Load Order](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/specifying-driver-load-order)。文档反复使用 device hierarchy，讨论根设备、子设备、枚举与驱动加载关系。该术语的使用并不限于 Linux。
3. [QEMU：PCI EXPRESS GUIDELINES](https://github.com/qemu/qemu/blob/master/docs/pcie.txt)。文档使用 PCI / PCI Express hierarchy 讨论根总线、端口、桥、设备组织以及总线编号，说明 hierarchy 在虚拟设备呈现语境中同样成立。
4. [Markussen 等：Flexible Device Sharing in PCIe Clusters using Device Lending（2018）](https://www.dolphinics.com/download/WHITEPAPERS/Flexible_Device_Sharing_using_Device_Lending_2018.pdf)。这是论文已经引用的研究。其第 3.2 节以 virtual hierarchies 描述 MR-IOV 下各主机可见的 PCIe 组织，第 4 节以 local device tree 描述借用设备的注入，支持区分组织结构与寄存器、DMA 和中断映射。
5. [TI：Safety Manual for Hercules TMS470M ARM](https://www.ti.com/lit/fs/spnu554/spnu554.pdf)。官方文档的搜索索引中确有 peripheral hierarchy，用来讨论片内互连的第三层外设组织。因此 peripheral hierarchy 并非错误表达，但该例的含义与本文的软件选择、OS 枚举语境不完全相同；不能据此认为它与 device view 是通用同义词。此次未能通过浏览工具打开该 PDF，未将其作为主要判断依据。

device view 可以作为说明“软件看到了什么”的描述性表达使用，但上述与本文直接相关的资料不足以把它认定为与 device hierarchy 含义相同的固定术语。本文保留它的广义定义，同时不再用它指代单纯的枚举层次或配置镜像。

## 已实施的修改

- 摘要、引言、背景、相关工作、系统架构、讨论和结论中的结构表述统一到 device hierarchy / logical device hierarchy。
- 引言中“OS 可以枚举的 device view”改为 logical device hierarchy；相关工作中的 enumerable PCIe view 同样改为 device hierarchy。
- 统一 peripheral view、logical view、logical PCIe view 等指整体呈现的变体为 device view；保留确实讨论驱动可见行为的 device view。
- 背景中 peripheral enumeration 改为 device enumeration，与 OS/驱动语境一致。
- 系统架构中的 committed view 改为 committed configuration state；机制章节中的 committed FPGA-visible view 改为 configuration state in the FPGA。
- 配置流程图仅修改两处文字：Hierarchy + device bindings → Device hierarchy + bindings；Install the view → Install state。同步更新可编辑源文件、生成脚本和导出图。系统架构图保持原样。
- 实现段落保留 **PCIe switch hierarchy**，因为这里明确描述实际 PCIe 交换层次，而不是重新命名本文的抽象。

此次不增加新的正文参考文献：上述来源用于核实术语，Device Lending 已在论文中引用，其余文档无需为了措辞选择而加入参考文献列表。

## 检查记录

扫描覆盖 main.tex、全部 sections/*.tex，以及正文实际使用的 draw.io 图中文字；跨行短语也纳入检查。

修改前快照、逐项差异、术语清单、图中文字与几何核对和编译记录位于 tmp/device_terminology_revision_20261003/。最终编译与版面检查结果见该目录中的 verification.json。

完成检查：共修改 8 个 TeX 文件；上述旧同义变体已无残留，剩余未带 device 的 hierarchy 均为明确的上下文指代或实现中的 PCIe switch hierarchy。配置流程图只改动两个文字单元，几何和其他图资产均保持不变。实验正文与参考文献文件未改动。LaTeX 编译通过，最终仍为 12 页、29 条参考文献，无未定义引用或正文横向溢出；已渲染全部页面并检查版面，更新 main.pdf。
