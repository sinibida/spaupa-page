import React, { useEffect } from 'react'
import { rawPostToBlogPost } from '../util';
import {BlogPost, BlogPostRaw} from '../types';
import { MDXRemote, compileMDX } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { compileContent, getBlogUrlWithId } from '../util';
import { MdAccessTime } from 'react-icons/md'
import styles from './page.module.scss';
import classNames from 'classnames';
import moment from 'moment';

// TODO: Add Suspense

type Props = {}

async function getPost(id: string) {
  const raw = await (
    await fetch(getBlogUrlWithId(id), {cache: 'no-store'})
  ).json() as BlogPostRaw;
  if (raw.error)
    return null;
  return rawPostToBlogPost(raw);
}

export default async function BlogView (params: {
  params: {
    id: string
  }
}) {
  const { id } = params.params;
  const post: BlogPost | null = await getPost(id);

  if (!post) {
    notFound();
  }

  const content = await compileContent(post.content);

  return (
    <div className='px-4 sm:px-8'>
      <div className='mb-2'>
        <h1 className='text-4xl/relaxed sm:text-5xl/relaxed font-bold'>
          {post.title}
        </h1>
        <h1 className='text-xl inline-flex items-center gap-2'>
          <MdAccessTime className=''/> 
          {moment(post.createdTime).format("yyyy-MM-DD")}
        </h1>
      </div>
      <hr className='mb-2'/>
      <div className={classNames('', styles.blogContent)}>
        {content}
      </div>
    </div>
  )
}
