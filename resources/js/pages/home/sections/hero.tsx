import SearchBar from "../components/search-input";

export default function Hero() {
    return (
			<div className='flex py-6 px-38 mb-20'>
				<div className='flex col-span-2 text-black relative'>
					<div className='flex flex-col items-start gap-5 justify-center pb-36'>
						<h1 className='font-poppins font-extrabold text-6xl'>
							Your Luxurious Journey Starts Here
						</h1>
						<div className='h-1 w-16 bg-orange rounded-xl'></div>
						<p className='pe-32 font-manrope font-semibold'>
							Comfort, safety, and luxury come together in every one
							of your journeys.
						</p>
					</div>
					<div className="relative flex justify-center">
						{/* Background Orange */}
						<div className="w-[476px] h-[580px] bg-orange rounded-[40px] mx-12"></div>

						{/* Car Image */}
						<img
							src="/images/car-home-hero.png"
							alt="CAR HERO"
							className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-2"
						/>
					</div>
          <div className='absolute left-1/2 -translate-x-1/2 z-10 bottom-8'>
            <SearchBar />
          </div>
				</div>
			</div>
    );
}