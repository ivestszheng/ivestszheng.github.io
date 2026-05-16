import { type Theme, inBrowser, EnhanceAppContext } from "vitepress";
import DefaultTheme from "vitepress/theme";
import Layout from "./Layout.vue";
import './style.css'
import {
  NolebaseGitChangelogPlugin
} from '@nolebase/vitepress-plugin-git-changelog/client'
import '@nolebase/vitepress-plugin-git-changelog/client/style.css'
import { loadVercountScript, sendBaiduAnalyticsPageView, sendGoogleAnalyticsPageView } from './hooks/useVisitData'
import { useData } from 'vitepress'

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
        
        // 更新 meta 标签
        updateMetaTags()
      }
    }
  },
};

// 更新 meta 标签的函数
function updateMetaTags() {
  const descriptionEl = document.getElementById('description')
  const pageDescription = descriptionEl?.textContent || 'don\'t worry, be happy.'
  
  // 更新 Open Graph description
  let ogDesc = document.querySelector('meta[property="og:description"]')
  if (ogDesc) {
    ogDesc.setAttribute('content', pageDescription)
  }
  
  // 更新 Twitter description
  let twitterDesc = document.querySelector('meta[name="twitter:description"]')
  if (twitterDesc) {
    twitterDesc.setAttribute('content', pageDescription)
  }
  
  // 更新常规 description meta 标签
  let metaDesc = document.querySelector('meta[name="description"]')
  if (metaDesc) {
    metaDesc.setAttribute('content', pageDescription)
  }
}

export default theme;
