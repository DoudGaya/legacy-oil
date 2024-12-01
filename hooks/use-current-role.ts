"use client"
import { useSession } from "next-auth/react";


export const useCurrentRole = () => {
    const session = useSession()
    // @ts-ignore
    return session.data?.user.role
}