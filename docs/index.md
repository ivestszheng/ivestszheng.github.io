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

// 当前显示的文章数量
const displayedCount = ref(10)
// 是否已加载完所有文章
const hasMore = ref(true)

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

// 当前显示的文章列表
const displayedPosts = computed(() => 
  data.posts
    .slice(0, displayedCount.value)
    .map(item => ({
      ...item,
      date: item.date.string
    }))
)

// 检查是否还有更多文章
const checkHasMore = () => {
  hasMore.value = displayedCount.value < data.posts.length
}

// 加载更多文章
const loadMore = () => {
  if (!hasMore.value) return
  
  displayedCount.value += 10
  checkHasMore()
}

// 滚动监听函数
const handleScroll = () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
  const clientHeight = document.documentElement.clientHeight || document.body.clientHeight
  
  // 距离底部100px时触发加载
  if (scrollHeight - scrollTop - clientHeight <= 100) {
    loadMore()
  }
}

// 组件挂载时添加滚动监听
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  checkHasMore()
  initSiteStats()
})

// 组件卸载时移除滚动监听
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
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
  
  <!-- 没有更多文章提示 -->
  <div v-if="!hasMore" class="text-center py-8">
    <p class="text-gray-500">没有更多了，去阅读文章吧~~</p>
  </div>
</div>
