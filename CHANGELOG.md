# 更新记录 


### [1.9.14](https://github.com/ivestszheng/ivestszheng.github.io/compare/v1.9.13...v1.9.14) (2026-05-15)

### [1.9.13](https://github.com/ivestszheng/ivestszheng.github.io/compare/v1.9.12...v1.9.13) (2026-05-15)

### [1.9.12](https://github.com/ivestszheng/ivestszheng.github.io/compare/v1.9.11...v1.9.12) (2026-05-15)

### [1.9.11](https://github.com/ivestszheng/ivestszheng.github.io/compare/v1.9.10...v1.9.11) (2026-05-15)

### [1.9.10](https://github.com/ivestszheng/ivestszheng.github.io/compare/v1.9.9...v1.9.10) (2026-05-15)


### ♻️ Code Refactoring | 代码重构

* **config:** 实现动态生成每页的Open Graph和Twitter卡片元标签，优化社交媒体分享效果，自动处理页面标题、描述和分享图片，统一补全绝对路径确保微信等平台可以正确抓取展示 ([5182152](https://github.com/ivestszheng/ivestszheng.github.io/commit/5182152f43c9f05dd862d89ea64dee4acd9f3f26))

### [1.9.9](https://github.com/ivestszheng/ivestszheng.github.io/compare/v1.9.8...v1.9.9) (2026-05-09)


### ♻️ Code Refactoring | 代码重构

* 重新组织文件，简化与规范路由;首页列表组件样式重构，增加标签页跳转功能;黑暗模式颜色统一。 ([584d0ac](https://github.com/ivestszheng/ivestszheng.github.io/commit/584d0ac4e997e534af2300f5ef1e4893ab42b618))

### [1.9.8](https://github.com/ivestszheng/ivestszheng.github.io/compare/v1.9.7...v1.9.8) (2026-05-08)


### 🚀 Chore | 部署相关

* 重构项目配置并优化类型定义 ([a833220](https://github.com/ivestszheng/ivestszheng.github.io/commit/a8332206a741f4e9537740ce3a58423c2d2914e6))


### 🐛 Bug Fixes | Bug 修复

* 修复语法问题导致的浏览器后退时无法记住之前的页面高度 ([3780aff](https://github.com/ivestszheng/ivestszheng.github.io/commit/3780affc555c7aff4a5a72727156c39d8ec93540))

### [1.8.2](https://github.com/ivestszheng/ivestszheng.github.io/compare/v1.8.1...v1.8.2) (2026-04-23)


### 👷 Continuous Integration | CI/CD 配置

* 修复 release.yml 中 standard-version 的消息格式 ([dd48575](https://github.com/ivestszheng/ivestszheng.github.io/commit/dd485755e7d0063456bc9698122300d98341d3fb))


### 🚀 Chore | 部署相关

* 回滚版本至1.8.1并更新release工作流 ([cc1644d](https://github.com/ivestszheng/ivestszheng.github.io/commit/cc1644d3ed9d21497ca5cf1ace929df43310861a))

### [1.8.1](https://github.com/ivestszheng/ivestszheng.github.io/compare/v1.8.0...v1.8.1) (2026-04-23)


### 🐛 Bug Fixes | Bug 修复

* 修复 release.yml 中的格式问题并移除多余空格 ([a341bcf](https://github.com/ivestszheng/ivestszheng.github.io/commit/a341bcf22843744cc245cabc136e7f2ab62cb808))
* **docs:** 恢复站点统计功能并调整页脚布局 ([5631a80](https://github.com/ivestszheng/ivestszheng.github.io/commit/5631a80dbf4c5e8f769eb80abe4c59c497408a12))

## [1.8.0](https://github.com/ivestszheng/ivestszheng.github.io/compare/v1.7.2...v1.8.0) (2026-04-23)


### ✨ Features | 新功能

* **docs:** 添加网站访问统计功能并优化布局 ([a10dcad](https://github.com/ivestszheng/ivestszheng.github.io/commit/a10dcad204abc583b03f0363dbd98078332a4485))

### [1.7.2](https://github.com/ivestszheng/ivestszheng.github.io/compare/v1.7.1...v1.7.2) (2026-04-21)


### ♻️ Code Refactoring | 代码重构

* **docs:** 优化文档配置和移除调试代码 ([1afc8d6](https://github.com/ivestszheng/ivestszheng.github.io/commit/1afc8d6b6d1e50d1796b7e85fb845c9e7ebf55da))

### [1.7.1](https://github.com/ivestszheng/ivestszheng.github.io/compare/v1.7.0...v1.7.1) (2026-04-21)


### 🐛 Bug Fixes | Bug 修复

* 修复了因使用countTransK导致readingTime为 NaN 的问题 ([963593e](https://github.com/ivestszheng/ivestszheng.github.io/commit/963593e1f0f107c9d9cb9dbe86857251291ace9d))


### 👷 Continuous Integration | CI/CD 配置

* **workflows:** 防止github-actions[bot]触发构建并添加推送步骤 ([7ee058b](https://github.com/ivestszheng/ivestszheng.github.io/commit/7ee058b796c04c39f97f1030968b576cab2f95e9))


### 🚀 Chore | 部署相关

* **release:** 1.8.0 ([2f57fd9](https://github.com/ivestszheng/ivestszheng.github.io/commit/2f57fd9fbf6655999df52361d875832160b0e449))
* **release:** 回滚版本至1.7.0并更新release工作流 ([0119db0](https://github.com/ivestszheng/ivestszheng.github.io/commit/0119db0b96517bebbe37723e3f801295fb7216cf))

## [1.7.0](https://github.com/ivestszheng/ivestszheng.github.io/compare/v1.6.0...v1.7.0) (2026-04-21)


### ✨ Features | 新功能

* **docs:** 添加网站访问量统计和阅读数据展示功能 ([bdc4aef](https://github.com/ivestszheng/ivestszheng.github.io/commit/bdc4aef0293aaa65c6542f04585f0253e2b7c7d2))
* **docs:** 添加fancybox图片画廊功能 ([45f558f](https://github.com/ivestszheng/ivestszheng.github.io/commit/45f558fd55ffc2ab24ffa28dfc722bde10b64b92))


### 👷 Continuous Integration | CI/CD 配置

* 添加自动更新 changelog 的 workflow ([61acee1](https://github.com/ivestszheng/ivestszheng.github.io/commit/61acee17bf506e87ae7d3a3b723c4ed266653e4f))
* **workflow:** 优化 release 工作流配置 ([f1ac2dd](https://github.com/ivestszheng/ivestszheng.github.io/commit/f1ac2dd54468869dc992b24202762fa7c2ffcb3d))

## 1.0.0 (2026-04-21)


### 🚀 Chore | 部署相关

* 更新版本号至1.6.0 ([6b88bb9](https://github.com/ivestszheng/ivestszheng.github.io/commit/6b88bb9120663397dd1ebcee0eddfca45918213e))
