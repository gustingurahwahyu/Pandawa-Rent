import { Link, usePage } from "@inertiajs/react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import LoginModal from "@/pages/auth/login-modal";
import RegisterModal from "@/pages/auth/register-modal";
import '../../css/navbar.css';

export default function Navbar() {
  const { url } = usePage(); // ← selalu update saat Inertia navigate

  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const isActive = (path: string) => url === path;

  return (
    <div className="flex items-center justify-between py-6 mx-auto max-w-7xl text-2xl">

      <Link href="/" className="text-black font-extrabold font-poppins">PandawaRent</Link>

      <NavigationMenu>
        <NavigationMenuList className="flex gap-[56px] font-bold font-manrope text-base text-black">

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={isActive("/") ? "link-selected" : "link-animation"}
            >
              <Link href="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={isActive("/collection") ? "link-selected" : "link-animation"}
            >
              <Link href="/collection">Collection</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={isActive("/about") ? "link-selected" : "link-animation"}
            >
              <Link href="/about">About Us</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={isActive("/contact") ? "link-selected" : "link-animation"}
            >
              <Link href="/contact">Contact</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>

      <Button
        variant="default"
        className="px-6 py-4 text-base font-medium"
        onClick={() => setLoginOpen(true)}
      >
        Login
      </Button>

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
