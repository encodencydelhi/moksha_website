"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { vendorRegistry } from "@/types/vendorRegistry";
import Sidebar from "../vendorsidebar/Sidebar";
import VendorHeader from "../vendorheader/Vendorheader";
import DashboardRenderer from "../vendor-panels/DashboardRenderer";

export default function VendorLayout() {
  const { vendorCategory, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!vendorCategory || !user) {
    return null;
  }
  const vendorConfig = vendorRegistry[vendorCategory];
  console.log("VendorLayout - vendorConfig:", vendorConfig);

  if (!vendorConfig) {
    return <div>No config found for {vendorCategory}</div>;
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: "#F5F5F5" }}>
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
          marginLeft: sidebarOpen ? "280px" : "80px",
          transition: "margin-left 0.3s ease",
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
            padding: "24px",
            overflow: "auto",
          }}
        >
          <DashboardRenderer config={vendorConfig} />
        </main>
      </div>
    </div>
  );
}
