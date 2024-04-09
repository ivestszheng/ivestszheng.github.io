<template>
    <div class="flex justify-between items-center py-1 pl-6">
            <a :href="url" class="post-dot overflow-hidden whitespace-nowrap text-ellipsis">
                <slot></slot>
            </a>
            <div class="pl-4 font-serif whitespace-nowrap" >
                <slot name="date"></slot>
            </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    url: {
        type: String,
    },
})
</script>
