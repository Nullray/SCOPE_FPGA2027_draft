**SDP 加速器扩展成本分析与实验方案（2026-10-02）**

本次通过 GitHub 插件读取 NULLRAY 的实现分支、设计文档和提交差异。结论来自源码审阅；下文提出的实验没有在硬件上执行。论文正文和已有实验结果未改动。

**修订后的统计边界。** 按作者澄清，Vortex 的 RTL 简化用于在 U280 上完成 bitstream 部署，与 SDP 架构无关；GDS/GIDS 是独立功能扩展。两者均排除在 SDP 接入成本之外。前一版从上游代码开始比较，把平台部署与架构适配放在同一统计范围，不能据此得到架构修改成本。

正确的基线是：已经可以在 U280 上独立运行、具有本轮所需设备合同的 Vortex，包括部署必需的 RTL 简化、资源/时序调整和平台配置。评估的问题是“把这个可用设备接入 SDP 还需要增加多少代码”，并按改动用途逐块归因。代码所在文件或提交时间不能单独决定是否计入。

| 改动类别 | SDP 接入成本处理 | 例子 |
| --- | --- | --- |
| 基本架构适配 | 计入 | guest transport、虚拟 CP、命令/地址转换、bridge、backend 注册和生命周期管理 |
| 架构的数据路径扩展 | 与基本接入分别计量 | direct-P2P peer mapping、窗口管理、相关协议和 XRT callback |
| U280 平台部署 | 排除，作为设备基线 | RTL 资源简化、单 bank/core 配置、时钟/时序、shell connectivity、Vitis 构建调整 |
| GDS/GIDS | 排除 | NVMe-to-HBM、GPU 发起存储、逻辑 SQ/CQ、GDS/GIDS API 与 RPC |
| 设备通用修复 | 纳入可用设备基线 | 独立运行同样需要的 loader、TLS、DMA 正确性等修复 |
| 测试和打包 | 单列，不混入运行实现 SLOC | regression、fake driver、构建脚本、镜像安装和诊断工具 |
| 同一文件中的混合改动 | 按 diff hunk 归因 | runtime、bridge、XRT 和公共 manager 中同时出现上述不同用途 |

**审阅版本。** 默认分支不足以定位实际实现，本次读取了以下分支。计数使用下文指定的不可变提交区间。

| 仓库 | 分支 | 本次审阅 HEAD |
| --- | --- | --- |
| Nullray/nexst | nm37_vswitch | ade3572ff3a304454e3b68e2eca883b49c2b2e46 |
| Nullray/qemu | nm37_vswitch | 6a30be82ace2bb045fc75ab1a8815e8f56dd9ba5 |
| Nullray/vortex | scope-vswitch-u280 | 5179ccd7167c88255700d963f4b6dcb708e1cadc |

GitHub 返回 work_farm、rootfs 子模块目标仓库 404；文档引用的 guest Linux driver、rootfs 集成和本地 XRT/xocl 私有修改没有取得完整源码。本次可见仓库与相关分支中尚未定位 FSA 接入实现，不能据此填入 FSA 的适配行数或部署结论。

**第一个方向：把“扩展成本”分成首次支持设备类型和组合已有设备两个阶段。**

首次接入已经可用的 Vortex 时，记录新增 semantic adapter、guest transport、bridge 和必要的公共框架修改，基本接入与 direct-P2P 扩展分别统计。组合已有设备时，固定已安装驱动、rootfs 和 bitstream，改变启动 JSON 的设备类型、数量、顺序及绑定，并验证枚举和工作负载。两个阶段分别对应设备可扩展性和软件可配置性。

以下提交区间用于定位原始变化，已避开后续 GDS/GIDS 提交；但 Vortex 区间仍包含平台部署和通用修复，因此它不是严格的架构适配基线：

- Vortex：上游基线 e2b9745b637ce8ac462be2f0e01b5d76542dc6c0 → 六类工作负载支持提交 628c933606250bf0cfa78e4723780eb015c22446。
- QEMU：接入前 fd1e9bf1bb59bde5fc31a20e6ac98afb850f4c36 → direct-P2P 提交 d5594990d65d58b629ecb54bab63f2ac1e6eb6dc。
- 香山前端：首次集成提交 b6702ba121c82434423eda72bcec529627d099f5 与其父提交 6c70079414c6223175e8dd97e2c89f38fc9162b7 比较。

