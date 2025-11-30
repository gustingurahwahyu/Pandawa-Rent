import { Button } from "@/components/ui/button"

export default function CarTotalPrice() {
    return (
      <div className="bg-white-background py-8 px-12 rounded-xl shadow-sm">

        <div className="flex justify-between items-center">
          {/* Price Total */}
        <div className="">
          <p className="text-gray text-sm mb-1">Car</p>
          <p className="text-black text-2xl font-bold">Lamborghini Huracan</p>
        </div>
        <div className="">
          <p className="text-gray text-sm mb-1">Location</p>
          <p className="text-black text-2xl font-bold">Denpasar</p>
        </div>
        <div className="">
          <p className="text-gray text-sm mb-1">Date Pick-up & Drop-off</p>
          <p className="text-black text-2xl font-bold">18 - 20 November 2025</p>
        </div>
        <div className="">
          <p className="text-gray text-sm mb-1">Total Price</p>
          <p className="text-black text-2xl font-bold">Rp 2.400K</p>
        </div>
  
        <Button className="px-6 py-6 text-base font-semibold cursor-pointer">
          Order
        </Button>
        </div>
      </div>
    )
  }
  