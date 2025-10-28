"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection = () => {
  const images = ["/hero_1.jpg", "/hero_2.webp", "/hero_3.webp"];
  // const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isMobile = useIsMobile();

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 9000);

    return () => clearInterval(timer);
  }, [images.length]);

  useGSAP(() => {
    const heroTitle = SplitText.create(".hero-content h1", { type: "chars" });
    const heroTl = gsap.timeline({
      delay: 1,
    });

    heroTl
      .from(
        heroTitle.chars,
        {
          yPercent: 200,
          stagger: 0.05,
          ease: "power1.inOut",
          opacity: 0,
        },
        "-=0.2"
      )
      .from(
        ".hero-input",
        {
          yPercent: 200,
          ease: "power1.inOut",
          opacity: 0,
          duration: 1.5,
        },
        "<"
      );

    const heroSectionTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-section",
        start: "10% top",
        end: "bottom top",
        scrub: true,
      },
    });

    heroSectionTl.to(".hero-section", {
      scale: 0.9,
      rotate: 7,
      yPercent: 30,
      ease: "power1.out",
    });
  });

  // Early return with proper check
  if (!images || images.length === 0) {
    return (
      <div className="max-h-dvh flex items-center justify-center bg-gray-100">
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  return (
    <div className="sticky top-0 h-dvh w-full overflow-hidden hero-section bg-black">
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image}
            alt={`Hero Image ${index + 1}`}
            fill
            priority={index === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black opacity-40" />
        </div>
      ))}

      <div className="hero-content flex flex-col">
        <div className="absolute top-[16.67%] left-4 md:left-24 max-w-5xl">
          <h1
            className={cn(
              "font-bold text-white font-chango opacity-100",
              isMobile ? "text-5xl" : "text-4xl md:text-7xl"
            )}
          >
            Homes that <br /> match your lifestyle.
          </h1>
        </div>

        <div className="hero-input absolute bottom-0 left-0.5 md:left-24 right-4 md:right-auto w-full md:max-w-3xl backdrop-blur-sm bg-black/40 pt-8 pb-[16.67vh] px-6 rounded-t-3xl">
          <div className="relative w-full">
            <Input
              type="text"
              value={""}
              onChange={() => {}}
              placeholder="Search by city, neighborhood or address"
              className="placeholder:text-background w-full rounded-full py-6 px-6 pr-24 md:pr-28 h-12 md:h-16 text-base md:text-xl border-2"
            />
            <Button
              variant="default"
              className="absolute bg-[#0ACDFF]/80 right-1 top-1/2 -translate-y-1/2 rounded-full h-10 md:h-14 px-6 md:px-10 md:text-lg"
            >
              <Search size={24} className="md:w-6 md:h-6" />
              Find
            </Button>
          </div>

          <p className="mt-4 text-background text-center text-base md:text-2xl">
            Discover your perfect home with Homely.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
