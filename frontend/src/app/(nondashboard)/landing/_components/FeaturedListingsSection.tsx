"use client";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRightIcon } from "lucide-react";
import React from "react";

const FeaturedListingsSection = () => {
  useGSAP(() => {
    const featuredSectionTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".featured-section",
        start: "top 80%",
        end: "top 50%",
        scrub: 1,
      },
    });

    featuredSectionTl
      .from(".featured-title", {
        y: 50,
        opacity: 0,
        ease: "power2.out",
      })
      .from(
        ".featured-listings",
        {
          y: 50,
          opacity: 0,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .from(
        ".featured-button",
        {
          y: 50,
          opacity: 0,
          ease: "power2.out",
        },
        "-=0.5"
      );
  });

  return (
    <section className="w-screen h-dvh z-20 bg-white relative featured-section">
      <div className="flex flex-col h-full md:flex-row gap-6 items-center justify-center py-10">
        {/* Title */}
        <div className="featured-title">
          <h1 className="font-chango text-3xl">Featured Listings</h1>
          <p className="max-w-md text-center text-muted-foreground">
            A list of featured listings to wet your appetite
          </p>
        </div>

        <div className="flex flex-col gap-6 items-center py-10">
          {/* Listings */}
          <div className="featured-listings">ProductListings</div>

          {/* Button */}
          <div className="featured-button">
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
