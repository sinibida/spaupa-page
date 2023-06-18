'use client';

import React, { DetailedHTMLProps, HTMLAttributes, PropsWithChildren, ReactElement } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  filename?: string
}

const MDXPre: React.FC<Props> = ({
  children,
  filename,
}: Props) => {
  const childrenElement = children as ReactElement;
  let code: string = childrenElement.props.children;
  if (code.endsWith('\n'))
    code = code.substring(0, code.length - 1);

  const match = /language-(\w+)/.exec(childrenElement.props.className || "");
  const language = match ? (match[1] || 'text') : 'text';

  return (
    <div>
      <div className='w-fit max-w-full'>
        <p className='m-0 text-left font-mono text-sm italic font-bold'>
          {filename || " "}
        </p>
        <SyntaxHighlighter
        language={language}
        useInlineStyles={false}
        showLineNumbers={true}
        >
          {code}
        </SyntaxHighlighter>
        <p className='m-0 text-right font-mono text-sm text-neutral-500 italic'>
          [{language}]
        </p>
      </div>
    </div>
  ) 
}

export default MDXPre