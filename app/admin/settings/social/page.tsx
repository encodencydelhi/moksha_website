"use client";

import React, { useState } from "react";
import { updateSettings } from "@/lib/apiClient";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function SocialSettings() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    whatsapp: "",
  });

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
        key: "social_links",
        value: formData,
        section: "social",
      });
      alert("Social links updated successfully!");
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
        Social Media Links
      </h1>
      <p className="text-[#5A3E2B] mb-8">
        Configure your social media accounts
      </p>

      <div className="bg-white rounded-lg border border-[#E7D5C2] p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-[#2C1810] mb-2 capitalize">
                {key} {key === "whatsapp" ? "Number" : "Link"}
              </label>
              <input
                type={key === "whatsapp" ? "tel" : "url"}
                name={key}
                value={value}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#E7D5C2] rounded-lg focus:outline-none focus:border-[#8B6A3E]"
                placeholder={`Enter ${key} ${key === "whatsapp" ? "number" : "link"}`}
              />
            </div>
          ))}

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
