import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import React from "react";

const FeaturedListingsSection = () => {
  return (
    <section className="w-screen h-dvh z-20 bg-white relative">
      <div className="flex flex-col h-full md:flex-row gap-6 items-center justify-center py-10">
        {/* Title */}
        <div>
          <h1 className="font-chango text-3xl">Featured Listings</h1>
          <p className="max-w-md text-center text-muted-foreground">
            A list of featured listings to wet your appetite
          </p>
        </div>

        <div className="flex flex-col gap-6 items-center py-10">
          {/* Listings */}
          <div>ProductListings</div>

          {/* Button */}
          <div>
            <Button
              variant={"outline"}
              className="flex items-center rounded-4xl shadow-2xs text-[#0ACDFF]"
            >
              View All <ArrowRightIcon className="w-4 h-4 mb-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListingsSection;
