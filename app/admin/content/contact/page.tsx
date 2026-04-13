"use client";

import { useEffect, useState } from "react";
import { getComponentByKey, updateComponentByKey } from "@/lib/apiClient";
import { FiSave, FiMapPin, FiPhone, FiMail, FiClock, FiShare2 } from "react-icons/fi";

const DEFAULT_CONTACT = {
  header: {
    title: "Get in Touch",
    subtitle: "We are here to support you 24/7 with compassion and care.",
  },
  infoCards: [
    { type: "Address", value: "A-53, Sector 6, Noida, Uttar Pradesh 201301", icon: "MapPin" },
    { type: "Phone", value: "+91 1800 123 4567", subValue: "24/7 Helpline", icon: "Phone" },
    { type: "Email", value: "support@mokshavoyage.com", subValue: "General Inquiries", icon: "Mail" },
    { type: "Working Hours", value: "Monday - Sunday", subValue: "Open 24 Hours", icon: "Clock" },
  ],
  googleMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.4616233481235!2d77.3117565761004!3d28.58591348619999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce45f7823f009%3A0xea802521c7cb87a!2sNoida%20Sector%206!5e0!3m2!1sen!2sin!4v1709555555555!5m2!1sen!2sin",
  form: {
    title: "Send a Message",
    subtitle: "Fill out the form below and our care coordinator will contact you within 15 minutes.",
  }
};

export default function AdminContactPage() {
  const [contact, setContact] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (key: string, value: any) => {
    setContact((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleUpdateSection = (section: string, key: string, value: any) => {
    setContact((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value }
    }));
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getComponentByKey("contact_page");
        if (res.data?.success && res.data?.data?.customData) {
          setContact(res.data.data.customData);
        } else {
          setContact(DEFAULT_CONTACT);
        }
      } catch (err) {
        setContact(DEFAULT_CONTACT);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleUpdateCard = (index: number, key: string, value: any) => {
    setContact((prev: any) => {
      const cards = [...(prev.infoCards || [])];
      cards[index] = { ...cards[index], [key]: value };
      return { ...prev, infoCards: cards };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const res = await updateComponentByKey("contact_page", { customData: contact });
      if (res.data?.success) {
        setMessage("✓ Contact page updated successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setError("Failed to update contact page");
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
      <p>Loading Contact Page Settings...</p>
    </div>
  );

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#3A2A1F]">Contact Page Editor</h1>
          <p className="text-[#8B6A3E]">Manage contact info cards, map and form text</p>
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

      <div className="space-y-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl border border-[#E8DBC5] p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#3A2A1F] mb-4">1. Header Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={contact.header.title}
                onChange={(e) => handleUpdateSection("header", "title", e.target.value)}
                className="w-full px-4 py-2 border border-[#E8DBC5] rounded-xl outline-none focus:ring-2 focus:ring-[#8B6A3E]/30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
              <input
                type="text"
                value={contact.header.subtitle}
                onChange={(e) => handleUpdateSection("header", "subtitle", e.target.value)}
                className="w-full px-4 py-2 border border-[#E8DBC5] rounded-xl outline-none focus:ring-2 focus:ring-[#8B6A3E]/30"
              />
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="bg-white rounded-2xl border border-[#E8DBC5] p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#3A2A1F] mb-6">2. Contact Info Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contact.infoCards.map((card: any, idx: number) => (
              <div key={idx} className="p-5 bg-[#FDF8F2] rounded-2xl border border-[#E8DBC5]">
                <div className="flex items-center gap-3 mb-4">
                   <div className="p-2 bg-[#8B6A3E]/10 rounded-lg">
                      {card.icon === "MapPin" && <FiMapPin className="text-[#8B6A3E]" />}
                      {card.icon === "Phone" && <FiPhone className="text-[#8B6A3E]" />}
                      {card.icon === "Mail" && <FiMail className="text-[#8B6A3E]" />}
                      {card.icon === "Clock" && <FiClock className="text-[#8B6A3E]" />}
                   </div>
                   <input
                     value={card.type}
                     onChange={(e) => handleUpdateCard(idx, "type", e.target.value)}
                     className="font-bold text-[#3A2A1F] bg-transparent outline-none flex-1 border-b border-transparent focus:border-[#8B6A3E]"
                   />
                </div>
                <div className="space-y-3">
                  <input
                    placeholder="Primary Value"
                    value={card.value}
                    onChange={(e) => handleUpdateCard(idx, "value", e.target.value)}
                    className="w-full px-3 py-1.5 border border-[#E8DBC5] rounded-lg text-sm outline-none bg-white"
                  />
                  {idx > 0 && (
                    <input
                      placeholder="Sub Label (e.g. 24/7 Helpline)"
                      value={card.subValue || ""}
                      onChange={(e) => handleUpdateCard(idx, "subValue", e.target.value)}
                      className="w-full px-3 py-1.5 border border-[#E8DBC5] rounded-lg text-sm outline-none bg-white"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-2xl border border-[#E8DBC5] p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#3A2A1F] mb-4 flex items-center gap-2">
            <FiShare2 className="text-[#8B6A3E]" /> 3. Google Map Integration
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps Embed URL</label>
            <textarea
              value={contact.googleMapUrl}
              onChange={(e) => handleChange("googleMapUrl", e.target.value)}
              className="w-full px-4 py-2 border border-[#E8DBC5] rounded-xl outline-none focus:ring-2 focus:ring-[#8B6A3E]/30 h-20 text-xs font-mono"
              placeholder="Paste embed link here..."
            />
            <p className="text-[10px] text-gray-400 mt-1 italic">Note: Only paste the URL found in the 'src' attribute of the Google Maps iframe.</p>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl border border-[#E8DBC5] p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#3A2A1F] mb-4">4. Inquiry Form Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Form Title</label>
              <input
                type="text"
                value={contact.form.title}
                onChange={(e) => handleUpdateSection("form", "title", e.target.value)}
                className="w-full px-4 py-2 border border-[#E8DBC5] rounded-xl outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Form Subtitle</label>
              <input
                type="text"
                value={contact.form.subtitle}
                onChange={(e) => handleUpdateSection("form", "subtitle", e.target.value)}
                className="w-full px-4 py-2 border border-[#E8DBC5] rounded-xl outline-none"
              />
            </div>
          </div>
        </div>
      </div>

       <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur border-t border-[#E8DBC5] flex lg:hidden">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-3 bg-[#8B6A3E] text-white rounded-xl font-semibold shadow-lg active:scale-95 transition-all"
          >
            {saving ? "Saving Changes..." : "Update Contact Page"}
          </button>
       </div>
    </div>
  );
}
