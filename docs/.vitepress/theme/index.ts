import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import Layout from "./Layout.vue";
import './style.css'

const theme: Theme = {
  ...DefaultTheme,
  Layout: Layout,
  enhanceApp({ router }) {
    router.onAfterRouteChanged((to) => {
      try {
        // 确保在客户端环境执行
        if (typeof window === 'undefined') return;

        // 百度统计（需确保_hmt已全局定义）
        if (typeof _hmt !== 'undefined') {
          _hmt.push(['_trackPageview', to.fullPath]); // 使用fullPath包含查询参数
        }

        // Google Analytics（需确保gtag已全局定义）
        if (typeof gtag !== 'undefined') {
          gtag('config', 'G-GC7S2GFJS1', { 
            page_path: to.fullPath, // 推荐使用fullPath
            send_page_view: true // 显式声明发送页面浏览（SPA场景需开启）
          });
        }
      } catch (error) {
        console.error('[Analytics] Error tracking page view:', error);
      }
    });
  },
};

export default theme;
