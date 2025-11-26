import AppLayout from '@/layouts/app-layout';
import React from 'react';
import '../../../css/splide.css';
import Hero from "./sections/hero";
import BrandSlider from './sections/brand-slider';
import CollectionSection from './sections/collection';
import SearchBarMobile from './components/search-input-mobile';

export default function Collection() {
    return (
      <>
        <Hero />
        <div className='lg:hidden px-6'>
          <SearchBarMobile />
        </div>
        <div className='slider-wrapper my-10'>
          <BrandSlider />
        </div>
        <CollectionSection />
      </>
    );
}

Collection.layout = (page: React.ReactNode) => <AppLayout children={page} />;