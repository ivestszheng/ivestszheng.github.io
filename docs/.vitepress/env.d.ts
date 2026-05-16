import { GitChangelogPlugin } from '@nolebase/vitepress-plugin-git-changelog/client/types';
import { PageFrontmatter } from 'vitepress';

declare global {
  interface Window {
    _hmt?: any[];
    gtag?: (...args: any[]) => void;
  }
}

declare module '@nolebase/vitepress-plugin-git-changelog/client' {
  const NolebaseGitChangelogPlugin: GitChangelogPlugin;
  export default NolebaseGitChangelogPlugin;
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $frontmatter: PageFrontmatter & {
      title?: string;
      date?: string;
      description?: string;
      [key: string]: any;
    };
  }
}

declare module '@vue/runtime-dom' {
  export interface ComponentCustomProperties {
    $frontmatter: PageFrontmatter & {
      title?: string;
      date?: string;
      description?: string;
      [key: string]: any;
    };
  }
}

declare module 'markdown-it-custom-attrs' {
  const markdownItCustomAttrs: (md: any, name: string, attrs: Record<string, string>) => void;
  export default markdownItCustomAttrs;
}

declare module '*.vue' {
  const component: any;
  export default component;
}
