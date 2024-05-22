---
layout: page
title: 标签
sidebar: false
---

<script setup>
import { ref, unref, computed, onMounted } from 'vue'
import  { data }  from '../.vitepress/posts.data'
import PostCard from '../.vitepress/PostCard.vue'

const { tagMap,postMap } = data
const tags = Object.keys(tagMap).sort((a,b)=> tagMap[b].length - tagMap[a].length)
const computedTagMap = computed(()=> {
  let result = {}
  for(let key in tagMap) {
    result[key] = tagMap[key].map(url => postMap[url])
  }
  return result
})

const currentTag = ref(tags[0])
function onTagClick(newTag){
    currentTag.value = newTag
}
const postList = computed(()=> (unref(computedTagMap)[unref(currentTag)]))

onMounted(()=>{
  const searchParams = new URLSearchParams(window.location.search)
  if(searchParams.get('tag')) currentTag.value = searchParams.get('tag')
})
</script>
<div class="max-w-screen-lg w-full md:px-6 md:py-8 mx-auto pt-1">
    <div class="flex md:flex-wrap gap-1 md:gap-4 overflow-x-auto py-2">
        <div v-for="(tag,i) in tags" :key="i"
            class="block py-1 px-2 md:px-4 md:bg-[var(--vp-c-bg-alt)] text-[var(--vp-c-text-1)] cursor-pointer md:hover:text-[var(--vp-c-brand)] whitespace-nowrap"
            @click="onTagClick(tag)">
            <span :class="{'text-[var(--vp-c-brand)]': tag === currentTag}">{{ tag }}</span>
            <span class="hidden md:inline-block pl-1 text-[var(--vp-c-brand)]"> {{ computedTagMap[tag].length
                }}</span>
        </div>
    </div>
    <div
        class="max-w-screen-lg w-full md:px-1 py-2 md:py-8 mx-auto bg-gray-100 md:bg-white flex flex-col space-y-2">
        <PostCard v-for="(article, index) in postList"
            :class="{'md:border-b border-gray': index !== postList.length - 1}" :key="index" :url="article.url"
            :title="article.title" :abstract="article.abstract" :date="article.date.string" :tags="article.tags" />
    </div>
</div>
