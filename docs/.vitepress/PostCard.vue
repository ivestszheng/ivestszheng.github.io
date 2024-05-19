<script setup lang="ts">
import { useRouter } from "vitepress";

defineProps({
  url: {
    type: String,
  },
  title: {
    type: String,
  },
  abstract: {
    type: String,
  },
  date: {
    type: String,
  },
  tags: {
    type: Array,
  },
});

const router = useRouter();
function gotoPost(url) {
  router.go(url);
}
</script>

<template>
  <div
    class="py-2 px-2 bg-white cursor-pointer hover:bg-gray-100"
    @click="gotoPost(url)"
  >
    <div class="flex items-center justify-between">
      <div class="text-[var(--vp-c-text-1)] text-base font-bold">
        <div class="text-[var(--vp-c-text-1)]" v-text="title"></div>
      </div>
    </div>
    <p
      class="text-sm leading-relaxed text-[var(--vp-c-text-2)] overflow-hidden line-clamp-2 my-4"
      v-html="abstract"
    ></p>
    <div class="flex justify-between items-center text-xs">
      <div v-text="date"></div>
      <div class="flex space-x-1">
        <a
          v-for="(tag, i) in tags"
          v-text="tag"
          :href="`/pages/tags?tag=${tag}`"
          @click.stop
          class="bg-[var(--vp-c-bg-alt)] px-2 py-1 pointer-events-none md:pointer-events-auto md:hover:text-[var(--vp-c-brand)]"
        ></a>
      </div>
    </div>
  </div>
</template>
