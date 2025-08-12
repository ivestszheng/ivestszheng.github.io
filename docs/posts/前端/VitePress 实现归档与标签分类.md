---
date: 2024-04-14
abstract: 使用 VitePress 的 createContentLoader 函数以及 frontmatter 配置实现归档与标签分类功能。
tags:
  - VitePress
---

# VitePress 实现归档与标签分类

## 前置知识

### `createContentLoader`

当构建一个内容为主的站点时，我们经常需要创建一个“归档”或“索引”页面：一个我们可以列出内容中的所有可用条目的页面，例如博客文章或 API 页面。我们**可以**直接使用数据加载 API 实现这一点，但由于这会经常使用，VitePress 还提供了一个 `createContentLoader` 辅助函数来简化这个过程：

```js
// posts.data.js
import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/*.md', /* options */)
```

该辅助函数接受一个相对于[源目录](https://vitepress.dev/zh/guide/routing#source-directory)的 glob 模式，并返回一个 `{ watch, load }` 数据加载对象，该对象可以用作数据加载文件中的默认导出。它还基于文件修改时间戳实现了缓存以提高开发性能。

请注意，数据加载仅适用于 Markdown 文件——匹配的非 Markdown 文件将被跳过。

加载的数据将是一个类型为 `ContentData[]` 的数组：

```typescript
interface ContentData {
  // 页面的映射 URL，如 /posts/hello.html（不包括 base）
  // 手动迭代或使用自定义 `transform` 来标准化路径
  url: string
  // 页面的 frontmatter 数据
  frontmatter: Record<string, any>

  // 只有启用了相关选项，才会出现以下内容
  // 我们将在下面讨论它们
  src: string | undefined
  html: string | undefined
  excerpt: string | undefined
}
```

### frontmatter

VitePress 支持在所有 Markdown 文件中使用 YAML frontmatter，并使用 [gray-matter](https://github.com/jonschlinkert/gray-matter) 解析。frontmatter 必须位于 Markdown 文件的顶部 (在任何元素之前，包括 `<script>` 标签)，并且需要在三条虚线之间采用有效的 YAML 格式，以本文为例：

```markdown
title: VitePress 实现归档与标签分类
date: 2024-04-14
abstract: 使用 VitePress 的 createContentLoader 函数以及 frontmatter 配置实现归档与标签分类功能。
tags:
  - VitePress
```

上面的 frontmatter 每个字段具体含义如下：

- title：标题
- date：创建日期
- abstract：文章摘要
- tags：自定义的标签

## 生成需要的数据

新建 `docs/.vitepress/theme/post.data.ts`，核心代码如下：

```js
export default createContentLoader("posts/*/*.md", {
  transform(raw): data {
    const postMap = {};
    const yearMap = {};
    const tagMap = {};
    const posts = raw
      .map(({ url, frontmatter }) => {
        let tags = [url.split("/")[2]];
        if (frontmatter?.tags) {
          tags = [...tags, ...frontmatter.tags];
        }
        const result = {
          title: frontmatter.title,
          url,
          date: formatDate(frontmatter.date),
          abstract: frontmatter.abstract,
          tags,
        };
        postMap[result.url] = result;
        return result;
      })
      .sort((a, b) => b.date.time - a.date.time);

    posts.forEach((item) => {
      const year = new Date(item.date.string).getFullYear();
      if (!yearMap[year]) {
        yearMap[year] = [];
      }
      yearMap[year].push(item.url);
      
      item.tags.forEach((tag) => {
        if(!tagMap[tag]){
          tagMap[tag] = []
        }
        tagMap[tag].push(item.url)
      })
    });

    return {
      yearMap,
      postMap,
      tagMap,
    };
  },
});
```

`posts` 是 `docs/posts` 路径下所有文章形成的数组，`postMap` 是以 `url` 为键，文章为值形成的键值对，例如 `url` 为 `"/posts/前端/VitePress 实现归档与标签分类"` 的值如下：

```json
{
    "title": "VitePress 实现归档与标签分类",
    "url": "/posts/前端/VitePress 实现归档与标签分类",
    "date": {
        "time": 1713052800000,
        "string": "2024-04-14"
    },
    "abstract": "使用 VitePress 的 createContentLoader 函数以及 frontmatter 配置实现归档与标签分类功能。",
    "tags": [
        "前端",
        "VitePress"
    ]
}
```

`yearMap` 是年份与 `url` 形成的键值对，`tagMap` 是标签与 `url` 形成的字典。这样做为了尽可能地减小最后生成文件的体积（本想导出三个 `Map` 的，但是不支持）。

## 归档

要实现的效果如下图所示：

![VitePress 归档页面](https://raw.githubusercontent.com/ivestszheng/images-store/master/img/image-20240414191326651.png)

新建文件 `docs/pages/archives.md`（样式由 TailwindCSS 实现），具体代码如下：

```markdown
---
layout: page
title: 归档
sidebar: false
---

<script setup>
import { computed } from 'vue'
import  { data }  from '../.vitepress/theme/posts.data'

const { yearMap,postMap } = data
const yearList = Object.keys(yearMap).sort((a, b) => b - a); // 按年份降序排序
const computedYearMap = computed(()=> {
  let result = {}
  for(let key in yearMap) {
    result[key] = yearMap[key].map(url => postMap[url])
  }
  return result
})
</script>
<div class="max-w-screen-lg w-full px-6 py-8 my-0 mx-auto">
  <div v-for="year in yearList" :key="year">
    <div v-text="year" class="pt-3 pb-2 text-xl font-serif"></div>
    <div v-for="(article, index2) in computedYearMap[year]" :key="index2" class="flex justify-between items-center py-1 pl-6">
        <a v-text="article.title" :href="article.url" class="post-dot overflow-hidden whitespace-nowrap text-ellipsis">
        </a>
        <div v-text="article.date.string" class="pl-4 font-serif whitespace-nowrap" >
        </div>
    </div>
  </div>
</div>
```

## 标签

要实现的效果如下图所示：

![VitePress 标签分类](https://raw.githubusercontent.com/ivestszheng/images-store/master/img/123.gif)

新建文件 `docs/pages/tags.md`，具体代码如下：

```markdown
---
layout: page
title: 标签
sidebar: false
---

<script setup>
import { ref, unref, computed, onMounted } from 'vue'
import  { data }  from '../.vitepress/theme/posts.data'

const { tagMap,postMap } = data
const tags = Object.keys(tagMap)
const computedTagMap = computed(()=> {
  let result = {}
  for(let key in tagMap) {
    result[key] = tagMap[key].map(url => postMap[url])
  }
  return result
})

const currentTag = ref(null)
function onTagClick(newTag){
    currentTag.value = newTag
}
const postList = computed(()=> (unref(computedTagMap)[unref(currentTag)]))
onMounted(()=>{
  const searchParams = new URLSearchParams(window.location.search)
  if(searchParams.get('tag')) currentTag.value = searchParams.get('tag')
})

</script>
<div class="max-w-screen-lg w-full px-6 py-8 my-0 mx-auto">
    <div class="flex flex-wrap gap-4">
        <div v-for="(tag,i) in tags" :key="i" class="block py-1 px-4 bg-[var(--vp-c-bg-alt)] text-[var(--vp-c-text-1)] cursor-pointer hover:text-[var(--vp-c-brand)]" @click="onTagClick(tag)">
            <span>{{ tag }}</span>
            <span class="pl-1 text-[var(--vp-c-brand)]"> {{ computedTagMap[tag].length }}</span>
        </div>
    </div>
    <p v-text="currentTag" class="py-4 text-2xl"></p>
    <div v-for="(article, index) in postList" :key="index" class="flex justify-between items-center py-1 pl-6">
      <a v-text="article.title" :href="article.url" class="post-dot overflow-hidden whitespace-nowrap text-ellipsis">
      </a>
      <div v-text="article.date.string" class="pl-4 font-serif whitespace-nowrap" >
      </div>
    </div>
</div>
```

## 参考资料

1. [`createContentLoader` - VitePress](https://vitepress.dev/zh/guide/data-loading#createcontentloader)
2. [frontmatter - VitePress](https://vitepress.dev/zh/guide/frontmatter#frontmatter)
