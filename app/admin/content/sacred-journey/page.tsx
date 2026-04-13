"use client";

import { useEffect, useState } from "react";
import { getComponentByKey, updateComponentByKey } from "@/lib/apiClient";
import { FiSave, FiPlus, FiTrash2, FiChevronLeft } from "react-icons/fi";
import Link from "next/link";

const DEFAULT_SACREDJOURNEY = {
  tag: "24/7 Care Coordination",
  title: "A Journey Guided by Love",
  description: "One trusted contact. Complete care. First response within 15 minutes, 24 hours a day, 365 days a year.",
  buttons: [
    { label: "Get Immediate Support", type: "phone", value: "+9118001234567" },
    { label: "WhatsApp Chat", type: "whatsapp", value: "+9118001234567" },
  ],
  footerText: "Toll-free 24/7 Helpline • Real-Time Family Tracking • Radical Pricing Transparency",
  benefits: ["Response Time SLA: 15 min", "Verified Network", "No Hidden Charges"],
  quote: "You should not have to navigate this alone, and with Moksha Voyage, you never will.",
  quoteAuthor: "From our Empathy Section",
};

export default function SacredJourneyAdmin() {
  const [data, setData] = useState<any>(DEFAULT_SACREDJOURNEY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getComponentByKey("sacredjourney");
        if (res.data?.success && res.data?.data?.customData) {
          setData({ ...DEFAULT_SACREDJOURNEY, ...res.data.data.customData });
        }
      } catch (err: any) {
        if (err.response?.status !== 404) {
          console.error("Failed to load Sacred Journey data:", err.message);
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
      await updateComponentByKey("sacredjourney", {
        componentKey: "sacredjourney",
        label: "Sacred Journey Section",
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

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/content" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <FiChevronLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-[#3A2A1F]">Edit Sacred Journey</h1>
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
            Header Content
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
                <span className="text-[10px] text-gray-400 font-mono">{data.description?.length || 0} / 200</span>
              </div>
              <textarea 
                value={data.description} 
                maxLength={200}
                onChange={(e) => setData({...data, description: e.target.value})} 
                className="w-full px-4 py-3 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none resize-none transition-all" 
                rows={2} 
              />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-[#E8DBC5] p-8 shadow-sm">
          <h2 className="text-xl font-bold text-[#2C1810] mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#8B6A3E] rounded-full"></span>
            Quote Section
          </h2>
          <div className="space-y-4">
             <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-[#5A3E2B] uppercase tracking-wider">Quote Text</label>
                  <span className="text-[10px] text-gray-400 font-mono">{data.quote?.length || 0} / 200</span>
                </div>
                <textarea 
                  value={data.quote} 
                  maxLength={200}
                  onChange={(e) => setData({...data, quote: e.target.value})} 
                  className="w-full px-4 py-3 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none resize-none italic" 
                  rows={2} 
                />
             </div>
             <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-[#5A3E2B] uppercase tracking-wider">Author/Attribution</label>
                  <span className="text-[10px] text-gray-400 font-mono">{data.quoteAuthor?.length || 0} / 60</span>
                </div>
                <input 
                  type="text" 
                  value={data.quoteAuthor} 
                  maxLength={60}
                  onChange={(e) => setData({...data, quoteAuthor: e.target.value})} 
                  className="w-full px-4 py-2.5 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none transition-all" 
                  placeholder="Author" 
                />
             </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-[#E8DBC5] p-8 shadow-sm">
          <h2 className="text-xl font-bold text-[#2C1810] mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#8B6A3E] rounded-full"></span>
            Benefits & Highlights
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-[#5A3E2B] uppercase tracking-wider">Footer Promo Text</label>
                <span className="text-[10px] text-gray-400 font-mono">{data.footerText?.length || 0} / 150</span>
              </div>
              <input 
                type="text" 
                value={data.footerText} 
                maxLength={150}
                onChange={(e) => setData({...data, footerText: e.target.value})} 
                className="w-full px-4 py-2.5 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none transition-all" 
              />
            </div>
            <div className="p-6 bg-[#FDF8F2]/50 rounded-2xl border border-[#E8DBC5]">
              <label className="block text-[10px] font-bold text-[#5A3E2B] uppercase tracking-wider mb-2">Benefits (Comma separated)</label>
              <input
                type="text"
                value={(data.benefits || []).join(", ")}
                onChange={(e) => setData({...data, benefits: e.target.value.split(",").map(s => s.trim()).filter(Boolean)})}
                className="w-full px-4 py-3 bg-white border border-[#E8DBC5] rounded-xl text-sm focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none transition-all"
                placeholder="Benefit 1, Benefit 2..."
              />
              <div className="mt-4 flex flex-wrap gap-2">
                {(data.benefits || []).map((benefit: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-[#8B6A3E] text-white rounded-full text-[10px] font-bold tracking-wide shadow-sm">{benefit}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
