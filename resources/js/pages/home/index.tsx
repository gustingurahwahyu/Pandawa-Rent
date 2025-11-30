import AppLayout from '@/layouts/app-layout';
import React from 'react';
import '../../../css/splide.css';
import BestServices from './sections/best-services';
import BrandSlider from './sections/brand-slider';
import CollectionSection from './sections/collection';
import Hero from './sections/hero';
import HowItWorks from './sections/how-it-works';

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
  harga_sewa: number;
  stock: number;
  primary_image: string | null;
}

interface Props {
  mobils: Mobil[];
  brands: string[];
}

export default function Home({ mobils, brands }: Props) {
  return (
    <>
      <Hero brands={brands} />
      <div className="slider-wrapper my-10 bg-white">
        <BrandSlider />
      </div>
      <HowItWorks />
      <BestServices />
      <CollectionSection mobils={mobils} />
    </>
  );
}

Home.layout = (page: React.ReactNode) => <AppLayout children={page} />;
