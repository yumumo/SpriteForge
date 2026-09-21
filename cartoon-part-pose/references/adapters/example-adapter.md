# 适配器 · 游戏引擎示例 (Example Adapter)

> 模式 B 要在特定游戏里直接播时，参考此类文件。这是一个通用示例，实际项目中应建立 `your-project-adapter.md` 并在 `SKILL.md` 中指向它。

## 顺序（硬）

```
立绘确认 + parts 落盘
  → 若无 game run0：先跑表（或导出 run0 为 scale_ref）
  → 该动作若有关键姿势：先 A 定格，用户确认 → keyframes/
  → 整表 3×3 一次生成（参考：立绘 + run0 + 定格）
  → 种入前同尺 QA
  → plant_blob_sheet → measure → bump
```

禁止：无 run0 直接出攻/跳/滚；跳过满弦等关键定格直接赌整表（用户明示除外）。

## 执行器吃什么

| 动作 | 文件 | 布局 |
|---|---|---|
| 跑 | `*-run-sheet.png` | 3×3 / 9 |
| 跳 | `*-jump-sheet.png` | 3×3：`run\|ant\|jump×2\|fly×2\|land\|ant\|run` |
| 攻 | `*-atk-sheet.png` | 3×3：首尾跑步尺 + 蓄力…回收；满弦等为 key_cell |
| 滚 | `*-roll-sheet.png` | 3×3：首尾跑步尺 |

宫格只许 2×2 / 3×3 / 4×4。禁止横条入库。

## 身尺

- 尺子 = **跑步表第 0 格（run0）**。  
- 书档 = 与 run0 同姿势同身尺；种入后盖戳。  
- 中间格头尺相对 run0 缩放系数 ∈ **0.88～1.12**。  
- 蹲/滚弯膝，禁止整人缩放。

## 同尺量化（种入前）

```bash
# 生图源可切、同尺校验示例脚本
python tools/qa_sheet_scale.py --sheet <png>
# 种入后
python tools/audit_sheet_matte.py --sheet <assets-sheet> --cols 3 --rows 3
```

FAIL → 失败类 `scale`/`matte`，整表重生，禁止挖补。

## 丝滑与关键格

- 按上表帧序；邻格同一招下一瞬间。
- **单向过渡硬约束**：整张 Sheet 必须是从起手到收招的**单向连续流**，禁止折返（ping-pong）、动画倒放或反复横跳。
- 攻表：用户确认的满弦/出箭定格必须落在约定格，与 A 一致。

## 幕布

透明底、宽透明缝、无场景、默认无灰框。

## 怎样才算能玩

`art-raw` 有图 ≠ 能玩。必须切图、植入项目（plant）、并验证无误后才行。  
用户说「试一张、不入库」→ 停在生图验收。

## 本适配器不做

- 不把特定项目的分辨率强制写死成「所有游戏」规则。  
- 纯 A 定格不强制走 plant。
