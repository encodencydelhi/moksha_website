"use client";

import React, { useState, useEffect } from "react";
import { getActivityLogs } from "@/lib/apiClient";
import { FiSearch, FiDownload } from "react-icons/fi";

interface ActivityLog {
  _id: string;
  admin: { name: string; email: string };
  action: string;
  module: string;
  documentId: string;
  changes: any;
  createdAt: string;
}

export default function ActivityLogPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterModule, setFilterModule] = useState("all");

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await getActivityLogs();
      const data = response.data;
      if (data.success) {
        setLogs(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching activity logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const modules = Array.from(new Set(logs.map((log) => log.module)));

  const filteredLogs = logs.filter((log) => {
    const matchSearch =
      log.admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchModule = filterModule === "all" || log.module === filterModule;
    return matchSearch && matchModule;
  });

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
          <h1 className="text-3xl font-bold text-[#2C1810]">Activity Log</h1>
          <p className="text-[#5A3E2B] mt-1">
            Track all admin and user activities
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-[#E7D5C2] text-[#2C1810] rounded-lg hover:bg-[#FDF8F2] transition-colors">
          <FiDownload className="w-5 h-5" />
          Export
        </button>
      </div>

      <div className="space-y-4 mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-3 text-[#8B6A3E] w-5 h-5" />
          <input
            type="text"
            placeholder="Search by admin name or action..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#E7D5C2] rounded-lg focus:outline-none focus:border-[#8B6A3E]"
          />
        </div>

        <select
          value={filterModule}
          onChange={(e) => setFilterModule(e.target.value)}
          className="px-4 py-2 border border-[#E7D5C2] rounded-lg focus:outline-none focus:border-[#8B6A3E]"
        >
          <option value="all">All Modules</option>
          {modules.map((module) => (
            <option key={module} value={module}>
              {module}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg border border-[#E7D5C2] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#FDF8F2] border-b border-[#E7D5C2]">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#2C1810]">
                Admin
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#2C1810]">
                Action
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#2C1810]">
                Module
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#2C1810]">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E7D5C2]">
            {filteredLogs.map((log) => (
              <tr key={log._id} className="hover:bg-[#FDF8F2]">
                <td className="px-6 py-4 text-sm text-[#2C1810]">
                  {log.admin.name}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      log.action === "CREATE"
                        ? "bg-green-100 text-green-700"
                        : log.action === "UPDATE"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {log.action}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-[#5A3E2B]">
                  {log.module}
                </td>
                <td className="px-6 py-4 text-sm text-[#5A3E2B]">
                  {new Date(log.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
