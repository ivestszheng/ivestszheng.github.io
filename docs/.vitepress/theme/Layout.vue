<script setup lang="ts">
import { useData } from 'vitepress'
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import DefaultTheme from 'vitepress/theme'
import Comment from './Comment.vue';
import dayjs from 'dayjs'
import { countWord, countTransK } from '../utils/tools'

const { page } = useData()
const { Layout } = DefaultTheme

// 字数统计
const wordCount = ref('')
const updateWordCount = () => {
  const docDomContainer = document.querySelector('#VPContent')
  const content = docDomContainer?.querySelector('.content-container .main')?.textContent || ''
  wordCount.value = countWord(content)
}
const readingTime = computed(() => {
  // 如果字数为0，则阅读时长为0
  if (wordCount.value === 0) return 0

  // 假设平均阅读速度为每分钟 300 字
  const wordsPerMinute = 300

  // 计算分钟数，并向上取整 (Math.ceil)，确保不足1分钟也按1分钟算
  return Math.ceil(wordCount.value / wordsPerMinute)
})

// 阅读量 (使用 MutationObserver 替代轮询)
const pv = ref('♾️')
let observer: MutationObserver | null = null

const initPVObserver = () => {
  const pvEl = document.getElementById('vercount_value_page_pv')
  if (!pvEl) return

  // 如果已有内容，直接读取
  if (pvEl.textContent && pvEl.textContent.trim()) {
    const val = parseInt(pvEl.textContent.trim())
    if (!isNaN(val)) {
      pv.value = countTransK(val)
      return
    }
  }

  // 监听变化
  observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList' || mutation.type === 'characterData') {
        const text = pvEl.textContent?.trim()
        if (text) {
          const val = parseInt(text)
          if (!isNaN(val)) {
            pv.value = countTransK(val)
            observer?.disconnect() // 获取到值后停止监听
          }
        }
      }
    }
  })

  observer.observe(pvEl, { childList: true, characterData: true, subtree: true })
}

onMounted(() => {
  nextTick(() => {
    updateWordCount()
    initPVObserver()
  })
})

onUnmounted(() => {
  observer?.disconnect()
})

// 监听路由变化重新计算
watch(
  () => page.value.relativePath,
  () => {
    nextTick(() => {
      updateWordCount()
      pv.value = '...'
      observer?.disconnect()
      initPVObserver()
    })
  }
)
</script>

<template>
  <Layout>
    <template #doc-before>
      <div class="mb-8">
        <div v-if="$frontmatter.title" class="text-3xl font-bold leading-tight mb-4 text-[var(--vp-c-text-1)]">{{
          $frontmatter.title }}</div>
        <div class="space-y-3">
          <div v-if="$frontmatter.date || page.lastUpdated"
            class="flex gap-4 flex-wrap text-sm font-medium text-(--vp-c-text-2)">
            <span v-if="$frontmatter.date" class="flex items-center">
              <span>{{ dayjs($frontmatter.date).format('YYYY-MM-DD') }}</span>
            </span>
            <span class="flex items-center">
              <img src="/eye.svg" alt="阅读量" class="w-4 h-4 mr-2">
              <span>{{ pv }}<span id="vercount_value_page_pv" class="hidden" /></span>
            </span>
            <span class="flex items-center">
              <img src="/clock.svg" alt="阅读时长" class="w-4 h-4 mr-2">
              <span class="ml-1">阅读<span class="mx-1">{{ readingTime }}</span>分钟</span>
            </span>
          </div>
          <div v-if="$frontmatter.abstract"
            class="flex items-center p-3 rounded-lg text-sm font-medium bg-(--vp-c-bg-soft) text-(--vp-c-text-2)">
            <span>{{ $frontmatter.abstract }}</span>
          </div>
        </div>
      </div>
    </template>
    <template #doc-after>
      <Comment :key="page.filePath"></Comment>
    </template>
  </Layout>
</template>
