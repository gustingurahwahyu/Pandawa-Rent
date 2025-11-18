import SearchBar from "../components/search-input";

export default function Hero() {
    return (
			<div className='flex py-6 px-38 my-8 pb-92'>
				<div className='flex flex-col col-span-2 text-black mx-auto relative'>
					<div className='flex flex-col items-center gap-5 justify-center px-64'>
						<h1 className='font-poppins font-extrabold text-6xl text-center'>
							Your Luxurious Journey Starts Here
						</h1>
						<div className='h-1 w-16 bg-orange rounded-xl'></div>
						<p className='px-36 font-manrope font-semibold text-center'>
							Comfort, safety, and luxury come together in every one
							of your journeys.
						</p>
					</div>
					<div className="relative flex justify-center">
						{/* Car Image */}
						<img
							src="/images/car-collection-hero.png"
							alt="CAR HERO"
							className="max-h-124  absolute left-1/2 -translate-x-1/2 top-[-140px] z-2"
						/>
					</div>
					<div className='absolute left-1/2 -translate-x-1/2 z-10 bottom-[-320px]'>
					<SearchBar />
					</div>
				</div>
			</div>
    );
}