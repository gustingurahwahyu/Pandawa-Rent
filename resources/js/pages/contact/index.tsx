import AppLayout from '@/layouts/app-layout';
import '../../../css/splide.css';
import Hero from './sections/hero';
import ContactUs from './sections/contact-us';
import BrandSlider from './sections/brand-slider';

export default function Contact() {
    return (
      <>
        <Hero />
        <ContactUs />
        <div className='slider-wrapper my-10'>
          <BrandSlider />
        </div>
      </>
    );
}

Contact.layout = (page: React.ReactNode) => <AppLayout children={page} />;