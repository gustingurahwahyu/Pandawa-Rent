import { differenceInDays, format } from 'date-fns';
import { useState } from 'react';

export default function CarDetailHeader() {
  // Initialize state from sessionStorage
  const [location] = useState(() => {
    return sessionStorage.getItem('rental_location') || 'Denpasar';
  });

  const [pickupDate] = useState<Date | null>(() => {
    const stored = sessionStorage.getItem('pickup_date');
    return stored ? new Date(stored) : new Date();
  });

  const [dropoffDate] = useState<Date | null>(() => {
    const stored = sessionStorage.getItem('dropoff_date');
    if (stored) {
      return new Date(stored);
    }
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });

  const [days] = useState(() => {
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

  const formatDateRange = () => {
    if (pickupDate && dropoffDate) {
      return `${format(pickupDate, 'dd')}–${format(dropoffDate, 'dd MMMM yyyy')}`;
    }
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return `${format(today, 'dd')}–${format(tomorrow, 'dd MMMM yyyy')}`;
  };

  return (
    <div className="rounded-xl bg-white-background px-12 py-8 shadow-sm">
      <h2 className="text-xl font-bold text-black">Daily Rental</h2>

      <div className="mt-2 border-t border-gray pt-2 text-sm text-gray">
        {location} ~ {formatDateRange()} ~ 09.00 ~ {days} Days
      </div>
    </div>
  );
}
