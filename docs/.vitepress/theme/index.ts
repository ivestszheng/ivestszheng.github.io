import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import LayoutIndex from './layout/Index.vue'
import 'gitalk/dist/gitalk.css'

const theme: Theme = {
  ...DefaultTheme,
  Layout: LayoutIndex
}

export default theme
