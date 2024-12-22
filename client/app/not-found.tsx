import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const NotFound = () => {
  return (
    <main className='w-full h-screen flex flex-col items-center justify-center mt-[-90px] gap-5'>
        <h1 className='text-5xl font-bold'>404</h1>
        <h2 className='text-xl font-semibold mt-3'>PAGE NOT FOUND</h2>
         <div className='w-20 border-b-2' />
        <p className='w-[300px] text-center'>
          {`But if you don't change your direction, and if you keep looking, you may end up where you are heading.`}
        </p>
        <Link href="/">
          <Button className='mt-2 hover:shadow-md hover:shadow-secondary duration-300'>Take back home</Button>
        </Link>
    </main>
  )
}

export default NotFound