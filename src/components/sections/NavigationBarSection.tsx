"use client";

import {
  LayoutGridIcon,
  LineChartIcon,
  LogOutIcon,
  MessageSquareIcon,
  UtensilsIcon,
} from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// Navigation items data (Food Diary removed)
const navigationItems = [
  {
    icon: <LayoutGridIcon className="w-5 h-5" />,
    label: "Home",
    active: false,
    badge: null,
    path: "/dashboard",
  },
  {
    icon: <MessageSquareIcon className="w-5 h-5" />,
    label: "Feedback",
    active: false,
    badge: "6",
    path: "/feedback",
  },
  {
    icon: <UtensilsIcon className="w-5 h-5" />,
    label: "Meal Plan",
    active: false,
    badge: null,
    path: "/mealplan",
  },
  {
    icon: <LineChartIcon className="w-5 h-5" />,
    label: "Progress",
    active: false,
    badge: null,
    path: "/progress",
  },
];

export function NavigationBarSection() {
  const router = useRouter();

  // Logout handler: perform logout then route to /auth.
  // Add your logout logic (e.g. supabase.auth.signOut()) here if needed.
  const handleLogout = () => {
    // Example: await supabase.auth.signOut();
    router.push("/auth");
  };

  return (
    <nav className="flex flex-row md:flex-col w-full md:w-[223px] items-start gap-7 px-4 md:px-5 py-4 md:py-7 relative bg-white overflow-x-auto md:overflow-x-visible">
      {/* App Logo/Title */}
      <div className="hidden md:flex flex-col items-start gap-2.5 px-2 py-[9px] relative self-stretch w-full">
        <div className="relative self-stretch w-full h-8">
          <div className="absolute top-1 left-[38px] font-semibold text-purple-600 text-xl tracking-normal leading-6 whitespace-nowrap">
            Nutrilift
          </div>
        </div>
      </div>

      {/* Navigation Menu Items */}
      <div className="flex flex-row md:flex-col items-start gap-2 relative flex-1 w-full">
        {navigationItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            onClick={() => router.push(item.path)}
            className={`flex items-center justify-start gap-3 pl-4 pr-2 py-2.5 rounded-[14px] w-auto md:w-full ${
              item.active ? "bg-purple-100" : ""
            }`}
          >
            {item.icon &&
              React.cloneElement(item.icon, {
                className: `w-5 h-5 ${item.active ? "text-purple-600" : "text-gray-400"}`,
              })}
            <span
              className={`hidden md:inline font-medium ${
                item.active ? "text-purple-600" : "text-gray-400"
              } text-base tracking-normal leading-6 whitespace-nowrap`}
            >
              {item.label}
            </span>
            {item.badge && (
              <Badge className="ml-auto bg-orange text-white min-w-[18px] h-5 flex items-center justify-center rounded-full text-xs">
                {item.badge}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {/* Logout Button */}
      <Button
        variant="ghost"
        onClick={handleLogout}
        className="hidden md:flex bg-gray-50 items-center justify-start gap-3 pl-4 pr-2 py-2.5 w-full rounded-[14px]"
      >
        <LogOutIcon className="w-5 h-5 text-gray-400" />
        <span className="font-medium text-gray-400 text-base tracking-normal leading-6 whitespace-nowrap">
          Logout
        </span>
      </Button>
    </nav>
  );
}