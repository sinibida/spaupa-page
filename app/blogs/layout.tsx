import React, { Suspense } from 'react'
import NavBar from './components/NavBar'
import './layout.scss'
import LoadingSpinner from '../components/LoadingSpinner'

export const metadata = {
  title: 'Blog de SPAUPA',
  description: 'SPAUPA\'s blog',
}

type Props = {
  children: React.ReactNode
}

const Layout = ({
  children
}: Props) => {
  return (
    <div className='bg-white flex flex-col items-center min-h-screen justify-between layout-blogs'>
      <NavBar/>
      <main className=' w-[72rem] max-w-full mb-auto'>
        <Suspense fallback={
        <div>
          <LoadingSpinner className='w-16 h-16 mx-auto my-4'/>
        </div>}
        >
          {children}
        </Suspense>
      </main>
      <footer className='mt-4 p-8 bg-black w-full text-white'>
        <div>
          <span>Created by SPAUPA w/&nbsp;</span>
          <a href='https://nextjs.org/' target='_blank' className='link-dotted'>Next.js</a>&nbsp;
          <span>& Published w/&nbsp;</span>
          <a href='https://vercel.com/' target='_blank' className='link-dotted'>Vercel</a>
        </div>
      </footer>
    </div>
  )
}

export default Layout