import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import LayoutIndex from './layout/Index.vue'

const theme: Theme = {
  ...DefaultTheme,
  Layout: LayoutIndex
}

export default theme
