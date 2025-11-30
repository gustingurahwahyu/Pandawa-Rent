import AppLayout from '@/layouts/app-layout';
import { useEffect, useState } from 'react';
import { CarCard } from './components/car-card';
import CarDescription from './components/car-description';
import CarDetailHeader from './components/car-detail-header';
import CarTotalPrice from './components/car-total-price';

interface MobilImage {
  id: number;
  url: string;
  is_primary: boolean;
}

interface Mobil {
  id: number;
  nama_mobil: string;
  merk: string;
  tahun: number;
  transmisi: string;
  penggerak: string;
  deskripsi: string;
  harga_sewa: number;
  stock: number;
  images: MobilImage[];
  primary_image: string | null;
}

interface Props {
  mobil: Mobil;
}

// Format harga ke format K (ribuan)
const formatPrice = (price: number): string => {
  const priceInK = price / 1000;
  if (priceInK % 1 === 0) {
    return `${priceInK}K`;
  }
  return `${priceInK.toFixed(1)}K`;
};

export default function CarDetailPage({ mobil }: Props) {
  const [days, setDays] = useState(2);

  useEffect(() => {
    // Calculate days from sessionStorage
    const storedPickup = sessionStorage.getItem('pickup_date');
    const storedDropoff = sessionStorage.getItem('dropoff_date');

    if (storedPickup && storedDropoff) {
      const pickup = new Date(storedPickup);
      const dropoff = new Date(storedDropoff);
      const daysDiff = Math.ceil(
        (dropoff.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24),
      );
      setDays(daysDiff > 0 ? daysDiff : 2);
    }
  }, []);

  return (
    <div className="mx-auto mt-8 max-w-7xl space-y-8">
      {/* HEADER */}
      <CarDetailHeader />

      {/* 2 COLUMN */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <CarDescription description={mobil.deskripsi} />
        <CarCard
          name={mobil.nama_mobil}
          brand={mobil.merk}
          price={formatPrice(mobil.harga_sewa)}
          images={mobil.images}
          transmission={mobil.transmisi}
          drive={mobil.penggerak}
          speed={mobil.tahun.toString()}
        />
      </div>

      {/* TOTAL PRICE */}
      <CarTotalPrice
        harga_sewa={mobil.harga_sewa}
        days={days}
        mobil_id={mobil.id}
      />
    </div>
  );
}

CarDetailPage.layout = (page: React.ReactNode) => <AppLayout children={page} />;
