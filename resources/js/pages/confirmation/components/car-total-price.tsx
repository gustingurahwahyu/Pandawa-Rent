import { Button } from '@/components/ui/button';
import { differenceInDays, format } from 'date-fns';
import { useEffect, useMemo } from 'react';

interface MobilImage {
  id: number;
  url: string;
  is_primary: boolean;
}

interface Mobil {
  id: number;
  nama_mobil: string;
  merk: string;
  harga_sewa: number;
  images: MobilImage[];
}

interface Props {
  mobil: Mobil;
  onSubmit: () => void;
  isSubmitting: boolean;
  onTotalChange?: (total: number) => void;
}

// Format harga ke format K (ribuan)
const formatPrice = (price: number): string => {
  const priceInK = price / 1000;
  if (priceInK % 1 === 0) {
    return `${priceInK}K`;
  }
  return `${priceInK.toFixed(1)}K`;
};

export default function CarTotalPrice({
  mobil,
  onSubmit,
  isSubmitting,
  onTotalChange,
}: Props) {
  const rentalData = useMemo(() => {
    const storedPickup = sessionStorage.getItem('pickup_date');
    const storedDropoff = sessionStorage.getItem('dropoff_date');
    const storedLocation = sessionStorage.getItem('rental_location');

    const pickupDate = storedPickup ? new Date(storedPickup) : null;
    const dropoffDate = storedDropoff ? new Date(storedDropoff) : null;
    const location = storedLocation || 'Denpasar';

    let days = 2;
    if (pickupDate && dropoffDate) {
      const daysDiff = differenceInDays(dropoffDate, pickupDate);
      days = daysDiff > 0 ? daysDiff : 2;
    }

    const totalPrice = mobil.harga_sewa * days;

    return { pickupDate, dropoffDate, location, days, totalPrice };
  }, [mobil.harga_sewa]);

  useEffect(() => {
    if (onTotalChange) {
      onTotalChange(rentalData.totalPrice);
    }
  }, [rentalData.totalPrice, onTotalChange]);

  const formatDateRange = () => {
    if (rentalData.pickupDate && rentalData.dropoffDate) {
      return `${format(rentalData.pickupDate, 'dd')} - ${format(rentalData.dropoffDate, 'dd MMMM yyyy')}`;
    }
    return '18 - 20 November 2025';
  };

  return (
    <div className="rounded-xl bg-white-background px-12 py-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="">
          <p className="mb-1 text-sm text-gray">Car</p>
          <p className="text-2xl font-bold text-black">{mobil.nama_mobil}</p>
        </div>
        <div className="">
          <p className="mb-1 text-sm text-gray">Location</p>
          <p className="text-2xl font-bold text-black">{rentalData.location}</p>
        </div>
        <div className="">
          <p className="mb-1 text-sm text-gray">Date Pick-up & Drop-off</p>
          <p className="text-2xl font-bold text-black">{formatDateRange()}</p>
        </div>
        <div className="">
          <p className="mb-1 text-sm text-gray">Total Price</p>
          <p className="text-2xl font-bold text-black">
            Rp {formatPrice(rentalData.totalPrice)}
          </p>
        </div>

        <Button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="cursor-pointer px-6 py-6 text-base font-semibold"
        >
          {isSubmitting ? 'Processing...' : 'Confirm Booking'}
        </Button>
      </div>
    </div>
  );
}
