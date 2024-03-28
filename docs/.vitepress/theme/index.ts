import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import MyLayout from './layout/Index.vue'

const theme: Theme = {
  ...DefaultTheme,
  Layout: MyLayout
}

export default theme
