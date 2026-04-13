"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken, getAdminData } from "@/lib/auth";
import { getDashboardStats } from "@/lib/apiClient";
import {
  FiBarChart2,
  FiUsers,
  FiShoppingBag,
  FiCreditCard,
  FiActivity,
  FiImage,
  FiFileText,
  FiTrendingUp,
  FiArrowUpRight,
  FiArrowDownRight,
  FiCalendar,
  FiFilter,
} from "react-icons/fi";

interface Stats {
  totalBlogs: number;
  totalServices: number;
  totalPayments: number;
  totalUsers: number;
  totalGalleryItems: number;
  totalRevenue: number;
  recentPayments: any[];
}

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState<any>(null);
  const [timeRange, setTimeRange] = useState("week");
  const [mounted, setMounted] = useState(false);

  // First useEffect: Mark component as mounted (client-side only)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Second useEffect: Fetch data only after mount
  useEffect(() => {
    if (!mounted) return;

    const token = getToken();
    const adminData = getAdminData();

    if (!token || !adminData) {
      router.push("/login");
      return;
    }

    setAdmin(adminData);
    fetchStats();
  }, [mounted, router]);

  const fetchStats = async () => {
    try {
      const response = await getDashboardStats();
      const data = response.data;

      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, label, value, change, isPositive }: any) => (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-4">
        <div className="bg-gradient-to-br from-[#8B6A3E] to-[#5A3E2B] p-3 rounded-lg">
          <Icon className="text-white" size={24} />
        </div>
        {change && (
          <div
            className={`flex items-center gap-1 text-sm font-semibold ${isPositive ? "text-green-600" : "text-red-600"}`}
          >
            {isPositive ? <FiArrowUpRight /> : <FiArrowDownRight />}
            {change}%
          </div>
        )}
      </div>
      <p className="text-gray-600 text-sm mb-1">{label}</p>
      <h3 className="text-3xl font-bold text-[#2C1810]">
        {value.toLocaleString()}
      </h3>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDF8F2]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#2C1810]">Dashboard</h1>
            <p className="text-gray-600 text-sm mt-1">
              Welcome back, {admin?.name || "Admin"}!
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
              <FiFilter size={18} className="text-gray-600" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-transparent outline-none text-sm font-medium text-gray-700"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B6A3E]"></div>
          </div>
        ) : stats ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <StatCard
                icon={FiFileText}
                label="Total Blogs"
                value={stats.totalBlogs}
                change={12}
                isPositive={true}
              />
              <StatCard
                icon={FiShoppingBag}
                label="Total Services"
                value={stats.totalServices}
                change={5}
                isPositive={true}
              />
              <StatCard
                icon={FiImage}
                label="Gallery Items"
                value={stats.totalGalleryItems}
                change={8}
                isPositive={true}
              />
              <StatCard
                icon={FiUsers}
                label="Total Users"
                value={stats.totalUsers}
                change={-2}
                isPositive={false}
              />
              <StatCard
                icon={FiCreditCard}
                label="Total Payments"
                value={stats.totalPayments}
                change={15}
                isPositive={true}
              />
              <StatCard
                icon={FiTrendingUp}
                label="Total Revenue"
                value={stats.totalRevenue}
                change={18}
                isPositive={true}
              />
            </div>

            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Payments */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#2C1810]">
                    Recent Payments
                  </h2>
                  <FiActivity className="text-[#8B6A3E]" size={24} />
                </div>

                {stats.recentPayments && stats.recentPayments.length > 0 ? (
                  <div className="space-y-4">
                    {stats.recentPayments
                      .slice(0, 5)
                      .map((payment: any, index: number) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-[#FDF8F2] rounded-lg hover:bg-[#F5E9D9] transition"
                        >
                          <div>
                            <p className="font-semibold text-[#2C1810]">
                              {payment.service?.name || "Service"}
                            </p>
                            <p className="text-sm text-gray-600">
                              <FiCalendar className="inline mr-1" size={14} />
                              {new Date(payment.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-[#8B6A3E]">
                              ₹{payment.amount}
                            </p>
                            <p
                              className={`text-xs font-semibold ${payment.status === "completed" ? "text-green-600" : "text-yellow-600"}`}
                            >
                              {payment.status?.toUpperCase()}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-center py-8">
                    No recent payments
                  </p>
                )}
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-[#2C1810] mb-6">
                  Quick Stats
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Avg. Payment Value</span>
                    <span className="font-bold text-[#8B6A3E]">
                      ₹
                      {stats.totalPayments > 0
                        ? (stats.totalRevenue / stats.totalPayments).toFixed(0)
                        : 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Content Ratio</span>
                    <span className="font-bold text-[#8B6A3E]">
                      {stats.totalBlogs}:{stats.totalGalleryItems}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Conversion Rate</span>
                    <span className="font-bold text-[#8B6A3E]">
                      {stats.totalUsers > 0
                        ? (
                            (stats.totalPayments / stats.totalUsers) *
                            100
                          ).toFixed(1)
                        : 0}
                      %
                    </span>
                  </div>
                  <hr className="my-4" />
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-gray-600">Admin Role</span>
                    <span className="font-bold text-[#5A3E2B] capitalize">
                      {admin?.role || "Admin"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Actions */}
            <div className="mt-8 bg-gradient-to-r from-[#8B6A3E] to-[#5A3E2B] rounded-xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    Need to Add Content?
                  </h2>
                  <p className="text-amber-100">
                    Manage your website from the admin panel
                  </p>
                </div>
                <div className="flex gap-3">
                  <button className="bg-white text-[#8B6A3E] px-6 py-2 rounded-lg font-semibold hover:bg-amber-50 transition">
                    Add Blog
                  </button>
                  <button className="bg-white text-[#8B6A3E] px-6 py-2 rounded-lg font-semibold hover:bg-amber-50 transition">
                    Add Service
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">Failed to load dashboard data</p>
          </div>
        )}
      </div>
    </div>
  );
}
