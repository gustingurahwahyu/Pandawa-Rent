import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import SearchBar from "../components/search-input";

export default function Hero() {
    return (
			<div className='flex py-2 px-6 lg:py-6 lg:px-38 mt-50 mb-30 lg:mt-0 lg:mb-20 justify-center lg:justify-start'>
				<div className='flex flex-col-reverse lg:flex-row col-span-2 text-black relative'>
					<div className='flex flex-col items-center lg:items-start gap-2 lg:gap-5 justify-center lg:pb-36'>
						<h1 className='font-poppins font-black lg:font-extrabold text-2xl lg:text-6xl text-center lg:text-start'>
							Your Luxurious Journey Starts Here
						</h1>
						<div className='h-0.75 lg:-1 w-8 lg:w-16 bg-orange rounded-xl'></div>
						<p className='px-10 lg:px-0 lg:pe-32 font-manrope font-semibold text-xs lg:text-base text-center lg:text-start'>
							Comfort, safety, and luxury come together in every one
							of your journeys.
						</p>
					</div>
					<div className="relative flex justify-center">
						{/* Background Orange */}
						<div className=" lg:w-[476px] lg:h-[580px] bg-orange rounded-[40px] mx-12"></div>

						{/* Car Image */}
						<img
							src="/images/car-home-hero.png"
							alt="CAR HERO"
							className="absolute px-6 lg:px-0 left-1/2 -translate-x-1/2 top-[-100px] lg:top-1/2 -translate-y-1/2 z-2"
						/>
					</div>
          <div className='hidden lg:block absolute left-1/2 -translate-x-1/2 z-10 bottom-8'>
            <SearchBar />
          </div>

          {/* Button Explore Tablet & Mobile */}
          <div className="block lg:hidden absolute left-1/2 -translate-x-1/2 top-25 z-10 mt-10">
            <Link href="/collection">
              <Button className="px-4 py-4 text-sm font-medium cursor-pointer focus:bg-white focus:text-orange transition">Explore</Button>
            </Link>        
          </div>


				</div>
			</div>
    );
}