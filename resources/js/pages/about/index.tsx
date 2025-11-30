import AppLayout from '@/layouts/app-layout';
import '../../../css/splide.css';
import WelcomeSection from './sections/welcome';
import OurMissionSection from './sections/our-mission';
import BrandSlider from './sections/brand-slider';
import WhatWeOffer from './sections/what-we-offer';


export default function About() {
    return (
      <>
        <WelcomeSection />
        <OurMissionSection />
        <WhatWeOffer />
        <div className='slider-wrapper bg-white my-10'>
          <BrandSlider />
        </div>
      </>
    );
}

About.layout = (page: React.ReactNode) => <AppLayout children={page} />;