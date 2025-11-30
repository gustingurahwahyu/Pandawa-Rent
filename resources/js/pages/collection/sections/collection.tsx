import { Pagination } from '@/components/ui/pagination';
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

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginatedData {
  data: Mobil[];
  links: PaginationLink[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface Props {
  mobils: Mobil[];
  pagination: PaginatedData;
}

// Format harga ke format K (ribuan)
const formatPrice = (price: number): string => {
  // Konversi ke ribuan (K)
  const priceInK = price / 1000;

  // Jika angka bulat, tampilkan tanpa desimal
  if (priceInK % 1 === 0) {
    return `${priceInK}K`;
  }

  // Jika ada desimal, tampilkan 1 digit desimal
  return `${priceInK.toFixed(1)}K`;
};

// Collection Section
export default function CollectionSection({ mobils, pagination }: Props) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-0 pb-10 md:px-10 md:py-16">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mobils.map((mobil) => (
          <CarCard
            key={mobil.id}
            id={mobil.id}
            name={mobil.nama_mobil}
            brand={mobil.merk}
            price={formatPrice(mobil.harga_sewa)}
            image={mobil.primary_image || '/images/cars/default-car.png'}
            year={mobil.tahun.toString()}
            transmission={mobil.transmisi}
            drive={mobil.penggerak}
            stock={mobil.stock}
          />
        ))}
      </div>

      {/* Pagination */}
      {pagination.last_page > 1 && (
        <Pagination
          links={pagination.links}
          currentPage={pagination.current_page}
          lastPage={pagination.last_page}
        />
      )}
    </section>
  );
}
