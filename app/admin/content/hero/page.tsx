"use client";

import { useEffect, useState, useRef } from "react";
import { getHeroComponent, updateComponentByKey, uploadImage, resolveImagePath } from "@/lib/apiClient";
import { FiUpload, FiPlus, FiTrash2, FiImage } from "react-icons/fi";
import { toast } from "react-toastify";

export default function AdminHeroPage() {
  const [hero, setHero] = useState<any>(null);
  const [uploading, setUploading] = useState<number | "heading" | null>(null);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  useEffect(() => {
    const loadHero = async () => {
      try {
        const res = await getHeroComponent();
        if (res.data?.success) {
          const heroData = res.data.data || {};

          if (!heroData.heroSlides || heroData.heroSlides.length === 0) {
            heroData.heroSlides = [
              { image: "", mantraTitle: "Morning Mantra", mantraSanskrit: "", mantraHindi: "", audio: "", order: 0, isActive: true },
              { image: "", mantraTitle: "Evening Mantra", mantraSanskrit: "", mantraHindi: "", audio: "", order: 1, isActive: true },
              { image: "", mantraTitle: "Peace Mantra", mantraSanskrit: "", mantraHindi: "", audio: "", order: 2, isActive: true }
            ];
          }
          setHero(heroData);
        } else {
          toast.error("Unable to load hero");
        }
      } catch (err: any) {
        toast.error(err?.response?.data?.message || "Unable to load hero");
      }
    };
    loadHero();
  }, []);

  const handleChange = (key: string, value: any) => {
    setHero((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSlideChange = (index: number, key: string, value: any) => {
    setHero((prev: any) => {
      const slides = [...(prev.heroSlides || [])];
      slides[index] = { ...slides[index], [key]: value };
      return { ...prev, heroSlides: slides };
    });
  };

  const handleImageUpload = async (file: File, slideIndex: number) => {
    try {
      setUploading(slideIndex);
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadImage(formData);
      if (res.data?.success) {
        const url = res.data.data.url;
        handleSlideChange(slideIndex, "image", url);
        toast.success("Image uploaded successfully!");
      }
    } catch (err) {
      toast.error("Image upload failed");
    } finally {
      setUploading(null);
    }
  };

  const addSlide = () => {
    setHero((prev: any) => ({
      ...prev,
      heroSlides: [
        ...(prev.heroSlides || []),
        {
          image: "",
          mantraTitle: "",
          mantraSanskrit: "",
          mantraHindi: "",
          audio: "",
          order: prev.heroSlides?.length || 0,
          isActive: true,
        },
      ],
    }));
  };

  const removeSlide = (index: number) => {
    setHero((prev: any) => ({
      ...prev,
      heroSlides: (prev.heroSlides || []).filter((_: any, i: number) => i !== index),
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    try {
      if (!hero) return;
      const res = await updateComponentByKey("hero", hero);
      if (res.data?.success) {
        toast.success("✓ Hero section updated successfully!");
      } else {
        toast.error(res.data?.message || "Failed to update hero");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update hero");
    } finally {
      setUploading(null);
    }
  };

  if (!hero) {
    return (
      <div className="min-h-screen bg-[#FDF8F2] flex items-center justify-center">
        <div className="text-[#8B6A3E] text-sm">Loading hero section...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF8F2] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#3A2A1F]">Hero Section</h1>
            <p className="text-sm text-[#8B6A3E] mt-1">Edit the homepage banner and slides</p>
          </div>
          <button
            onClick={handleSave as any}
            className="px-5 py-2.5 bg-[#8B6A3E] text-white rounded-lg font-medium hover:bg-[#7A5A2E] transition-colors"
          >
            Save Changes
          </button>
        </div>


        <form onSubmit={handleSave} className="space-y-6">
          {/* Hero Text */}
          <div className="bg-white rounded-xl border border-[#E8DBC5] p-5">
            <h2 className="font-semibold text-[#3A2A1F] mb-4">Hero Text</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Main Heading</label>
                <input
                  type="text"
                  value={hero.heroHeading || ""}
                  onChange={(e) => handleChange("heroHeading", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]/30"
                  placeholder="A Journey Guided"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Subheading (highlighted)</label>
                <input
                  type="text"
                  value={hero.heroSubheading || ""}
                  onChange={(e) => handleChange("heroSubheading", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]/30"
                  placeholder="by Love"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Trust Badge Text</label>
                <input
                  type="text"
                  value={hero.heroTrustBadge || ""}
                  onChange={(e) => handleChange("heroTrustBadge", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]/30"
                  placeholder="TRUSTED SINCE 2005"
                />
              </div>
            </div>
          </div>

          {/* Hero Slides */}
          <div className="bg-white rounded-xl border border-[#E8DBC5] p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-[#3A2A1F]">
                Slides ({(hero.heroSlides || []).length})
              </h2>
              <button
                type="button"
                onClick={addSlide}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#8B6A3E]/10 text-[#8B6A3E] rounded-lg text-sm hover:bg-[#8B6A3E]/20 transition-colors"
              >
                <FiPlus size={14} /> Add Slide
              </button>
            </div>

            <div className="space-y-5">
              {(hero.heroSlides || []).map((slide: any, index: number) => (
                <div key={index} className="border border-gray-100 rounded-xl p-4 bg-[#FDF8F2]">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-[#3A2A1F]">Slide {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeSlide(index)}
                      className="text-red-400 hover:text-red-600 transition-colors"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>

                  {/* Image Upload for each slide */}
                  <div className="mb-3">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Background Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={(el) => { fileInputRefs.current[`slide-${index}`] = el; }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file, index);
                      }}
                    />
                    {slide.image && (
                      <div className="relative w-full h-28 mb-2 rounded-lg overflow-hidden">
                        <img
                          src={resolveImagePath(slide.image)}
                          alt={`Slide ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => fileInputRefs.current[`slide-${index}`]?.click()}
                            className="bg-white text-gray-800 px-3 py-1 rounded text-xs font-medium"
                          >
                            Change Image
                          </button>
                        </div>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRefs.current[`slide-${index}`]?.click()}
                        disabled={uploading === index}
                        className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-dashed border-[#8B6A3E]/40 text-[#8B6A3E] rounded-lg text-xs hover:border-[#8B6A3E] transition-colors"
                      >
                        {uploading === index ? (
                          <span className="flex items-center gap-1"><span className="animate-spin">↻</span> Uploading...</span>
                        ) : (
                          <><FiUpload size={12} /> Upload Image</>
                        )}
                      </button>
                    </div>
                    <input
                      type="text"
                      value={slide.image || ""}
                      onChange={(e) => handleSlideChange(index, "image", e.target.value)}
                      className="mt-1.5 w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8B6A3E]/30"
                      placeholder="Or paste image URL..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Mantra Title</label>
                      <input
                        type="text"
                        value={slide.mantraTitle || ""}
                        onChange={(e) => handleSlideChange(index, "mantraTitle", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#8B6A3E]/30"
                        placeholder="Morning Mantra"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Audio File URL</label>
                      <input
                        type="text"
                        value={slide.audio || ""}
                        onChange={(e) => handleSlideChange(index, "audio", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#8B6A3E]/30"
                        placeholder="/uploads/audio/mantra.mp3"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Sanskrit Text</label>
                      <input
                        type="text"
                        value={slide.mantraSanskrit || ""}
                        onChange={(e) => handleSlideChange(index, "mantraSanskrit", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#8B6A3E]/30"
                        placeholder="ॐ तत्सत्"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Hindi Translation</label>
                      <input
                        type="text"
                        value={slide.mantraHindi || ""}
                        onChange={(e) => handleSlideChange(index, "mantraHindi", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#8B6A3E]/30"
                        placeholder="वह परम सत्य है"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <label className="text-xs text-gray-600">Active</label>
                    <button
                      type="button"
                      onClick={() => handleSlideChange(index, "isActive", !slide.isActive)}
                      className={`relative w-8 h-4 rounded-full transition-colors ${slide.isActive ? "bg-[#8B6A3E]" : "bg-gray-300"}`}
                    >
                      <span className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform ${slide.isActive ? "translate-x-4" : "translate-x-0.5"}`} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#8B6A3E] text-white rounded-xl font-medium hover:bg-[#7A5A2E] transition-colors"
          >
            Save Hero Section
          </button>
        </form>
      </div>
    </div>
  );
}
