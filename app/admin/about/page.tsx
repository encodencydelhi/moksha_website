"use client";

import { useEffect, useState } from "react";
import { getAboutComponent, updateComponentByKey } from "@/lib/apiClient";
import { FiX } from "react-icons/fi";

interface AboutData {
  _id?: string;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  video?: string;
  isActive: boolean;
}

export default function AdminAboutPage() {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadAbout();
  }, []);

  const loadAbout = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getAboutComponent();
      const data = response.data;

      if (data.success) {
        let aboutData = data.data || data.component;

        // FIX: If aboutData is an array, take first element or convert
        if (Array.isArray(aboutData)) {
          console.warn("Received array instead of object, converting...");
          aboutData = aboutData[0] || {}; // Take first element
        }

        setAbout({
          title: aboutData.title || "",
          subtitle: aboutData.subtitle || "",
          description: aboutData.description || "",
          image: aboutData.image || "",
          video: aboutData.video || "",
          isActive: aboutData.isActive !== undefined ? aboutData.isActive : true,
        });
      } else {
        setError("Failed to load about section");
        setAbout(null);
      }
    } catch (err) {
      console.error("Error loading about:", err);
      setError("Failed to load about section");
      setAbout(null);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: string, value: any) => {
    if (about) {
      setAbout({ ...about, [key]: value });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!about) return;

    try {
      const response = await updateComponentByKey("about", about);
      const data = response.data;

      if (data.success) {
        setMessage("About section updated successfully");
        loadAbout();
      } else {
        setError(data.message || "Failed to update about");
      }
    } catch (err) {
      console.error("Error saving about:", err);
      setError("Failed to save about section");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-8 bg-[#FDF8F2] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B6A3E] mx-auto mb-4"></div>
          <p className="text-[#5A4030]">Loading about section...</p>
        </div>
      </div>
    );
  }

  if (!about) {
    return (
      <div className="min-h-screen p-8 bg-[#FDF8F2]">
        <div className="text-center">
          <p className="text-red-600">Failed to load about section</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-[#FDF8F2]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#3A2A1F] mb-2">
            Edit About Section
          </h1>
          <p className="text-[#7B5E47]">Update your about page content</p>
        </div>

        {/* Messages */}
        {message && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center justify-between">
            <span>{message}</span>
            <button
              onClick={() => setMessage("")}
              className="text-green-700 hover:text-green-900"
            >
              <FiX />
            </button>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => setError("")}
              className="text-red-700 hover:text-red-900"
            >
              <FiX />
            </button>
          </div>
        )}

        {/* Edit Form */}
        <form onSubmit={handleSave} className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#8B6A3E]">
            <h2 className="text-2xl font-bold text-[#3A2A1F] mb-6">
              About Details
            </h2>

            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-[#5A4030] mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={about.title || ""}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="w-full px-4 py-2 border border-[#e8dbc5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]"
                  placeholder="Enter title"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-sm font-semibold text-[#5A4030] mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={about.subtitle || ""}
                  onChange={(e) => handleChange("subtitle", e.target.value)}
                  className="w-full px-4 py-2 border border-[#e8dbc5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]"
                  placeholder="Enter subtitle"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-[#5A4030] mb-2">
                  Description
                </label>
                <textarea
                  value={about.description || ""}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="w-full px-4 py-2 border border-[#e8dbc5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]"
                  placeholder="Enter description"
                  rows={6}
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-semibold text-[#5A4030] mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  value={about.image || ""}
                  onChange={(e) => handleChange("image", e.target.value)}
                  className="w-full px-4 py-2 border border-[#e8dbc5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]"
                  placeholder="Image URL"
                />
                {about.image && (
                  <div className="mt-4 h-48 bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={about.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Video URL */}
              <div>
                <label className="block text-sm font-semibold text-[#5A4030] mb-2">
                  Video URL
                </label>
                <input
                  type="text"
                  value={about.video || ""}
                  onChange={(e) => handleChange("video", e.target.value)}
                  className="w-full px-4 py-2 border border-[#e8dbc5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]"
                  placeholder="Video URL (YouTube embed link)"
                />
              </div>

              {/* Active */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={about.isActive}
                  onChange={(e) => handleChange("isActive", e.target.checked)}
                  className="w-4 h-4"
                />
                <label className="ml-2 text-sm font-semibold text-[#5A4030]">
                  Active
                </label>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Save About Section
            </button>
            <button
              type="button"
              onClick={loadAbout}
              className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-semibold"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
