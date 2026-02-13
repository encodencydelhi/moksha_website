"use client";

import React from "react";
import { Menu, Truck, Briefcase, Bell } from "lucide-react";

interface Props {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  userName?: string;
  vendorCategory: string | null;
}

export default function VendorHeader({
  toggleSidebar,
  isSidebarOpen,
  userName,
  vendorCategory,
}: Props) {
  const isAmbulance = vendorCategory === "ambulance";

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b shadow-sm">
      <div className="px-3 sm:px-4 md:px-5 lg:px-6 h-14 sm:h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleSidebar}
            className="p-2 sm:p-2.5 rounded-lg hover:bg-gray-100 transition-all duration-200 lg:hover:scale-105"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
          </button>

          <div className="hidden xs:block">
            <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {isAmbulance ? "Emergency Response" : "Sacred Services"}
            </h1>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
              {isAmbulance ? "Live • 3 active" : "Today • 5 pooja"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <button className="relative p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
            <span className="absolute top-1 right-1.5 sm:top-1.5 sm:right-1.5 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#8B6A3E] animate-pulse" />
          </button>

          <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl">
            <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg bg-[#8B6A3E]/10 flex items-center justify-center transition-transform hover:scale-105">
              {isAmbulance ? (
                <Truck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#8B6A3E]" />
              ) : (
                <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#8B6A3E]" />
              )}
            </div>

            <div className="hidden md:block">
              <p className="text-xs sm:text-sm font-semibold text-gray-900">
                {userName || "Vendor"}
              </p>
              <p className="text-[10px] sm:text-xs capitalize text-gray-500">
                {vendorCategory || "Partner"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
