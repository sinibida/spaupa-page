import React from 'react'
import NavBar from './components/NavBar'
import './layout.scss'

type Props = {
  children: React.ReactNode
}

const Layout = ({
  children
}: Props) => {
  return (
    <div className='bg-white flex flex-col items-center layout-blogs'>
      <NavBar/>
      <div className=' w-[48rem] max-w-full'>
        {children}
      </div>
    </div>
  )
}

export default Layout