export interface User {
  id: string
  firstName?: string
  accountStatus?: string
  emailAddress?: string
  phoneNumber?: string
  createdAt?: any
  paymentMethod?: string
  role?: string
}

export interface Ride {
  id: string
  driver_id: string
  rider_id: string
  //pickup_location: string
  //dropoff_location: string
  created_at: any
}