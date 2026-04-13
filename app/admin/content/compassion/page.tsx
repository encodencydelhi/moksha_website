"use client";

import { useEffect, useState, useRef } from "react";
import { getComponentByKey, updateComponentByKey, uploadImage, resolveImagePath } from "@/lib/apiClient";
import { FiSave, FiUpload, FiPlus, FiTrash2, FiChevronLeft } from "react-icons/fi";
import Link from "next/link";

const DEFAULT_COMPASSION = {
  tag: "Our Mission",
  title: "A Journey Guided by Love",
  subtitle: "with Peace of Mind",
  description: "At Moksha Voyage — To build a trusted, transparent digital ecosystem that connects families with verified end-of-life service providers.",
  image: "/assets/chatgpt.png",
  stats: [
    { value: "500+", label: "Families Served", sub: "With Compassion" },
    { value: "50+", label: "Verified Pandits", sub: "Across India" },
    { value: "15+", label: "Cities Covered", sub: "Pan-India Network" },
  ],
  features: [
    { title: "Transparent Pricing", desc: "No hidden costs, upfront quotes" },
    { title: "Digital Agreements", desc: "Secure documentation" },
    { title: "Ritual Guidance", desc: "Step-by-step support" },
    { title: "NRI Services", desc: "Support from abroad" },
  ],
  primaryButton: "Learn More",
  secondaryButton: "Contact Our Team",
  badge1: "24/7 Support",
  badge2: "Cultural Sensitivity",
};

export default function CompassionAdmin() {
  const [data, setData] = useState<any>(DEFAULT_COMPASSION);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getComponentByKey("compassion");
        if (res.data?.success && res.data?.data?.customData) {
          setData({ ...DEFAULT_COMPASSION, ...res.data.data.customData });
        }
      } catch (err: any) {
        if (err.response?.status !== 404) {
          console.error("Failed to load Compassion data:", err.message);
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
      await updateComponentByKey("compassion", {
        componentKey: "compassion",
        label: "Our Mission Section",
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
        // Store relative path returned from backend
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
          <h1 className="text-2xl font-bold text-[#3A2A1F]">Edit Our Mission</h1>
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
            Text Content
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-[#5A3E2B] uppercase tracking-wider">Section Tag</label>
                <span className="text-[10px] text-gray-400 font-mono">{data.tag?.length || 0} / 30</span>
              </div>
              <input 
                type="text" 
                value={data.tag} 
                maxLength={30}
                onChange={(e) => setData({...data, tag: e.target.value})} 
                className="w-full px-4 py-2.5 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none transition-all" 
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-[#5A3E2B] uppercase tracking-wider">Main Title</label>
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
            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-[#5A3E2B] uppercase tracking-wider">Description</label>
                <span className="text-[10px] text-gray-400 font-mono">{data.description?.length || 0} / 250</span>
              </div>
              <textarea 
                value={data.description} 
                maxLength={250}
                onChange={(e) => setData({...data, description: e.target.value})} 
                className="w-full px-4 py-3 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none resize-none transition-all" 
                rows={3} 
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
             <div className="w-full md:w-48 aspect-square relative bg-gray-50 rounded-2xl overflow-hidden border-2 border-dashed border-[#E8DBC5] flex items-center justify-center group">
                {data.image ? (
                   <>
                      <img src={resolveImagePath(data.image)} alt="Compassion" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
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
             <div className="flex-1 w-full flex flex-col justify-end gap-4 min-h-[192px]">
                <input type="file" ref={fileRef} className="hidden" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} />
                <button onClick={() => fileRef.current?.click()} disabled={uploading} className="flex items-center gap-2 px-6 py-3 bg-[#FDF8F2] border border-[#8B6A3E]/20 text-[#8B6A3E] rounded-xl text-sm font-bold hover:bg-[#8B6A3E]/5 w-full justify-center transition-all disabled:opacity-50">
                   <FiUpload size={16} /> {uploading ? "Uploading..." : "Upload New Image"}
                </button>
                <div>
                   <label className="block text-[10px] font-bold text-[#5A3E2B] uppercase tracking-wider mb-1.5">Image URL</label>
                   <input type="text" value={data.image} onChange={(e) => setData({...data, image: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-[#E8DBC5] rounded-xl text-xs font-mono text-gray-500" placeholder="Image URL" />
                </div>
             </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-[#E8DBC5] p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
             <h2 className="text-xl font-bold text-[#2C1810] flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#8B6A3E] rounded-full"></span>
                Statistics
             </h2>
             <button onClick={() => setData({...data, stats: [...(data.stats || []), { value: "", label: "", sub: "" }]})} className="flex items-center gap-1.5 px-4 py-2 bg-[#8B6A3E] text-white rounded-xl text-sm font-bold hover:bg-[#7A5A2E] transition-all shadow-sm">
                <FiPlus size={16} /> Add Stat
             </button>
          </div>
          <div className="space-y-4">
             {data.stats?.map((stat: any, i: number) => (
               <div key={i} className="flex flex-col md:flex-row gap-4 p-5 rounded-2xl bg-[#FDF8F2]/50 border border-[#E8DBC5] relative group">
                  <button onClick={() => setData({...data, stats: data.stats.filter((_: any, idx: number) => idx !== i)})} className="absolute -top-2 -right-2 p-1.5 bg-white text-red-400 border border-red-100 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                     <FiTrash2 size={14} />
                  </button>
                  <div className="w-full md:w-32">
                     <label className="block text-[10px] font-bold text-[#5A3E2B] uppercase tracking-wider mb-1">Value</label>
                     <input type="text" value={stat.value} maxLength={15} onChange={(e) => { const s=[...data.stats]; s[i].value=e.target.value; setData({...data, stats:s}); }} className="w-full px-3 py-2 bg-white border border-[#E8DBC5] rounded-xl text-sm font-bold text-[#8B6A3E]" placeholder="Value" />
                  </div>
                  <div className="flex-1">
                     <label className="block text-[10px] font-bold text-[#5A3E2B] uppercase tracking-wider mb-1">Label</label>
                     <input type="text" value={stat.label} maxLength={40} onChange={(e) => { const s=[...data.stats]; s[i].label=e.target.value; setData({...data, stats:s}); }} className="w-full px-3 py-2 bg-white border border-[#E8DBC5] rounded-xl text-sm font-medium" placeholder="Label" />
                  </div>
                  <div className="flex-1">
                     <label className="block text-[10px] font-bold text-[#5A3E2B] uppercase tracking-wider mb-1">Sub-label</label>
                     <input type="text" value={stat.sub} maxLength={40} onChange={(e) => { const s=[...data.stats]; s[i].sub=e.target.value; setData({...data, stats:s}); }} className="w-full px-3 py-2 bg-white border border-[#E8DBC5] rounded-xl text-sm text-gray-500" placeholder="Sub-label" />
                  </div>
               </div>
             ))}
          </div>
        </section>
      </div>
    </div>
  );
}
