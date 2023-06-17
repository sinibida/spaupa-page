import React from 'react'
import styles from "./LoadingSpinner.module.css"
import classNames from 'classnames'

type Props = {
  className?: string
}

const LoadingSpinner = ({
  className
}: Props) => {
  return (
    <div className={classNames(
      className,
      styles.container
    )}>
      <div className={classNames(styles.ldsRing)}><div><div><div><div><div></div></div></div></div></div></div>
    </div>
  )
}

export default LoadingSpinner