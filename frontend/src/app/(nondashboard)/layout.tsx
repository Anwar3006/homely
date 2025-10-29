"use client";
import GsapScrollProvider from "@/components/GsapScrollProvider";
import { PageLoader } from "@/components/Loader";
import Navbar from "@/components/Navbar";
import useUserAuth from "@/hooks/api/useUserAuth.hook";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const NonDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: userData, isPending } = useUserAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(true);

  const userRole = userData?.data?.userRole;

  useEffect(() => {
    if (userRole) {
      if (
        (userRole === "manager" && pathname.startsWith("/search")) ||
        (userRole === "manager" && pathname === "/")
      ) {
        router.push("/managers/properties", { scroll: false });
      } else {
        setIsLoading(false);
      }
    }
  }, [userRole, router, pathname]);

  if (isLoading || isPending) {
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
