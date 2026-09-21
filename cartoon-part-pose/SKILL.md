---
name: cartoon-part-pose
description: >-
  SpriteForge (原 cartoon-part-pose)：通用的 2D AI 动画生成工业管线。
  功能包含：语义拆件（Parts）、立绘锚定、姿势配方与标准化 Sprite Sheet 锻造。
  核心特性：通过九宫格同表锚定、强制留白、单向流过渡与严格的 Schema 自检，
  彻底解决 AI 生成动作帧时的“比例漂移（缩水）”与“逻辑回放”痛点。
  提供标准适配器接口，一键对接任意游戏引擎执行器。
  Use when 用户说：拆件、定姿、摆动作、定格、Sprite Sheet、动作帧，
  或需要将一致性极高的角色动作输入到游戏中时。
---

# SpriteForge (cartoon-part-pose) · AI 动作锻造管线

> **读者**：任意 Agent。通用流程在本文件；**某一游戏怎么进执行器**见各项目自己的适配文档（或 `references/adapters/`）。  
> **粒度默认**：中粒度。用户说「细到眼睛」再升档。  
> **拆件默认 = 语义拆分**（部位名单 + 立绘参考锁身份），**不是**把头/四肢抠成可旋转 PNG。真切件拼装是另一条管线，未获用户点名时禁止当默认。

## 两种产出（先问清要哪一种，用户已说清则不问）

| 模式 | 交付 | 验收要点 |
|---|---|---|
| **A 定格** | **一张**姿势图 | 指定动作可读；同人同装；不忽大忽小 |
| **B sheet** | **一张表 = 一个动作的全部帧** | 关键定格进表；帧间丝滑；**身尺全表一致**；可量化同尺；执行器能播 |

「全部帧」= 该动作从起到收的完整序列（例如：跑/跳/攻/滚 各一张九宫格），**不是**把所有招式画进同一张图。

**A→B 硬链**：用户要 sheet 且该动作有「极值/关键姿势」（满弦、出刃、腾空顶点等）时：

1. 先出 **A 定格**，用户确认。  
2. 定格路径写入角色卡 `keyframes.<action>`。  
3. 再生 **B**；表内对应格必须是该定格姿势（同人同装同尺），其它格只做前后过渡。  
4. 禁止跳过定格直接赌整表。用户明确说「不要定格、直接整表」才可跳过，并记在对话里。

---

## 总流程

```
0. 定产出：A 或 B（及目标执行器）
1. 立绘：已有扫描 / 没有则生成→确认
2. 拆件：语义中粒度 → **落盘** identity + parts（强制复用）
3. 尺子帧：新角色无尺子则先出站立或跑（见 Step 2.5）；有则复用
4. 定姿：配方；B 还要帧序 + 关键定格格位
5. 生成：A 单图；B =（可选先 A）→ 整表一次生成
6. 验收：身份 + 动作；B 再加同尺量化 + 衔接；失败按类改约束
7. 进执行器（B 且要进游戏）：产品适配种入后才算能播
```

用户说「先 X」→ 只做 X。一次只做一个动作。

---

## Step 1 · 立绘（扫描或生成）

### 已有立绘

1. 读用户给的图。  
2. **语义扫描**：按中粒度列出可见部位 → identity + parts（见 Step 2）。  
3. 复述脸、配色、头身、标志物。看不清就问，禁止猜成另一套装。

### 没有立绘

1. 生成 **一张** 立绘（全身、角色 only、默认无场景）。  
2. **等用户确认**。未确认不得拆件、不得出动作。  
3. 确认后同样语义扫描。

模板：[`references/identity-template.md`](references/identity-template.md)。

---

## Step 2 · 拆件（语义 · 中粒度 · 必须落盘）

默认部位：

```text
head, torso,
arm_upper_L/R, arm_lower_L/R, hand_L/R,
leg_upper_L/R, leg_lower_L/R, foot_L/R,
prop_*, deco_*
```

