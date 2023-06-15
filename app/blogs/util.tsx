import {compileMDX} from 'next-mdx-remote/rsc'
import matter from 'gray-matter'
import moment from 'moment'

export interface BlogPostRaw {
  source: string
  path: string
  createdTime: string
  error?: string
}

export interface BlogPost {
  content: string
  id: string
  title: string
  createdTime: Date
}

export interface BlogFrontmatter {
  title: string
}

export const THIS_URL = `http://${process.env.VERCEL_URL}`;
export const BLOG_API_URL = THIS_URL + "/blogs/api";
export const getBlogUrlWithId = (id: string) => {
  return BLOG_API_URL + '/' + id;
}

export function getFrontmatter(source: string) {
  const {data, content} = matter(source);

  return {
    data: data as BlogFrontmatter,
    content
  };
}

const RFC_3339 = 'YYYY-MM-DDTHH:mm:ss';

export function parseDriveDate(dateStr: string): Date {
    return moment(dateStr, RFC_3339).toDate()
}

export const rawPostToBlogPost = (raw: BlogPostRaw): BlogPost => {
  const {data, content} = getFrontmatter(raw.source);
  const { createdTime, path } = raw;

  return {
    content,
    createdTime: parseDriveDate(raw.createdTime),
    id: path,
    title: data.title
  }
}

export async function compileContent(content: string) {
  return await compileMDX({
    source: content
  })
}
