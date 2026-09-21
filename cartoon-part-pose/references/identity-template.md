# Identity 卡模板

复制填写，确认后落盘到 `characters/<id>/identity.yaml`（或产品目录），再拆件。

```yaml
id: character_id
display_name: 显示名
style: chibi / anime-flat / ...
silhouette: "2.5 head-tall, slim"
palette:
  - "#......"  # hair
  - "#......"  # outfit main
  - "#......"  # accent
face_lock: "圆脸, 大眼, 刘海形状…"
signature:
  - 标志物1
  - 标志物2
forbid:
  - 换脸
  - 换装
  - 无故加场景
facing_default: right
reference_portrait: "path/to/portrait.png"
parts_path: "characters/<id>/parts.json"   # 相对 skill 或绝对/产品路径
scale_ref: "characters/<id>/scale_ref.png" # 古堡多为导出的 run0；没有则先出跑/站立
keyframes:
  # action: path to approved freeze frame
  # atk_full_draw: "characters/<id>/keyframes/atk-full-draw.png"
split_mode: semantic   # semantic（默认）| cutout（仅用户点名真切件时）
```

用户未给立绘路径时先问清。开新动作前先读本文件 + parts.json，禁止无故重写。
