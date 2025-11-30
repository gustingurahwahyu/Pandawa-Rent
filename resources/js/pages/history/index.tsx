import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';
import OrderCard from './components/order-card';

interface Booking {
  id: number;
  car_name: string;
  car_image: string | null;
  pickup_date: string;
  dropoff_date: string;
  total: number;
  status: string;
}

interface Props {
  bookings: Booking[];
}

// Format harga ke format K (ribuan)
const formatPrice = (price: number): string => {
  const priceInK = price / 1000;
  if (priceInK % 1 === 0) {
    return `${priceInK}K`;
  }
  return `${priceInK.toFixed(1)}K`;
};

export default function OrderHistoryPage({ bookings }: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  // FILTER
  const filteredOrders = bookings.filter((order) => {
    const term = searchTerm.toLowerCase();

    return (
      order.car_name.toLowerCase().includes(term) ||
      order.status.toLowerCase().includes(term) ||
      order.pickup_date.includes(term) ||
      order.dropoff_date.includes(term)
    );
  });

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="mb-6 text-2xl font-bold text-black">Order History</h1>

      {/* SEARCH INPUT */}
      <div className="relative mb-6 max-w-sm border-b border-transparent hover:border-gray">
        <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray" />
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
          filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              id={order.id}
              carName={order.car_name}
              carImage={order.car_image || '/images/placeholder-car.png'}
              pickupDate={order.pickup_date}
              dropoffDate={order.dropoff_date}
              total={formatPrice(order.total)}
              status={order.status}
            />
          ))
        ) : (
          <p className="text-sm text-gray">
            {bookings.length === 0
              ? "You haven't made any bookings yet."
              : 'No orders found.'}
          </p>
        )}
      </div>
    </div>
  );
}

OrderHistoryPage.layout = (page: React.ReactNode) => (
  <AppLayout children={page} />
);
