"use client";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";

const AboutUsSection = () => {
  useGSAP(() => {
    const aboutMainText = SplitText.create(".about-content p", {
      type: "words",
    });

    const aboutSectionTl = gsap.timeline({
      delay: 0.2,
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 90%",
      },
    });
    aboutSectionTl
      .from(".about-content", {
        xPercent: 200,
        ease: "power1.inOut",
        opacity: 0,
        duration: 2,
      })
      .from(
        aboutMainText.words,
        {
          yPercent: 200,
          ease: "power1.inOut",
          opacity: 0,
          stagger: 0.05,
        },
        "<=0.4"
      )
      .to(aboutMainText.words, {
        color: "white",
        stagger: 1,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: ".about-content",
          start: "top 80%",
          end: "bottom 70%",
          scrub: true,
        },
      });
  });
  return (
    <section className="about-section relative z-20 w-screen h-dvh md:pe-10 bg-black text-white">
      <div className="flex items-center flex-col md:flex-row gap-8 size-full relative">
        <div className="w-full md:w-2/3 relative">
          <div className="max-w-2xl h-screen">
            <Image
              src="/aboutUs.jpg"
              alt="Moroccan Architecture"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>

        <div className="absolute top-10 right-0 md:right-5">
          <h1 className="text-4xl font-light font-chango">A lil about us</h1>
        </div>

        <div
          className="w-full md:w-2/3 text-muted-foreground about-content flex flex-col items-center 
        absolute top-1/2 -translate-y-1/2 left-4 md:left-auto md:right-0 bg-black p-4 md:p-6 
        rounded-l-4xl md:rounded-4xl"
        >
          <p className="text-lg md:text-2xl xl:text-5xl font-semibold ">
            <span className="ps-28 md:ps-40 xl:ps-56">Where</span> your vision
            for the perfect home, investment, or commercial space comes to life.
            With years of experience in the dynamic world of real estate,
            we&apos;ve proudly built a reputation of excellence.
          </p>

          <p className="mt-2 px-10 text-xs md:text-sm xl:text-lg">
            Our journey began with a simple goal in mind: to redefine the real
            estate experience by focusing on the unique needs and aspirations of
            our clients. We understand that real estate transactions are more
            than just financial investments - they are personal milestones
          </p>

          <Button
            variant="default"
            className="flex items-center gap-2 self-start ms-10 mt-4 rounded-full px-6 py-4 font-semibold bg-[#0ACDFF]/80"
          >
            Learn More
            <ArrowRightIcon size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
