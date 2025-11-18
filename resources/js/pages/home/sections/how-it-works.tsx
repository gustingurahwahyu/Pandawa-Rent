import { MapPin, CalendarCheck2, KeySquare } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <MapPin size={42} className="text-orange" />,
      title: "Choose a Car",
      desc: "Select a luxury car from the diverse, best collection we provide for you.",
    },
    {
      icon: <CalendarCheck2 size={42} className="text-white" />,
      title: "Fill in Personal Details",
      desc: "Easily fill out the form with your personal details and desired rental schedule.",
      highlight: true,
    },
    {
      icon: <KeySquare size={42} className="text-orange" />,
      title: "Confirmation",
      desc: "Complete the payment after your order is verified by our professional team.",
    },
  ];

  return (
    <section className="relative py-20 bg-center bg-repeat">
      <div className="text-center mb-12">
        <p className="tracking-wide font-manrope text-xl font-semibold text-gray">HOW IT WORKS</p>
        <h2 className="text-5xl font-poppins font-extrabold text-dark mt-2">
          3 PandawaRent Process Steps
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-16 px-10 mt-24">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center w-[250px] text-center relative px-1">
            {/* ICON BOX */}
            <div
              className={`w-[95px] h-[95px] rounded-2xl shadow-md flex items-center justify-center transition 
              ${
                step.highlight
                  ? "bg-orange text-white shadow-lg shadow-orange/30"
                  : "bg-white-background"
              }`}
            >
              {step.icon}
            </div>

            {/* DOT CONNECTOR (LEFT + RIGHT) */}
            {index !== steps.length - 1 && (
              <div className="hidden md:block absolute right-[-82px] top-[45px] w-[100px] h-[2px] bg-orange rounded-full"></div>
            )}

            <h3 className="text-lg font-semibold mt-6">{step.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed mt-2">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
