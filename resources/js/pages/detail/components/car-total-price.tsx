import { Button } from "@/components/ui/button"
import { router } from "@inertiajs/react"

export default function CarTotalPrice() {
    return (
      <div className="bg-white-background py-8 px-12 rounded-xl shadow-sm flex justify-between items-center">
        <div>
          <p className="text-gray text-sm mb-1">Total Price</p>
          <p className="text-black text-2xl font-bold">Rp 2.400K</p>
        </div>
  
        <Button
          className="px-6 py-6 text-base font-semibold cursor-pointer"
          onClick={() => router.get(`/confirmation`)}
          >
          Order
        </Button>
      </div>
    )
  }
  