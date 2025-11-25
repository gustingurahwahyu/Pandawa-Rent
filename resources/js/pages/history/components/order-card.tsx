import React from "react"

type OrderCardProps = {
  carName: string
  carImage: string
  pickupDate: string
  dropoffDate: string
  total: string
  status: string
}

const statusColor: Record<"pending" | "confirmed" | "paid" | "success", string> = {
    pending: "bg-orange/20 text-orange",
    confirmed: "bg-blue-500/20 text-blue-600",
    paid: "bg-purple-500/20 text-purple-600",
    success: "bg-green-500/20 text-green-600",
  };

export default function OrderCard({
  carName,
  carImage,
  pickupDate,
  dropoffDate,
  total,
  status,
}: OrderCardProps) {
  const normalizedStatus = status.toLowerCase() as
  | "pending"
  | "confirmed"
  | "paid"
  | "success";


  return (
    <div className="bg-white-background py-8 px-12 rounded-xl shadow-sm flex flex-col sm:flex-row gap-5">
      {/* CAR IMAGE */}
      <div className="w-full sm:w-40 h-28 flex items-center justify-center rounded-lg">
        <img
          src={carImage}
          alt={carName}
          className="w-auto h-full object-contain"
        />
      </div>

      {/* DETAILS */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold text-black">{carName}</h2>

          <div className="mt-2 text-gray text-sm space-y-1">
            <p>
              <span className="font-medium text-black">Pick-up:</span>{" "}
              {pickupDate}
            </p>
            <p>
              <span className="font-medium text-black">Drop-off:</span>{" "}
              {dropoffDate}
            </p>
            <p>
              <span className="font-medium text-black">Total: </span>Rp{total}
            </p>
          </div>
        </div>

        {/* STATUS */}
        <div className="mt-3">
          <span
            className={`px-3 py-1 text-sm rounded-full font-medium ${statusColor[normalizedStatus]}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  )
}
