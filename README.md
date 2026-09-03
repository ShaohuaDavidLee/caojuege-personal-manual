# 司马迁.skill

> 把你是谁，整理成一式两份。

`司马迁.skill` 是「草诀歌之笔」的第一件工具。它帮你写下 AI 时代的个人使用说明书：一份给 agent 看，一份给人看。写完之后还能继续更新。

受众是非技术背景、想做作品型产品的开发者。跑一次大约 15-30 分钟。

打开：<https://simaqian.caojuege.com>

本地预览不要用 `file://`，也不要从家目录起服务。在仓库根目录：

```bash
npm run preview
```

浏览器打开 <http://127.0.0.1:8765/> 。页面在 `landing/`，根路径会自动跳过去。若自己加了 `--directory landing`，地址不要再写成 `/landing/`。

## 你会得到什么

```text
<你>-personal-os/
├── persona-agent.md              源 · 给 AI 的人物档案
├── persona-agent.compact.md      投影 · 给 CLAUDE.md / 自定义指令
├── calibration.md                投影 · 换模型时测「它懂不懂你」
├── bios.md                       投影 · 一句 / 三句 / 一段 × 一三人称
├── personal-homepage.html        投影 · 给合作方的个人主页
├── materials.md                  台账 · 只追加
├── materials/
└── exports/                      主页 PDF 和长图
```

`persona-agent.md` 是唯一源。其余都是投影：源变则全量重渲，不要手改投影。

真实主页示例：<https://www.caojuege.com/davidli> —— 这张文艺复兴版主页就是它写的。

## 立即开始

### 用 Claude Code / Codex / Cursor

把下面这段粘给你的 Agent：

```text
帮我跑 github.com/ShaohuaDavidLee/simaqian 这个 skill，生成一份个人 OS：
persona-agent.md，以及 bios.md、persona-agent.compact.md、calibration.md 和 personal-homepage.html。

我会直接给你文件、文字或链接。可用材料包括：个人文章 / 公众号 / 博客 / 小红书长文，简历 / 个人介绍 / 过往履历，作品链接 / GitHub / 社媒账号链接，播客、访谈、演讲、直播转写。

请先读取材料，再只追问关键缺口。没有材料时，先提醒我可以提供哪些材料；如果我仍然没有材料，再访谈我。不要一上来发长问卷。
```

### 用 ChatGPT / Claude.ai / Kimi / 豆包

```text
请按 github.com/ShaohuaDavidLee/simaqian 这个仓库的 SKILL.md，帮我生成一份个人 OS：
persona-agent.md，以及 bios.md、persona-agent.compact.md、calibration.md 和 personal-homepage.html。

我会直接给你文件、文字或链接。可用材料包括：个人文章 / 公众号 / 博客 / 小红书长文，简历 / 个人介绍 / 过往履历，作品链接 / GitHub / 社媒账号链接，播客、访谈、演讲、直播转写。

请先读取材料，再只追问关键缺口。没有材料时，先提醒我可以提供哪些材料；如果我仍然没有材料，再访谈我。不要一上来发长问卷。
```

没有材料也可以直接说：`我没有材料，访谈我吧。`

## 更新

persona 和主页是活的。新作品、复盘、播客、测评先记进台账，再决定改「我是谁」的哪一节。

```text
司马迁，更新：<链接或文件>
```

只在你主动要求时做整份重审：

```text
司马迁，重审。
```

更新前 agent 必须先给你看逐节 diff，你确认后才写入。细节见 [references/update.md](references/update.md)。

建议把 personal-os 目录 `git init` 成私有仓库。历史交给 git，skill 不另出报告。

## 隐私默认

如果一项信息只在简历或私聊里出现，但公开文章、播客、社媒、官网从未提及，默认不写进 persona。用户明确同意后才纳入。

家庭、年龄、薪资、电话、住址、健康、未公开商业合作等敏感字段默认跳过。完整规则见 [`SKILL.md`](./SKILL.md)。

生成的文件默认是你的私有文件，不要提交到公开仓库（已在 `.gitignore` 中忽略）。`examples/` 里的样例都是创作者本人同意公开、并已脱敏的版本。

## 样例与模板

先看真实主页：<https://www.caojuege.com/davidli>

文件级参照：

- [examples/david-persona-agent.public.md](examples/david-persona-agent.public.md)
- [examples/david-persona-agent.compact.public.md](examples/david-persona-agent.compact.public.md)
- [examples/david-bios.public.md](examples/david-bios.public.md)
- [examples/david-calibration.public.md](examples/david-calibration.public.md)
- [examples/david-personal-homepage.public.html](examples/david-personal-homepage.public.html)（草诀歌风格）
- [examples/david-personal-homepage-renaissance.public.html](examples/david-personal-homepage-renaissance.public.html)（文艺复兴风格）

主页模板：默认 [草诀歌风格](assets/caojuege-homepage-template.html)；有照片或明确的人文气质时用 [文艺复兴风格](assets/renaissance-homepage-template.html)。

## 导出

生成网页后，可以用内置脚本按当前模板的屏幕视觉导出 PDF 和长图：

```bash
npm install
npm run export:setup
npm run export:homepage
```

默认读取当前目录的 `personal-homepage.html`，输出：

```text
exports/personal-homepage.pdf
exports/personal-homepage-long.png
```

## 它怎么工作

1. **先吸收材料**。不一上来发长问卷，先读你已经写下、说过、做过的东西。
2. **再补关键缺口**。只问少量高杠杆问题。
3. **可选深度访谈**。围绕最有辨识度的张力追问。
4. **写源文件，再投影**。一份 persona，四份派生；主页可导出 PDF 和长图。
5. **之后按材料更新**。台账只追加，persona 重写，投影重渲。

它不是人格测试，不是心理诊断，也不是营销包装。它只做一件事：把已经在你身上的东西，写成 AI 和人都能读懂的形态，并让它能被继续改。

## 设计原则

- **低摩擦**：先吃已有材料，不默认发长问卷。
- **一源多投影**：persona 是唯一真相源。
- **具体优先**：少写空泛人格词，多写事实、能力、判断和边界。
- **克制表达**：不把个人使用说明书写成成功学包装。
- **活的文档**：发生了什么进台账，我是谁靠重写。

## 为什么开源

司马迁把列传写给帝王将相，也写给刺客、游侠、商人和滑稽艺人。

AI 时代，记录一个人的资源不再那么稀缺。也许我们可以更早一点，在一个人还在寻找、还在创造、还有时间的时候，帮他把自己写清楚。

完整文字见 [`MANIFESTO.md`](./MANIFESTO.md)。

## Made by

[草诀歌 AI Labs](https://www.caojuege.com/) — 一个帮助人用 AI 做出“作品型产品”的社区。

草诀歌之笔的第一件。

## 版本

当前版本：`v1.0.0`
