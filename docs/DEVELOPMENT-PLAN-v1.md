# 司马迁.skill v1.0 开发文档

> 给实施模型的唯一需求源。与仓库现状冲突时，以本文为准。
> 已决定的事不要再问；未提及的细节按「克制、具体、少即是多」自行判断。

---

## 1. 定位

司马迁.skill 是「草诀歌之笔」的第一件工具。

- 一句话：**把你是谁，整理成一式两份——一份给 agent 的 persona，一份给人的个人主页。**
- 受众：非技术背景、想做作品型产品的开发者。
- 与家族其他工具（包青天 / 严复 / 列宾）松耦合：不定义共享契约，不互相依赖，只共享受众。
- 运行时是用户自己的 agent（Claude Code / Codex / Cursor / 聊天模型）。我们只维护 skill 文本、模板、导出脚本和一个一屏落地页。

## 2. 已确认的决策

| # | 决策 |
|---|---|
| D1 | 只保留精列传。轻列传（三卡）、FDE 入场包 归档，不再出现在任何叙事里 |
| D2 | 一源多投影：`persona-agent.md` 是唯一源；其余全是投影。投影永不手改，源变则全量重渲 |
| D3 | 新增投影：`bios.md`（长度阶梯）、`persona-agent.compact.md`（紧凑版）、`calibration.md`（校准题+期望答案） |
| D4 | 不做：名片、diff 报告、嘉宾包、合作说明、家族契约、发布托管、统计埋点 |
| D5 | 更新机制：台账 + 增量/重审两种模式 + 路由表 + diff 优先。重审仅手动触发，无阈值、无提醒 |
| D6 | 主页代表作品不设上限 |
| D7 | 已流出的 `#render?...` 链接不断链：保留 legacy 渲染路由，隔离在 `landing/legacy/` |
| D8 | 精列传时长口径统一为「15-30 分钟」 |
| D9 | 版本号以 `VERSION` 为唯一真相源，其余位置必须一致，用测试守住 |
| D10 | 落地页长度不限一屏，按内容需求定；但每一屏只做一件事 |
| D11 | 个人主页的示例统一用作者的真实主页 <https://www.caojuege.com/davidli>（文艺复兴版，本身就是司马迁.skill 写成的） |

## 3. 目标结构

### 仓库

```text
simaqian/
├── README.md · MANIFESTO.md · SKILL.md · ARCHITECTURE.md · VERSION · LICENSE
├── package.json · package-lock.json · .gitignore
├── agents/openai.yaml
├── assets/
│   ├── caojuege-homepage-template.html
│   ├── renaissance-homepage-template.html
│   ├── bios-template.md                 新
│   ├── persona-compact-template.md      新
│   ├── calibration-template.md          新
│   ├── materials-template.md            新
│   └── friend-review-template.md
├── references/
│   ├── intake-and-interview.md
│   ├── output-spec.md                   修订
│   └── update.md                        新
├── examples/                            补 bios / compact / calibration 公开样例
├── landing/
│   ├── index.html · styles.css          一屏，重写
│   ├── legacy/render.html · legacy/card.js
│   └── _headers · favicon* · og-card.png · qr-simaqian.png
├── scripts/export-homepage.mjs
└── tests/
    ├── export-homepage.test.mjs
    └── version.test.mjs                 新
```

删除：`assets/personal-homepage-template.html`（与 caojuege 模板仅差一行注释）、`references/fde-pack.md`、`landing/preview.html`、`landing/verdict-lab.html`。删除前先在当前 main 打 tag `v0.5.1` 并建分支 `archive/v0.5-light-fde`。

### 用户产物（personal-os）

```text
<person>-personal-os/
├── persona-agent.md              源 · frontmatter: version / updated / last_review
├── persona-agent.compact.md      投影 · ≤2000 token · 给 CLAUDE.md / 自定义指令 / Project instructions
├── calibration.md                投影 · 10 题 + 期望答案要点 · 换模型时两分钟测「它懂不懂我」
├── bios.md                       投影 · 一句(≤20字) / 三句(60-100) / 一段(150-250) × 第一 / 第三人称
├── personal-homepage.html        投影 · 给合作方
├── materials.md                  台账 · 只追加
├── materials/                    本地材料（转写、PDF）
└── exports/                      pdf · long.png
```

每个投影文件开头一行标记：`源: persona-agent.md vX.Y.Z · 由 司马迁.skill 生成 · 勿手改`。版本与源不一致时，agent 应提示重渲。

