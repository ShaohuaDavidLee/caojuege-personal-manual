---
name: simaqian.skill
description: "Use when turning a person's materials into a living Personal OS: persona-agent.md as the single source, plus projections (homepage, bios, compact persona, calibration). Also use when updating an existing persona after new work, interviews, reviews, or a full re-examination. Trigger on 个人使用说明书、个人主页、bio、personal OS、persona、更新我的 persona、我有新作品、并入材料、重审、生成 bios、紧凑版、司马迁."
---

# 司马迁.skill

## 目标

把一个人蒸馏成一份可复用的源，再投影成给人和给 AI 的几种形态：

1. `persona-agent.md`：唯一源。给 AI 用，写清事实、判断、风格、边界。
2. 投影：给人看的主页、场合简介、紧凑版 persona、校准题。只能从源文件派生，不新增事实。

默认不做完整传记，不做人格测试，不做营销包装。跑一次约 15-30 分钟。

受众：非技术背景、想做作品型产品的开发者。

## 隐私默认

默认采取“公开行为对齐”原则：

**默认规则**：如果一项信息只在简历或私下材料里出现，但本人的公开文章、播客、社媒、官网从未提及，**默认不写进 persona**。用户明确同意后才纳入。

具体跳过的字段（除非用户明确要求加入）：家庭成员姓名、子女信息、配偶细节；年龄、生日、具体年龄段；收入、薪资、融资金额（除已公开者）；电话、邮箱、家庭住址；证件号；健康与心理状态细节；未公开的商业合作、NDA、公司内部薪酬人事与未公开战略。

判断：公开渠道有 → 可以写。公开渠道没有 → 默认跳过。拿不准时问用户。

## 工作流

### 1. 先吃已有材料

开始前告诉用户：可以直接给文件、文字或链接。优先读已经给出的材料。最适合这四类：

- 个人文章 / 公众号 / 博客 / 小红书长文
- 简历 / 个人介绍 / 过往履历
- 作品链接 / GitHub / 社媒账号链接
- 播客、访谈、演讲、直播转写

有材料就先读、先提炼，不要一上来问长问卷。先抽出：已知事实、当前身份、关键经历、可提供能力、正在寻求的合作、价值观和判断方式、表达风格、链接、仍然缺失或不确定的信息。

### 2. 做最小补充采集

只有在缺信息时才提问。没有材料时，先提醒可以提供上面四类；用户仍没有或说“访谈我”，再访谈。每轮最多 1-3 个问题。优先从这些高杠杆问题里挑：

- 你现在最希望别人先如何理解你？
- 你可以提供什么？你正在寻找什么合作？
- 你最不想被误解成什么？
- 哪些经历、作品、链接必须出现？
- 哪些内容不能公开或不能让 AI 代说？
- 如果要让 AI 更像你，它最重要的判断原则是什么？

完整问题池见 [references/intake-and-interview.md](references/intake-and-interview.md)。

### 3. 判断是否需要采访

采访是可选项。需要采访：公开语料很少；只有履历没有动机和边界；用户明确要更深版本；无法区分真实自我与简历包装。可以跳过：已有大量文章或笔记；本轮只要 v0.1；身份、能力、合作诉求和边界已经明确。

如果采访，先给 6-10 个定制问题，再逐轮追问。围绕最有辨识度的张力，不要机械覆盖童年、兴趣、挫折。

### 4. 先形成一页人物假设

正式输出前，内部先形成：一句话定位、身份排序、生命母题、关键张力、能力结构、合作接口、未竟之处、不确定项。说不清就继续补材料。用户要求“先写一版”时，可以生成低置信度 v0.1，必须标出待确认项。

### 5. 输出个人 OS 资产包

输出规范见 [references/output-spec.md](references/output-spec.md)。默认目录：

```text
<person>-personal-os/
├── persona-agent.md
├── persona-agent.compact.md
├── calibration.md
├── bios.md
├── personal-homepage.html
├── materials.md
├── materials/
└── exports/
```

先写源文件 `persona-agent.md`（含 frontmatter），再全量渲染四个投影。投影开头一行：`源: persona-agent.md vX.Y.Z · 由 司马迁.skill 生成 · 勿手改`。

主页先按气质选模板，再按材料调文案：

- **草诀歌风格**：[assets/caojuege-homepage-template.html](assets/caojuege-homepage-template.html)。报纸、档案、正史感。
- **文艺复兴风格**：[assets/renaissance-homepage-template.html](assets/renaissance-homepage-template.html)。长卷、画廊、人文气质。

未指定时默认草诀歌风格；用户有强烈视觉偏好、照片或明确要求个人气息时改用文艺复兴。

生成主页后尝试导出 PDF 和长图：

```bash
npm install
npm run export:setup
npm run export:homepage
```

必须按选定模板的屏幕渲染导出，不要改排成通用 A4。环境跑不了 Playwright 时仍交付 HTML，并说明稍后可补导出。

`盲区` 一节必须最后写。写完其他段落后回头标出 2–4 处可能写偏的地方。

输出完成后，建议用户把 persona 发给 1–2 个熟人，用 [assets/friend-review-template.md](assets/friend-review-template.md) 做第三人视角校对。强烈推荐，不强制。

同时建好 `materials.md`（用 [assets/materials-template.md](assets/materials-template.md)），把本轮用过的材料记成台账，状态标为已并入当前版本。

### 6. 支持迭代修订

`persona-agent.md` 是唯一源文件。

- 用户改了 markdown → 基于新版本全量重渲投影。
- 用户拿到朋友反馈 → 合并进 persona，再重渲。
- 不要鼓励用户手改 HTML 或任何投影。

### 7. 更新

用户说「更新我的 persona / 我有新作品 / 并入材料 / 重审」时，读取 [references/update.md](references/update.md) 并按其流程执行。

增量：一条新材料 → 路由表定位 → 逐节 diff → 确认后写入 → 全量重渲。
重审：仅用户主动说「重审」时执行；重写身份排序、未竟之处、盲区。盲区不允许沿用上一版。

任何写入前必须展示 diff，用户确认。不可协商。

## 一源多投影

| 文件 | 角色 | 读者 |
|---|---|---|
| `persona-agent.md` | 源 | AI · 自己 |
| `persona-agent.compact.md` | 投影 · ≤2000 token | CLAUDE.md / 自定义指令 |
| `calibration.md` | 投影 · 校准题+期望答案 | 换模型时测「它懂不懂我」 |
| `bios.md` | 投影 · 短介绍 / 长介绍 | 社媒、活动 |
| `personal-homepage.html` | 投影 · 合作入口 | 人 |
| `materials.md` | 台账 · 只追加 | 更新时用 |

投影规格见 [references/output-spec.md](references/output-spec.md)。模板在 `assets/`。

## 质量标准

- **准确**：事实不足时写“待确认”，不要编。
- **具体**：少写空泛人格词，多写能提供什么、找什么合作。
- **有辨识度**：必须写出此人与别人不同的判断和经历。
- **可协作**：别人看完知道是否该找他、怎么找他。
- **对 AI 真有用**：有事实边界、决策原则、表达风格、禁区、校准题。
- **克制**：避免成功学叙事、过度心理分析。

## 输出前检查

1. 人看的页面里，前两屏是否说清“我是谁 / 我能提供什么 / 我在找什么”。
2. AI 文档是否区分“已知事实 / 推断 / 待确认”。
3. 是否列出可公开链接和不可公开边界。
4. 是否保留了这个人独有的语言、故事或判断。
5. 四个投影是否都带源版本标记，且没有源文件里没有的事实。
