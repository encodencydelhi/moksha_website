"use client";

import React from "react";
import {
  Truck,
  Clock,
  MapPin,
  Users,
  Activity,
  AlertCircle,
  Phone,
  Navigation,
  TrendingUp,
  Ambulance,
} from "lucide-react";

export default function AmbulanceDashboard() {
  const stats = [
    {
      label: "Active Emergencies",
      value: "3",
      icon: AlertCircle,
      bgColor: "bg-[#8B6A3E]/10",
      iconColor: "text-[#8B6A3E]",
      change: "2 critical, 1 stable",
    },
    {
      label: "Available Fleet",
      value: "5",
      icon: Truck,
      bgColor: "bg-[#8B6A3E]/10",
      iconColor: "text-[#8B6A3E]",
      change: "3 ALS, 2 BLS",
    },
    {
      label: "Avg Response",
      value: "4.2",
      suffix: "min",
      icon: Clock,
      bgColor: "bg-[#8B6A3E]/10",
      iconColor: "text-[#8B6A3E]",
      change: "⬇️ 0.8 from last week",
    },
    {
      label: "Team On Duty",
      value: "8",
      icon: Users,
      bgColor: "bg-[#8B6A3E]/10",
      iconColor: "text-[#8B6A3E]",
      change: "6 drivers, 2 paramedics",
    },
  ];

  const recentCalls = [
    {
      id: 1,
      location: "Sector 62, Noida",
      emergency: "Cardiac Arrest",
      status: "critical",
      time: "2 mins ago",
      distance: "1.2 km",
    },
    {
      id: 2,
      location: "Sector 18, Noida",
      emergency: "Accident",
      status: "urgent",
      time: "5 mins ago",
      distance: "2.5 km",
    },
    {
      id: 3,
      location: "Sector 50, Noida",
      emergency: "Breathing Issue",
      status: "stable",
      time: "8 mins ago",
      distance: "3.1 km",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-[#8B6A3E]/20 text-[#8B6A3E] border-[#8B6A3E]/30";
      case "urgent":
        return "bg-[#8B6A3E]/10 text-[#8B6A3E] border-[#8B6A3E]/20";
      case "stable":
        return "bg-[#8B6A3E]/5 text-[#8B6A3E] border-[#8B6A3E]/10";
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
              <Ambulance className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                Emergency Response Active
              </h2>
              <p className="text-white/90 text-xs sm:text-sm mt-0.5 sm:mt-1">
                You have 3 active emergencies in your area
              </p>
            </div>
          </div>
          <button className="bg-white text-[#8B6A3E] px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold hover:bg-[#8B6A3E]/5 transition-all duration-200 flex items-center gap-2 shadow-lg w-full sm:w-auto justify-center">
            <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Accept New Call
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
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mt-0.5 sm:mt-1">
                    {stat.value}
                    {stat.suffix && (
                      <span className="text-sm sm:text-base ml-0.5 sm:ml-1 text-gray-600">
                        {stat.suffix}
                      </span>
                    )}
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
            <Navigation className="h-4 w-4 sm:h-5 sm:w-5 text-[#8B6A3E]" />
            Live Fleet Tracking
          </h3>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 h-48 sm:h-56 md:h-64 rounded-lg sm:rounded-xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 border-2 border-white rounded-full animate-ping"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-48 sm:h-48 border-2 border-white/50 rounded-full"></div>
            </div>
            <div className="text-center relative z-10 px-4">
              <MapPin className="h-8 w-8 sm:h-10 sm:w-10 text-[#8B6A3E] mx-auto" />
              <p className="text-xs sm:text-sm font-medium text-white mt-1 sm:mt-2">
                Live Map View
              </p>
              <p className="text-[10px] sm:text-xs text-gray-300 mt-0.5 sm:mt-1">
                3 ambulances en route • 2 available
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl border p-4 sm:p-5 md:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2 mb-3 sm:mb-4">
            <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-[#8B6A3E]" />
            Recent Emergency Calls
          </h3>
          <div className="space-y-2 sm:space-y-3">
            {recentCalls.map((call) => (
              <div
                key={call.id}
                className="flex flex-col xs:flex-row xs:items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors gap-2 xs:gap-0"
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#8B6A3E] animate-pulse mt-1.5"></div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-900">
                      {call.location}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-600">
                      {call.emergency}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-0.5 sm:hidden">
                      {call.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between xs:justify-end xs:gap-3 ml-4 xs:ml-0">
                  <span
                    className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-full border ${getStatusColor(call.status)}`}
                  >
                    {call.status}
                  </span>
                  <p className="text-[10px] sm:text-xs text-gray-500 hidden sm:block">
                    {call.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg sm:rounded-xl border p-4 sm:p-5 md:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2 mb-3 sm:mb-4">
          <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-[#8B6A3E]" />
          Performance Metrics
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          <div className="p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
            <p className="text-[10px] sm:text-xs text-gray-600">
              Response Rate
            </p>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900">
              98%
            </p>
            <p className="text-[8px] sm:text-xs text-green-600 mt-0.5 sm:mt-1">
              +2%
            </p>
          </div>
          <div className="p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
            <p className="text-[10px] sm:text-xs text-gray-600">Avg Speed</p>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900">
              45 km/h
            </p>
            <p className="text-[8px] sm:text-xs text-green-600 mt-0.5 sm:mt-1">
              +5%
            </p>
          </div>
          <div className="p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
            <p className="text-[10px] sm:text-xs text-gray-600">Success Rate</p>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900">
              100%
            </p>
            <p className="text-[8px] sm:text-xs text-gray-600 mt-0.5 sm:mt-1">
              Today
            </p>
          </div>
          <div className="p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
            <p className="text-[10px] sm:text-xs text-gray-600">
              Customer Rating
            </p>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900">
              4.8/5
            </p>
            <p className="text-[8px] sm:text-xs text-gray-600 mt-0.5 sm:mt-1">
              ⭐ 128 reviews
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
