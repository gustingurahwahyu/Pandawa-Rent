import AppLayout from '@/layouts/app-layout';
import CarDetailHeader from "./components/car-detail-header";
import CarTotalPrice from "./components/car-total-price"
import { CarCard } from './components/car-card';
import FilesUpload from './components/files-upload';
import BankAccordion from './components/bank-accordion';

export default function CarDetailPage() {
    const car = {
      name: "Lamborghini Huracan",
      brand: "lamborghini",
      price: "1.200K",
      image: "/images/cars/lamborghini-huracan.png",
      transmission: "Automatic",
      drive: "AWD",
      speed: "2019",
    }

  return (
    <div className="space-y-8 mx-auto max-w-7xl mt-8">
      {/* HEADER */}
      <CarDetailHeader />

      {/* BANK ACCORDION */}
      

      {/* 2 COLUMN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BankAccordion />
        <div>
          <FilesUpload label="SIM / Driving License" />
          <FilesUpload label="Payment Receipt" />
        </div>
      </div>

      {/* TOTAL PRICE */}
      <CarTotalPrice />
    </div>
  )
}

CarDetailPage.layout = (page: React.ReactNode) => <AppLayout children={page} />;
