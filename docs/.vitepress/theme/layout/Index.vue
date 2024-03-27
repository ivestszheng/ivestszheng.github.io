<script setup>
import Theme from 'vitepress/theme'

const { Layout } = Theme
</script>
<template>
  <Layout>
    <!-- #doc-after 表示在每篇文章的最后位置添加 Comment组件 -->
    <template #doc-after>
      <script src="https://utteranc.es/client.js" repo="ivestszheng/blog" issue-term="pathname" theme="github-light"
        crossorigin="anonymous" async>
</script>
    </template>
  </Layout>
</template>
