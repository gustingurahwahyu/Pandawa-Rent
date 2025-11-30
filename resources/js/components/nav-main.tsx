import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useInitials } from '@/hooks/use-initials';
import { Link, router, usePage } from '@inertiajs/react';
import { History, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';

import LoginModal from '@/pages/auth/login-modal';
import RegisterModal from '@/pages/auth/register-modal';
import '../../css/navbar.css';

interface PageProps extends Record<string, unknown> {
  auth: {
    user: {
      id: number;
      name: string;
      email: string;
      role: string;
    } | null;
  };
}

export default function Navbar() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const { auth } = usePage<PageProps>().props;
  const getInitials = useInitials();

  return (
    <div className="mx-auto flex max-w-md items-center justify-between px-6 py-6 md:max-w-xl lg:max-w-7xl lg:px-0">
      {/* LOGO */}
      <Link href="/" className="font-poppins text-xl font-extrabold text-black">
        PandawaRent
      </Link>

      {/* DESKTOP MENU */}
      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList className="flex gap-[56px] font-manrope text-base font-bold text-black">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/" className="nav-link">
                Home
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/collection" className="nav-link">
                Collection
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/about" className="nav-link">
                About Us
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/contact" className="nav-link">
                Contact
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* AUTH SECTION - Desktop */}
      {auth.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="hidden h-10 w-10 rounded-full p-0 lg:flex"
            >
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-orange font-semibold text-white">
                  {getInitials(auth.user.name)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm leading-none font-medium">
                  {auth.user.name}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {auth.user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/history" className="cursor-pointer">
                <History className="mr-2 h-4 w-4" />
                <span>Order History</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-red-600"
              onClick={() => router.post('/logout')}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          className="hidden px-6 py-4 text-base font-medium lg:flex"
          onClick={() => setLoginOpen(true)}
        >
          Login
        </Button>
      )}

      {/* MOBILE DRAWER */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger className="cursor-pointer">
            <Menu size={28} className="text-black" />
          </SheetTrigger>

          <SheetContent side="left" className="w-[270px] p-6">
            <div className="mt-6 flex flex-col gap-6">
              {/* LOGO */}
              <Link
                href="/"
                className="font-poppins text-xl font-extrabold text-black"
              >
                PandawaRent
              </Link>

              {/* MENU LIST */}
              <div className="mt-4 flex flex-col gap-4">
                <Link href="/" className="text-base font-semibold text-black">
                  Home
                </Link>
                <Link
                  href="/collection"
                  className="text-base font-semibold text-black"
                >
                  Collection
                </Link>
                <Link
                  href="/about"
                  className="text-base font-semibold text-black"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="text-base font-semibold text-black"
                >
                  Contact
                </Link>
              </div>

              {/* AUTH SECTION - Mobile */}
              {auth.user ? (
                <>
                  <div className="mt-6 border-t pt-4">
                    <div className="mb-4 flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-orange font-semibold text-white">
                          {getInitials(auth.user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="text-sm font-semibold text-black">
                          {auth.user.name}
                        </p>
                        <p className="text-xs text-gray">{auth.user.email}</p>
                      </div>
                    </div>
                    <Link
                      href="/history"
                      className="mb-3 flex items-center gap-2 text-base font-semibold text-black"
                    >
                      <History className="h-4 w-4" />
                      Order History
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full border-red-600 py-4 text-base font-medium text-red-600 hover:bg-red-50"
                      onClick={() => router.post('/logout')}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <Button
                  className="mt-6 w-full py-4 text-base font-medium"
                  onClick={() => setLoginOpen(true)}
                >
                  Login
                </Button>
              )}
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
