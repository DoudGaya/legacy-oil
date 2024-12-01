'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { useTransition } from 'react'
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { createOutputDispatch } from '@/actions/dispatch'
import { inputDispatch, outPutDispatch } from '@prisma/client'
import { outputDispatchSchema } from '@/lib/schema'
import { useRouter } from 'next/navigation'


type OutputDispatchFormProps = {
  onSubmit: (data: outPutDispatch) => void
}

export function OutputDispatchForm({ onSubmit }: OutputDispatchFormProps) {
  const [isPending, setIsPending] = useState(false)
  // const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const router = useRouter()

  const form = useForm<z.infer<typeof outputDispatchSchema>>({
    resolver: zodResolver(outputDispatchSchema),
    defaultValues: {
      destination: "",
      driverPhoneNumber: "",
      driverName: "",
      driverVehicleNumber: "",
      driverVehicleType: "",
      truckCapacity: "",
      productType: "",
      productUnits: "",
      dispatchDate: "",
    },
  })



  async function handleSubmit(values: z.infer<typeof outputDispatchSchema>) {
    setError('')
    setSuccess('')

    setIsPending(true)
    try {
    const data = await createOutputDispatch(values)
      await new Promise(resolve => setTimeout(resolve, 1000))
      onSubmit(data.dispatch as outPutDispatch)
      form.reset()
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsPending(false)
      router.refresh()
    }

   
  }





  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="driverPhoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Driver Phone Number</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="driverName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Driver Name</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="driverVehicleNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Number</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="driverVehicleType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Type</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="truckCapacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Truck Capacity</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Type</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productUnits"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Units</FormLabel>
                <FormControl>
                  <Input disabled={isPending} type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
         <div className=" flex space-x-3">
         <FormField
            control={form.control}
            name="dispatchDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dispatch Date</FormLabel>
                <FormControl>
                  <Input disabled={isPending} type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />  
         </div>
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  )
}


