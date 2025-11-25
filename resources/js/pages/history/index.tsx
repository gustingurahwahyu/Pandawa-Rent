import AppLayout from '@/layouts/app-layout';
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import OrderCard from "./components/order-card"

export default function OrderHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const orders = [
    {
      id: 1,
      carName: "Lamborghini Huracan",
      carImage: "/images/cars/lamborghini-huracan.png",
      pickupDate: "2025-01-10",
      dropoffDate: "2025-01-12",
      total: "2.400K",
      status: "pending",
    },
    {
      id: 2,
      carName: "Ferrari Enzo",
      carImage: "/images/cars/ferrari-enzo.png",
      pickupDate: "2025-02-03",
      dropoffDate: "2025-02-05",
      total: "1.200K",
      status: "success",
    },
  ]

  // FILTER
  const filteredOrders = orders.filter((order) => {
    const term = searchTerm.toLowerCase()

    return (
      order.carName.toLowerCase().includes(term) ||
      order.status.toLowerCase().includes(term) ||
      order.pickupDate.includes(term) ||
      order.dropoffDate.includes(term)
    )
  })

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="text-2xl font-bold text-black mb-6">Order History</h1>

      {/* SEARCH INPUT */}
      <div className="relative mb-6 max-w-sm border-b border-transparent hover:border-gray">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray size-4" />
        <Input
          placeholder="Search by car, status, or date..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* ORDER LIST */}
      <div className="grid gap-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => <OrderCard key={order.id} {...order} />)
        ) : (
          <p className="text-gray text-sm">No orders found.</p>
        )}
      </div>
    </div>
  )
}


OrderHistoryPage.layout = (page: React.ReactNode) => <AppLayout children={page} />;