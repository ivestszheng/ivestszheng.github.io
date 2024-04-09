---
layout: page
title: 归档
sidebar: false
---

<script setup>
import { computed } from 'vue'
import  { data }  from '../.vitepress/theme/posts.data'
import PostEntry from '../.vitepress/theme/PostEntry.vue'

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
    <PostEntry  v-for="(article, index2) in computedYearMap[year]" :key="index2" :url="article.url">
      {{ article.title }}
      <template #date>
        {{ article.date.string }}
      </template>
    </PostEntry>
  </div>
</div>
