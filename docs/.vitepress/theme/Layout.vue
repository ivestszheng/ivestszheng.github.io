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
        <div v-if="$frontmatter.title" class="text-3xl font-bold text-gray-900 leading-tight mb-4">{{ $frontmatter.title }}</div>
        <div class="space-y-3">
          <div v-if="$frontmatter.date" class="text-sm font-medium">
            <span>{{ dayjs($frontmatter.date).format('YYYY-MM-DD') }}</span>
          </div>
          <div v-if="$frontmatter.abstract" class="flex items-center p-3 rounded-lg bg-gray-50 text-gray-700 text-sm font-medium">
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

