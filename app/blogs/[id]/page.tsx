import React, { useEffect } from 'react'
import { BlogPost } from '../api/getMdx';
import { MDXRemote, compileMDX } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { compilePost, getPost } from '../util';

type Props = {}

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
      <h1 className='title'>{frontmatter.title}</h1>
      <hr/>
      {content}
    </>
  )
}
