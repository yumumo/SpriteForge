# SpriteForge

**SpriteForge** 是一个通用的 2D AI 动画生成工业管线，专为创建高质量的角色动画和 Sprite Sheets 而设计。

## 🎯 项目概述

SpriteForge 解决了 AI 生成动画帧时常见的"比例漂移"和"逻辑回放"问题，提供了一套标准化的动画制作流程。

### 核心特性

- **语义拆件（Parts）**：将角色按部位进行语义化拆分
- **立绘锚定**：确保角色身份一致性
- **姿势配方**：标准化的动作生成流程
- **标准化 Sprite Sheet 锻造**：生成可直接用于游戏引擎的动画表
- **严格的 Schema 自检**：保证输出质量
- **标准适配器接口**：可轻松对接任意游戏引擎执行器

## 🚀 使用场景

- 创建一致性极高的角色动作
- 生成可用于游戏的 Sprite Sheets
- 需要标准化动画帧的项目
- 2D 动画制作流程自动化

## 🔧 工作流程

1. **立绘准备**：已有扫描图或生成新立绘
2. **语义拆件**：按部位拆分角色
3. **尺子帧设定**：建立统一的比例参考
4. **姿势定义**：使用配方定义动作
5. **动画生成**：一次性生成完整的动作表
6. **质量验收**：确保动作连贯性和比例一致性
7. **执行器集成**：将结果接入游戏引擎

## 📁 目录结构

```
SpriteForge/
├── cartoon-part-pose/     # 主要功能模块
│   ├── SKILL.md           # 核心使用文档
│   ├── examples/          # 示例文件
│   ├── references/        # 参考文档
│   └── tools/             # 工具脚本
└── _template/             # 模板文件
```

## 📚 相关文档

- [主要使用文档](cartoon-part-pose/SKILL.md)
- [语义拆件规范](cartoon-part-pose/references/part-taxonomy.md)
- [姿势配方](cartoon-part-pose/references/pose-recipes.md)
- [参考模板](cartoon-part-pose/references/identity-template.md)

## 📝 使用说明

请参考 `cartoon-part-pose/SKILL.md` 获取详细的使用方法和工作流程。

## 🤝 贡献

欢迎提出改进建议和贡献代码！

## 📄 许可证

MIT License
