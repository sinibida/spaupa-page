import React from 'react'
import { compilePost, getAllPost, getFrontmatter } from './util';
import { BlogPost } from './api/getMdx';
import styles from './page.module.scss';
import classNames from 'classnames';
import Link from 'next/link';

type Props = {}

const Page = async (props: Props) => {
  const post: BlogPost[] = await getAllPost();

  const compiled = post.filter(x => !x.error).map(x => (
    getFrontmatter(x.source)
  ))

  return (
    <div>
      {
        compiled.map((x, idx) => (
          <Link key={idx} href={`/blogs/${post[idx].path}`} className={classNames(
            styles.postPreview,
            'no-invert block'
          )}>
            <div className={classNames(
              'py-2 px-4 hover:bg-neutral-200 active:bg-purple-500 active:text-white cursor-pointer'
            )}>
              <h1>{x.data.title}</h1>
              <span className='text-justify text-sm/4 text-neutral-400'>{x.content}</span>
            </div>
          </Link>
        ))
      }
    </div>
  )
}

export default Page