import React from 'react'
import styles from "./loading.module.css"
import LoadingSpinner from './components/LoadingSpinner'

type Props = {}

const Loading = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoadingSpinner className='w-full h-full'/>
        <div className={styles.loadingText}>
          LOADING...
        </div>
      </div>
    </div>
  )
}

export default Loading