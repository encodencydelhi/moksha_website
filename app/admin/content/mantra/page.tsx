"use client";

import { useEffect, useState, useRef } from "react";
import { getComponentByKey, updateComponentByKey, uploadImage, resolveImagePath } from "@/lib/apiClient";
import { FiSave, FiUpload, FiChevronLeft } from "react-icons/fi";
import Link from "next/link";

const DEFAULT_MANTRA = {
  symbol: "ॐ",
  title: "Moksha Voyage",
  subtitle: "Sacred Wisdom",
  tagline: "India's First End-to-End Cremation Platform",
  shlok: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः।",
  transliteration1: "sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja",
  transliteration2: "ahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ",
  promise: "Every family will receive the same standard of care, respect, and transparency we would want for our own loved ones.",
  meaning: "Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.",
  pillars: ["SIMPLIFY", "CONNECT", "PROTECT", "HONOUR", "SERVE"],
  image: "/assets/grahpravesh.jpg",
};

export default function MantraAdmin() {
  const [data, setData] = useState<any>(DEFAULT_MANTRA);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getComponentByKey("mantra");
        if (res.data?.success && res.data?.data?.customData) {
          setData({ ...DEFAULT_MANTRA, ...res.data.data.customData });
        }
      } catch (err: any) {
        if (err.response?.status !== 404) {
          console.error("Failed to load Mantra data:", err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setStatus({ type: "", message: "" });
    try {
      await updateComponentByKey("mantra", {
        componentKey: "mantra",
        label: "Mantra Section",
        customData: data,
      });
      setStatus({ type: "success", message: "Saved successfully!" });
      setTimeout(() => setStatus({ type: "", message: "" }), 3000);
    } catch (err) {
      setStatus({ type: "error", message: "Failed to save" });
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async (file: File) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadImage(formData);
      if (res.data?.success) {
        // Store the relative path from the backend
        const url = res.data.data.url;
        setData((prev: any) => ({ ...prev, image: url }));
        setStatus({ type: "success", message: "Image uploaded!" });
      }
    } catch {
      setStatus({ type: "error", message: "Upload failed" });
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/content" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <FiChevronLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-[#3A2A1F]">Edit Mantra / Shlok</h1>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#8B6A3E] text-white rounded-lg font-medium hover:bg-[#7A5A2E] transition-colors disabled:opacity-60"
        >
          <FiSave size={16} />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="space-y-6">
        <section className="bg-white rounded-2xl border border-[#E8DBC5] p-8 shadow-sm">
          <h2 className="text-xl font-bold text-[#2C1810] mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#8B6A3E] rounded-full"></span>
            Core Identification
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-[#5A3E2B] uppercase tracking-wider">Symbol</label>
                <span className="text-[10px] text-gray-400 font-mono">{data.symbol?.length || 0} / 5</span>
              </div>
              <input 
                type="text" 
                value={data.symbol} 
                maxLength={5}
                onChange={(e) => setData({...data, symbol: e.target.value})} 
                className="w-full px-4 py-2.5 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none transition-all" 
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-[#5A3E2B] uppercase tracking-wider">Title</label>
                <span className="text-[10px] text-gray-400 font-mono">{data.title?.length || 0} / 60</span>
              </div>
              <input 
                type="text" 
                value={data.title} 
                maxLength={60}
                onChange={(e) => setData({...data, title: e.target.value})} 
                className="w-full px-4 py-2.5 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none transition-all" 
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-[#5A3E2B] uppercase tracking-wider">Subtitle</label>
                <span className="text-[10px] text-gray-400 font-mono">{data.subtitle?.length || 0} / 60</span>
              </div>
              <input 
                type="text" 
                value={data.subtitle} 
                maxLength={60}
                onChange={(e) => setData({...data, subtitle: e.target.value})} 
                className="w-full px-4 py-2.5 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none transition-all" 
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-[#5A3E2B] uppercase tracking-wider">Tagline</label>
                <span className="text-[10px] text-gray-400 font-mono">{data.tagline?.length || 0} / 100</span>
              </div>
              <input 
                type="text" 
                value={data.tagline} 
                maxLength={100}
                onChange={(e) => setData({...data, tagline: e.target.value})} 
                className="w-full px-4 py-2.5 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none transition-all" 
              />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-[#E8DBC5] p-8 shadow-sm">
          <h2 className="text-xl font-bold text-[#2C1810] mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#8B6A3E] rounded-full"></span>
            Visuals
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-56 aspect-square relative bg-gray-50 rounded-2xl overflow-hidden border-2 border-dashed border-[#E8DBC5] flex items-center justify-center group">
              {data.image ? (
                <>
                  <img src={resolveImagePath(data.image)} alt="Mantra" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <button onClick={() => fileRef.current?.click()} className="p-3 bg-white rounded-full text-gray-800 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <FiUpload size={20} />
                     </button>
                  </div>
                </>
              ) : (
                <div className="text-center p-4">
                   <FiUpload className="mx-auto mb-2 text-gray-300" size={32} />
                   <p className="text-xs text-gray-400 font-medium">Click to upload</p>
                </div>
              )}
            </div>
            <div className="flex-1 w-full flex flex-col justify-end gap-4 min-h-[224px]">
              <input type="file" ref={fileRef} className="hidden" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} />
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-2 px-6 py-3 bg-[#FDF8F2] border border-[#8B6A3E]/20 text-[#8B6A3E] rounded-xl text-sm font-bold hover:bg-[#8B6A3E]/5 w-full justify-center transition-all disabled:opacity-50"
              >
                <FiUpload size={16} />
                {uploading ? "Uploading..." : "Upload New Image"}
              </button>
              <div>
                <label className="block text-[10px] font-bold text-[#5A3E2B] uppercase tracking-wider mb-1.5">Image URL</label>
                <input
                  type="text"
                  value={data.image}
                  onChange={(e) => setData({ ...data, image: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 border border-[#E8DBC5] rounded-xl text-xs font-mono text-gray-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-[#E8DBC5] p-8 shadow-sm">
          <h2 className="text-xl font-bold text-[#2C1810] mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#8B6A3E] rounded-full"></span>
            Shlok & Spiritual Text
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-[#5A3E2B] uppercase tracking-wider">Shlok (Sanskrit)</label>
                <span className="text-[10px] text-gray-400 font-mono">{data.shlok?.length || 0} / 300</span>
              </div>
              <textarea 
                value={data.shlok} 
                maxLength={300}
                onChange={(e) => setData({...data, shlok: e.target.value})} 
                className="w-full px-5 py-4 bg-gray-50 border border-[#E8DBC5] rounded-2xl text-lg font-serif italic text-[#3A2A1F] focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none transition-all resize-none shadow-inner" 
                rows={3} 
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-[#5A3E2B] uppercase tracking-wider">Transliteration Line 1</label>
                  <span className="text-[10px] text-gray-400 font-mono">{data.transliteration1?.length || 0} / 200</span>
                </div>
                <input 
                  type="text" 
                  value={data.transliteration1} 
                  maxLength={200}
                  onChange={(e) => setData({...data, transliteration1: e.target.value})} 
                  className="w-full px-4 py-2.5 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm italic focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none transition-all" 
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-[#5A3E2B] uppercase tracking-wider">Transliteration Line 2</label>
                  <span className="text-[10px] text-gray-400 font-mono">{data.transliteration2?.length || 0} / 200</span>
                </div>
                <input 
                  type="text" 
                  value={data.transliteration2} 
                  maxLength={200}
                  onChange={(e) => setData({...data, transliteration2: e.target.value})} 
                  className="w-full px-4 py-2.5 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm italic focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none transition-all" 
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-[#5A3E2B] uppercase tracking-wider">Spiritual Meaning</label>
                <span className="text-[10px] text-gray-400 font-mono">{data.meaning?.length || 0} / 300</span>
              </div>
              <textarea 
                value={data.meaning} 
                maxLength={300}
                onChange={(e) => setData({...data, meaning: e.target.value})} 
                className="w-full px-4 py-3 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none resize-none transition-all" 
                rows={3} 
              />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-[#E8DBC5] p-8 shadow-sm">
          <h2 className="text-xl font-bold text-[#2C1810] mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#8B6A3E] rounded-full"></span>
            Our Promise & Pillars
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-[#5A3E2B] uppercase tracking-wider">The Promise</label>
                <span className="text-[10px] text-gray-400 font-mono">{data.promise?.length || 0} / 250</span>
              </div>
              <textarea 
                value={data.promise} 
                maxLength={250}
                onChange={(e) => setData({...data, promise: e.target.value})} 
                className="w-full px-4 py-3 bg-gray-100 border-none rounded-xl text-sm italic text-[#5A3E2B] focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none transition-all resize-none shadow-inner" 
                rows={2} 
              />
            </div>
            <div className="p-6 bg-[#FDF8F2]/50 rounded-2xl border border-[#E8DBC5]">
              <label className="block text-[10px] font-bold text-[#5A3E2B] uppercase tracking-wider mb-2">Core Pillars (Comma separated)</label>
              <input
                type="text"
                value={(data.pillars || []).join(", ")}
                onChange={(e) => setData({...data, pillars: e.target.value.split(",").map(s => s.trim()).filter(Boolean)})}
                className="w-full px-4 py-3 bg-white border border-[#E8DBC5] rounded-xl text-sm font-bold tracking-widest text-[#8B6A3E] uppercase outline-none focus:ring-2 focus:ring-[#8B6A3E]/20"
                placeholder="Pillar 1, Pillar 2..."
              />
              <div className="mt-4 flex flex-wrap gap-3">
                {(data.pillars || []).map((pillar: string, i: number) => (
                  <span key={i} className="px-4 py-1 bg-[#8B6A3E] text-white rounded-full text-[10px] font-black tracking-widest shadow-sm uppercase">{pillar}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
