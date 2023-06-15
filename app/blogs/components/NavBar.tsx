//'use client';

import FancyTitleText from '@/app/components/FancyTitleText'
import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'
import NavLink from './NavLink';

type Props = {}

const NavBar = (props: Props) => {
  return (
    <nav className='border-b-2 border-black flex flex-row items-center justify-between px-4 py-4 sm:px-8 sm:py-2 self-stretch bg-white hover:bg-emerald-200 transition-colors sticky sm:relative top-0'>
      <Link href="/" className='link-invert'>
        <FancyTitleText className='text-xl'/>
        &nbsp;
      </Link>
      <div className='flex flex-row'>
        <NavLink href="/blogs">
          Blog
        </NavLink>
      </div>
    </nav>
  )
}

export default NavBar