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
    <section className="py-20">
      {/* IMAGE SIDE */}
      <div className="absolute left-[-120px]">
        <img
          src="/images/car-best-services.png"
          alt="red car"
          className="max-w-[725px] drop-shadow-xl"
        />
      </div>
      <div className="max-w-6xl mx-auto px-6 grid  items-center justify-end ps-[510px]">

        {/* TEXT SIDE */}
        <div>
          <p className="font-manrope text-xl font-semibold text-gray tracking-wide uppercase">
            Best Services
          </p>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight mt-2 text-[#1A1A1A] pe-40">
            The Best Services We Offer
          </h2>

          <div className="h-[4px] w-[60px] bg-orange-500 rounded-full my-4"></div>

          {/* SERVICE LIST */}
          <div className="space-y-7 mt-8 pe-28">
            {services.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-16 h-12 flex items-center justify-center bg-white-background shadow-md rounded-xl text-orange-500">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
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
