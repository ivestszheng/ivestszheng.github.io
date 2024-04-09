<script setup lang="ts">
import { withBase } from 'vitepress'

defineProps({
    url: {
        type: String
    },
    title: {
        type: String
    },
    abstract:{
        type: String
    },
    date: {
        type: String
    },
    tags:{
        type: Array
    }
})
</script>

<template>
    <div class="post-card">
        <div class="post-header">
            <div class="post-title">
                <a class="post-title-text" :href="withBase(url)" v-text="title"></a>
            </div>
        </div>
        <p class="abstract" v-html="abstract"></p>
        <div class='post-info'>
            <div v-text="date"></div>
            <div class="flex">
                <a v-for="(tag,i) in tags" v-text="tag" class="tag cursor-pointer hover:text-[var(--vp-c-brand)]" :href="`/pages/tags?tag=${tag}`"></a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.post-card {
    padding: 14px 0 14px;
}

.post-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.post-title {
    color: var(--vp-c-text-1);
    font-size: 1.125rem;
    font-weight: 500;
    margin: 0.1rem 0;
}

.post-title-text {
    color: var(--vp-c-text-1);
}

.post-title-text:hover {
    color: var(--vp-c-brand-1);
}

.post-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
}

.abstract {
    font-size: 0.9375rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    color: var(--vp-c-text-2);
    margin: 10px 0;
    line-height: 1.5rem;
}

.tag {
    background-color: var(--vp-c-bg-alt);
    padding: 0 8px;
}

.tag + .tag {
    margin-left: 6px;
}

@media screen and (max-width: 768px) {
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

    .abstract {
        font-size: 0.9375rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        margin: 0.5rem 0 1rem;
    }
}
</style>
