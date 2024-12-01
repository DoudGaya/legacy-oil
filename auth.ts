import NextAuth, { type DefaultSession } from "next-auth"
import { db } from "./lib/db"
import authConfig from "./auth.config"
import { PrismaAdapter } from '@auth/prisma-adapter'
import { getUserById } from "./data/user"
import { getAccountByUserId } from "./actions/account"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      phone?: string | null
      image?: string | null
      isOAuth: boolean
    } & DefaultSession["user"]
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  trustHost: true, 
  
  pages: {
    signIn: "/login",
    error: '/error' 
  },
  events: {
    async linkAccount({ user }) {
      if (!user.id) throw new Error("User ID is missing");
      
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') return true
      
      if (!user.id) throw new Error("User ID is missing");
      const existingUser = await getUserById(user.id)

      return true
    }, 

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.email && session.user) {
        session.user.email = token.email
        session.user.name = token.name as string
        session.user.phone = token.phone as string
        session.user.image = token.picture as string 
        session.user.isOAuth = token.isOAuth as boolean
      }

      return session
    },
    
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub)
      if (!existingUser) return token

      const existingAccount = await getAccountByUserId(existingUser.id) 

      token.isOAuth = !!existingAccount // Fixed the == to =
      token.name = existingUser.name
      token.email = existingUser.email
      token.phone = existingUser.phone
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled
      token.image = existingUser.image
      token.role = existingUser.role

      return token
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig, 
})
