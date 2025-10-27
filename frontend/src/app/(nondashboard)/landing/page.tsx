import React from "react";
import HeroSection from "./_components/HeroSection";
import FeaturedListingsSection from "./_components/FeaturedListingsSection";
import AboutUsSection from "./_components/AboutUsSection";
import PlatformWorksSection from "./_components/PlatformWorksSection";
import TestimonialSection from "./_components/TestimonialSection";
import FooterSection from "./_components/FooterSection";

const LandingPage = () => {
  return (
    <section className="relative bg-black">
      <HeroSection />
      <AboutUsSection />
      <FeaturedListingsSection />
      <PlatformWorksSection />
      <TestimonialSection />
      <FooterSection />
    </section>
  );
};

export default LandingPage;
