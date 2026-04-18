<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Comment from './Comment.vue';
import dayjs from 'dayjs'

const { page } = useData()
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-before>
      <div class="mb-8">
        <div v-if="$frontmatter.title" class="text-3xl font-bold leading-tight mb-4 text-[var(--vp-c-text-1)]">{{ $frontmatter.title }}</div>
        <div class="space-y-3">
          <div v-if="$frontmatter.date || page.lastUpdated" class="flex gap-4 flex-wrap text-sm font-medium text-(--vp-c-text-2)">
            <span v-if="$frontmatter.date" class="flex items-center">
              <span class="post-info-icon w-4 h-4 mr-2" style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27%3E%3Cpath fill=%27%23000%27 d=%27M21 8.5v9.25A3.25 3.25 0 0 1 17.75 21H6.25A3.25 3.25 0 0 1 3 17.75V8.5zM7.25 15a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5M12 15a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5m-4.75-4.5a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5m4.75 0a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5m4.75 0a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5m1-7.5A3.25 3.25 0 0 1 21 6.25V7H3v-.75A3.25 3.25 0 0 1 6.25 3z%27/%3E%3C/svg%3E'); background-size: contain; background-repeat: no-repeat;"></span>
              发布于<span class="ml-1">{{ dayjs($frontmatter.date).format('YYYY-MM-DD') }}</span>
            </span>
            <span v-if="page.lastUpdated" class="flex items-center">
              <span class="post-info-icon w-4 h-4 mr-2" style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27%3E%3Cpath fill=%27%23000%27 d=%27M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m1-10V7h-2v7h6v-2z%27/%3E%3C/svg%3E'); background-size: contain; background-repeat: no-repeat;"></span>
              更新于<span class="ml-1">{{ dayjs(page.lastUpdated).format('YYYY-MM-DD') }}</span>
            </span>
          </div>
          <div v-if="$frontmatter.abstract" class="flex items-center p-3 rounded-lg text-sm font-medium bg-(--vp-c-bg-soft) text-(--vp-c-text-2)">
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

