"use client";
import GsapScrollProvider from "@/components/GsapScrollProvider";
import { PageLoader } from "@/components/Loader";
import Navbar from "@/components/Navbar";
import useUserAuth from "@/hooks/api/useUserAuth.hook";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import React from "react";

const NonDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: userData, isPending } = useUserAuth();

  console.log("User data: ", userData);

  if (isPending) {
    return <PageLoader />;
  }

  return (
    <GsapScrollProvider>
      <div>
        <Navbar />
        <main
          className={`size-full flex flex-col`}
          // style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}
        >
          {children}
        </main>
      </div>
    </GsapScrollProvider>
  );
};

export default NonDashboardLayout;
