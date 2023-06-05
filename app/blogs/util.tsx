import {compileMDX} from 'next-mdx-remote/rsc'
import matter from 'gray-matter'

export interface BlogFrontmatter {
  title: string
}

export const THIS_URL = `http://${process.env.VERCEL_URL}`;
export const BLOG_API_URL = THIS_URL + "/blogs/api";
export const getBlogUrlWithId = (id: string) => {
  return BLOG_API_URL + '/' + id;
}

export async function compilePost(source: string) {
  return await compileMDX<BlogFrontmatter>({
    source: source,
    options: { parseFrontmatter: true },
  })
}

export function getFrontmatter(source: string) {
  const {data, content} = matter(source);

  return {
    data: data as BlogFrontmatter,
    content
  };
}
