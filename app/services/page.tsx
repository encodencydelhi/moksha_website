"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllServices, resolveImagePath } from "@/lib/apiClient";
import Topbar from "@/components/topbar/Topbar";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Loader, ArrowRight, Heart, Check } from "lucide-react";
import { FiX } from "react-icons/fi";

interface Service {
  _id: string;
  name: string;
  price: number;
  description: string;
  features?: string[];
  icon?: string;
}

export default function ServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await getAllServices();
      const data = response.data;

      if (data.success) {
        setServices(data.data || []);
      } else {
        setError("Failed to load services");
      }
    } catch (err) {
      console.error("Error loading services:", err);
      setError("Failed to load services. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectService = (serviceId: string) => {
    router.push(`/checkout?serviceId=${serviceId}`);
  };

  const [filter, setFilter] = useState("all");

  const categories = [
    { id: "all", label: "All Services" },
    { id: "funeral-samagri", label: "Funeral Samagri" },
    { id: "funeral-decoration", label: "Decoration" },
    { id: "pandit", label: "Pandit" },
    { id: "ambulance", label: "Ambulance" },
    { id: "hearse-van", label: "Hearse Van" },
  ];

  const filteredServices = services.filter(s =>
    filter === "all" || (s as any).pageCategory === filter
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Topbar />
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center animate-pulse">
            <Loader className="animate-spin text-[#8B6A3E] mx-auto mb-6" size={48} />
            <p className="text-[#5A4030] font-serif text-xl">Connecting to Sacred Services...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF8F2]/30">
      <Topbar />
      <Navbar />

      {/* Hero Header */}
      <div className="relative pt-32 pb-20 bg-[#2C1810] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="/assets/cremation.jpg" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-[#8B6A3E] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
            Trusted & Compassionate
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight">
            Our Sacred <span className="text-[#8B6A3E] italic">Services</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Moksha Voyage provides comprehensive, dignified end-of-life support,
            blending tradition with modern transparency.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${filter === cat.id
                  ? "bg-[#8B6A3E] text-white border-[#8B6A3E] shadow-lg scale-105"
                  : "bg-white text-[#5A4030] border-[#E8D9C5] hover:border-[#8B6A3E]"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto bg-red-50 border-l-4 border-red-500 rounded-r-xl p-4 mb-12 text-red-700 flex items-center gap-3">
            <FiX className="text-red-500 flex-shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-[#E8D9C5]">
            <Heart className="mx-auto text-[#8B6A3E]/20 mb-4" size={64} />
            <p className="text-[#7B5E47] text-xl font-serif">No services found in this category</p>
            <button onClick={() => setFilter("all")} className="mt-4 text-[#8B6A3E] font-bold underline">Show all services</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {filteredServices.map((service) => (
              <div
                key={service._id}
                className="group bg-white rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-[#EEE1D0] flex flex-col"
              >
                {/* Visual Header */}
                <div className="relative h-64 overflow-hidden">
                  {(service as any).image ? (
                    <img
                      src={resolveImagePath((service as any).image)}
                      alt={service.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#2C1810] to-[#5A3E2B] flex items-center justify-center">
                      <span className="text-6xl group-hover:scale-125 transition-transform duration-500">{service.icon || "🙏"}</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 px-4 py-1.5 bg-white/90 backdrop-blur-sm text-[#2C1810] rounded-full text-xs font-black shadow-lg">
                    ₹{service.price.toLocaleString()}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-1 flex-col">
                  <h3 className="text-2xl font-bold text-[#2C1810] mb-3 group-hover:text-[#8B6A3E] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-[#5A4030]/80 text-sm leading-relaxed mb-6 line-clamp-3">
                    {service.description}
                  </p>

                  {/* Features */}
                  {service.features && service.features.length > 0 && (
                    <div className="space-y-3 mb-8 flex-1">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-xs text-[#5A4030]">
                          <div className="w-5 h-5 rounded-full bg-[#FDF8F2] flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check size={12} className="text-[#8B6A3E]" />
                          </div>
                          <span className="font-medium">{feature}</span>
                        </div>
                      ))}
                      {service.features.length > 3 && (
                        <p className="text-[10px] text-[#8B6A3E] font-bold uppercase tracking-widest pl-8">
                          +{service.features.length - 3} More Benefits
                        </p>
                      )}
                    </div>
                  )}

                  {/* CTA */}
                  <button
                    onClick={() => handleSelectService(service._id)}
                    className="mt-auto w-full group/btn relative py-4 bg-[#2C1810] text-white rounded-2xl font-bold text-sm overflow-hidden transition-all hover:bg-[#8B6A3E] shadow-lg active:scale-95"
                  >
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                    <div className="relative flex items-center justify-center gap-2">
                      <span>Get Started</span>
                      <ArrowRight size={18} className="translate-x-0 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Benefits Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-8 border border-[#E8D9C5] text-center hover:shadow-lg transition-all">
            <div className="text-5xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-[#2C1810] mb-2">
              सर्वश्रेष्ठ गुणवत्ता
            </h3>
            <p className="text-[#5A4030] text-sm">
              हम अपनी सभी सेवाओं में सर्वोच्च गुणवत्ता सुनिश्चित करते हैं
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 border border-[#E8D9C5] text-center hover:shadow-lg transition-all">
            <div className="text-5xl mb-4">⏰</div>
            <h3 className="text-xl font-bold text-[#2C1810] mb-2">
              24/7 उपलब्ध
            </h3>
            <p className="text-[#5A4030] text-sm">
              हमारी सेवाएं दिन-रात हमेशा आपके लिए उपलब्ध हैं
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 border border-[#E8D9C5] text-center hover:shadow-lg transition-all">
            <div className="text-5xl mb-4">💯</div>
            <h3 className="text-xl font-bold text-[#2C1810] mb-2">
              100% संतुष्टि
            </h3>
            <p className="text-[#5A4030] text-sm">
              हमारे ग्राहक हमेशा हमारी सेवाओं से संतुष्ट रहते हैं
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-[#8B6A3E] to-[#A0845C] rounded-xl p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            आपकी सेवा में हमारा समर्पण
          </h2>
          <p className="text-lg mb-6 text-[#E8D9C5] max-w-2xl mx-auto">
            हमारी अनुभवी टीम हमेशा आपकी सेवा के लिए तैयार है।
          </p>
          <button
            onClick={() => router.push("/contact")}
            className="bg-white text-[#8B6A3E] hover:bg-[#FDF8F2] font-bold py-3 px-8 rounded-lg transition-all duration-300 inline-flex items-center gap-2"
          >
            <span>हमसे संपर्क करें</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
