import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { CarCard } from '../components/car-card';

interface Mobil {
  id: number;
  nama_mobil: string;
  merk: string;
  tahun: number;
  transmisi: string;
  penggerak: string;
  harga_sewa: number;
  stock: number;
  primary_image: string | null;
}

interface Props {
  mobils: Mobil[];
}

// Format harga ke format K (ribuan)
const formatPrice = (price: number): string => {
  const priceInK = price / 1000;
  if (priceInK % 1 === 0) {
    return `${priceInK}K`;
  }
  return `${priceInK.toFixed(1)}K`;
};

// Collection Section
export default function CollectionSection({ mobils }: Props) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-16">
      <div className="mb-8 text-center md:mb-16">
        <span className="font-manrope text-sm font-semibold tracking-wide text-gray lg:text-xl">
          COLLECTION
        </span>
        <h2 className="mt-2 font-poppins text-2xl leading-tight font-extrabold text-black lg:text-5xl">
          More Than 100 Premium <br /> Car Options From Us
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mobils.map((mobil) => (
          <CarCard
            key={mobil.id}
            id={mobil.id}
            name={mobil.nama_mobil}
            brand={mobil.merk}
            price={formatPrice(mobil.harga_sewa)}
            image={mobil.primary_image || '/images/cars/default-car.png'}
            transmission={mobil.transmisi}
            drive={mobil.penggerak}
            year={mobil.tahun.toString()}
            stock={mobil.stock}
          />
        ))}
      </div>

      <div className="mt-5 flex justify-center md:mt-10">
        <Link href="/collection">
          <Button className="cursor-pointer px-4 py-4 text-sm font-medium transition focus:bg-white focus:text-orange md:px-6 md:py-6 md:text-base md:font-semibold">
            See More
          </Button>
        </Link>
      </div>
    </section>
  );
}
