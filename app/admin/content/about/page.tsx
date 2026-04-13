"use client";

import { useEffect, useState } from "react";
import { getComponentByKey, updateComponentByKey, uploadImage, resolveImagePath } from "@/lib/apiClient";
import { FiUpload, FiX, FiPlus, FiTrash2, FiSave, FiEye, FiTarget, FiHeart, FiStar } from "react-icons/fi";

const DEFAULT_ABOUT = {
  hero: {
    tag: "A Promise Born from Loss",
    title: "About",
    titleHighlight: "Moksha Voyage",
    quote: '"Moksha Voyage was founded not in a boardroom, but in the quiet, aching moments following a deeply personal family loss. That pain revealed a universal truth: families are left to navigate their most sacred duty entirely alone."',
  },
  stats: [
    { value: "24/7", label: "Care Coordination", desc: "365 days a year", icon: "Clock" },
    { value: "30M+", label: "NRI Community", desc: "Global Indian diaspora", icon: "Globe" },
    { value: "500+", label: "Verified Providers", desc: "Across India", icon: "Users" },
    { value: "100%", label: "Transparency", desc: "No hidden charges", icon: "Shield" },
  ],
  founder: {
    title: "A Promise Born",
    titleHighlight: "from Loss",
    description: "Our founder experienced firsthand the devastating combination of grief and logistical chaos — the frantic calls to unknown service providers, the fear of being misled during vulnerability, and the profound disconnect of trying to honour a loved one from thousands of miles away.",
    founderQuote: '"The frantic calls to unknown service providers, the fear of being misled during vulnerability, the profound disconnect of trying to honour a loved one from thousands of miles away."',
    image: "/assets/grahpravesh.jpg",
    stats: [
      { value: "Since 2015", label: "Founded" },
      { value: "12,000 Cr", label: "Market Size" },
      { value: "30M+", label: "NRI Served" },
    ]
  },
  visionMission: [
    { title: "Our Vision", desc: "A world where every person can experience a dignified, peaceful end-of-life journey.", icon: "Eye" },
    { title: "Our Mission", desc: "To build a trusted, transparent digital ecosystem connecting families with verified services.", icon: "Target" },
    { title: "Our Promise", desc: "Every family will receive the same standard of care, respect, and transparency we would want for our own.", icon: "Heart" },
  ],
  objectives: [
    { title: "SIMPLIFY", desc: "Transform complexity into clear steps." },
    { title: "CONNECT", desc: "Build a verified 24/7 network." },
    { title: "PROTECT", desc: "Guarantee pricing transparency." },
    { title: "HONOUR", desc: "Create lasting digital legacies." },
    { title: "SERVE", desc: "Embed social impact via Seva Fund." },
  ]
};

