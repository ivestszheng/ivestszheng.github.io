<template>
    <div v-for="(article, index) in posts" :key="index" class="post-list">
        <div class="post-header">
            <div class="post-title">
                <a :href="withBase(article.url)"> {{ article.title }}</a>
            </div>
        </div>
        <p class="description" v-html="article.description"></p>
        <div class='post-info'>
            {{ article.date }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'

interface Article {
    url: string
    title: string
    description: string
    date: string
}
defineProps({
    posts: {
        type: Array as () => Article[],
        required: true
    }
})
</script>

<style scoped>
.post-list {
    border-bottom: 1px dashed var(--vp-c-divider-light);
    padding: 14px 0 14px 0;
}
.post-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.post-title {
    font-size: 1.125rem;
    font-weight: 500;
    margin: 0.1rem 0;
}

.description {
    font-size: 0.9375rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    color: var(--vp-c-text-2);
    margin: 10px 0;
    line-height: 1.5rem;
}

@media screen and (max-width: 768px) {
    .post-list {
        padding: 14px 0 14px 0;
    }
    .post-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .post-title {
        font-size: 1.0625rem;
        font-weight: 400;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        width: 17rem;
    }
    .description {
        font-size: 0.9375rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        margin: 0.5rem 0 1rem;
    }
}
</style>
