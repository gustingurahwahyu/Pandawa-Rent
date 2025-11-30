import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

type OrderCardProps = {
  id: number;
  carName: string;
  carImage: string;
  pickupDate: string;
  dropoffDate: string;
  total: string;
  status: string;
};

const statusColor: Record<
  'pending' | 'confirmed' | 'paid' | 'success',
  string
> = {
  pending: 'bg-orange/20 text-orange',
  confirmed: 'bg-blue-500/20 text-blue-600',
  paid: 'bg-purple-500/20 text-purple-600',
  success: 'bg-green-500/20 text-green-600',
};

export default function OrderCard({
  id,
  carName,
  carImage,
  pickupDate,
  dropoffDate,
  total,
  status,
}: OrderCardProps) {
  const normalizedStatus = status.toLowerCase() as
    | 'pending'
    | 'confirmed'
    | 'paid'
    | 'success';

  const handleDownloadReceipt = () => {
    window.open(`/booking/${id}/receipt`, '_blank');
  };

  return (
    <div className="flex flex-col gap-5 rounded-xl bg-white-background px-12 py-8 shadow-sm sm:flex-row">
      {/* CAR IMAGE */}
      <div className="flex h-28 w-full items-center justify-center rounded-lg sm:w-40">
        <img
          src={carImage}
          alt={carName}
          className="h-full w-auto object-contain"
        />
      </div>

      {/* DETAILS */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold text-black">{carName}</h2>

          <div className="mt-2 space-y-1 text-sm text-gray">
            <p>
              <span className="font-medium text-black">Pick-up:</span>{' '}
              {pickupDate}
            </p>
            <p>
              <span className="font-medium text-black">Drop-off:</span>{' '}
              {dropoffDate}
            </p>
            <p>
              <span className="font-medium text-black">Total: </span>Rp{total}
            </p>
          </div>
        </div>

        {/* STATUS AND ACTION */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${statusColor[normalizedStatus]}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>

          {/* DOWNLOAD BUTTON - Only show for confirmed bookings */}
          {normalizedStatus === 'confirmed' && (
            <Button
              onClick={handleDownloadReceipt}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Download className="size-4" />
              Download Receipt
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
