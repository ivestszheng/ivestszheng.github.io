---
layout: doc
title: 首页-无声2017的博客
aside: false
lastUpdated: false
pageClass: home-page
---

<script setup>
import { computed } from 'vue'
import  { data }  from './.vitepress/theme/posts.data'
import DetailedPostCard from './.vitepress/theme/components/DetailedPostCard.vue'
import { nav } from './.vitepress/config'
import MorePosts from './.vitepress/theme/components/MorePosts.vue'

const computedRecentPosts = computed(() => data.recentPosts.map(item => 
    ({...item, date: item.date.string})))
const morePostLink = nav[0].link
</script>
<DetailedPostCard
  v-for="(article, index) in computedRecentPosts"
  :key="index"
  :url="article.url"
  :title="article.title"
  :abstract="article.abstract"
  :date="article.date"
/>
<MorePosts style="margin-top: 48px;" :url="morePostLink" />