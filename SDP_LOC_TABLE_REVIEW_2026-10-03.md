# LOC 与设备专用适配表的复核（2026-10-03）

本次仍分析新增外设协议的接入，不将已有外设的配置重组当作新协议接入。根据作者进一步明确的归因，通用双 BAR 支持属于适用于所有外设的共享架构扩展，不计入 FSA 的设备专用适配。因此，表 6 的四类外设均为前端专用功能修改 0；FSA、Vortex 的 DUT 软件统一表述为 Runtime adaptation。这不表示历史上的共享架构差分为 0，也不表示两种加速器的全部驱动/运行时源码不变。

## 文献如何报告代码量

| 论文 | 用法 | 与本文有关的写法 |
|---|---|---|
| [Offload Annotations，USENIX ATC 2020](https://www.usenix.org/system/files/atc20-yuan.pdf) | 表 1 使用 LOC | 表注明确包含 annotations、类型传输与拆分函数，并在 7.1 分析接入工作落在哪些接口上。 |
| [Floem，OSDI 2018](https://www.usenix.org/system/files/osdi18-phothilimthana.pdf) | 表 1 和表 3 使用 Effort (loc) | 区分已有实现、替换与新增代码；正文用可复用元素和队列解释代码变化。 |
| [MettEagle，OSDI 2025](https://www.usenix.org/system/files/osdi25-miemietz.pdf) | 使用 SLOC | 5.1 明确用 SLOCCount 统计 TCB 规模，并说明该指标的解释边界。 |

这些例子说明 LOC 和 SLOC 都是实际使用的写法，不能据此断言整个领域偏好哪一个。本文统一使用 LOC，使表头简洁；原审计的 SLOC 字段仍表示相同的有效物理代码行，数值和筛选规则不变。

计数方法仍需定义一次。空白行、纯注释行的排除可以缩成表注，无需在正文展开。独立跟踪/诊断辅助代码的排除属于本文额外的取舍，不能仅靠 LOC 或 SLOC 这个缩写表达，因此保留在表注中。功能代码内的内联诊断仍保留，必要检查、恢复、资源释放等也没有剔除。

## 设备专用适配的证据边界

| 外设 | 前端设备专用修改 | DUT 驱动/运行时 | 结论依据 |
|---|---|---|---|
| NVMe | 复用，表内 0 | 原生 Linux nvme 驱动复用，表内 0 | 论文中的功能验证与共同前端的协议无关职责；0 指在公共 SDP 框架中没有额外的设备专用功能修改，不包括首次构建公共框架的成本。 |
| NIC（Intel 82580） | 复用，表内 0 | 原生 Linux igb 驱动复用，表内 0 | 同上，不能将共同前端的实现量重复归入每个设备。 |
| FSA | 0；通用接口扩展归共享架构 | Runtime adaptation | 原跨层记录包含共享前端 +164/−73 和 guest runtime +122/−25；根据作者补充，前者为通用双 BAR 能力扩展，不属于设备专用逻辑。这些原始差分不是有效 LOC，也没有与后端总数相加。 |
| Vortex | 功能复用，表内 0 | Runtime adaptation，包含设备访问接口 | 首次集成前端只是 +12/−12 的标识符变化；跨层清单明确新增 guest 驱动文件 +305/−0、UAPI 和 guest runtime。统一表述没有删去这些接口适配的归因。 |

本次通过 GitHub 重新取得 Nullray/nexst 的 virtual_pcie_switch_proxy.v 两版完整源码，比较 [首次集成提交 b6702ba](https://github.com/Nullray/nexst/commit/b6702ba121c82434423eda72bcec529627d099f5) 与父提交 6c70079414c6223175e8dd97e2c89f38fc9162b7。将旧版 MAX_NVME 统一替换为 MAX_BACKENDS 后，两版全文相同，各为 836 个拆分行。比较响应给出的前端文件差分为 +12/−12。此结果支持“没有新增 Vortex 专用前端逻辑”，不能解释成 Git 修改行数为 0，也不能据此证明部署 bitstream 字节相同。核对结果保存在 tmp/integration_table_revision_20261003/front-end-verification.json。

FSA 的工作树源码与 Vortex 私有 guest Linux 仓库源码不在本地材料中。对这些层本次核对的是清单中的路径、版本、行区间和归因，未独立取得全部源码重算；因此不给出未经复核的精确跨层 LOC。FSA 的共享扩展记录保留；前端设备专用修改为 0 是按作者补充的共享架构归因确定的统计边界，不是重新证明原始 diff 为空。

U280 RTL 简化、部署、GDS/GIDS 和因果关系未确认的 Vortex CP RTL 改动沿用既定排除规则。它们没有被加入表 6 的 LOC，也没有用来否定共享 FPGA 前端的复用。

## 论文采用的表达

表 6 用上下两组行区分“Local back-end specialization (LOC)”与“Front-end and DUT software adaptation”。前一组报告保留实现规模与五类职责，后一组报告 FPGA 前端和 DUT 驱动/运行时的设备专用适配；后一组不是另一个代码量总数。表注说明 0 表示无设备专用功能修改。Runtime adaptation 包括软件栈所需的设备访问接口，既可覆盖运行时中的 MMIO/同步适配，也涵盖 Vortex 运行时对应的驱动和传输接口。

“First-time functional changes”强调历史接入过程，容易把同一时期的通用框架演进混入设备专用适配。改为明确层次的表头，更符合当前统计范围。表题采用“Peripheral adaptation and reuse”；设备列使用 NIC，正文注明 Intel 82580。

正文保持五类职责的定义，分析 842–1,946 LOC 的软件专用化、67.3%–81.6% 的协议处理/数据适配/同步集中度及 NVMe 的 59.0% 数据适配与同步占比；随后用公共机制的复用和具体的跨层例外解释架构的扩展边界。不根据代码量宣称开发时间或相对其他系统的节省比例。

原 device-integration-census 的审计文件和 paper-* 数值保持不变，已有性能、功能验证、故障注入章节数据保持不变。
