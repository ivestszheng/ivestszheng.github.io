---
layout: page
title: 首页-无声2017的博客
lastUpdated: false
---

<script setup>
import  { data as posts }  from './.vitepress/theme/posts.data'
console.log('posts',posts)
</script>

<div v-for="(post,index) in posts" :key="index" style="margin-top: 40px">
    <p v-text="post.title"></p>
    <p v-text="post.excerpt" style="max-width: 800px;overflow: hidden;white-space: nowrap;"></p>
    <p v-text="post.date"></p>
</div>
