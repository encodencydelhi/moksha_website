"use client";

import { useEffect, useState } from "react";
import { getComponentByKey, updateComponentByKey } from "@/lib/apiClient";
import { FiSave, FiPlus, FiTrash2, FiChevronLeft } from "react-icons/fi";
import Link from "next/link";

const DEFAULT_HOWWEHELP = {
  tag: "Our Services",
  title: "End-to-End Cremation &",
  titleHighlight: "Ritual Services",
  subtitle: "Verified Service Network · NRI Cross-Border Coordination · Radical Pricing Transparency",
  cards: [
    { icon: "🔥", title: "Cremation Services", desc: "End-to-end cremation coordination with verified providers.", features: ["Cremation Ground Booking", "Pandit Services", "Ritual Materials"] },
    { icon: "🌏", title: "NRI Cross-Border", desc: "Dedicated local representatives managing all logistics.", features: ["Family Representative", "Legal Documentation", "Body/Ash Repatriation"] },
  ],
  stats: [
    { value: "24/7", label: "Care Coordinators" },
    { value: "30M+", label: "NRI Community Served" },
  ],
  ctaText: "Explore All Services",
  helplineText: "Need immediate assistance?",
  helplineNumber: "+91 1800 123 4567",
};

export default function HowWeHelpAdmin() {
  const [data, setData] = useState<any>(DEFAULT_HOWWEHELP);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getComponentByKey("howwehelp");
        if (res.data?.success && res.data?.data?.customData) {
          setData({ ...DEFAULT_HOWWEHELP, ...res.data.data.customData });
        }
      } catch (err: any) {
        if (err.response?.status !== 404) {
          console.error("Failed to load How We Help data:", err.message);
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
      await updateComponentByKey("howwehelp", {
        componentKey: "howwehelp",
        label: "How We Help Section",
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

  const handleChange = (field: string, value: any) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };

  const updateCard = (index: number, field: string, value: any) => {
    const newCards = [...data.cards];
    newCards[index] = { ...newCards[index], [field]: value };
    setData((prev: any) => ({ ...prev, cards: newCards }));
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/content" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <FiChevronLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-[#3A2A1F]">Edit How We Help</h1>
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

      {status.message && (
        <div className={`mb-4 p-3 rounded-lg text-sm font-medium ${status.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {status.message}
        </div>
      )}

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
                onChange={(e) => handleChange("tag", e.target.value)} 
                className="w-full px-4 py-2.5 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm focus:ring-2 focus:ring-[#8B6A3E]/20 focus:border-[#8B6A3E] outline-none transition-all" 
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-[#5A3E2B] uppercase tracking-wider">CTA Button Text</label>
                <span className="text-[10px] text-gray-400 font-mono">{data.ctaText?.length || 0} / 25</span>
              </div>
              <input 
                type="text" 
                value={data.ctaText} 
                maxLength={25}
                onChange={(e) => handleChange("ctaText", e.target.value)} 
                className="w-full px-4 py-2.5 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm focus:ring-2 focus:ring-[#8B6A3E]/20 focus:border-[#8B6A3E] outline-none transition-all" 
              />
            </div>
            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-[#5A3E2B] uppercase tracking-wider">Main Title (Line 1)</label>
                <span className="text-[10px] text-gray-400 font-mono">{data.title?.length || 0} / 60</span>
              </div>
              <input 
                type="text" 
                value={data.title} 
                maxLength={60}
                onChange={(e) => handleChange("title", e.target.value)} 
                className="w-full px-4 py-2.5 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm mb-4 focus:ring-2 focus:ring-[#8B6A3E]/20 focus:border-[#8B6A3E] outline-none transition-all" 
                placeholder="Title Line 1" 
              />
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-[#5A3E2B] uppercase tracking-wider">Highlighted Title</label>
                <span className="text-[10px] text-gray-400 font-mono">{data.titleHighlight?.length || 0} / 60</span>
              </div>
              <input 
                type="text" 
                value={data.titleHighlight} 
                maxLength={60}
                onChange={(e) => handleChange("titleHighlight", e.target.value)} 
                className="w-full px-4 py-2.5 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm focus:ring-2 focus:ring-[#8B6A3E]/20 focus:border-[#8B6A3E] outline-none transition-all" 
                placeholder="Highlighted Title" 
              />
            </div>
            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-[#5A3E2B] uppercase tracking-wider">Subtitle</label>
                <span className="text-[10px] text-gray-400 font-mono">{data.subtitle?.length || 0} / 150</span>
              </div>
              <textarea 
                value={data.subtitle} 
                maxLength={150}
                onChange={(e) => handleChange("subtitle", e.target.value)} 
                className="w-full px-4 py-3 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm focus:ring-2 focus:ring-[#8B6A3E]/20 focus:border-[#8B6A3E] outline-none transition-all resize-none" 
                rows={2} 
              />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-[#E8DBC5] p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#2C1810] flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#8B6A3E] rounded-full"></span>
              Service Cards
            </h2>
            <button
              onClick={() => handleChange("cards", [...data.cards, { icon: "✨", title: "", desc: "", features: [] }])}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#8B6A3E] text-white rounded-xl text-sm font-bold hover:bg-[#7A5A2E] transition-all shadow-sm"
            >
              <FiPlus size={16} /> Add Card
            </button>
          </div>
          <div className="space-y-6">
            {data.cards.map((card: any, i: number) => (
              <div key={i} className="p-6 border border-[#E8DBC5] rounded-2xl bg-[#FDF8F2]/30 relative group transition-all hover:shadow-md">
                <button
                  onClick={() => handleChange("cards", data.cards.filter((_: any, idx: number) => idx !== i))}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 p-2 bg-white rounded-full shadow-sm border border-gray-100 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <FiTrash2 size={18} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mr-10">
                  <div className="md:col-span-1">
                    <label className="block text-[10px] font-bold text-[#5A3E2B] uppercase tracking-wider mb-1.5">Icon (Emoji)</label>
                    <input type="text" value={card.icon} onChange={(e) => updateCard(i, "icon", e.target.value)} className="w-full px-4 py-2.5 bg-white border border-[#E8DBC5] rounded-xl text-sm focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none" />
                  </div>
                  <div className="md:col-span-3">
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-[10px] font-bold text-[#5A3E2B] uppercase tracking-wider">Card Title</label>
                      <span className="text-[9px] text-gray-400 font-mono">{card.title?.length || 0} / 60</span>
                    </div>
                    <input type="text" value={card.title} maxLength={60} onChange={(e) => updateCard(i, "title", e.target.value)} className="w-full px-4 py-2.5 bg-white border border-[#E8DBC5] rounded-xl text-sm focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none" />
                  </div>
                  <div className="md:col-span-4">
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-[10px] font-bold text-[#5A3E2B] uppercase tracking-wider">Description</label>
                      <span className="text-[9px] text-gray-400 font-mono">{card.desc?.length || 0} / 150</span>
                    </div>
                    <textarea value={card.desc} maxLength={150} onChange={(e) => updateCard(i, "desc", e.target.value)} className="w-full px-4 py-3 bg-white border border-[#E8DBC5] rounded-xl text-sm focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none resize-none" rows={2} />
                  </div>
                  <div className="md:col-span-4">
                    <label className="block text-[10px] font-bold text-[#5A3E2B] uppercase tracking-wider mb-1.5">Features (One per line)</label>
                    <textarea
                      value={(card.features || []).join("\n")}
                      onChange={(e) => updateCard(i, "features", e.target.value.split("\n").filter(Boolean))}
                      className="w-full px-4 py-3 bg-white border border-[#E8DBC5] rounded-xl text-sm font-mono focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-[#E8DBC5] p-8 shadow-sm">
          <h2 className="text-xl font-bold text-[#2C1810] mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#8B6A3E] rounded-full"></span>
            Helpline Support
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-[#5A3E2B] uppercase tracking-wider">Helpline Label</label>
                <span className="text-[10px] text-gray-400 font-mono">{data.helplineText?.length || 0} / 40</span>
              </div>
              <input type="text" value={data.helplineText} maxLength={40} onChange={(e) => handleChange("helplineText", e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-[#5A3E2B] uppercase tracking-wider">Helpline Number</label>
                <span className="text-[10px] text-gray-400 font-mono">{data.helplineNumber?.length || 0} / 20</span>
              </div>
              <input type="text" value={data.helplineNumber} maxLength={20} onChange={(e) => handleChange("helplineNumber", e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
