declare module 'markdown-it-custom-attrs' {
  const markdownItCustomAttrs: (md: any, name: string, attrs: Record<string, string>) => void;
  export default markdownItCustomAttrs;
}

declare module '*.vue' {
  const component: any;
  export default component;
}

declare module '@nolebase/vitepress-plugin-git-changelog/client' {
  export const NolebaseGitChangelogPlugin: any;
}

declare module '@vue/runtime-core' {
  import type { PageFrontmatter } from 'vitepress';
  
  export interface ComponentCustomProperties {
    $frontmatter: PageFrontmatter & {
      title?: string;
      date?: string;
      abstract?: string;
      name?: string;
      [key: string]: any;
    };
  }
}
