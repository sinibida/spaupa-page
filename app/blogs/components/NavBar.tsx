import FancyTitleText from '@/app/components/FancyTitleText'
import Link from 'next/link'
import React from 'react'

type Props = {}

const NavBar = (props: Props) => {
  return (
    <nav className='border-b-2 border-black h-12 font-bold flex flex-row items-center justify-between px-8'>
      <Link href="/">
        <FancyTitleText className='text-xl'/>
      </Link>
      <div className='flex flex-row'>
        <Link href="/blogs">
          Blog
        </Link>
      </div>
    </nav>
  )
}

export default NavBar