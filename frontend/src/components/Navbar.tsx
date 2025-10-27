import { NAVBAR_HEIGHT } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav
      className="fixed left-0 top-0 z-50 w-full backdrop-blur-md bg-black/10"
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >
      <nav className="flex justify-between items-center px-4 md:px-8 py-3 w-full bg-transparent h-full text-white">
        <div className="flex items-center gap-4 md:gap-6">
          <Link
            href={"/"}
            className="cursor-pointer hover:text-primary-300"
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
        </div>

        <div className="hidden md:flex text-primary-200 items-center justify-between gap-8 xl:gap-12">
          <p className="font-bold text-white text-2xl font-gluten">Buy</p>
          <p className="font-bold text-white text-2xl font-gluten">Rent</p>
          <p className="font-bold text-white text-2xl font-gluten">Sell</p>
        </div>

        <div className="flex items-center justify-between gap-2 md:gap-5">
          <Link href="/login">
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
        </div>
      </nav>
    </nav>
  );
};

export default Navbar;
