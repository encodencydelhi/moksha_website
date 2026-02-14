"use client";

import React from "react";
import {
  Home,
  Calendar,
  Settings,
  LogOut,
  Truck,
  User,
  Car,
  Building2,
  MapPin,
  Package,
  Flame,
  Heart,
  Tent,
  Users,
  Utensils,
  FileText,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleLogout: () => void;
  vendorCategory: string | null;
  userName?: string;
  isLoggingOut?: boolean;
}

export default function Sidebar({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  handleLogout,
  vendorCategory,
  userName,
  isLoggingOut = false,
}: Props) {
  const getCategoryIcon = () => {
    switch (vendorCategory) {
      case "ambulance_service":
        return { icon: Truck, name: "Ambulance" };
      case "pandit_purohit":
        return { icon: User, name: "Pandit" };
      case "body_transport":
        return { icon: Car, name: "Body Transport" };
      case "freezer_box":
        return { icon: Building2, name: "Freezer Box" };
      case "shamshan_ghat":
        return { icon: MapPin, name: "Shamshan Ghat" };
      case "samagri_supplies":
        return { icon: Package, name: "Pooja Samagri" };
      case "wood_supply":
        return { icon: Flame, name: "Wood Supplier" };
      case "flower_garland":
        return { icon: Heart, name: "Flower & Garland" };
      case "tent_seating":
        return { icon: Tent, name: "Tent & Seating" };
      case "bhajan_mandali":
        return { icon: Users, name: "Bhajan Mandali" };
      case "catering":
        return { icon: Utensils, name: "Catering" };
      case "documentation_help":
        return { icon: FileText, name: "Documentation" };
      default:
        return { icon: Home, name: "Vendor" };
    }
  };

  const category = getCategoryIcon();
  const CategoryIcon = category.icon;

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "bookings", label: "Bookings", icon: Calendar },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full bg-white shadow-2xl z-50
          transition-all duration-300 ease-in-out
          ${isOpen ? "w-64" : "w-20"}
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          flex flex-col
        `}
      >
        {/* Header with Toggle */}
        <div className="h-14 bg-gradient-to-r from-[#8B6A3E]/10 to-[#8B6A3E]/5 border-b flex items-center justify-between px-3">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="min-w-[36px] h-9 rounded-lg bg-[#8B6A3E] flex items-center justify-center shadow-md shadow-[#8B6A3E]/20 flex-shrink-0">
              <CategoryIcon className="h-4 w-4 text-white" />
            </div>
            {isOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-gray-900 truncate">
                  {category.name}
                </p>
                <p className="text-[8px] text-gray-600 truncate">
                  {vendorCategory?.replace("_", " ") || "Partner"}
                </p>
              </div>
            )}
          </div>

          {/* Toggle Button */}
          <button
            onClick={onClose}
            className="hidden lg:flex p-1.5 rounded-lg hover:bg-[#8B6A3E]/10 transition-colors text-[#8B6A3E]"
          >
            {isOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* User Info - Only show when sidebar is open */}
        {userName && isOpen && (
          <div className="px-3 py-2 border-b bg-gray-50">
            <p className="text-[8px] text-gray-500 uppercase tracking-wider">
              Logged in as
            </p>
            <p className="text-xs font-semibold text-gray-900 truncate">
              {userName}
            </p>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
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
                disabled={isLoggingOut}
                className={`
                  w-full flex items-center gap-3 px-3 py-2 rounded-lg
                  transition-all duration-200 group relative
                  ${isOpen ? "justify-start" : "justify-center"}
                  ${
                    isActive
                      ? "bg-[#8B6A3E]/10 text-[#8B6A3E]"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                  ${isLoggingOut ? "opacity-50 cursor-not-allowed" : ""}
                `}
                title={!isOpen ? item.label : ""}
              >
                <Icon
                  className={`
                  h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110
                  ${isActive ? "text-[#8B6A3E]" : "text-gray-500"}
                `}
                />
                {isOpen && (
                  <>
                    <span className="text-xs font-medium flex-1 text-left">
                      {item.label}
                    </span>
                    {isActive && (
                      <span className="w-1 h-1 rounded-full bg-[#8B6A3E]" />
                    )}
                  </>
                )}

                {/* Tooltip for collapsed state */}
                {!isOpen && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-2 border-t bg-gray-50">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`
              w-full flex items-center gap-3 px-3 py-2 rounded-lg
              transition-all duration-200 group relative
              ${isOpen ? "justify-start" : "justify-center"}
              ${
                isLoggingOut
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-[#8B6A3E] hover:bg-[#8B6A3E]/10"
              }
            `}
            title={!isOpen ? "Logout" : ""}
          >
            {isLoggingOut ? (
              <Loader2 className="h-4 w-4 animate-spin flex-shrink-0" />
            ) : (
              <LogOut className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
            )}
            {isOpen && (
              <span className="text-xs font-medium">
                {isLoggingOut ? "Logging out..." : "Logout"}
              </span>
            )}

            {/* Tooltip for collapsed state */}
            {!isOpen && !isLoggingOut && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
                Logout
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
