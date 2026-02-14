"use client";

import {
  TrendingUp,
  Calendar,
  Clock,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  Users, // ← Add Users
  FileText, // ← Add FileText
  DollarSign, // ← Add DollarSign
} from "lucide-react";

export default function DashboardContent({ config }: { config: any }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Welcome Banner */}
      <div
        style={{
          background: `linear-gradient(135deg, ${config.theme.primary} 0%, ${config.theme.secondary} 100%)`,
          borderRadius: "16px",
          padding: "24px",
          color: "#FFF",
        }}
      >
        <h1 style={{ fontSize: "24px", margin: 0 }}>
          Welcome back, {config.title}!
        </h1>
        <p style={{ margin: "8px 0 0", opacity: 0.9 }}>
          {config.subtitle} •{" "}
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
        }}
      >
        {config.stats.map((stat: any, index: number) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              style={{
                background: "#FFF",
                borderRadius: "16px",
                padding: "20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                transition: "transform 0.2s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                }}
              >
                <div>
                  <p style={{ color: "#6B7280", fontSize: "13px", margin: 0 }}>
                    {stat.title}
                  </p>
                  <h3
                    style={{ fontSize: "28px", margin: "8px 0", color: "#111" }}
                  >
                    {stat.value}
                  </h3>
                  {stat.change !== undefined && (
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
                        {Math.abs(stat.change)}% from last month
                      </span>
                    </div>
                  )}
                </div>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "12px",
                    background: `${stat.bgColor}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={24} color={stat.bgColor} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts & Activity Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "24px",
        }}
      >
        {/* Performance Chart Card */}
        <div
          style={{
            background: "#FFF",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>
              Performance Overview
            </h3>
            <select
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "1px solid #E5E7EB",
                fontSize: "13px",
              }}
            >
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>

          {/* Simple Bar Chart */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "12px",
              height: "200px",
            }}
          >
            {[65, 45, 75, 55, 85, 45, 70].map((value, i) => (
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
                    height: `${value}px`,
                    background: config.theme.primary,
                    borderRadius: "4px 4px 0 0",
                    opacity: 0.7,
                  }}
                />
                <span
                  style={{
                    fontSize: "11px",
                    marginTop: "8px",
                    color: "#6B7280",
                  }}
                >
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Card */}
        <div
          style={{
            background: "#FFF",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>
              Recent Activity
            </h3>
            <button
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <MoreVertical size={16} color="#6B7280" />
            </button>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {config.recentActivity.map((activity: any) => (
              <div
                key={activity.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "8px",
                  borderRadius: "8px",
                  background: "#F9FAFB",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "8px",
                    background:
                      activity.status === "completed"
                        ? "#22C55E20"
                        : activity.status === "pending"
                          ? "#F59E0B20"
                          : "#EF444420",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {activity.status === "completed"
                    ? "✓"
                    : activity.status === "pending"
                      ? "⏳"
                      : "🔄"}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: "13px", fontWeight: 500 }}>
                    {activity.title}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      marginTop: "4px",
                      fontSize: "11px",
                      color: "#6B7280",
                    }}
                  >
                    <span>{activity.time}</span>
                    {activity.user && <span>• {activity.user}</span>}
                    {activity.amount && <span>• {activity.amount}</span>}
                  </div>
                </div>
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
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div
        style={{
          background: "#FFF",
          borderRadius: "16px",
          padding: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <h3 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: 600 }}>
          Quick Actions
        </h3>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button style={quickActionStyle}>
            <Calendar size={16} color={config.theme.primary} />
            New Booking
          </button>
          <button style={quickActionStyle}>
            <Users size={16} color={config.theme.primary} />
            Add Client
          </button>
          <button style={quickActionStyle}>
            <FileText size={16} color={config.theme.primary} />
            Generate Report
          </button>
          <button style={quickActionStyle}>
            <DollarSign size={16} color={config.theme.primary} />
            View Earnings
          </button>
        </div>
      </div>
    </div>
  );
}

const quickActionStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "8px 16px",
  background: "#F3F4F6",
  border: "none",
  borderRadius: "8px",
  fontSize: "13px",
  color: "#374151",
  cursor: "pointer",
  transition: "background 0.2s",
};
