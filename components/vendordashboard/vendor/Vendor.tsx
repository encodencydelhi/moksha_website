"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import {
  Home,
  Briefcase,
  Settings,
  LogOut,
  Bell,
  Calendar,
  Clock,
  Package,
  TrendingUp,
  Users,
  Star,
  AlertCircle,
  CheckCircle,
  User,
} from "lucide-react";

export default function VendorDashboard() {
  /* 🔐 AUTH PROTECTION */
  const { role, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (role !== "vendor") {
      router.replace("/vendorlogin");
    }
  }, [role, router]);

  const [activeTab, setActiveTab] = useState("dashboard");

  // Small vendor data
  const vendorStats = [
    {
      label: "Total Services",
      value: "156",
      icon: Package,
      color: "bg-blue-500",
    },
    { label: "Active", value: "18", icon: Clock, color: "bg-green-500" },
    { label: "Pending", value: "7", icon: AlertCircle, color: "bg-yellow-500" },
    {
      label: "Revenue",
      value: "₹89.5k",
      icon: TrendingUp,
      color: "bg-purple-500",
    },
  ];

  const recentBookings = [
    {
      id: 1,
      customer: "Amit Kumar",
      service: "Dead Body Ambulance",
      date: "10 Feb",
      status: "Confirmed",
      amount: "₹2,500",
    },
    {
      id: 2,
      customer: "Priya Singh",
      service: "Cremation Booking",
      date: "09 Feb",
      status: "Pending",
      amount: "₹5,000",
    },
    {
      id: 3,
      customer: "Suresh Patel",
      service: "Freezer Box",
      date: "08 Feb",
      status: "Completed",
      amount: "₹1,500",
    },
  ];

  const todaysSchedule = [
    {
      time: "10:00 AM",
      service: "Ambulance",
      customer: "Rajesh V.",
      location: "Andheri E",
    },
    {
      time: "02:30 PM",
      service: "Cremation",
      customer: "Meena S.",
      location: "Ghatkopar",
    },
    {
      time: "05:00 PM",
      service: "Ash Handling",
      customer: "Vikas Y.",
      location: "Borivali",
    },
  ];

  const performance = [
    { label: "Rating", value: "4.0", icon: Star, color: "text-yellow-500" },
    { label: "Reviews", value: "128", icon: Users, color: "text-blue-500" },
    {
      label: "Completed",
      value: "142",
      icon: CheckCircle,
      color: "text-green-500",
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
              <span className="text-white text-[10px] font-bold">VP</span>
            </div>
            <h2 className="text-xs font-semibold text-gray-900">
              Vendor Portal
            </h2>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-2 py-3 space-y-0.5">
          <button
            onClick={() => setActiveTab("dashboard")}
            className="w-full flex items-center gap-2 px-2 py-1.5 text-[11px] rounded-md bg-[#8B6A3E] text-white"
          >
            <Home className="h-3 w-3" /> Dashboard
          </button>
        </nav>

        {/* LOGOUT */}
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
            Vendor Dashboard
          </h1>
          <Bell className="h-4 w-4 text-gray-600" />
        </header>

        <div className="p-4">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {vendorStats.map((stat, i) => (
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

          {/* Recent Bookings */}
          <div className="bg-white rounded-md border border-gray-200">
            <div className="px-3 py-2 border-b border-gray-200">
              <h3 className="text-[11px] font-semibold text-gray-900">
                Recent Bookings
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              {recentBookings.map((b) => (
                <div key={b.id} className="px-3 py-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="h-3 w-3 text-gray-600" />
                      <div>
                        <p className="text-[11px] font-medium text-gray-900">
                          {b.customer}
                        </p>
                        <p className="text-[8px] text-gray-500">{b.service}</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-medium text-gray-900">
                      {b.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