以下保留已核实的 Git 新增/删除行数作为参考体量，含注释和空行。各模块中的基本接入与 direct-P2P 尚需进一步拆分，下面的数字不能直接相加或作为最终架构适配 SLOC，也不等同开发工时。

| 层或文件 | 新增 | 删除 | 如何解释 |
| --- | ---: | ---: | --- |
| QEMU Vortex semantic backend | 1,459 | 0 | 虚拟 CP、稳定命令快照、地址转换、异步执行和错误传播 |
| QEMU bridge protocol header | 111 | 0 | QEMU 侧协议声明 |
| guest runtime backend vortex.cpp | 127 | 0 | Vortex callback 到 ioctl/mmap 的 transport 适配 |
| guest userspace UAPI header | 35 | 0 | 不包含 Linux kernel driver 实现 |
| host bridge main.cpp | 492 | 0 | RPC、XRT callback、session 和 peer mapping 管理 |
| Vortex 侧 bridge protocol header | 127 | 0 | 与 QEMU 存在协议副本，统计时单列 |
| 已有 XRT runtime vortex.cpp | 142 | 0 | 架构 direct-P2P peer mapping 扩展，单列 |
| common callbacks.h | 44 | 0 | peer callback 扩展，按架构数据路径用途单列 |
| common device.cpp | 7 | 0 | queue 初始化相关调整，按必要性归因 |
| runtime stub vortex.cpp | 20 | 0 | 静态 guest backend 支持，与部署/打包分别归因 |
| 香山 virtual_pcie_switch_proxy.v（首次集成） | 12 | 12 | MAX_NVME → MAX_BACKENDS 的标识符重命名 |

香山前端两版源码在将 MAX_NVME 统一重命名后全文相同。这支持“首次集成未增加 Vortex 专用前端逻辑”的结论；使用同一部署 bitstream 则仍需实际产物哈希和运行记录。

QEMU 公共 manager 区间差异为 +172/-20，包含设备注册、参数接入及通用修复；IGB 文件还包含独立修复。仅其中必要的 Vortex 集成改动计入。U280 构建脚本和平台配置排除；测试、capability checker、镜像打包单列；guest driver 和架构所需的私有 xocl peer mapping 尚需补齐源码。以上表格不是完整接入总成本。

前一版列出的 VX_cp_core.sv +37/-11 与 VX_cp_dma.sv +44/-13 已从架构成本表移出。对应提交是 DMA readback fence 和错误传播，不能把它解释为作者提到的 RTL 资源简化，也不能仅因它与接入同时出现就计入 SDP。设备独立运行也需要的修复纳入设备基线；若后续证据表明某个改动仅由 SDP 特定数据路径要求，则将该部分单列为数据路径扩展，说明必要性。目前不把这 81/24 行计入基本接入成本。

该 Vortex 区间的 31 个变更文件中，没有六类既有应用 vecadd、sgemm、conv3、multikernel、bfs、sort 的 main.cpp/kernel.cpp，也没有公共 runtime API 头 vortex2.h。可以报告这些应用源码和 API 头的复用；kernel loader、打包 metadata、TLS/startup 和静态构建仍有变化，不能宣称所有 runtime 源码或编译后二进制保持不变。

实际论文中的成本表建议按下列字段填写；平台部署和 GDS/GIDS 不进入这些成本列：

| 设备 | host semantic adapter | guest transport/runtime | 公共框架修改 | DUT 前端语义修改 | 架构 P2P 扩展（单列） | 配置与验证 |
| --- | --- | --- | --- | --- | --- | --- |
| Vortex | 过滤平台/通用修复后统计 | 架构 transport；kernel driver 源码待补 | 仅计必要集成 hunk | 首次集成仅命名变化 | peer mapping；私有 xocl 待补 | JSON、artifact hashes、工作负载结果 |
| FSA | 待定位仓库 | 待核对 runtime/driver | 待核对 | 待核对 | 待核对 | 待核对实际张量范围与结果 |

