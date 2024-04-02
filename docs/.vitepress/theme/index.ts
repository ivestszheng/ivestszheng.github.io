import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import Layout from "./Layout.vue";
import './style/index.css'

const theme: Theme = {
  ...DefaultTheme,
  Layout: Layout,
};

export default theme;
