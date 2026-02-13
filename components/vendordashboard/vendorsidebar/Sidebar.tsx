"use client";

import React from "react";
import {
  Home,
  Calendar,
  Settings,
  LogOut,
  Truck,
  Briefcase,
  X,
} from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleLogout: () => void;
  vendorCategory: string | null;
  userName?: string;
}

export default function Sidebar({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  handleLogout,
  vendorCategory,
  userName,
}: Props) {
  const isAmbulance = vendorCategory === "ambulance";

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "bookings", label: "Bookings", icon: Calendar },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const themeColor = "#8B6A3E";

  return (
    <>
      <aside
        className={`
        fixed top-0 left-0 h-full w-64 sm:w-72 bg-white shadow-2xl z-40
        transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        flex flex-col
      `}
      >
        <div className="h-16 sm:h-20 bg-gradient-to-r from-[#8B6A3E]/10 to-[#8B6A3E]/5 border-b flex items-center justify-between px-4 sm:px-5">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl bg-[#8B6A3E] flex items-center justify-center shadow-lg shadow-[#8B6A3E]/20">
              {isAmbulance ? (
                <Truck className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              ) : (
                <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              )}
            </div>
            <div>
              <p className="text-sm sm:text-base font-bold text-gray-900">
                {isAmbulance ? "MediSwift" : "PoojaPath"}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5">
                {isAmbulance ? "Ambulance Partner" : "Pandit Partner"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 sm:p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
          </button>
        </div>

        {userName && (
          <div className="px-4 sm:px-5 py-3 sm:py-4 border-b bg-gray-50">
            <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">
              Logged in as
            </p>
            <p className="text-xs sm:text-sm font-semibold text-gray-900 mt-0.5 sm:mt-1 truncate">
              {userName}
            </p>
          </div>
        )}

        <nav className="flex-1 p-3 sm:p-4 space-y-1 sm:space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`
                  w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl
                  transition-all duration-200 group
                  ${
                    isActive
                      ? "bg-[#8B6A3E]/10 text-[#8B6A3E] shadow-sm"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                <Icon
                  className={`
                  h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:scale-110
                  ${isActive ? "text-[#8B6A3E]" : "text-gray-500"}
                `}
                />
                <span className="text-xs sm:text-sm font-medium">
                  {item.label}
                </span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#8B6A3E]" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-3 sm:p-4 border-t bg-gray-50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-[#8B6A3E] hover:bg-[#8B6A3E]/10 transition-all duration-200 font-medium group"
          >
            <LogOut className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:scale-110" />
            <span className="text-xs sm:text-sm">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
