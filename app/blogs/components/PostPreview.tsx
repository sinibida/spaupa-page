import React from 'react'
import { BlogPostRaw } from '../types'
import Link from 'next/link'
import classNames from 'classnames'
import { rawPostToBlogPost } from '../util'

type Props = {
  postRawData: BlogPostRaw
  className?: string
}

export default function PostPreview({
  postRawData,
  className
}: Props) {
  const post = rawPostToBlogPost(postRawData);

  return (
    <Link href={`/blogs/${post.id}`} className={classNames(
      className,
      'no-invert block'
    )}>
      <div className={classNames(
        'py-2 px-4 hover:bg-neutral-200 active:bg-purple-500 active:text-white cursor-pointer'
      )}>
        <h1>{post.title}</h1>
        <span className='text-justify text-sm/4 text-neutral-400'>{post.content}</span>
      </div>
    </Link>
  )
}