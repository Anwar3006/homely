"use client";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import {
  Building,
  FileText,
  Heart,
  Home,
  MenuSquare,
  Settings,
  X,
} from "lucide-react";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";

const CustomSidebar = ({ userType }: AppSidebarProps) => {
  const pathname = usePathname();
  const { toggleSidebar, open } = useSidebar();

  const navlinks =
    userType === "manager"
      ? [
          {
            icon: Building,
            label: "Properties",
            href: "/managers/properties",
          },
          {
            icon: FileText,
            label: "Applications",
            href: "/managers/applications",
          },
          {
            icon: Settings,
            label: "Settings",
            href: "/managers/settings",
          },
        ]
      : [
          {
            icon: Heart,
            label: "Favorites",
            href: "/tenants/favorites",
          },
          {
            icon: FileText,
            label: "Applications",
            href: "/tenants/applications",
          },
          {
            icon: Home,
            label: "Residences",
            href: "/tenants/residences",
          },
          {
            icon: Settings,
            label: "Settings",
            href: "/tenants/settings",
          },
        ];
  return (
    <Sidebar
      collapsible="icon"
      className="fixed left-0 bg-white shadow-lg"
      style={{
        top: `${NAVBAR_HEIGHT}px`,
        height: `caclc(100vh - ${NAVBAR_HEIGHT}px)`,
      }}
    >
      <SidebarHeader className="flex items-center">
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              className={cn(
                "flex min-h-14 w-full items-center pt-3 mb-3",
                open ? "justify-between px-4" : "justify-center"
              )}
            >
              {open ? (
                <>
                  <h1 className="font-chango">
                    {userType === "manager" ? "Manager View" : "Renter View"}
                  </h1>
                  <Button
                    type="button"
                    variant={"ghost"}
                    className="hover:bg-zinc-200 rounded-lg"
                    onClick={() => toggleSidebar()}
                  >
                    <X className="h-6 w-6 text-gray-600" />
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  variant={"ghost"}
                  className="hover:bg-zinc-200 rounded-lg"
                  onClick={() => toggleSidebar()}
                >
                  <MenuSquare className="h-6 w-6 text-gray-600" />
                </Button>
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navlinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "flex items-center px-5 py-7",
                    isActive
                      ? "bg-[#0ACDFF]/30 font-chango hover:bg-[#0ACDFF]/50"
                      : "text-zinc-700",
                    open ? "text-red-500" : "ml-[5px]"
                  )}
                >
                  <Link href={link.href} className="w-full" scroll={false}>
                    <div className="flex items-center gap-3">
                      <link.icon
                        className={`h-5 w-5 ${
                          isActive ? "text-blue-600" : "text-gray-600"
                        }`}
                      />
                      <span
                        className={`font-medium ${
                          isActive ? "text-blue-600" : "text-gray-600"
                        }`}
                      >
                        {link.label}
                      </span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default CustomSidebar;
