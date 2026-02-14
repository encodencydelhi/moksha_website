"use client";

import { useState } from "react";
import {
  Bell,
  Search,
  Menu,
  ChevronDown,
  Settings,
  User as UserIcon,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function VendorHeader({ config, user, onMenuClick }: any) {
  const { logout } = useAuth();
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Debug
  console.log("VendorHeader received:", { config, user });

  if (!config) {
    return (
      <div
        style={{
          height: 80,
          background: "#FFF",
          borderBottom: "1px solid #E5E7EB",
        }}
      />
    );
  }

  const unreadCount =
    config.notifications?.filter((n: any) => !n.read).length || 0;

  const handleLogout = () => {
    logout();
    router.replace("/vendorlogin");
  };

  return (
    <header
      style={{
        background: "#FFF",
        padding: "16px 24px",
        borderBottom: "1px solid #E5E7EB",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        height: "80px",
      }}
    >
      {/* Left Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button
          onClick={onMenuClick}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#4B5563",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Menu size={24} />
        </button>

        {/* Search Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#F3F4F6",
            borderRadius: "8px",
            padding: "8px 16px",
            width: "320px",
          }}
        >
          <Search size={18} color="#9CA3AF" />
          <input
            type="text"
            placeholder="Search..."
            style={{
              border: "none",
              background: "none",
              marginLeft: "8px",
              outline: "none",
              width: "100%",
              fontSize: "14px",
            }}
          />
        </div>
      </div>

      {/* Right Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {/* Notifications */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <Bell size={20} color="#4B5563" />
            {unreadCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -5,
                  right: -5,
                  background: config.theme?.primary || "#8B6A3E",
                  color: "#FFF",
                  fontSize: "10px",
                  padding: "2px 4px",
                  borderRadius: "10px",
                  minWidth: "16px",
                  textAlign: "center",
                }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div
              style={{
                position: "absolute",
                top: "40px",
                right: 0,
                width: "320px",
                background: "#FFF",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                zIndex: 100,
                border: "1px solid #E5E7EB",
              }}
            >
              <div
                style={{ padding: "16px", borderBottom: "1px solid #E5E7EB" }}
              >
                <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>
                  Notifications
                </h3>
              </div>
              <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                {config.notifications?.map((notif: any) => (
                  <div
                    key={notif.id}
                    style={{
                      padding: "12px 16px",
                      borderBottom: "1px solid #F3F4F6",
                      background: notif.read ? "#FFF" : "#FEF3C7",
                      cursor: "pointer",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: "13px",
                        fontWeight: notif.read ? 400 : 500,
                      }}
                    >
                      {notif.message}
                    </p>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#6B7280",
                        marginTop: "4px",
                        display: "block",
                      }}
                    >
                      {notif.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowProfile(!showProfile)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: config.theme?.primary || "#8B6A3E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFF",
                fontWeight: 600,
              }}
            >
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div style={{ textAlign: "left" }}>
              <p style={{ margin: 0, fontSize: "14px", fontWeight: 500 }}>
                {user?.name || "User"}
              </p>
              <p style={{ margin: 0, fontSize: "11px", color: "#6B7280" }}>
                {config.id?.replace("_", " ") || "Vendor"}
              </p>
            </div>
            <ChevronDown size={16} color="#6B7280" />
          </button>

          {/* Profile Dropdown */}
          {showProfile && (
            <div
              style={{
                position: "absolute",
                top: "50px",
                right: 0,
                width: "200px",
                background: "#FFF",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                zIndex: 100,
                border: "1px solid #E5E7EB",
              }}
            >
              <button style={dropdownItemStyle}>
                <UserIcon size={16} /> Profile
              </button>
              <button style={dropdownItemStyle}>
                <Settings size={16} /> Settings
              </button>
              <hr
                style={{
                  margin: "8px 0",
                  border: "none",
                  borderTop: "1px solid #E5E7EB",
                }}
              />
              <button
                style={{ ...dropdownItemStyle, color: "#FF4D4F" }}
                onClick={handleLogout}
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

const dropdownItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "10px 16px",
  width: "100%",
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "13px",
  color: "#374151",
  transition: "background 0.2s",
  textAlign: "left" as const,
};
