"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from "../vendorsidebar/Sidebar";
import VendorHeader from "../vendorheader/Vendorheader";
import PanditDashboard from "../vendor-panels/PanditDashboard";
import AmbulanceDashboard from "../vendor-panels/AmbulanceDashboard";

export default function VendorDashboard() {
  const { user, vendorCategory, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      // The redirect should be handled in your logout function
      // If not, uncomment the line below
      // router.push('/login');
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };

  // Show loading state while logging out
  if (isLoggingOut) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#8B6A3E]/5 to-[#6B4F2E]/5 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            {/* Animated circles */}
            <div className="w-24 h-24 border-4 border-[#8B6A3E]/20 border-t-[#8B6A3E] rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                <span className="text-2xl">🕉️</span>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Logging out...
          </h2>
          <p className="text-gray-600">
            Please wait while we securely log you out
          </p>
        </div>
      </div>
    );
  }

  // Don't render dashboard if no user (prevents flash of dashboard during logout)
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#8B6A3E]/5 to-[#6B4F2E]/5 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 border-4 border-[#8B6A3E]/20 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-4xl">👋</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            See you soon!
          </h2>
          <p className="text-gray-600 mb-4">
            You have been successfully logged out
          </p>
          <button
            onClick={() => router.push("/login")}
            className="px-6 py-3 bg-[#8B6A3E] text-white rounded-lg hover:bg-[#6B4F2E] transition-colors shadow-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab="dashboard"
        setActiveTab={() => {}}
        handleLogout={handleLogout}
        vendorCategory={vendorCategory}
        userName={user?.name}
        isLoggingOut={isLoggingOut}
      />

      <div
        className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}
      >
        <VendorHeader
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          isSidebarOpen={sidebarOpen}
          userName={user?.name}
          vendorCategory={vendorCategory}
        />

        <main className="p-4 sm:p-5 md:p-6">
          {vendorCategory === "pandit" && <PanditDashboard />}
          {vendorCategory === "ambulance" && <AmbulanceDashboard />}
        </main>
      </div>
    </div>
  );
}
