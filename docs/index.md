---
layout: page
title: 首页
---

<script setup>
import { computed } from 'vue'
import  { data }  from './.vitepress/theme/posts.data'
import DetailedPostCard from './.vitepress/theme/components/DetailedPostCard.vue'
import nav from './.vitepress/nav'

const computedRecentPosts = computed(() => data.recentPosts.map(item => 
    ({...item, date: item.date.string})))
const morePostLink = nav[0].link
</script>
<div class="max-w-screen-lg w-full px-6 py-8 my-0 mx-auto">
  <DetailedPostCard
    v-for="(article, index) in computedRecentPosts"
    :key="index"
    :url="article.url"
    :title="article.title"
    :abstract="article.abstract"
    :date="article.date"
    :tag="article.tag"
  />
</div>