**建议的统计流程。** 锁定可用的 U280 Vortex 基线及三个仓库/子模块版本。给每个 diff hunk 标记为基本架构适配、架构 P2P 扩展、平台部署、设备通用修复、GDS/GIDS 或测试/打包，保留分类原因。仅汇总前两类，分别报告新增 SLOC、修改/删除量和文件数；混合提交不整体计入。如果没有一个包含全部平台改动而尚未接入 SDP 的历史提交，可用固定原始 diff 加排除清单重建统计边界，无需改写仓库历史。记录源码/产物哈希和编译参数。开发工时同样只计算架构集成活动，排除 U280 bring-up 和 GDS/GIDS；不能从 commit 时间跨度推算。

可评估的论点是：在固定前端容量内，将一个已可用的加速器接入 SDP，其增量工作主要集中在 guest transport、host adapter 和必要的数据路径接口；已有应用和通用前端得到复用。U280 平台实现与 GDS/GIDS 不作为该论点的适配成本证据。最终数量以完成逐块归因后的统计为准。

论文可明确写出统计口径：Integration effort is measured relative to a functional U280 Vortex deployment; platform-specific implementation changes and GDS/GIDS extensions are excluded.

**可以直接细化的实验。**

| 实验 | 研究问题 | 现有实现依据 | 主要指标 | 新增工作 |
| --- | --- | --- | --- | --- |
| E1：复制路径与 P2P 对照 | 相同控制适配下，分离 payload 路径能减少多少成本？ | mediated 与 direct-p2p 两条 executor | MEM_WRITE/READ 延迟和带宽、完整任务延迟、QEMU/bridge CPU 时间、CPU payload 字节数 | 统一采样与 CPU-copy 计数导出；运行两种 JSON |
| E2：映射边界与 remap | 地址转换是否在边界及映射代次变化时保持正确？ | 4 MiB slot、64 MiB peer window、16 MiB 单次上限及 generation | map 次数/耗时、正确率、guard 损坏、stale generation 拒绝 | 可控制合法 buffer 地址的 microbenchmark |
| E3：完成发布顺序 | guest 观察完成时，返回数据是否已可见？ | MEM_READ readback fence；虚拟 seqnum 在物理成功后推进 | stale output、提前完成、数据错配数；相关 fence 与完成延迟 | 轮次标识、buffer 立即消费、轻量 trace |
| E4：worker 隔离 | 长 GPU 执行或故障会不会阻塞其他设备？ | backend 专用 worker，共享 RX 不等待 U280 | NVMe 延迟/吞吐、NIC 进展、共享控制响应、错误传播延迟 | 真正重叠运行和时间戳记录 |
| E5：命令与错误合同 | 支持的操作正确执行，非法操作是否明确失败？ | 9 类支持命令；Q_ERROR 和 sticky failure | 每类成功数、预期拒绝数、错误码、退出时间、无虚假成功 | 正负用例及清理/重启自动化 |
| E6：重复打开与 ring wrap | 多轮应用执行和回绕是否混用旧状态？ | cp_init 虚拟 reset、物理 seqnum 恢复、64 KiB physical ring | 连续成功轮数、重复/丢失完成、资源泄漏、回绕后错误 | 小任务重复运行和资源采样 |
| E7：配置复用与构建一致性 | 已支持设备的组成是否只需启动配置？ | JSON、capability checker、build-info 和 kernel hashes | 配置案例通过率、实际枚举、artifact 一致性、错误配置拒绝 | 多配置启动记录及版本清单 |
| E8：CPU/GDS/GIDS 独立扩展案例 | 同一 payload 流程的发起位置和数据路径带来何种差异？ | GIDS runbook 已提供三路径方法及 CSV 协议 | 完整任务延迟、IOPS、请求延迟分布、逐请求 CPU 提交数、数据校验 | 独立收集三种模式；全部排除在 SDP 接入成本外 |

**E1 的具体对照。** 使用同一 XiangShan DUT、同一 U280、相同包含 CP fence/error 修复的 xclbin、相同 guest 镜像和 kernel。仅改变 Vortex data-path，保持输入、预加载状态和完成校验方式一致。先做 MEM_WRITE/MEM_READ microbenchmark，再做 vecadd、sgemm、conv3、multikernel、bfs、sort。冷启动和预加载后的任务分开报告。

文档给出的合法测试规模包括 64 B、4 KiB-64 B、4 KiB、4 KiB+64 B、1 MiB、16 MiB；也可在协议支持范围内补充非 64 B 整倍数的逻辑长度。记录逻辑字节数和实际 round-up 的 DMA 字节数。不要把 CPU payload 字节为零解释为控制面完全不访问内存：描述符快照和队列操作仍由软件处理。