细则：[`references/part-taxonomy.md`](references/part-taxonomy.md)。

| 做 | 不做 |
|---|---|
| 稳定 id 的部位名单 + 文字外观锁 | 默认抠成独立可旋转 PNG |
| 同一角色全动作复用同一份 parts | 每张图重拆、改名 prop/deco |

### 落盘（硬）

用户指定目录优先；否则默认资产联接目录：

```text
.local/cursor-project/assets/cartoon-part-pose/characters/<id>/
  identity.yaml    # 或 .md 填模板
  parts.json       # 符合 parts.schema.json
  keyframes/       # 已确认定格：atk-full-draw.png 等
  scale_ref.png    # 可选：导出的单格尺子（如 run0）
```

- 开新动作前：**先读**已有 `identity` + `parts`，禁止无故重写。  
- 只追加新 `prop_*` / `deco_*`，不改旧 id。  
- 产品 assets 目录若用户指定，把上述文件放那里，并在 identity 里写 `parts_path`。

> **自检约束（必须执行）**：当产出/修改 `parts.json` 后，**必须**使用以下脚本进行格式自检。如果报错则按提示修复，禁止提交不合法数据。
> ```bash
> node core/skills/cartoon-part-pose/tools/validate_parts.mjs <路径至parts.json>
> ```

---

## Step 2.5 · 尺子帧优先（硬）

**身尺真源**不是立绘像素高度，而是执行器约定的 **尺子帧**（例如跑步表第 0 格 run0；无适配器时默认「确认过的站立全身定格」）。

| 情况 | 动作 |
|---|---|
| 新角色，还没有尺子 | **先**出跑表或站立尺（用户/适配器二选一），确认并落盘 `scale_ref` 后，才允许跳/攻/滚等 sheet |
| 已有 run0 / scale_ref | 所有后续 sheet 参考图带上它；Prompt 写死同尺 |
| 用户只要 A 定格、不进游戏 | 可用立绘当比例参考；一旦转 B 进执行器，必须补齐尺子 |

没有尺子就画攻表 → 几乎必然忽大忽小。禁止「先出攻、回头再对齐」。

---

## Step 3 · 定姿

| 字段 | A 定格 | B sheet |
|---|---|---|
| 动作名 | 要 | 要（一个动作一张表） |
| 朝向 / 重心 / 四肢 / 持物 | 要 | 逐帧 |
| 帧数与格序 | — | 必须；缺则问或用适配器默认 |
| `key_cell` | — | 关键定格落在哪一格（有关键姿势时必填） |
| 衔接 | — | 邻帧只动该动的部位；书档按适配器 |

配方：[`references/pose-recipes.md`](references/pose-recipes.md)。

---

## Step 4 · 生成

**防缩水与锁比例的最佳实践（核心硬约束）**：
AI 极易在生成大动作（如拉弓、挥剑）时，因物理空间不足而“等比缩小”角色以强行塞入画框。为防止此现象，必须在输入约束、构图和后处理上打配合：

1. **同表锚定（Ruler in Grid）**：禁止逐张单图生成动作！按照 B 模式必须**整表一次生成**（如 3×3）。并且强制要求第一格或中心格为标准的「尺子帧 (`scale_ref`)」，让 AI 在生成其它大动作时始终有比例参照物。
2. **构图留白（防止物理挤压）**：生成大动作时，必须先拉大 Canvas（画格高度/宽度），并在 Prompt 明确写明 `NEVER truncate by cell edges` 及要求大量留白，给四肢展开留足空间，防止 AI 压迫主体比例。
3. **后处理矫正 (`--head-lock`)**：若切图种入（plant）阶段角色头身比依然有轻微误差，应使用执行器提供的 `--head-lock` 脚本自动基于头部 bounding box 缩放对齐（游侠拉弓等遮挡头部的极个别动作除外）。

Prompt 块：[`references/prompt-blocks.md`](references/prompt-blocks.md)。参考图优先级：

