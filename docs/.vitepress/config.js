/*
 * @Descripttion: 
 * @Date: 2022-06-15 22:04:45
 * @LastEditTime: 2022-08-19 10:50:58
 */
import { nav, sidebarFrontend, sidebarLife } from './data.js'

export default {
  lang: 'zh-CN',
  title: '无声的博客',
  titleTemplate: '无声的博客',
  description: '菜鸡前端的日常分享',
  base: '/blog/',
  themeConfig: {
    nav: nav(),
    sidebar: {
      '/frontend/': sidebarFrontend(),
      '/life/': sidebarLife(),
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present 无声'
    }
  },
  lastUpdated: true
}