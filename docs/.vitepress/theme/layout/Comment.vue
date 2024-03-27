<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { inBrowser } from 'vitepress'
import Gitalk from 'gitalk'
import md5 from 'blueimp-md5'

const commentRef = ref<HTMLElement | null>(null)

// @doc:https://github.com/gitalk/gitalk/blob/master/readme-cn.md
const init = () => {
    try {
        if (inBrowser) {
            const fullPath = window.location.pathname,
                segments = fullPath.split('/'),
                lastSegment = segments[segments.length - 1];

            const gitalk = new Gitalk({
                id: md5(lastSegment),
                owner: 'ivestszheng',
                repo: 'blog',
                clientID: '5e2f51071c7c5437e7a5',
                clientSecret: 'd95b516545c0233ef405eabe7b99cba43bf8da27',
                admin: ['ivestszheng'],
                labels: ['Gitalk'],
                proxy: 'https://mellifluous-bombolone-049a57.netlify.app/github_access_token',
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
