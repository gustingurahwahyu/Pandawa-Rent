import { Link } from "@inertiajs/react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

import LoginModal from "@/pages/auth/login-modal";
import RegisterModal from "@/pages/auth/register-modal";
import "../../css/navbar.css";

export default function Navbar() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <div className="py-6 px-6 lg:px-0 mx-auto max-w-md md:max-w-xl lg:max-w-7xl flex items-center justify-between">

      {/* LOGO */}
      <Link
        href="/"
        className="text-black font-extrabold font-poppins text-xl"
      >
        PandawaRent
      </Link>

      {/* DESKTOP MENU */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="flex gap-[56px] font-bold font-manrope text-base text-black">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/" className="nav-link">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/collection" className="nav-link">Collection</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/about" className="nav-link">About Us</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/contact" className="nav-link">Contact</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Button
          className="hidden lg:flex px-6 py-4 text-base font-medium"
          onClick={() => setLoginOpen(true)}
        >
          Login
        </Button>

      {/* MOBILE DRAWER */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger className="cursor-pointer">
            <Menu size={28} className="text-black" />
          </SheetTrigger>

          <SheetContent side="left" className="p-6 w-[270px]">
            <div className="flex flex-col gap-6 mt-6">

              {/* LOGO */}
              <Link
                href="/"
                className="text-black font-extrabold font-poppins text-xl"
              >
                PandawaRent
              </Link>

              {/* MENU LIST */}
              <div className="flex flex-col gap-4 mt-4">

                <Link href="/" className="text-base font-semibold text-black">
                  Home
                </Link>
                <Link href="/collection" className="text-base font-semibold text-black">
                  Collection
                </Link>
                <Link href="/about" className="text-base font-semibold text-black">
                  About Us
                </Link>
                <Link href="/contact" className="text-base font-semibold text-black">
                  Contact
                </Link>
              </div>

              {/* LOGIN BUTTON */}
              <Button
                className="mt-6 w-full py-4 text-base font-medium"
                onClick={() => setLoginOpen(true)}
              >
                Login
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* AUTH MODALS */}
      <LoginModal
        open={loginOpen}
        onOpenChange={setLoginOpen}
        openRegister={() => {
          setLoginOpen(false);
          setRegisterOpen(true);
        }}
      />

      <RegisterModal
        open={registerOpen}
        onOpenChange={setRegisterOpen}
        openLogin={() => {
          setRegisterOpen(false);
          setLoginOpen(true);
        }}
      />
    </div>
  );
}