1. 立绘（身份）  
2. `scale_ref` / run0（身尺）  
3. 本动作已确认关键定格（姿势锁）

| | A 定格 | B sheet |
|---|---|---|
| 次数 | 一张 | **整表一次生成** |
| 前置 | — | 有关键姿势 → 先 A 且用户确认 |
| 禁止 | 无锚换脸换装 | 单格拼表；整人缩放充蹲；跳过定格赌表（除非用户明示） |
| 身尺 | ≈ 立绘或 scale_ref | 每格 ≈ 表内尺子格 / scale_ref |

幕布默认：角色 only、透明或纯净底、无场景。产品适配另有规定则跟适配器。

| 环境 | 做法 |
|---|---|
| Cursor `GenerateImage` | Prompt + `reference_image_paths` |
| 其它 CLI | 同 Prompt + 其参考图参数 |
| 无生图工具 | 交出 identity、parts、配方、可复制 Prompt |

---

## Step 5 · 验收

**A / B 共有**

- [ ] 与立绘同一人（脸、装、标志物、头身比）  
- [ ] 动作可读；持物在；无无故场景  

**仅 B**

- [ ] 关键格（若有）与已确认定格同姿势同装  
- [ ] **同尺量化**：相对尺子帧头高或 coreH 比 ∈ **0.88～1.12**（适配器可更严）。有脚本用脚本；无脚本则并排裁尺子帧目测并记录比值，超带即失败  
- [ ] 帧序自然（不换肢、不跳色、不瞬移）
- [ ] **单向流**：动作必须是从起手到收招的单向过渡，禁止出现同一动作来回播放/折返（Ping-pong）的冗余帧  
- [ ] 格可切、不跨格、刃/弓不裁切  
- [ ] 一帧不合格 → **整表重生**（禁单格挖补）

细则：[`references/sheet-contract.md`](references/sheet-contract.md)。

### 失败分类（改约束再重生，禁止整段 Prompt 推倒）

见 [`references/failure-classes.md`](references/failure-classes.md)。摘要：

| 类 | 只改什么 | 禁止 |
|---|---|---|
| 身尺漂 | SCALE / 参考图加 scale_ref | 重写脸与服装描述 |
| 人不像 | IDENTITY + 立绘参考权重 | 乱改动作帧序 |
| 动作不对 / 不连贯 | POSE / 帧序 / 关键定格 | 换画风 |
| 格切不开 / 跨格 | CANVAS gutter、构图收肢 | 单格挖补 |
| 持物缺失或穿帮 | PARTS 里 prop 句 | 丢掉 parts 重拆 |

---

## Step 6 · 放进执行器（模式 B）

1. 打开对应的适配器（例如：[`references/adapters/example-adapter.md`](references/adapters/example-adapter.md)）。  
2. 种入 / measure 按产品 skill；失败按上表分类返工。  
3. **禁止**「art-raw 有图 = 游戏能玩」。

无适配器：先问列行、帧序、透明、脚线，再写 `references/adapters/<产品>.md`。

---

## 不确定时先问

1. A 还是 B（已说明则不问）  
2. sheet 进哪个执行器；无适配器时的格数/帧序  
3. 无立绘时的画风要点  
4. 资产 / `characters/<id>` 落盘目录（默认路径用户未反对可用默认）  
5. 是否升细粒度  
6. 是否跳过「先定格再 sheet」（默认不跳过）

---

## 附加资源

- [`references/part-taxonomy.md`](references/part-taxonomy.md)  
- [`references/pose-recipes.md`](references/pose-recipes.md)  
- [`references/prompt-blocks.md`](references/prompt-blocks.md)  
- [`references/identity-template.md`](references/identity-template.md)  
- [`references/sheet-contract.md`](references/sheet-contract.md)  
- [`references/failure-classes.md`](references/failure-classes.md)  
- [`references/adapters/example-adapter.md`](references/adapters/example-adapter.md)  
- [`references/parts.schema.json`](references/parts.schema.json)
