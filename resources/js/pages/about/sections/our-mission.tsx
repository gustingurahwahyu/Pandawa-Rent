export default function OurMissionSection() {
    return (
			<div className='flex py-20 my-10 relative'>
        {/* IMAGE SIDE */}
        <div className="absolute right-40 top-0">
          <img
            src="/images/car-our-mission.png"
            alt="red car"
            className="max-w-[725px] drop-shadow-xl"
          />
        </div>
				<div className='max-w-6xl mx-auto px-6 grid  items-center justify-end pe-[640px]'>
					<div className='flex flex-col items-start gap-5 justify-center'>
						<h1 className='font-poppins font-extrabold text-black text-6xl'>
							Our Mission
						</h1>
						<div className='h-1 w-16 bg-orange rounded-xl'></div>
						<p className='font-manrope font-semibold text-gray'>
              Our vision is to become the leading luxury car rental service provider, offering comfort, reliability, and sheer elegance in every journey. We are constantly striving to deliver the best service possible, with a focus on quality, safety, and customer satisfaction. Every detail of our service is meticulously designed to provide you with an unparalleled driving experience.
						</p>
					</div>
				</div>
			</div>
    );
}