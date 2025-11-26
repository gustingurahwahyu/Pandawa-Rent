import { BadgeCheck, Car, Clock } from "lucide-react";

export default function BestServices() {
  const services = [
    {
      icon: <BadgeCheck size={32} strokeWidth={2.2} />,
      title: "Best Quality and Price",
      desc: "We offer the best guaranteed quality and price for every premium car in our collection."
    },
    {
      icon: <Car size={32} strokeWidth={2.2} />,
      title: "100+ Car Options",
      desc: "We are proud to offer the most complete collection of premium cars to meet your various needs."
    },
    {
      icon: <Clock size={32} strokeWidth={2.2} />,
      title: "24-Hour Service",
      desc: "We provide 24-hour customer service, ready to assist you whenever you need it."
    }
  ];

  return (
    <section className="py-10 lg:py-20">
      {/* IMAGE SIDE */}
      <div className="hidden lg:block absolute left-[-120px]">
        <img
          src="/images/car-best-services.png"
          alt="red car"
          className="max-w-[200px] lg:max-w-[725px] drop-shadow-xl"
        />
      </div>
      <div className="grid max-w-2xl lg:max-w-6xl mx-auto px-6 items-center justify-center lg:justify-end lg:ps-[510px]">

        {/* TEXT SIDE */}
        <div>
          <p className="tracking-wide font-manrope text-sm lg:text-xl font-semibold text-gray uppercase">
            Best Services
          </p>

          <h2 className="text-2xl lg:text-5xl font-poppins font-extrabold text-black leading-tight mt-2 lg:pe-40">
            The Best Services We Offer
          </h2>

          <div className="h-[4px] w-[60px] bg-orange-500 rounded-full my-4"></div>

          {/* SERVICE LIST */}
          <div className="space-y-7 mt-8 pe-6 md:pe-16">
            {services.map((item, i) => (
              <div key={i} className="flex items-start gap-3 md:gap-4">
                <div className="p-4 flex items-center justify-center bg-white-background shadow-md rounded-xl text-orange">
                  {item.icon}
                </div>
                <div>
                  <h3 className="md:text-lg font-semibold text-black">
                    {item.title}
                  </h3>
                  <p className="text-gray text-xs md:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
