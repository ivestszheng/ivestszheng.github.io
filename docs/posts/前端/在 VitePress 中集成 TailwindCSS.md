---
title: 在 VitePress 中集成 TailwindCSS
date: 2024-04-05
abstract: 手把手教你如何在 VitePress 中集成 TailwindCSS。
---

# 在 VitePress 中集成 TailwindCSS

## 添加依赖

```shell
pnpm add tailwindcss @tailwindcss/postcss7-compat postcss autoprefixer -D
```

## 初始化 Tailwind 配置文件

```shell
pnpm dlx tailwindcss init
```

执行命令后，根目录下会生成文件 `tailwind.config.js`

## 修改 Tailwind 配置文件

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./docs/**/*.js",
    "./docs/**/*.ts",
    "./docs/**/*.vue",
    "./docs/**/*.md",
  ],
  options: {
    safelist: ["html", "body"],
  },
};
```

docs 是 VitePress 默认的[_项目根目录_](https://vitepress.dev/zh/guide/routing#root-and-source-directory)。

## 添加 Tailwind 指令到主 CSS 文件

```css
// ./docs/.vitepress/theme/style.css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

主 CSS 文件的名称随意，注意放在 theme 路径下即可

## 引入主 CSS 文件

需要在 `.vitepress/theme/index.js` 或 `.vitepress/theme/index.ts` 文件 (即[“主题入口文件”](https://vitepress.dev/zh/guide/custom-theme#theme-resolving)) 中引入主 CSS。

```typescript
//  docs/.vitepress/theme/index.ts
import "./tailwind.css";
// 此处省略了其他配置
```

## 创建 postcss.config.cjs

在根目录下创建 `post.config.cjs`

```js
// post.config.cjs
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

如果以 `.js` 作为后缀可能会遇到 ReferenceError，如下所示：

```shell
[ReferenceError] module is not defined in ES module scope
This file is being treated as an ES module because it has a '.js' file extension and '[filePath]\package.json' contains "type": "module". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.
```

所以最好以 `.cjs` 作为后缀。

至此，我们完成了在 VitePress 中集成 TailwindCSS。

## 参考资料

1. [VitePress + Tailwind + ant-design-vue + 图片放大 功能使用](https://carljin.com/posts/vitepress_antd_tailwind_zoom_image/)
2. [VitePress](https://vitepress.dev/zh/)
