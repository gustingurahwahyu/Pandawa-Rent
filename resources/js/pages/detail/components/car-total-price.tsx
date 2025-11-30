import { Button } from '@/components/ui/button';
import { router, usePage } from '@inertiajs/react';
import { differenceInDays } from 'date-fns';
import { useEffect, useState } from 'react';

interface Props {
  harga_sewa: number;
  mobil_id: number;
}

interface PageProps extends Record<string, unknown> {
  auth: {
    user: {
      id: number;
      name: string;
      email: string;
    } | null;
  };
}

// Format harga ke format K (ribuan)
const formatPrice = (price: number): string => {
  const priceInK = price / 1000;
  if (priceInK % 1 === 0) {
    return `${priceInK}K`;
  }
  return `${priceInK.toFixed(1)}K`;
};

export default function CarTotalPrice({ harga_sewa, mobil_id }: Props) {
  const [days, setDays] = useState(() => {
    const storedPickup = sessionStorage.getItem('pickup_date');
    const storedDropoff = sessionStorage.getItem('dropoff_date');

    if (storedPickup && storedDropoff) {
      const pickup = new Date(storedPickup);
      const dropoff = new Date(storedDropoff);
      const daysDiff = differenceInDays(dropoff, pickup);
      return daysDiff > 0 ? daysDiff : 1;
    }
    return 1;
  });

  useEffect(() => {
    const updateDays = () => {
      const storedPickup = sessionStorage.getItem('pickup_date');
      const storedDropoff = sessionStorage.getItem('dropoff_date');

      if (storedPickup && storedDropoff) {
        const pickup = new Date(storedPickup);
        const dropoff = new Date(storedDropoff);
        const daysDiff = differenceInDays(dropoff, pickup);
        setDays(daysDiff > 0 ? daysDiff : 1);
      }
    };

    // Listen to storage changes
    window.addEventListener('storage', updateDays);

    // Check periodically for same-window changes
    const interval = setInterval(updateDays, 500);

    return () => {
      window.removeEventListener('storage', updateDays);
      clearInterval(interval);
    };
  }, []);

  const totalPrice = harga_sewa * days;
  const { auth } = usePage<PageProps>().props;

  const handleOrder = () => {
    if (!auth.user) {
      // User not logged in - redirect to login
      router.get('/login');
    } else {
      // User logged in - proceed to confirmation with car data
      router.get(`/confirmation/${mobil_id}`);
    }
  };

  return (
    <div className="flex items-center justify-between rounded-xl bg-white-background px-12 py-8 shadow-sm">
      <div>
        <p className="mb-1 text-sm text-gray">Total Price ({days} days)</p>
        <p className="text-2xl font-bold text-black">
          Rp {formatPrice(totalPrice)}
        </p>
      </div>

      <Button
        className="cursor-pointer px-6 py-6 text-base font-semibold"
        onClick={handleOrder}
      >
        {auth.user ? 'Order' : 'Login to Order'}
      </Button>
    </div>
  );
}

// Add prop to accept mobil_id
export interface CarTotalPriceProps {
  harga_sewa: number;
  mobil_id: number;
}
