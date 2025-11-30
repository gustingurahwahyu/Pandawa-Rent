import SearchBar from '../components/search-input';

interface Props {
  brands: string[];
  onSearch: (query: string) => void;
  onBrandChange: (brand: string) => void;
}

export default function Hero({ brands, onSearch, onBrandChange }: Props) {
  return (
    <div className="my-8 hidden px-38 py-6 pb-92 md:flex">
      <div className="relative col-span-2 mx-auto flex flex-col text-black">
        <div className="flex flex-col items-center justify-center gap-5 px-64">
          <h1 className="text-center font-poppins text-6xl font-extrabold">
            Your Luxurious Journey Starts Here
          </h1>
          <div className="h-1 w-16 rounded-xl bg-orange"></div>
          <p className="px-36 text-center font-manrope font-semibold">
            Comfort, safety, and luxury come together in every one of your
            journeys.
          </p>
        </div>
        <div className="relative flex justify-center">
          {/* Car Image */}
          <img
            src="/images/car-collection-hero.png"
            alt="CAR HERO"
            className="absolute top-[-140px] left-1/2 z-2 max-h-124 -translate-x-1/2"
          />
        </div>
        <div className="absolute bottom-[-320px] left-1/2 z-10 -translate-x-1/2">
          <SearchBar
            brands={brands}
            onSearch={onSearch}
            onBrandChange={onBrandChange}
          />
        </div>
      </div>
    </div>
  );
}
