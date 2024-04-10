---
title: 使用 Utterances 给 VitePress 添加评论功能
date: 2024-03-31
abstract: 本文简单介绍了 Utterances 并说明如何在 VitePress 中集成 Utterances。
tags:
- VitePress
---

# 使用 Utterances 给 VitePress 添加评论功能

## 什么是 Utterances

Utterances 是一个基于 Github issues 构建的开源评论小组件，可以用于博客以及 Wiki 等应用。你可以通过它的官网 [utteranc.es](https://utteranc.es/) 来快速生成一段脚本插入到自己的应用中。它没有跟踪，没有广告，永远免费并且所有的数据都存储在你仓库的 issues 中。

## Utterances 如何工作

Utterances 加载时会使用 Github [issue search API](https://docs.github.com/en/rest/search#search-issues) 去查找与页面关联的 issue (基于 `url`、`pathname` 或 `title` )。如果找不到与页面匹配的 issue ，当有人第一次给页面发表评论评论时，[utterances-bot](https://github.com/utterances-bot) 会自动创建一个 issue。

用户要发表评论必须授权 utterances 使用 Github [OAuth flow](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#web-application-flow) 代表他们发表。或者，用户可以直接在 GitHub issue 发表评论。

## 实操

### 选择一个仓库给 Utterances 连接

1. 确保存储库是公开的，否则您的读者将无法查看问题/评论。

2. 确保仓库安装了[utterances app](https://github.com/apps/utterances) ，否则用户将无法发表评论。

   ![utterances app](https://raw.githubusercontent.com/ivestszheng/images-store/master/img/image-20240401133008016.png)

   ![utterances 添加到仓库](https://raw.githubusercontent.com/ivestszheng/images-store/master/img/image-20240401133101375.png)

3. 如果您的存储库是 fork 的，请在 settings 选项卡中确认 issues 功能已打开。

### 在 VitePress 中创建评论组件

```vue
// docs\.vitepress\theme\components\Comment.vue
<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue';

const commentRef: Ref<HTMLElement | null> = ref(null);
onMounted(() => {
    try {
        if (commentRef.value) {
            const script = document.createElement('script');
            script.src = 'https://utteranc.es/client.js';
            script.async = true;
            script.crossOrigin = 'anonymous';
            script.setAttribute('repo', '[ENTER REPO HERE]');
            script.setAttribute('issue-term', 'pathname');
            script.setAttribute('label', 'Comment');
            script.setAttribute('theme', 'preferred-color-scheme');
            commentRef.value.appendChild(script);
        } else {
            console.warn('Comments won\'t load because the commentRef element is null.');
        }
    } catch (error) {
        console.error('Comments loading failed.', error);
    }
})
</script>
<template>
    <div ref="commentRef" id="comment"></div>
</template>
```

### 创建 Layout

```vue
// docs\.vitepress\theme\Layout.vue
<script setup lang="ts">
import { unref, computed } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Comment from './components/Comment.vue';

const { page } = useData()
const { Layout } = DefaultTheme
const isHome = computed(() => unref(page)?.filePath === 'index.md')
</script>

<template>
  <Layout>
    <template #doc-after>
      <!-- 首页 Layout 使用的是 doc 所以需要判断，如果是 page 不会使用插槽 -->
      <Comment v-if="!isHome" :key="page.filePath"></Comment>
    </template>
  </Layout>
</template>

```

```ts
// docs\.vitepress\theme\index.ts
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import Layout from "./Layout.vue";

const theme: Theme = {
  ...DefaultTheme,
  Layout: Layout,
};

export default theme;
```

至此，就可以我们的页面中出现了评论组件，如下图所示：

![utterances 实际效果](https://raw.githubusercontent.com/ivestszheng/images-store/master/img/image-20240401134907080.png)

## Utterances 相比 Gitalk 的优点

一开始我是使用 Gitalk 的，对我来说主要存在两个问题：

1. 由于我使用的是 Github Pages 免费服务，仓库必须公开。无法直接在客户端存放 OAuth 密钥，后面把仓库设为私有，使用 Vercel 部署又遇到了其他问题，总之最后没有成功。

2. Utterances 使用的 Github App 相比 OAuth App 可以更好地细分权限。

   ![utterances 权限更清晰](https://raw.githubusercontent.com/ivestszheng/images-store/master/img/image-20240401140739726.png)

3. Gitalk 无法开箱即用，我们需要自己对文章评论初始化；需要自己把 locaition.pathname 压缩到 50 字符以内。相比之下 Utterances 实在是太友好了。

最重要的是 Utterances 与 Gitalk 一样使用 Github issues 存放评论，即便后面我们更换了其他插件，评论的记录也不会消失。

## Demo

有兴趣的朋友可以去我的博客查看 [ivestszheng.github.io](https://ivestszheng.github.io/posts/前端/使用%20Utterances%20给%20Vitepress%20添加评论功能)

## 参考资料

1. [utteranc.es](https://utteranc.es/)
2. [How to apply utterances in VitePress](https://ktseo41.github.io/blog/posts/how-to-apply-utterances-on-vitepress.html)
