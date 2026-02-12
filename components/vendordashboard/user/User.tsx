"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import {
  Home,
  User,
  Settings,
  LogOut,
  Bell,
  Calendar,
  Clock,
  Package,
  CreditCard,
  CheckCircle,
  Star,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function UserDashboard() {
  /* 🔐 AUTH PROTECTION */
  const { role, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (role !== "user") {
      router.replace("/vendorlogin");
    }
  }, [role, router]);

  const [activeTab, setActiveTab] = useState("dashboard");

  const userStats = [
    {
      label: "Service Requests",
      value: "12",
      icon: Package,
      color: "bg-blue-500",
    },
    {
      label: "Active Services",
      value: "3",
      icon: Clock,
      color: "bg-green-500",
    },
    {
      label: "Completed",
      value: "45",
      icon: CheckCircle,
      color: "bg-purple-500",
    },
    {
      label: "Total Spent",
      value: "₹12.5k",
      icon: CreditCard,
      color: "bg-amber-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      ```
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-56 bg-white shadow-md">
        <div className="px-3 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#8B6A3E] flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">SP</span>
            </div>
            <h2 className="text-xs font-semibold text-gray-900">
              Service Portal
            </h2>
          </div>
        </div>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 px-2 py-3 border-t border-gray-200">
          <button
            onClick={() => {
              logout();
              router.replace("/");
            }}
            className="w-full flex items-center gap-2 px-2 py-1.5 text-[11px] text-red-600 hover:bg-red-50 rounded-md"
          >
            <LogOut className="h-3 w-3" /> Logout
          </button>
        </div>
      </div>
      {/* Main Content */}
      <div className="ml-56">
        <header className="bg-white border-b border-gray-200 px-4 py-2 flex justify-between">
          <h1 className="text-sm font-semibold text-gray-900">
            User Dashboard
          </h1>
          <Bell className="h-4 w-4 text-gray-600" />
        </header>

        <div className="p-4">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {userStats.map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-md p-2 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-1">
                  <div
                    className={`w-5 h-5 ${stat.color} rounded flex items-center justify-center`}
                  >
                    <stat.icon className="h-3 w-3 text-white" />
                  </div>
                </div>
                <p className="text-xs font-bold text-gray-900">{stat.value}</p>
                <p className="text-[8px] text-gray-600 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
