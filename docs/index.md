---
layout: doc
title: 首页
aside: false
lastUpdated: false
pageClass: home-page
doc-after: false
---

<script setup>
import { computed } from 'vue'
import  { data }  from './.vitepress/theme/posts.data'
import DetailedPostCard from './.vitepress/theme/components/DetailedPostCard.vue'
import nav from './.vitepress/nav'
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
  :tag="article.tag"
/>
<MorePosts style="margin-top: 48px;" :url="morePostLink" />