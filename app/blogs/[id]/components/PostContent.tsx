'use client';

import React, { useEffect, useState } from 'react'
import classNames from 'classnames';
import styles from './PostContent.module.scss';
import './hljs-theme.scss';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize'
import MDXImg from '../../components/mdx/MDXImg';
import MDXPre from '../../components/mdx/MDXPre';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import MDXAnchor from '../../components/mdx/MDXAnchor';

type Props = {
  source: string
}

const components = {
  pre: MDXPre,
  img: MDXImg,
  a: MDXAnchor,
}

const PostContent = ({
  source
}: Props) => {
  const [serialized, setSerialized] = useState<MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>>();
  useEffect(() => {
    async function f() {
      const ser = await serialize(
        source,
        {
          mdxOptions: {
            development: process.env.NODE_ENV === 'development',
            rehypePlugins: [rehypeMdxCodeProps]
          }
        }
      );
      setSerialized(ser);
    };
    f();
  }, [source])

  return (
    <div className={classNames('', styles.blogContent)}>
      {
        serialized ? (
          <MDXRemote {...serialized} components={components}/>
        ) : (
          <LoadingSkeleton/>
        )
      }
    </div>
  )
}

export default PostContent