import React from 'react'
import { DispatchActionArea } from './_components/DispatchActionArea'
import { getAllInputDispatch, getAllOutputDispatch } from '@/actions/dispatch'
import { inputDispatch, outPutDispatch } from '@prisma/client'

const AdminCasePage = async () => {


  const inputs = await getAllInputDispatch() as inputDispatch[]


  // @ts-ignore
  const outputDispatch = await getAllOutputDispatch() as outPutDispatch[]


  return (
    <div className='flex h-full'>
      <DispatchActionArea inputs={inputs} outputs={outputDispatch} />
    </div>
    )
}

export default AdminCasePage