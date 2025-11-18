import { useState } from "react"
import { addDays, format, isBefore, isSameDay } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { SearchIcon, MapPin, Car } from "lucide-react"

export default function SearchBar() {
  const [location, setLocation] = useState<string>("")
  const [pickup, setPickup] = useState<Date | undefined>()
  const [dropoff, setDropoff] = useState<Date | undefined>()
  const [brand, setBrand] = useState<string>("")

  const handlePickupChange = (date: Date | undefined) => {
    setPickup(date)

    if (!date) return

    // Jika dropoff masih kosong → set minimal pickup+1 hari
    if (!dropoff) {
      setDropoff(addDays(date, 1))
      return
    }

    // Jika dropoff <= pickup → perbaiki otomatis
    if (isBefore(dropoff, addDays(date, 1)) || isSameDay(dropoff, date)) {
      setDropoff(addDays(date, 1))
    }
  }

  return (
    <div className="flex items-center gap-4 w-full bg-white-background rounded-xl shadow-xl p-4 px-6 font-medium font-manrope">
      {/* LOCATION */}
      <Select onValueChange={setLocation}>
        <SelectTrigger className="w-[140px] border-none shadow-none cursor-pointer">
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
          <Button variant="ghost" className="w-[140px] justify-start font-regular text-gray cursor-pointer">
            <CalendarIcon />
            {pickup ? format(pickup, "dd MMM yyyy") : "Pick-up"}
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
          <Button variant="ghost" className="w-[140px] justify-start font-regular text-gray cursor-pointer">
            <CalendarIcon />
            {dropoff ? format(dropoff, "dd MMM yyyy") : "Drop-off"}
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
      <Select onValueChange={setBrand}>
        <SelectTrigger className="w-[120px] border-none shadow-none text-gray cursor-pointer">
          <Car className="size-5 text-gray" />
          <SelectValue placeholder="Brand" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Toyota">Lamborghini</SelectItem>
          <SelectItem value="Honda">Ferrari</SelectItem>
          <SelectItem value="Suzuki">Ford</SelectItem>
        </SelectContent>
      </Select>

      {/* SEARCH BUTTON */}
      <Button className="px-6 py-6 text-base font-semibold cursor-pointer">
        <SearchIcon className="size-4" /> Search
      </Button>
    </div>
  )
}

function CalendarIcon() {
  return <svg width="16" height="16" fill="none" stroke="currentColor">
    <rect x="2" y="4" width="12" height="10" rx="2" />
    <path d="M8 2v2M4 2v2M12 2v2M2 8h12" />
  </svg>
}
