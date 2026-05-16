import { type Theme, inBrowser, EnhanceAppContext } from "vitepress";
import DefaultTheme from "vitepress/theme";
import Layout from "./Layout.vue";
import './style.css'
import {
  NolebaseGitChangelogPlugin
} from '@nolebase/vitepress-plugin-git-changelog/client'
import '@nolebase/vitepress-plugin-git-changelog/client/style.css'
import { loadVercountScript, sendBaiduAnalyticsPageView, sendGoogleAnalyticsPageView } from './hooks/useVisitData'
import { data } from './post.data'

const theme: Theme = {
  ...DefaultTheme,
  Layout: Layout,
  enhanceApp({ app, router }: EnhanceAppContext) {
    app.use(NolebaseGitChangelogPlugin as any)
    
    if (inBrowser) {
      router.onAfterPageLoad = (to) => {
        loadVercountScript()
        sendBaiduAnalyticsPageView(to)
        sendGoogleAnalyticsPageView(to)
        
        // 通过 URL 查找对应的文章 description
        updateMetaTags(to)
      }
    }
  },
};

// 更新 meta 标签的函数
function updateMetaTags(path: string) {
  console.log('[updateMetaTags] 开始更新 meta 标签，path:', path)
  console.log('[updateMetaTags] postMap:', data.postMap)
  
  let pageDescription = 'don\'t worry, be happy.'
  
  // 解码 URL
  const decodedPath = decodeURI(path)
  console.log('[updateMetaTags] 解码后的 path:', decodedPath)
  
  // 通过 postMap 查找对应的文章
  const post = data.postMap[decodedPath]
  console.log('[updateMetaTags] 查找到的 post:', post)
  
  if (post?.description) {
    pageDescription = post.description
    console.log('[updateMetaTags] 使用文章 description:', pageDescription)
  } else {
    console.log('[updateMetaTags] 使用默认 description:', pageDescription)
  }
  
  // 更新或创建 Open Graph description
  let ogDesc = document.querySelector('meta[property="og:description"]')
  if (!ogDesc) {
    ogDesc = document.createElement('meta')
    ogDesc.setAttribute('property', 'og:description')
    document.head.appendChild(ogDesc)
    console.log('[updateMetaTags] 创建 og:description meta 标签')
  }
  ogDesc.setAttribute('content', pageDescription)
  console.log('[updateMetaTags] 更新 og:description 成功')
  
  // 更新或创建 Twitter description
  let twitterDesc = document.querySelector('meta[name="twitter:description"]')
  if (!twitterDesc) {
    twitterDesc = document.createElement('meta')
    twitterDesc.setAttribute('name', 'twitter:description')
    document.head.appendChild(twitterDesc)
    console.log('[updateMetaTags] 创建 twitter:description meta 标签')
  }
  twitterDesc.setAttribute('content', pageDescription)
  console.log('[updateMetaTags] 更新 twitter:description 成功')
  
  // 更新或创建常规 description meta 标签
  let metaDesc = document.querySelector('meta[name="description"]')
  if (!metaDesc) {
    metaDesc = document.createElement('meta')
    metaDesc.setAttribute('name', 'description')
    document.head.appendChild(metaDesc)
    console.log('[updateMetaTags] 创建 description meta 标签')
  }
  metaDesc.setAttribute('content', pageDescription)
  console.log('[updateMetaTags] 更新 description meta 标签成功')
}

export default theme;
