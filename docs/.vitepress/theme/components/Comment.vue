<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue';

const commentRef: Ref<HTMLElement | null> = ref(null);
onMounted(() => {
    try {
        if (commentRef.value) {
            const script = document.createElement('script');
            script.src = 'https://utteranc.es/client.js';
            script.async = true;
            script.crossOrigin = 'anonymous';
            script.setAttribute('repo', 'ivestszheng/blog-comment');
            script.setAttribute('issue-term', 'pathname');
            script.setAttribute('label', 'Comment');
            script.setAttribute('theme', 'preferred-color-scheme');
            commentRef.value.appendChild(script);
        } else {
            console.log();
        }
    } catch (error) {
        console.error('comment loading failed',error);
    }
})
</script>
<template>
    <div ref="commentRef" id="comment"></div>
</template>
