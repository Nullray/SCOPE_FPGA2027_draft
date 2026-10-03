# 全文逻辑与语言修订记录（2026-10-02）

已重新通读 `main.tex` 引入的全部正文，直接修改摘要、引言、背景、相关工作、架构、讨论与结论。按作者本轮补充要求，`sections/06-evaluation.tex` 保持逐字节不变；参考文献、图形资产、ACM 模板和章节顺序也未修改。本轮没有增加实验结果。

修订后的主线为：物理外设参与的验证价值 → 软件可选设备视图的需求 → 分离后产生的状态协调问题 → 三个提交点的实现条件 → 已有结果所支持的结论及边界。

## 已修复的问题

| 问题 | 修订结果 | 位置 |
| --- | --- | --- |
| “不改驱动、不改 bitstream”容易被读成任意新设备都可通过配置接入 | 明确该性质适用于已支持合同和 DUT 软件栈的重新组合；首次支持新协议需要语义适配器及兼容的软件栈 | Introduction；Background 2.4；Architecture 4.1–4.2；Discussion 6.3 |
| 借用物理设备、分离载荷路径与本轮新增贡献混在一起 | 将贡献集中到 FPGA 处理器边界上的软件选择视图、host-owned logical state 及其协调；保留既有借用能力的归属 | Introduction；Related Work 3.2–3.3；Conclusion |
| 初始化安装与枚举中的 BAR 分配被写成单一阶段 | 区分初始配置/路由状态的安装与 OS 枚举时的资源分配，后者通过 C1 更新已提交视图 | Architecture 4.1、4.3.1 |
| C1 的确认消息缺少实际安装次序 | 补充路由 entry 先失效、地址字段更新、有效性最后发布及 readback fence；区分请求匹配和可见性保证 | Architecture 4.3.1 |
| DUT 侧 BAR 响应可能被等同于物理设备已提交 | 明确响应可先确认接收，C2 仍须等待元数据和必要输入对设备可见；稳定读取不能替代发布顺序 | Architecture 4.3.2 |
| 三个提交点容易被读成全局串行化 | 将顺序要求限定为端点内的依赖交接，独立请求仍按设备协议允许的顺序完成 | Architecture 4.3 |
| C3 的定义偏向软件写完成，轮询与直接 DMA 完成的关系不够清楚 | 将 C3 定义为驱动可见的完成发布，同时覆盖软件发布与 DMA 有效性指示；中断只对使用它的端点适用 | Architecture 4.3.3 |
| 原生内核驱动支持与加速器运行时支持的范围混淆 | 原生驱动结论限于被测存储/网络操作；加速器使用各自的软件栈，摘要中的正确性检查明确指向 Vortex | Abstract；Introduction；Related Work；Discussion；Conclusion |
| 低开销与通用性结论超出已有证据 | 解释控制计时与 C2/物理完成不必重合；吞吐结论限定在 50-MHz、QD=1 条件下；整套资源差值不作为端点增量成本 | Discussion 6.2–6.3；Conclusion |
| 同时呈现多个端点容易被读成已验证并发 I/O | 讨论明确区分共同呈现与并发进展、性能隔离及扩展性 | Discussion 6.3 |
| 重复概念和指代使段落衔接不顺 | 压缩相关工作与讨论中的重复架构总结；定义 endpoint context；补齐摘要 DUT、引言 BAR 的首次定义；改写长句和含糊指代 | 全文非实验部分 |

## 实验章节中保留的待核对项

以下问题已发现，但按作者要求没有改动实验正文、表格或数字，也没有通过其他段落补写新的部署结果。

1. **设备位置与版本对应。** 表 4 将 Vortex 标为 Host-remote；现有固定版本文档描述同主机 Unix socket 控制和本地 P2P。远端文档支持 NVMe/ixgbe，并明确排除 igb/Vortex，因此表 4 的远端 igb 标签也需要实验版本或原始日志解释。FSA 的位置与实际接入版本尚未核实。这些差异可能来自另一套部署，不能仅凭当前文档判定作者报告的实验无效。
2. **控制计时术语。** 5.2 节记录的是 DUT 写寄存器到随后 I/O fence 的区间，却也使用 “SQ doorbell submission” 表述。4.3.2 和 6.2 已解释该区间不必等于物理提交或完成，但实验章节中的具体措辞本轮保留。
3. **组合验证与配置复用。** 当前多设备呈现和各自功能测试没有给出完整的固定 bitstream 配置矩阵、真正重叠运行或接入工作量统计。这些证据仍需实际记录，不能由文字修订补足。

## 机制核对依据

本轮对照的是固定版本设计和接口文档，不是新一轮硬件验证，也没有把文档中的验收目标当成新实测结果。

- [vSwitch 接口规范](https://github.com/Nullray/nexst/blob/ade3572ff3a304454e3b68e2eca883b49c2b2e46/doc/VSWITCH_REGISTER_INTERFACE_SPEC.md)：配置更新、路由安装、readback fence、匹配确认及 early BAR response 的语义。
- [远端接入架构](https://github.com/Nullray/nexst/blob/ade3572ff3a304454e3b68e2eca883b49c2b2e46/doc/RDMA_REMOTE_DEVICE_INTEGRATION_ARCHITECTURE.md)：当前设备支持、不同状态所有者、BAR 接收确认与远端执行完成的区别。
- [Vortex U280 接入文档](https://github.com/Nullray/nexst/blob/ade3572ff3a304454e3b68e2eca883b49c2b2e46/doc/VSWITCH_VORTEX_U280_INTEGRATION.md)：本地 Unix socket/P2P、guest transport 和物理执行边界。
- [Linux 设备 I/O 文档](https://docs.kernel.org/driver-api/device-io.html)：MMIO 顺序与 posted write 的区别。将该区别用于当前计时边界是本轮的解释，具体物理提交时刻仍需系统事件记录。

## 验证与交付

- `latexmk -pdf -interaction=nonstopmode -halt-on-error -outdir=tmp/logic_language_review_20261002/build -jobname=SDP_logic_language_20261002 main.tex` 编译通过，最终 11 页。
- 31 个唯一标签、19 篇被引文献、7 个图组（8 个图片文件）均解析；图 1–7 编号保持一致；无失效交叉引用、缺失图片或 Overfull 盒子。
- 已查看最终 11 页渲染图，未发现文字裁切、图文遮挡或表格溢出。编译仍有 Underfull 排版警告；本轮未改变 ACM 布局参数，也未作投稿页数压缩。
- SHA-256 确认实验章节和参考文献与本轮开始时一致：实验 `964b592196b4ce8e245fd7be931a338b8d9139c1e3e13195aaf1b855236bf9b0`；参考文献 `adb1d528bbcc17c6844e950a270d38927a01573e4a93959e9169d42799a6c5ce`。
- 修订 PDF：`output/pdf/SDP_logic_language_20261002.pdf`，同时更新工作稿 `main.pdf`。
- 本轮之前的源码和 PDF、逐文件修订 patch、校验结果及渲染页保存在 `tmp/logic_language_review_20261002/`，可据此与本轮开始时比较，而不混入更早的未提交修改。
