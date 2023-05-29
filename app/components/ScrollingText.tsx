import React from 'react'
import styles from './ScrollingText.module.css'

type Props = {
  text: string
  scrollDir?: "left" | "right"
}

const ScrollingText = (props: Props) => {
  return (
    <span className="bg-black text-white p-1 text-xl text-center font-medium overflow-clip whitespace-nowrap block">
      {
        [...Array(10)].map((e, i) => (
          <span className={
            props.scrollDir ? (
              props.scrollDir === "left" ?
              styles.scrollLeft :
              styles.scrollRight
            ) : styles.scrollLeft
          } key={i}>
            {props.text}&nbsp;&nbsp;|&nbsp;&nbsp;
          </span>
        ))
      }
    </span>
  )
}

export default ScrollingText