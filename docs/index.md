---
layout: doc
title: 首页-无声2017的博客
aside: false
lastUpdated: false
---

<script setup>
import { computed } from 'vue'
import  { data as recentPosts }  from './.vitepress/theme/recent.posts.data'
import DetailedPostCard from './.vitepress/theme/components/DetailedPostCard.vue'

const computedRecentPosts = computed(() => recentPosts.map(item => 
    ({...item, date: item.date.string})))
</script>

<DetailedPostCard :posts='computedRecentPosts' />
