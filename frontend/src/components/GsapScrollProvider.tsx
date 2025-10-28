"use client";
import React from "react";
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const GsapScrollProvider = ({ children }: { children: React.ReactNode }) => {
  useGSAP(() => {
    if (typeof window === "undefined") return;
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 3,
      effects: true,
      smoothTouch: 0.1,
    });
    return () => {
      smoother.kill();
    };
  });

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
};

export default GsapScrollProvider;
