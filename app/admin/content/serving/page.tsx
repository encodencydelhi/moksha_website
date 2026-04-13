"use client";

import { useEffect, useState, useRef } from "react";
import { getComponentByKey, updateComponentByKey, uploadImage, resolveImagePath } from "@/lib/apiClient";
import { FiSave, FiUpload, FiPlus, FiTrash2, FiChevronLeft } from "react-icons/fi";
import Link from "next/link";

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
  ],
  testimonial: {
    text: "Living in London when my father passed in Delhi, I was paralysed. Moksha Voyage became my eyes, my hands, and my voice in India.",
    author: "Priya Sharma, London, UK"
  },
  ecosystemTags: ["Professional Counselling", "Peer Support Groups", "Children & Grief Resources"],
};

export default function ServingAdmin() {
  const [data, setData] = useState<any>(DEFAULT_SERVING);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getComponentByKey("serving");
        if (res.data?.success && res.data?.data?.customData) {
          setData({ ...DEFAULT_SERVING, ...res.data.data.customData });
        }
      } catch (err: any) {
        if (err.response?.status !== 404) {
          console.error("Failed to load Serving data:", err.message);
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
      await updateComponentByKey("serving", {
        componentKey: "serving",
        label: "Serving Section",
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
        // Store relative URL instead of hardcoded localhost
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

  const updateNested = (field: string, subField: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [field]: { ...prev[field], [subField]: value }
    }));
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/content" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <FiChevronLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-[#3A2A1F]">Edit Serving Section</h1>
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
            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-[#5A3E2B] uppercase tracking-wider">Main Title</label>
                <span className="text-[10px] text-gray-400 font-mono">{data.title?.length || 0} / 60</span>
              </div>
              <input 
                type="text" 
                value={data.title} 
                maxLength={60}
                onChange={(e) => setData({...data, title: e.target.value})} 
                className="w-full px-4 py-2.5 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm mb-4 focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none transition-all" 
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
                onChange={(e) => setData({...data, titleHighlight: e.target.value})} 
                className="w-full px-4 py-2.5 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none transition-all" 
                placeholder="Highlighted Title"
              />
            </div>
            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-[#5A3E2B] uppercase tracking-wider">Section Description</label>
                <span className="text-[10px] text-gray-400 font-mono">{data.description?.length || 0} / 250</span>
              </div>
              <textarea 
                value={data.description} 
                maxLength={250}
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
            Visuals
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-56 aspect-square relative bg-gray-50 rounded-2xl overflow-hidden border-2 border-dashed border-[#E8DBC5] flex items-center justify-center group">
              {data.image ? (
                <>
                  <img src={resolveImagePath(data.image)} alt="Serving" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
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
            NRI Community Focus
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-[#5A3E2B] uppercase tracking-wider">NRI Title</label>
                <span className="text-[10px] text-gray-400 font-mono">{data.nriTitle?.length || 0} / 60</span>
              </div>
              <input type="text" value={data.nriTitle} maxLength={60} onChange={(e) => setData({...data, nriTitle: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none transition-all" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-[#5A3E2B] uppercase tracking-wider">NRI Subtitle</label>
                <span className="text-[10px] text-gray-400 font-mono">{data.nriSubtitle?.length || 0} / 60</span>
              </div>
              <input type="text" value={data.nriSubtitle} maxLength={60} onChange={(e) => setData({...data, nriSubtitle: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none transition-all" />
            </div>
            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-[#5A3E2B] uppercase tracking-wider">NRI Specific Description</label>
                <span className="text-[10px] text-gray-400 font-mono">{data.nriDescription?.length || 0} / 400</span>
              </div>
              <textarea value={data.nriDescription} maxLength={400} onChange={(e) => setData({...data, nriDescription: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none resize-none transition-all" rows={4} />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-[#E8DBC5] p-8 shadow-sm">
          <h2 className="text-xl font-bold text-[#2C1810] mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#8B6A3E] rounded-full"></span>
            Testimonial
          </h2>
          <div className="space-y-4">
             <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-[#5A3E2B] uppercase tracking-wider">Quote Text</label>
                  <span className="text-[10px] text-gray-400 font-mono">{data.testimonial?.text?.length || 0} / 300</span>
                </div>
                <textarea value={data.testimonial?.text} maxLength={300} onChange={(e) => updateNested("testimonial", "text", e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none resize-none italic" rows={3} placeholder="Quote text" />
             </div>
             <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-[#5A3E2B] uppercase tracking-wider">Author Details</label>
                  <span className="text-[10px] text-gray-400 font-mono">{data.testimonial?.author?.length || 0} / 60</span>
                </div>
                <input type="text" value={data.testimonial?.author} maxLength={60} onChange={(e) => updateNested("testimonial", "author", e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none transition-all" placeholder="Author name" />
             </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-[#E8DBC5] p-8 shadow-sm">
          <h2 className="text-xl font-bold text-[#2C1810] mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#8B6A3E] rounded-full"></span>
            Ecosystem Tags
          </h2>
          <div className="p-6 bg-[#FDF8F2]/50 rounded-2xl border border-[#E8DBC5]">
             <label className="block text-[10px] font-bold text-[#5A3E2B] uppercase tracking-wider mb-2">Comma separated tags</label>
             <input
               type="text"
               value={(data.ecosystemTags || []).join(", ")}
               onChange={(e) => setData({...data, ecosystemTags: e.target.value.split(",").map(s => s.trim()).filter(Boolean)})}
               className="w-full px-4 py-3 bg-white border border-[#E8DBC5] rounded-xl text-sm focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none"
               placeholder="Tag 1, Tag 2, Tag 3..."
             />
             <div className="mt-4 flex flex-wrap gap-2">
                {(data.ecosystemTags || []).map((tag: any, i: number) => (
                   <span key={i} className="px-3 py-1 bg-white border border-[#E8DBC5] rounded-full text-xs text-[#8B6A3E] font-medium">#{tag}</span>
                ))}
             </div>
          </div>
        </section>
      </div>
    </div>
  );
}
