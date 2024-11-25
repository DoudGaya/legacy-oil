import React from 'react'
import { PublicNavigations } from '@/components/PublicNavigations'

const AuthLayout = ({ children }: { children:  React.ReactNode}) => {
  return (

     <>
    <div className=' flex flex-row  items-center max-w-7xl mx-auto justify-center h-screen w-full'>
      <div className=" hidden lg:block ">
        {/* <Image src={authImage} className='h-[400px] object-contain' alt='' /> */}
      </div>
        <div className=" flex lg:w-5/12 h-full my-auto w-full  items-center rounded-md  justify-center px-10 py-10">
                {children}
        </div>
    </div>
    </>
  )
}

export default AuthLayout