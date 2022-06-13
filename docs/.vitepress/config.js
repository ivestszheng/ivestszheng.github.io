export default {
  title: '无声的博客',
  base: '/blog/',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '前端', link: '/frontend/' },
      { text: '个人总结', link: '/summary/' },
      { text: '闲谈', link: '/chat/' },
      // {
      //   text: '关于我',
      //   items: [
      //     { text: 'GitHub', },
      //     { text: '掘金', },
      //     { text: '公众号', },
      //   ]
      // }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: '测试', link: '/guide/test' },
          ]
        }
      ],
      '/frontend/': [
        {
          text: '前端心得总结',
          items: [
            { text: '钉钉H5微应用开发', link: '/frontend/dd-h5-development' }, 
            { text: 'Vue 2.x 组件通信方式，初学者也能看懂', link: '/frontend/vue2-communication' }, 
            { text: '记录我的第一个开源组件', link: '/frontend/my-first-open-source-component' }, 
            { text: '骨架屏优化——细粒度模式的实现', link: '/frontend/skeleton-fine-grit' }, 
            { text: 'xlsx库实现纯前端导入导出Excel', link: '/frontend/xlsx' }, 
            { text: '长列表无限下拉的实现（上）', link: '/frontend/vue-infi-scroll-upper' }, 
            { text: '长列表无限下拉的实现（下）', link: '/frontend/vue-infi-scroll-bottom' }, 
            { text: 'Vue2.x项目工程环境搭建思路', link: '/frontend/vue2-environment' }, 
            { text: '后台系统的权限控制与管理', link: '/frontend/backstage-authority-control' }, 
            { text: 'vue-cli5关于yarn的一个小坑', link: '/frontend/vue-cli5-yarn' }, 
          ]
        }
      ],
      '/summary/': [
        {
          text: '总结',
          items: [
            { text: '二本应届生杭州小厂前端面试总结', link: '/summary/fresh-graduates-interview' },
            { text: '菜鸡的自我审视——我的2021', link: '/summary/my-2021' },
          ]
        }
      ],
      '/chat/': [
        {
          text: '闲谈',
          items: [
            { text: '小白买自行车功课记录', link: '/chat/how-to-choose-bike' },
          ]
        }
      ]
    }
  }
}
