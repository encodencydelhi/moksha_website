"use client";

import React, { useState } from "react";
import { updateSettings } from "@/lib/apiClient";
import { FiArrowLeft, FiSave, FiEye, FiEyeOff } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function RazorpaySettings() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    razorpayKeyId: "",
    razorpayKeySecret: "",
    merchantName: "Moksha Voyage",
    currency: "INR",
    mode: "test",
  });
  const [showSecret, setShowSecret] = useState(false);

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
        key: "razorpay_settings",
        value: formData,
        section: "payments",
      });
      alert("Razorpay settings updated successfully!");
      router.back();
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Error saving settings");
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
        Razorpay Payment Settings
      </h1>
      <p className="text-[#5A3E2B] mb-8">Manage Razorpay API credentials</p>

      <div className="bg-white rounded-lg border border-[#E7D5C2] p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-700">
              ⚠️ Keep your Razorpay keys confidential. Never share them publicly
              or commit them to version control.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C1810] mb-2">
              Razorpay Key ID
            </label>
            <input
              type="text"
              name="razorpayKeyId"
              value={formData.razorpayKeyId}
              onChange={handleChange}
              placeholder="rzp_live_xxxxxxxxxxxx"
              className="w-full px-4 py-2 border border-[#E7D5C2] rounded-lg focus:outline-none focus:border-[#8B6A3E]"
            />
            <p className="text-xs text-[#5A3E2B] mt-1">
              Get this from Razorpay Dashboard → Settings → API Keys
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C1810] mb-2">
              Razorpay Key Secret
            </label>
            <div className="relative">
              <input
                type={showSecret ? "text" : "password"}
                name="razorpayKeySecret"
                value={formData.razorpayKeySecret}
                onChange={handleChange}
                placeholder="••••••••••••••••••••"
                className="w-full px-4 py-2 border border-[#E7D5C2] rounded-lg focus:outline-none focus:border-[#8B6A3E]"
              />
              <button
                type="button"
                onClick={() => setShowSecret(!showSecret)}
                className="absolute right-3 top-2.5 text-[#8B6A3E]"
              >
                {showSecret ? (
                  <FiEyeOff className="w-5 h-5" />
                ) : (
                  <FiEye className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-xs text-[#5A3E2B] mt-1">
              Never share this key with anyone
            </p>
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
