"use client";

import { useEffect, useState, useRef } from "react";
import { getComponentByKey, updateComponentByKey, uploadImage, resolveImagePath } from "@/lib/apiClient";
import { FiUpload, FiPlus, FiTrash2, FiSave } from "react-icons/fi";
import { toast } from "react-toastify";

const TABS = [
  { id: "compassion", label: "Our Mission" },
  { id: "howwehelp", label: "How We Help" },
  { id: "serving", label: "Serving Section" },
  { id: "sacredjourney", label: "Sacred Journey" },
  { id: "mantra", label: "Mantra / Shlok" },
];

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

const DEFAULT_HOWWEHELP = {
  tag: "Our Services",
  title: "End-to-End Cremation &",
  titleHighlight: "Ritual Services",
  subtitle: "Verified Service Network · NRI Cross-Border Coordination · Radical Pricing Transparency",
  cards: [
    { icon: "🔥", title: "Cremation Services", desc: "End-to-end cremation coordination with verified providers.", features: ["Cremation Ground Booking", "Pandit Services", "Ritual Materials"] },
    { icon: "🌏", title: "NRI Cross-Border", desc: "Dedicated local representatives managing all logistics.", features: ["Family Representative", "Legal Documentation", "Body/Ash Repatriation"] },
    { icon: "🙏", title: "Grief Support", desc: "Professional counselling, peer support communities.", features: ["Grief Counselling", "Peer Communities", "Ritual Continuity"] },
    { icon: "📹", title: "Digital Legacy", desc: "Permanent digital memorials and video tributes.", features: ["Digital Memorials", "Document Vault", "Obituary Publishing"] },
  ],
  stats: [
    { value: "24/7", label: "Care Coordinators" },
    { value: "30M+", label: "NRI Community Served" },
    { value: "100%", label: "Pricing Transparency" },
    { value: "12,000 Cr", label: "Indian Funeral Market" },
  ],
  ctaText: "Explore All Services",
  helplineText: "Need immediate assistance?",
  helplineNumber: "+91 1800 123 4567",
};

const DEFAULT_SERVING = {
  tag: "Who We Serve",
  title: "Serving Humanity",
  titleHighlight: "Beyond Boundaries",
  description: "Families in India · Global NRI Community · Senior Citizens · Shelter Homes & NGO Partners",
  image: "/assets/bodytransport.jpeg",
  nriTitle: "NRI Community",
  nriSubtitle: "Our Beachhead Market",
  nriDescription: "30M+ Indians living in the UK, USA, UAE, Canada, Australia, Singapore, and the Gulf. Distance transforms grief into paralysis. We become your eyes, hands, and voice in India.",
  features: [
    { title: "Pain Point Intensity", desc: "Managing sacred duties from thousands of miles away", icon: "PiHandHeart" },
    { title: "Financial Capacity", desc: "3-5x average domestic transaction value", icon: "BsShieldCheck" },
    { title: "Community Referral", desc: "Intensely community-networked diaspora", icon: "PiHeart" },
    { title: "Recurring Relationship", desc: "Elder-care check-ins & pre-planning", icon: "FiAward" },
  ],
  testimonial: {
    text: "Living in London when my father passed in Delhi, I was paralysed. Moksha Voyage became my eyes, my hands, and my voice in India. I never felt alone, not for a single moment.",
    author: "Priya Sharma, London, UK"
  },
  ecosystemTags: ["Professional Counselling", "Peer Support Groups", "Children & Grief Resources", "Ritual Continuity Support", "Crisis Intervention 24/7"],
  stats: [
    { value: "24/7", label: "Care Coordination", desc: "365 days a year", icon: "FiClock" },
    { value: "50+", label: "Cities Across India", desc: "Verified provider network", icon: "FiMapPin" },
    { value: "30M+", label: "NRI Community", desc: "Global Indian diaspora", icon: "FiUsers" },
    { value: "100%", label: "Transparency", desc: "No hidden charges", icon: "PiStar" },
  ],
};

