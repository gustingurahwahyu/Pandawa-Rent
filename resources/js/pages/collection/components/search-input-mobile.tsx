import { useState } from "react"
import { addDays, format, isBefore, isSameDay } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { SearchIcon, MapPin, Car } from "lucide-react"

export default function SearchBarMobile() {
  const [location, setLocation] = useState("")
  const [pickup, setPickup] = useState<Date | undefined>()
  const [dropoff, setDropoff] = useState<Date | undefined>()
  const [brand, setBrand] = useState("")

  const handlePickupChange = (date: Date | undefined) => {
    setPickup(date)

    if (!date) return

    if (!dropoff) {
      setDropoff(addDays(date, 1))
      return
    }

    if (isBefore(dropoff, addDays(date, 1)) || isSameDay(dropoff, date)) {
      setDropoff(addDays(date, 1))
    }
  }

  return (
    <div className="
      w-full bg-white-background rounded-xl shadow-sm p-7 px-5
      flex flex-col gap-3 font-manrope font-medium
      md:flex-row md:items-center md:gap-4 md:px-6
    ">
      {/* LOCATION */}
      <Select onValueChange={setLocation}>
        <SelectTrigger className="
          w-full border rounded-lg shadow-none cursor-pointer
          md:w-[140px] md:border-none
        ">
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
            className="
              w-full flex items-center justify-start gap-6  font-regular text-gray cursor-pointer border rounded-lg
              md:w-[140px] md:border-none
            "
          >
            <CalendarIcon />
            {pickup ? format(pickup, "dd MMM yyyy") : "Pick-up"}
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
            className="
              w-full flex items-center justify-start gap-6  font-regular text-gray cursor-pointer border rounded-lg
              md:w-[140px] md:border-none
            "
          >
            <CalendarIcon />
            {dropoff ? format(dropoff, "dd MMM yyyy") : "Drop-off"}
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
      <Select onValueChange={setBrand}>
        <SelectTrigger className="
          w-full border rounded-lg text-gray cursor-pointer
          md:w-[120px] md:border-none
        ">
          <div className="flex items-center gap-5.5">
          <Car className="size-4.5 text-gray" />
          <SelectValue placeholder="Brand" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Toyota">Lamborghini</SelectItem>
          <SelectItem value="Honda">Ferrari</SelectItem>
          <SelectItem value="Suzuki">Ford</SelectItem>
        </SelectContent>
      </Select>

      {/* SEARCH BUTTON */}
      <Button
        className="
          w-full py-5 text-sm font-medium cursor-pointer mt-1
          md:w-auto md:mt-0 md:px-6 md:py-6 focus:bg-white focus:text-orange transition
        "
      >
        <SearchIcon className="size-4" /> Search
      </Button>
    </div>
  )
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor">
      <rect x="2" y="4" width="12" height="10" rx="2" />
      <path d="M8 2v2M4 2v2M12 2v2M2 8h12" />
    </svg>
  )
}
