import { type Theme, inBrowser, EnhanceAppContext } from "vitepress";
import DefaultTheme from "vitepress/theme";
import Layout from "./Layout.vue";
import './style.css'
import {
  NolebaseGitChangelogPlugin
} from '@nolebase/vitepress-plugin-git-changelog/client'
import '@nolebase/vitepress-plugin-git-changelog/client/style.css'
import { loadVercountScript, sendBaiduAnalyticsPageView, sendGoogleAnalyticsPageView } from './hooks/useVisitData'

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
      }
    }
  },
};

export default theme;