已有 vortex-log 包含 map_latency_us、command_latency_us、job elapsed_us、guest PA、映射地址和 generation，可用于初步分解。计时定义需区分 map、排队、物理 batch 和完整 guest 任务；存在重叠时不能把所有区间简单相加。诊断日志和正式性能采样分开，统一日志设置并评估采集开销。guest 端到端时间使用 DUT 自己的计时源，各 host 阶段使用同一主机时钟，避免跨时钟直接相减。

当前 direct 日志中的 payload_cpu_bytes=0 是软件路径证据，尚需核对调用路径/计数和设备侧 requester 观测。mediated 的累计计数需要确认可导出；两种路径都采集 QEMU、bridge 的进程 CPU 时间，必要时另计 kernel/driver CPU 开销。x86 直接运行仅可作设备服务参考；它与 50 MHz DUT 端到端差值不能全部归因于 SDP。

**E2 与 E3 的通过条件。** 为每轮输入加入唯一轮次标识，输出与参考结果比较。guard 放在协议规定的 64 B round-up DMA 区域之外，避免把合法 padding 搬运误记为越界。跨 64 MiB 映射测试用位于不同窗口的多个合法 buffer，不能以一次超过 16 MiB 的分配绕过现有上限；若正常 allocator 无法控制 DMA PA，则需要专用测试接口。

跨窗口时记录旧 batch 完成、新 generation 和后续物理提交的因果顺序；测试错误 generation 的 unmap 拒绝及 session 结束后的清理。完成顺序测试在 guest 首次看到成功完成后立即消费数据，统计旧数据和错配。CP DMA 已有 RTL 单元测试可检验 B response 后的 readback 及 RRESP/BRESP 错误传播，但单元测试不能替代实际板上观察；在途可见性由硬件 trace 与 guest 数据校验联合验证。

**E4 与 E5 的具体故障用例。** 在独立 Vortex 运行基础上，再加入 NVMe 或 NIC 负载；必须用实际重叠执行记录证明并发。Vortex endpoint 当前采用轮询，不生成 INTx，因此这里观察完成寄存器/运行时错误，不能将其写成加速器中断验证。

可测试未知 opcode、EVENT_SIGNAL/EVENT_WAIT、profile flag、LAUNCH_QMD/DRAW、越界地址、非法 tail、bridge 断连、CP 不前进和命令可见性超时。根据具体失败路径区分 5 s socket/可见性期限与 120 s CP watchdog，测量实际退出时间。当前 sticky backend failure 不保证进程内自动恢复；恢复实验记录 QEMU/bridge session 重启后的成功，不能将 guest queue reset 当作修复死 bridge 的证据。每类故障均同时检查其他 backend 是否继续取得进展。

**E6 与 E7 的具体形式。** 在相同镜像下交替运行 checker 和不同工作负载，产生足够多的 64 B 命令跨越 ring wrap，核对 virtual/physical sequence 与完成数量。资源检查覆盖 bridge BO、guest allocations、fd 和 RSS，并分别记录成功关闭与失败清理。

配置实验从单 NVMe、单 Vortex 到混合配置及可支持的端点顺序变化；每个配置在启动前固定，记录 lspci、BDF/BAR 路由、驱动绑定和工作负载校验。13 个槽是实现容量，不能写成 13 台物理设备已通过测试。更改 Vortex core/bank 配置涉及 xclbin、guest runtime 和 kernels 重建，不属于纯 JSON 组成实验。capability 不匹配的负测试也应保留，以量化构建一致性保护。

**E8 的范围限制。** runbook 的 CPU/GDS/GIDS READ 对照使用相同 4 KiB 数据、checksum 和次数，CPU/GDS 与 GIDS 的独占 ownership 配置需要分会话收集。CPU/GDS 当前不提供与 GIDS WRITE 等价的路径，WRITE roundtrip 单列。100 条成功 READ 和各项 counters 是文档规定的验收目标，本次没有采集到这组新实测。GPU-initiated 请求仍由主机软件驱动真实 NVMe queues，不能表述为移除了 host mediation。CPU 时间必须按 DUT 程序和主机服务分别测量，不能用 UART wrapper 的 host time 代替 DUT CPU 使用率。

