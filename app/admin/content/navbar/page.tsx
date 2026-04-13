"use client";

import { useEffect, useState } from "react";
import { getNavbarComponent, updateComponentByKey, uploadImage, resolveImagePath } from "@/lib/apiClient";
import { FiUpload, FiX, FiPlus, FiTrash2, FiSave, FiLink, FiTag } from "react-icons/fi";

const FULL_DEFAULT_NAVBAR = {
  brandName: "Moksha Voyage",
  logo: "/assets/logoreal-removebg-preview.png",
  ctaLabel: "Get Support",
  ctaPhone: "+91 1800 123 4567",
  navItems: [
    { name: "Home", path: "/", type: "page", isActive: true, dropdown: [] },
    { name: "About", path: "/about", type: "page", isActive: true, dropdown: [] },
    {
      name: "Services",
      path: "#services",
      type: "dropdown",
      isActive: true,
      dropdown: [
        { name: "Funeral Samagri", path: "/furalservices", isActive: true },
        { name: "Funeral Decoration", path: "/furaldecoration", isActive: true },
        { name: "Pandit Service", path: "/panditservices", isActive: true },
        { name: "Ambulance Service", path: "/ambulanceservices", isActive: true },
        { name: "Hearse Van", path: "/harsevanservices", isActive: true },
        { name: "Prayer Hall", path: "/prayerhallservices", isActive: true },
        { name: "Special Services", path: "/specialservices", isActive: true },
        { name: "Calling Relatives", path: "/callingrelativesservices", isActive: true },
      ],
    },
    { name: "Blog", path: "/blog", type: "page", isActive: true, dropdown: [] },
    {
      name: "Moksha Gallery",
      path: "/mokshagallery",
      type: "dropdown",
      isActive: true,
      dropdown: [
        { name: "Moksha Gallery", path: "/mokshagallery", isActive: true },
        { name: "Moksha Video Gallery", path: "/mokshavediogallery", isActive: true },
      ],
    },
    { name: "Contact", path: "/contact", type: "page", isActive: true, dropdown: [] },
  ],
};

const DEFAULT_NAVBAR = FULL_DEFAULT_NAVBAR;

