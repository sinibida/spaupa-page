import React, { useEffect } from 'react'
import { BlogPost } from '../api/util';
import { MDXRemote, compileMDX } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { compilePost, getBlogUrlWithId } from '../util';

type Props = {}

async function getPost(id: string) {
  return await (
    await fetch(getBlogUrlWithId(id), {cache: 'no-store'})
  ).json();
}

export default async function BlogView (params: {
  params: {
    id: string
  }
}) {

  const { id } = params.params;
  const post: BlogPost = await getPost(id);

  if (post.error) {
    notFound();
  }

  const { content, frontmatter } = await compilePost(post.source);
  return (
    <>
      <h1 className='title px-4 sm:px-2'>{frontmatter.title}</h1>
      <hr/>
      <div className='px-4 sm:px-2'>
        {content}
      </div>
    </>
  )
}
