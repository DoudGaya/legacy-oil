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
    <div className="flex fixed top-0 z-10 justify-between bg-yellow-500 items-center border-b drop-shadow-sm px-6 py-3 w-full">
    <div className="">
      <h1 className=' text-xl font-bold font-poppins'>AUG Legacy</h1>
    </div>
    <div className="">
      <Popover>
        <PopoverTrigger asChild>
          <div className=' cursor-pointer flex space-x-3 items-center flex-row px-4 py-2 rounded-md border border-white' >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 stroke-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            {"Logout"}
          </div>
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
