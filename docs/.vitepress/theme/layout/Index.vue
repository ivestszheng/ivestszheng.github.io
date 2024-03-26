<script setup>
import Theme from 'vitepress/theme'
import Comment from './Comment.vue'
import { useRoute } from 'vitepress'

const { Layout } = Theme
const route = useRoute()
</script>
<template>
  <Layout>
    <!-- #doc-after 表示在每篇文章的最后位置添加 Comment组件 -->
    <template #doc-after>
      <Comment :key="route.path" />
    </template>
  </Layout>
</template>
