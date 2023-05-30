'use client';

import FancyTitleText from '@/app/components/FancyTitleText'
import classNames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import NavLink from './NavLink';

type Props = {}

const NavBar = (props: Props) => {
  return (
    <nav className='border-b-2 border-black h-12 flex flex-row items-center justify-between px-4 sm:px-8 self-stretch hover:bg-emerald-200 transition-colors'>
      <Link href="/">
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