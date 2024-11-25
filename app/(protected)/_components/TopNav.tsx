"use client"

import React from 'react'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Link from 'next/link'
import { DarkButton } from '@/components/DarkButton'
const profileLinks = [
    '/user/profile'
]
const logout = () => {
    signOut()
}

export const TopNav = () => {
    const session = useSession()
    const user = session.data?.user.name
  return (
    <div className="hidden lg:flex justify-between bg-white border-b drop-shadow-sm px-12 py-3 w-full">
    <div className="">
      <h1 className=' text-2xl font-bold font-poppins'>AUG Legacy</h1>
    </div>
    <div className="">
      <Popover>
      <PopoverTrigger asChild>
        <div className=' cursor-pointer' >{user?.split(' ')[0]}</div>
      </PopoverTrigger>
      <PopoverContent align='end' className=" w-56 items-start justify-start self-start">
        <div className="grid gap-4">
          <div className="space-y-2">
           <div className=" py-3 px-2 border-b">
           <h4 className="font-medium leading-none">Profile Settings</h4>
           </div>
            <ul>
              <li>
                <Link href={'/user/profile'}>Admin Profile </Link>
              </li>
            </ul>
            <div className=" flex space-x-3">
              <DarkButton />
            <button onClick={logout} className=' bg-black py-2 w-full rounded-lg outline-none text-primary hover:bg-black/90'>Sign Out</button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>

    </div>
  </div>
  )
}