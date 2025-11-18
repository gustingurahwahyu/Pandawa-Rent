export default function WelcomeSection() {
    return (
			<div className='flex py-20 my-10 relative'>
        {/* IMAGE SIDE */}
        <div className="absolute left-40 top-0">
          <img
            src="/images/car-welcome.png"
            alt="red car"
            className="max-w-[725px] drop-shadow-xl"
          />
        </div>
				<div className='max-w-6xl mx-auto px-6 grid  items-center justify-end ps-[640px]'>
					<div className='flex flex-col items-start gap-5 justify-center'>
						<h1 className='font-poppins font-extrabold text-black text-6xl'>
              Welcome to PandawaRent
						</h1>
						<div className='h-1 w-16 bg-orange rounded-xl'></div>
						<p className='font-manrope font-semibold text-gray'>
              At PandawaRent, we are committed to providing an exceptional driving experience through our luxury car rental services. Every journey with us is guaranteed to be luxurious, comfortable, and truly unforgettable.
						</p>
					</div>
				</div>
			</div>
    );
}