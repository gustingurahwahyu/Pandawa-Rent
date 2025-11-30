import AppLayout from '@/layouts/app-layout';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import BankAccordion from './components/bank-accordion';
import CarDetailHeader from './components/car-detail-header';
import CarTotalPrice from './components/car-total-price';
import FilesUpload from './components/files-upload';

interface MobilImage {
  id: number;
  url: string;
  is_primary: boolean;
}

interface Mobil {
  id: number;
  nama_mobil: string;
  merk: string;
  tahun: number;
  transmisi: string;
  penggerak: string;
  harga_sewa: number;
  images: MobilImage[];
  primary_image: string | null;
}

interface Props {
  mobil: Mobil;
}

export default function ConfirmationPage({ mobil }: Props) {
  const [simFile, setSimFile] = useState<File | null>(null);
  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const handleSubmit = () => {
    if (!simFile || !paymentFile) {
      alert('Please upload both SIM and Payment Receipt');
      return;
    }

    const pickupDate = sessionStorage.getItem('pickup_date');
    const dropoffDate = sessionStorage.getItem('dropoff_date');

    if (!pickupDate || !dropoffDate || !totalPrice) {
      alert('Missing booking information. Please go back to detail page.');
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('mobil_id', mobil.id.toString());
    formData.append('tanggal_ambil', pickupDate);
    formData.append('tanggal_kembali', dropoffDate);
    formData.append('total_biaya', totalPrice.toString());
    formData.append('bukti_sim', simFile);
    formData.append('bukti_pembayaran', paymentFile);

    router.post('/booking/store', formData, {
      onSuccess: () => {
        sessionStorage.removeItem('pickup_date');
        sessionStorage.removeItem('dropoff_date');
        sessionStorage.removeItem('rental_location');
      },
      onError: (errors) => {
        console.error('Booking error:', errors);
        alert('Failed to create booking. Please try again.');
      },
      onFinish: () => {
        setIsSubmitting(false);
      },
    });
  };

  return (
    <div className="mx-auto mt-8 max-w-7xl space-y-8">
      {/* HEADER */}
      <CarDetailHeader />

      {/* 2 COLUMN */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <BankAccordion totalPrice={totalPrice} />
        <div>
          <FilesUpload label="SIM / Driving License" onUpload={setSimFile} />
          <FilesUpload label="Payment Receipt" onUpload={setPaymentFile} />
        </div>
      </div>

      {/* TOTAL PRICE */}
      <CarTotalPrice
        mobil={mobil}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        onTotalChange={setTotalPrice}
      />
    </div>
  );
}

ConfirmationPage.layout = (page: React.ReactNode) => (
  <AppLayout children={page} />
);
