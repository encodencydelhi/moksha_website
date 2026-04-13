"use client";

import { useEffect, useState } from "react";
import { getComponentByKey, updateComponentByKey, uploadImage, resolveImagePath } from "@/lib/apiClient";
import { FiUpload, FiX, FiPlus, FiTrash2, FiSave, FiMapPin, FiPhone, FiMail, FiGlobe } from "react-icons/fi";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const DEFAULT_FOOTER = {
  brandName: "Moksha Voyage",
  logo: "/assets/logoreal.jpeg",
  tagline: "Compassionate End-of-Life Guidance",
  description: "Providing respectful guidance with dignity, tradition and care for every family.",
  socialLinks: {
    facebook: "#",
    instagram: "#",
    twitter: "#",
    youtube: "#",
  },
  email: "info@moksha.com",
  phone: "+91-XXXXXXXXXX",
  address: "Address not set",
  quickLinks: [
    { label: "Home", link: "/" },
    { label: "About", link: "/about" },
    { label: "Services", link: "/services" },
    { label: "Contact", link: "/contact" },
  ],
  services: [
    { label: "Ritual Guidance", link: "/rituals" },
    { label: "Planning Support", link: "/planning" },
    { label: "Documentation", link: "/docs" },
    { label: "24/7 Care", link: "/care" },
  ],
};