建议用户把 personal-os 目录 `git init` 为私有仓库，历史交给 git，skill 不产出任何 diff 报告。

---

## 4. 阶段一：Skill

可独立发布。完成后 `VERSION` → `v1.0.0`。

### SKILL.md 重写

- 触发词补上更新类：更新我的 persona / 我有新作品 / 并入材料 / 重审 / 生成 bios / 紧凑版。
- 工作流保留现有六步（先吃材料 → 最小补采 → 可选访谈 → 人物假设 → 输出 → 迭代），第七步「更新」指向 `references/update.md`。
- 输出一节改成「一源多投影」表。
- 删掉 FDE 段、轻列传引用、「输出三」。
- 保持 ≤ 250 行。

### references/output-spec.md 修订

- persona 增加 frontmatter 规范和文末 ≤3 行的「变更记录」。
- 新增三个投影的规格，核心约束只有一条：**只能用 persona 里已有的事实，不新增**。
  - compact：固定小节——一句定位 / 判断原则 / 表达风格要与不要 / 禁区 / 协作偏好 / 缺事实时的默认。
  - calibration：沿用 persona 的十道校准题，每题给期望答案要点和一条常见错答。
  - bios：六个默认块（三档长度 × 两种人称），每块下注一行适用场合。其他场合按需一句话生成，不预先展开矛阵。
- 主页结构不变，代表作品不限。
- 默认交付目录改为上面的 personal-os 结构。

### references/update.md 新建

这是 v1.0 的核心增量，写清以下要点即可：

**分离原则**：发生了什么（台账，只追加）与我是谁（persona，重写）分开。追加是熵增，活的文档靠重写。

**台账格式**：一行一条——日期 · 类型 · 标题 · 链接或本地路径 · 状态（待并入 / 已并入 vX）。

**两种更新**

- 增量：一条新材料。读材料 → 按路由表定位触及的节 → 以 diff 形式展示 → 用户确认 → 写入 → 全量重渲投影 → 台账标已并入。
- 重审：用户说「重审」时执行。重读 persona + 所有待并入材料 → 重写身份排序 / 未竟之处 / 盲区 → 追问 3-5 题 → diff → 确认 → 重渲。**盲区每次重审必须重写**，不允许沿用。

**路由表**（agent 只能动表内的节，表外要动必须单独问）

| 材料类型 | persona 可动的节 | 主页可动的区 |
|---|---|---|
| 新作品 | 已知事实 · 能力模型 · 我能提供 | Work · Offer |
| 复盘文章 | 重要判断 · 决策原则 · 未竟之处 · 盲区 | Principles |
| 播客 / 访谈 | 表达风格 · 常用词汇 · 底层动机 · 校准题 | About |
| 测评 / 报告 | 能力模型 · 重要判断 · 我能提供 | Offer · Work |
| 身份变化 | 核心定位 · 当前身份排序 · 我在找 → 建议用户重审 | Hero · Seeking |

复盘文章是唯一能证实或推翻「盲区」的材料，处理它时第一步是对照现有盲区。

**硬规则**

1. Diff 优先：任何写入前必须逐节展示原文 → 拟改，用户确认。不可协商。
2. 身份排序只重排不追加。
3. 投影永不手改，源变则全量重渲。
4. 隐私规则（公开行为对齐）对更新同等生效。
5. 版本号：增量 +patch，重审 +minor，核心定位变了 +major。

**触发**：仅用户主动——「司马迁，更新：<链接或文件>」或「司马迁，重审」。不做阈值判断，不做提醒。

### 模板与样例

- `assets/` 四个新模板：骨架 + 给 agent 的行内指令，不要长篇大论。
- `examples/` 用 `david-persona-agent.public.md` 生成 bios / compact / calibration 公开样例，只能用公开版里已有的事实，留给作者审核。

### README 重写

结构：一句话 → 你会得到什么（目录树）→ 立即开始（给 agent 一段、给聊天模型一段）→ 更新（一段提示词）→ 隐私 → 样例与模板 → 导出 → 版本。删掉三入口表、轻列传、FDE、旧截图。

样例一节以真实主页 <https://www.caojuege.com/davidli> 为首要示例，`examples/` 里的脱敏文件作为文件级参照。

### 其他

