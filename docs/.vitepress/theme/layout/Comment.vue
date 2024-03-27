<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { inBrowser } from 'vitepress'
// @doc:https://github.com/gitalk/gitalk/blob/master/readme-cn.md
import Gitalk from 'gitalk'
import md5 from 'blueimp-md5'

const commentRef = ref<HTMLElement | null>(null)

const init = () => {
    try {
        if (inBrowser) {
            const fullPath = window.location.pathname,
                segments = fullPath.split('/'),
                lastSegment = segments[segments.length - 1];

            const gitalk = new Gitalk({
                id: md5(lastSegment),
                owner: 'ivestszheng',
                repo: 'blog-gitalk',
                clientID: '5648434025f55ba9b014',
                clientSecret: '13eeebf325b06474a57b15e8b60ff8844efaec9f',
                admin: ['ivestszheng'],
                labels: ['Gitalk'],
                createIssueManually: false //如果当前页面没有相应的 issue 且登录的用户属于 admin，则会自动创建 issue。如果设置为 true，则显示一个初始化页面，创建 issue 需要点击 init 按钮。
            })
            gitalk.render('gitalk-page-container')
        }
    } catch (error) {
        console.error(error)
    }
}

onMounted(() => {
    init()
})
</script>
<template>
    <div ref="commentRef" id="gitalk-page-container"></div>
</template>
