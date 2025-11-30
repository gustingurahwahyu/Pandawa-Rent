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
  onSearch: (query: string) => void;
  onBrandChange: (brand: string) => void;
}

export default function SearchBar({ onSearch, onBrandChange }: Props) {
  // Get initial values from URL
  const getInitialValues = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      search: params.get('search') || '',
      brand: params.get('brand') || '',
    };
  };

  const initialValues = getInitialValues();

  const [location, setLocation] = useState<string>('Denpasar');
  const [pickup, setPickup] = useState<Date | undefined>();
  const [dropoff, setDropoff] = useState<Date | undefined>();
  const [brand, setBrand] = useState<string>(initialValues.brand);
  const [searchQuery, setSearchQuery] = useState<string>(initialValues.search);

  const handlePickupChange = (date: Date | undefined) => {
    setPickup(date);

    if (!date) return;

    // Jika dropoff masih kosong → set minimal pickup+1 hari
    if (!dropoff) {
      setDropoff(addDays(date, 1));
      return;
    }

    // Jika dropoff <= pickup → perbaiki otomatis
    if (isBefore(dropoff, addDays(date, 1)) || isSameDay(dropoff, date)) {
      setDropoff(addDays(date, 1));
    }
  };

  return (
    <div className="flex w-full items-center gap-4 rounded-xl bg-white-background p-4 px-6 font-manrope font-medium shadow-xl">
      {/* LOCATION */}
      <Select onValueChange={setLocation}>
        <SelectTrigger className="w-[140px] cursor-pointer border-none shadow-none">
          <MapPin className="size-4 text-gray" />
          <SelectValue placeholder="Location" />
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
            className="font-regular w-[140px] cursor-pointer justify-start text-gray"
          >
            <CalendarIcon />
            {pickup ? format(pickup, 'dd MMM yyyy') : 'Pick-up'}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            selected={pickup}
            onSelect={handlePickupChange}
            disabled={{ before: new Date() }}
          />
        </PopoverContent>
      </Popover>

      {/* DROP OFF DATE */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="font-regular w-[140px] cursor-pointer justify-start text-gray"
          >
            <CalendarIcon />
            {dropoff ? format(dropoff, 'dd MMM yyyy') : 'Drop-off'}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
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
        onValueChange={(value) => {
          setBrand(value);
          onBrandChange(value);
        }}
      >
        <SelectTrigger className="w-[120px] cursor-pointer border-none text-gray shadow-none">
          <Car className="size-5 text-gray" />
          <SelectValue placeholder="Brand" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Brands</SelectItem>
          <SelectItem value="Lamborghini">Lamborghini</SelectItem>
          <SelectItem value="Ferrari">Ferrari</SelectItem>
          <SelectItem value="Ford">Ford</SelectItem>
          <SelectItem value="Nissan">Nissan</SelectItem>
          <SelectItem value="Chevrolet">Chevrolet</SelectItem>
          <SelectItem value="Acura">Acura</SelectItem>
        </SelectContent>
      </Select>

      {/* SEARCH INPUT */}
      <Input
        type="text"
        placeholder="Search car..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-[160px] border-none shadow-none"
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
        className="cursor-pointer px-6 py-6 text-base font-semibold"
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
