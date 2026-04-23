import { withMermaid } from 'vitepress-plugin-mermaid'
import { withSidebar } from 'vitepress-sidebar';
import nav from './nav'
import tailwindcss from '@tailwindcss/vite'
import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from '@nolebase/vitepress-plugin-git-changelog/vite'
import mdItCustomAttrs from 'markdown-it-custom-attrs'

const vitePressOptions = {
  lang: "zh-CN",
  title: "无声2017的博客",
  titleTemplate: true,
  abstract: "菜鸡的日常分享",
  base: "/",
  head: [
    ["link", { rel: "icon", href: "favicon.ico" }],
    // Bing 统计
    ['meta', { name: 'msvalidate.01', content: 'B511F19067A0023694512C749145D325' }],
    // 注入百度统计脚本
    ['script', {},
      `var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?51e0af7131ea21f4ae21f50c94769d35";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();`,
    ],
    // 注入谷歌分析脚本（GA4）
    ['script', {}, `
      // 谷歌分析4代基础脚本
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-GC7S2GFJS1');
    `],
    // 注入 fancyancybox
    ['link', { rel: 'stylesheet', href: '/fancybox.css' }],
    [
      'script',
      {
        src: '/fancybox.umd.js'
      }
    ]
  ],
  themeConfig: {
    nav,
    footer: {
      message: `本站总访问量<span id='vercount_value_site_pv' class='mx-2'>♾️</span>次<span class='mx-2'></span>本站总访客数<span id='vercount_value_site_uv' class='mx-2'>♾️</span>人`,
      copyright: "Copyright © 2022-present <a href='https://github.com/ivestszheng'>无声2017</a>",
    },
    logo: 'logo.svg',
    socialLinks: [
      { icon: "github", link: "https://github.com/ivestszheng" },
      { icon: "twitter", link: "https://twitter.com/ivestszheng" },
      {
        icon: { svg: '<svg t="1775827641358" class="icon" viewBox="0 0 1129 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4789" width="200" height="200"><path d="M234.909 9.656a80.468 80.468 0 0 1 68.398 0 167.374 167.374 0 0 1 41.843 30.578l160.937 140.82h115.07l160.936-140.82a168.983 168.983 0 0 1 41.843-30.578A80.468 80.468 0 0 1 930.96 76.445a80.468 80.468 0 0 1-17.703 53.914 449.818 449.818 0 0 1-35.406 32.187 232.553 232.553 0 0 1-22.531 18.508h100.585a170.593 170.593 0 0 1 118.289 53.109 171.397 171.397 0 0 1 53.914 118.288v462.693a325.897 325.897 0 0 1-4.024 70.007 178.64 178.64 0 0 1-80.468 112.656 173.007 173.007 0 0 1-92.539 25.75h-738.7a341.186 341.186 0 0 1-72.421-4.024A177.835 177.835 0 0 1 28.91 939.065a172.202 172.202 0 0 1-27.36-92.539V388.662a360.498 360.498 0 0 1 0-66.789A177.03 177.03 0 0 1 162.487 178.64h105.414c-16.899-12.07-31.383-26.555-46.672-39.43a80.468 80.468 0 0 1-25.75-65.984 80.468 80.468 0 0 1 39.43-63.57M216.4 321.873a80.468 80.468 0 0 0-63.57 57.937 108.632 108.632 0 0 0 0 30.578v380.615a80.468 80.468 0 0 0 55.523 80.469 106.218 106.218 0 0 0 34.601 5.632h654.208a80.468 80.468 0 0 0 76.444-47.476 112.656 112.656 0 0 0 8.047-53.109v-354.06a135.187 135.187 0 0 0 0-38.625 80.468 80.468 0 0 0-52.304-54.719 129.554 129.554 0 0 0-49.89-7.242H254.22a268.764 268.764 0 0 0-37.82 0z m0 0" fill="#20B0E3" p-id="4790"></path><path d="M348.369 447.404a80.468 80.468 0 0 1 55.523 18.507 80.468 80.468 0 0 1 28.164 59.547v80.468a80.468 80.468 0 0 1-16.094 51.5 80.468 80.468 0 0 1-131.968-9.656 104.609 104.609 0 0 1-10.46-54.719v-80.468a80.468 80.468 0 0 1 70.007-67.593z m416.02 0a80.468 80.468 0 0 1 86.102 75.64v80.468a94.148 94.148 0 0 1-12.07 53.11 80.468 80.468 0 0 1-132.773 0 95.757 95.757 0 0 1-12.875-57.133V519.02a80.468 80.468 0 0 1 70.007-70.812z m0 0" fill="#20B0E3" p-id="4791"></path></svg>' },
        link: "https://space.bilibili.com/3111462",
        ariaLabel: "bilibili",
      },
      {
        icon: {
          svg: '<svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.5875 6.77268L21.8232 3.40505L17.5875 0.00748237L17.5837 0L13.3555 3.39757L17.5837 6.76894L17.5875 6.77268ZM17.5863 17.3955H17.59L28.5161 8.77432L25.5526 6.39453L17.59 12.6808H17.5863L17.5825 12.6845L9.61993 6.40201L6.66016 8.78181L17.5825 17.3992L17.5863 17.3955ZM17.5828 23.2891L17.5865 23.2854L32.2133 11.7456L35.1768 14.1254L28.5238 19.3752L17.5865 28L0.284376 14.3574L0 14.1291L2.95977 11.7531L17.5828 23.2891Z" fill="#1E80FF"/></svg>',
        },
        link: "https://juejin.cn/user/1618116899507735",
        ariaLabel: "稀土掘金",
      },
    ],
    search: {
      provider: "local",
    },
  },
  lastUpdated: true,
  markdown: {
    image: {
      lazyLoading: true,
    },
    lineNumbers: true,
    config: (md: any) => {
      md.use(mdItCustomAttrs, 'image', {
        'data-fancybox': 'gallery',
        // 可选：添加自定义类名，方便后续写 CSS
        'class': 'fancybox-img'
      })
    }
  },
  cleanUrls: true,
  vite: {
    plugins: [tailwindcss(), GitChangelog({
      repoURL: () => 'https://github.com/ivestszheng/ivestszheng.github.io',
    }),
    GitChangelogMarkdownSection({
      sections: {
        disableContributors: true
      }
    }),],
    // to fix mermaid bug about dayjs
    optimizeDeps: {
      include: [
        'mermaid'
      ]
    }
  }
};

const vitePressSidebarOptions = [
  {
    documentRootPath: '/docs',
    scanStartPath: '/posts',
    collapsed: false,
    sortMenusOrderByDescending: true,
    sortMenusByFrontmatterDate: true,
  }
];

export default withMermaid(withSidebar(vitePressOptions, vitePressSidebarOptions));