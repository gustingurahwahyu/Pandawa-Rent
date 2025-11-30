import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '../../../../css/splide.css';

export default function BrandSlider() {
  return (
    <Splide
      options={{
        type: "loop",
        perPage: 5,
        gap: "0rem",
        pagination: false,
        arrows: false,
        drag: false,
        autoScroll: {
          speed: 0.5,
          pauseOnHover: false,
          pauseOnFocus: false, 
        },
      }}
      extensions={{ AutoScroll }}
    >
      <SplideSlide className="flex justify-center px-8 max-w-56 max-h-20"><img src="/images/brands/lamborghini.png" className="object-contain" /></SplideSlide>
      <SplideSlide className="flex justify-center px-8 max-w-56 max-h-20"><img src="/images/brands/ferrari.png" className="object-contain" /></SplideSlide>
      <SplideSlide className="flex justify-center px-8 max-w-56 max-h-20"><img src="/images/brands/lexus.png" className="object-contain" /></SplideSlide>
      <SplideSlide className="flex justify-center px-8 max-w-56 max-h-20"><img src="/images/brands/ford.png" className="object-contain" /></SplideSlide>
      <SplideSlide className="flex justify-center px-8 max-w-56 max-h-20"><img src="/images/brands/mercedes-benz.png" className="object-contain" /></SplideSlide>
      <SplideSlide className="flex justify-center px-8 max-w-56 max-h-20"><img src="/images/brands/chevrolet.png" className="object-contain" /></SplideSlide>
      <SplideSlide className="flex justify-center px-8 max-w-56 max-h-20"><img src="/images/brands/nissan.png" className="object-contain" /></SplideSlide>
      <SplideSlide className="flex justify-center px-8 max-w-56 max-h-20"><img src="/images/brands/acura.png" className="object-contain" /></SplideSlide>
    </Splide>
  );
}
