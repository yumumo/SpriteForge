# Prompt 块模板（工具无关）

按顺序拼接。

```text
[IDENTITY]
Cartoon character, style: {style}. Same person as reference portrait.
Silhouette: {silhouette}. Palette: {palette}.
Face lock: {face_lock}. Signature: {signature}.
FORBIDDEN: {forbid}; do not redesign face, outfit, or proportions.

[PARTS — keep all consistent]
head, torso, arms L/R (upper/lower), hands, legs L/R, feet,
props: {prop_list}, deco: {deco_list}.

[POSE]
{pose_recipe_english_or_clear_chinese}

[CANVAS]
{canvas_rule}
Default if user silent: plain or fully transparent background; character only; no scene, no ground, no castle.

[OUTPUT]
Full body (unless user asked half-body). Sharp readable silhouette. Do not truncate limbs or props.
```

## A · 定格（单张）

`[POSE]` 只写这一瞬间。`[OUTPUT]`：one single full-body pose, not a sprite sheet.  
参考图：立绘；若已有 `scale_ref` 也带上。

## B · sheet（一个动作的全部帧）

遵守 [`sheet-contract.md`](sheet-contract.md)。参考图：**立绘 + scale_ref +（若有）关键定格**。

```text
[POSE]
One action only: {action}. Frame order: {frame_list}.
Key cell {key_cell_index}: MUST match the approved keyframe reference pose
(same stance, same outfit, same prop angle). Other cells are only transitions.
Adjacent frames are the next instant of the SAME move (smooth, natural).
CRITICAL: The motion must be UNIDIRECTIONAL (from start to finish without ping-pong or reverse playback).
Do not swap limbs, recolor clothes, or teleport the body between cells.

[SCALE]
Same head size and torso thickness in EVERY cell as the scale-reference image
(and the bookend/scale cell in-grid). Crouch or roll by bending knees only.
NEVER shrink or enlarge the whole character to fit a weapon or effect.

[OUTPUT]
Single equal grid, generated as ONE image (do not draw cells separately).
Wide transparent gutters. Character, weapon, and effects stay inside each cell.
{adapter_extra}
```

无关键定格且用户未豁免时：先走 A，再填 `{key_cell_index}`。  
`{adapter_extra}`：适配器具体规则请见对应的 `adapters/` 文档。
