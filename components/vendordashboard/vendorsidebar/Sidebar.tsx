"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";

export default function Sidebar({ config, isOpen, onToggle }: any) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setMobileOpen(false);
      } else {
        setMobileOpen(isOpen);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [isOpen]);

  // Handle mobile toggle
  const handleToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      onToggle();
    }
  };

  // Determine if sidebar should be visible
  const isVisible = isMobile ? mobileOpen : true;
  const sidebarWidth = isMobile ? (mobileOpen ? 280 : 0) : isOpen ? 280 : 80;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 40,
          }}
        />
      )}

      {/* Mobile Menu Button (for small screens) */}
      {isMobile && !mobileOpen && (
        <button
          onClick={() => setMobileOpen(true)}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: config.theme.primary,
            color: "#FFF",
            border: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            cursor: "pointer",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
          }}
        >
          ☰
        </button>
      )}

      {/* Sidebar */}
      <aside
        style={{
          position: isMobile ? "fixed" : "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          width: sidebarWidth,
          background: "#1A1A1A",
          color: "#FFF",
          transition: "width 0.3s ease, transform 0.3s ease",
          overflow: "hidden",
          boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
          zIndex: 50,
          transform: isMobile && !mobileOpen ? "translateX(-100%)" : "none",
        }}
      >
        {/* Logo Area */}
        <div
          style={{
            height: 80,
            padding: (isMobile ? mobileOpen : isOpen) ? "24px" : "24px 16px",
            borderBottom: "1px solid #333",
            display: "flex",
            alignItems: "center",
            justifyContent: (isMobile ? mobileOpen : isOpen)
              ? "space-between"
              : "center",
          }}
        >
          {(isMobile ? mobileOpen : isOpen) ? (
            <>
              <div>
                <h2
                  style={{
                    color: config.theme.primary,
                    margin: 0,
                    fontSize: isMobile ? "16px" : "18px",
                    fontWeight: 600,
                  }}
                >
                  {isMobile ? config.title.split(" ")[0] : config.title}
                </h2>
                {!isMobile && (
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#888",
                      margin: "4px 0 0",
                    }}
                  >
                    {config.subtitle}
                  </p>
                )}
              </div>
              <button
                onClick={handleToggle}
                style={{
                  background: "none",
                  border: "none",
                  color: "#888",
                  cursor: "pointer",
                }}
              >
                {isMobile ? "✕" : <ChevronLeft size={20} />}
              </button>
            </>
          ) : (
            <button
              onClick={handleToggle}
              style={{
                background: "none",
                border: "none",
                color: "#888",
                cursor: "pointer",
              }}
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>

        {/* Navigation Menu */}
        <nav
          style={{
            flex: 1,
            padding: isMobile ? "12px" : "16px",
            overflowY: "auto",
            height: "calc(100vh - 160px)",
          }}
        >
          {config.menu.map((item: any) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                href={item.path}
                onClick={() => isMobile && setMobileOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: (isMobile ? mobileOpen : isOpen)
                    ? "12px 16px"
                    : "12px 0",
                  margin: "4px 0",
                  borderRadius: "8px",
                  textDecoration: "none",
                  color: isActive ? config.theme.primary : "#FFF",
                  background: isActive ? "#333" : "transparent",
                  transition: "all 0.2s",
                  justifyContent: (isMobile ? mobileOpen : isOpen)
                    ? "flex-start"
                    : "center",
                  position: "relative",
                }}
              >
                <Icon size={isMobile ? 18 : 20} />
                {(isMobile ? mobileOpen : isOpen) && (
                  <>
                    <span
                      style={{ flex: 1, fontSize: isMobile ? "13px" : "14px" }}
                    >
                      {item.label}
                    </span>
                    {item.badge && (
                      <span
                        style={{
                          background: config.theme.primary,
                          color: "#FFF",
                          fontSize: "10px",
                          padding: "2px 6px",
                          borderRadius: "12px",
                          minWidth: "20px",
                          textAlign: "center",
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
                {!(isMobile ? mobileOpen : isOpen) && item.badge && (
                  <span
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      background: config.theme.primary,
                      color: "#FFF",
                      fontSize: "9px",
                      padding: "2px 4px",
                      borderRadius: "8px",
                      minWidth: "14px",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        {(isMobile ? mobileOpen : isOpen) && (
          <div
            style={{
              padding: isMobile ? "12px" : "16px",
              borderTop: "1px solid #333",
            }}
          >
            <button
              onClick={() => {
                logout();
                isMobile && setMobileOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                width: "100%",
                background: "none",
                border: "none",
                color: "#FF4D4F",
                cursor: "pointer",
                borderRadius: "8px",
                fontSize: isMobile ? "13px" : "14px",
              }}
            >
              <LogOut size={isMobile ? 18 : 20} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
