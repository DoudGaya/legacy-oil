'use client'

import { startTransition, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { useTransition } from 'react'
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { createInputDispatch } from '@/actions/dispatch'
import { inputDispatch } from '@prisma/client'
import { inputDispatchSchema } from '@/lib/schema'
import { useRouter } from 'next/navigation'



type InputDispatchFormProps = {
  onSubmit: (data: inputDispatch) => void
}

export function InputDispatchForm({ onSubmit }: InputDispatchFormProps) {
  const [isPending, setIsPending] = useState(false)
  // const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const router = useRouter()

  const form = useForm<z.infer<typeof inputDispatchSchema>>({
    resolver: zodResolver(inputDispatchSchema),
    defaultValues: {
    difference: "",
    dispatchDate: "",
    driverName: "",
    driverPhoneNumber: "",
    driverVehicleNumber: "",
    driverVehicleType: "",
    productSource: "",
    productType: "",
    productWeightByScale: "",
    productWeightByWayBill: "",
    },
  })

  async function handleSubmit(values: z.infer<typeof inputDispatchSchema>) {
    setError('')
    setSuccess('')

    setIsPending(true)
    try {
    const data = await createInputDispatch(values)
    console.log(data.dispatch)
      await new Promise(resolve => setTimeout(resolve, 1000))
      onSubmit(data.dispatch as inputDispatch)
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
            name="productWeightByWayBill"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Weight by Way Bill</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productWeightByScale"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Weight by Scale</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productSource"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Source</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="difference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difference (Short/Long)</FormLabel>
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
            name="dispatchDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Input Date</FormLabel>
                <FormControl>
                  <Input disabled={isPending} type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  )
}


