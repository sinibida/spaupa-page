import React from 'react'
import { MdArrowRight } from 'react-icons/md'
import styles from './IndexInnerContent.module.scss'
import Image from 'next/image'

type Props = {}

const IndexInnerContent = (props: Props) => {
  return (
    <div className="flex-grow basis-0 overflow-hidden relative">
      <div className='flex flex-col sm:flex-row gap-2 h-full'>
        <Image
        src="/MyFace.png"
        width={512}
        height={512}
        alt="The face of SPAUPA"
        className="aspect-square w-auto"
        />
        <p className='text-xl flex flex-col sm:gap-2'>
          <span>Name<MdArrowRight className='inline'/> <br className='hidden sm:inline'/><b>Jang Jun-Ha</b></span>
          <span>Age of Birth<MdArrowRight className='inline'/> <br className='hidden sm:inline'/><b>2003</b></span>
          <span>Occupation<MdArrowRight className='inline'/> <br className='hidden sm:inline'/><b>Chosun Uni.</b></span>
        </p>
      </div>
    </div>
  )
}

export default IndexInnerContent