"use client";

import React, { useState } from "react";
import { updateSettings } from "@/lib/apiClient";
import { FiArrowLeft, FiSave, FiEye, FiEyeOff } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function EmailSettings() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    smtpHost: "",
    smtpPort: "",
    smtpUser: "",
    smtpPass: "",
    fromEmail: "",
    fromName: "Moksha Voyage",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        key: "email_settings",
        value: formData,
        section: "email",
      });
      alert("Email settings updated successfully!");
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

      <h1 className="text-3xl font-bold text-[#2C1810] mb-2">Email Settings</h1>
      <p className="text-[#5A3E2B] mb-8">
        Configure email service for notifications
      </p>

      <div className="bg-white rounded-lg border border-[#E7D5C2] p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#2C1810] mb-2">
              SMTP Host
            </label>
            <input
              type="text"
              name="smtpHost"
              value={formData.smtpHost}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#E7D5C2] rounded-lg focus:outline-none focus:border-[#8B6A3E]"
              placeholder="smtp.gmail.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#2C1810] mb-2">
                SMTP Port
              </label>
              <input
                type="text"
                name="smtpPort"
                value={formData.smtpPort}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#E7D5C2] rounded-lg focus:outline-none focus:border-[#8B6A3E]"
                placeholder="587"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2C1810] mb-2">
                From Name
              </label>
              <input
                type="text"
                name="fromName"
                value={formData.fromName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#E7D5C2] rounded-lg focus:outline-none focus:border-[#8B6A3E]"
                placeholder="Moksha Voyage"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C1810] mb-2">
              SMTP Username
            </label>
            <input
              type="text"
              name="smtpUser"
              value={formData.smtpUser}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#E7D5C2] rounded-lg focus:outline-none focus:border-[#8B6A3E]"
              placeholder="admin@moksha.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C1810] mb-2">
              SMTP Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="smtpPass"
                value={formData.smtpPass}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#E7D5C2] rounded-lg focus:outline-none focus:border-[#8B6A3E]"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-[#8B6A3E]"
              >
                {showPassword ? (
                  <FiEyeOff className="w-5 h-5" />
                ) : (
                  <FiEye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C1810] mb-2">
              From Email
            </label>
            <input
              type="email"
              name="fromEmail"
              value={formData.fromEmail}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#E7D5C2] rounded-lg focus:outline-none focus:border-[#8B6A3E]"
              placeholder="noreply@moksha.com"
            />
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
