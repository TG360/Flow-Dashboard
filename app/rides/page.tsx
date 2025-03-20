"use client"

import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db, auth } from "@/lib/firebase"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { User, Ride } from "@/lib/props"

export default function RidesPage() {
  const [users, setUsers] = useState<User[]>([])
  const [rides, setRides] = useState<Ride[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (!user) {
          router.push("/login")
        } else {
          fetchRides()
        }
      })

      return () => unsubscribe()
    }

    checkAuth()
  }, [router])

  useEffect(() => {
    console.log("Updated Users State:", users)
  }, [users])

  const fetchRides = async () => {
    try {
      setIsLoading(true)
      const ridesSnapshot = await getDocs(collection(db, "ride_requests"))
      const ridesData = ridesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Ride[]

      console.log("Processed Rides Data:", ridesData)
      setRides(ridesData)
    } catch (error) {
      console.error("Error fetching rides:", error)
      toast({
        title: "Error",
        description: "Failed to load rides",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filteredRides = rides.filter(
    (ride) =>
        (ride.driver_id?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (ride.rider_id?.toLowerCase() || '').includes(searchQuery.toLowerCase()),
  )


  return (
    <DashboardShell>
      <DashboardHeader heading="Rides" text="Manage the rides in your app"/>

      <div className="mb-4">
        <Input
          placeholder="Search specific rides..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rider</TableHead>
              <TableHead>Pickup</TableHead>
              <TableHead>DropOff</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  Loading rides...
                </TableCell>
              </TableRow>
            ) : filteredRides.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No rides found.
                </TableCell>
              </TableRow>
            ) : (
              filteredRides.map((ride) => (
                <TableRow key={ride.id}>
                  <TableCell className="font-medium">{ride.rider_id || 'N/A'}</TableCell>
                  <TableCell>N/A</TableCell>
                  <TableCell>'N/A'</TableCell>
                  <TableCell>{ride.driver_id || 'N/A'}</TableCell>
                  <TableCell>{ride.created_at ? new Date(ride.created_at.seconds * 1000).toLocaleDateString() : 'N/A'}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </DashboardShell>
  )
}

