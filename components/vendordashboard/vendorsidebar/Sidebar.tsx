"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react"; // ← LogOut yahan bhi sahi hai
import { useAuth } from "@/context/AuthContext";

export default function Sidebar({ config, isOpen, onToggle }: any) {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        width: isOpen ? 280 : 80,
        background: "#1A1A1A",
        color: "#FFF",
        transition: "width 0.3s ease",
        overflow: "hidden",
        boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
        zIndex: 50,
      }}
    >
      {/* Logo Area */}
      <div
        style={{
          height: 80,
          padding: isOpen ? "24px" : "24px 16px",
          borderBottom: "1px solid #333",
          display: "flex",
          alignItems: "center",
          justifyContent: isOpen ? "space-between" : "center",
        }}
      >
        {isOpen ? (
          <>
            <div>
              <h2
                style={{
                  color: config.theme.primary,
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: 600,
                }}
              >
                {config.title}
              </h2>
              <p style={{ fontSize: "12px", color: "#888", margin: "4px 0 0" }}>
                {config.subtitle}
              </p>
            </div>
            <button
              onClick={onToggle}
              style={{
                background: "none",
                border: "none",
                color: "#888",
                cursor: "pointer",
              }}
            >
              <ChevronLeft size={20} />
            </button>
          </>
        ) : (
          <button
            onClick={onToggle}
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
          padding: "16px",
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
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: isOpen ? "12px 16px" : "12px 0",
                margin: "4px 0",
                borderRadius: "8px",
                textDecoration: "none",
                color: isActive ? config.theme.primary : "#FFF",
                background: isActive ? "#333" : "transparent",
                transition: "all 0.2s",
                justifyContent: isOpen ? "flex-start" : "center",
                position: "relative",
              }}
            >
              <Icon size={20} />
              {isOpen && (
                <>
                  <span style={{ flex: 1, fontSize: "14px" }}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <span
                      style={{
                        background: config.theme.primary,
                        color: "#FFF",
                        fontSize: "11px",
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
              {!isOpen && item.badge && (
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    background: config.theme.primary,
                    color: "#FFF",
                    fontSize: "10px",
                    padding: "2px 4px",
                    borderRadius: "8px",
                    minWidth: "16px",
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
      {isOpen && (
        <div
          style={{
            padding: "16px",
            borderTop: "1px solid #333",
          }}
        >
          <button
            onClick={logout}
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
              fontSize: "14px",
            }}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </aside>
  );
}
