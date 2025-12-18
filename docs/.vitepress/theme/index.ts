import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import Layout from "./Layout.vue";
import './style.css'

const theme: Theme = {
  ...DefaultTheme,
  Layout: Layout,
  enhanceApp({router}) {
    const path = router.route.path;
    // 在客户端环境下添加路由变化监听
    if (typeof window !== 'undefined') {
      // 监听浏览器前进后退事件
      window.addEventListener('popstate', () => {
        trackPageView(path);
      });
      
      // 监听页面加载完成
      window.addEventListener('load', () => {
        trackPageView(path);
      });
      
      // 初始页面统计
      trackPageView();
    }
  },
};

// 页面浏览统计函数
function trackPageView(path?: string) {
  try {
    const pagePath = path || window.location.pathname + window.location.search;
    // 百度统计（需确保_hmt已全局定义）
    if (typeof window._hmt !== 'undefined') {
      window._hmt.push(['_trackPageview', pagePath]);
    }

    // Google Analytics（需确保gtag已全局定义）
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'G-GC7S2GFJS1', { 
        page_path: pagePath,
        send_page_view: true
      });
    }
  } catch (error) {
    console.error('[Analytics] Error tracking page view:', error);
  }
}

export default theme;
