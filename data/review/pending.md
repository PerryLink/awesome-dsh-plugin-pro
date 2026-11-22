# 待审核仓库 / Pending review

> 新增到 `dsh-plugin` Topic 下、带有简介、尚未经维护者核实的仓库。本文件由 `scripts/update.mjs` 每日刷新，仅供审核使用，不是用户可见页面。
>
> Repositories newly added to the `dsh-plugin` topic that the maintainer has not verified yet. Refreshed daily by `scripts/update.mjs`; review-only, not a user-facing page.

- 生成时间 / Generated: **2026-11-22**
- 快照日期 / Snapshot date: **2026-11-22 (UTC)**
- 待审核 / Pending: **300**
- 从快照消失的已核准仓库 / Approved repositories missing from the snapshot: **16**
- Star 异常增长 / Star-growth alerts: **9** — 先看下方告警节 / see the alert section first
- 改名/身份待复核 / Renames pending review: **32**

审核决定记到数据文件后运行 `node scripts/merge.mjs` 生效：

- 通过 → 加入 [data/approved.json](../approved.json)（`"owner/name": "YYYY-MM-DD"`）
- 剔除 → 加入 [data/curated.json](../curated.json) 的 `excluded_repos`，理由只写「不是 DSH 插件 + 它是什么」，并同步从 `approved.json` 移除
- 只进目录、不进榜单 → 加入 `approved.json` + `curated.json` 的 `leaderboard_exclusions`（仅限制 Star 排行榜，不影响正规插件进入下游市场）
- desktop 客户端 / 桌面壳 / 启动器 → `leaderboard_exclusions` + `market_exclusions`（TOP200 与下游市场都不出现）
- market 类（插件市场、商店、技能商城、内置市场的桌面端等）→ `leaderboard_exclusions` + `market_exclusions` 留底（市场不能包含市场）
- 其余非插件形态（手册教程、Docker、VS Code 扩展、配套工具等）与无安装路径的通用工具 → `excluded_repos` 整体剔除（同步从 `approved.json` 移除）
- 目录站 / awesome-list / 榜单站（如 `awesome-dsh-plugin*` 系列）→ `excluded_repos` 整体剔除，不留目录
- Star 异常增长（见告警节）→ 先做增强分析；热度并非来自 DSH 插件本身时，核准也加入 `leaderboard_exclusions`

完整约定见 [data/review/README.md](./README.md)。

Record decisions in the data files, then run `node scripts/merge.mjs`:

- Approve → add to [data/approved.json](../approved.json) (`"owner/name": "YYYY-MM-DD"`)
- Exclude → add to `excluded_repos` in [data/curated.json](../curated.json) — the reason just states "not a DSH plugin + what it is" — and remove it from `approved.json`
- Catalog-only (off the board) → add to `approved.json` + `leaderboard_exclusions` in `curated.json` (applies to the Star board only; genuine plugins can still reach the downstream market)
- Desktop client / shell / launcher → `leaderboard_exclusions` + `market_exclusions` (absent from both TOP200.md and the downstream market)
- Market class (plugin market, store, skill mall, desktop with a built-in market) → `leaderboard_exclusions` + a `market_exclusions` backstop entry (the market cannot include another market)
- Other non-plugin forms (handbooks, Docker, VS Code extensions, companion tooling) and generic tools without a DSH install path → `excluded_repos` outright (also removed from `approved.json`)
- Directory sites / awesome-lists / leaderboards (e.g. the `awesome-dsh-plugin*` family) → `excluded_repos` outright
- Star-growth alerts (see the section below) → extra analysis first; if the stars are not from the DSH plugin itself, approve into `leaderboard_exclusions` as well

See [data/review/README.md](./README.md) for the full convention.

## ⚠️ Star 异常增长 / Star-growth alerts

**审查员请先看本节。** 对照上一份快照，把「一天内 +100★」「单日净减 ≥100★」或「突然进入 / 大幅跃升榜单」的仓库单独列出。这些条目**必须做增强分析**后再决定，不要只看 README 就核准进榜。

**Reviewers: start here.** Repositories that gained ≥100 stars in one snapshot interval, that lost ≥100 stars in one interval (GitHub clawing back farmed stars), or that would suddenly appear on / leap up the star board. Do extra analysis before approving them onto the board — a README check is not enough.

对比上一份快照 **2026-11-21** / vs previous snapshot **2026-11-21**。规则：日增 ≥100★；单日净减 ≥100★（GitHub 批量清号回收的签名——被回收的星通常是刷的，余下星数也应视为虚高）；已核准仓新入 Top 200（且 Δ≥50）/ 名次跃升 ≥50 / 冲入 Top 20；待审仓 ≥100★ 且核准后将进入 Top 200。

- 看 Star 是否与 fork、提交活跃度、仓库年龄匹配（高星零 fork、创建当天几百星，多为刷星）
- 单日大幅掉星 = 此前刷星被官方回收；刷星常贴着 +100★/日阈值之下滴灌增长，掉星往往是我们能机器检出的唯一痕迹
- 是否把已有高星的通用项目贴上 `dsh-plugin` Topic 蹭榜——插件本身可进目录，但应加入 `leaderboard_exclusions`，理由写清 stars accrued as …
- 待审仓若核准会直接冲进 Top 20 / Top 200，先确认热度来自 **DSH 插件本身**
- 已核准仓的异常跃升：确认后同样可记入 `leaderboard_exclusions`，不必下架目录

Check stars against forks, commit activity and age (hundreds of stars on day one, or high stars with zero forks, usually look bought). A generic high-star project that only just tagged `dsh-plugin` can stay in the catalog but should go to `leaderboard_exclusions` (reason: stars accrued as …). If approving a pending repo would drop it into Top 20 / Top 200, confirm the audience is the DSH plugin itself.

- 告警数 / Alerts: **9**

