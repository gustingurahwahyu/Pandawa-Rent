import AppLayout from '@/layouts/app-layout';
import React from 'react';
import '../../../css/splide.css';
import Hero from './sections/hero';
import BrandSlider from './sections/brand-slider';
import HowItWorks from './sections/how-it-works';
import BestServices from './sections/best-services';
import CollectionSection from './sections/collection';


export default function Home() {
    return (
      <>
        <Hero />
        <div className='slider-wrapper bg-white my-10'>
          <BrandSlider />
        </div>
        <HowItWorks />
        <BestServices />
        <CollectionSection />
      </>
    );
}

Home.layout = (page: React.ReactNode) => <AppLayout children={page} />;