export default function AdminNavbarPage() {
  const [navbar, setNavbar] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getNavbarComponent();
        if (res.data?.success && res.data?.data) {
          setNavbar(res.data.data);
        } else {
          setNavbar(DEFAULT_NAVBAR);
        }
      } catch (err) {
        setNavbar(DEFAULT_NAVBAR);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleChange = (key: string, value: any) => {
    setNavbar((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleNavItemChange = (index: number, key: string, value: any) => {
    setNavbar((prev: any) => {
      const items = [...(prev.navItems || [])];
      items[index] = { ...items[index], [key]: value };
      return { ...prev, navItems: items };
    });
  };

  const addNavItem = () => {
    setNavbar((prev: any) => ({
      ...prev,
      navItems: [...(prev.navItems || []), { name: "New Link", path: "/", type: "page", isActive: true, dropdown: [] }]
    }));
    // Scroll to bottom after a brief delay so the new item is visible
    setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }), 100);
  };

  const resetToDefault = () => {
    if (confirm("Are you sure? This will restore ALL original navbar items including Services and Blog dropdowns.")) {
      setNavbar(FULL_DEFAULT_NAVBAR);
      setMessage("✓ Default navbar restored! Click 'Save Changes' to save.");
      setTimeout(() => setMessage(""), 5000);
    }
  };

  const removeNavItem = (index: number) => {
    setNavbar((prev: any) => ({
      ...prev,
      navItems: (prev.navItems || []).filter((_: any, i: number) => i !== index)
    }));
  };

  const addDropdownItem = (navIndex: number) => {
    setNavbar((prev: any) => {
      const items = [...(prev.navItems || [])];
      const dropdown = [...(items[navIndex].dropdown || []), { name: "New Sublink", path: "/" }];
      items[navIndex] = { ...items[navIndex], dropdown };
      return { ...prev, navItems: items };
    });
  };

  const removeDropdownItem = (navIndex: number, dropIndex: number) => {
    setNavbar((prev: any) => {
      const items = [...(prev.navItems || [])];
      const dropdown = (items[navIndex].dropdown || []).filter((_: any, i: number) => i !== dropIndex);
      items[navIndex] = { ...items[navIndex], dropdown };
      return { ...prev, navItems: items };
    });
  };

  const handleSubItemChange = (navIndex: number, dropIndex: number, key: string, value: any) => {
    setNavbar((prev: any) => {
      const items = [...(prev.navItems || [])];
      const dropdown = [...(items[navIndex].dropdown || [])];
      dropdown[dropIndex] = { ...dropdown[dropIndex], [key]: value };
      items[navIndex] = { ...items[navIndex], dropdown };
      return { ...prev, navItems: items };
    });
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
      const payload = {
        componentKey: "navbar",
        label: "Navbar",
        componentType: "custom",
        brandName: navbar.brandName || "Moksha Voyage",
        logo: navbar.logo || "/assets/logoreal-removebg-preview.png",
        ctaLabel: navbar.ctaLabel || "",
        ctaPhone: navbar.ctaPhone || "",
        navItems: (navbar.navItems || []).map((item: any) => ({
          name: item.name,
          path: item.path,
          type: item.type || "page",
          isActive: item.isActive !== false,
          order: item.order || 0,
          dropdown: (item.dropdown || []).map((d: any) => ({
            name: d.name,
            path: d.path,
            isActive: d.isActive !== false,
          }))
        }))
      };
      const res = await updateComponentByKey("navbar", payload);
      if (res.data?.success) {
        setMessage("✓ Navbar updated successfully!");
        setNavbar((prev: any) => ({ ...prev, ...payload }));
        setTimeout(() => setMessage(""), 3000);
      } else {
        setError("Failed to update navbar. Please try again.");
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
      <p>Loading Navbar Settings...</p>
    </div>
  );

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#3A2A1F]">Navbar Settings</h1>
          <p className="text-[#8B6A3E]">Manage logo, navigation links and headers</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={resetToDefault}
            className="flex items-center gap-2 px-4 py-3 bg-red-50 text-red-600 border border-red-200 rounded-xl font-semibold hover:bg-red-100 transition-all text-sm"
          >
            🔄 Reset to Default
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-[#8B6A3E] text-white rounded-xl font-semibold hover:bg-[#7A5A2E] transition-all disabled:opacity-50"
          >
            <FiSave /> {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {message && <div className="mb-4 p-4 bg-green-100 border border-green-200 text-green-700 rounded-lg">{message}</div>}
      {error && <div className="mb-4 p-4 bg-red-100 border border-red-200 text-red-700 rounded-lg">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Branding & Logo */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-[#E8DBC5] p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#3A2A1F] mb-4 flex items-center gap-2">
              <FiTag className="text-[#8B6A3E]" /> Branding
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
                <input
                  type="text"
                  value={navbar.brandName || ""}
                  onChange={(e) => handleChange("brandName", e.target.value)}
                  className="w-full px-4 py-2 border border-[#E8DBC5] rounded-xl focus:ring-2 focus:ring-[#8B6A3E]/30 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo Image</label>
                <div className="mt-2 flex flex-col items-center gap-4">
                  <div className="w-24 h-24 bg-[#FDF8F2] rounded-xl border-2 border-dashed border-[#E8DBC5] flex items-center justify-center overflow-hidden">
                    {navbar.logo ? (
                      <img src={resolveImagePath(navbar.logo)} alt="Logo" className="w-full h-full object-contain" />
                    ) : (
                      <FiUpload className="text-[#8B6A3E] text-2xl" />
                    )}
                  </div>
                  <label className="cursor-pointer px-4 py-2 bg-[#FDF8F2] text-[#8B6A3E] border border-[#E8DBC5] rounded-lg text-sm hover:bg-[#F5E9D9] transition-colors">
                    {uploading ? "Uploading..." : "Change Logo"}
                    <input type="file" className="hidden" onChange={handleLogoUpload} accept="image/*" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8DBC5] p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#3A2A1F] mb-4 flex items-center gap-2">
              <FiLink className="text-[#8B6A3E]" /> Header CTA
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Button Label</label>
                <input
                  type="text"
                  value={navbar.ctaLabel || ""}
                  onChange={(e) => handleChange("ctaLabel", e.target.value)}
                  className="w-full px-4 py-2 border border-[#E8DBC5] rounded-xl outline-none focus:ring-2 focus:ring-[#8B6A3E]/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Helpline Phone</label>
                <input
                  type="text"
                  value={navbar.ctaPhone || ""}
                  onChange={(e) => handleChange("ctaPhone", e.target.value)}
                  className="w-full px-4 py-2 border border-[#E8DBC5] rounded-xl outline-none focus:ring-2 focus:ring-[#8B6A3E]/30"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-[#E8DBC5] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-[#3A2A1F]">Main Navigation Items</h2>
              <button
                type="button"
                onClick={addNavItem}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#8B6A3E] text-white rounded-lg text-sm font-medium hover:bg-[#7A5A2E] transition-all"
              >
                <FiPlus /> Add Menu Item
              </button>
            </div>

            <div className="space-y-4">
              {navbar.navItems?.map((item: any, idx: number) => (
                <div key={idx} className="border border-[#F5E9D9] rounded-xl overflow-hidden">
                  <div className="bg-[#FDF8F2] p-4 flex items-center gap-4">
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <input
                        placeholder="Label"
                        value={item.name}
                        onChange={(e) => handleNavItemChange(idx, "name", e.target.value)}
                        className="px-3 py-1.5 border border-[#E8DBC5] rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#8B6A3E]"
                      />
                      <input
                        placeholder="Path (e.g. /about)"
                        value={item.path}
                        onChange={(e) => handleNavItemChange(idx, "path", e.target.value)}
                        className="px-3 py-1.5 border border-[#E8DBC5] rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#8B6A3E]"
                      />
                    </div>
                    <button
                      onClick={() => removeNavItem(idx)}
                      className="text-red-400 hover:text-red-600 p-2"
                    >
                      <FiTrash2 />
                    </button>
                  </div>

                  {/* Dropdown Items */}
                  <div className="p-4 bg-white space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Dropdown Links</span>
                      <button
                        onClick={() => addDropdownItem(idx)}
                        className="text-[10px] bg-[#8B6A3E]/10 text-[#8B6A3E] px-2 py-1 rounded-md"
                      >
                        + Add Sublink
                      </button>
                    </div>
                    {item.dropdown?.map((drop: any, dIdx: number) => (
                      <div key={dIdx} className="flex items-center gap-3 pl-4 border-l-2 border-[#E8DBC5]">
                        <input
                          placeholder="Sub-label"
                          value={drop.name}
                          onChange={(e) => handleSubItemChange(idx, dIdx, "name", e.target.value)}
                          className="flex-1 px-3 py-1 border border-[#E8DBC5] rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#8B6A3E]"
                        />
                        <input
                          placeholder="Sub-path"
                          value={drop.path}
                          onChange={(e) => handleSubItemChange(idx, dIdx, "path", e.target.value)}
                          className="flex-1 px-3 py-1 border border-[#E8DBC5] rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#8B6A3E]"
                        />
                        <button
                          onClick={() => removeDropdownItem(idx, dIdx)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <FiX size={14} />
                        </button>
                      </div>
                    ))}
                    {!item.dropdown?.length && <p className="text-xs text-gray-400 italic">No dropdown items</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
