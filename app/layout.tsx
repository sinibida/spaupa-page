import classNames from 'classnames';
import './globals.css'
import { Inter, Noto_Sans_KR } from 'next/font/google'

export const metadata = {
  title: 'WELCOME TO MY SPACE',
  description: 'SPAUPA\'s awesome website',
}

const InterFont = Inter({
  subsets: ['latin']
});

// const NotoSansKorean = Noto_Sans_KR({
//   subsets: ['latin'],
//   weight: ['100', '300', '400', '500', '700', '900']
// })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={classNames(
        InterFont.className
      )}>
        {children}
      </body>
    </html>
  )
}
