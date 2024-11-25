"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState, useTransition } from "react"
import { z } from "zod"
import { FcGoogle } from "react-icons/fc";
import logo from '@/public/img/logo-icon.png'
import Link from "next/link";
import { loginSchema } from "@/lib/schema"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { FormError } from "../FormError";
import { FormSuccess } from "../FormSuccess";
import { login } from "@/actions/login"
import { signIn } from "next-auth/react"
import { DEFAULT_LOGGED_IN_REDIRRECT } from "@/routes"
import { useSearchParams } from "next/navigation"


export function LoginForm() {

  const [isPending, startTransition] = useTransition()
  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const searchParams = useSearchParams()
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already been used with another provider" : ""


   const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })


  const googleSignIn = (provider: "google") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGGED_IN_REDIRRECT
    })
  }


  function requestNewOTP (values: z.infer<typeof loginSchema>) {
    console.log(values)
  }

  function onSubmit(values: z.infer<typeof loginSchema>) {
    setError('')
    setSuccess('')
    startTransition(() => {
      login(values)
      .then((data) => {
        if (data?.error) {
          form.reset() 
          setError(data.error)
        }
        // if (data?.success) {
        //   form.reset()
        //   setSuccess(data.success)
        // }
      }).catch( (error) => {
        setError("Something Went Wrong!")
      })
    })
  }

  return (
    <div className="flex flex-col space-y-6 bg-white py-12 border border-yellow-500 shadow-lg rounded-lg  w-full">
      <div className= " flex w-full text-center items-center justify-center py-4 bg-yellow-500">
        <h1 className=" text-2xl font-bold font-poppins">AUG Legacy Oil</h1>
      </div>

      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-10 w-full">
         <>
          <FormField
           control={form.control}
           name="email"
           render={({ field }) => (
             <FormItem>
               <FormLabel>Email Address</FormLabel>
               <FormControl>
                 <Input type="email" disabled={isPending} className=" outline-yellow-500" placeholder="Email Address" {...field} />
               </FormControl>
               <FormMessage />
             </FormItem>
           )}
         />
        <FormField
           control={form.control}
           name="password"
           render={({ field }) => (
             <FormItem>
               <FormLabel>Password</FormLabel>
               <FormControl>
                 <Input type="password" disabled={isPending} className=" outline-yellow-500" placeholder="Password" {...field} />
               </FormControl>
               <FormMessage />
             </FormItem>
           )}
         />
         </>
        <FormError message={error ||  urlError} />
        <FormSuccess message={success} />
       <Button type="submit" disabled={isPending} className=" bg-yellow-500 text-white hover:bg-black/90 w-full"> {showTwoFactor ? "Confirm OTP" : "Log In"} </Button>
      </form>
    </Form>
    </div>
  )
}