export default function AdminFooterPage() {
  const [footer, setFooter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getComponentByKey("footer");
        if (res.data?.success && res.data?.data?.customData) {
          setFooter(res.data.data.customData);
        } else {
          setFooter(DEFAULT_FOOTER);
        }
      } catch (err) {
        setFooter(DEFAULT_FOOTER);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleChange = (key: string, value: any) => {
    setFooter((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSocialChange = (key: string, value: any) => {
    setFooter((prev: any) => ({
      ...prev,
      socialLinks: { ...(prev.socialLinks || {}), [key]: value }
    }));
  };

  const handleLinkChange = (section: 'quickLinks' | 'services', index: number, key: string, value: any) => {
    setFooter((prev: any) => {
      const items = [...(prev[section] || [])];
      items[index] = { ...items[index], [key]: value };
      return { ...prev, [section]: items };
    });
  };

  const addLink = (section: 'quickLinks' | 'services') => {
    setFooter((prev: any) => ({
      ...prev,
      [section]: [...(prev[section] || []), { label: "New Link", link: "/" }]
    }));
  };

  const removeLink = (section: 'quickLinks' | 'services', index: number) => {
    setFooter((prev: any) => ({
      ...prev,
      [section]: (prev[section] || []).filter((_: any, i: number) => i !== index)
    }));
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadImage(formData);
      if (res.data?.success) {
        const url = res.data.data.url;
        handleChange("logo", url);
        setMessage("Logo uploaded successfully!");
      }
    } catch (err) {
      setError("Logo upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const res = await updateComponentByKey("footer", { customData: footer });
      if (res.data?.success) {
        setMessage("✓ Footer updated successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setError("Failed to update footer");
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
      <p>Loading Footer Settings...</p>
    </div>
  );

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#3A2A1F]">Footer Settings</h1>
          <p className="text-[#8B6A3E]">Manage social links, contact info, and footer columns</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-[#8B6A3E] text-white rounded-xl font-semibold hover:bg-[#7A5A2E] transition-all disabled:opacity-50"
        >
          <FiSave /> {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {message && <div className="mb-4 p-4 bg-green-100 border border-green-200 text-green-700 rounded-lg">{message}</div>}
      {error && <div className="mb-4 p-4 bg-red-100 border border-red-200 text-red-700 rounded-lg">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Branding & Social */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#E8DBC5] p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#3A2A1F] mb-4 flex items-center gap-2">
               Branding & Logo
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-[#FDF8F2] rounded-xl border border-[#E8DBC5] flex items-center justify-center overflow-hidden">
                  <img src={resolveImagePath(footer.logo)} alt="Footer Logo" className="w-full h-full object-cover" />
                </div>
                <label className="cursor-pointer px-4 py-2 bg-[#FDF8F2] text-[#8B6A3E] border border-[#E8DBC5] rounded-lg text-sm hover:bg-[#F5E9D9] transition-colors">
                  {uploading ? "Uploading..." : "Change Logo"}
                  <input type="file" className="hidden" onChange={handleLogoUpload} accept="image/*" />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
                <input
                  type="text"
                  value={footer.brandName || ""}
                  onChange={(e) => handleChange("brandName", e.target.value)}
                  className="w-full px-4 py-2 border border-[#E8DBC5] rounded-xl outline-none focus:ring-2 focus:ring-[#8B6A3E]/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
                <input
                  type="text"
                  value={footer.tagline || ""}
                  onChange={(e) => handleChange("tagline", e.target.value)}
                  className="w-full px-4 py-2 border border-[#E8DBC5] rounded-xl outline-none focus:ring-2 focus:ring-[#8B6A3E]/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={footer.description || ""}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="w-full px-4 py-2 border border-[#E8DBC5] rounded-xl outline-none focus:ring-2 focus:ring-[#8B6A3E]/30"
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8DBC5] p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#3A2A1F] mb-4 flex items-center gap-2">
               Social Media Links
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <FaFacebook className="text-blue-600 size-5" />
                <input
                  placeholder="Facebook URL"
                  value={footer.socialLinks.facebook}
                  onChange={(e) => handleSocialChange("facebook", e.target.value)}
                  className="flex-1 px-3 py-1.5 border border-[#E8DBC5] rounded-lg text-sm"
                />
              </div>
              <div className="flex items-center gap-3">
                <FaInstagram className="text-pink-600 size-5" />
                <input
                  placeholder="Instagram URL"
                  value={footer.socialLinks.instagram}
                  onChange={(e) => handleSocialChange("instagram", e.target.value)}
                  className="flex-1 px-3 py-1.5 border border-[#E8DBC5] rounded-lg text-sm"
                />
              </div>
              <div className="flex items-center gap-3">
                <FaTwitter className="text-sky-500 size-5" />
                <input
                  placeholder="Twitter URL"
                  value={footer.socialLinks.twitter}
                  onChange={(e) => handleSocialChange("twitter", e.target.value)}
                  className="flex-1 px-3 py-1.5 border border-[#E8DBC5] rounded-lg text-sm"
                />
              </div>
              <div className="flex items-center gap-3">
                <FaYoutube className="text-red-600 size-5" />
                <input
                  placeholder="Youtube URL"
                  value={footer.socialLinks.youtube}
                  onChange={(e) => handleSocialChange("youtube", e.target.value)}
                  className="flex-1 px-3 py-1.5 border border-[#E8DBC5] rounded-lg text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact info & Links */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#E8DBC5] p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#3A2A1F] mb-4 flex items-center gap-2">
               Contact Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FiMapPin className="text-[#8B6A3E]" />
                <input
                  placeholder="Physical Address"
                  value={footer.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="flex-1 px-4 py-2 border border-[#E8DBC5] rounded-xl"
                />
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="text-[#8B6A3E]" />
                <input
                  placeholder="Contact Email"
                  value={footer.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="flex-1 px-4 py-2 border border-[#E8DBC5] rounded-xl"
                />
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="text-[#8B6A3E]" />
                <input
                  placeholder="Phone Number"
                  value={footer.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="flex-1 px-4 py-2 border border-[#E8DBC5] rounded-xl"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8DBC5] p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#3A2A1F] mb-4">Footer Columns</h2>
            
            <div className="space-y-6">
              {/* Quick Links */}
              <div>
                <div className="flex items-center justify-between mb-3 text-sm font-bold text-gray-500 uppercase">
                  <span>Quick Links</span>
                  <button onClick={() => addLink('quickLinks')} className="text-[#8B6A3E]">+ Add</button>
                </div>
                <div className="space-y-2">
                  {footer.quickLinks?.map((link: any, idx: number) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        placeholder="Label"
                        value={link.label}
                        onChange={(e) => handleLinkChange('quickLinks', idx, 'label', e.target.value)}
                        className="flex-1 px-3 py-1 border border-[#E8DBC5] rounded-lg text-xs"
                      />
                      <input
                        placeholder="Path"
                        value={link.link}
                        onChange={(e) => handleLinkChange('quickLinks', idx, 'link', e.target.value)}
                        className="flex-1 px-3 py-1 border border-[#E8DBC5] rounded-lg text-xs"
                      />
                      <button onClick={() => removeLink('quickLinks', idx)} className="text-red-300 hover:text-red-500"><FiTrash2 size={14} /></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services Column */}
              <div>
                <div className="flex items-center justify-between mb-3 text-sm font-bold text-gray-500 uppercase">
                  <span>Services Column</span>
                  <button onClick={() => addLink('services')} className="text-[#8B6A3E]">+ Add</button>
                </div>
                <div className="space-y-2">
                  {footer.services?.map((link: any, idx: number) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        placeholder="Label"
                        value={link.label}
                        onChange={(e) => handleLinkChange('services', idx, 'label', e.target.value)}
                        className="flex-1 px-3 py-1 border border-[#E8DBC5] rounded-lg text-xs"
                      />
                      <input
                        placeholder="Path"
                        value={link.link}
                        onChange={(e) => handleLinkChange('services', idx, 'link', e.target.value)}
                        className="flex-1 px-3 py-1 border border-[#E8DBC5] rounded-lg text-xs"
                      />
                      <button onClick={() => removeLink('services', idx)} className="text-red-300 hover:text-red-500"><FiTrash2 size={14} /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
