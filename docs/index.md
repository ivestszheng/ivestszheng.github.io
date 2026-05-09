---
layout: page
title: 首页
sidebar: false
name: HomePage
---

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { data } from './.vitepress/theme/post.data'
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
  try {
    const el = document.getElementById(elementId)
    if (!el) return null

    let observer: MutationObserver | null = null

    const update = () => {
      try {
        const text = el.textContent?.trim()
        if (text) {
          const val = parseInt(text)
          if (!isNaN(val)) {
            const formatted = countTransK(val)
            targetRef.value = formatted
            el.textContent = formatted
            observer?.disconnect()
            return true
          }
        }
      } catch (e) {
        console.error('createCountObserver update error:', e)
      }
      return false
    }

    if (update()) return null

    observer = new MutationObserver(() => update())
    observer.observe(el, { childList: true, characterData: true, subtree: true })
    return observer
  } catch (e) {
    console.error('createCountObserver error:', e)
    return null
  }
}

const initSiteStats = () => {
  try {
    const pvObserver = createCountObserver('vercount_value_site_pv', sitePv)
    if (pvObserver) observers.push(pvObserver)
    
    const uvObserver = createCountObserver('vercount_value_site_uv', siteUv)
    if (uvObserver) observers.push(uvObserver)
  } catch (e) {
    console.error('initSiteStats error:', e)
  }
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
