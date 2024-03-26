<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { inBrowser } from 'vitepress'
import Gitalk from 'gitalk'

const commentRef = ref<HTMLElement | null>(null)

const init = () => {
  if (inBrowser) {
    const wrap = document.createElement('div')
    wrap.setAttribute('id', 'gitalk-page-container')
    commentRef.value?.appendChild(wrap) // 把组件加入到想加载的地方 // querySelector的节点可自己根据自己想加载的地方设置
    const gitTalk = new Gitalk({
      id: location.pathname, // 可选。默认为 location.href
      owner: 'ivestszheng', // GitHub repository 所有者
      repo: 'blog', // GitHub repo
      clientID: '5e2f51071c7c5437e7a5', // clientID
      clientSecret: 'd95b516545c0233ef405eabe7b99cba43bf8da27', // clientSecret
      admin: ['ivestszheng'], // GitHub repo 所有者
      labels: ['Gitalk'], // GitHub issue 标签
      createIssueManually: true //如果当前页面没有相应的 issue 且登录的用户属于 admin，则会自动创建 issue。如果设置为 true，则显示一个初始化页面，创建 issue 需要点击 init 按钮。
    })
    gitTalk.render('gitalk-page-container')
  }
}

onMounted(() => {
  init()
})
</script>
<template>
  <div ref="commentRef" class="commentRef"></div>
</template>
