---
layout: page
title: 首页
---

<script setup>
import { computed } from 'vue'
import  { data }  from './.vitepress/posts.data'
import PostCard from './.vitepress/PostCard.vue'
import nav from './.vitepress/nav'
</script>

<div class="max-w-screen-lg w-full md:px-1 py-2 md:py-8 mx-auto bg-gray-100 md:bg-white flex flex-col space-y-2">
  <PostCard
    v-for="(article, index) in data.recentPosts"
    :class="{'md:border-b border-gray': index !== data.recentPosts.length - 1}"
    :key="index"
    :url="article.url"
    :title="article.title"
    :abstract="article.abstract"
    :date="article.date.string"
    :tags="article.tags"
  />
</div>
