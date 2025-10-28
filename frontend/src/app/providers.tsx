"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { Authenticator } from "@aws-amplify/ui-react";
import Auth from "./(auth)/authProvider";

const queryClient = new QueryClient();
// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const Providers = ({ children }: { children: React.ReactNode }) => {
  useGSAP(() => {
    if (typeof window === "undefined") return;
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 3,
      effects: true,
      smoothTouch: 0.1,
    });
  });
  return (
    <QueryClientProvider client={queryClient}>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Authenticator.Provider>
            <Auth>
              {children}
              <Toaster position="bottom-right" />
            </Auth>
          </Authenticator.Provider>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default Providers;
