# core/skills · 产品通用技能目录

本目录存放 **跨产品、可给所有用户复用** 的 Agent Skill（不绑单一游戏 / 单一 Core）。

| 约定 | 说明 |
|---|---|
| 布局 | `core/skills/<skill-name>/SKILL.md` + 可选 `references/` |
| 读者 | Coding Agent、办事助手、美术管线均可；正文避免写死单一工具链 |
| 与 `.cursor/skills` | 框架/仓内 Coding 专属仍放 `.cursor/skills`；通用创意/美术流程放此处 |
| 与 `.xrk/skills` / 工作区 | 办事助手种子与用户工作区技能；需要时可由 SkillHub 或文档指引同步/安装本目录技能 |
| 与 `core/<产品>/` | 产品业务码仍在各自 Core；本目录 **只** 放技能文案与轻量模板 |

## 当前技能

| 名 | 用途 |
|---|---|
| [`cartoon-part-pose`](cartoon-part-pose/SKILL.md) | 语义拆件 + 定格/sheet；尺子帧优先；关键定格锁表；失败分类重生 |

> **注意**：若需让全局 AI Agent 自动发现本目录的新技能，请确保将本目录下的技能名称和 `description` 补充到主索引文件（如 `.cursor/skills/SKILL_INDEX.md`）或全局 Agent 的系统提示词配置中。

## 入库注意

根 `.gitignore` 默认 `core/*` 仅白名单 `system-Core`。若本目录要进主仓给所有克隆用户，需单独白名单 `core/skills/`（由维护者确认后改 `.gitignore`）。
