

interface User {
    id: string
    fullName: string 
    email: string
    password: string
    image: string 
}


interface outPutDispatchType {
    id:                                 string
    destination:                        string
    driverPhoneNumber:                  string
    driverName:                         string
    driverVehicleNumber:                string
    driverVehicleType:                  string
    truckCapacity:                      string
    productType:                        string
    productUnits:                       string
    dispatchDate:                       DateTime
    updatedAt:                          DateTime
  }
  
  
  
  interface inputDispatchType { 
    id:                                string 
    driverName:                        string
    driverPhoneNumber:                 string 
    driverVehicleNumber:               string | undefined
    driverVehicleType:                 string | undefined
    productWeightByWayBill:            string | undefined
    productWeightByScale:              string | undefined
    productSource:                     string | undefined
    difference:                        string | undefined // short and long
    productType:                       string | undefined
    arrivalTime:                       DateTime
    dispatchDate:                      DateTime
    updatedAt:                         DateTime
    createdAt:                         DateTime
  }
  
  
  
