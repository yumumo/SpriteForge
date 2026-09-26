# SpriteForge 多维度骨骼动作预设使用指南

本指南介绍了如何在 SpriteForge 中使用多维度预设骨骼动作配方来生成角色动画。

## 预设系统概述

SpriteForge 提供了一套全面的多维度骨骼动作预设系统，用于快速生成高质量的角色动画。该系统基于 SpriteForge 的核心原则设计，确保生成的动作在姿态、比例和连贯性方面保持一致。

## 预设系统分类

SpriteForge 预设系统分为四个主要维度：

### 1. 动作预设 (Action Presets)
适用于角色的动态行为和运动状态：
- run, jump, attack, idle, crouch, fly, walk, roll, jump_attack, flip

### 2. 表情预设 (Expression Presets)
用于表现角色的情感状态：
- smile, cry, angry, wink, surprised, thinking

### 3. 姿态预设 (Posture Presets)
用于表现角色的静态姿态和特殊动作：
- breathing, hair_flip, shoulder_tap, wave, hands_behind_back

### 4. 多角度支持 (Multi-angle Support)
支持不同视角的预设：
- front_view, side_view, back_view

## 使用方法

### 方法一：直接使用预设

在生成动画时，只需指定预设名称和 `preset: true`：

```yaml
action: run
preset: true
description: "角色正在奔跑"
```

### 方法二：指定视角预设

```yaml
action: smile
preset: true
angle: front
description: "角色正在微笑"
```

### 方法三：手动指定配方

如果需要更精确的控制，可以手动指定配方：

```yaml
action: attack
pose_recipe: |
  Pose: side-view facing RIGHT, attacking.
  Right arm extended forward with bow string pulled back.
  Left arm holding bow handle. Body slightly leaned forward.
  Prop_bow held properly with string tension.
  Full body, no crop.
```

## 预设设计原则

### 多维度覆盖
预设系统涵盖动作、表情、姿态等多个维度，满足不同类型动画需求。

### 一致性
所有预设都遵循统一的配方标准，确保生成结果的一致性和可预测性。

### 标准化
每个预设包含：
- `description`: 预设的简要描述
- `pose_recipe`: 用于生成动作的具体配方
- `keyframe`: 关键帧名称，用于在动画表中定位标准姿势
- `angle`: 视角信息，标明该预设适用的视角

### 可扩展性
预设系统设计灵活，便于添加新的预设类型和具体预设。

## 最佳实践

1. **选择合适维度**：根据需要选择动作、表情或姿态预设
2. **注意视角匹配**：确保预设视角与生成需求匹配
3. **保持一致性**：所有动作都应该使用相同的参考图像和比例尺
4. **合理使用关键帧**：确保关键帧在正确的网格位置
5. **动作连贯性**：相邻动作之间应该有平滑的过渡
6. **验证结果**：生成后检查动作是否符合预期

## 验证预设

可以通过以下方式验证预设是否正确加载：

```bash
# 在 SpriteForge 目录中运行
node core/skills/cartoon-part-pose/tools/validate_parts.mjs <path/to/parts.json>
```

## 扩展预设

如需添加新的预设，可以：
1. 在 `references/pose-presets.yaml` 文件中添加新预设
2. 保持相同的格式和结构
3. 更新相关文档
4. 测试新预设的功能

## 注意事项

1. 预设基于标准角色设定，包括装备和外观特征
2. 生成动作时，建议使用相同的参考图像和比例尺以保证一致性
3. 如需自定义动作，可以修改配方中的具体描述，但建议保持基本结构不变
4. 所有动作都经过优化，确保在动画生成过程中保持正确的身体比例和姿态
5. 使用多角度预设时要注意视角的一致性