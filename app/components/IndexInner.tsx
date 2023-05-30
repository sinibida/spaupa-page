import React, { CSSProperties, useCallback, useState } from 'react'
import ScrollingText from './ScrollingText'
import FancyTitle from './FancyTitle'
import IndexInnerContent from './IndexInnerContent'

type Props = {
  onWiggleChange: (x: boolean) => any
}

const IndexInner = ({
  onWiggleChange
}: Props) => {
  const [wiggle, setWiggle] = useState(true)

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = !(e.target.checked);
    setWiggle(newVal);
    onWiggleChange(newVal);
  }, [onWiggleChange])

  return (
    <div className="flex flex-col items-stretch text-black gap-4 min-h-0 max-h-full h-full">
      <FancyTitle/>
      <IndexInnerContent/>
      <div>
        <div className="h-[2px] bg-black"/>
        <div className='flex flex-row justify-end'>
          <label className='font-bold flex flex-row items-center gap-2'>
            <span>No Wiggly{'  '}</span>
            <input
            type='checkbox'
            checked={!wiggle}
            onChange={onChange}
            className='p-0 m-0 w-4 h-4 accent-black border-black'
            />
          </label>
        </div>
      </div>
    </div>
  )
}

export default IndexInner