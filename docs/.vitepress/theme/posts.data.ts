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
  tags?: string[];
}

interface data {
  yearMap: unknown;
  posts: Post[];
  recentPosts: RencentPost[];
  postMap: unknown;
  tagMap: unknown;
}

declare const data: Post[];
export { data };

export default createContentLoader("posts/*/*.md", {
  transform(raw): data {
    const postMap = {};
    const yearMap = {};
    const tagMap = {};
    const posts = raw
      .map(({ url, frontmatter }) => {
        let tags = [url.split("/")[2]];
        if (frontmatter?.tags) {
          tags = [...tags, ...frontmatter.tags];
        }
        const result = {
          title: frontmatter.title,
          url,
          date: formatDate(frontmatter.date),
          abstract: frontmatter.abstract,
          tags,
        };
        postMap[result.url] = result;
        return result;
      })
      .sort((a, b) => b.date.time - a.date.time);

    const recentPosts = posts.slice(0, 10).map((item) => ({ ...item }));

    posts.forEach((item) => {
      const year = new Date(item.date.string).getFullYear();
      if (!yearMap[year]) {
        yearMap[year] = [];
      }
      yearMap[year].push(item.url);
      
      item.tags.forEach((tag) => {
        if(!tagMap[tag]){
          tagMap[tag] = []
        }
        tagMap[tag].push(item.url)
      })
    });

    return {
      yearMap,
      posts,
      recentPosts,
      postMap,
      tagMap,
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
