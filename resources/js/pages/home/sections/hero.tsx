import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import SearchBar from '../components/search-input';

interface Props {
  brands: string[];
}

export default function Hero({ brands }: Props) {
  return (
    <div className="mt-50 mb-30 flex justify-center px-6 py-2 lg:mt-0 lg:mb-20 lg:justify-start lg:px-38 lg:py-6">
      <div className="relative col-span-2 flex flex-col-reverse text-black lg:flex-row">
        <div className="flex flex-col items-center justify-center gap-2 lg:items-start lg:gap-5 lg:pb-36">
          <h1 className="text-center font-poppins text-2xl font-black lg:text-start lg:text-6xl lg:font-extrabold">
            Your Luxurious Journey Starts Here
          </h1>
          <div className="lg:-1 h-0.75 w-8 rounded-xl bg-orange lg:w-16"></div>
          <p className="px-10 text-center font-manrope text-xs font-semibold lg:px-0 lg:pe-32 lg:text-start lg:text-base">
            Comfort, safety, and luxury come together in every one of your
            journeys.
          </p>
        </div>
        <div className="relative flex justify-center">
          {/* Background Orange */}
          <div className="mx-12 rounded-[40px] bg-orange lg:h-[580px] lg:w-[476px]"></div>

          {/* Car Image */}
          <img
            src="/images/car-home-hero.png"
            alt="CAR HERO"
            className="absolute top-[-100px] left-1/2 z-2 -translate-x-1/2 -translate-y-1/2 px-6 lg:top-1/2 lg:px-0"
          />
        </div>
        <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 lg:block">
          <SearchBar brands={brands} />
        </div>

        {/* Button Explore Tablet & Mobile */}
        <div className="absolute top-25 left-1/2 z-10 mt-10 block -translate-x-1/2 lg:hidden">
          <Link href="/collection">
            <Button className="cursor-pointer px-4 py-4 text-sm font-medium transition focus:bg-white focus:text-orange">
              Explore
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
