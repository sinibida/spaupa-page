'use client';

import React, { DetailedHTMLProps, HTMLAttributes, PropsWithChildren, ReactElement } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>

const MDXPre: React.FC<Props> = ({
  children,
  className,
}: Props) => {
  const childrenElement = children as ReactElement;

  const match = /language-(\w+)/.exec(childrenElement.props.className || "");
  const language = match ? (match[1] || 'text') : 'text';

  return (
    <div>
      <div className='w-fit max-w-full'>
        <p className='m-0 text-right font-mono text-sm text-neutral-500 italic'>
          [{language}]
        </p>
        <SyntaxHighlighter
        language={language}
        useInlineStyles={false}
        showLineNumbers={true}
        >
          {childrenElement.props.children }
        </SyntaxHighlighter>
      </div>
    </div>
  ) 
}

export default MDXPre