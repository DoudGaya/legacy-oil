"use server"
import { inputDispatchSchema, outputDispatchSchema,  } from "@/lib/schema";
import * as z from "zod";
import { db } from "@/lib/db";
import { outPutDispatch } from "@prisma/client";


export const deleteDispatchById = async (id: string) => {
    const dispatch = await db.inputDispatch.delete({
        where: {
            id: id
        },
    })
    return dispatch
 }


export const getAllInputDispatch = async () => {
    const dispatch = await db.inputDispatch.findMany( {
        orderBy: {
         createdAt: "asc"   
        }
    })
    return dispatch;
}

export const getAllOutputDispatch = async () => {
    const dispatch = await db.inputDispatch.findMany( {
        orderBy: {
         createdAt: "asc"   
        }
    })
    return dispatch;
}

export async function createInputDispatch(values: z.infer<typeof inputDispatchSchema>) {
    const fieldValidation = inputDispatchSchema.safeParse(values);
    if (!fieldValidation.success) {
        return { error: "field Validation failed " };
    }

    const { 
        driverName,
        driverPhoneNumber,
        difference,
        dispatchDate,
        driverVehicleNumber,
        driverVehicleType,
        productSource,
        productType,
        productWeightByScale,
        productWeightByWayBill,
     } = fieldValidation.data;



     const dispatch = await db.inputDispatch.create({
        // @ts-ignore   
        data: {
                driverName,
                driverPhoneNumber,
                dispatchDate: new Date(dispatchDate).toISOString(),
                difference,
                driverVehicleNumber,
                driverVehicleType,
                productSource,
                productType,
                productWeightByScale,
                productWeightByWayBill,

           }
     })

    
    return { dispatch: dispatch, success: "Check your email to verify your account!" };
}



export async function createOutputDispatch(values: z.infer<typeof outputDispatchSchema>) {
    const fieldValidation = outputDispatchSchema.safeParse(values);
    if (!fieldValidation.success) {
        return { error: "field Validation failed " };
    }
    const { 
        driverName,
        driverPhoneNumber,
        dispatchDate,
        productUnits,
        destination,
        driverVehicleType,
        truckCapacity,
        driverVehicleNumber,
        productType,
     } = fieldValidation.data;

     const dispatch = await db.outPutDispatch.create({
        // @ts-ignore   
        data: {
                driverName,
                driverPhoneNumber,
                dispatchDate: new Date(dispatchDate).toISOString(),
                destination,
                driverVehicleType,
                truckCapacity,
                driverVehicleNumber,
                productType,
                productUnits,
           }
     }) as outPutDispatch



     return {dispatch: dispatch, success: "Dispatch has been saved!"};


}