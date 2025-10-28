"use client";
import { testimonials } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useMemo, useRef } from "react";
import { twJoin } from "tailwind-merge";
import CountUp from "react-countup";

type Testimonial = { text: string; author: { name: string; imgUrl: string } };

const TestimonialSection = () => {
  useGSAP(() => {
    const testimonialTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".testimonial-section",
        start: "top 80%",
        end: "top 50%",
        scrub: 1,
      },
    });

    testimonialTl
      .from(".stat-item", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out",
      })
      .from(
        ".testimonial-heading",
        {
          y: 50,
          opacity: 0,
          ease: "power2.out",
        },
        "-=0.5"
      );
  });

  return (
    <section className="relative w-screen h-dvh bg-black z-20 testimonial-section">
      <div className="flex flex-col items-center justify-between w-full h-full">
        <div className="grid grid-cols-2 md:grid-cols-7 mt-3 md:mt-8 gap-0 w-full text-white px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="flex flex-col items-center justify-center py-6 md:py-8 stat-item">
            <h1 className="font-chango text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              <CountUp start={100} end={1200} duration={2} suffix="+" />
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-center">
              properties listed
            </p>
          </div>

          <div className="hidden md:block w-px bg-gray-500 mx-auto h-full" />

          <div className="flex flex-col items-center justify-center py-6 md:py-8 stat-item">
            <h1 className="font-chango text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              <CountUp start={10} end={500} duration={2} suffix="+" />
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-center">
              satisfied customers
            </p>
          </div>

          <div className="hidden md:block w-px bg-gray-500 mx-auto h-full" />

          <div className="flex flex-col items-center justify-center py-6 md:py-8 stat-item">
            <h1 className="font-chango text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              <CountUp start={10} end={800} duration={2} suffix="+" />
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-center">
              units sold/rented
            </p>
          </div>

          <div className="hidden md:block w-px bg-gray-500 mx-auto h-full" />

          <div className="flex flex-col items-center justify-center py-6 md:py-8 stat-item">
            <h1 className="font-chango text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              <CountUp start={0} end={10} duration={7} suffix="+" />
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-center">
              years of experience
            </p>
          </div>
        </div>

        <h1 className="font-chango text-xl md:text-3xl xl:text-5xl text-white mt-3 md:mt-6 text-center testimonial-heading">
          What Our Customers Say
        </h1>

        <div className="flex flex-col items-center gap-2 md:gap-14 2xl:gap-20 mt-1 md:mt-4 mb-14 h-full w-full border-t border-gray-500">
          <TestimonialMarquee
            isReversed={true}
            elements={testimonials}
            className="mt-3 md:mt-6"
          />
          <TestimonialMarquee isReversed={false} elements={testimonials} />
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;

/////////////////////////////////// Child Components //////////////////////////
const TestimonialCard = ({
  text,
  author,
}: {
  text: string;
  author: { name: string; imgUrl: string };
}) => {
  return (
    <div className="p-2.5 md:p-5 border border-gray-500 rounded-3xl h-[30vh] w-[35vw] text-white bg-zinc-900">
      <div className="w-full h-full flex flex-col items-center justify-between gap-4">
        <p className="text-xs md:text-base pt-3 overflow-auto">{text}</p>
        <div className="flex items-center justify-end gap-2 w-full">
          <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden shrink-0">
            <Image
              src={author.imgUrl}
              alt={author.name}
              fill
              className="object-cover"
            />
          </div>
          <p className="hidden md:block text-base">@{author.name}</p>
        </div>
      </div>
    </div>
  );
};

///////////////////////////////// Marquee Component //////////////////////////
type TestimonialMarqueeProps = {
  isReversed: boolean;
  elements: Testimonial[];
  className?: string;
};

const TestimonialMarquee = ({
  isReversed,
  elements,
  className,
}: TestimonialMarqueeProps) => {
  const movingContainer = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const ELEMENTS = [...elements, ...elements];

  useGSAP(() => {
    if (!movingContainer.current) return;

    gsap.set(movingContainer.current, {
      xPercent: isReversed ? -50 : 0,
    });

    timelineRef.current = gsap
      .timeline({
        defaults: { ease: "none", repeat: -1 },
      })
      .to(movingContainer.current, {
        xPercent: isReversed ? 0 : -50,
        duration: 90,
      });
  }, [isReversed]);

  const list = useMemo(
    () => (
      <div
        className={twJoin("flex w-fit items-center gap-5 md:gap-10", className)}
      >
        {ELEMENTS.map((element: Testimonial, index: number) => {
          const isLast = index === ELEMENTS.length - 1;
          return (
            <div
              key={`${element.author}-${index}`}
              className={cn(
                "relative flex shrink-0 items-center justify-center",
                isLast && "mr-5 md:mr-10"
              )}
            >
              <TestimonialCard text={element.text} author={element.author} />
            </div>
          );
        })}
      </div>
    ),
    [ELEMENTS, className]
  );

  const onPointerEnter = () => {
    if (timelineRef.current) {
      timelineRef.current.pause();
    }
  };

  const onPointerLeave = () => {
    if (timelineRef.current) {
      timelineRef.current.resume();
    }
  };

  return (
    <div
      className="max-w-full select-none overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)",
      }}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <div ref={movingContainer} className="flex w-fit">
        {list}
        {list}
      </div>
    </div>
  );
};
////////////////////////////////////////////////////////////////////////
