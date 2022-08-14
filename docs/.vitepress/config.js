/*
 * @Descripttion: 
 * @Date: 2022-06-15 22:04:45
 * @LastEditTime: 2022-07-10 15:31:29
 */
export default {
  lang: 'zh-CN',
  title: '无声的博客',
  description: '菜鸡前端的日常分享',
  base: '/blog/',
  themeConfig: {
    nav: nav(),
    sidebar: {
      '/frontend/': sidebarFrontend(),
      '/summary/': sidebarSummary(),
      '/chat/': sidebarChat()
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present 无声'
    }
  },
  lastUpdated: true
}

function nav() {
  return [
    { text: '前端', link: '/frontend/' },
    { text: '代码人生', link: '/summary/' },
    { text: '闲谈', link: '/chat/' },
    {
      text: '关于我',
      items: [
        { text: 'GitHub', link: 'https://github.com/ivestszheng' },
        { text: '掘金', link: 'https://juejin.cn/user/1618116899507735' },
      ]
    }
  ]
}

function sidebarFrontend(){
  return [
    {
      text: '前端心得总结',
      collapsible: true,
      items: [
        { text: '钉钉H5微应用开发', link: '/frontend/钉钉H5微应用开发' },
        { text: 'Vue 2.x 组件通信方式，初学者也能看懂', link: '/frontend/Vue 2.x 组件通信方式，初学者也能看懂' },
        { text: '记录我的第一个开源组件', link: '/frontend/记录我的第一个开源组件' },
        { text: '骨架屏优化——细粒度模式的实现', link: '/frontend/骨架屏优化——细粒度模式的实现' },
        { text: 'xlsx库实现纯前端导入导出Excel', link: '/frontend/xlsx库实现纯前端导入导出Excel' },
        { text: '长列表无限下拉的实现（上）', link: '/frontend/长列表无限下拉的实现（上）' },
        { text: '长列表无限下拉的实现（下）', link: '/frontend/长列表无限下拉的实现（下）' },
        { text: 'Vue2.x项目工程环境搭建思路', link: '/frontend/Vue2.x项目工程环境搭建思路' },
        { text: '后台系统的权限控制与管理', link: '/frontend/后台系统的权限控制与管理' },
        { text: 'vue-cli5关于yarn的一个小坑', link: '/frontend/vue-cli5关于yarn的一个小坑' },
        { text: '前端已经接好接口还要写假数据，如何优雅处理？', link: '/frontend/前端已经接好接口还要写假数据，如何优雅处理？' },
        { text: 'doker零基础学习记录',link:'/frontend/docker零基础学习记录'}
      ]
    }
  ]
}

function sidebarSummary(){
  return [
    {
      text: '代码人生',
      items: [
        { text: '二本应届生杭州小厂前端面试总结', link: '/summary/二本应届生杭州小厂前端面试总结' },
        { text: '菜鸡的自我审视——我的2021', link: '/summary/菜鸡的自我审视——我的2021' },
        { text: ' 不断学习 | 2022年中总结',link:'/summary/不断学习2022年中总结'}
      ]
    }
  ]
}

function sidebarChat(){
  return [
    {
      text: '闲谈',
      items: [
        { text: '小白买自行车功课记录', link: '/chat/小白买自行车功课记录' },
      ]
    }
  ]
}