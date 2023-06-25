'use client';

import Link from 'next/link';
import React, { DetailedHTMLProps, AnchorHTMLAttributes } from 'react'

type Props = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>

const MDXAnchor: React.FC<Props> = ({
  href,
  ...propsRest
}: Props) => {
  const match = href && (/^:\/(.*)$/.exec(href));

  return match ? (
    <Link href={"blogs/" + match[1]} {...propsRest} ref={undefined}/>
  ) : (
    <a href={href} {...propsRest} target="_blank"/>
  )
}

export default MDXAnchor