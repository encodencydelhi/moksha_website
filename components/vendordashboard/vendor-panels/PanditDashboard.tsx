"use client";

import React from "react";
import {
  Calendar,
  Users,
  Star,
  Clock,
  IndianRupee,
  MapPin,
  TrendingUp,
  BookOpen,
} from "lucide-react";

export default function PanditDashboard() {
  const stats = [
    {
      label: "Today's Pooja",
      value: "5",
      icon: Calendar,
      bgColor: "bg-[#8B6A3E]/10",
      iconColor: "text-[#8B6A3E]",
      change: "+2 from yesterday",
    },
    {
      label: "Total Clients",
      value: "128",
      icon: Users,
      bgColor: "bg-[#8B6A3E]/10",
      iconColor: "text-[#8B6A3E]",
      change: "+12 this month",
    },
    {
      label: "Rating",
      value: "4.8",
      icon: Star,
      bgColor: "bg-[#8B6A3E]/10",
      iconColor: "text-[#8B6A3E]",
      change: "⭐ 56 reviews",
    },
    {
      label: "This Month",
      value: "₹45,000",
      icon: IndianRupee,
      bgColor: "bg-[#8B6A3E]/10",
      iconColor: "text-[#8B6A3E]",
      change: "+15% vs last month",
    },
  ];

  const todaySchedule = [
    {
      time: "06:00 AM",
      pooja: "Ganesh Pooja",
      client: "Sharma Family",
      location: "Sector 62, Noida",
      status: "completed",
    },
    {
      time: "10:00 AM",
      pooja: "Griha Pravesh",
      client: "Patel Family",
      location: "Sector 18, Noida",
      status: "in-progress",
    },
    {
      time: "05:00 PM",
      pooja: "Satyanarayan Katha",
      client: "Singh Family",
      location: "Sector 50, Noida",
      status: "pending",
    },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "in-progress":
        return "bg-[#8B6A3E]/10 text-[#8B6A3E] border-[#8B6A3E]/20";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-4 sm:space-y-5 md:space-y-6">
      <div className="bg-gradient-to-r from-[#8B6A3E] to-[#6B4F2E] rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 rounded-xl sm:rounded-2xl backdrop-blur flex items-center justify-center">
              <span className="text-2xl sm:text-3xl">🕉️</span>
            </div>
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                Namaste, Pandit Rajesh Sharma
              </h2>
              <p className="text-white/90 text-xs sm:text-sm mt-0.5 sm:mt-1">
                You have 3 pooja bookings scheduled for today
              </p>
            </div>
          </div>
          <button className="bg-white text-[#8B6A3E] px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold hover:bg-[#8B6A3E]/5 transition-all duration-200 flex items-center gap-2 shadow-lg w-full sm:w-auto justify-center">
            <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            View Schedule
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 border hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-gray-600 truncate">
                    {stat.label}
                  </p>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mt-0.5 sm:mt-1 truncate">
                    {stat.value}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2 truncate">
                    {stat.change}
                  </p>
                </div>
                <div
                  className={`p-2 sm:p-2.5 md:p-3 ${stat.bgColor} rounded-lg sm:rounded-xl ml-2 flex-shrink-0`}
                >
                  <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${stat.iconColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
        <div className="bg-white rounded-lg sm:rounded-xl border p-4 sm:p-5 md:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2 mb-3 sm:mb-4">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-[#8B6A3E]" />
            Today's Schedule
          </h3>
          <div className="space-y-2 sm:space-y-3">
            {todaySchedule.map((item, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors gap-2 sm:gap-0"
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="min-w-[50px] sm:min-w-[60px]">
                    <span className="text-xs sm:text-sm font-semibold text-gray-900">
                      {item.time}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-900">
                      {item.pooja}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-600">
                      {item.client}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-0.5 sm:mt-1 flex items-center gap-0.5 sm:gap-1">
                      <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      <span className="truncate max-w-[150px] sm:max-w-[200px]">
                        {item.location}
                      </span>
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-full border self-end sm:self-center ${getStatusStyle(item.status)}`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl border p-4 sm:p-5 md:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2 mb-3 sm:mb-4">
            <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-[#8B6A3E]" />
            Upcoming Bookings
          </h3>
          <div className="space-y-2 sm:space-y-3">
            <div className="p-3 sm:p-4 bg-[#8B6A3E]/5 rounded-lg border border-[#8B6A3E]/20">
              <p className="text-xs sm:text-sm font-semibold text-[#8B6A3E]">
                Tomorrow
              </p>
              <div className="mt-1.5 sm:mt-2 space-y-1.5 sm:space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] sm:text-xs text-gray-600">
                    09:00 AM - Griha Pravesh
                  </span>
                  <span className="text-[8px] sm:text-[10px] font-medium text-[#8B6A3E]">
                    Verma Family
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] sm:text-xs text-gray-600">
                    06:00 PM - Satyanarayan
                  </span>
                  <span className="text-[8px] sm:text-[10px] font-medium text-[#8B6A3E]">
                    Gupta Family
                  </span>
                </div>
              </div>
            </div>
            <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
              <p className="text-xs sm:text-sm font-semibold text-gray-700">
                This Week
              </p>
              <p className="text-[10px] sm:text-xs text-gray-600 mt-1 sm:mt-2">
                8 more bookings scheduled
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg sm:rounded-xl border p-4 sm:p-5 md:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2 mb-3 sm:mb-4">
          <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-[#8B6A3E]" />
          Monthly Overview
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          <div className="p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
            <p className="text-[10px] sm:text-xs text-gray-600">Total Poojas</p>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900">
              32
            </p>
            <p className="text-[8px] sm:text-xs text-green-600 mt-0.5 sm:mt-1">
              +8 this month
            </p>
          </div>
          <div className="p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
            <p className="text-[10px] sm:text-xs text-gray-600">New Clients</p>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900">
              12
            </p>
            <p className="text-[8px] sm:text-xs text-green-600 mt-0.5 sm:mt-1">
              +25%
            </p>
          </div>
          <div className="p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
            <p className="text-[10px] sm:text-xs text-gray-600">Repeat Rate</p>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900">
              85%
            </p>
            <p className="text-[8px] sm:text-xs text-green-600 mt-0.5 sm:mt-1">
              +5%
            </p>
          </div>
          <div className="p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
            <p className="text-[10px] sm:text-xs text-gray-600">Avg. Rating</p>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900">
              4.9/5
            </p>
            <p className="text-[8px] sm:text-xs text-[#8B6A3E] mt-0.5 sm:mt-1">
              Excellent
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
