'use client'

import React, { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { DarkButton } from '@/components/DarkButton'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from '@/components/ui/scroll-area'
import { DispatchItem } from './DispatchItem'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { InputDispatchForm } from './InputDispatchForm'
import { OutputDispatchForm } from './OutputDispatchForm'
import { inputDispatch, outPutDispatch } from '@prisma/client'

const logout = () => {
  signOut()
}

export function DispatchActionArea({
  inputs,
  outputs
}: {
  inputs: inputDispatch[]
  outputs: outPutDispatch[]
}) {
  const [dispatches, setDispatches] = useState<(inputDispatch | outPutDispatch)[]>([...inputs, ...outputs])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const itemsPerPage = 20

  const filteredDispatches = dispatches.filter(dispatch =>
    dispatch?.driverName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dispatch?.driverVehicleNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dispatch?.productType?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    dispatch?.dispatchType?.toLocaleLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredDispatches.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentDispatches = filteredDispatches.slice(startIndex, endIndex)

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex flex-col max-h-min py-0 my-0 bg-white border-b drop-shadow-sm px-6 w-full">
        <div className="flex w-full justify-between py-4">
          <div className="w-full">
            <h1 className='text-xl font-bold font-poppins'>AUG Legacy</h1>
          </div>
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <div className='bg-black text-white cursor-pointer flex space-x-3 items-center flex-row px-4 py-2 rounded-md border border-white'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 stroke-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                  {"Logout"}
                </div>
              </PopoverTrigger>
              <PopoverContent align='end' className="w-56 items-start justify-start self-start">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <div className="py-3 px-2 border-b">
                      <h4 className="font-medium leading-none">Profile Settings</h4>
                    </div>
                    <ul>
                      <li>
                        <Link href={'/user/profile'}>Admin Profile </Link>
                      </li>
                    </ul>
                    <div className="flex space-x-3">
                      <DarkButton />
                      <button onClick={logout} className='bg-black py-2 w-full rounded-lg outline-none text-primary hover:bg-black/90'>Sign Out</button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="w-full items-center flex bg-yellow-200 px-6 justify-between py-4 rounded-lg mb-4">
          <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row w-full md:justify-between md:items-center">
            <div className="flex space-y-2 flex-col">
              <p className='text-lg font-poppins font-semibold'>Dispatch Management System</p>
              <div className="flex space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className='font-poppins text-white'>Add Input Dispatch</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[700px] h-[80%] md:max-w-4xl overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className='py-5 flex text-center bg-blue-200 rounded-lg justify-center'>
                        <p className='flex items-start text-center font-poppins text-blue-800'>Add Input Dispatch</p>
                      </DialogTitle>
                    </DialogHeader>
                    <InputDispatchForm onSubmit={(data) => setDispatches([...dispatches, data])} />
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className='font-poppins text-white'>Add Output Dispatch</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[700px] h-[80%] md:max-w-4xl overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className='py-5 flex text-center bg-green-200 rounded-lg justify-center'>
                        <p className='flex items-start text-center font-poppins text-green-800'>Add Output Dispatch</p>
                      </DialogTitle>
                    </DialogHeader>
                    <OutputDispatchForm onSubmit={(data) => setDispatches([...dispatches, data])} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mb-4 flex flex-col space-y-2">
                <Label htmlFor="search" className='text-base font-poppins font-semibold'>Search dispatches</Label>
                <Input
                  id="search"
                  type="text"
                  placeholder="Search by driver name, vehicle number, or product type"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="max-w-sm outline-yellow-500 border-yellow-500 placeholder:text-yellow-700 w-[350px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollArea className="flex-grow">
        <div className="p-4">
          <div className="grid max-w-7xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {currentDispatches.map((dispatch, index) => (
              <DispatchItem dispatch={dispatch} key={dispatch.id || index} />
            ))}
          </div>
        </div>
      </ScrollArea>
      <div className="flex justify-center py-4 bg-white border-t">
        <Button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="mx-4">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

