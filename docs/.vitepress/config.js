export default {
  title: '无声的博客',
  base: '/blog/',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/' },
      {
        text: '分类',
        items: [
          { text: '前端', link: '/frontend/' },
        ]
      }
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
          ]
        }
      ]
    }
  }
}
