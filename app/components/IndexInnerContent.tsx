import React from 'react'
import { MdArrowRight } from 'react-icons/md'
import Image from 'next/image'
import FancyTitle from './FancyTitle'
import Link from 'next/link'
import LinkBox from './LinkBox'

type Props = {}

const IndexInnerContent = (props: Props) => {
  return (
    <div className="flex-grow basis-0 flex flex-col gap-4 items-stretch overflow-y-scroll">
      <FancyTitle/>
      <div className='flex flex-col sm:flex-row gap-2 h-fit'>
        <Image
        src="/MyFace.png"
        width={512}
        height={512}
        alt="The face of SPAUPA"
        className="w-auto h-64 aspect-square"
        />
        <p className='text-xl flex-grow flex flex-col sm:gap-2'>
          <span>Name<MdArrowRight className='inline'/> <br className='hidden sm:inline'/><b>Jang Jun-Ha</b></span>
          <span>Age of Birth<MdArrowRight className='inline'/> <br className='hidden sm:inline'/><b>2003</b></span>
          <span>Occupation<MdArrowRight className='inline'/> <br className='hidden sm:inline'/><b>Chosun Uni.</b></span>
        </p>
      </div>
      <h1 className=' text-8xl text-right'>
        NICE TO <span className='font-bold'>MEET YOU.</span>
        <span className="inline-block"> </span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <LinkBox href="/blogs" className='hover:bg-teal-400'>
          Blog
        </LinkBox>
      </div>
    </div>
  )
}

export default IndexInnerContent