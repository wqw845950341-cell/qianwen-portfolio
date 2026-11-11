# 巷遇 LaneMuse — AI CityWalk

[在线原型](https://wqw845950341-cell.github.io/qianwen-portfolio/citywalk/) · [作品集案例](https://wqw845950341-cell.github.io/qianwen-portfolio/#work-6)

面向自由行游客与城市探索者的移动端城市文化探索助手概念项目。支持偏好设置、路线地图联动、景点文化讲解、上下文对话、本机保存与用户确认后的路线调整。

当前是可交互前端原型：AI 和路线使用本地规则模拟，地图为示意；照片为 AI 生成的实拍风格素材。真实模型、路网导航、实时营业信息和服务端指标尚未接入。

文档：[PRD](docs/PRD.md)、[案例说明](docs/CASE-STUDY.md)、[设计规范](docs/DESIGN-SYSTEM.md)。

开发：`npm ci` 后运行 `npm run dev`。构建：`npm run build`。生产构建保持移动端模板完整性检查。

仓库 GitHub Pages 工作流会分别构建 citywalk 与 site，再通过 `site/scripts/sync-citywalk.mjs` 将原型静态文件适配到 `/qianwen-portfolio/citywalk/`。该步骤只修改构建产物，不修改受保护的设备、键盘和移动运行时源码。
