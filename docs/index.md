---
layout: page
title: 首页
sidebar: false
---

<script setup>
import { computed } from 'vue'
import { data } from './.vitepress/theme/posts.data'
import DetailedPostCard from './.vitepress/theme/DetailedPostCard.vue'

const recentPosts = computed(() => 
  data.posts
    .slice(0, 10)
    .map(item => ({
      ...item,
      date: item.date.string
    }))
)
</script>

<div class="max-w-screen-lg w-full px-6 py-8 my-0 mx-auto">
  <DetailedPostCard
    v-for="(article, index) in recentPosts"
    :key="article.url"
    :url="article.url"
    :title="article.title"
    :abstract="article.abstract"
    :date="article.date"
    :tags="article.tags"
  />
</div>
