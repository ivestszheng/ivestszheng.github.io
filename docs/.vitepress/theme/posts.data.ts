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

interface RecentPost extends Post {
  tags?: string[];
}

interface Data {
  posts: RecentPost[];
  yearMap: Record<number, string[]>;
  postMap: Record<string, RecentPost>;
  tagMap: Record<string, string[]>;
}

declare const data: Data;
export { data };

export default createContentLoader("posts/*/*.md", {
  includeSrc: true,
  excerpt: true, 
  transform(raw): Data {
    const postMap: Record<string, RecentPost> = {};
    const yearMap: Record<number, string[]> = {};
    const tagMap: Record<string, string[]> = {};
    const regex = /^\/posts\/([^\/]+)\/([^\/]+)/;
    const posts = raw
      .map(({ url, frontmatter }) => {
        let tags = [url.split("/")[2]];
        
        const result: RecentPost = {
          title: url.match(regex)?.[2] ?? '暂无标题',
          url,
          date: formatDate(frontmatter.date),
          abstract: frontmatter.abstract,
          tags: [...new Set(tags.concat(frontmatter.tags).filter(item => item != null))],
        };
        postMap[result.url] = result;
        return result;
      })
      .sort((a, b) => b.date.time - a.date.time);


    posts.forEach((item) => {
      const year = new Date(item.date.string).getFullYear();
      if (!yearMap[year]) {
        yearMap[year] = [];
      }
      yearMap[year].push(item.url);
      
      item.tags?.forEach((tag) => {
        if (!tagMap[tag]) {
          tagMap[tag] = []
        }
        tagMap[tag].push(item.url)
      })
    });

    return {
      posts,
      yearMap,
      postMap,
      tagMap,
    };
  },
});

function formatDate(raw: string): Post["date"] {
  const date = new Date(raw);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return {
    time: +date,
    string: `${year}-${month}-${day}`,
  };
}
