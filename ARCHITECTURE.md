# ARCHITECTURE

> 当前状态：v0.5.1。v1.0 的目标结构与迁移路径见 [`docs/DEVELOPMENT-PLAN-v1.md`](./docs/DEVELOPMENT-PLAN-v1.md)。
> 每次文件级结构变更后同步本文件。

## 一句话

司马迁.skill 是一个 Agent Skill：把一个人的材料蒸馏成 `persona-agent.md`（给 AI）和 `personal-homepage.html`（给人）。仓库同时托管一个静态落地页。

## 目录

```text
simaqian/
├── SKILL.md              技能入口：目标、隐私默认、六步工作流、质量标准。agent 读的第一个文件
├── README.md             面向人的说明与启动提示词
├── MANIFESTO.md          宣言，作者手写，产品的意图来源
├── VERSION               版本号（v1.0 起为唯一真相源）
├── agents/openai.yaml    Codex 侧的技能元数据
├── assets/               输出模板：两套主页模板、朋友校对模板
├── references/           SKILL.md 的展开：采集访谈框架、输出规格、FDE 入场包（v1.0 归档）
├── examples/             作者本人同意公开的脱敏样例，供参照
├── landing/              simaqian.caojuege.com 静态站
│   ├── index.html        单文件：落地页 + 轻列传结果页(#render) + 内联 CSS/JS/提示词
│   ├── card.js           轻列传 Canvas 渲染器，预览即导出
│   ├── preview.html      本地预览页（v1.0 删除）
│   ├── verdict-lab.html  太史判词流程实验页（v1.0 删除）
│   └── _headers          Cloudflare Pages 缓存头
├── scripts/export-homepage.mjs   Playwright：主页 → PDF + 长图
├── tests/                         node --test
└── docs/DEVELOPMENT-PLAN-v1.md    v1.0 开发文档
```

## 依赖方向

```text
SKILL.md ──→ references/*.md ──→ assets/*-template.*
    │
    └──→ scripts/export-homepage.mjs（可选导出）

landing/index.html ──→ landing/card.js
```

skill 文本与落地页互不依赖；落地页只承载启动提示词。

## 边界

- 仓库不接收、不存储用户数据。所有生成都发生在用户自己的 agent 环境。
- `persona-agent.md` 是用户产物的唯一源，主页等均为投影（见 `SKILL.md` 第 6 步）。