该方向有实验脚本和 CSV 接口，可作为后续扩展或附录。若本轮重点仍是外围子系统通用性，建议先完成成本表、E1 和 E2/E3/E5 的精简语义矩阵，再决定是否加入存储扩展，以控制正文篇幅。

**与当前论文需要核对的部署边界。** 当前可见 Vortex 路径是同主机 Unix socket + 本地 PCIe P2P。远端架构文档明确写着 remote-rdma 仅支持 nvme、ixgbe，不支持 igb、vortex。因此现有稿件将 Vortex 标为 Host-remote，尚不能由本次代码支持。若结果来自另一个部署版本，应补充该提交、拓扑、配置和原始日志；本报告没有自行改动论文标签。FSA 的 location、driver/native-runtime 表述和实际支持范围同样待仓库文档核对。

**FSA 仓库补齐后需要提取的证据。** 同样以已可独立运行的 FSA 为设备基线。寻找公开 runtime API 与 transport 的分界、主机侧寄存器/命令适配、地址转换、完成与错误处理和 guest transport 改动。将平台 RTL/HLS、资源/时序调整及独立功能扩展排除。核对 tensor shape/dtype/掩码限制、参考结果和性能日志后再设计 shape sweep。

**可追溯来源。**

- [Vortex 原始参考区间的固定提交差异](https://github.com/Nullray/vortex/compare/e2b9745b637ce8ac462be2f0e01b5d76542dc6c0...628c933606250bf0cfa78e4723780eb015c22446)：包含平台与通用修复，须按本报告分类过滤；用于参考行数和既有应用/API 复用检查。
- [QEMU 基本接入的固定提交差异](https://github.com/Nullray/qemu/compare/fd1e9bf1bb59bde5fc31a20e6ac98afb850f4c36...d5594990d65d58b629ecb54bab63f2ac1e6eb6dc)：Vortex backend、RPC header 与混合提交边界。
- [香山首次集成提交](https://github.com/Nullray/nexst/commit/b6702ba121c82434423eda72bcec529627d099f5)：front-end 标识符变化与相关集成内容。
- [Vortex U280 接入与部署](https://github.com/Nullray/nexst/blob/ade3572ff3a304454e3b68e2eca883b49c2b2e46/doc/VSWITCH_VORTEX_U280_INTEGRATION.md)：两条 payload 路径、地址窗口、CP fence/error、板级验收。
- [U280/XiangShan 运行手册](https://github.com/Nullray/nexst/blob/ade3572ff3a304454e3b68e2eca883b49c2b2e46/doc/U280_QEMU_XIANGSHAN_RUNBOOK.md)：build-info、工作负载、日志字段和验收规则。
- [通用系统架构](https://github.com/Nullray/nexst/blob/ade3572ff3a304454e3b68e2eca883b49c2b2e46/doc/PROJECT_ARCHITECTURE.md)：ScopeBackendOps、共享控制面、设备状态和容量边界。
- [RDMA 远端接入架构](https://github.com/Nullray/nexst/blob/ade3572ff3a304454e3b68e2eca883b49c2b2e46/doc/RDMA_REMOTE_DEVICE_INTEGRATION_ARCHITECTURE.md)：当前支持设备和搬运模式。
- [GIDS 验证手册](https://github.com/Nullray/nexst/blob/ade3572ff3a304454e3b68e2eca883b49c2b2e46/doc/VORTEX_GIDS_RUNBOOK.md)：GPU 发起存储、三路径对照、CSV 与完成计数。
- [CP DMA RTL](https://github.com/Nullray/vortex/blob/628c933606250bf0cfa78e4723780eb015c22446/hw/rtl/cp/VX_cp_dma.sv)：readback fence 状态与 AXI 响应检查。
- [Bridge 单元用例](https://github.com/Nullray/vortex/blob/628c933606250bf0cfa78e4723780eb015c22446/tools/scope_vortex_bridge/tests/test_bridge.py)：协议、边界、allowlist、generation 和断连清理。

原始 GitHub 差异统计及修订后的边界记录保存在 tmp/sdp-extension-github-audit-20261002.json。原始数字保留用于追溯，不代表已经归因完成的架构适配成本。
