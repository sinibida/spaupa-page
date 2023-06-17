import React from 'react'
import { BlogPostRaw } from '../types';
import PostPreview from './PostPreview';
import styles from './PostPreviewList.module.scss'

type Props = {
  posts: BlogPostRaw[]
}

const PagePreviewList = ({
  posts
}: Props) => {
  return (
    <div>
      {
        posts.map((post, idx) => (
          <PostPreview key={idx} postRawData={post} className={styles.listedPreview}/>
        ))
      }
    </div>
  )
}

export default PagePreviewList;