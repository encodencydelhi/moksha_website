"use client";

import React, { useState, useEffect } from "react";
import { getPayments } from "@/lib/apiClient";
import { FiSearch, FiEye, FiDownload } from "react-icons/fi";

interface Payment {
  _id: string;
  transactionId: string;
  service: { name: string };
  user: { name: string; email: string };
  amount: number;
  status: string;
  createdAt: string;
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await getPayments();
      const data = response.data;
      if (data.success) {
        setPayments(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPayments = payments.filter((payment) => {
    const matchSearch =
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus =
      filterStatus === "all" || payment.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalRevenue = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  if (loading) {
    return (
      <div className="p-6 flex justify-center">
        <div className="w-8 h-8 border-4 border-[#8B6A3E] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#2C1810]">Payments</h1>
          <p className="text-[#5A3E2B] mt-1">Manage all payment transactions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-[#E7D5C2] text-[#2C1810] rounded-lg hover:bg-[#FDF8F2] transition-colors">
          <FiDownload className="w-5 h-5" />
          Export
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg border border-[#E7D5C2] p-6">
          <p className="text-[#5A3E2B] text-sm">Total Payments</p>
          <p className="text-2xl font-bold text-[#2C1810] mt-2">
            {payments.length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-[#E7D5C2] p-6">
          <p className="text-[#5A3E2B] text-sm">Completed</p>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {payments.filter((p) => p.status === "completed").length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-[#E7D5C2] p-6">
          <p className="text-[#5A3E2B] text-sm">Total Revenue</p>
          <p className="text-2xl font-bold text-[#8B6A3E] mt-2">
            ₹{totalRevenue.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-3 text-[#8B6A3E] w-5 h-5" />
          <input
            type="text"
            placeholder="Search by transaction ID or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#E7D5C2] rounded-lg focus:outline-none focus:border-[#8B6A3E]"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-[#E7D5C2] rounded-lg focus:outline-none focus:border-[#8B6A3E]"
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div className="bg-white rounded-lg border border-[#E7D5C2] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#FDF8F2] border-b border-[#E7D5C2]">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#2C1810]">
                Transaction ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#2C1810]">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#2C1810]">
                Service
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#2C1810]">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#2C1810]">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#2C1810]">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E7D5C2]">
            {filteredPayments.map((payment) => (
              <tr key={payment._id} className="hover:bg-[#FDF8F2]">
                <td className="px-6 py-4 text-sm text-[#2C1810] font-mono">
                  {payment.transactionId.slice(0, 8)}...
                </td>
                <td className="px-6 py-4 text-sm text-[#2C1810]">
                  {payment.user.name}
                </td>
                <td className="px-6 py-4 text-sm text-[#5A3E2B]">
                  {payment.service.name}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-[#8B6A3E]">
                  ₹{payment.amount}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      payment.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : payment.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-[#5A3E2B]">
                  {new Date(payment.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