- `agents/openai.yaml` 描述改为新定位。
- `tests/version.test.mjs`：断言 `VERSION`、`package.json`、README、landing 里的版本号一致。
- `.gitignore` 补 `/materials/`、`/materials.md`、`/bios.md`、`/persona-agent.compact.md`、`/calibration.md`。

### 阶段一验收

- 仓库全文搜不到「轻列传 / FDE / 入场包 / 输出三」（`landing/legacy/` 除外）。
- 用一个真实模型跑一遍首建，产出 personal-os 全部文件，投影头部带版本标记。
- 再跑一次增量更新（给一篇文章链接），agent 先出 diff、后写入、投影重渲、台账更新。
- `npm test` 通过。

---

## 5. 阶段二：落地页

### 结构

长度按内容需求定，不限一屏；原则是**每一屏只做一件事，只讲一个产品**。建议顺序：

1. **首屏**：标题「司马迁.skill」/ 一句话「把你是谁，整理成一式两份。」/ 副句「一份给 agent 的 persona，一份给人的个人主页。草诀歌之笔 · 第一件。」/ 主 CTA 滚到提示词面板。导航只留：司马迁.skill · 开源 · 草诀歌之笔。
2. **产物**：两份并排。persona 侧沿用现有 `.mock-md` 纯 CSS 模拟（内容取自 `examples/david-persona-agent.public.md`）；主页侧用作者真实主页 <https://www.caojuege.com/davidli> 的截图，点击跳转真实页面，配一句「这张主页就是它写的」。
3. **怎么开始**：材料清单（四类）+ 一个提示词面板 + 一个复制按钮。只此一个面板。
4. **怎么更新**：一段话讲清台账 → 增量 → 重审的循环，附「司马迁，更新：<链接>」一句示例，细节链到 README。这一屏体现「活的」，是 v1.0 相对旧版的新增叙事。
5. **页脚**：开源 GitHub · 草诀歌之笔 · 宣言（指向 GitHub 上的 MANIFESTO.md，不再是 `#`）。

不放：三入口对比、多个提示词面板、mock 与截图并存、任何 FDE / 轻列传残留。

### 约束

- 零外部请求：去掉 Google Fonts 和 iconify，字体走现有系统宋体回退栈，图标用 ≤3 个内联 SVG。
- 拆文件：`index.html` + `styles.css`；JS 只做复制和 legacy 跳转，≤30 行。
- 总体积 < 40 KB（不含图）；主页截图压到 ≤ 150 KB，`loading="lazy"`。
- 沿用现有设计 token（灰底、衬线、单一朱红点缀、「傳」水印可留）。
- meta / og 文案同步新定位；og-card 由作者另出。

### legacy

- `index.html` 顶部：`location.hash` 以 `#render` 开头 → `location.replace('legacy/render.html' + location.hash)`。
- `legacy/render.html`：从现有 `index.html` 抽出结果页所需的最小集合——结果页标记、对应 CSS、`parseCards` / `smartDecode` / 编辑面板 / 下载。删掉 tweaks 面板、edit-mode 协议、样张、提示词、所有落地页分节。`card.js` 原样搬入。
- 页面加 `noindex`，顶部一句「这是旧版轻列传的存档页」并链回首页。
- 回归：拿一条真实旧链接，新旧渲染结果一致。

### 阶段二验收

- 首页无任何外部请求；移动端首屏能看到一句话定位和主 CTA。
- 全页只有一个提示词面板、一个产品叙事。
- 旧链接可用；`/verdict-lab.html`、`/preview.html` 返回 404。
- `ARCHITECTURE.md` 与实际结构一致。

---

## 6. 写作与代码约束

- 文案克制、具体、无营销腔。禁用：赋能 / 颠覆 / 效率提升 / 一站式 / 全方位 / 打造。
- 注释中文，ASCII 分块。单文件 ≤ 800 行。
- 不引入构建工具、框架、新依赖；`playwright` devDependency 保留。
- 每阶段结束更新 `ARCHITECTURE.md`、`README.md`、`VERSION`。
- 提交按逻辑拆分，一个改动一个 commit。

## 7. 留给作者的事

实施者不要碰这些，做完标注即可：

- `MANIFESTO.md` 中提及轻列传的段落（一、六）由作者亲自修订。
- 新 og-card 视觉；<https://www.caojuege.com/davidli> 的落地页用截图（实施者可先用 Playwright 截一版占位）。
- 三个公开样例（bios / compact / calibration）的审核。
- 用两到三个不同模型实测首建 + 一次增量更新。
