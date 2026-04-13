"use client";

import { useEffect, useState, useRef } from "react";
import {
  getAllServices,
  createService,
  updateService,
  deleteService,
  uploadImage,
  resolveImagePath
} from "@/lib/apiClient";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiUpload, FiImage } from "react-icons/fi";

interface Service {
  _id?: string;
  name: string;
  price: number;
  description: string;
  details?: string;
  image?: string;
  features?: string[];
  pageCategory?: string;
  isActive: boolean;
  order?: number;
}

const PAGE_CATEGORIES = [
  { value: "general", label: "General / All Pages" },
  { value: "funeral-samagri", label: "Funeral Samagri (फ्यूनरल सामग्री)" },
  { value: "funeral-decoration", label: "Funeral Decoration (सजावट)" },
  { value: "pandit", label: "Pandit Service (पंडित सेवा)" },
  { value: "ambulance", label: "Ambulance Service" },
  { value: "hearse-van", label: "Hearse Van (हर्स वैन)" },
  { value: "prayer-hall", label: "Prayer Hall (प्रार्थना हॉल)" },
  { value: "special-services", label: "Special Services" },
  { value: "calling-relatives", label: "Calling Relatives" },
];

const emptyService: Service = {
  name: "",
  price: 0,
  description: "",
  details: "",
  image: "",
  features: [],
  pageCategory: "general",
  isActive: true,
  order: 0,
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [featureInput, setFeatureInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      setError("");
      // Admin fetches ALL services (no isActive filter from admin side)
      const res = await getAllServices();
      const data = res.data;
      if (data.success) {
        setServices(data.data || []);
      } else {
        setError("Failed to load services");
      }
    } catch (err) {
      console.error("Error loading services:", err);
      setError("Failed to load services. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!editingService) return;
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadImage(formData);
      if (res.data?.success) {
        // Store the relative URL from backend instead of absolute localhost URL
        const imageUrl = res.data.data.url; 
        setEditingService((prev) => prev ? { ...prev, image: imageUrl } : prev);
        setSuccessMessage("Image uploaded!");
        setTimeout(() => setSuccessMessage(""), 2000);
      }
    } catch (err) {
      setError("Image upload failed. Make sure the backend is running.");
    } finally {
      setUploading(false);
    }
  };

  const addFeature = () => {
    if (!featureInput.trim() || !editingService) return;
    setEditingService((prev) =>
      prev ? { ...prev, features: [...(prev.features || []), featureInput.trim()] } : prev
    );
    setFeatureInput("");
  };

  const removeFeature = (index: number) => {
    setEditingService((prev) =>
      prev ? { ...prev, features: (prev.features || []).filter((_, i) => i !== index) } : prev
    );
  };

  const handleSave = async (service: Service) => {
    try {
      setError("");
      setSuccessMessage("");

      if (!service.name || !service.description) {
        setError("Name and description are required");
        return;
      }

      const payload = {
        ...service,
        price: Number(service.price) || 0,
        isActive: Boolean(service.isActive),
        features: service.features || [],
        pageCategory: service.pageCategory || "general",
      };

      const res = service._id
        ? await updateService(service._id, payload)
        : await createService(payload);

      if (res.data?.success) {
        setSuccessMessage(`Service ${service._id ? "updated" : "created"} successfully ✓`);
        setEditingService(null);
        setIsAddingNew(false);
        loadServices();
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setError(res.data?.message || "Failed to save service");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to save service");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service? This cannot be undone.")) return;
    try {
      await deleteService(id);
      setSuccessMessage("Service deleted");
      loadServices();
      setTimeout(() => setSuccessMessage(""), 2000);
    } catch (err) {
      setError("Failed to delete service");
    }
  };

  const startEdit = (service: Service) => {
    setEditingService({
      ...service,
      name: service.name || "",
      price: service.price || 0,
      description: service.description || "",
      details: service.details || "",
      image: service.image || "",
      features: service.features || [],
      pageCategory: service.pageCategory || "general",
      isActive: service.isActive !== undefined ? service.isActive : true,
    });
    setIsAddingNew(false);
  };

  const filteredServices = services.filter((s) => {
    const matchesSearch =
      !searchTerm || s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || s.pageCategory === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const currentForm = editingService;

  return (
    <div className="min-h-screen bg-[#FDF8F2] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#3A2A1F]">Services Management</h1>
            <p className="text-sm text-[#8B6A3E] mt-1">{services.length} services total</p>
          </div>
          <button
            onClick={() => {
              setEditingService({ ...emptyService });
              setIsAddingNew(true);
              setFeatureInput("");
            }}
            className="flex items-center gap-2 px-4 py-2 bg-[#8B6A3E] text-white rounded-lg hover:bg-[#7A5A2E] transition-colors"
          >
            <FiPlus /> Add Service
          </button>
        </div>

        {/* Alerts */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded-lg flex items-center justify-between">
            {successMessage}
            <button onClick={() => setSuccessMessage("")}><FiX /></button>
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-center justify-between">
            {error}
            <button onClick={() => setError("")}><FiX /></button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Services List */}
          <div className="lg:col-span-3">
            {/* Filters */}
            <div className="bg-white rounded-xl p-4 mb-4 border border-[#E8DBC5] flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]/30"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]/30"
              >
                <option value="all">All Categories</option>
                {PAGE_CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            {loading ? (
              <div className="bg-white rounded-xl p-8 text-center text-gray-400 border border-[#E8DBC5]">
                Loading services...
              </div>
            ) : filteredServices.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center border border-[#E8DBC5]">
                <p className="text-gray-500 mb-2">No services found</p>
                <p className="text-sm text-gray-400">Create your first service using the "Add Service" button</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredServices.map((service) => (
                  <div
                    key={service._id}
                    className={`bg-white rounded-2xl p-5 border transition-all duration-300 ${
                      editingService?._id === service._id
                        ? "border-[#8B6A3E] shadow-md ring-4 ring-[#8B6A3E]/5"
                        : "border-[#E8DBC5] hover:border-[#D4C3A3] hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-start gap-5">
                      <div className="relative group flex-shrink-0">
                        {service.image ? (
                          <img
                            src={resolveImagePath(service.image)}
                            alt={service.name}
                            className="w-20 h-20 object-cover rounded-2xl shadow-sm border border-[#E8DBC5]"
                            onError={(e) => { (e.target as HTMLImageElement).src = '/assets/image.webp'; }}
                          />
                        ) : (
                          <div className="w-20 h-20 bg-[#FDF8F2] rounded-2xl flex items-center justify-center border border-dashed border-[#E8DBC5]">
                            <FiImage className="text-[#8B6A3E]/40" size={24} />
                          </div>
                        )}
                        <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm ${
                          service.isActive ? "bg-green-500" : "bg-gray-300"
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                               <h3 className="font-bold text-[#2C1810] text-base truncate">{service.name}</h3>
                               <span className="text-[10px] px-2 py-0.5 bg-[#FDF8F2] text-[#8B6A3E] border border-[#8B6A3E]/10 rounded-full font-bold">
                                 {PAGE_CATEGORIES.find((c) => c.value === service.pageCategory)?.label || service.pageCategory || "General"}
                               </span>
                            </div>
                            <p className="text-[#8B6A3E] font-black text-sm tracking-tight mb-2">₹{service.price.toLocaleString()}</p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">{service.description}</p>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(service)}
                            className="flex items-center gap-1.5 px-4 py-1.5 text-[11px] font-bold bg-[#8B6A3E] text-white rounded-full hover:bg-[#7A5A2E] transition-all shadow-sm"
                          >
                            <FiEdit2 size={10} /> Edit Service
                          </button>
                          <button
                            onClick={() => service._id && handleDelete(service._id)}
                            className="flex items-center gap-1.5 px-4 py-1.5 text-[11px] font-bold bg-white text-red-500 border border-red-100 rounded-full hover:bg-red-50 transition-all"
                          >
                            <FiTrash2 size={10} /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Edit/Add Form */}
          <div className="lg:col-span-2">
            {currentForm ? (
              <div className="bg-white rounded-2xl border border-[#E8DBC5] p-8 shadow-md sticky top-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-black text-[#2C1810] flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-[#8B6A3E] rounded-full"></span>
                    {currentForm._id ? "Edit Service" : "New Service"}
                  </h2>
                  <button
                    onClick={() => { setEditingService(null); setIsAddingNew(false); }}
                    className="p-2 bg-gray-50 text-gray-400 hover:text-gray-600 rounded-full transition-colors"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Image Upload */}
                  <div>
                    <label className="block text-[10px] font-bold text-[#5A3E2B] uppercase tracking-wider mb-2">Service Identity Image</label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file);
                      }}
                    />
                    {currentForm.image ? (
                      <div className="relative w-full aspect-video mb-4 group ring-1 ring-[#E8DBC5] rounded-2xl overflow-hidden">
                        <img
                          src={resolveImagePath(currentForm.image)}
                          alt="Service"
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          onError={(e) => { (e.target as HTMLImageElement).src = '/assets/image.webp'; }}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                           <button
                             type="button"
                             onClick={() => fileInputRef.current?.click()}
                             className="p-3 bg-white text-gray-800 rounded-full shadow-lg hover:scale-110 transition-transform"
                           >
                             <FiUpload size={20} />
                           </button>
                           <button
                             type="button"
                             onClick={() => setEditingService((prev) => prev ? { ...prev, image: "" } : prev)}
                             className="p-3 bg-red-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
                           >
                             <FiTrash2 size={20} />
                           </button>
                        </div>
                      </div>
                    ) : (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploading}
                          className="w-full aspect-video border-2 border-dashed border-[#E8DBC5] bg-gray-50 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-[#FDF8F2] hover:border-[#8B6A3E]/40 transition-all text-[#8B6A3E] mb-4"
                        >
                          <div className="p-4 bg-white rounded-full shadow-sm">
                            <FiUpload size={24} />
                          </div>
                          <span className="text-xs font-bold uppercase tracking-widest">{uploading ? "Uploading..." : "Upload Cover Image"}</span>
                        </button>
                    )}
                    <input
                      type="text"
                      value={currentForm.image || ""}
                      onChange={(e) => setEditingService((prev) => prev ? { ...prev, image: e.target.value } : prev)}
                      className="w-full px-4 py-2 bg-gray-50 border border-[#E8DBC5] rounded-xl text-[10px] font-mono text-gray-500 focus:ring-2 focus:ring-[#8B6A3E]/10 outline-none"
                      placeholder="Paste image URL directly..."
                    />
                  </div>

                  {/* Name */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-[10px] font-bold text-[#5A3E2B] uppercase tracking-wider">Service Name *</label>
                      <span className="text-[9px] text-gray-400 font-mono">{currentForm.name.length} / 60</span>
                    </div>
                    <input
                      type="text"
                      maxLength={60}
                      value={currentForm.name}
                      onChange={(e) => setEditingService((prev) => prev ? { ...prev, name: e.target.value } : prev)}
                      className="w-full px-4 py-3 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm font-bold text-[#2C1810] focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none transition-all"
                      placeholder="e.g. Premium Pandit Service"
                    />
                  </div>

                  {/* Price + Order */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-[#5A3E2B] uppercase tracking-wider mb-1.5">Base Price (₹)</label>
                      <input
                        type="number"
                        value={currentForm.price}
                        onChange={(e) => setEditingService((prev) => prev ? { ...prev, price: Number(e.target.value) } : prev)}
                        className="w-full px-4 py-3 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm font-black text-[#8B6A3E] outline-none"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#5A3E2B] uppercase tracking-wider mb-1.5">Sort Order</label>
                      <input
                        type="number"
                        value={currentForm.order || 0}
                        onChange={(e) => setEditingService((prev) => prev ? { ...prev, order: Number(e.target.value) } : prev)}
                        className="w-full px-4 py-3 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm outline-none"
                      />
                    </div>
                  </div>

                  {/* Page Category */}
                  <div>
                    <label className="block text-[10px] font-bold text-[#5A3E2B] uppercase tracking-wider mb-1.5">Display Category</label>
                    <select
                      value={currentForm.pageCategory || "general"}
                      onChange={(e) => setEditingService((prev) => prev ? { ...prev, pageCategory: e.target.value } : prev)}
                      className="w-full px-4 py-3 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#8B6A3E]/20 transition-all appearance-none cursor-pointer"
                    >
                      {PAGE_CATEGORIES.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Description */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-[10px] font-bold text-[#5A3E2B] uppercase tracking-wider">Short Description *</label>
                      <span className="text-[9px] text-gray-400 font-mono">{currentForm.description.length} / 150</span>
                    </div>
                    <textarea
                      value={currentForm.description}
                      maxLength={150}
                      onChange={(e) => setEditingService((prev) => prev ? { ...prev, description: e.target.value } : prev)}
                      className="w-full px-4 py-3 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm leading-relaxed focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none transition-all resize-none"
                      rows={2}
                      placeholder="Appears on service cards..."
                    />
                  </div>

                  {/* Details */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-[10px] font-bold text-[#5A3E2B] uppercase tracking-wider">Full Details</label>
                      <span className="text-[9px] text-gray-400 font-mono">{currentForm.details?.length || 0} / 500</span>
                    </div>
                    <textarea
                      value={currentForm.details || ""}
                      maxLength={500}
                      onChange={(e) => setEditingService((prev) => prev ? { ...prev, details: e.target.value } : prev)}
                      className="w-full px-4 py-3 bg-gray-50 border border-[#E8DBC5] rounded-xl text-sm leading-relaxed focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none transition-all resize-none shadow-inner"
                      rows={4}
                      placeholder="Comprehensive service breakdown..."
                    />
                  </div>

                  {/* Features */}
                  <div>
                    <label className="block text-[10px] font-bold text-[#5A3E2B] uppercase tracking-wider mb-2">Key Highlights / Features</label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={featureInput}
                        maxLength={40}
                        onChange={(e) => setFeatureInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                        className="flex-1 px-4 py-2 bg-white border border-[#E8DBC5] rounded-xl text-sm focus:ring-2 focus:ring-[#8B6A3E]/20 outline-none transition-all shadow-sm"
                        placeholder="Add a benefit (max 40 chars)..."
                      />
                      <button
                        type="button"
                        onClick={addFeature}
                        className="p-2 bg-[#8B6A3E] text-white rounded-xl shadow-md hover:scale-105 transition-transform"
                      >
                        <FiPlus size={20} />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(currentForm.features || []).map((f, i) => (
                        <span key={i} className="flex items-center gap-1.5 text-[10px] font-bold bg-[#FDF8F2] text-[#8B6A3E] px-3 py-1.5 rounded-full border border-[#8B6A3E]/10 animate-in fade-in zoom-in duration-300">
                          {f}
                          <button
                            type="button"
                            onClick={() => removeFeature(i)}
                            className="bg-white text-red-400 rounded-full w-4 h-4 flex items-center justify-center hover:bg-red-50"
                          >×</button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Status Toggle */}
                  <div className="p-4 bg-[#FDF8F2]/50 border border-[#E8DBC5] rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#5A3E2B]">Visibility Status</p>
                      <p className="text-[10px] text-gray-500">{currentForm.isActive ? "This service is currently visible to users" : "HIDDEN - Users cannot see this service"}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingService((prev) => prev ? { ...prev, isActive: !prev.isActive } : prev)}
                      className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                        currentForm.isActive ? "bg-[#8B6A3E] ring-4 ring-[#8B6A3E]/10" : "bg-gray-300"
                      }`}
                    >
                      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg transition-all duration-300 ${
                        currentForm.isActive ? "translate-x-7" : "translate-x-1"
                      }`} />
                    </button>
                  </div>

                  {/* Save Action */}
                  <button
                    type="button"
                    onClick={() => currentForm && handleSave(currentForm)}
                    className="w-full py-4 bg-[#8B6A3E] text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#7A5A2E] hover:translate-y-[-2px] active:translate-y-0 transition-all shadow-lg overflow-hidden relative group"
                  >
                    <span className="relative z-10">{currentForm._id ? "Update Service Record" : "Launch New Service"}</span>
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-dashed border-[#E8DBC5] p-8 text-center">
                <FiEdit2 className="mx-auto text-[#8B6A3E] mb-3" size={24} />
                <p className="text-sm text-gray-500">Select a service to edit<br />or click "Add Service"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
