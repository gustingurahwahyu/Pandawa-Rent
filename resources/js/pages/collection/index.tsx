import AppLayout from '@/layouts/app-layout';
import { router } from '@inertiajs/react';
import React from 'react';
import '../../../css/splide.css';
import SearchBarMobile from './components/search-input-mobile';
import BrandSlider from './sections/brand-slider';
import CollectionSection from './sections/collection';
import Hero from './sections/hero';

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
  mobils: PaginatedData;
  brands: string[];
  filters: {
    search?: string;
    brand?: string;
  };
}

export default function Collection({ mobils, brands, filters }: Props) {
  const handleSearch = (query: string) => {
    const params = new URLSearchParams();
    if (query) params.append('search', query);
    if (filters.brand) params.append('brand', filters.brand);

    router.get(
      `/collection?${params.toString()}`,
      {},
      {
        preserveState: true,
        preserveScroll: false,
      },
    );
  };

  const handleBrandChange = (brand: string) => {
    const params = new URLSearchParams();
    if (brand && brand !== 'all') params.append('brand', brand);
    if (filters.search) params.append('search', filters.search);

    router.get(
      `/collection?${params.toString()}`,
      {},
      {
        preserveState: true,
        preserveScroll: false,
      },
    );
  };

  return (
    <>
      <Hero
        brands={brands}
        onSearch={handleSearch}
        onBrandChange={handleBrandChange}
      />
      <div className="px-6 lg:hidden">
        <SearchBarMobile
          brands={brands}
          onSearch={handleSearch}
          onBrandChange={handleBrandChange}
        />
      </div>
      <div className="slider-wrapper my-10">
        <BrandSlider />
      </div>
      <CollectionSection mobils={mobils.data} pagination={mobils} />
    </>
  );
}

Collection.layout = (page: React.ReactNode) => <AppLayout children={page} />;
