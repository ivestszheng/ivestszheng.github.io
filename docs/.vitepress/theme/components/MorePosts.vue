<template>
    <div class="more-posts">
        <a :href="url" class="more-posts-text">
            ----  到底了，点我阅读更多文章  ----
        </a>
    </div>
</template>

<script setup lang="ts">
defineProps({
    url: {
        type: String
    },
})
</script>

<style scoped>
.more-posts {
    text-align: center;
}

.more-posts-text{
    cursor: pointer;
    color: var(--vp-c-text-2);
}
</style>