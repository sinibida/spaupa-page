import React, { Suspense } from 'react'
import { BLOG_API_URL, getFrontmatter } from './util';
import { BlogPostRaw } from './types';
import styles from './page.module.scss';
import classNames from 'classnames';
import Link from 'next/link';
import PostPreviewList from './components/PostPreviewList';
import LoadingSpinner from '../components/LoadingSpinner';

// TODO: Add Suspense

type Props = {}

const Page = async (props: Props) => {
  const posts: BlogPostRaw[] = (
    (await
      (await
        fetch(BLOG_API_URL, {cache: 'no-store'})
      ).json()
    ) as BlogPostRaw[]
  ).filter(x => !x.error);

  return (
    <div>
      <PostPreviewList posts={posts}/>
    </div>
  )
}

export default Page