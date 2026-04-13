"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createService, uploadImage, resolveImagePath } from "@/lib/apiClient";
import { FiUpload, FiArrowLeft, FiPlus, FiTrash2, FiImage, FiSave } from "react-icons/fi";
import { toast } from "react-toastify";
import Link from "next/link";

const PAGE_CATEGORIES = [
  { value: "general", label: "General / All Pages" },
  { value: "funeral-samagri", label: "Funeral Samagri (फ्यूनラル सामग्री)" },
  { value: "funeral-decoration", label: "Funeral Decoration (सजावट)" },
  { value: "pandit", label: "Pandit Service (पंडित सेवा)" },
  { value: "ambulance", label: "Ambulance Service" },
  { value: "hearse-van", label: "Hearse Van (हर्स वैन)" },
  { value: "prayer-hall", label: "Prayer Hall (प्रार्थना हॉल)" },
  { value: "special-services", label: "Special Services" },
  { value: "calling-relatives", label: "Calling Relatives" },
];

export default function CreateServicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [featureInput, setFeatureInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    details: "",
    image: "",
    features: [] as string[],
    pageCategory: "general",
    isActive: true,
    order: 0,
  });

  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);
      const data = new FormData();
      data.append("file", file);
      const res = await uploadImage(data);
      if (res.data?.success) {
        setFormData((prev) => ({ ...prev, image: res.data.data.url }));
        toast.success("Image uploaded!");
      }
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const addFeature = () => {
    if (!featureInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, featureInput.trim()],
    }));
    setFeatureInput("");
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description) {
      toast.error("Name and description are required");
      return;
    }

    setLoading(true);
    try {
      const res = await createService(formData);
      if (res.data?.success) {
        toast.success("Service created successfully!");
        router.push("/admin/services");
      } else {
        toast.error(res.data?.message || "Failed to create service");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Error creating service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8F2] p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link
            href="/admin/services"
            className="inline-flex items-center gap-2 text-[#8B6A3E] hover:underline mb-4 text-sm"
          >
            <FiArrowLeft /> Back to Services
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-[#3A2A1F]">Create New Service</h1>
          <p className="text-sm text-[#8B6A3E]">Add a new service to your platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#E8DBC5] p-6 shadow-sm">
            <div className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-[10px] font-bold text-[#5A3E2B] uppercase tracking-wider mb-2">Service Image</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                  }}
                />
                {formData.image ? (
                  <div className="relative w-full aspect-video mb-4 rounded-xl overflow-hidden border border-[#E8DBC5]">
                    <img src={resolveImagePath(formData.image)} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image: "" })}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full shadow-lg"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="w-full aspect-video border-2 border-dashed border-[#E8DBC5] bg-gray-50 rounded-xl flex flex-col items-center justify-center gap-2 text-[#8B6A3E] hover:bg-[#FDF8F2] transition-all"
                  >
                    <FiUpload size={24} />
                    <span className="text-xs font-bold uppercase tracking-widest">{uploading ? "Uploading..." : "Upload Image"}</span>
                  </button>
                )}
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[#5A3E2B] uppercase mb-1.5">Service Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none"
                    placeholder="e.g. Premium Pandit Service"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#5A3E2B] uppercase mb-1.5">Price (₹)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#5A3E2B] uppercase mb-1.5">Category</label>
                  <select
                    value={formData.pageCategory}
                    onChange={(e) => setFormData({ ...formData, pageCategory: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm outline-none"
                  >
                    {PAGE_CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label className="block text-xs font-bold text-[#5A3E2B] uppercase mb-1.5">Short Description *</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm outline-none"
                  rows={2}
                />
              </div>

              {/* Features */}
              <div>
                <label className="block text-xs font-bold text-[#5A3E2B] uppercase mb-1.5">Features</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm outline-none"
                    placeholder="Add a feature..."
                  />
                  <button type="button" onClick={addFeature} className="p-2.5 bg-[#8B6A3E] text-white rounded-xl">
                    <FiPlus />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.features.map((f, i) => (
                    <span key={i} className="px-3 py-1 bg-[#FDF8F2] text-[#8B6A3E] text-xs font-bold rounded-full border border-[#8B6A3E]/20 flex items-center gap-2">
                      {f}
                      <button type="button" onClick={() => removeFeature(i)} className="text-red-500">×</button>
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#8B6A3E] text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-[#7A5A2E] disabled:opacity-50 shadow-lg shadow-[#8B6A3E]/20 transition-all flex items-center justify-center gap-2"
              >
                <FiSave />
                {loading ? "Creating..." : "Create Service"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
