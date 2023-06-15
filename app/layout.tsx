import './globals.css'
import { Inter } from 'next/font/google'

export const metadata = {
  title: 'WELCOME TO MY SPACE',
  description: 'SPAUPA\'s awesome website',
}

const InterFont = Inter({
  subsets: ['latin']
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={InterFont.className}>
        {children}
      </body>
    </html>
  )
}
