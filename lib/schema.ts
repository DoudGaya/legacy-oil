import { z } from "zod"


export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  email: z.optional(z.string()),
  phone: z.optional(z.string()),
  image: z.optional(z.any())
}) 

export const settingsSecurityDetailsSchema = z.object({
  oldPassword: z.optional(z.string()),
  newPassword: z.optional(z.string()),
  newPasswordConfirmation: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
}) 


export const loginSchema = z.object({
    email: z.string().email({
      message: "Email must be of type email"
    }),
    password: z.string().min(1, {
      message: "Password is required"
    }),
  })
  

  export const newPasswordSchema = z.object({
    password: z.string().min(6, {
      message: "Min of 6 Characters required"
    }),
    passwordConfirmation: z.string().min(6, {
    message: "Min of 6 Characters required"
    }),
  })

  export const ResetSchema = z.object({
    email: z.string().email({
      message: "Email must be of type email"
    }),
  })
  

  export const signUpSchema = z.object({
    fullName: z.string().min(2, {
      message: "Please provide your Full Name",
    }),
    email: z.string().min(3, {
      message: "Email address must be less than 2 characters",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
    phone: z.string().min(2, {
      message: "Password confirmation must match characters.",
    }),
    passwordConfirmation: z.string().min(6, {
      message: "Password confirmation must match",
    }),
  })

  export const inputDispatchSchema = z.object({
    driverName: z.string().min(1, "Driver name is required"),
    driverPhoneNumber: z.string().min(1, "Driver phone number is required"),
    driverVehicleNumber: z.string().min(1, "Vehicle number is required"),
    driverVehicleType: z.string().min(1, "Vehicle type is required"),
    productWeightByWayBill: z.string().min(1, "Product weight by way bill is required"),
    productWeightByScale: z.string().min(1, "Product weight by scale is required"),
    productSource: z.string().min(1, "Product source is required"),
    difference: z.string().optional(),
    productType: z.string().min(1, "Product type is required"),
    dispatchDate: z.string().min(1, "Dispatch date is required"),
  })


  export const outputDispatchSchema = z.object({
    destination: z.string().min(1, "Destination is required"),
    driverPhoneNumber: z.string().min(1, "Driver phone number is required"),
    driverName: z.string().min(1, "Driver name is required"),
    driverVehicleNumber: z.string().min(1, "Vehicle number is required"),
    driverVehicleType: z.string().min(1, "Vehicle type is required"),
    truckCapacity: z.string().min(1, "Truck capacity is required"),
    productType: z.string().min(1, "Product type is required"),
    productUnits: z.string().optional(),
    dispatchDate: z.string().min(1, "Dispatch date is required"),
  })
