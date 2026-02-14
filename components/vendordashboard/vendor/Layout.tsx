"use client";
import { Calendar, Settings } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Vendorheader from "../vendorheader/Vendorheader";
import Sidebar from "../vendorsidebar/Sidebar";
import PanditDashboard from "../vendor-panels/PanditDashboard";
import AmbulanceDashboard from "../vendor-panels/AmbulanceDashboard";

export default function VendorDashboard() {
  const { role, user, vendorCategory, logout, isLoading } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedVendorCategory = localStorage.getItem("vendorCategory");

    if (!isLoading) {
      if (role === "vendor" || storedRole === "vendor") {
        setIsAuthorized(true);
      } else {
        router.replace("/vendorlogin?redirect=vendordashboardpage");
      }
    }
  }, [role, router]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/vendorlogin");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-sm text-gray-600 font-medium">
            Verifying your credentials...
          </p>
        </div>
      </div>
    );
  }

  if (role !== "vendor" && localStorage.getItem("role") !== "vendor") {
    return null;
  }

  const currentVendorCategory =
    vendorCategory || localStorage.getItem("vendorCategory") || "pandit";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 relative">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleLogout={handleLogout}
        vendorCategory={currentVendorCategory}
        userName={user?.name || "Vendor"}
      />

      <div
        className={`transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:ml-72" : "ml-0"
        }`}
      >
        <Vendorheader
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          userName={user?.name || "Vendor"}
          vendorCategory={currentVendorCategory}
        />

        <main className="p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === "dashboard" && (
              <>
                {currentVendorCategory === "pandit" && <PanditDashboard />}
                {currentVendorCategory === "ambulance" && (
                  <AmbulanceDashboard />
                )}
              </>
            )}
            {activeTab === "bookings" && (
              <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 text-center border">
                <Calendar className="h-16 w-16 text-amber-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Bookings Coming Soon
                </h3>
                <p className="text-gray-600">
                  Your booking management system is being set up.
                </p>
              </div>
            )}
            {activeTab === "settings" && (
              <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 text-center border">
                <Settings className="h-16 w-16 text-amber-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Settings Coming Soon
                </h3>
                <p className="text-gray-600">
                  You'll be able to manage your profile settings here.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
