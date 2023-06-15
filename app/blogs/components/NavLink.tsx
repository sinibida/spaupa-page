'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { PropsWithChildren } from 'react'

type Props = {
  href: string
}

const NavLink = ({ href, children }: PropsWithChildren<Props>) => {
  const pathname = usePathname();

  return (
    <Link href={href} className={classNames(
      {'font-bold': pathname === href},
      'link-invert'
    )}>
      {children}
    </Link>
  )
}

export default NavLink