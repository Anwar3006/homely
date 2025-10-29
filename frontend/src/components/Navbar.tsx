import { NAVBAR_HEIGHT } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

import { Button } from "./ui/button";
import useUserAuth from "@/hooks/api/useUserAuth.hook";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "aws-amplify/auth";
import { Bell, MessageCircle, Plus, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SidebarTrigger } from "./ui/sidebar";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { data, isPending } = useUserAuth();
  const { data: userInfo } = data ?? {};

  const router = useRouter();
  const pathname = usePathname();

  const isDashboard =
    pathname.startsWith("/manager") || pathname.startsWith("/tenant");
  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/"; // refresh the page
  };

  return (
    <nav
      className="fixed left-0 top-0 z-50 w-full backdrop-blur-md bg-black/10"
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >
      <nav
        className={cn(
          "flex justify-between items-center px-4 md:px-8 py-3 w-full bg-transparent h-full",
          isDashboard ? "text-black" : "text-white"
        )}
      >
        <div className="flex items-center gap-4 md:gap-6">
          {isDashboard && (
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
          )}
          <Link
            href={"/"}
            className="cursor-pointer hover:text-primary-300 "
            scroll={false}
          >
            <div className="flex items-center gap-3">
              <Image
                src={"/logo.svg"}
                alt="Homely logo"
                width={24}
                height={24}
                className="w-4 h-4 md:w-6 md:h-6"
              />
              <div className="font-bold text-base md:text-xl font-chango">
                Home
                <span className="text-secondary-500 italic font-light hover:text-primary-300">
                  ly
                </span>
              </div>
            </div>
          </Link>

          {isDashboard && userInfo && (
            <Button
              variant="secondary"
              className="bg-[#0ACDFF]/80 hover:bg-[#0ACDFF]/50 font-gluten font-light text-black/80 cursor-pointer rounded-2xl md:text-xs!"
              onClick={() =>
                router.push(
                  userInfo.userRole?.toLowerCase() === "manager"
                    ? "/managers/new-property"
                    : "/search"
                )
              }
            >
              {userInfo.userRole?.toLowerCase() === "manager" ? (
                <>
                  <Plus className="h-4 w-4" />
                  <span className="hidden md:block ml-1">Add New Property</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span className="hidden md:block ml-2">Search</span>
                </>
              )}
            </Button>
          )}
        </div>

        <div className="hidden md:flex text-primary-200 items-center justify-between gap-8 xl:gap-12">
          <p
            className={cn(
              "font-bold text-2xl font-gluten",
              isDashboard ? "text-black" : "text-white"
            )}
          >
            Buy
          </p>
          <p
            className={cn(
              "font-bold text-2xl font-gluten",
              isDashboard ? "text-black" : "text-white"
            )}
          >
            Rent
          </p>
          <p
            className={cn(
              "font-bold text-2xl font-gluten",
              isDashboard ? "text-black" : "text-white"
            )}
          >
            Sell
          </p>
        </div>

        <div className="flex items-center justify-between gap-2 md:gap-5">
          {userInfo ? (
            <>
              <div className="relative hidden md:block">
                <MessageCircle className="w-6 h-6 cursor-pointer hover:text-white/70 duration-200" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-[#0ACDFF] rounded-full" />
              </div>

              <div className="relative hidden md:block">
                <Bell className="w-6 h-6 cursor-pointer hover:text-white/70 duration-200" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-[#0ACDFF] rounded-full" />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
                  <Avatar>
                    {/* <AvatarImage
                      src={userInfo.userInfo.image} //we dont have an image field so this will throw an error
                    /> */}

                    <AvatarFallback className="bg-zinc-900 font-chango text-white">
                      {userInfo.userRole?.[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p className="hidden md:block">{userInfo.userInfo?.name}</p>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="bg-white font-gluten px-1">
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-zinc-800! hover:text-white! duration-200"
                    onClick={() =>
                      router.push(
                        userInfo.userRole?.toLowerCase() === "manager"
                          ? "/managers/properties"
                          : "/tenants/favorites",
                        { scroll: false }
                      )
                    }
                  >
                    Go to Dashboard
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-zinc-200" />

                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-zinc-800! hover:text-white! duration-200 font-light"
                    onClick={() =>
                      router.push(
                        `/${userInfo.userRole?.toLowerCase()}s/settings`,
                        { scroll: false }
                      )
                    }
                  >
                    Settings
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-zinc-800! hover:text-white! duration-200 font-light"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/signin">
                <Button
                  variant="outline"
                  className="bg-transparent font-gluten border-zinc-900 text-black hover:bg-white/30 rounded-full md:px-6 font-light cursor-pointer text-xs! md:text-base lg:text-lg"
                >
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="default"
                  className="text-white font-gluten bg-zinc-900 hover:bg-zinc-700 rounded-full md:px-6 font-light cursor-pointer text-xs! md:text-base lg:text-lg"
                >
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </nav>
  );
};

export default Navbar;
