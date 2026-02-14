"use client";

import {
  TrendingUp,
  Calendar,
  Clock,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  Users,
  FileText,
  DollarSign,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function DashboardRenderer({ config }: { config: any }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? "16px" : "24px",
      }}
    >
      {/* Welcome Banner */}
      <div
        style={{
          background: `linear-gradient(135deg, ${config.theme.primary} 0%, ${config.theme.secondary} 100%)`,
          borderRadius: isMobile ? "12px" : "16px",
          padding: isMobile ? "16px" : "24px",
          color: "#FFF",
        }}
      >
        <h1
          style={{
            fontSize: isMobile ? "18px" : "24px",
            margin: 0,
          }}
        >
          {isMobile ? "Welcome!" : `Welcome back, ${config.title}!`}
        </h1>
        <p
          style={{
            margin: "8px 0 0",
            opacity: 0.9,
            fontSize: isMobile ? "12px" : "14px",
          }}
        >
          {isMobile ? (
            <>
              {new Date().toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
              })}
            </>
          ) : (
            <>
              {config.subtitle} •{" "}
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </>
          )}
        </p>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "repeat(2, 1fr)"
            : "repeat(auto-fit, minmax(240px, 1fr))",
          gap: isMobile ? "12px" : "20px",
        }}
      >
        {config.stats
          .slice(0, isMobile ? 4 : config.stats.length)
          .map((stat: any, index: number) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                style={{
                  background: "#FFF",
                  borderRadius: isMobile ? "12px" : "16px",
                  padding: isMobile ? "12px" : "20px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        color: "#6B7280",
                        fontSize: isMobile ? "11px" : "13px",
                        margin: 0,
                      }}
                    >
                      {isMobile ? stat.title.split(" ")[0] : stat.title}
                    </p>
                    <h3
                      style={{
                        fontSize: isMobile ? "18px" : "28px",
                        margin: isMobile ? "4px 0" : "8px 0",
                        color: "#111",
                      }}
                    >
                      {stat.value}
                    </h3>
                    {stat.change !== undefined && !isMobile && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        {stat.change > 0 ? (
                          <ArrowUp size={14} color="#22C55E" />
                        ) : stat.change < 0 ? (
                          <ArrowDown size={14} color="#EF4444" />
                        ) : null}
                        <span
                          style={{
                            fontSize: "12px",
                            color:
                              stat.change > 0
                                ? "#22C55E"
                                : stat.change < 0
                                  ? "#EF4444"
                                  : "#6B7280",
                          }}
                        >
                          {Math.abs(stat.change)}%
                        </span>
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      width: isMobile ? 32 : 48,
                      height: isMobile ? 32 : 48,
                      borderRadius: isMobile ? "8px" : "12px",
                      background: `${stat.bgColor}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={isMobile ? 16 : 24} color={stat.bgColor} />
                  </div>
                </div>
                {stat.change !== undefined && isMobile && (
                  <p
                    style={{
                      margin: "8px 0 0",
                      fontSize: "10px",
                      color:
                        stat.change > 0
                          ? "#22C55E"
                          : stat.change < 0
                            ? "#EF4444"
                            : "#6B7280",
                    }}
                  >
                    {stat.change > 0 ? "↑" : stat.change < 0 ? "↓" : "→"}{" "}
                    {Math.abs(stat.change)}%
                  </p>
                )}
              </div>
            );
          })}
      </div>

      {/* Charts & Activity Grid - Stack on mobile */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr",
          gap: isMobile ? "16px" : "24px",
        }}
      >
        {/* Performance Chart Card */}
        <div
          style={{
            background: "#FFF",
            borderRadius: isMobile ? "12px" : "16px",
            padding: isMobile ? "16px" : "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: isMobile ? "14px" : "16px",
                fontWeight: 600,
              }}
            >
              {isMobile ? "Performance" : "Performance Overview"}
            </h3>
            <select
              style={{
                padding: isMobile ? "4px 8px" : "6px 12px",
                borderRadius: "6px",
                border: "1px solid #E5E7EB",
                fontSize: isMobile ? "11px" : "13px",
              }}
            >
              <option>Week</option>
              {!isMobile && <option>Month</option>}
              {!isMobile && <option>Year</option>}
            </select>
          </div>

          {/* Simple Bar Chart - Adjust for mobile */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: isMobile ? "4px" : "12px",
              height: isMobile ? "120px" : "200px",
            }}
          >
            {[65, 45, 75, 55, 85, 45, 70]
              .slice(0, isMobile ? 5 : 7)
              .map((value, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: isMobile ? `${value * 0.7}px` : `${value}px`,
                      background: config.theme.primary,
                      borderRadius: "4px 4px 0 0",
                      opacity: 0.7,
                    }}
                  />
                  <span
                    style={{
                      fontSize: isMobile ? "9px" : "11px",
                      marginTop: "8px",
                      color: "#6B7280",
                    }}
                  >
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i].slice(
                      0,
                      isMobile ? 1 : 3,
                    )}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Recent Activity Card */}
        <div
          style={{
            background: "#FFF",
            borderRadius: isMobile ? "12px" : "16px",
            padding: isMobile ? "16px" : "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: isMobile ? "14px" : "16px",
                fontWeight: 600,
              }}
            >
              Activity
            </h3>
            <button
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <MoreVertical size={isMobile ? 14 : 16} color="#6B7280" />
            </button>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? "12px" : "16px",
            }}
          >
            {config.recentActivity
              .slice(0, isMobile ? 3 : config.recentActivity.length)
              .map((activity: any) => (
                <div
                  key={activity.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? "8px" : "12px",
                    padding: isMobile ? "6px" : "8px",
                    borderRadius: "8px",
                    background: "#F9FAFB",
                  }}
                >
                  <div
                    style={{
                      width: isMobile ? 24 : 32,
                      height: isMobile ? 24 : 32,
                      borderRadius: "6px",
                      background:
                        activity.status === "completed"
                          ? "#22C55E20"
                          : activity.status === "pending"
                            ? "#F59E0B20"
                            : "#EF444420",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: isMobile ? "10px" : "12px",
                    }}
                  >
                    {activity.status === "completed"
                      ? "✓"
                      : activity.status === "pending"
                        ? "⏳"
                        : "🔄"}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        margin: 0,
                        fontSize: isMobile ? "11px" : "13px",
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {activity.title}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: "4px",
                        marginTop: "2px",
                        fontSize: isMobile ? "9px" : "11px",
                        color: "#6B7280",
                        flexWrap: "wrap",
                      }}
                    >
                      <span>{activity.time}</span>
                      {activity.amount && !isMobile && (
                        <span>• {activity.amount}</span>
                      )}
                    </div>
                  </div>
                  {!isMobile && (
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: "12px",
                        fontSize: "10px",
                        background:
                          activity.status === "completed"
                            ? "#22C55E20"
                            : activity.status === "pending"
                              ? "#F59E0B20"
                              : "#3B82F620",
                        color:
                          activity.status === "completed"
                            ? "#22C55E"
                            : activity.status === "pending"
                              ? "#F59E0B"
                              : "#3B82F6",
                      }}
                    >
                      {activity.status}
                    </span>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div
        style={{
          background: "#FFF",
          borderRadius: isMobile ? "12px" : "16px",
          padding: isMobile ? "16px" : "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <h3
          style={{
            margin: "0 0 12px",
            fontSize: isMobile ? "14px" : "16px",
            fontWeight: 600,
          }}
        >
          Quick Actions
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "repeat(2, 1fr)"
              : "repeat(4, auto)",
            gap: isMobile ? "8px" : "12px",
          }}
        >
          <button style={quickActionStyle(isMobile)}>
            <Calendar size={isMobile ? 14 : 16} color={config.theme.primary} />
            {isMobile ? "Book" : "New Booking"}
          </button>
          <button style={quickActionStyle(isMobile)}>
            <Users size={isMobile ? 14 : 16} color={config.theme.primary} />
            {isMobile ? "Client" : "Add Client"}
          </button>
          <button style={quickActionStyle(isMobile)}>
            <FileText size={isMobile ? 14 : 16} color={config.theme.primary} />
            {isMobile ? "Report" : "Generate Report"}
          </button>
          <button style={quickActionStyle(isMobile)}>
            <DollarSign
              size={isMobile ? 14 : 16}
              color={config.theme.primary}
            />
            {isMobile ? "Earnings" : "View Earnings"}
          </button>
        </div>
      </div>
    </div>
  );
}

const quickActionStyle = (isMobile: boolean) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: isMobile ? "center" : "flex-start",
  gap: "8px",
  padding: isMobile ? "8px" : "8px 16px",
  background: "#F3F4F6",
  border: "none",
  borderRadius: "8px",
  fontSize: isMobile ? "11px" : "13px",
  color: "#374151",
  cursor: "pointer",
  transition: "background 0.2s",
  width: "100%",
});
