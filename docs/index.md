---
layout: page
title: 首页
sidebar: false
---

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { data } from './.vitepress/theme/posts.data'
import DetailedPostCard from './.vitepress/theme/DetailedPostCard.vue'
import { countTransK } from './.vitepress/utils/tools'

// 网站统计
const sitePv = ref('♾️')
const siteUv = ref('♾️')
const observers: MutationObserver[] = []

const createCountObserver = (
  elementId: string,
  targetRef: ReturnType<typeof ref<string>>
): MutationObserver | null => {
  const el = document.getElementById(elementId)
  if (!el) return null

  const update = () => {
    const text = el.textContent?.trim()
    if (text) {
      const val = parseInt(text)
      if (!isNaN(val)) {
        const formatted = countTransK(val)
        targetRef.value = formatted
        el.textContent = formatted
        observer.disconnect()
        return true
      }
    }
    return false
  }

  if (update()) return null

  const observer = new MutationObserver(() => update())
  observer.observe(el, { childList: true, characterData: true, subtree: true })
  return observer
}

const initSiteStats = () => {
  observers.push(createCountObserver('vercount_value_site_pv', sitePv)!)
  observers.push(createCountObserver('vercount_value_site_uv', siteUv)!)
}

const disconnectAll = () => {
  observers.forEach(o => o?.disconnect())
  observers.length = 0
}

// 当前只显示前8篇文章
const displayedPosts = computed(() => 
  data.posts
    .slice(0, 8)
    .map(item => ({
      ...item,
      date: item.date.string
    }))
)

// 组件挂载时初始化
onMounted(() => {
  initSiteStats()
})

// 组件卸载时清理
onUnmounted(() => {
  disconnectAll()
})
</script>

<div class="max-w-5xl w-full px-6 py-8 my-0 mx-auto">
  <DetailedPostCard
    v-for="(article, index) in displayedPosts"
    :key="article.url"
    :url="article.url"
    :title="article.title"
    :abstract="article.abstract"
    :date="article.date"
    :tags="article.tags"
  />
</div>
