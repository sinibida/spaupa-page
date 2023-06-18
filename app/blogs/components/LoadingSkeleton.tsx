import LoadingSpinner from '@/app/components/LoadingSpinner'
import React from 'react'

type Props = {}

const LoadingSkeleton = (props: Props) => {
  return (
  <div>
    <LoadingSpinner className='w-16 h-16 mx-auto my-4'/>
  </div>
  )
}

export default LoadingSkeleton