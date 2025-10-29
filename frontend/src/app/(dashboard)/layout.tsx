import Navbar from "@/components/Navbar";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import React from "react";

const DashboardLayout = () => {
  return (
    <div className="min-h-dvh w-full bg-zinc-50">
      <Navbar />
      <div className="" style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}>
        <main className="flex">
          <CustomSidebar />
          <div className="grow transition-all duration-300">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