const DEFAULT_SACREDJOURNEY = {
  tag: "24/7 Care Coordination",
  title: "A Journey Guided by Love",
  description: "One trusted contact. Complete care. First response within 15 minutes, 24 hours a day, 365 days a year.",
  buttons: [
    { label: "Get Immediate Support", type: "phone", value: "+9118001234567" },
    { label: "WhatsApp Chat", type: "whatsapp", value: "+9118001234567" },
    { label: "Plan Ahead", type: "email", value: "support@mokshavoyage.com" },
  ],
  footerText: "Toll-free 24/7 Helpline • Real-Time Family Tracking • Radical Pricing Transparency",
  benefits: ["Response Time SLA: 15 min", "Verified Network", "No Hidden Charges"],
  quote: "You should not have to navigate this alone, and with Moksha Voyage, you never will.",
  quoteAuthor: "From our Empathy Section",
};

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
  stats: [
    { value: "50+", label: "Pandits" },
    { value: "150+", label: "Families" },
    { value: "24/7", label: "Support" },
  ],
};

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState("compassion");
  const [data, setData] = useState<any>({
    compassion: DEFAULT_COMPASSION,
    howwehelp: DEFAULT_HOWWEHELP,
    serving: DEFAULT_SERVING,
    sacredjourney: DEFAULT_SACREDJOURNEY,
    mantra: DEFAULT_MANTRA,
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      const keys = ["compassion", "howwehelp", "serving", "sacredjourney", "mantra"];
      const updated: any = { ...data };
      for (const key of keys) {
        try {
          const res = await getComponentByKey(key);
          if (res.data?.success && res.data?.data?.customData) {
            updated[key] = { ...updated[key], ...res.data.data.customData };
          }
        } catch { /* use default */ }
      }
      setData(updated);
      setLoading(false);
    };
    loadAll();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateComponentByKey(activeTab, {
        componentKey: activeTab,
        label: TABS.find((t) => t.id === activeTab)?.label || activeTab,
        customData: data[activeTab],
      });
      toast.success(`✓ ${TABS.find((t) => t.id === activeTab)?.label} saved successfully!`);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const update = (path: string, value: any) => {
    setData((prev: any) => {
      const parts = path.split(".");
      const clone = { ...prev };
      let cur: any = clone;
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!isNaN(Number(part))) {
          cur[Number(part)] = { ...(cur[Number(part)] || {}) };
          cur = cur[Number(part)];
        } else {
          cur[part] = { ...(cur[part] || {}) };
          cur = cur[part];
        }
      }
      cur[parts[parts.length - 1]] = value;
      return clone;
    });
  };

  const updateSection = (section: string, path: string, value: any) => {
    setData((prev: any) => {
      const sectionData = { ...prev[section] };
      const parts = path.split(".");
      let cur: any = sectionData;
      for (let i = 0; i < parts.length - 1; i++) {
        const p = parts[i];
        if (!isNaN(Number(p)) && Array.isArray(cur)) {
          cur = cur[Number(p)];
        } else {
          cur[p] = Array.isArray(cur[p]) ? [...cur[p]] : { ...cur[p] };
          cur = cur[p];
        }
      }
      cur[parts[parts.length - 1]] = value;
      return { ...prev, [section]: sectionData };
    });
  };

  const handleUploadImage = async (file: File, section: string, field: string) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadImage(formData);
      if (res.data?.success) {
        // Store relative URL from backend instead of absolute localhost URL
        const url = res.data.data.url;
        setData((prev: any) => ({ ...prev, [section]: { ...prev[section], [field]: url } }));
        toast.success("Image uploaded!");
      }
    } catch { toast.error("Upload failed"); }
    finally { setUploading(false); }
  };

  const addArrayItem = (section: string, field: string, template: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...(prev[section][field] || []), template],
      },
    }));
  };

  const removeArrayItem = (section: string, field: string, index: number) => {
    setData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].filter((_: any, i: number) => i !== index),
      },
    }));
  };

  const d = data[activeTab] || {};

  return (
    <div className="min-h-screen bg-[#FDF8F2] p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#3A2A1F]">Homepage Sections</h1>
            <p className="text-sm text-[#8B6A3E] mt-1">Edit all homepage content sections</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#8B6A3E] text-white rounded-lg font-medium hover:bg-[#7A5A2E] transition-colors disabled:opacity-60"
          >
            <FiSave size={14} />
            {saving ? "Saving..." : "Save Section"}
          </button>
        </div>


        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1 border border-[#E8DBC5] mb-6 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-max px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id
                  ? "bg-[#8B6A3E] text-white"
                  : "text-[#5A4030] hover:bg-[#F8F4EC]"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="bg-white rounded-xl border border-[#E8DBC5] p-8 text-center text-[#8B6A3E]">
            Loading section data...
          </div>
        ) : (
          <div className="space-y-5">

            {/* ─── COMPASSION SECTION ─── */}
            {activeTab === "compassion" && (
              <>
                <div className="bg-white rounded-xl border border-[#E8DBC5] p-5">
                  <h2 className="font-semibold text-[#3A2A1F] mb-4">Text Content</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { field: "tag", label: "Section Tag", placeholder: "Our Mission" },
                      { field: "title", label: "Main Title", placeholder: "A Journey Guided by Love" },
                      { field: "subtitle", label: "Subtitle", placeholder: "with Peace of Mind" },
                      { field: "primaryButton", label: "Primary Button Text", placeholder: "Learn More" },
                      { field: "secondaryButton", label: "Secondary Button Text", placeholder: "Contact Our Team" },
                      { field: "badge1", label: "Badge 1 Text", placeholder: "24/7 Support" },
                      { field: "badge2", label: "Badge 2 Text", placeholder: "Cultural Sensitivity" },
                    ].map(({ field, label, placeholder }) => (
                      <div key={field}>
                        <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                        <input
                          type="text"
                          value={d[field] || ""}
                          onChange={(e) => setData((prev: any) => ({ ...prev, compassion: { ...prev.compassion, [field]: e.target.value } }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]/30"
                          placeholder={placeholder}
                        />
                      </div>
                    ))}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                      <textarea
                        value={d.description || ""}
                        onChange={(e) => setData((prev: any) => ({ ...prev, compassion: { ...prev.compassion, description: e.target.value } }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]/30"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-[#E8DBC5] p-5">
                  <h2 className="font-semibold text-[#3A2A1F] mb-4">Background Image</h2>
                  <input type="file" accept="image/*" className="hidden" ref={fileRef}
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUploadImage(f, "compassion", "image"); }} />
                  <div className="flex gap-3 items-center">
                    {d.image && (
                      <img src={resolveImagePath(d.image)} alt="bg" className="w-24 h-16 object-cover rounded-lg" />
                    )}
                    <div className="flex-1">
                      <button type="button" onClick={() => fileRef.current?.click()}
                        className="flex items-center gap-2 px-3 py-2 border-2 border-dashed border-[#8B6A3E]/40 text-[#8B6A3E] rounded-lg text-sm w-full justify-center mb-2">
                        <FiUpload size={14} /> {uploading ? "Uploading..." : "Upload Image"}
                      </button>
                      <input type="text" value={d.image || ""}
                        onChange={(e) => setData((prev: any) => ({ ...prev, compassion: { ...prev.compassion, image: e.target.value } }))}
                        className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg" placeholder="Or paste URL..." />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-[#E8DBC5] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-[#3A2A1F]">Stats</h2>
                    <button type="button" onClick={() => addArrayItem("compassion", "stats", { value: "", label: "", sub: "" })}
                      className="flex items-center gap-1 px-3 py-1.5 bg-[#8B6A3E]/10 text-[#8B6A3E] rounded-lg text-sm">
                      <FiPlus size={12} /> Add
                    </button>
                  </div>
                  {(d.stats || []).map((stat: any, i: number) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input type="text" value={stat.value || ""} placeholder="500+"
                        onChange={(e) => { const s = [...d.stats]; s[i] = { ...s[i], value: e.target.value }; setData((p: any) => ({ ...p, compassion: { ...p.compassion, stats: s } })); }}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                      <input type="text" value={stat.label || ""} placeholder="Families Served"
                        onChange={(e) => { const s = [...d.stats]; s[i] = { ...s[i], label: e.target.value }; setData((p: any) => ({ ...p, compassion: { ...p.compassion, stats: s } })); }}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                      <input type="text" value={stat.sub || ""} placeholder="Subtitle"
                        onChange={(e) => { const s = [...d.stats]; s[i] = { ...s[i], sub: e.target.value }; setData((p: any) => ({ ...p, compassion: { ...p.compassion, stats: s } })); }}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                      <button type="button" onClick={() => removeArrayItem("compassion", "stats", i)}
                        className="text-red-400 hover:text-red-600 px-2"><FiTrash2 size={14} /></button>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-xl border border-[#E8DBC5] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-[#3A2A1F]">Features List</h2>
                    <button type="button" onClick={() => addArrayItem("compassion", "features", { title: "", desc: "" })}
                      className="flex items-center gap-1 px-3 py-1.5 bg-[#8B6A3E]/10 text-[#8B6A3E] rounded-lg text-sm">
                      <FiPlus size={12} /> Add
                    </button>
                  </div>
                  {(d.features || []).map((f: any, i: number) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input type="text" value={f.title || ""} placeholder="Feature Title"
                        onChange={(e) => { const fc = [...d.features]; fc[i] = { ...fc[i], title: e.target.value }; setData((p: any) => ({ ...p, compassion: { ...p.compassion, features: fc } })); }}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                      <input type="text" value={f.desc || ""} placeholder="Feature Description"
                        onChange={(e) => { const fc = [...d.features]; fc[i] = { ...fc[i], desc: e.target.value }; setData((p: any) => ({ ...p, compassion: { ...p.compassion, features: fc } })); }}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                      <button type="button" onClick={() => removeArrayItem("compassion", "features", i)}
                        className="text-red-400 hover:text-red-600 px-2"><FiTrash2 size={14} /></button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ─── HOW WE HELP ─── */}
            {activeTab === "howwehelp" && (
              <>
                <div className="bg-white rounded-xl border border-[#E8DBC5] p-5">
                  <h2 className="font-semibold text-[#3A2A1F] mb-4">Section Header</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { field: "tag", label: "Section Tag", placeholder: "Our Services" },
                      { field: "title", label: "Title Line 1", placeholder: "End-to-End Cremation &" },
                      { field: "titleHighlight", label: "Title Highlighted", placeholder: "Ritual Services" },
                      { field: "ctaText", label: "CTA Button", placeholder: "Explore All Services" },
                      { field: "helplineText", label: "Helpline Text", placeholder: "Need immediate assistance?" },
                      { field: "helplineNumber", label: "Helpline Number", placeholder: "+91 1800 123 4567" },
                    ].map(({ field, label, placeholder }) => (
                      <div key={field}>
                        <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                        <input type="text" value={d[field] || ""}
                          onChange={(e) => setData((prev: any) => ({ ...prev, howwehelp: { ...prev.howwehelp, [field]: e.target.value } }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]/30"
                          placeholder={placeholder} />
                      </div>
                    ))}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Subtitle</label>
                      <input type="text" value={d.subtitle || ""}
                        onChange={(e) => setData((prev: any) => ({ ...prev, howwehelp: { ...prev.howwehelp, subtitle: e.target.value } }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]/30"
                        placeholder="Verified Service Network..." />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-[#E8DBC5] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-[#3A2A1F]">Service Cards</h2>
                    <button type="button"
                      onClick={() => addArrayItem("howwehelp", "cards", { icon: "✨", title: "", desc: "", features: [""] })}
                      className="flex items-center gap-1 px-3 py-1.5 bg-[#8B6A3E]/10 text-[#8B6A3E] rounded-lg text-sm">
                      <FiPlus size={12} /> Add Card
                    </button>
                  </div>
                  {(d.cards || []).map((card: any, i: number) => (
                    <div key={i} className="border border-gray-100 rounded-xl p-4 mb-3 bg-[#FDF8F2]">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-[#3A2A1F]">Card {i + 1}</span>
                        <button type="button" onClick={() => removeArrayItem("howwehelp", "cards", i)}
                          className="text-red-400 hover:text-red-600"><FiTrash2 size={14} /></button>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Icon (emoji)</label>
                          <input type="text" value={card.icon || ""} placeholder="🔥"
                            onChange={(e) => { const c = [...d.cards]; c[i] = { ...c[i], icon: e.target.value }; setData((p: any) => ({ ...p, howwehelp: { ...p.howwehelp, cards: c } })); }}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                          <input type="text" value={card.title || ""} placeholder="Cremation Services"
                            onChange={(e) => { const c = [...d.cards]; c[i] = { ...c[i], title: e.target.value }; setData((p: any) => ({ ...p, howwehelp: { ...p.howwehelp, cards: c } })); }}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                          <textarea rows={2} value={card.desc || ""} placeholder="Description..."
                            onChange={(e) => { const c = [...d.cards]; c[i] = { ...c[i], desc: e.target.value }; setData((p: any) => ({ ...p, howwehelp: { ...p.howwehelp, cards: c } })); }}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Features (one per line)</label>
                        <textarea rows={3}
                          value={(card.features || []).join("\n")}
                          onChange={(e) => { const c = [...d.cards]; c[i] = { ...c[i], features: e.target.value.split("\n").filter(Boolean) }; setData((p: any) => ({ ...p, howwehelp: { ...p.howwehelp, cards: c } })); }}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono"
                          placeholder={"Cremation Ground Booking\nPandit Services\nRitual Materials"} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-xl border border-[#E8DBC5] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-[#3A2A1F]">Stats Bar</h2>
                    <button type="button"
                      onClick={() => addArrayItem("howwehelp", "stats", { value: "", label: "" })}
                      className="flex items-center gap-1 px-3 py-1.5 bg-[#8B6A3E]/10 text-[#8B6A3E] rounded-lg text-sm">
                      <FiPlus size={12} /> Add
                    </button>
                  </div>
                  {(d.stats || []).map((stat: any, i: number) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input type="text" value={stat.icon || ""} placeholder="FaClock"
                        onChange={(e) => { const s = [...d.stats]; s[i] = { ...s[i], icon: e.target.value }; setData((p: any) => ({ ...p, howwehelp: { ...p.howwehelp, stats: s } })); }}
                        className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                      <input type="text" value={stat.value || ""} placeholder="24/7"
                        onChange={(e) => { const s = [...d.stats]; s[i] = { ...s[i], value: e.target.value }; setData((p: any) => ({ ...p, howwehelp: { ...p.howwehelp, stats: s } })); }}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                      <input type="text" value={stat.label || ""} placeholder="Care Coordinators"
                        onChange={(e) => { const s = [...d.stats]; s[i] = { ...s[i], label: e.target.value }; setData((p: any) => ({ ...p, howwehelp: { ...p.howwehelp, stats: s } })); }}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                      <button type="button" onClick={() => removeArrayItem("howwehelp", "stats", i)}
                        className="text-red-400 hover:text-red-600 px-2"><FiTrash2 size={14} /></button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ─── SERVING SECTION ─── */}
            {activeTab === "serving" && (
              <>
                <div className="bg-white rounded-xl border border-[#E8DBC5] p-5">
                  <h2 className="font-semibold text-[#3A2A1F] mb-4">Section Header</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { field: "tag", label: "Tag", placeholder: "Who We Serve" },
                      { field: "title", label: "Title", placeholder: "Serving Humanity" },
                      { field: "titleHighlight", label: "Title Highlight", placeholder: "Beyond Boundaries" },
                    ].map(({ field, label, placeholder }) => (
                      <div key={field}>
                        <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                        <input type="text" value={d[field] || ""}
                          onChange={(e) => setData((prev: any) => ({ ...prev, serving: { ...prev.serving, [field]: e.target.value } }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                      </div>
                    ))}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                      <textarea rows={2} value={d.description || ""}
                        onChange={(e) => setData((prev: any) => ({ ...prev, serving: { ...prev.serving, description: e.target.value } }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-[#E8DBC5] p-5">
                  <h2 className="font-semibold text-[#3A2A1F] mb-4">NRI Segment Content</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">NRI Title</label>
                      <input type="text" value={d.nriTitle || ""}
                        onChange={(e) => setData((prev: any) => ({ ...prev, serving: { ...prev.serving, nriTitle: e.target.value } }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">NRI Subtitle</label>
                      <input type="text" value={d.nriSubtitle || ""}
                        onChange={(e) => setData((prev: any) => ({ ...prev, serving: { ...prev.serving, nriSubtitle: e.target.value } }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">NRI Description</label>
                      <textarea rows={2} value={d.nriDescription || ""}
                        onChange={(e) => setData((prev: any) => ({ ...prev, serving: { ...prev.serving, nriDescription: e.target.value } }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-[#E8DBC5] p-5">
                  <h2 className="font-semibold text-[#3A2A1F] mb-4">Testimonial</h2>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Quote Text</label>
                      <textarea rows={2} value={d.testimonial?.text || ""}
                        onChange={(e) => setData((prev: any) => ({ ...prev, serving: { ...prev.serving, testimonial: { ...prev.serving.testimonial, text: e.target.value } } }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Author</label>
                      <input type="text" value={d.testimonial?.author || ""}
                        onChange={(e) => setData((prev: any) => ({ ...prev, serving: { ...prev.serving, testimonial: { ...prev.serving.testimonial, author: e.target.value } } }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-[#E8DBC5] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-[#3A2A1F]">Segment Features</h2>
                    <button type="button" onClick={() => addArrayItem("serving", "features", { title: "", desc: "", icon: "" })}
                      className="flex items-center gap-1 px-3 py-1.5 bg-[#8B6A3E]/10 text-[#8B6A3E] rounded-lg text-sm">
                      <FiPlus size={12} /> Add Feature
                    </button>
                  </div>
                  {(d.features || []).map((f: any, i: number) => (
                    <div key={i} className="grid grid-cols-3 gap-2 mb-2">
                      <input type="text" value={f.icon || ""} placeholder="Icon (PiHeart)"
                        onChange={(e) => { const st = [...d.features]; st[i] = { ...st[i], icon: e.target.value }; setData((p: any) => ({ ...p, serving: { ...p.serving, features: st } })); }}
                        className="px-2 py-1.5 border border-gray-200 rounded-lg text-sm" />
                      <input type="text" value={f.title || ""} placeholder="Title"
                        onChange={(e) => { const st = [...d.features]; st[i] = { ...st[i], title: e.target.value }; setData((p: any) => ({ ...p, serving: { ...p.serving, features: st } })); }}
                        className="px-2 py-1.5 border border-gray-200 rounded-lg text-sm" />
                      <div className="flex gap-1">
                        <input type="text" value={f.desc || ""} placeholder="Desc"
                          onChange={(e) => { const st = [...d.features]; st[i] = { ...st[i], desc: e.target.value }; setData((p: any) => ({ ...p, serving: { ...p.serving, features: st } })); }}
                          className="flex-1 px-2 py-1.5 border border-gray-200 rounded-lg text-sm" />
                        <button type="button" onClick={() => removeArrayItem("serving", "features", i)} className="text-red-400"><FiTrash2 size={12} /></button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-xl border border-[#E8DBC5] p-5">
                  <h2 className="font-semibold text-[#3A2A1F] mb-4">Ecosystem Tags (comma separated)</h2>
                  <input type="text" value={(d.ecosystemTags || []).join(", ")}
                    onChange={(e) => setData((prev: any) => ({ ...prev, serving: { ...prev.serving, ecosystemTags: e.target.value.split(",").map(s => s.trim()).filter(Boolean) } }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                </div>
              </>
            )}

            {/* ─── SACRED JOURNEY ─── */}
            {activeTab === "sacredjourney" && (
              <>
                <div className="bg-white rounded-xl border border-[#E8DBC5] p-5">
                  <h2 className="font-semibold text-[#3A2A1F] mb-4">Section Header</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { field: "tag", label: "Section Tag", placeholder: "24/7 Care Coordination" },
                      { field: "title", label: "Title", placeholder: "A Journey Guided by Love" },
                    ].map(({ field, label, placeholder }) => (
                      <div key={field}>
                        <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                        <input type="text" value={d[field] || ""}
                          onChange={(e) => setData((prev: any) => ({ ...prev, sacredjourney: { ...prev.sacredjourney, [field]: e.target.value } }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                      </div>
                    ))}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                      <textarea rows={3} value={d.description || ""}
                        onChange={(e) => setData((prev: any) => ({ ...prev, sacredjourney: { ...prev.sacredjourney, description: e.target.value } }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-[#E8DBC5] p-5">
                  <h2 className="font-semibold text-[#3A2A1F] mb-4">Quote Section</h2>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Quote</label>
                      <textarea rows={2} value={d.quote || ""}
                        onChange={(e) => setData((prev: any) => ({ ...prev, sacredjourney: { ...prev.sacredjourney, quote: e.target.value } }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Author / Source</label>
                      <input type="text" value={d.quoteAuthor || ""}
                        onChange={(e) => setData((prev: any) => ({ ...prev, sacredjourney: { ...prev.sacredjourney, quoteAuthor: e.target.value } }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-[#E8DBC5] p-5">
                  <h2 className="font-semibold text-[#3A2A1F] mb-4">Footer & Benefits</h2>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Footer Subtext</label>
                      <input type="text" value={d.footerText || ""}
                        onChange={(e) => setData((prev: any) => ({ ...prev, sacredjourney: { ...prev.sacredjourney, footerText: e.target.value } }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Benefits (comma separated)</label>
                      <input type="text" value={(d.benefits || []).join(", ")}
                        onChange={(e) => setData((prev: any) => ({ ...prev, sacredjourney: { ...prev.sacredjourney, benefits: e.target.value.split(",").map(s => s.trim()).filter(Boolean) } }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-[#E8DBC5] p-5">
                  <h2 className="font-semibold text-[#3A2A1F] mb-4">Background Image</h2>
                  <input type="file" accept="image/*" className="hidden" ref={fileRef}
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUploadImage(f, "sacredjourney", "image"); }} />
                  <div className="flex gap-3 items-center">
                    {d.image && <img src={resolveImagePath(d.image)} alt="bg" className="w-24 h-16 object-cover rounded-lg" />}
                    <div className="flex-1">
                      <button type="button" onClick={() => fileRef.current?.click()}
                        className="flex items-center gap-2 px-3 py-2 border-2 border-dashed border-[#8B6A3E]/40 text-[#8B6A3E] rounded-lg text-sm w-full justify-center mb-2">
                        <FiUpload size={14} /> {uploading ? "Uploading..." : "Upload Image"}
                      </button>
                      <input type="text" value={d.image || ""}
                        onChange={(e) => setData((prev: any) => ({ ...prev, sacredjourney: { ...prev.sacredjourney, image: e.target.value } }))}
                        className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg" placeholder="Image URL..." />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-[#E8DBC5] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-[#3A2A1F]">Steps / Process</h2>
                    <button type="button"
                      onClick={() => addArrayItem("sacredjourney", "steps", { step: String((d.steps || []).length + 1), title: "", desc: "" })}
                      className="flex items-center gap-1 px-3 py-1.5 bg-[#8B6A3E]/10 text-[#8B6A3E] rounded-lg text-sm">
                      <FiPlus size={12} /> Add Step
                    </button>
                  </div>
                  {(d.steps || []).map((step: any, i: number) => (
                    <div key={i} className="flex gap-2 mb-3 items-start">
                      <input type="text" value={step.step || ""} placeholder="#"
                        onChange={(e) => { const s = [...d.steps]; s[i] = { ...s[i], step: e.target.value }; setData((p: any) => ({ ...p, sacredjourney: { ...p.sacredjourney, steps: s } })); }}
                        className="w-12 px-2 py-2 border border-gray-200 rounded-lg text-sm text-center" />
                      <input type="text" value={step.title || ""} placeholder="Step title"
                        onChange={(e) => { const s = [...d.steps]; s[i] = { ...s[i], title: e.target.value }; setData((p: any) => ({ ...p, sacredjourney: { ...p.sacredjourney, steps: s } })); }}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                      <input type="text" value={step.desc || ""} placeholder="Description"
                        onChange={(e) => { const s = [...d.steps]; s[i] = { ...s[i], desc: e.target.value }; setData((p: any) => ({ ...p, sacredjourney: { ...p.sacredjourney, steps: s } })); }}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                      <button type="button" onClick={() => removeArrayItem("sacredjourney", "steps", i)}
                        className="text-red-400 hover:text-red-600 px-2 py-2"><FiTrash2 size={14} /></button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ─── MANTRA SECTION ─── */}
            {activeTab === "mantra" && (
              <>
                <div className="bg-white rounded-xl border border-[#E8DBC5] p-5">
                  <h2 className="font-semibold text-[#3A2A1F] mb-4">Text Content</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { field: "symbol", label: "Symbol", placeholder: "ॐ" },
                      { field: "title", label: "Main Title", placeholder: "Moksha Voyage" },
                      { field: "subtitle", label: "Subtitle", placeholder: "Sacred Wisdom" },
                      { field: "tagline", label: "Tagline", placeholder: "India's First End-to-End Cremation Platform" },
                    ].map(({ field, label, placeholder }) => (
                      <div key={field}>
                        <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                        <input
                          type="text"
                          value={d[field] || ""}
                          onChange={(e) => setData((prev: any) => ({ ...prev, mantra: { ...prev.mantra, [field]: e.target.value } }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]/30"
                          placeholder={placeholder}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-[#E8DBC5] p-5">
                  <h2 className="font-semibold text-[#3A2A1F] mb-4">Shlok & Spiritual Text</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Shlok (Sanskrit)</label>
                      <textarea
                        value={d.shlok || ""}
                        onChange={(e) => setData((prev: any) => ({ ...prev, mantra: { ...prev.mantra, shlok: e.target.value } }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]/30"
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Transliteration Line 1</label>
                        <input type="text" value={d.transliteration1 || ""}
                          onChange={(e) => setData((p: any) => ({ ...p, mantra: { ...p.mantra, transliteration1: e.target.value } }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Transliteration Line 2</label>
                        <input type="text" value={d.transliteration2 || ""}
                          onChange={(e) => setData((p: any) => ({ ...p, mantra: { ...p.mantra, transliteration2: e.target.value } }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Our Promise / Standard of Care</label>
                      <textarea
                        value={d.promise || ""}
                        onChange={(e) => setData((prev: any) => ({ ...prev, mantra: { ...prev.mantra, promise: e.target.value } }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]/30"
                        rows={2}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Spiritual Meaning</label>
                      <textarea
                        value={d.meaning || ""}
                        onChange={(e) => setData((prev: any) => ({ ...prev, mantra: { ...prev.mantra, meaning: e.target.value } }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]/30"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-[#E8DBC5] p-5">
                  <h2 className="font-semibold text-[#3A2A1F] mb-4">Visuals & Pillars</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Side Image</label>
                      <input type="file" accept="image/*" className="hidden" ref={fileRef}
                        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUploadImage(f, "mantra", "image"); }} />
                      <div className="flex gap-3 items-center">
                        {d.image && <img src={resolveImagePath(d.image)} alt="mantra" className="w-24 h-16 object-cover rounded-lg" />}
                        <div className="flex-1">
                          <button type="button" onClick={() => fileRef.current?.click()}
                            className="flex items-center gap-2 px-3 py-2 border-2 border-dashed border-[#8B6A3E]/40 text-[#8B6A3E] rounded-lg text-sm w-full justify-center mb-2">
                            <FiUpload size={14} /> {uploading ? "Uploading..." : "Upload Image"}
                          </button>
                          <input type="text" value={d.image || ""}
                            onChange={(e) => setData((prev: any) => ({ ...prev, mantra: { ...prev.mantra, image: e.target.value } }))}
                            className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg" placeholder="Image URL..." />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Core Pillars (comma separated)</label>
                      <input type="text" value={(d.pillars || []).join(", ")}
                        onChange={(e) => setData((prev: any) => ({ ...prev, mantra: { ...prev.mantra, pillars: e.target.value.split(",").map(s => s.trim()).filter(Boolean) } }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-[#E8DBC5] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-[#3A2A1F]">Statistics</h2>
                    <button type="button" onClick={() => addArrayItem("mantra", "stats", { value: "", label: "" })}
                      className="flex items-center gap-1 px-3 py-1.5 bg-[#8B6A3E]/10 text-[#8B6A3E] rounded-lg text-sm">
                      <FiPlus size={12} /> Add Stat
                    </button>
                  </div>
                  {(d.stats || []).map((s: any, i: number) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input type="text" value={s.value || ""} placeholder="50+"
                        onChange={(e) => { const st = [...d.stats]; st[i] = { ...st[i], value: e.target.value }; setData((p: any) => ({ ...p, mantra: { ...p.mantra, stats: st } })); }}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                      <input type="text" value={s.label || ""} placeholder="Pandits"
                        onChange={(e) => { const st = [...d.stats]; st[i] = { ...st[i], label: e.target.value }; setData((p: any) => ({ ...p, mantra: { ...p.mantra, stats: st } })); }}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                      <button type="button" onClick={() => removeArrayItem("mantra", "stats", i)}
                        className="text-red-400 px-2"><FiTrash2 size={14} /></button>
                    </div>
                  ))}
                </div>
              </>
            )}

          </div>
        )}

        {/* Sticky save bar */}
        <div className="mt-6 flex justify-end">
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-[#8B6A3E] text-white rounded-xl font-medium hover:bg-[#7A5A2E] transition-colors disabled:opacity-60">
            <FiSave size={16} />
            {saving ? "Saving changes..." : `Save ${TABS.find((t) => t.id === activeTab)?.label || ""}`}
          </button>
        </div>
      </div>
    </div>
  );
}
