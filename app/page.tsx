'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaHome, FaHotel, FaSearch, FaStar, FaCheckCircle } from 'react-icons/fa'
import { Button } from "@/components/ui/button"
import bannerImage from '@/public/img/banner-image.jpg'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PublicNavigations } from '@/components/PublicNavigations'
import { homeListings, marketingTextMore, testimonials } from '@/lib/customer-records'
import Listing from '@/components/home/Listing'
import { Footer } from '@/components/Footer'
import { LoginForm } from '@/components/auth/LogInForm'

export default function LandingPage() {
 


  return (
    <div className="min-h-[80vh] bg-gray-50 flex flex-col items-center justify-center">
        <div className=" w-full max-w-md">
          <LoginForm />
        </div>
    </div>
  )
}