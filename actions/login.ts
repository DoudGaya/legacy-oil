"use server"

import { loginSchema } from '@/lib/schema'
import * as z from 'zod' 
import { signIn } from '@/auth'
import { DEFAULT_LOGGED_IN_REDIRRECT } from '@/routes'
import { AuthError } from 'next-auth'
import { getUserByEmail } from '@/data/user'

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);
  
  if (!validatedFields.success) {
    return { error: "Invalid fields" }
  }

  const { email, password } = validatedFields.data

  const existingUser = await getUserByEmail(email) 
  
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGGED_IN_REDIRRECT,
    })

    return { success: "Logged in!" }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
        default:
          return { error: "Something went wrong!" }
      }
    }

    throw error
  }
}

// "use server"
// import { loginSchema } from '@/lib/schema'
// import * as z from 'zod' 
// import { signIn } from '@/auth'
// import { DEFAULT_LOGGED_IN_REDIRRECT} from '@/routes'
// import { AuthError } from 'next-auth'
// import { getUserByEmail } from '@/data/user'


// export const login = async (values: z.infer<typeof loginSchema>) => {
//     const fieldValidation = loginSchema.safeParse(values);
//     if (!fieldValidation.success) {
//          return {error: "field Validation failed "}
//     }
 
//     const { email, password } = fieldValidation.data


//     const existingUser = await getUserByEmail(email) 

   
//     if (!existingUser || !existingUser.email || !existingUser.password) {
//         return {error: "Email does not exist!" }
//     }



//     try {
//         await signIn("credentials", {
//             email, 
//             password,
//             redirect: true,
//             redirectTo: DEFAULT_LOGGED_IN_REDIRRECT,
//         })
//     } catch (error) {
//         if (error instanceof AuthError) {
//             switch (error.type) {
//                 case 'CredentialsSignin':
//                     return {error: "Invalid Credentials"}
//                     default:
//                         return {error: "Something went wrong"}
//             }
//         }

//         throw error;
//     }


// }