export default function AdminAboutPage() {
  const [about, setAbout] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getComponentByKey("about_page");
        if (res.data?.success && res.data?.data?.customData) {
          setAbout(res.data.data.customData);
        } else {
          setAbout(DEFAULT_ABOUT);
        }
      } catch (err) {
        setAbout(DEFAULT_ABOUT);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleUpdateSection = (section: string, key: string, value: any) => {
    setAbout((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value }
    }));
  };

  const handleUpdateArrayItem = (arrayKey: string, index: number, key: string, value: any) => {
    setAbout((prev: any) => {
      const arr = [...(prev[arrayKey] || [])];
      arr[index] = { ...arr[index], [key]: value };
      return { ...prev, [arrayKey]: arr };
    });
  };

  const handleFounderStatChange = (index: number, key: string, value: any) => {
    setAbout((prev: any) => {
      const stats = [...(prev.founder.stats || [])];
      stats[index] = { ...stats[index], [key]: value };
      return { ...prev, founder: { ...prev.founder, stats } };
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadImage(formData);
      if (res.data?.success) {
        const url = res.data.data.url;
        handleUpdateSection("founder", "image", url);
        setMessage("Image uploaded successfully!");
      }
    } catch (err) {
      setError("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const res = await updateComponentByKey("about_page", { customData: about });
      if (res.data?.success) {
        setMessage("✓ About page updated successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setError("Failed to update about page");
      }
    } catch (err) {
      setError("An error occurred while saving");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="p-8 text-center text-[#8B6A3E]">
      <div className="animate-spin h-10 w-10 border-4 border-[#8B6A3E] border-t-transparent rounded-full mx-auto mb-4"></div>
      <p>Loading About Page Settings...</p>
    </div>
  );

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#3A2A1F]">About Page Editor</h1>
          <p className="text-[#8B6A3E]">Comprehensive content management for the About Us page</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-[#8B6A3E] text-white rounded-xl font-semibold hover:bg-[#7A5A2E] transition-all"
        >
          <FiSave /> {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {message && <div className="mb-4 p-4 bg-green-100 border border-green-200 text-green-700 rounded-lg">{message}</div>}
      {error && <div className="mb-4 p-4 bg-red-100 border border-red-200 text-red-700 rounded-lg">{error}</div>}

      <div className="space-y-10">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl border border-[#E8DBC5] p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#3A2A1F] mb-6 flex items-center gap-2 underline decoration-[#8B6A3E]/30 underline-offset-4">
            1. Hero Section
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tag (Small label)</label>
                <input
                  type="text"
                  value={about.hero.tag}
                  onChange={(e) => handleUpdateSection("hero", "tag", e.target.value)}
                  className="w-full px-4 py-2 border border-[#E8DBC5] rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Main Title</label>
                <input
                  type="text"
                  value={about.hero.title}
                  onChange={(e) => handleUpdateSection("hero", "title", e.target.value)}
                  className="w-full px-4 py-2 border border-[#E8DBC5] rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title Highlight (Gold text)</label>
                <input
                  type="text"
                  value={about.hero.titleHighlight}
                  onChange={(e) => handleUpdateSection("hero", "titleHighlight", e.target.value)}
                  className="w-full px-4 py-2 border border-[#E8DBC5] rounded-xl"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hero Quote</label>
              <textarea
                value={about.hero.quote}
                onChange={(e) => handleUpdateSection("hero", "quote", e.target.value)}
                className="w-full px-4 py-2 border border-[#E8DBC5] rounded-xl h-[178px] resize-none"
              />
            </div>
          </div>
        </div>

        {/* Founder's Story Section */}
        <div className="bg-white rounded-2xl border border-[#E8DBC5] p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#3A2A1F] mb-6 flex items-center gap-2 underline decoration-[#8B6A3E]/30 underline-offset-4">
            2. Founder's Story
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-4">
              <label className="block text-sm font-bold text-gray-700">Display Image</label>
              <div className="relative w-full aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden border border-[#E8DBC5]">
                <img src={resolveImagePath(about.founder.image)} alt="Founder" className="w-full h-full object-cover" />
                <label className="absolute bottom-4 right-4 cursor-pointer p-3 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white transition-colors">
                  <FiUpload className="text-[#8B6A3E]" />
                  <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                </label>
              </div>
            </div>
            
            <div className="lg:col-span-2 space-y-6">
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={about.founder.title}
                      onChange={(e) => handleUpdateSection("founder", "title", e.target.value)}
                      className="w-full px-4 py-2 border border-[#E8DBC5] rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title Highlight</label>
                    <input
                      type="text"
                      value={about.founder.titleHighlight}
                      onChange={(e) => handleUpdateSection("founder", "titleHighlight", e.target.value)}
                      className="w-full px-4 py-2 border border-[#E8DBC5] rounded-xl"
                    />
                  </div>
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Main Story Text</label>
                 <textarea
                   value={about.founder.description}
                   onChange={(e) => handleUpdateSection("founder", "description", e.target.value)}
                   className="w-full px-4 py-2 border border-[#E8DBC5] rounded-xl h-32"
                 />
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Founder's Quote (Card overlay)</label>
                 <textarea
                   value={about.founder.founderQuote}
                   onChange={(e) => handleUpdateSection("founder", "founderQuote", e.target.value)}
                   className="w-full px-4 py-2 border border-[#E8DBC5] rounded-xl h-24"
                 />
               </div>

               <div className="grid grid-cols-3 gap-4">
                 {about.founder.stats.map((stat: any, idx: number) => (
                   <div key={idx} className="p-3 bg-[#FDF8F2] rounded-xl border border-[#E8DBC5]">
                     <input
                       value={stat.value}
                       onChange={(e) => handleFounderStatChange(idx, "value", e.target.value)}
                       className="w-full bg-transparent font-bold text-[#3A2A1F] text-center mb-1 outline-none"
                     />
                     <input
                       value={stat.label}
                       onChange={(e) => handleFounderStatChange(idx, "label", e.target.value)}
                       className="w-full bg-transparent text-xs text-[#8B6A3E] text-center outline-none"
                     />
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission cards */}
        <div className="bg-white rounded-2xl border border-[#E8DBC5] p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#3A2A1F] mb-6 flex items-center gap-2 underline decoration-[#8B6A3E]/30 underline-offset-4">
            3. Vision, Mission & Promise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {about.visionMission.map((item: any, idx: number) => (
              <div key={idx} className="p-5 border border-[#F5E9D9] rounded-2xl space-y-4">
                <div className="flex items-center gap-2">
                   <div className="p-2 bg-[#8B6A3E]/10 rounded-lg">
                      {item.icon === "Eye" && <FiEye className="text-[#8B6A3E]" />}
                      {item.icon === "Target" && <FiTarget className="text-[#8B6A3E]" />}
                      {item.icon === "Heart" && <FiHeart className="text-[#8B6A3E]" />}
                   </div>
                   <input
                     value={item.title}
                     onChange={(e) => handleUpdateArrayItem("visionMission", idx, "title", e.target.value)}
                     className="font-bold text-[#3A2A1F] outline-none border-b border-transparent focus:border-[#8B6A3E]"
                   />
                </div>
                <textarea
                  value={item.desc}
                  onChange={(e) => handleUpdateArrayItem("visionMission", idx, "desc", e.target.value)}
                  className="w-full h-24 text-sm text-gray-600 border border-[#E8DBC5] rounded-lg p-2 resize-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Objectives */}
        <div className="bg-white rounded-2xl border border-[#E8DBC5] p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#3A2A1F] mb-6 flex items-center gap-2 underline decoration-[#8B6A3E]/30 underline-offset-4">
            4. Five Core Objectives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {about.objectives.map((item: any, idx: number) => (
              <div key={idx} className="p-4 bg-[#FDF8F2] rounded-xl border border-[#E8DBC5] space-y-3">
                 <input
                   value={item.title}
                   onChange={(e) => handleUpdateArrayItem("objectives", idx, "title", e.target.value)}
                   className="w-full font-bold text-[#8B6A3E] text-center border-b border-[#E8DBC5] pb-1 uppercase text-sm"
                 />
                 <textarea
                   value={item.desc}
                   onChange={(e) => handleUpdateArrayItem("objectives", idx, "desc", e.target.value)}
                   className="w-full h-24 text-xs text-gray-600 bg-white rounded-lg p-2 resize-none border border-[#E8DBC5]"
                 />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
