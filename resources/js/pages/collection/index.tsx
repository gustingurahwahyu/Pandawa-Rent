import AppLayout from '@/layouts/app-layout';
import React, { useState } from 'react';
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
}

export default function Collection({ mobils }: Props) {
  // Read URL parameters on mount
  const getInitialValues = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      search: params.get('search') || '',
      brand: params.get('brand') || '',
    };
  };

  const initialValues = getInitialValues();
  const [searchQuery, setSearchQuery] = useState(initialValues.search);
  const [selectedBrand, setSelectedBrand] = useState<string>(
    initialValues.brand,
  );

  // Filter mobils berdasarkan search dan brand
  const filteredMobils = mobils.data.filter((mobil) => {
    const matchesSearch =
      searchQuery === '' ||
      mobil.nama_mobil.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mobil.merk.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBrand =
      selectedBrand === '' ||
      selectedBrand === 'all' ||
      mobil.merk.toLowerCase() === selectedBrand.toLowerCase();

    return matchesSearch && matchesBrand;
  });

  return (
    <>
      <Hero onSearch={setSearchQuery} onBrandChange={setSelectedBrand} />
      <div className="px-6 lg:hidden">
        <SearchBarMobile
          onSearch={setSearchQuery}
          onBrandChange={setSelectedBrand}
        />
      </div>
      <div className="slider-wrapper my-10">
        <BrandSlider />
      </div>
      <CollectionSection mobils={filteredMobils} pagination={mobils} />
    </>
  );
}

Collection.layout = (page: React.ReactNode) => <AppLayout children={page} />;
