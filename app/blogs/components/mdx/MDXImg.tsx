'use client';

import React, { DetailedHTMLProps, HTMLAttributes, ImgHTMLAttributes, PropsWithChildren, ReactElement } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';

type Props = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

const formatSrc = (src: string) => {
  const localMatch = /^:\/(.*)/.exec(src);
  if (localMatch) {
    const id = localMatch[1];
    return `https://drive.google.com/uc?export=view&id=${id}`;
  } else {
    return src;
  }
}

const MDXImg: React.FC<Props> = ({
  src, 
  title,
  ...propsRest
}: Props) => {
  const formattedSrc = src && formatSrc(src);

  const titleArgs = title ? title.split('|') : [undefined];
  const actualTitle = titleArgs[0];
  const width = titleArgs[1];

  return (
    <img src={formattedSrc} title={actualTitle} {...propsRest} width={width}/>
  ) 
}

export default MDXImg