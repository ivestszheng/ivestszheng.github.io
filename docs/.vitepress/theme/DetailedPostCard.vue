<template>
    <div 
        class="post-card"
        @click="navigateToArticle"
    >
        <div class="post-header">
            <div class="post-title">
                <h3 class="post-title-text group-hover:text-[var(--vp-c-brand-1)]" v-text="title"></h3>
            </div>
        </div>
        <p class="abstract group-hover:text-[var(--vp-c-text-1)]" v-html="abstract"></p>
        <div class='post-info'>
            <div v-text="date" class="group-hover:text-[var(--vp-c-text-1)]"></div>
            <div class="flex">
                <span v-for="(tag,i) in tags" v-text="tag" class="tag group-hover:bg-[var(--vp-c-brand-soft)] group-hover:text-[var(--vp-c-brand)]"></span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'

const props = defineProps({
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

const navigateToArticle = () => {
    if (props.url) {
        window.location.href = withBase(props.url)
    }
}
</script>

<style scoped>
.post-card {
    padding: 20px 12px;
    border-bottom: 1px solid var(--vp-c-divider);
    cursor: pointer;
}

.post-card:hover {
    background: var(--vp-c-bg-soft);
}

.post-card:last-child {
    border-bottom: none;
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
    border-radius: 4px;
}

.tag + .tag {
    margin-left: 6px;
}

@media screen and (max-width: 768px) {
    .post-card {
        padding: 16px 0;
        border-bottom: 1px solid var(--vp-c-divider);
        margin-bottom: 8px;
    }

    .post-header {
        display: block;
    }

    .post-title {
        font-size: 1.0625rem;
        font-weight: 500;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        width: 100%;
        margin-bottom: 8px;
    }

    .abstract {
        font-size: 0.9375rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        margin: 8px 0 12px;
        line-height: 1.4rem;
    }

    .post-info {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    }

    .tag {
        font-size: 11px;
        padding: 2px 6px;
    }
}
</style>
