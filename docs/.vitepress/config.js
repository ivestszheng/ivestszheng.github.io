import AutoSidebar from "vite-plugin-vitepress-auto-sidebar";

export default {
  lang: "zh-CN",
  title: "无声2017的博客",
  titleTemplate: "无声2017的博客",
  description: "菜鸡的日常分享",
  base: "/blog/",
  head: [
    ["link", { rel: "icon", href: "favicon.ico" }],
  ],
  themeConfig: {
    nav: nav(),
    footer: {
      copyright: "Copyright © 2022-present 无声2017",
    },
  },
  lastUpdated: true,
  vite: {
    plugins: [
      AutoSidebar({
        ignoreIndexItem: true
      })
    ],
  },
};

function nav(){
  return [
    { text: "编程", link: "/programming/前端/node.js 实现压缩" },
    { text: "闲谈", link: "/life/功课/自行车挑选" },
    {
      text: "关于我",
      items: [
        { text: "GitHub", link: "https://github.com/ivestszheng" },
        { text: "掘金", link: "https://juejin.cn/user/1618116899507735" },
      ],
    },
  ]
}