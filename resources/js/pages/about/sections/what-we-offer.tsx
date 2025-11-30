import { BadgeCheck, Car, Clock } from "lucide-react";

export default function WhatWeOffer() {
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
    <section className="pt-20 flex flex-col-reverse justify-center items-center ">
      {/* IMAGE SIDE */}
      <div className="">
        <img
          src="/images/car-what-we-offer.png"
          alt="red car"
          className="max-w-[820px] drop-shadow-xl pt-28 pb-14"
        />
      </div>
      <div className="max-w-6xl mx-auto px-6 grid items-center justify-center">

        {/* TEXT SIDE */}
        <div className="flex flex-col justify-center items-center relative">
          <h2 className="font-poppins font-extrabold text-black text-6xl text-center leading-tight my-2 ">
            What We Offer?
          </h2>

          <div className="h-[4px] w-[60px] bg-orange-500 rounded-full my-4"></div>

          <div>  
            <img 
              src="/images/connectors/connector-left.png" 
              alt="line-left"
              className="absolute left-40 bottom-[-140px]" 
            />
          </div>
          <div>  
            <img 
              src="/images/connectors/connector-mid.png" 
              alt="line-left"
              className="absolute left-50% bottom-[-80px]" 
            />
          </div>
          <div>  
            <img 
              src="/images/connectors/connector-right.png" 
              alt="line-left"
              className="absolute right-40 bottom-[-140px]" 
            />
          </div>

          {/* SERVICE LIST */}
          <div className="gap-7 mt-8 flex cols-2">
            {services.map((item, i) => (
              <div key={i} className={`flex flex-col items-center gap-4 ${i !== 1 ? 'pt-24' : ''}`}>
                <div className="p-4 flex items-center justify-center bg-white-background shadow-md rounded-xl text-orange">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 text-center">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed text-center">
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
