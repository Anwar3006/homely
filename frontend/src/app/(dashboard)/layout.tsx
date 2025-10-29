"use client";
import CustomSidebar from "@/components/CustomSidebar";
import { PageLoader } from "@/components/Loader";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useUserAuth } from "@/hooks/api/useUserAuth.hook";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: userData, isPending } = useUserAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(true);

  const userRole = userData?.data?.userRole;

  useEffect(() => {
    if (userRole) {
      if (
        (userRole === "manager" && pathname.startsWith("/tenants")) ||
        (userRole === "tenant" && pathname.startsWith("/managers"))
      ) {
        router.push(
          userRole === "manager"
            ? "/managers/properties"
            : "/tenants/favorites",
          { scroll: false }
        );
      } else {
        setIsLoading(false);
      }
    }
  }, [userRole, router, pathname]);

  if (isLoading || isPending) {
    return <PageLoader />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-dvh w-full bg-gray-100">
        <Navbar />
        <div className="" style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}>
          <main className="flex">
            <CustomSidebar
              userType={userRole === "manager" ? "manager" : "tenant"}
            />
            <div className="grow transition-all duration-300">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
