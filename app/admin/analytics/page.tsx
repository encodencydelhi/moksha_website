"use client";

import { useEffect, useState } from "react";
import { getVisits, getSocialClicks, getDashboardStats } from "@/lib/apiClient";
export default function AdminAnalyticsPage() {
  const [visits, setVisits] = useState<any[]>([]);
  const [socialClicks, setSocialClicks] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [visitsRes, socialRes, statsRes] = await Promise.all([
          getVisits({ page: 1, limit: 50 }),
          getSocialClicks({ page: 1, limit: 50 }),
          getDashboardStats(),
        ]);

        if (visitsRes.data?.success) {
          setVisits(visitsRes.data.data || []);
        }
        if (socialRes.data?.success) {
          setSocialClicks(socialRes.data.data || []);
        }
        if (statsRes.data?.success) {
          setStats(statsRes.data.data || {});
        }
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <div className="p-8">Loading analytics...</div>;

  return (
    <div className="min-h-screen p-8 bg-[#FDF8F2]">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Visits</h3>
          <p className="text-2xl font-bold">{stats.totalVisits || 0}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Unique Visitors</h3>
          <p className="text-2xl font-bold">{stats.uniqueVisitors || 0}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">New Enquiries</h3>
          <p className="text-2xl font-bold">{stats.newEnquiries || 0}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Revenue</h3>
          <p className="text-2xl font-bold">₹{stats.totalRevenue || 0}</p>
        </div>
      </div>

      {/* Visits Activity Log */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Visits Activity Log</h2>
        <div className="overflow-auto border rounded bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase">
                  Timestamp
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase">
                  IP
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase">
                  Page
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase">
                  Device
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase">
                  Browser
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase">
                  Unique
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {visits.map((v: any) => (
                <tr key={v._id}>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {new Date(v.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {v.ipAddress || "-"}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {v.page || "-"}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {v.device || "-"}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {v.browser || "-"}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {v.isUnique ? "Yes" : "No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Social Clicks Log */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Social Clicks Activity Log</h2>
        <div className="overflow-auto border rounded bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase">
                  Timestamp
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase">
                  IP
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase">
                  Platform
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase">
                  URL
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {socialClicks.map((c: any) => (
                <tr key={c._id}>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {new Date(c.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {c.ipAddress || "-"}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {c.platform || "-"}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {c.url || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
