import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { addDays, format, isBefore, isSameDay } from 'date-fns';
import { Car, MapPin, SearchIcon } from 'lucide-react';
import { useState } from 'react';

interface Props {
  brands?: string[];
  onSearch: (query: string) => void;
  onBrandChange: (brand: string) => void;
}

export default function SearchBarMobile({
  brands = [],
  onSearch,
  onBrandChange,
}: Props) {
  // Get initial values from URL
  const getInitialValues = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      search: params.get('search') || '',
      brand: params.get('brand') || '',
    };
  };

  const initialValues = getInitialValues();

  const [location, setLocation] = useState('Denpasar');
  const [pickup, setPickup] = useState<Date | undefined>();
  const [dropoff, setDropoff] = useState<Date | undefined>();
  const [brand, setBrand] = useState(initialValues.brand);
  const [searchQuery, setSearchQuery] = useState<string>(initialValues.search);

  const handlePickupChange = (date: Date | undefined) => {
    setPickup(date);

    if (!date) return;

    if (!dropoff) {
      setDropoff(addDays(date, 1));
      return;
    }

    if (isBefore(dropoff, addDays(date, 1)) || isSameDay(dropoff, date)) {
      setDropoff(addDays(date, 1));
    }
  };

  return (
    <div className="flex w-full flex-col gap-3 rounded-xl bg-white-background p-7 px-5 font-manrope font-medium shadow-sm md:flex-row md:items-center md:gap-4 md:px-6">
      {/* LOCATION */}
      <Select onValueChange={setLocation}>
        <SelectTrigger className="w-full cursor-pointer rounded-lg border shadow-none md:w-[140px] md:border-none">
          <div className="flex items-center gap-6">
            <MapPin className="size-4 text-gray" />
            <SelectValue placeholder="Location" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Denpasar">Denpasar</SelectItem>
          <SelectItem value="Canggu">Canggu</SelectItem>
          <SelectItem value="Ubud">Ubud</SelectItem>
        </SelectContent>
      </Select>

      {/* PICK UP DATE */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="font-regular flex w-full cursor-pointer items-center justify-start gap-6 rounded-lg border text-gray md:w-[140px] md:border-none"
          >
            <CalendarIcon />
            {pickup ? format(pickup, 'dd MMM yyyy') : 'Pick-up'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Calendar
            mode="single"
            selected={pickup}
            onSelect={handlePickupChange}
            disabled={{ before: new Date() }}
          />
        </PopoverContent>
      </Popover>

      {/* DROP-OFF DATE */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="font-regular flex w-full cursor-pointer items-center justify-start gap-6 rounded-lg border text-gray md:w-[140px] md:border-none"
          >
            <CalendarIcon />
            {dropoff ? format(dropoff, 'dd MMM yyyy') : 'Drop-off'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Calendar
            mode="single"
            selected={dropoff}
            onSelect={setDropoff}
            disabled={{
              before: pickup ? addDays(pickup, 1) : new Date(),
            }}
          />
        </PopoverContent>
      </Popover>

      {/* BRAND */}
      <Select
        value={brand}
        onValueChange={(value) => {
          setBrand(value);
          onBrandChange(value);
        }}
      >
        <SelectTrigger className="w-full cursor-pointer rounded-lg border text-gray md:w-[120px] md:border-none">
          <div className="flex items-center gap-5.5">
            <Car className="size-4.5 text-gray" />
            <SelectValue placeholder="Brand" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Brands</SelectItem>
          {brands.map((brandName) => (
            <SelectItem key={brandName} value={brandName}>
              {brandName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* SEARCH INPUT */}
      <Input
        type="text"
        placeholder="Search car..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded-lg border"
      />

      {/* SEARCH BUTTON */}
      <Button
        onClick={() => {
          onSearch(searchQuery);
          // Save dates and location to sessionStorage for use in detail page
          sessionStorage.setItem('rental_location', location);
          if (pickup) {
            sessionStorage.setItem('pickup_date', pickup.toISOString());
          }
          if (dropoff) {
            sessionStorage.setItem('dropoff_date', dropoff.toISOString());
          }
        }}
        className="mt-1 w-full cursor-pointer py-5 text-sm font-medium transition focus:bg-white focus:text-orange md:mt-0 md:w-auto md:px-6 md:py-6"
      >
        <SearchIcon className="size-4" /> Search
      </Button>
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor">
      <rect x="2" y="4" width="12" height="10" rx="2" />
      <path d="M8 2v2M4 2v2M12 2v2M2 8h12" />
    </svg>
  );
}
