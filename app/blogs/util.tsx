import {compileMDX} from 'next-mdx-remote/rsc'
import matter from 'gray-matter'

export interface BlogFrontmatter {
  title: string
}

export async function getPost(id: string) {
  const response = await fetch(`http://localhost:3000/blogs/api/${id}`, {cache: 'no-store'});

  return response.json();
}

export async function getAllPost() {
  const response = await fetch(`http://localhost:3000/blogs/api`, {cache: 'no-store'});

  return response.json();
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
