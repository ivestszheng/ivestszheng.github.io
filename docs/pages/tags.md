---
layout: page
title: 标签
sidebar: false
---
<script setup>
import { ref, computed } from 'vue'
import  { data }  from '../.vitepress/theme/posts.data'
import PostEntry from '../.vitepress/theme/components/PostEntry.vue'

const { tagMap,postMap } = data
const tags = Object.keys(tagMap)
const computedTagMap = computed(()=> {
  let result = {}
  for(let key in tagMap) {
    result[key] = tagMap[key].map(url => postMap[url])
  }
  return result
})
console.log(computedTagMap)
const currentTag = ref(null)
function onTagClick(newTag){
    currentTag.value = newTag
}
</script>
<div class="max-w-screen-lg w-full px-6 py-8 my-0 mx-auto">
    <div class="flex flex-wrap gap-4">
        <div v-for="(tag,i) in tags" :key="i" class="block py-1 px-4 bg-[var(--vp-c-bg-alt)] text-[var(--vp-c-text-1)] cursor-pointer hover:text-[var(--vp-c-brand)]" @click="onTagClick(tag)">
            <span>{{ tag }}</span>
            <span class="pl-1 text-[var(--vp-c-brand)]"> {{ computedTagMap[tag].length }}</span>
        </div>
    </div>
    <p v-text="currentTag" class="py-4 text-2xl"></p>
    <PostEntry  v-for="(article, index2) in computedTagMap[currentTag]" :key="index" :url="article.url">
      {{ article.title }}
      <template #date>
        {{ article.date.string }}
      </template>
    </PostEntry>
</div>