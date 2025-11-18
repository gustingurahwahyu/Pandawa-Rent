import { Link } from "@inertiajs/react";

export default function Footer() {
  return (
    <footer className="w-full bg-white mt-5 font-manrope font-regular text-gray">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* PandawaRent Info */}
        <div>
          <h3 className="mb-3 font-poppins font-black text-2xl text-black">PandawaRent</h3>
          <p className="text-sm text-gray leading-relaxed">
            Jalan Tukad Badung No 135,<br />
            Denpasar, Bali - 80226
          </p>
          <p className="mt-4 text-sm text-gray">+62 811 811 811</p>
          <p className="text-sm text-gray">info@pandawarent.com</p>
        </div>

        {/* Our Collection */}
        <div>
          <h3 className="font-poppins font-black text-2xl text-black mb-3 ">Our Collection</h3>
          <ul className="space-y-1 text-sm text-gray">
            <li>Lamborghini</li>
            <li>Ferrari</li>
            <li>Ford</li>
            <li>BMW</li>
            <li>Chevrolette</li>
            <li>Nissan</li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-poppins font-black text-2xl text-black mb-3">Services</h3>
          <ul className="space-y-1 text-sm text-gray">
            <li>Best Guaranteed Price</li>
            <li>100+ Car Options</li>
            <li>24-Hour Service</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-poppins font-black text-2xl text-black mb-3">Social media</h3>

          <div className="flex items-center gap-4">

            {/* Instagram */}
            <a href="#" className="text-orange">
              <svg viewBox="0 0 32 32" className="h-6 w-6" fill="#FD7014" xmlns="http://www.w3.org/2000/svg">
                <path d="M6,2h20c2.2,0,4,1.8,4,4v20c0,2.2-1.8,4-4,4H6c-2.2,0-4-1.8-4-4V6C2,3.8,3.8,2,6,2z"></path>
                <g>
                  <path fill="#EFF4FF" d="M21.3,9.7c-0.6,0-1.2,0.5-1.2,1.2c0,0.7,0.5,1.2,1.2,1.2c0.7,0,1.2-0.5,1.2-1.2C22.4,10.2,21.9,9.7,21.3,9.7z"></path>
                  <path fill="#EFF4FF" d="M16,11.2c-2.7,0-4.9,2.2-4.9,4.9c0,2.7,2.2,4.9,4.9,4.9s4.9-2.2,4.9-4.9C21,13.4,18.8,11.2,16,11.2z M16,19.3 c-1.7,0-3.2-1.4-3.2-3.2c0-1.7,1.4-3.2,3.2-3.2c1.7,0,3.2,1.4,3.2,3.2C19.2,17.9,17.8,19.3,16,19.3z"></path>
                  <path fill="#EFF4FF" d="M20,6h-8c-3.3,0-6,2.7-6,6v8c0,3.3,2.7,6,6,6h8c3.3,0,6-2.7,6-6v-8C26,8.7,23.3,6,20,6z M24.1,20 c0,2.3-1.9,4.1-4.1,4.1h-8c-2.3,0-4.1-1.9-4.1-4.1v-8c0-2.3,1.9-4.1,4.1-4.1h8c2.3,0,4.1,1.9,4.1,4.1V20z"></path>
                </g>
              </svg>
            </a>

            {/* Facebook */}
            <a href="#" className="text-orange">
              <svg viewBox="0 0 20 20" className="h-6 w-6" fill="#FD7014" xmlns="http://www.w3.org/2000/svg">
                <rect x="0" fill="none" width="20" height="20"></rect>
                <path d="M2.89 2h14.23c.49 0 .88.39.88.88v14.24c0 .48-.39.88-.88.88h-4.08v-6.2h2.08l.31-2.41h-2.39V7.85c0-.7.2-1.18 1.2-1.18h1.28V4.51c-.22-.03-.98-.09-1.86-.09-1.85 0-3.11 1.12-3.11 3.19v1.78H8.46v2.41h2.09V18H2.89c-.49 0-.89-.4-.89-.88V2.88c0-.49.4-.88.89-.88z"></path>
              </svg>
            </a>

            {/* Twitter X */}
            <a href="#" className="text-orange">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 16 16" fill="#FD7014">
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
              </svg>
            </a>

          </div>
        </div>
      </div>

      {/* Navigation Bottom */}
      <div className="border-t-3 border-gray/10 mx-32  py-6">
        <div className="max-w-7xl mx-auto px-4 flex justify-center gap-10 text-sm font-bold font-manrope text-gray">
          <Link href="/">Home</Link>
          <Link href="/collection">Collection</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
