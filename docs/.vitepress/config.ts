import { withMermaid } from 'vitepress-plugin-mermaid'
import nav from './nav'
import tailwindcss from '@tailwindcss/vite'
import mdItCustomAttrs from 'markdown-it-custom-attrs'
import type { HeadConfig, TransformContext } from 'vitepress'

const vitePressOptions = {
  lang: "zh-CN",
  title: "无声2017的博客",
  description: 'don\'t worry, be happy.',
  titleTemplate: true,
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
      // 谷歌分析 4 代基础脚本
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
        src: '/fancybox.umd.js',
        defer: ''
      }
    ]
  ],
  // 动态生成每页的 meta 标签
  transformHead: (ctx: TransformContext) => {
    const head: HeadConfig[] = []
    const { frontmatter, title, relativePath } = ctx.pageData
    
    // 生成页面标题和描述
    const pageTitle = String(frontmatter?.title || title)
    const pageDescription = String(frontmatter?.description || 'don\'t worry, be happy.')
    
    // 处理图片 URL：必须是绝对路径，微信才能抓取
    let pageImage = frontmatter?.image ? String(frontmatter.image) : undefined
    if (pageImage) {
      // 如果已经是 http/https 开头，直接使用
      if (!pageImage.startsWith('http')) {
        // 否则拼接域名
        pageImage = `https://ivestszheng.github.io${pageImage}`
      }
    } else {
      // 默认分享图片：使用 PNG 格式（微信不支持 SVG）
      pageImage = 'https://ivestszheng.github.io/share.png'
    }
    
    // cleanUrls 模式下页面 URL 不带 .md 后缀
    const pageUrl = `https://ivestszheng.github.io/${(relativePath || '').replace(/\.md$/, '')}`
    
    // ===== Open Graph (微信、QQ、Facebook 等使用) =====
    head.push(['meta', { property: 'og:type', content: 'website' }])
    head.push(['meta', { property: 'og:site_name', content: '无声 2017 的博客' }])
    head.push(['meta', { property: 'og:title', content: pageTitle }])
    head.push(['meta', { property: 'og:description', content: pageDescription }])
    head.push(['meta', { property: 'og:url', content: pageUrl }])
    head.push(['meta', { property: 'og:image', content: pageImage }])
    // 注意：微信不支持 og:image:width 和 og:image:height，已移除
    
    // ===== Twitter Card =====
    head.push(['meta', { name: 'twitter:card', content: 'summary_large_image' }])
    head.push(['meta', { name: 'twitter:title', content: pageTitle }])
    head.push(['meta', { name: 'twitter:description', content: pageDescription }])
    head.push(['meta', { name: 'twitter:image', content: pageImage }])
    head.push(['meta', { name: 'twitter:site', content: '@ivestszheng' }])
    
    return head
  },
  themeConfig: {
    nav,
    footer: {
      message: "本站总访问量<span id='vercount_value_site_pv' class='mx-2'>♾️</span>次<span class='mx-2'></span>本站总访客数<span id='vercount_value_site_uv' class='mx-2'>♾️</span>人",
      copyright: "Copyright © 2022-present <a href='https://github.com/ivestszheng'>无声2017</a>",
    },
    logo: 'logo.svg',
    socialLinks: [
      { icon: "github", link: "https://github.com/ivestszheng" },
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
  vite: {
    plugins: [
      tailwindcss(),
    ],
    optimizeDeps: {
      include: [
        'mermaid'
      ]
    },
    checker: {
      enabled: true,
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
  cleanUrls: true
};

export default withMermaid(vitePressOptions as any);
