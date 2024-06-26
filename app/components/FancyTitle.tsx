import React, { CSSProperties } from 'react'
import ScrollingText from './ScrollingText'
import FancyTitleText from './FancyTitleText'

type Props = {}

const FancyTitle = (props: Props) => {
  const weights: CSSProperties[] = [
    {fontWeight: 100},
    {fontWeight: 144.4444444},
    {fontWeight: 188.8888889},
    {fontWeight: 233.3333333},
    {fontWeight: 277.7777778},
    {fontWeight: 322.2222222},
    {fontWeight: 366.6666667},
    {fontWeight: 411.1111111},
    {fontWeight: 455.5555556},
    {fontWeight: 500},
    {fontWeight: 544.4444444},
    {fontWeight: 588.8888889},
    {fontWeight: 633.3333333},
    {fontWeight: 677.7777778},
    {fontWeight: 722.2222222},
    {fontWeight: 766.6666667},
    {fontWeight: 811.1111111},
    {fontWeight: 855.5555556},
    {fontWeight: 900},
  ]

  return (
    <div className="flex flex-col items-stretch gap-2 sm:gap-4">
      <ScrollingText text="WELCOME HELLO BONJOUR" scrollDir="right"/>

      <FancyTitleText className='text-left sm:text-center text-3xl sm:text-6xl '/>

      <ScrollingText text="AWESOME WEBSITE BY SPAUPA"/>
    </div>
  )
}

export default FancyTitle