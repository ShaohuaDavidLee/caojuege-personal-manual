# ARCHITECTURE

> 当前状态：v1.0.0。决策来源：[`docs/DEVELOPMENT-PLAN-v1.md`](./docs/DEVELOPMENT-PLAN-v1.md)。
> 每次文件级结构变更后同步本文件。

## 一句话

司马迁.skill 是「草诀歌之笔」的第一件：把一个人蒸馏成 `persona-agent.md`（唯一源），再投影成主页、简介、紧凑版和校准题。仓库同时托管一个静态落地页。

## 目录

```text
simaqian/
├── index.html            仓库根：本地预览跳到 landing/
├── SKILL.md              技能入口：目标、隐私、七步工作流、一源多投影
├── README.md             面向人的说明与启动提示词
├── MANIFESTO.md          宣言，作者手写
├── ARCHITECTURE.md       本文件
├── VERSION               版本号唯一真相源
├── agents/openai.yaml    Codex 侧技能元数据
├── assets/               输出模板：两套主页 + bios / compact / calibration / materials / 朋友校对
├── references/
│   ├── intake-and-interview.md   采集问题池
│   ├── output-spec.md            源文件与投影的规格
│   └── update.md                 台账、增量、重审、路由表
├── examples/             作者同意公开的脱敏样例
├── landing/              simaqian.caojuege.com
│   ├── index.html · styles.css   落地页：定位 / 产物 / 开始 / 更新 / 旧式页脚
│   ├── davidli-fold.jpg          真实主页完整第一屏
│   ├── legacy/render.html        旧版卡片结果页，不断链
│   └── legacy/card.js            Canvas 渲染器
├── scripts/export-homepage.mjs   Playwright：主页 → PDF + 长图
├── tests/                export + VERSION 一致性
└── docs/DEVELOPMENT-PLAN-v1.md
```

用户产物目录：

```text
<person>-personal-os/
├── persona-agent.md              源
├── persona-agent.compact.md      投影
├── calibration.md                投影
├── bios.md                       投影
├── personal-homepage.html        投影
├── materials.md                  台账 · 只追加
├── materials/
└── exports/
```

## 依赖方向

```text
SKILL.md ──→ references/*.md ──→ assets/*-template.*
    │
    └──→ scripts/export-homepage.mjs（可选导出）

landing/index.html ──→ landing/styles.css
                 └──→ landing/legacy/render.html  （#render 跳转）
                              └──→ landing/legacy/card.js
```

skill 文本与落地页互不依赖；落地页只承载启动提示词。

## 边界

- 仓库不接收、不存储用户数据。所有生成都发生在用户自己的 agent 环境。
- `persona-agent.md` 是用户产物的唯一源。投影永不手改，源变则全量重渲。
- 与草诀歌之笔其他工具松耦合：不共享契约，只共享受众。
- 已流出的 `#render?...` 链接由 `landing/legacy/` 继续渲染，不进入产品叙事。
