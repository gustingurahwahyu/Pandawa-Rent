import { Button } from "@/components/ui/button";
import { CarCard } from "../components/car-card";
import { Link } from "@inertiajs/react";

// Collection Section
export default function CollectionSection() {
  const cars = [
    {
      name: "Lamborghini Huracan",
      brand: "lamborghini",
      price: "1.200K",
      image: "/images/cars/lamborghini-huracan.png",
      transmission: "Automatic",
      drive: "AWD",
      year: "2018",
    },
    {
      name: "Ferrari Enzo",
      brand: "ferrari",
      price: "1.200K",
      image: "/images/cars/ferrari-enzo.png",
      transmission: "Automatic",
      drive: "AWD",
      year: "2015",
    },
    {
      name: "Nissan GTR R35",
      brand: "nissan",
      price: "1.000K",
      image: "/images/cars/nissan-gtr-r35.png",
      transmission: "Manual",
      drive: "AWD",
      year: "2017",
    },
    {
      name: "Acura NSX 2018",
      brand: "acura",
      price: "1.200K",
      image: "/images/cars/acurra-nsx.png",
      transmission: "Automatic",
      drive: "AWD",
      year: "2012",
    },
    {
      name: "Ford Mustang",
      brand: "ford",
      price: "1.200K",
      image: "/images/cars/ford-mustang.png",
      transmission: "Automatic",
      drive: "AWD",
      year: "2014",
    },
    {
      name: "Chevrolet Corvette",
      brand: "chevrolet",
      price: "1.200K",
      image: "/images/cars/chevrolet-corvette.png",
      transmission: "Automatic",
      drive: "AWD",
      year: "2020",
    },
  ];

  return (
    <section className="py-16 max-w-7xl mx-auto px-10">
      <div className="text-center mb-16">
        <span className="tracking-wide font-manrope text-xl font-semibold text-gray">COLLECTION</span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 leading-tight">
          More Than 100 Premium <br /> Car Options From Us
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car, index) => (
          <CarCard key={index} {...car} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link href="/collection">
          <Button className="px-6 py-6 text-base font-semibold cursor-pointer">See More</Button>
        </Link>        
      </div>
    </section>
  );
}
