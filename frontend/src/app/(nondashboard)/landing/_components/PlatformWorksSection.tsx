"use client";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const PlatformWorksSection = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".platform-works",
        start: "top 70%",
        markers: true,
      },
    });

    // First image drops from top
    tl.fromTo(
      ".platform-works .imgContainer1",
      {
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        y: 0,
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        y: -100,
        ease: "power2.out",
        duration: 1.2,
      }
    );

    // Second image rises from bottom (starts at same time with offset)
    tl.fromTo(
      ".platform-works .imgContainer2",
      {
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        y: 0,
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        y: -100,
        ease: "power2.out",
        duration: 1.2,
      },
      "<0.2" // Starts 0.2 seconds after the first animation begins
    );
  }, []);

  return (
    <section className="relative z-20 w-screen h-dvh bg-black overflow-hidden platform-works">
      <div className="size-full flex items-center justify-between">
        {/* BG Images */}
        <div
          className="absolute left-[60%] top-0 w-[80%] h-[55%] md:w-[45%] md:h-[70%] imgContainer1"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
        >
          <Image
            src="/livingRoom1.jpg"
            alt="Platform Works"
            width={1200}
            height={1000}
            className="w-full h-full object-cover object-center img"
          />
        </div>

        <div
          className="absolute left-10 bottom-0 w-[70%] h-[50%] md:w-[55%] md:h-[85%] imgContainer2"
          style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
        >
          <Image
            src="/livingRoom2.jpg"
            alt="Platform Works"
            width={1200}
            height={1000}
            className="w-full h-full object-cover img"
          />
        </div>

        {/* Content */}
        <div className="absolute top-10 font-chango right-0 pe-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-white text-center mb-4 mix-blend-difference">
            How Our Real Estate Platform Works?
          </h1>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 left-0 h-fit max-h-[90vh] w-11/12 sm:w-5/6 md:w-2/3 rounded-e-3xl md:rounded-e-4xl p-3 xl:p-10 shadow-2xl bg-black/40 backdrop-blur-none overflow-y-auto">
          <div className="flex flex-col items-center justify-center text-white">
            <div className="w-full px-4">
              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="item-1"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg md:text-2xl">
                    Step 1. Search for Properties
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance md:text-xl">
                    <p>
                      Browse our extensive inventory of properties to find the
                      perfect home that aligns with your lifestyle. Filter by
                      location, price, and features to find the perfect fit.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg md:text-2xl">
                    Step 2. Schedule a Viewing
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance md:text-xl">
                    <p>
                      Schedule a viewing with the property owner to explore the
                      property in person and understand the neighborhood.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg md:text-2xl">
                    Step 3. Make your offer
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance md:text-xl">
                    <p>
                      Once you&apos;re satisfied with the property, make your
                      offer and secure the property. The property owner will
                      review your offer and make a decision.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="flex items-center justify-between gap-5 w-full mt-5 px-2 md:px-5">
              <Button
                variant="default"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="w-1/2 bg-[#0ACDFF]/80 hover:bg-[#0ACDFF] cursor-pointer text-lg rounded-full"
              >
                Search
              </Button>

              <Button
                variant="secondary"
                onClick={() => {}}
                className="w-1/2 cursor-pointer text-lg rounded-full"
              >
                Log In
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformWorksSection;
