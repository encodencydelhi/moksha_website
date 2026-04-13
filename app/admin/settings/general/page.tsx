"use client";

import React, { useState } from "react";
import { updateSettings } from "@/lib/apiClient";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function GeneralSettings() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    siteName: "Moksha Voyage",
    siteDescription: "Compassionate funeral and memorial services",
    siteUrl: "https://moksha-voyage.com",
    adminEmail: "admin@moksha.com",
    timezone: "Asia/Kolkata",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSettings({
        key: "general_settings",
        value: formData,
        section: "general",
      });
      router.back();
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#5A3E2B] hover:text-[#2C1810] mb-8"
      >
        <FiArrowLeft className="w-5 h-5" />
        Back
      </button>

      <h1 className="text-3xl font-bold text-[#2C1810] mb-2">
        General Settings
      </h1>
      <p className="text-[#5A3E2B] mb-8">Configure general website settings</p>

      <div className="bg-white rounded-lg border border-[#E7D5C2] p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#2C1810] mb-2">
              Site Name
            </label>
            <input
              type="text"
              name="siteName"
              value={formData.siteName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#E7D5C2] rounded-lg focus:outline-none focus:border-[#8B6A3E]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C1810] mb-2">
              Site Description
            </label>
            <input
              type="text"
              name="siteDescription"
              value={formData.siteDescription}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#E7D5C2] rounded-lg focus:outline-none focus:border-[#8B6A3E]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C1810] mb-2">
              Site URL
            </label>
            <input
              type="url"
              name="siteUrl"
              value={formData.siteUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#E7D5C2] rounded-lg focus:outline-none focus:border-[#8B6A3E]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C1810] mb-2">
              Admin Email
            </label>
            <input
              type="email"
              name="adminEmail"
              value={formData.adminEmail}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#E7D5C2] rounded-lg focus:outline-none focus:border-[#8B6A3E]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C1810] mb-2">
              Timezone
            </label>
            <select
              name="timezone"
              value={formData.timezone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#E7D5C2] rounded-lg focus:outline-none focus:border-[#8B6A3E]"
            >
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="Asia/Delhi">Asia/Delhi</option>
              <option value="UTC">UTC</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4 border-t border-[#E7D5C2]">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-[#E7D5C2] text-[#2C1810] rounded-lg hover:bg-[#FDF8F2] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-[#8B6A3E] text-white rounded-lg hover:bg-[#5A3E2B] transition-colors"
            >
              <FiSave className="w-4 h-4" />
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
