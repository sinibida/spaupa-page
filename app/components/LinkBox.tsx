import classNames from 'classnames'
import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import React, { PropsWithChildren } from 'react'

type Props = {
  href: Url,
  className?: string
}

const LinkBox = ({
  href,
  className,
  children
}: PropsWithChildren<Props>) => {
  return (
  <Link href={href}>
    <div className={classNames(
      "aspect-square border-2 border-black bg-white flex items-center justify-center transition-colors hover:border-0 hover:text-white font-bold text-2xl",
      className
    )}>
      {children}
    </div>
  </Link>
  )
}

export default LinkBox