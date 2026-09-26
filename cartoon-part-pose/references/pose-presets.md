# SpriteForge 多维度骨骼动作预设系统

此文档定义了 SpriteForge 中可用的多维度骨骼动作预设，用于快速生成一致的角色动画。

## 预设系统概述

SpriteForge 的预设系统分为三个主要维度：
1. **动作预设** - 角色的基本动作行为
2. **表情预设** - 角色的情感表达
3. **姿态预设** - 角色的静态姿态和特殊动作

## 预设分类详解

### 1. 动作预设 (Action Presets)
适用于角色的动态行为和运动状态：

- **run** - 跑步动作
- **jump** - 跳跃动作  
- **attack** - 攻击动作
- **idle** - 待机动作
- **crouch** - 蹲伏动作
- **fly** - 飞行动作
- **walk** - 走路动作
- **roll** - 滚动动作
- **jump_attack** - 跳跃攻击动作
- **flip** - 翻滚动作

### 2. 表情预设 (Expression Presets)
用于表现角色的情感状态：

- **smile** - 微笑表情
- **cry** - 哭泣表情
- **angry** - 生气表情
- **wink** - 眨眼表情
- **surprised** - 惊讶表情
- **thinking** - 思考表情

### 3. 姿态预设 (Posture Presets)
用于表现角色的静态姿态和特殊动作：

- **breathing** - 呼吸动态
- **hair_flip** - 撩头发
- **shoulder_tap** - 搭肩
- **wave** - 挥手
- **hands_behind_back** - 背手

### 4. 多角度支持 (Multi-angle Support)
支持不同视角的预设：

- **front_view** - 正面视角
- **side_view** - 侧面视角
- **back_view** - 背面视角

## 使用方法

### 基本使用
在 SpriteForge 中使用预设动作：

```yaml
action: run
preset: true
```

### 指定视角
```yaml
action: smile
preset: true
angle: front
```

### 手动指定配方
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

1. **多维度覆盖**：涵盖动作、表情、姿态等多个维度
2. **一致性**：所有预设都遵循相同的配方结构和格式
3. **可扩展性**：易于添加新的预设类型和具体预设
4. **标准化**：动作描述、配方格式、关键帧标识统一
5. **实用性**：预设覆盖常用的游戏动画需求
6. **多角度支持**：支持不同视角的预设以适应不同需求

## 预设结构说明

每个预设包含以下字段：
- **description**: 动作的简要描述
- **pose_recipe**: 用于生成动作的具体配方
- **keyframe**: 关键帧名称，用于在动画表中定位标准姿势
- **angle**: 视角信息，标明该预设适用的视角

## 最佳实践

1. **选择合适维度**：根据需要选择动作、表情或姿态预设
2. **注意视角匹配**：确保预设视角与生成需求匹配
3. **保持一致性**：所有动作都应该使用相同的参考图像和比例尺
4. **合理使用关键帧**：确保关键帧在正确的网格位置
5. **动作连贯性**：相邻动作之间应该有平滑的过渡
6. **验证结果**：生成后检查动作是否符合预期