"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { vendorRegistry } from "@/types/vendorRegistry";
import Sidebar from "../vendorsidebar/Sidebar";
import VendorHeader from "../vendorheader/Vendorheader";
import DashboardRenderer from "../vendor-panels/DashboardRenderer";

export default function VendorLayout() {
  const { vendorCategory, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!vendorCategory || !user) {
    return null;
  }

  const vendorConfig = vendorRegistry[vendorCategory];

  if (!vendorConfig) {
    return <div>No config found for {vendorCategory}</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#F5F5F5",
        overflow: "hidden",
      }}
    >
      <Sidebar
        config={vendorConfig}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          marginLeft: isMobile ? 0 : sidebarOpen ? "280px" : "80px",
          transition: "margin-left 0.3s ease",
          width: "100%",
        }}
      >
        <VendorHeader
          config={vendorConfig}
          user={user}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        <main
          style={{
            flex: 1,
            padding: isMobile ? "16px" : "24px",
            overflow: "auto",
          }}
        >
          <DashboardRenderer config={vendorConfig} />
        </main>
      </div>
    </div>
  );
}
