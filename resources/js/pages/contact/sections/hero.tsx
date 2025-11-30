export default function Hero() {
    return (
			<div className='flex py-6 px-38 my-10 pb-92'>
				<div className='flex flex-col col-span-2 text-black mx-auto relative'>
					<div className='flex flex-col items-center gap-5 justify-center px-64'>
						<h1 className='font-poppins font-black text-6xl text-center'>
              Need Assistance? Contact Us!
						</h1>
						<div className='h-1 w-16 bg-orange rounded-xl'></div>
					</div>
					<div className="relative flex justify-center">
						{/* Car Image */}
						<img
							src="/images/car-contact-hero.png"
							alt="CAR HERO"
							className="max-h-124 absolute left-1/2 -translate-x-1/2 top-0 z-2"
						/>
					</div>
				</div>
			</div>
    );
}