| Project | Queue | Stars | Δ | Forks | Age | Signals | 审核提示 / Hint |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| ⚠️ [Fanqi89/dsh-craft-anything](https://github.com/Fanqi89/dsh-craft-anything) | 待审 / pending | 427 | — | 93 | 15d | 待审高星 | 核准即榜 #75 |
| ⚠️ [Ebony-Vinyl/dsh-our-free-model](https://github.com/Ebony-Vinyl/dsh-our-free-model) | 已核准 / approved | 83919 | +864 | 2348 | 58d | 日增百星 | 日增 +864★；已不进榜单 |
| ⚠️ [nexu-io/openmotion](https://github.com/nexu-io/openmotion) | 已核准 / approved | 15253 | +621 | 1509 | 194d | 日增百星 | 日增 +621★；已不进榜单 |
| ⚠️ [dataelement/dsh-desktop](https://github.com/dataelement/dsh-desktop) | 已核准 / approved | 20709 | +220 | 704 | 100d | 日增百星 | 日增 +220★；已不进榜单 |
| ⚠️ [JimLiu/open-artifact](https://github.com/JimLiu/open-artifact) | 已核准 / approved | 348 | +217 | 47 | 4d | 日增百星、新入 Top 200 | 日增 +217★；新入 Top 200 #91 |
| ⚠️ [alchaincyf/huashu-design](https://github.com/alchaincyf/huashu-design) | 已核准 / approved | 30393 | +170 | 3232 | 216d | 日增百星 | 日增 +170★；已不进榜单 |
| ⚠️ [kunkundi/crossdesk](https://github.com/kunkundi/crossdesk) | 已核准 / approved | 5984 | +160 | 598 | 1097d | 日增百星 | 日增 +160★；已不进榜单 |
| ⚠️ [helloHub1212/dsh-windows-mcp](https://github.com/helloHub1212/dsh-windows-mcp) | 已核准 / approved | 2185 | +104 | 10 | 41d | 日增百星 | 日增 +104★；★/fork 218.5；已不进榜单 |
| ⚠️ [elysia395/dsh-wallpaper-engine](https://github.com/elysia395/dsh-wallpaper-engine) | 已核准 / approved | 7882 | +101 | 123 | 97d | 日增百星 | 日增 +101★ |

## 改名与身份变化待复核 / Renames pending review

同 owner、同 GitHub 仓库 ID 的纯改名已由脚本自动同步全部引用（approved / curated / packages / 榜单简介 / 精选）并保留原审批日期；以下条目无法安全自动处理，需人工核实：

- owner 迁移（仓库转移到别的账号）→ 人工确认后更新各文件的 key
- 同名换主（slug 未变但仓库 ID 变化，原仓库删除后被人重建）→ 人工确认审批去留
- 检测到改名但没有存储引用可同步 → 人工确认是否需要补引用

Same-owner, same-repository-id renames were synced automatically across approved.json / curated.json / packages.json / leaderboard descriptions / featured picks, with the original approval date kept. The entries below could not be handled safely and need manual review.

- `tangweiwei227/dsh-asc` → `Tangwei227/dsh-asc` — owner changed — transfer needs review
- `tangweiwei227/dsh-mediaops` → `Tangwei227/DSH-MediaOps` — owner changed — transfer needs review
- `xuanqing-95/dsh-personal-workbench` → `xuanqing-lab/dsh-personal-workbench` — owner changed — transfer needs review
- `xuanqing-95/pipeline-xhs-harness-downloads` → `xuanqing-lab/pipeline-xhs-harness-downloads` — owner changed — transfer needs review
- `acryldev/dsh-cordis` → `cordisplugins/dsh-cordis` — owner changed — transfer needs review
- `acryldev/pi-cordis` → `cordisplugins/pi-cordis` — owner changed — transfer needs review
- `AdamPlatin123/awesome-dsh-plugins` → `AdamPlatin123/dsh-plugin-radar` — target slug already exists with different data — needs review
- `DaYanHCD/DSH-Shortcut` → `DaYanCCC/DSH-Shortcut` — owner changed — transfer needs review
- `DaYanQLQ/DSH-Shortcut` → `DaYanCCC/DSH-Shortcut` — owner changed — transfer needs review
- `dongliuwuzhong-arch/dsh-purge-021rc2` → `dongliuwuzhong-arch/DSH-purge` — target slug already exists with different data — needs review
- `drewnekota/cetus` → `william-jin-cmu/cetus` — owner changed — transfer needs review
- `fgm-builds/corti` → `pgmi-builds/corti` — owner changed — transfer needs review
- `GCWing/BitFun` → `openBitFun/OpenBitFun` — owner changed — transfer needs review
- `GCWing/OpenBitFun` → `openBitFun/OpenBitFun` — owner changed — transfer needs review
- `HarcoChen/deepseek-harness-vscode` → `HarcoChen/dsh-vsc-integration` — target slug already exists with different data — needs review
- `ice5kysl/dsh-plugin-insights` → `ice5kysl/dsh-insights` — target slug already exists with different data — needs review
- `jarvis-intelligence/jarvis` → `phuongddx/jarvis` — owner changed — transfer needs review
- `liangwythu/deepseek-harness-vscode` → `YichuAI/deepseek-harness-vscode` — owner changed — transfer needs review
- `Lixxx1/dsh-vscode` → `omdsh-dev/dsh-vscode` — owner changed — transfer needs review
- `scientificmaniac/dsh-account-usage` → `scientificmaniac/dsh-weekstrip` — target slug already exists with different data — needs review
- `shell-error/deepseek-harness-remote-access` → `safety10086/deepseek-harness-remote-access-shell-error-old` — owner changed — transfer needs review
- `show-thesky/every-thing-is-possible` → `show-thesky/bing` — target slug already exists with different data — needs review
- `Tiger3807861189/DeepSeek-V4-J-Space-Capability-Realization-Report` → `Tiger3807861189/GLM-5.3-Flash-J-Space-Capability-Realization-Report` — target slug already exists with different data — needs review
- `Tiger3807861189/J-Space-Cognition-Suite-V3.6` → `Tiger3807861189/J-Space-Cognition-Suite` — target slug already exists with different data — needs review
- `Tiger3807861189/J-Space-Cognition-Suite-V3.7` → `Tiger3807861189/J-Space-Cognition-Suite` — target slug already exists with different data — needs review
- `TNJ2026/orbit-runtime` → `TNJ2026/promptaflow` — target slug already exists with different data — needs review
- `weshopai/weshop-skill-pakage` → `weshopai/weshop-skill-package` — target slug already exists with different data — needs review
- `wgd753/awesome-dsh-plugin` → `Wenston-dev/awesome-dsh-plugin` — owner changed — transfer needs review
- `xiaoxianxian/multi-proxy` → `sif-king/costgate` — owner changed — transfer needs review
- `zendev-lab/cogfold` → `zendev-lab/ulota` — target slug already exists with different data — needs review
- `zendev-lab/spark` → `zendev-lab/ulota` — target slug already exists with different data — needs review
- `1250589385/dsh-stall-guard` → `Raysnows/dsh-stall-guard` — owner changed — transfer needs review


| # | Project | Stars | Created | First seen | Description |
| ---: | --- | ---: | ---: | ---: | --- |
| 1 | [Fanqi89/dsh-craft-anything](https://github.com/Fanqi89/dsh-craft-anything) ⚠️ | 427 | 2026-11-06 | 2026-11-22 | Craft Anything for DeepSeek Harness: mcp__craft__* MCP bridge to the local craft-anything CLI, with a clean-room/deep mode switch in the composer, a status page, a CLI runner and a SHA256-verified installer. 把 Craft Anything 接入 DSH 的插件。 |
| 2 | [CM-Silence/dsh-mo-image](https://github.com/CM-Silence/dsh-mo-image) | 20 | 2026-10-28 | 2026-11-22 | 让DSH能够接入生图模型并像GPT一样生成图片 |
| 3 | [dtyg123/dsh-oh-my-token](https://github.com/dtyg123/dsh-oh-my-token) | 5 | 2026-11-21 | 2026-11-22 | Native token admission for DeepSeek Harness: command-output filters, retrieval-style reads, a conservative prose trimmer, and a settings page that reports what was saved. No RTK binary, no codegraph server. |
| 4 | [fxylabs/superself-runtime](https://github.com/fxylabs/superself-runtime) | 5 | 2026-07-23 | 2026-11-22 | The open Company State Runtime — version control for your project's state. Goals, decisions, work, and evidence outlive every chat, context window, and agent session. Ships the self CLI. |
| 5 | [OrphBladean/dsh-nahida-theme](https://github.com/OrphBladean/dsh-nahida-theme) | 4 | 2026-11-22 | 2026-11-22 | 纳西妲主题：草元素绿意配色 + 纳西妲徽记 + 祝福语 + 飘落叶片 \| A Nahida theme for the DeepSeek Harness (DSH) Web GUI. Made with DSH. |
| 6 | [2019wakeup/dsh-reader](https://github.com/2019wakeup/dsh-reader) | 2 | 2026-11-22 | 2026-11-22 | DSH 阅读工作台：PDF/EPUB/Markdown 标注、概念解释、分层导读与双语翻译（DeepSeek Harness 插件） |
| 7 | [hhz-or/dsh-hold-on](https://github.com/hhz-or/dsh-hold-on) | 2 | 2026-11-22 | 2026-11-22 | A DeepSeek Harness plugin that turns the composer's send and stop actions into hold to confirm gestures, so a stray Enter keypress or an accidental click on the send button no longer sends a half-written prompt, and stopping a running turn is just as deliberate.  |
| 8 | [Hyfish-oO/dsh-pushpin](https://github.com/Hyfish-oO/dsh-pushpin) | 2 | 2026-11-19 | 2026-11-22 | Pin the DSH window above other windows from a pushpin in the title bar. |
| 9 | [liedwardtw/dsh-ego-google-search](https://github.com/liedwardtw/dsh-ego-google-search) | 2 | 2026-11-21 | 2026-11-22 | Google web search for DeepSeek Harness via your local ego-browser (ego lite). Installs as the default web_search provider; results returned, tabs closed. Zero deps, no API key. |
| 10 | [oldtommmy/notifyhub](https://github.com/oldtommmy/notifyhub) | 2 | 2026-11-14 | 2026-11-22 | Codex turn-completion notifications via a Feishu app bot, packaged as an Agent Skill. |
| 11 | [PerryLink/dsh-ar-aging](https://github.com/PerryLink/dsh-ar-aging) | 2 | 2026-11-02 | 2026-11-22 | 把应收明细 CSV 变成账龄表：分桶、客户汇总、逾期占比、Top 逾期客户，导出 CSV。 |
| 12 | [PerryLink/dsh-ar-collection](https://github.com/PerryLink/dsh-ar-collection) | 2 | 2026-11-02 | 2026-11-22 | 把应收明细变成按优先级排序的催收计划、催收函草稿与催收清单 CSV，本地计算。 |
| 13 | [PerryLink/dsh-attendance-check](https://github.com/PerryLink/dsh-attendance-check) | 2 | 2026-11-02 | 2026-11-22 | 把打卡明细 CSV 核对成日工时、加班、超限、缺卡与休息不足，按月汇总并导出。 |
| 14 | [PerryLink/dsh-contract-renewal](https://github.com/PerryLink/dsh-contract-renewal) | 2 | 2026-11-02 | 2026-11-22 | 登记合同并按日期分档：已过期、续签窗口、N 天内到期，导出 CSV。 |
| 15 | [PerryLink/dsh-famling](https://github.com/PerryLink/dsh-famling) | 2 | 2026-11-14 | 2026-11-22 | Famling / 汀岚 DSH 兼容版：side bar footer 桌宠；配套公开 famling 独立 app。PolyForm NC + CC BY-NC-SA。 |
| 16 | [PerryLink/dsh-import-customs-check](https://github.com/PerryLink/dsh-import-customs-check) | 2 | 2026-11-02 | 2026-11-22 | 把发票、装箱单、提单、报关单逐字段对照，并列出报关单 12 项要素缺项。 |
| 17 | [PerryLink/dsh-labor-contract](https://github.com/PerryLink/dsh-labor-contract) | 2 | 2026-11-02 | 2026-11-22 | 核对劳动合同九项必备条款、试用期上限与 80% 工资下限、批量到期与竞业限制，导出复核 CSV。 |
| 18 | [PerryLink/dsh-pdf-table](https://github.com/PerryLink/dsh-pdf-table) | 2 | 2026-11-02 | 2026-11-22 | Extract tables from text-layer PDFs to CSV for DSH |
| 19 | [PerryLink/dsh-progress-payment](https://github.com/PerryLink/dsh-progress-payment) | 2 | 2026-11-02 | 2026-11-22 | 按合同基准确认本期进度款：整数分金额、累计比例，输出超量/单价/重复项问题清单与审核底稿。 |
| 20 | [PerryLink/dsh-provider-params](https://github.com/PerryLink/dsh-provider-params) | 2 | 2026-11-02 | 2026-11-22 | Vendor parameter mapping and deterministic JSON repair for DSH |
| 21 | [PerryLink/dsh-research-skills](https://github.com/PerryLink/dsh-research-skills) | 2 | 2026-11-10 | 2026-11-22 | Seven research SOP skills for DeepSeek Harness |
| 22 | [PerryLink/dsh-rfq-compare](https://github.com/PerryLink/dsh-rfq-compare) | 2 | 2026-11-02 | 2026-11-22 | 多家供应商同批物料报价对比：最低/次低价、价差、交期，标记低于成本、超预算、已过期，导出 CSV。 |
| 23 | [PerryLink/dsh-settlement-docs](https://github.com/PerryLink/dsh-settlement-docs) | 2 | 2026-11-02 | 2026-11-22 | 按清单核对竣工结算资料齐套性：缺件、份数不足、未签字/未盖章，导出核对表 CSV。 |
| 24 | [PerryLink/dsh-store-replenish](https://github.com/PerryLink/dsh-store-replenish) | 2 | 2026-11-02 | 2026-11-22 | 门店-商品销售库存转为按 SKU 补货建议与按门店补货单，按起订量向上取整，输出 CSV。 |
| 25 | [waaccll1123-sudo/dsh-mmd-mode](https://github.com/waaccll1123-sudo/dsh-mmd-mode) | 2 | 2026-11-22 | 2026-11-22 | DeepSeek Harness preset for Blender MMD production. PMX/VMD workflow, render checks, and per-action approval. |
| 26 | [acleverfreebird/dsh-ppt-animation](https://github.com/acleverfreebird/dsh-ppt-animation) | 1 | 2026-11-21 | 2026-11-22 | DeepSeek Harness plugin: build PowerPoint decks and write real animation/transition XML into them |
| 27 | [AuoraCounty/dsh-sci-compute](https://github.com/AuoraCounty/dsh-sci-compute) | 1 | 2026-10-21 | 2026-11-22 | DeepSeek Harness 科学计算插件。高等数学和线性代数默认精确式，物理实验默认不确定度。 |
| 28 | [az1hA/dsh-free-game-claimer](https://github.com/az1hA/dsh-free-game-claimer) | 1 | 2026-11-21 | 2026-11-22 | DeepSeek Harness plugin that checks Epic Games, GOG and Steam for limited-time free games and saves them with browser logins. |
| 29 | [Blank-not-black/dsh-threadlight](https://github.com/Blank-not-black/dsh-threadlight) | 1 | 2026-11-22 | 2026-11-22 | A DSH plugin for documenting Git projects and exploring source-linked workflows. |
| 30 | [Codefromshell/dsh-sifter](https://github.com/Codefromshell/dsh-sifter) | 1 | 2026-11-22 | 2026-11-22 | Bulk select and archive chats in DeepSeek Harness. Local-first and reversible. |
| 31 | [darianzes/dsh-plugin-update-hub](https://github.com/darianzes/dsh-plugin-update-hub) | 1 | 2026-11-22 | 2026-11-22 | DSH 已安装插件版本中枢：并发检查落后版本、按版本批量排队升级 |
| 32 | [Gigi1231899/dsh-plugin-career_mentor](https://github.com/Gigi1231899/dsh-plugin-career_mentor) | 1 | 2026-11-22 | 2026-11-22 | 面向高校学生的三模式职业导师：探索、热点（弹窗选方向 + 按岗位热度排序的库包与 Skill/Plugin 推荐）、规划（技能诊断与动态学习路线图）。 |
| 33 | [gougou1993/dsh-json-editor](https://github.com/gougou1993/dsh-json-editor) | 1 | 2026-11-22 | 2026-11-22 | dsh json编辑器插件；dsh-json-editor |
| 34 | [harryzhz/dsh-external-agents](https://github.com/harryzhz/dsh-external-agents) | 1 | 2026-11-22 | 2026-11-22 | Plug-in external CLI Agent runtimes (Codex, Antigravity, Claude Code, TRAE CLI) for DeepSeek Harness (Desktop &amp; Web) |
| 35 | [harryzhz/dsh-lark-bridge](https://github.com/harryzhz/dsh-lark-bridge) | 1 | 2026-11-22 | 2026-11-22 | Lark (Feishu) multi-agent bridge, group governance, Dreaming offline memory &amp; proactive assistant plugin for DeepSeek Harness (Desktop &amp; Web) |
| 36 | [hzlm124/humanities-workbench](https://github.com/hzlm124/humanities-workbench) | 1 | 2026-11-22 | 2026-11-22 | DSH 插件：人文社科研究工作台，面板、取数工具与方法手册。A research workbench for the humanities and social sciences. |
| 37 | [jinhuanranwansui-gif/reacraft](https://github.com/jinhuanranwansui-gif/reacraft) | 1 | 2026-11-22 | 2026-11-22 | Read a target, write a verifiable contract, score the rebuild, close the gap. Zero-dependency closure layer for REA + craft-anything, with a native DeepSeek Harness plugin. |
| 38 | [klaus-2/dsh-orchestrator-kit](https://github.com/klaus-2/dsh-orchestrator-kit) | 1 | 2026-11-19 | 2026-11-22 | DeepSeek Harness (dsh) plugin: Orchestrator control panel for per-role model routing across a 20-role dev-flow pipeline |
| 39 | [leonchan2840/dsh-quick-model-panel](https://github.com/leonchan2840/dsh-quick-model-panel) | 1 | 2026-11-22 | 2026-11-22 | DSH 模型选择快捷面板：支持设置常用模型、拖动排序、思考深度调节与智能体团队快捷设置，不必选一个跳一次。。 |
| 40 | [linyu039/dsh-trash](https://github.com/linyu039/dsh-trash) | 1 | 2026-11-22 | 2026-11-22 | A Trash panel for DeepSeek Harness: browse every stored Session, delete its session file, or clear a conversation's content. |
| 41 | [magiccyclingz/dsh-diagram-leapavid](https://github.com/magiccyclingz/dsh-diagram-leapavid) | 1 | 2026-11-22 | 2026-11-22 | DeepSeek Harness 侧栏图表工坊：50 种编辑级图表模板，填内容后直接生成单文件 HTML 图表。 |
| 42 | [mahe-404/dsh-fish-poop](https://github.com/mahe-404/dsh-fish-poop) | 1 | 2026-11-22 | 2026-11-22 | 给 DeepSeek Harness 的生理副线：token 驱动的肚肚（非全局、可关、带自尊） |
| 43 | [mandate100/dsh-antigravity-acp](https://github.com/mandate100/dsh-antigravity-acp) | 1 | 2026-11-22 | 2026-11-22 | Antigravity CLI (agy) as a DeepSeek Harness model provider over the official ACP protocol — T3-Code-style, Gemini whitelist, approval bridge |
| 44 | [MuChen969/DSH-Magpie](https://github.com/MuChen969/DSH-Magpie) | 1 | 2026-11-22 | 2026-11-22 | DSH (DeepSeek Harness) plugin: embed the official Magpie Web GUI in the sidebar, with manual install, permanent GitHub mirror, in-DSH duplicate detection, gateway model registration and clean one-click uninstall. |
| 45 | [NomanLord/dsh-fairy-zzz](https://github.com/NomanLord/dsh-fairy-zzz) | 1 | 2026-11-22 | 2026-11-22 | DSH-绝区零极简风格主题皮肤/Fairy Ⅲ H.D.D skin for DeepSeek Harness, with light/dark theme check |
| 46 | [Pankeyi88/quota-queue](https://github.com/Pankeyi88/quota-queue) | 1 | 2026-11-11 | 2026-11-22 | DeepSeek Harness plugin for quota-aware recovery and task scheduling. Requires CLIProxyAPI and cpa-quota-api-extension for quota features. |
| 47 | [sishuiguozi/dsh-plugin-packer](https://github.com/sishuiguozi/dsh-plugin-packer) | 1 | 2026-11-22 | 2026-11-22 | DSH plugin packer: export/import plugins with dependency closure and optional runtime assets |
| 48 | [siyu0209/dsh-office-forge](https://github.com/siyu0209/dsh-office-forge) | 1 | 2026-11-22 | 2026-11-22 | File-level Office toolkit for DSH — Word, Excel, PowerPoint, PDF, templates, audits and optional COM backends. |
| 49 | [su2517108202-blip/xinyu-token-rate](https://github.com/su2517108202-blip/xinyu-token-rate) | 1 | 2026-11-22 | 2026-11-22 | 心语 Token 速率 —— DeepSeek Harness 插件：输入框上方的 token 吞吐仪表（实时速率 / 8 秒曲线 / 首字延迟 / 缓存命中 / 上下文占用），零网络、零构建、读数只来自当前会话。 |
| 50 | [Tangwei227/DSH-MediaOps](https://github.com/Tangwei227/DSH-MediaOps) | 1 | 2026-09-01 | 2026-11-22 | AI-native media operations plugin for DeepSeek Harness |
| 51 | [TwickaS/delorun](https://github.com/TwickaS/delorun) | 1 | 2026-11-22 | 2026-11-22 | Your harness. No limits. An agent harness you shape to your own work: change anything, undo everything. Built on DeepSeek Harness; runs its plugins and imports your chats. Run it with \`npx delorun\`. |
| 52 | [ViryMu/dsh-balance-alert](https://github.com/ViryMu/dsh-balance-alert) | 1 | 2026-11-22 | 2026-11-22 | dsh余额预警 |
| 53 | [wangchengxin666/metis](https://github.com/wangchengxin666/metis) | 1 | 2026-11-14 | 2026-11-22 | Self-hosted multi-user cloud workspaces &amp; control plane for DeepSeek Harness (DSH) — isolated Docker Agent OS containers behind Traefik &amp; FastAPI.      |
| 54 | [weilifox/dsh-quick-connect](https://github.com/weilifox/dsh-quick-connect) | 1 | 2026-11-22 | 2026-11-22 | Bring Amazon Quick (AWS) chat quota into DeepSeek Harness (DSH) as a model provider, including the local-tool (outpost) bridge. |
| 55 | [ygzhang-lab/dsh-coding](https://github.com/ygzhang-lab/dsh-coding) | 1 | 2026-11-21 | 2026-11-22 | DSH 编程智能体运行时插件，借鉴 Claude 任务编排机制，Codex 五段式契约层层推进，Pro 分析需求、编排任务，Flash 子智能体去干活，确保任务交付质量和 Token 价值最大化。A coding-agent runtime for DSH: it borrows Claude's task-orchestration mechanism and advances stage by stage through Codex's five-stage contract... |
| 56 | [yuguanghang516/dsh-peer-sync](https://github.com/yuguanghang516/dsh-peer-sync) | 1 | 2026-11-21 | 2026-11-22 | DSH 局域网同步插件：Windows 与安卓接着聊，原标题、共享文件与插件随 Wi-Fi 同步。LAN sync for DeepSeek Harness and DSH Go. |
| 57 | [yyy2556/dsh-familiar](https://github.com/yyy2556/dsh-familiar) | 1 | 2026-11-22 | 2026-11-22 | Cross-session long-term memory for DeepSeek Harness: a capped always-on profile plus silent recall over facts and real session history. |
| 58 | [zdddrszj985/dsh-browser-cdp](https://github.com/zdddrszj985/dsh-browser-cdp) | 1 | 2026-11-22 | 2026-11-22 | A DSH plugin: open a URL in your local Chromium (Edge/Chrome) over CDP and get the rendered page back. The fallback for pages the built-in web_fetch cannot open: TLS interception, JS-only SPAs, UA walls. |
| 59 | [0345-0433/dsh-continue-cost](https://github.com/0345-0433/dsh-continue-cost) | 0 | 2026-11-22 | 2026-11-22 | DeepSeek Harness 插件：显示对话轮数与续聊差价 —— 继续当前对话比新开一次多花多少钱 |
| 60 | [0801ljw/dutang-dsh-plugin](https://github.com/0801ljw/dutang-dsh-plugin) | 0 | 2026-11-13 | 2026-11-22 | Dutang · Council workbench plugin for DeepSeek Harness (panel + six tools) |
| 61 | [13286793372/dsh-360-browser](https://github.com/13286793372/dsh-360-browser) | 0 | 2026-11-22 | 2026-11-22 | DSH plugin: browser tools for 360 Chrome X and 360 Secure Browser over CDP |
| 62 | [1447714306-sys/dsh-plugin-catalog](https://github.com/1447714306-sys/dsh-plugin-catalog) | 0 | 2026-11-22 | 2026-11-22 | Lists every installed DSH plugin with purpose, usage, mount points and tool-call usage stats; in-place update/rollback, enable/disable, uninstall and desktop Word/PDF export. |
| 63 | [1502074527-svg/dsh-agent-manager](https://github.com/1502074527-svg/dsh-agent-manager) | 0 | 2026-11-22 | 2026-11-22 | 左侧栏常驻的「智能体」面板：用 Markdown 定义可复用的智能体角色，运行时注册为 DSH 预设。 |
| 64 | [19949522365-dot/dsh-netease-player](https://github.com/19949522365-dot/dsh-netease-player) | 0 | 2026-11-22 | 2026-11-22 | 网易云音乐播放器 + B 站音源：DSH 窗口底部常驻播放条，搜索、播放、歌词都在页面里；0.6.0 起扫码登录不需要本地服务。 |
| 65 | [240xu/dsh-nightly-automation](https://github.com/240xu/dsh-nightly-automation) | 0 | 2026-11-22 | 2026-11-22 | DeepSeek Harness Web plugin: cron-driven unattended task engine (per-task model, fresh headless run per firing, records and reports). Archived: superseded by the built-in Automation tasks page. |
| 66 | [abrahamadams2436-glitch/dsh-xiaoyu-wake](https://github.com/abrahamadams2436-glitch/dsh-xiaoyu-wake) | 0 | 2026-11-22 | 2026-11-22 | Wake card for DSH: before you speak, it calls your name and reads your memory back. Same ta wakes on the next machine. |
| 67 | [admiremaozhuxi/dsh-steamtools](https://github.com/admiremaozhuxi/dsh-steamtools) | 0 | 2026-11-22 | 2026-11-22 | DeepSeek Harness plugin: treat the Steam Workshop as a searchable corpus — rank by subscriptions, download with steamcmd, verify game and version before handing content to the model. |
| 68 | [Agelei19/dsh-autostart](https://github.com/Agelei19/dsh-autostart) | 0 | 2026-11-22 | 2026-11-22 | Start DeepSeek Harness at Windows login and send that boot instance straight to the system tray. 开机自启并把开机那次收进托盘。 |
| 69 | [aowind/dsh-session-projects](https://github.com/aowind/dsh-session-projects) | 0 | 2026-11-22 | 2026-11-22 | 把对话完的会话归进本地项目：行菜单「移动到项目…」+ 批量整理面板，会话日志与产出文件一起搬过去，干跑预览、冲突改名、一键撤销。DeepSeek Harness 插件，零内核补丁。 |
| 70 | [AR-26710-1/dsh-plugin-scu-urp](https://github.com/AR-26710-1/dsh-plugin-scu-urp) | 0 | 2026-11-18 | 2026-11-22 | DeepSeek Harness 四川大学教务系统 (URP) 与微服务助手：免密自动登录、高颜值课表、手机日历同步、培养方案大纲与保研GPA测算、考试与空闲教室、一卡通流水与宿舍电费监控 |
| 71 | [Astra-Ursae-Majoris/dsh-plugin-conveyor-assistant](https://github.com/Astra-Ursae-Majoris/dsh-plugin-conveyor-assistant) | 0 | 2026-11-22 | 2026-11-22 | 把口语草稿翻译成 AI Agent 不会误读的意图：先追问你没说清楚的地方，再改写成结构化工单；附一只常驻像素大肥鱼。 |
| 72 | [atorber/dsh-hitrading](https://github.com/atorber/dsh-hitrading) | 0 | 2026-11-09 | 2026-11-22 | HiTrading — A股投资助手插件（DeepSeek Harness）：11 个 Agent 工具 + 交互控制台，SQLite 持久化，纯分析不下单 |
| 73 | [avego/dsh-api-monitor](https://github.com/avego/dsh-api-monitor) | 0 | 2026-11-22 | 2026-11-22 | A \[DSH\] plugin that shows every outbound API request the Host makes — the URL, the method, **all** headers, the raw JSON body and the response — in a tab of the right sidebar. |
| 74 | [AyanamReiIV/dsh-plugin-wallpaper-machine](https://github.com/AyanamReiIV/dsh-plugin-wallpaper-machine) | 0 | 2026-11-20 | 2026-11-22 | Use your WallpaperMachine library as the DeepSeek Harness background (macOS): live Scene wallpapers via WebWallGL, video and image wallpapers. |
| 75 | [baiqiuzhang/dsh-stats-sparkline](https://github.com/baiqiuzhang/dsh-stats-sparkline) | 0 | 2026-11-22 | 2026-11-22 | Cache-hit sparkline, token throughput and composer stats for DeepSeek Harness |
| 76 | [baisauce/dsh-performance-stats](https://github.com/baisauce/dsh-performance-stats) | 0 | 2026-11-22 | 2026-11-22 | DSH 侧边栏性能统计：Token 用量与每日时间线、云端 TTFT/解码与本地工具耗时、缓存命中率、运行状态、会话排行、千问 Token Plan 额度。 |
| 77 | [beqikaer/dsh-conversation-completion-reminder](https://github.com/beqikaer/dsh-conversation-completion-reminder) | 0 | 2026-11-22 | 2026-11-22 | DSH plugin: push a Feishu / WeChat card when a conversation turn completes, errors, or hits max tokens. |
| 78 | [BevalZ/dsh-subagent-panel](https://github.com/BevalZ/dsh-subagent-panel) | 0 | 2026-11-22 | 2026-11-22 | Subagent panel for the DeepSeek Harness right sidebar: colour-coded subagent tree, live usage figures, per-row detail with an auto-following transcript, clear and stop actions. |
| 79 | [bionexit/dsh-notify](https://github.com/bionexit/dsh-notify) | 0 | 2026-11-22 | 2026-11-22 | DeepSeek Harness plugin: sound, top-right notice, conversation flash and sidebar highlight when a conversation needs you (对话提醒) |
| 80 | [c225820h/DeepSeek_Harness-SMB](https://github.com/c225820h/DeepSeek_Harness-SMB) | 0 | 2026-11-22 | 2026-11-22 | Pick images straight off an SMB/CIFS share into the DeepSeek Harness composer — browse on the Host, attach without downloading to the phone first. |
| 81 | [CalmSun/dsh-aupdate](https://github.com/CalmSun/dsh-aupdate) | 0 | 2026-11-22 | 2026-11-22 | Scheduled updater for installed DSH plugins: reads dist-tags only, installs one package at a time, applies changes without a restart, and keeps an update history you can roll back. |
| 82 | [ceasarXuu/dsh-github-projects](https://github.com/ceasarXuu/dsh-github-projects) | 0 | 2026-10-28 | 2026-11-22 | GitHub Projects &amp; Issues for DeepSeek Harness: workspace project board, session issue tab + subtitles, agent bind tools. |
| 83 | [CharlesKeeling65/dsh-photo-workbench](https://github.com/CharlesKeeling65/dsh-photo-workbench) | 0 | 2026-11-22 | 2026-11-22 | DeepSeek Harness 摄影工作台 · RAW 选片、Lightroom 显影、影调复核与九宫格组图 |
| 84 | [chendb888/dsh-project-board](https://github.com/chendb888/dsh-project-board) | 0 | 2026-11-20 | 2026-11-22 | 通用项目白盒看板：蓝图驱动即时布局、实时任务进度/ETA、代码下钻、编辑卡与导游。npm 包名 @chendb888/dsh-project-board。 |
| 85 | [chengzhouSAMA/dsh-v41-pro](https://github.com/chengzhouSAMA/dsh-v41-pro) | 0 | 2026-11-22 | 2026-11-22 | Evidence-first engineering bundle for DeepSeek Harness: thorough reasoning, Reasoning Max 3.0, acceptance/calibration/retro/shrink loop, and omnimodal media tools. |
| 86 | [ChenLX233/dsh-session-delete](https://github.com/ChenLX233/dsh-session-delete) | 0 | 2026-11-22 | 2026-11-22 | Delete a DSH session together with its log, projection cache and workspace references；给 DeepSeek Harness 补一个它一直缺的动作：真的删掉一个会话。  侧栏每个会话行右侧的 ⋯ 菜单末尾会多出一条「删除会话」。点它、确认一次，这个会话就从硬盘上消失，刷新后列表里也不再出现。 |
| 87 | [chocosuki/dsh-session-folders](https://github.com/chocosuki/dsh-session-folders) | 0 | 2026-11-22 | 2026-11-22 | ds左侧边栏对话分类整理 |
| 88 | [ChubbyFishy-qwq/dsh-whale-chess](https://github.com/ChubbyFishy-qwq/dsh-whale-chess) | 0 | 2026-11-22 | 2026-11-22 | 和鲸娘下国际象棋：海蓝棋局窗口、人格化落子、ELO 滑块、随机先手、复盘与对局记忆 |
| 89 | [Chygyo/dsh-comcode-quota](https://github.com/Chygyo/dsh-comcode-quota) | 0 | 2026-11-22 | 2026-11-22 | Command Code quota monitor panel for DeepSeek Harness |
| 90 | [ckanner/dsh-subagent-antigravity](https://github.com/ckanner/dsh-subagent-antigravity) | 0 | 2026-11-22 | 2026-11-22 | DeepSeek Harness plugin: Antigravity Gemini tasks through the official agy CLI, with subscription checks and durable lifecycle receipts |
| 91 | [ClearMind-17/lite-exec](https://github.com/ClearMind-17/lite-exec) | 0 | 2026-11-22 | 2026-11-22 | Bounded shell execution and large-file/ASAR inspection plugin (lite_exec, lite_read, lite_grep, lite_stat) for DeepSeek Harness. |
| 92 | [clumsy-dot/dsh-plugin-conversation-archive](https://github.com/clumsy-dot/dsh-plugin-conversation-archive) | 0 | 2026-11-22 | 2026-11-22 | 把 DeepSeek Harness 每次对话的产出文件归入一个 日期_主题 文件夹，而不是散落在工作区根目录。 |
| 93 | [cn-zhangpeng/dsh-shanhai-kanban](https://github.com/cn-zhangpeng/dsh-shanhai-kanban) | 0 | 2026-11-21 | 2026-11-22 | DeepSeek Harness 任务看板插件：提前建任务、定时执行，绑定工作区与上游依赖，支持中断继续、自动补跑与状态跟踪。 |
| 94 | [cn-zhangpeng/dsh-shanhai-pet](https://github.com/cn-zhangpeng/dsh-shanhai-pet) | 0 | 2026-11-18 | 2026-11-22 | 山海灵宠：一只住在 DeepSeek Harness 会话旁的修行小灵宠。她读得懂任务状态——推理时掐指，改代码时磨墨，跑命令时御风，收工时点灯——但不读你的对话内容。 |
| 95 | [coency/dsh-plugin-prompt-prediction](https://github.com/coency/dsh-plugin-prompt-prediction) | 0 | 2026-11-22 | 2026-11-22 | DeepSeek Harness 插件：在输入框上方预判你下一句要输入什么，按 Tab 采纳。使用你自己的默认模型，不写入会话记录。 |
| 96 | [comfanworld/dsh-minimax-image](https://github.com/comfanworld/dsh-minimax-image) | 0 | 2026-11-22 | 2026-11-22 | deepseek harness minimax image generate plugin |
| 97 | [CookieJobs/dsh-git-activity](https://github.com/CookieJobs/dsh-git-activity) | 0 | 2026-11-22 | 2026-11-22 | Project activity board for DeepSeek Harness: recent commits, uncommitted changes and session activity for every workspace project. |
| 98 | [d2184/dsh-system-proxy](https://github.com/d2184/dsh-system-proxy) | 0 | 2026-11-21 | 2026-11-22 | DeepSeek Harness (DSH) plugin: it applies one outbound proxy policy to a profile's in-process traffic |
| 99 | [dhshu/dsh-plugin-page-tools](https://github.com/dhshu/dsh-plugin-page-tools) | 0 | 2026-11-22 | 2026-11-22 | Search and pagination for the Installed plugin group of the DeepSeek Harness Plugins page · DSH 插件页「已安装插件」的搜索与分页 |
| 100 | [Dos7t3r/dsh-spark-motion](https://github.com/Dos7t3r/dsh-spark-motion) | 0 | 2026-11-22 | 2026-11-22 | DeepSeek Harness plugin: switch the thinking indicator between the stock whale tail, Anthropic's classic Claude spark, and Claude's current dots. (unofficial; Claude artwork © Anthropic PBC) |
| 101 | [DreamYuande/dsh-history-message-editor](https://github.com/DreamYuande/dsh-history-message-editor) | 0 | 2026-11-20 | 2026-11-22 | Edit historical user messages and regenerate in the same DeepSeek Harness session. |
| 102 | [eakshelling/dsh-usage-strip](https://github.com/eakshelling/dsh-usage-strip) | 0 | 2026-11-22 | 2026-11-22 | Per-conversation token usage and estimated cost strip for DeepSeek Harness, with official peak/off-peak pricing and price-change history. |
| 103 | [eat-ice-gpu/wilbot](https://github.com/eat-ice-gpu/wilbot) | 0 | 2026-11-21 | 2026-11-22 | . |
| 104 | [ElonBright-sudo/dsh-knowledge-cockpit](https://github.com/ElonBright-sudo/dsh-knowledge-cockpit) | 0 | 2026-11-21 | 2026-11-22 | Knowledge cockpit for DeepSeek Harness: a live sidebar dashboard for a local Markdown knowledge base |
| 105 | [ErgeAIA/dsh-skills-zhiyin](https://github.com/ErgeAIA/dsh-skills-zhiyin) | 0 | 2026-11-17 | 2026-11-22 | 织音：把散落的技能织成一支谱——装技能、编技能包、按需启停，让模型只奏你想要的声部。 |
| 106 | [feely0208/dsh-asr-local](https://github.com/feely0208/dsh-asr-local) | 0 | 2026-11-22 | 2026-11-22 | whisper.cpp 本地推理，完全离线零 Key |
| 107 | [feely0208/dsh-data-lineage-scan](https://github.com/feely0208/dsh-data-lineage-scan) | 0 | 2026-11-22 | 2026-11-22 | 个人信息从哪来→到哪去→谁有权访问 |
| 108 | [feely0208/dsh-doc-accessibility](https://github.com/feely0208/dsh-doc-accessibility) | 0 | 2026-11-22 | 2026-11-22 | 对比度/结构化标签/alt/标题层级 |
| 109 | [feely0208/dsh-guard-mcp](https://github.com/feely0208/dsh-guard-mcp) | 0 | 2026-11-22 | 2026-11-22 | 把 guard-core 的规则扫描、session-search、agent-forensics 能力暴露为标准 MC |
| 110 | [feely0208/dsh-industry-pet](https://github.com/feely0208/dsh-industry-pet) | 0 | 2026-11-22 | 2026-11-22 | 宠物诊疗/宠物饲料/宠物运输/宠物医疗广告 |
| 111 | [feely0208/dsh-industry-travel](https://github.com/feely0208/dsh-industry-travel) | 0 | 2026-11-22 | 2026-11-22 | 旅游法/OTA合规/行程变更/退费/导游资质 |
| 112 | [feely0208/dsh-legal-arbitration-agreement](https://github.com/feely0208/dsh-legal-arbitration-agreement) | 0 | 2026-11-22 | 2026-11-22 | 仲裁法16/17条 要件审查 |
| 113 | [feely0208/dsh-ocr-local](https://github.com/feely0208/dsh-ocr-local) | 0 | 2026-11-22 | 2026-11-22 | macOS Vision framework 或 tesseract，完全离线零 Key |
| 114 | [feely0208/dsh-prompt-diff](https://github.com/feely0208/dsh-prompt-diff) | 0 | 2026-11-22 | 2026-11-22 | diff 两版 prompt + 推荐回归用例 |
| 115 | [feely0208/dsh-scaffold](https://github.com/feely0208/dsh-scaffold) | 0 | 2026-11-22 | 2026-11-22 | 深鲸插件脚手架：一条命令生成与既有目录结构完全一致的插件骨架 |
| 116 | [feely0208/dsh-server-logs](https://github.com/feely0208/dsh-server-logs) | 0 | 2026-11-22 | 2026-11-22 | 在 DSH 界面里直接查服务器 nginx 日志：只读、SSH 白名单命令 |
| 117 | [feely0208/dsh-tts-local](https://github.com/feely0208/dsh-tts-local) | 0 | 2026-11-22 | 2026-11-22 | macOS say 命令 + edge-tts，完全离线零 Key |
| 118 | [feely0208/dsh-xlsx-diff](https://github.com/feely0208/dsh-xlsx-diff) | 0 | 2026-11-22 | 2026-11-22 | 两份 Excel 按关键列对比，列出新增、删除、修改（逐列差异）；openp |
| 119 | [fei-hang/desktop-titlebar](https://github.com/fei-hang/desktop-titlebar) | 0 | 2026-11-19 | 2026-11-22 | deepseek harness plugin rewrite title bar |
| 120 | [fei-hang/ui-sidebar-idea](https://github.com/fei-hang/ui-sidebar-idea) | 0 | 2026-11-19 | 2026-11-22 | deepseek harness plugin rewrite sidebar |
| 121 | [feolhn/dsh-palace](https://github.com/feolhn/dsh-palace) | 0 | 2026-11-08 | 2026-11-22 | Memory Palace：DeepSeek Harness 的读书插件。把书、视频课和笔记放进一座水彩宫殿，你只管记，AI 帮你整理。 |
| 122 | [flowerzero2005/dsh-go-wuwiii-link](https://github.com/flowerzero2005/dsh-go-wuwiii-link) | 0 | 2026-11-22 | 2026-11-22 | Pair Wuwiii on the same phone with DSH Go local web session. |
| 123 | [fongap-labs/delta](https://github.com/fongap-labs/delta) | 0 | 2026-11-06 | 2026-11-22 | Local-first personal AI agent for work, research, analysis, and creation that improves with use. |
| 124 | [frederico-kluser/dsh-ai-memory](https://github.com/frederico-kluser/dsh-ai-memory) | 0 | 2026-11-21 | 2026-11-22 | DeepSeek Harness plugin that wires ai-memory natively: full lifecycle capture, handoff and post-compaction anchor injection, and ai-memory tools — no shell, Windows/macOS/Linux. |
| 125 | [frib3iro/dsh-account-balance-chip](https://github.com/frib3iro/dsh-account-balance-chip) | 0 | 2026-11-22 | 2026-11-22 | Balance chip for the DeepSeek Harness composer stats row. |
| 126 | [fubai-fenzhi/dsh-plugin-submissions](https://github.com/fubai-fenzhi/dsh-plugin-submissions) | 0 | 2026-11-22 | 2026-11-22 | DSH plugin submissions: PR-based intake with automated preflight |
| 127 | [GandalfGao/dsh-plugin-drag-reference](https://github.com/GandalfGao/dsh-plugin-drag-reference) | 0 | 2026-11-22 | 2026-11-22 | 拖动右侧文件树的文件/文件夹行进对话框（或右键），插入 @路径 引用。DSH Web 客户端插件。 |
| 128 | [GengDaPeng/dsh-git-assistant](https://github.com/GengDaPeng/dsh-git-assistant) | 0 | 2026-11-12 | 2026-11-22 | A calm, Zed-like Git workbench for DeepSeek Harness: repositories, worktrees, branches, changes, diffs, commit graph and GitHub issues — without leaving the conversation. |
| 129 | [giangnam728828-rgb/dsh-connectors](https://github.com/giangnam728828-rgb/dsh-connectors) | 0 | 2026-11-22 | 2026-11-22 | One encrypted vault for every platform credential in DeepSeek Harness: connect GitHub, GitLab, Gitee, Vercel, Cloudflare, npm and more once, reuse everywhere. |
| 130 | [GiftiaCoder/dsh-coupon](https://github.com/GiftiaCoder/dsh-coupon) | 0 | 2026-11-22 | 2026-11-22 | 给 DSH agent 的票夹：markdown 模板 + 单账户 + md5 自校验核销 + Web 面板。 |
| 131 | [Granit1846/cluster-memory](https://github.com/Granit1846/cluster-memory) | 0 | 2026-11-22 | 2026-11-22 | Keyword trail for coding agents: a layered search (trail, graph, files, history) that remembers where answers were found. Agent skill + DeepSeek Harness bundle. |
| 132 | [happyxiancong/dsh-dafeiyu-sleep](https://github.com/happyxiancong/dsh-dafeiyu-sleep) | 0 | 2026-11-22 | 2026-11-22 | 在 DSH 设置页查看和修改 AstrBot 大肥鱼睡觉插件的疲惫值、睡眠状态与作息参数。 |
| 133 | [hchao3335-maker/dsh-jobs-progress](https://github.com/hchao3335-maker/dsh-jobs-progress) | 0 | 2026-11-22 | 2026-11-22 | DSH 插件：输入框上方的后台任务进度监视器，实时百分比/分数进度、输出尾部、耗时与两键停止。Background job progress monitor for DeepSeek Harness. |
| 134 | [hechenhao9/dsh-judge-loop](https://github.com/hechenhao9/dsh-judge-loop) | 0 | 2026-11-21 | 2026-11-22 | Two rival AI teams for DeepSeek Harness: a blind professor writes the rubric, a tutor has to meet it, and every claim is checked against real files. 95 分交付 / 双团队评审 / 可核证据 |
| 135 | [hitzhangjie/dsh-plugin-github-orchestrator](https://github.com/hitzhangjie/dsh-plugin-github-orchestrator) | 0 | 2026-11-22 | 2026-11-22 | DeepSeek Harness plugin: GitHub event inbox, OAuth sign-in, concurrent Git worktrees, rebase/merge/cleanup, and an issue-based storyboard. |
| 136 | [hjt458/dsh-mc-compiler](https://github.com/hjt458/dsh-mc-compiler) | 0 | 2026-11-22 | 2026-11-22 | DeepSeek Harness plugin: compile ProgrammableFurnace .mc scripts from a sidebar panel or the mc_compile tool. |
| 137 | [HLhhh/d-trash](https://github.com/HLhhh/d-trash) | 0 | 2026-11-22 | 2026-11-22 | Recycle bin for DeepSeek Harness sessions: move to trash, restore, and physically delete local session logs — with a persistent audit log. |
| 138 | [horrorguitarmutsumi/dsh-github-first-search](https://github.com/horrorguitarmutsumi/dsh-github-first-search) | 0 | 2026-11-22 | 2026-11-22 | GitHub-first search for DeepSeek Harness (DSH) — the agent searches GitHub before any web search, news included. Rust engine + thin JS shell. |
| 139 | [i2v-ai/dsh-linear-desk](https://github.com/i2v-ai/dsh-linear-desk) | 0 | 2026-11-22 | 2026-11-22 | Read Linear issues inside DeepSeek Harness without leaving the app: a sidebar desk panel backed by the Linear MCP tools. |
| 140 | [iimaguest/dsh-blender-annotate](https://github.com/iimaguest/dsh-blender-annotate) | 0 | 2026-11-22 | 2026-11-22 | Blender .blend preview and precise surface-point annotation for DeepSeek Harness: object, face, edge, vertex, UV and revision-bound references sent to chat. |
| 141 | [ikoude/dsh-cnb2api](https://github.com/ikoude/dsh-cnb2api) | 0 | 2026-11-22 | 2026-11-22 | 在 DSH 里使用你自己 CNB 工作区的 cnb2api 网关。 |
| 142 | [iuhgnauh/dsh-chatgpt](https://github.com/iuhgnauh/dsh-chatgpt) | 0 | 2026-11-22 | 2026-11-22 | Unofficial DeepSeek Harness plugin to connect a ChatGPT subscription via Codex OAuth. |
| 143 | [iuhgnauh/dsh-meta](https://github.com/iuhgnauh/dsh-meta) | 0 | 2026-11-22 | 2026-11-22 | Unofficial DeepSeek Harness plugin for model metadata suggestions and provider normalization. |
| 144 | [iuhgnauh/dsh-sound](https://github.com/iuhgnauh/dsh-sound) | 0 | 2026-11-22 | 2026-11-22 | Unofficial DeepSeek Harness plugin to play local sound cues on task completion, errors, or attention. |
| 145 | [JacobYixi/dsh-whale-ball](https://github.com/JacobYixi/dsh-whale-ball) | 0 | 2026-11-22 | 2026-11-22 | 鲸尾悬浮球 — a Windows floating ball for DeepSeek Harness, forked from dsh-desktop-ball: theme skins with real weave, colour modes, click-toggle, edge peek. |
| 146 | [JacobYixi/ladybug-yoyo-pomodoro](https://github.com/JacobYixi/ladybug-yoyo-pomodoro) | 0 | 2026-11-22 | 2026-11-22 | 瓢虫少女悠悠球番茄钟 · Ladybug Yoyo Pomodoro — a fan-made round yoyo focus timer widget for DeepSeek Harness. |
| 147 | [jediliu005/dsh-session-communicate](https://github.com/jediliu005/dsh-session-communicate) | 0 | 2026-11-13 | 2026-11-22 | 让两个 DSH 会话按规则、定时、自动对话若干轮的插件 |
| 148 | [jiexusheng2121/dsh-chinglish](https://github.com/jiexusheng2121/dsh-chinglish) | 0 | 2026-11-22 | 2026-11-22 | 把 AI 中文回复里的几个词换成你词库里的英文单词 · Sprinkle your English words into Chinese replies (DSH plugin, zero extra tokens) |
| 149 | [jing-qifeng/dsh-quit-delete](https://github.com/jing-qifeng/dsh-quit-delete) | 0 | 2026-11-22 | 2026-11-22 | DeepSeek Harness plugin: /quit-delete slash command — leave the current session and permanently delete its stored log (not an archive). |
| 150 | [jinqianxi/dsh-plugin-wechat-drop](https://github.com/jinqianxi/dsh-plugin-wechat-drop) | 0 | 2026-11-22 | 2026-11-22 | Drag macOS WeChat merged chat record ZIPs directly onto the DeepSeek Harness composer as standard attachments. |
| 151 | [JoblessJoe/dsh-connectors](https://github.com/JoblessJoe/dsh-connectors) | 0 | 2026-11-22 | 2026-11-22 | Claude-style connectors for DeepSeek Harness (dsh): add any MCP server from the sidebar, OAuth sign-in (also on headless servers), auto token refresh and reconnect. |
| 152 | [jwitmann/vcc-brain](https://github.com/jwitmann/vcc-brain) | 0 | 2026-11-20 | 2026-11-22 | The self-improving context engine for coding agents — durable Markdown brain with deterministic context management. No RAG, no embeddings. |
| 153 | [kanekogaido/dsh-session-mailbox](https://github.com/kanekogaido/dsh-session-mailbox) | 0 | 2026-11-22 | 2026-11-22 | Cross-session messaging for DeepSeek Harness: send messages between top-level sessions with sender attribution. |
| 154 | [keao587/dsh-scout](https://github.com/keao587/dsh-scout) | 0 | 2026-11-22 | 2026-11-22 | DSH 插件：动手前先侦察。/scout 一轮搜遍 B站 / GitHub / skill，给带链接的候选清单；只读不装，带调研台账。 |
| 155 | [kenLiaowj/dsh-earnings-clock](https://github.com/kenLiaowj/dsh-earnings-clock) | 0 | 2026-11-22 | 2026-11-22 | DeepSeek Harness plugin: live earnings dock above the composer, from preset work hours and daily wage (zh/en, theme-aware). |
| 156 | [KhalilYamber/dsh-ZZZagent-skins](https://github.com/KhalilYamber/dsh-ZZZagent-skins) | 0 | 2026-11-22 | 2026-11-22 | Remielle Dan —— DeepSeek Harness（DSH）Web 主题插件：深蓝玻璃外观 + 蕾米埃尔背景 + 输入区紫色强调。不依赖皮肤中心。 |
| 157 | [KILLSTARSX/dsh-bili-gate](https://github.com/KILLSTARSX/dsh-bili-gate) | 0 | 2026-11-22 | 2026-11-22 | In-process gate for dsh-bili-eyes: routes Bilibili inbox messages into a DSH session so the model can reply itself. |
| 158 | [KILLSTARSX/dsh-web-search-rss](https://github.com/KILLSTARSX/dsh-web-search-rss) | 0 | 2026-11-22 | 2026-11-22 | DSH 搜索不花钱：抓 cn.bing / bing / google 结果页，滤广告、鉴官网；抓不动就借 DSH 内置搜索，或接 Brave / Tavily / Serper / 自定义接口 |
| 159 | [king-andthe-nice/dsh-plugin-opencode2api](https://github.com/king-andthe-nice/dsh-plugin-opencode2api) | 0 | 2026-11-22 | 2026-11-22 | Unofficial one-click installer and auto-runner for opencode2api (GPL-3.0-or-later) — a local free OpenAI-compatible API gateway — inside DSH, with a desktop settings page and a dsh-go native panel (Windows, macOS, Linux, Android). |
| 160 | [KirinMiao/dsh-construction](https://github.com/KirinMiao/dsh-construction) | 0 | 2026-11-22 | 2026-11-22 | DSH plugin: split a long task into verifiable slices, measure context pressure, and hand off to a fresh session with a written handoff note. |
| 161 | [KouzakiUmi/dsh-opendesign-corouter](https://github.com/KouzakiUmi/dsh-opendesign-corouter) | 0 | 2026-10-26 | 2026-11-22 | OpenDesign CoRouter for DeepSeek Harness: dual Providers, layered quotas, desktop/console login, and empty-turn monitoring. |
| 162 | [kui2331/dsh-team-coordinator](https://github.com/kui2331/dsh-team-coordinator) | 0 | 2026-11-22 | 2026-11-22 | 协作统筹：为 DeepSeek Harness 添加按任务选择已授权模型的多代理协作预设。 |
| 163 | [kzhw615/dsh-conversation-lock](https://github.com/kzhw615/dsh-conversation-lock) | 0 | 2026-11-22 | 2026-11-22 | Per-conversation lock for DeepSeek Harness: decide whether other agents may send messages into a conversation, with an in-conversation unlock control |
| 164 | [L0LI0N/dsh-tool-video-watermark](https://github.com/L0LI0N/dsh-tool-video-watermark) | 0 | 2026-11-22 | 2026-11-22 | Remove static translucent video watermarks by alpha un-blending — a DeepSeek Harness tool plugin |
| 165 | [lanmeigezi/dsh-continuation](https://github.com/lanmeigezi/dsh-continuation) | 0 | 2026-11-22 | 2026-11-22 | DSH plugin: auto-continue truncated model responses at the llm/stream layer |
| 166 | [Lanxi-you/dsh-circadian](https://github.com/Lanxi-you/dsh-circadian) | 0 | 2026-11-22 | 2026-11-22 | DSH 节律插件：从机器活动和真实轮次里读出「醒着多久 / 精力几成 / 昨夜睡了多久」，到点还能自己叫自己一声 |
| 167 | [lastseek/dsh-aurora-glass](https://github.com/lastseek/dsh-aurora-glass) | 0 | 2026-11-22 | 2026-11-22 | A dark glass skin for DeepSeek Harness: one translucent sheet over a wallpaper, with a wallpaper and opacity panel. |
| 168 | [Lee2277-t/awesome-lee2277](https://github.com/Lee2277-t/awesome-lee2277) | 0 | 2026-11-22 | 2026-11-22 | 一套自用的工具：DeepSeek Harness 插件 + 审计/文档/媒体离线工具。全部本机运行。 |
| 169 | [leonlowery507-png/dsh-obsidian-prism](https://github.com/leonlowery507-png/dsh-obsidian-prism) | 0 | 2026-11-22 | 2026-11-22 | Obsidian Prism (黑曜棱镜) port for DeepSeek Harness (dsh) — Optical themes, telemetry vial, starfield effort slider, pixel whale family companions, ink streaming &amp; thought translator (GPL-3.0) |
| 170 | [lexleizou/dsh-codex-inline](https://github.com/lexleizou/dsh-codex-inline) | 0 | 2026-11-22 | 2026-11-22 | Codex-inspired inline Skill names and website icons in the DeepSeek Harness composer. |
| 171 | [Liang-HZ/dsh-acp-hub](https://github.com/Liang-HZ/dsh-acp-hub) | 0 | 2026-11-22 | 2026-11-22 | Delegate tasks asynchronously to external ACP agents (MiniMax, OpenCode, Codex, Claude Code, CodeBuddy, Qoder, ZCode, Gemini) in DeepSeek Harness with live native child-session streaming, per-step token accounting, and dynamic session MCP linkage. |
| 172 | [light-cheng/DSH-Slate](https://github.com/light-cheng/DSH-Slate) | 0 | 2026-11-22 | 2026-11-22 | Workspace-isolated, evidence-backed project progress tracker in the DeepSeek Harness right sidebar. |
| 173 | [lin-0407/dsh-model-capability-autofill](https://github.com/lin-0407/dsh-model-capability-autofill) | 0 | 2026-11-22 | 2026-11-22 | DeepSeek Harness 插件：从 API 中转站/网关导入模型后自动补齐推理挡位(reasoningEfforts)与识图(input)，模型选择器可调思考强度、输入框可贴图。Auto-fill reasoning effort and vision for llm-pi-ai relay models. |
| 174 | [Lin-Liszt/dsh-aemeath-theme](https://github.com/Lin-Liszt/dsh-aemeath-theme) | 0 | 2025-12-06 | 2026-11-22 | Aemeath (Wuthering Waves) theme for DeepSeek Harness: pixel window frame, holographic card, 4K splash, video backdrops. |
| 175 | [lokeshvara123/dsh-local-crawler](https://github.com/lokeshvara123/dsh-local-crawler) | 0 | 2026-11-22 | 2026-11-22 | Local-first web crawling tools for DeepSeek Harness: scrape to Markdown, map links, crawl sites, extract structured JSON with an LLM - no cloud scraping service, no credits. |
| 176 | [lonyness/dsh-rust-anything](https://github.com/lonyness/dsh-rust-anything) | 0 | 2026-11-22 | 2026-11-22 | Unofficial DeepSeek Harness plugin for rust-anything: record existing behavior and verify incremental Rust ports. |
| 177 | [lovcoxin/dsh-plugin-universal-preview](https://github.com/lovcoxin/dsh-plugin-universal-preview) | 0 | 2026-11-21 | 2026-11-22 | dsh-plugin |
| 178 | [Luciferhhha/dsh-msg-retract](https://github.com/Luciferhhha/dsh-msg-retract) | 0 | 2026-10-22 | 2026-11-22 | dsh-msg-retract，dsh的消息撤回 |
| 179 | [Lukeluoluo/dsh-trip-agent](https://github.com/Lukeluoluo/dsh-trip-agent) | 0 | 2026-11-08 | 2026-11-22 | 完全可以实用的旅游agent，能实时输出所有花销，天气，酒店餐厅路况甚至路线规划 |
| 180 | [luonianxin/dsh-mcp-studio](https://github.com/luonianxin/dsh-mcp-studio) | 0 | 2026-11-22 | 2026-11-22 | Visual MCP service management in DSH Settings: connections, tool schemas, debugging, resources, per-tool Agent permissions, and native MCP source browsing. |
| 181 | [LuosuQWQ/dsh-diagram](https://github.com/LuosuQWQ/dsh-diagram) | 0 | 2026-11-21 | 2026-11-22 | Render diagrams, page screenshots and annotated images to PNG inside DeepSeek Harness answers — zero dependencies, uses the Chrome/Edge already installed. |
| 182 | [LuosuQWQ/dsh-drawing-tools](https://github.com/LuosuQWQ/dsh-drawing-tools) | 0 | 2026-11-21 | 2026-11-22 | Twelve local ComfyUI drawing tools and the 极简绘画 agent preset for DeepSeek Harness: generate, audit PNG recipes, find and install missing models, normalize paths. |
| 183 | [LuosuQWQ/dsh-ui-appearance](https://github.com/LuosuQWQ/dsh-ui-appearance) | 0 | 2026-11-21 | 2026-11-22 | Wallpapers, glass panels and chat styling for the DeepSeek Harness web UI. |
| 184 | [lvrayman/dsh-worktree-groups](https://github.com/lvrayman/dsh-worktree-groups) | 0 | 2026-11-22 | 2026-11-22 | DeepSeek Harness 插件：接管侧栏工作区列表（sidebar.workspaces），把会话按「项目 → Git Worktree → 会话」三级分组管理。 |
| 185 | [Lyuunz/dsh-auto-workspace](https://github.com/Lyuunz/dsh-auto-workspace) | 0 | 2026-11-22 | 2026-11-22 | DSH 桌面端插件：每个新会话自动获得一个以时间命名的独立工作区，侧栏分为「近期 / 置顶 / 快速会话 / 工作区」四段 |
| 186 | [M0Yun/dsh-computer-control](https://github.com/M0Yun/dsh-computer-control) | 0 | 2026-11-22 | 2026-11-22 | DeepSeek Harness 插件：控制电脑（点得准、看得见、验得出来）与观看学习两种状态，可主动切换。 |
| 187 | [m78bzatmsk-spec/dsh-mskx.1.1](https://github.com/m78bzatmsk-spec/dsh-mskx.1.1) | 0 | 2026-11-22 | 2026-11-22 | 一个为 DSH（DeepSeek Harness）设计的冥想插件。写代码的间隙，让 AI 陪你深呼吸。  在 DSH 里高频对话、高强度写代码，很容易一坐就是几个小时。这个插件把「正念冥想」嵌进你的工作流：不需要打开任何 App，在DSH内就可以做冥想。 |
| 188 | [magalz/dsh-claude-sidebar](https://github.com/magalz/dsh-claude-sidebar) | 0 | 2026-11-22 | 2026-11-22 | Claude-desktop-style right sidebar for DeepSeek Harness (dsh): icon rail, Environment, Git, Jobs and Subagents tabs, a Run button for chat code blocks, pane sizing and an open_in_browser tool. |
| 189 | [mashago/dsh-im-cron](https://github.com/mashago/dsh-im-cron) | 0 | 2026-11-21 | 2026-11-22 | A DeepSeek Harness (DSH) plugin for dsh-im — adds scheduled notify / script / agent tasks to IM chats |
| 190 | [mcxufly/dsh-kde-color-scheme](https://github.com/mcxufly/dsh-kde-color-scheme) | 0 | 2026-11-22 | 2026-11-22 | Follow KDE Plasma light and dark mode in DeepSeek Harness Desktop via the XDG Settings portal. |
| 191 | [metaimagine/dsh-web-inspect](https://github.com/metaimagine/dsh-web-inspect) | 0 | 2026-11-22 | 2026-11-22 | Element inspector for the DSH right-sidebar HTML preview: hover-highlight, click-select, insert the element context as a folded reference chip. |
| 192 | [MHTG001/dsh-xiaoyu-go](https://github.com/MHTG001/dsh-xiaoyu-go) | 0 | 2026-11-22 | 2026-11-22 | 小鱼 DSH-Go 手机插件 · 云端提示词按模型自动匹配 |
| 193 | [moluz/sticky-board](https://github.com/moluz/sticky-board) | 0 | 2026-11-22 | 2026-11-22 | DeepSeek Harness Web UI 插件：便签墙 + 任务板（自由便签墙与拖拽看板共用一份数据，附 14 个模型工具） |
| 194 | [Myer921/dsh-container-manager](https://github.com/Myer921/dsh-container-manager) | 0 | 2026-11-22 | 2026-11-22 | DSH 容器台：Cockpit 风格面板 + AI 工具，管 Podman 与 LXC |
| 195 | [nashihang777/dsh-talent-workbench](https://github.com/nashihang777/dsh-talent-workbench) | 0 | 2026-11-22 | 2026-11-22 | 本地优先的人才匹配工作台：DeepSeek Harness 插件，19 个可版本化考察维度、13 个岗位模板、智能体识别的简历导入、逐维可解释推导；在 DSH 中「插件 → 添加插件」输入 @nashihang777/dsh-talent-workbench 安装。 |
| 196 | [naturalth2012/middle-earth-atlas](https://github.com/naturalth2012/middle-earth-atlas) | 0 | 2026-11-21 | 2026-11-22 | A canon-aware atlas of The Lord of the Rings for DeepSeek Harness: 55 characters, 202 relationships, an interactive graph, timeline, places, artifacts, quotes and book-vs-screen differences. |
| 197 | [NoahQiao/dsh-evoontology-noahversion](https://github.com/NoahQiao/dsh-evoontology-noahversion) | 0 | 2026-11-22 | 2026-11-22 | EvoOntology (self-evolving ontology layer for data agents) ported to a DeepSeek Harness plugin. |
| 198 | [North40404/dsh-podbridge](https://github.com/North40404/dsh-podbridge) | 0 | 2026-11-22 | 2026-11-22 | 肥鱼自己编写的桥接pod-app聊天软件的插件 |
| 199 | [North40404/dsh-tick](https://github.com/North40404/dsh-tick) | 0 | 2026-11-22 | 2026-11-22 | 肥鱼自己编写的定时任务插件 |
| 200 | [NorwinYu/dsh-deepseek-asr](https://github.com/NorwinYu/dsh-deepseek-asr) | 0 | 2026-11-21 | 2026-11-22 | Cloud speech-to-text for DeepSeek Harness voice input, backed by DeepSeek's paid ASR API. No local model download. |
| 201 | [NorwinYu/dsh-session-consult](https://github.com/NorwinYu/dsh-session-consult) | 0 | 2026-11-22 | 2026-11-22 | Consult another DeepSeek Harness session: read-only, bounded digest, provenance-labelled. A tool plugin for dsh. |
| 202 | [NULLCOLORcat/dsh-Smarter-Subagent-level](https://github.com/NULLCOLORcat/dsh-Smarter-Subagent-level) | 0 | 2026-11-20 | 2026-11-22 | 针对于 DSH Agent Team的模型调用扩展 |
| 203 | [Octo-o-o-o/dsh-audit-ledger](https://github.com/Octo-o-o-o/dsh-audit-ledger) | 0 | 2026-11-22 | 2026-11-22 | Tamper-evident SHA-256 hash-chained audit ledger, OutputEvidence versioning, and L0-L3 compliance export plugin for DeepSeek Harness (dsh@0.2.2-rc.5). |
| 204 | [Octo-o-o-o/dsh-camel-hitl](https://github.com/Octo-o-o-o/dsh-camel-hitl) | 0 | 2026-11-22 | 2026-11-22 | Runtime CaMeL/Lethal-Trifecta taint tracking, monotonic ctx.tools.guard() enforcement, protected-path blocking, and digest-bound strong HITL confirmations for DeepSeek Harness (dsh@0.2.2-rc.5). |
| 205 | [Octo-o-o-o/dsh-grounding-guard](https://github.com/Octo-o-o-o/dsh-grounding-guard) | 0 | 2026-11-22 | 2026-11-22 | Deterministic anti-hallucination evidence bus, reverse quote locator, truncated-read guard, zero-authored-number answerBlocks, write receipts, and optional fail-closed NLI judge for DeepSeek Harness (dsh@0.2.2-rc.5). |
| 206 | [Octo-o-o-o/dsh-local-kb](https://github.com/Octo-o-o-o/dsh-local-kb) | 0 | 2026-11-22 | 2026-11-22 | Local-first deterministic knowledge base plugin for DeepSeek Harness (dsh@0.2.2-rc.5) powered by Node 26 node:sqlite dual FTS5 (CJK bigram + trigram) and safe OOXML extraction. |
| 207 | [Octo-o-o-o/dsh-self](https://github.com/Octo-o-o-o/dsh-self) | 0 | 2026-11-22 | 2026-11-22 | Turn any DeepSeek Harness workflow into an isolated, standalone desktop client — pack once with pinned dsh &amp; plugin versions and share installers directly. |
| 208 | [ohmyskyhigh/oh-my-dsh-fleet](https://github.com/ohmyskyhigh/oh-my-dsh-fleet) | 0 | 2026-11-22 | 2026-11-22 | 把 DSH 当成一家公司来经营。DeepSeek Harness 多 Agent 工作流插件。以 Workspace 管运营，多张 Ticket 各按 SOP 推进。Agent 与人工审核可退回指定节点返工，交付物保留版本。 Run DSH like a company. A multi-agent workflow plugin for DeepSeek Harness with Ticket-based SOPs, agent and human review gates, targeted rework, and versioned deliverables. |
| 209 | [onup-1/dsh-github-guard](https://github.com/onup-1/dsh-github-guard) | 0 | 2026-11-22 | 2026-11-22 | DSH plugin: keeps github.com reachable by pinning a working edge address only while you are using GitHub |
| 210 | [onup-1/dsh-mod-build-auto-approve](https://github.com/onup-1/dsh-mod-build-auto-approve) | 0 | 2026-11-22 | 2026-11-22 | DSH plugin: auto-approves Minecraft mod-build sandbox escalations and learns approval keywords |
| 211 | [onup-1/dsh-permission-plan](https://github.com/onup-1/dsh-permission-plan) | 0 | 2026-11-22 | 2026-11-22 | DSH plugin: one approval dialog for everything a task will need, then keyword memory instead of per-command prompts |
| 212 | [PABIPRG/investment-research-agent](https://github.com/PABIPRG/investment-research-agent) | 0 | 2026-10-21 | 2026-11-22 | 投研智能体 |
| 213 | [person-clouds/dsh-workbench-panel](https://github.com/person-clouds/dsh-workbench-panel) | 0 | 2026-11-22 | 2026-11-22 | DSH 只读工作台：工作区/会话、仓库文件树与 blob、Markdown 文档索引、显式归档 |
| 214 | [PHANTOM-NINE/dsh-gloss](https://github.com/PHANTOM-NINE/dsh-gloss) | 0 | 2026-11-22 | 2026-11-22 | Select-to-look-up English terminology glosses for DeepSeek Harness — instant IPA + Chinese technical definitions, technical senses first, zero config changes. |
| 215 | [QIFANAI/dsh-startup-jarvis](https://github.com/QIFANAI/dsh-startup-jarvis) | 0 | 2026-11-22 | 2026-11-22 | JARVIS · 钢铁侠 — DeepSeek Harness 启动动画 + UI 皮肤插件（v0.3.9 完整素材开源版）：30.2s 冷启动电影 + 金红交接 + HUD 玻璃操作界面 + 设置页。代码 MIT，素材随仓库完整发布。 |
| 216 | [qinziang/dsh-session-folders](https://github.com/qinziang/dsh-session-folders) | 0 | 2026-11-22 | 2026-11-22 | DSH plugin that gives every conversation its own workspace subfolder, with title sync, archive hiding, safe deletion, empty-folder cleanup, and ASCII-junction paths. |
| 217 | [qq1299235059/dsh-antigravity-acp](https://github.com/qq1299235059/dsh-antigravity-acp) | 0 | 2026-11-22 | 2026-11-22 | Dual-mode Antigravity ACP (agy CLI 1.5.x) plugin for DeepSeek Harness (DSH): LlmAdapter with private MCP tool bridge + autonomous SubagentProvider |
| 218 | [QuChen-D/saibo_kanban](https://github.com/QuChen-D/saibo_kanban) | 0 | 2026-11-22 | 2026-11-22 | AI ????????:????????????? token ???DeepSeek Harness ??? |
| 219 | [qybaihe/dsh-pstack](https://github.com/qybaihe/dsh-pstack) | 0 | 2026-11-22 | 2026-11-22 | pstack for DeepSeek Harness: poteto-mode's skills, with the rules a harness can enforce moved into the runtime. |
| 220 | [r0eXpeR/dsh-edge-audit](https://github.com/r0eXpeR/dsh-edge-audit) | 0 | 2026-11-22 | 2026-11-22 | EdgeAudit 是 DeepSeek Harness（DSH）的代码安全审计插件。 |
| 221 | [r56661828-cloud/dsh-agentmemory-hooks-bundle](https://github.com/r56661828-cloud/dsh-agentmemory-hooks-bundle) | 0 | 2026-11-22 | 2026-11-22 | Carrier bundle that puts @deepseek-ai/dsh-hooks-claude-code back into a DSH profile and points it at an existing Claude Code hooks.json. |
| 222 | [r56661828-cloud/dsh-auth-refresh](https://github.com/r56661828-cloud/dsh-auth-refresh) | 0 | 2026-11-22 | 2026-11-22 | Secure one-click relogin for the DSH web UI: a Service Worker catches 401 navigations and exchanges a fresh signed cookie behind a loopback fence. The token never leaves this machine. |
| 223 | [r56661828-cloud/dsh-session-radar](https://github.com/r56661828-cloud/dsh-session-radar) | 0 | 2026-11-22 | 2026-11-22 | Session radar for the DSH Web GUI: sessions grouped by workspace with running/completed/failed states, unread marks kept on the host so they agree across browsers. |
| 224 | [r56661828-cloud/dsh-updater](https://github.com/r56661828-cloud/dsh-updater) | 0 | 2026-11-22 | 2026-11-22 | In-app updater for DeepSeek Harness: checks the latest release, walks through install and restart, then re-runs a self-check so a broken upgrade is visible. |
| 225 | [Raysnows/dsh-codearts-complete](https://github.com/Raysnows/dsh-codearts-complete) | 0 | 2026-11-22 | 2026-11-22 | DSH tool: fill a block of code at a cursor position via Huawei Cloud CodeArts (thinking disabled). |
| 226 | [rigelmansid/dsh-flick](https://github.com/rigelmansid/dsh-flick) | 0 | 2026-11-22 | 2026-11-22 | Approve DeepSeek Harness permission requests from any window — a lightweight macOS menu bar companion with recent sessions and a ⌥⌘D hotkey. |
| 227 | [rong-mo/dsh-plugin-render-fix](https://github.com/rong-mo/dsh-plugin-render-fix) | 0 | 2026-11-22 | 2026-11-22 | 插件渲染修复 / Plugins render fix — URL.canParse polyfill + recovery card for the permanently blank Plugins panel |
| 228 | [saulgoodman174/dsh-python-tools](https://github.com/saulgoodman174/dsh-python-tools) | 0 | 2026-11-22 | 2026-11-22 | DSH plugin: run trusted Python scripts in the workspace, extract text from searchable PDFs, and export DOCX to PDF through Microsoft Word. |
| 229 | [saylordevs/dsh-plugin-deepseek-orca](https://github.com/saylordevs/dsh-plugin-deepseek-orca) | 0 | 2026-11-22 | 2026-11-22 | A draggable DeepSeek companion that follows your sessions and surfaces approvals from other sessions. |
| 230 | [saylordevs/dsh-plugin-theme-packs](https://github.com/saylordevs/dsh-plugin-theme-packs) | 0 | 2026-11-22 | 2026-11-22 | Editor color themes for the DeepSeek Harness web interface, with a picker in Settings. |
| 231 | [scottzhb-hue/dsh-ai-translation](https://github.com/scottzhb-hue/dsh-ai-translation) | 0 | 2026-11-22 | 2026-11-22 | AI-aided translation, inside DeepSeek Harness. Based on dsh-cait by JoviLecca. |
| 232 | [Serius117/pixelbar-one-look-public](https://github.com/Serius117/pixelbar-one-look-public) | 0 | 2026-11-17 | 2026-11-22 | 将 花再 PixelBar 音箱变成 Agent工具状态灯的 OpenCode + Deepseek Harness 插件。通过调节音箱灯效/led屏幕显示信息，使得音箱可以实时显示 Agent 状态：等审批 / 执行中 / 出错 / 完成。 多会话聚合，LED 文字屏直显项目名，Web 控制台实时监控。 |
| 233 | [Shirolin/dsh-theme-splat-ui](https://github.com/Shirolin/dsh-theme-splat-ui) | 0 | 2026-11-14 | 2026-11-22 | SPLAT-STREET · DeepSeek Harness 主题（斯普拉遁风格） |
| 234 | [shoutingyihui/dsh-client-ui-netease-lyrics-wallpaper](https://github.com/shoutingyihui/dsh-client-ui-netease-lyrics-wallpaper) | 0 | 2026-11-22 | 2026-11-22 | Netease CloudMusic lyric wallpaper plugin for the DeepSeek Harness Web UI |
| 235 | [showcodehk/dsh-llm-tdai](https://github.com/showcodehk/dsh-llm-tdai) | 0 | 2026-11-22 | 2026-11-22 | DeepSeek Harness (DSH) plugin supplies the session and compaction request headers that DSH's llm-pi-ai channel leaves out, so TencentDB Agent Memory (TDAI) can attribute every request of a conversation to the same session, and can recognise a context-compaction call as an auxiliary request. |
| 236 | [sleeping112/dsh-spend-wallpaper](https://github.com/sleeping112/dsh-spend-wallpaper) | 0 | 2026-11-09 | 2026-11-22 | 按「最近 1 小时消耗的 DeepSeek 余额」切换 DSH Web GUI 背景壁纸的插件。内置一套程序化生成的「深海情绪」素材（5 档 × 静态 WebP + 动态 WebM 循环视频），也支持自定义素材包。 |
| 237 | [soffits/dsh-card-board](https://github.com/soffits/dsh-card-board) | 0 | 2026-11-17 | 2026-11-22 | A data-driven card board for the DeepSeek Harness Web UI: scripts write JSON cards, each person sees their own boards |
| 238 | [soffits/dsh-file-download](https://github.com/soffits/dsh-file-download) | 0 | 2026-11-22 | 2026-11-22 | A Download button in the DeepSeek Harness Web document preview, so files can be saved from a phone or any remote browser. |
| 239 | [soffits/dsh-matrix-bot](https://github.com/soffits/dsh-matrix-bot) | 0 | 2026-11-16 | 2026-11-22 | Matrix bot for DeepSeek Harness: end-to-end encrypted, a private Space per person, one room per session. |
| 240 | [soffits/dsh-sealed-files](https://github.com/soffits/dsh-sealed-files) | 0 | 2026-11-18 | 2026-11-22 | End-to-end encrypted files and notes for DeepSeek Harness: encrypted in the browser, streamed with seeking, shared with your assistant. |
| 241 | [soffits/dsh-session-model](https://github.com/soffits/dsh-session-model) | 0 | 2026-11-21 | 2026-11-22 | Keep a model picked in a DeepSeek Harness session in that session |
| 242 | [soffits/dsh-subagent-model](https://github.com/soffits/dsh-subagent-model) | 0 | 2026-11-16 | 2026-11-22 | Read-only model label in the DSH Web UI composer of subagent sessions |
| 243 | [soffits/dsh-ui-actions](https://github.com/soffits/dsh-ui-actions) | 0 | 2026-11-17 | 2026-11-22 | Shared action buttons for DeepSeek Harness plugin pages, and chat about an item as a card |
| 244 | [soffits/dsh-work](https://github.com/soffits/dsh-work) | 0 | 2026-11-17 | 2026-11-22 | DeepSeek Harness work page: board columns and a group chat per issue, over a board command line and DSH sessions |
| 245 | [ssstry2635/sry-research-atlas](https://github.com/ssstry2635/sry-research-atlas) | 0 | 2026-11-19 | 2026-11-22 | SRY Research Atlas: bilateral knowledge graph, multi-source scholarly retrieval (OpenAlex, Crossref, Europe PMC, arXiv), bilingual summaries, relational verbatim mind maps, open-access PDF proxy, and native DSH conversation integration. |
| 246 | [Stook-404/dsh-trigger-prompts](https://github.com/Stook-404/dsh-trigger-prompts) | 0 | 2026-11-22 | 2026-11-22 | DSH 插件:把各已装插件注册给 Agent 的工具描述(触发提示词)汇总成「触发词」面板,可搜索、一键复制、可置顶。入口在「对话/轨迹/画廊」右侧。 |
| 247 | [SZX-080425/dsh-prompt-organizer](https://github.com/SZX-080425/dsh-prompt-organizer) | 0 | 2026-11-22 | 2026-11-22 | Prompt Organizer for DeepSeek Harness: fragmented notes in, researched brief and a paste-ready prompt or project plan out. |
| 248 | [Takinan/dsh-message-quick-search](https://github.com/Takinan/dsh-message-quick-search) | 0 | 2026-11-22 | 2026-11-22 | 在 DSH 侧栏和标题栏搜索本机全部历史消息：支持当前/全部/指定会话，命中可看全文并前后翻页。 \| Search all local DSH history from the sidebar or header; scope to current/all/selected sessions, read any hit in full and step to neighbours. |
| 249 | [Tangwei227/dsh-asc](https://github.com/Tangwei227/dsh-asc) | 0 | 2026-08-29 | 2026-11-22 | App Store Connect CLI (asc) as a native tool for DeepSeek Harness — structured argv, JSON output, no-shell execution. |
| 250 | [Tanjintao2/dsh-version-history](https://github.com/Tanjintao2/dsh-version-history) | 0 | 2026-11-22 | 2026-11-22 | DSH sidebar plugin: git repo history + disk health/SMART + LAN git sharing + GitHub push |
| 251 | [tfcheng80808080/dsh-token-budget](https://github.com/tfcheng80808080/dsh-token-budget) | 0 | 2026-11-22 | 2026-11-22 | Token/Money budget per conversation for DeepSeek Harness |
| 252 | [TGSWYH/dsh-plugin-update](https://github.com/TGSWYH/dsh-plugin-update) | 0 | 2026-11-22 | 2026-11-22 | 从 DSH 外部更新第三方插件，绕开市场里「正在被占用」——DSH 运行时占用插件文件导致 pnpm 无法替换，本工具在 DSH 完全退出后直接调用 pnpm 完成更新。 |
| 253 | [TLEWA/dsh-image-formats](https://github.com/TLEWA/dsh-image-formats) | 0 | 2026-11-20 | 2026-11-22 | AVIF/TIFF/SVG support for DSH read_image and the composer, converting to PNG automatically. |
| 254 | [TLEWA/dsh-ps51-guard](https://github.com/TLEWA/dsh-ps51-guard) | 0 | 2026-11-16 | 2026-11-22 | DSH plugin: guard Windows PowerShell 5.1 commands issued through ops_bash with UTF-16LE transfer, compatibility rewrites and result normalization. 为通过 ops_bash 调用的 PowerShell 5.1 提供命令传输保护、兼容改写与结果归一化。 |
| 255 | [tonymingyang-prog/definition-logic](https://github.com/tonymingyang-prog/definition-logic) | 0 | 2026-11-21 | 2026-11-22 | 定义逻辑 · 可参数化的 PPT 逻辑图体系：44 个图形原子 / 15 种图纸 / 80 页模板映射 / 可编辑 PPTX + SVG |
| 256 | [useragent-1/dsh-cnb](https://github.com/useragent-1/dsh-cnb) | 0 | 2026-11-19 | 2026-11-22 | cnb |
| 257 | [utiwaaaaaien/DeepSeekDesign](https://github.com/utiwaaaaaien/DeepSeekDesign) | 0 | 2026-11-22 | 2026-11-22 | Code animation workbench for DeepSeek Harness · DeepSeek Harness 代码动画工作台 |
| 258 | [VicissitudeYW/dsh-message-toolbar](https://github.com/VicissitudeYW/dsh-message-toolbar) | 0 | 2026-10-24 | 2026-11-22 | 给每个消息增加「工具栏」 |
| 259 | [Vikrant-Aleph/dsh-exa-tools](https://github.com/Vikrant-Aleph/dsh-exa-tools) | 0 | 2026-11-21 | 2026-11-22 | 无需API Key给DSH接入Exa的免费搜索和Fetch工具，也可以填入API Key获得更好体验。\|  Free Exa search and fetch tools for DSH, no API key required. Add an API key for a better experience. |
| 260 | [wahhheee/stash](https://github.com/wahhheee/stash) | 0 | 2026-11-11 | 2026-11-22 | DeepSeek Harness（DSH）本地记忆插件。同一工作区的会话共享规则和笔记，分叉后可独立编辑记忆，也能按引用找回原始对话。Local memory for DSH with shared workspace notes, per-session memory, and searchable chat history. |
| 261 | [Wang666645/cnki-lit](https://github.com/Wang666645/cnki-lit) | 0 | 2026-11-22 | 2026-11-22 | CNKI 文献检索/下载/综述插件：经上财机构权限（CARSI）访问知网，供 DSH 使用 |
| 262 | [wangbulinxi/dsh-meta-theory](https://github.com/wangbulinxi/dsh-meta-theory) | 0 | 2026-11-22 | 2026-11-22 | 把随口一句需求翻译成该领域的成熟方法论再开工：开工前定主理论与辅助理论并给出组合链路，写完后按 8 条翻车模式逐项校验，防止只堆理论名词而不改变做法。附带理论前置技能与 AGENTS.md 规则注入。 |
| 263 | [wbx1217/dsh-peripheral-battery](https://github.com/wbx1217/dsh-peripheral-battery) | 0 | 2026-11-21 | 2026-11-22 | dsh外设电量显示插件 |
| 264 | [weichaohao41-oss/dsh-shot-snap](https://github.com/weichaohao41-oss/dsh-shot-snap) | 0 | 2026-11-22 | 2026-11-22 | 一些DSH的插件 |
| 265 | [WenWenttt/dsh-anima-studio](https://github.com/WenWenttt/dsh-anima-studio) | 0 | 2026-11-21 | 2026-11-22 | DeepSeek Harness 插件：本地 Animagine XL 4.0 生图工作台（中文→danbooru 标签、四种模式、ComfyUI） |
| 266 | [whiplashf/dsh-stars](https://github.com/whiplashf/dsh-stars) | 0 | 2026-11-22 | 2026-11-22 | DSH 插件：把 GitHub star 归进 Lists、批量归类、跟踪自上次查看后的变更 |
| 267 | [WoodSettler/dsh-claude-call](https://github.com/WoodSettler/dsh-claude-call) | 0 | 2026-11-22 | 2026-11-22 | DSH plugin + zero-dependency MCP server: let Claude Code wake a DSH session, dispatch a task, and read the answer back. |
| 268 | [wunengbiao/dsh-codegraph](https://github.com/wunengbiao/dsh-codegraph) | 0 | 2026-11-22 | 2026-11-22 | Local semantic code intelligence for DeepSeek Harness, powered by CodeGraph. |
| 269 | [www111-ui/dsh-plugin-conflict-audit](https://github.com/www111-ui/dsh-plugin-conflict-audit) | 0 | 2026-11-22 | 2026-11-22 | DSH 插件冲突审计：只读检测工具名撞车 / patch 行 id 冲突 / 路由重叠 / 技能重名 / 服务依赖缺失 / 版本兼容脱节。开机自检 + plugin_conflict_audit 工具。 |
| 270 | [wxs-lang/dsh-browser-bridge](https://github.com/wxs-lang/dsh-browser-bridge) | 0 | 2026-11-22 | 2026-11-22 | 把你自己已登录的浏览器变成 DSH 的 browser_* 工具：不新开实例、不抢焦点、多浏览器并存。Turn the browser you are already signed into into DSH's browser_* tools — background clicks, typing and screenshots with zero focus stealing. |
| 271 | [WYMLY/dsh-install-guard](https://github.com/WYMLY/dsh-install-guard) | 0 | 2026-11-22 | 2026-11-22 | 装东西之前先体检 · Install Guard for DSH: hash / signature / installer checks, autostart baseline diff, hash sweep for known-bad payloads. |
| 272 | [xiangzz/dsh-clear-command](https://github.com/xiangzz/dsh-clear-command) | 0 | 2026-11-22 | 2026-11-22 | A /clear command for the DeepSeek Harness web composer: opens a new session in the current Workspace, like Claude Code's /clear. |
| 273 | [xiao0o0/dsh-workflow-execute](https://github.com/xiao0o0/dsh-workflow-execute) | 0 | 2026-11-22 | 2026-11-22 | 工作流创建、执行 |
| 274 | [xiaoniana2026/dsh-douyin-group](https://github.com/xiaoniana2026/dsh-douyin-group) | 0 | 2026-11-22 | 2026-11-22 | 让 DeepSeek Harness 里的角色能读、能回抖音群：接管已有抖音专用浏览器（CDP），用 DOM 读写群聊，暴露 douyin_group_read / douyin_group_say 两个工具。 |
| 275 | [xiaoniangaoh/dsh-token-gist](https://github.com/xiaoniangaoh/dsh-token-gist) | 0 | 2026-11-21 | 2026-11-22 | Cumulative DSH token usage tracker with GitHub gist backup. Totals survive conversation deletion. |
| 276 | [xiaoxiaolelang-ai/dsh-next-move](https://github.com/xiaoxiaolelang-ai/dsh-next-move) | 0 | 2026-11-07 | 2026-11-22 | dsh-next-move，下一步建议 |
| 277 | [xkzm123/dsh-greasyfork](https://github.com/xkzm123/dsh-greasyfork) | 0 | 2026-11-19 | 2026-11-22 | GreasyFork 发布/更新插件：读脚本与版本、发布新脚本、发新版本、改简介、站内搜索、查账号；凭证手动录入，不驱动浏览器。 |
| 278 | [xuanqing-lab/dsh-personal-workbench](https://github.com/xuanqing-lab/dsh-personal-workbench) | 0 | 2026-11-14 | 2026-11-22 | DeepSeek Harness 的个人 AI 工作台。集中查看今天的计划、AI 已交付的成果和等你处理的事项，点开成果或原对话继续跟进。 |
| 279 | [xuanqing-lab/pipeline-xhs-harness-downloads](https://github.com/xuanqing-lab/pipeline-xhs-harness-downloads) | 0 | 2026-11-19 | 2026-11-22 | Pipeline｜小红书内容生成：把选题或草稿生成笔记与配图，预览后复制下载。原创、仿写、品牌管理。 |
| 280 | [xubin0628/dsh-deepseek-web-chat](https://github.com/xubin0628/dsh-deepseek-web-chat) | 0 | 2026-11-22 | 2026-11-22 | Sidebar panel that opens chat.deepseek.com inside DeepSeek Harness via a loopback reverse proxy, with a sign-in that survives restarts. |
| 281 | [Y1MingSaMa184/dsh-plugin-godot](https://github.com/Y1MingSaMa184/dsh-plugin-godot) | 0 | 2026-11-22 | 2026-11-22 | DSH × Godot：引擎级解析检查、运行期报错捕获、静态优化扫描、带复检的精确修复，以及实时编辑器桥接。Pure-ESM DSH plugin + GDScript addon. |
| 282 | [Y1MingSaMa184/dsh-plugin-novel-assistant](https://github.com/Y1MingSaMa184/dsh-plugin-novel-assistant) | 0 | 2026-11-22 | 2026-11-22 | A causal-timeline novel workbench plugin for DeepSeek Harness — plot graph, character cards, volume/chapter outlines. 纯客户端、零构建、数据留在浏览器。 |
| 283 | [Yamashigure/dsh-black-curtain](https://github.com/Yamashigure/dsh-black-curtain) | 0 | 2026-11-22 | 2026-11-22 | Moegirl-style black curtains for chat replies in the DeepSeek Harness Web UI. |
| 284 | [Yamashigure/dsh-listen-together](https://github.com/Yamashigure/dsh-listen-together) | 0 | 2026-11-22 | 2026-11-22 | DSH plugin: read system loopback audio, floating window control, and now-playing tools for the current session. |
| 285 | [YaoJunhaoya/dsh-yaoking-company-office](https://github.com/YaoJunhaoya/dsh-yaoking-company-office) | 0 | 2026-11-18 | 2026-11-22 | dsh一个辅助开发项目的插件，「dsh-公司办公室模式」 |
| 286 | [yeahlvy/dsh-pdf2zh](https://github.com/yeahlvy/dsh-pdf2zh) | 0 | 2026-11-22 | 2026-11-22 | PDFMathTranslate (pdf2zh) bridge for DeepSeek Harness: a model-callable \`pdf2zh\` tool that translates PDF papers while keeping formulas, figures and layout (translated + bilingual PDFs). |
| 287 | [yizhiyangyangqwq/DSH-Roundtable](https://github.com/yizhiyangyangqwq/DSH-Roundtable) | 0 | 2026-11-22 | 2026-11-22 | 圆桌 — 多模型群聊 DSH 插件。成员就是模型本身，所有调用走 DSH 的 ctx.llm，插件不持有任何 key。 |
| 288 | [yjjnls/dsh-opensandbox](https://github.com/yjjnls/dsh-opensandbox) | 0 | 2026-11-22 | 2026-11-22 | OpenSandbox executor for DeepSeek Harness (DSH): run bash tool calls inside an OpenSandbox sandbox via execd |
| 289 | [yoyoluming1/dsh-delete-chat](https://github.com/yoyoluming1/dsh-delete-chat) | 0 | 2026-11-22 | 2026-11-22 | Delete a turn from a DeepSeek Harness conversation: truncate from that turn, or keep the later turns in a new session. |
| 290 | [yueguang2/dsh-chenyu-workflow](https://github.com/yueguang2/dsh-chenyu-workflow) | 0 | 2026-11-18 | 2026-11-22 | DeepSeek Harness (DSH) 插件：选择晨羽智云 Pod 镜像中的 ComfyUI 工作流，按需开机、串行运行、下载结果并自动关机。A DSH plugin for Chenyu cloud ComfyUI workflows. |
| 291 | [YuYuesangzi/dsh-whale-reader](https://github.com/YuYuesangzi/dsh-whale-reader) | 0 | 2026-11-19 | 2026-11-22 | DSH 本地书库插件：agent 可查书、检索、按章读取并记录进度，设置内提供原生阅读面板。 |
| 292 | [zbh13782-lang/dsh-pin-bookmarks](https://github.com/zbh13782-lang/dsh-pin-bookmarks) | 0 | 2026-11-17 | 2026-11-22 | Right-side reading board for DeepSeek Harness: pin a reply, read it as Markdown, quote part of it back to the composer |
| 293 | [zdddrszj985/dsh-QQ-Reader](https://github.com/zdddrszj985/dsh-QQ-Reader) | 0 | 2026-11-22 | 2026-11-22 | DSH 插件：读你勾选的 QQ 会话，先过滤噪声再总结要点，把「谁要做什么」整理成时间线；也能按日期回溯几个月前的消息。 |
| 294 | [zh-Littlebird/dsh-plugin-firefly-iii](https://github.com/zh-Littlebird/dsh-plugin-firefly-iii) | 0 | 2026-11-22 | 2026-11-22 | Firefly III bookkeeping for DSH: transactions, accounts, budgets, reports, subscriptions, attachments, rules and CSV export. DSH 的 Firefly III 记账与账务分析：交易、主数据、报表、订阅、附件与导出。 |
| 295 | [zheng-builds/dsh-turn-toast](https://github.com/zheng-builds/dsh-turn-toast) | 0 | 2026-11-22 | 2026-11-22 | Desktop toast with a soft chime when a DeepSeek Harness turn finishes (Windows) |
| 296 | [zirscard/dsh-project-memory](https://github.com/zirscard/dsh-project-memory) | 0 | 2026-11-22 | 2026-11-22 | Cross-session project memory for DeepSeek Harness agents: durable fact/decision/constraint entries with mandatory source and asOf, write-time dedupe, supersede-not-overwrite conflict handling, PIT time filtering and leak audit. Deterministic keyword + CJK bigram retrieval (no embeddings). |
| 297 | [ZJ-Dragon/dsh-liangtime](https://github.com/ZJ-Dragon/dsh-liangtime) | 0 | 2026-11-22 | 2026-11-22 | 在 DeepSeek Harness 的侧边栏用户名按钮上方或会话标题栏右侧显示当前是否处于 DeepSeek API 的高峰计价时段 |
| 298 | [Zjb0702/dsh-model-picker](https://github.com/Zjb0702/dsh-model-picker) | 0 | 2026-11-22 | 2026-11-22 | DSH 插件：输入框两级模型选择器（供应商栏 / 悬停切换模型列表 / 思考强度滑条），选中后回填会话 |
| 299 | [Zoanthamine/dsh-molecular-viewer](https://github.com/Zoanthamine/dsh-molecular-viewer) | 0 | 2026-11-22 | 2026-11-22 | Local molecular 3D viewer for DSH: Gaussian, ORCA, FCHK, trajectories and agent integration |
| 300 | [ZYX121212/dsh-bot](https://github.com/ZYX121212/dsh-bot) | 0 | 2026-11-22 | 2026-11-22 | Persistent AI teammates for DeepSeek Harness — 持续会话、显式记忆、群组协作与真实工具执行 |

## 从快照消失的已核准仓库 / Approved repositories missing from the snapshot

已核准但已不在当前快照中。同 owner 的纯改名已自动同步引用，此处多为删除/转私或同名换主——核实后从 [data/approved.json](../approved.json) 移除，或按上面的待复核节处理。

Approved but no longer present in the current snapshot. Same-owner renames were already synced automatically, so what remains is mostly deletion, privating, or a recycled slug — after checking, remove them from [data/approved.json](../approved.json) or handle them via the renames-pending-review section above.

- AJN-Tech/dsh-whatsapp
- bvbhu/dsh-as-one
- duma520/dsh-push-hub
- jwitmann/operator-memory
- liedwardtw/search-api
- margbug01/dsh-ma-plugins
- Nocteve/dsh-compound
- NULLCOLORcat/dsh-Agent-team-fix
- Tangweiwei227/dsh-asc
- Tangweiwei227/DSH-MediaOps
- xiaoxiaolelang-ai/dsh-next-steps
- xiex16070-jpg/dsh-prompt-enhance
- xuanqing-95/dsh-personal-workbench
- xuanqing-95/pipeline-xhs-harness-downloads
- yn2aa/dsh-model-fallback
- zbh13782-lang/dsh-ask-reader
