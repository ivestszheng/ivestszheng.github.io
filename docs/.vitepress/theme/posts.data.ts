import { createContentLoader } from "vitepress";

interface Post {
  title: string;
  url: string;
  date: {
    time: number;
    string: string;
  };
  abstract?: string;
}

interface RencentPost extends Post {
  tag: string;
}

interface data {
  posts: Post[];
  recentPosts: RencentPost[];
}

declare const data: Post[];
export { data };

export default createContentLoader("posts/*/*.md", {
  transform(raw): Post[] {
    const posts = raw
      .map(({ url, frontmatter }) => ({
        title: frontmatter.title,
        url,
        date: formatDate(frontmatter.date),
        abstract: frontmatter.abstract,
        tag: url.split('/')[2]
      }))
      .sort((a, b) => b.date.time - a.date.time);

    const recentPosts = posts
      .slice(0, 10)
      .map(item => ({...item,tag:item.url.split('/')[2] }));

    return {
      posts,
      recentPosts,
    };
  },
});

function formatDate(raw: string): Post["date"] {
  const date = new Date(raw);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 月份从 0 开始，需要加 1
  const day = date.getDate().toString().padStart(2, "0");
  return {
    time: +date,
    string: `${year}-${month}-${day}`,
  };
}
