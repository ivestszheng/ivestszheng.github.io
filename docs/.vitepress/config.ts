import AutoSidebar from "vite-plugin-vitepress-auto-sidebar";

export default {
  lang: "zh-CN",
  title: "无声2017的博客",
  titleTemplate: "无声2017的博客",
  description: "菜鸡的日常分享",
  base: "/blog/",
  head: [["link", { rel: "icon", href: "favicon.ico" }]],
  themeConfig: {
    nav: nav(),
    footer: {
      copyright: "Copyright © 2022-present 无声2017",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/ivestszheng" },
      {
        icon: {
          svg: '<svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.5875 6.77268L21.8232 3.40505L17.5875 0.00748237L17.5837 0L13.3555 3.39757L17.5837 6.76894L17.5875 6.77268ZM17.5863 17.3955H17.59L28.5161 8.77432L25.5526 6.39453L17.59 12.6808H17.5863L17.5825 12.6845L9.61993 6.40201L6.66016 8.78181L17.5825 17.3992L17.5863 17.3955ZM17.5828 23.2891L17.5865 23.2854L32.2133 11.7456L35.1768 14.1254L28.5238 19.3752L17.5865 28L0.284376 14.3574L0 14.1291L2.95977 11.7531L17.5828 23.2891Z" fill="#1E80FF"/></svg>',
        },
        link: "https://juejin.cn/user/1618116899507735",
        ariaLabel: "稀土掘金",
      },
      { icon: "twitter", link: "https://twitter.com/ivestszheng" },
    ],
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
  },
  lastUpdated: true,
  vite: {
    plugins: [
      AutoSidebar({
        ignoreIndexItem: true,
      }),
    ],
  },
  markdown: {
    image: {
      lazyLoading: true,
    },
  },
  cleanUrls: true,
};

function nav() {
  return [
    { text: "编程", link: "/programming/前端/node.js 实现压缩" },
    { text: "其他", link: "/others/年终总结/2023 的一些思考" },
  ];
}
