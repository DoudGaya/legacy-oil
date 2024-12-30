import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { inputDispatch, outPutDispatch } from "@prisma/client"



type DispatchItemProps = {
  dispatch: inputDispatch | outPutDispatch
}

export function DispatchItem({ dispatch }: DispatchItemProps) {
  const isInputDispatch = 'productWeightByWayBill' in dispatch


  

  return (
    <Card>
      <CardHeader className=" bg-yellow-200 rounded-t-lg">
        <CardTitle>{isInputDispatch ? 'Input Dispatch' : 'Output Dispatch'}</CardTitle>
      </CardHeader>
      <CardContent className=" py-3">
        <p><strong>Driver:</strong> {dispatch.driverName}</p>
        <p><strong>Vehicle:</strong> {dispatch.driverVehicleNumber}</p>
        <p><strong>Driver Phone:</strong> {dispatch.driverPhoneNumber}</p>
        <p><strong>Product:</strong> {dispatch.productType}</p>
        {isInputDispatch ? (
          <>
            <p><strong>Source:</strong> {(dispatch as inputDispatch).productSource}</p>
            <p><strong>Weight (Way Bill):</strong> {(dispatch as inputDispatch).productWeightByWayBill} Kg</p>
            <p><strong>Weight (Scale):</strong> {(dispatch as inputDispatch).productWeightByScale} Kg</p>
          </>
        ) : (
          <>
            <p><strong>Destination:</strong> {(dispatch as outPutDispatch).destination}</p>
            <p><strong>Units:</strong> {(dispatch as outPutDispatch).productUnits}</p>
            <p><strong>Truck Capacity:</strong> {(dispatch as outPutDispatch).truckCapacity}</p>
          </>
        )}
        <p><strong>Dispatch Date:</strong> {
        // @ts-ignore
        new Date(dispatch.dispatchDate).toLocaleDateString()}</p>
      </CardContent>
    </Card>
  )
}

