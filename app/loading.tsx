import React from 'react'
import styles from "./loading.module.css"
import LoadingSpinner from './components/LoadingSpinner'

type Props = {}

const Loading = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoadingSpinner className={styles.spinner}/>
        <div className={styles.loadingText}>
          LOADING...
        </div>
      </div>
    </div>
  )
}

export default Loading