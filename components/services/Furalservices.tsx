"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Topbar from "../topbar/Topbar";
import Navbar from "../navbar/Navbar";
import Footer from "../Footer/Footer";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaStar,
  FaPhoneAlt,
  FaClock,
  FaShieldAlt,
  FaWhatsapp,
  FaEnvelope,
  FaFire,
} from "react-icons/fa";
import {
  MdVerified,
  MdSupportAgent,
  MdLocalFlorist,
  MdCall,
} from "react-icons/md";
import {
  GiWoodPile,
  GiIncense,
  GiFlowerPot,
  GiWoodenDoor,
} from "react-icons/gi";
import { RiCustomerService2Fill, RiOilFill } from "react-icons/ri";
import { ShoppingCart, Loader } from "lucide-react";

interface Service {
  _id: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  features?: string[];
  rating?: number;
  reviews?: number;
}

import { getAllServices, resolveImagePath } from "@/lib/apiClient";

function FuralServices() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fallback services in case backend is down
  const fallbackServices = [
    {
      _id: "funeral-1",
      name: "Wood for Pyre (चिता के लिए लकड़ी)",
      description:
        "High-quality sandalwood and mango wood logs for funeral pyre",
      price: 3999,
      features: [
        "Sandalwood Mix",
        "Properly Dried",
        "Cut to Size",
        "Delivery Included",
      ],
      rating: 4.9,
      reviews: 456,
      image: "/assets/funeralsamagri.jpeg",
    },
    {
      _id: "funeral-2",
      name: "Ghee & Camphor (घी और कपूर)",
      description:
        "Pure desi ghee and high-quality camphor for funeral rituals",
      price: 999,
      features: [
        "Pure Desi Ghee",
        "Premium Camphor",
        "Ritual Grade",
        "Proper Packaging",
      ],
      rating: 4.8,
      reviews: 312,
      image: "/assets/funeralsamagri.jpeg",
    },
    {
      _id: "funeral-3",
      name: "Flower Garlands (पुष्प माला)",
      description: "Fresh marigold and rose garlands for funeral ceremonies",
      price: 499,
      features: [
        "Fresh Flowers",
        "Marigold & Rose",
        "Same Day Delivery",
        "Eco-friendly",
      ],
      rating: 4.7,
      reviews: 234,
      image: "/assets/funeralsamagri.jpeg",
    },
    {
      _id: "funeral-4",
      name: "Sacred Cloth (कफन)",
      description:
        "Pure white cotton cloth for shroud (kafan) as per religious traditions",
      price: 799,
      features: ["Pure Cotton", "Sanctified", "Traditional", "Quality Assured"],
      rating: 4.8,
      reviews: 189,
      image: "/assets/funeralsamagri.jpeg",
    },
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getAllServices({ pageCategory: "funeral-samagri" });
        const data = response.data;
        if (data.success && data.data) {
          setServices(
            data.data.map((srv: any) => ({
              ...srv,
              id: srv._id,
              name: srv.name,
              description: srv.description,
              image: srv.image || "/assets/funeralsamagri.jpeg",
              price: srv.price,
              features: srv.features || [],
              rating: 5.0,
              reviews: "N/A",
            }))
          );
        }
      } catch (err) {
        console.error("Failed to fetch services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleBuyNow = (service: Service) => {
    // Redirect to checkout with service ID
    router.push(`/checkout?serviceId=${service._id}`);
  };

  const getServiceIcon = (index: number) => {
    const icons = [GiWoodPile, RiOilFill, GiFlowerPot, GiWoodenDoor];
    return icons[index % icons.length];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDF8F2]">
        <Topbar />
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader className="animate-spin text-[#8B6A3E]" size={48} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF8F2]">
      <Topbar />
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-12 px-6 bg-gradient-to-br from-[#5A3E2B] to-[#3A2A1F] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-4">
            अंतिम संस्कार सामग्री
            <span className="block text-[#E8DBC5]">
              Funeral Samagri Services
            </span>
          </h1>
          <p className="text-lg text-[#c9b696] max-w-2xl mx-auto">
            सभी आवश्यक वस्तुएं आपके दरवाजे पर | All essential items delivered to
            your doorstep
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-[#5A3E2B] mb-4">
            उपलब्ध सेवाएं
          </h2>
          <div className="w-16 h-1 bg-[#8B6A3E] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
             <div className="col-span-full text-center py-10 text-[#7B5E47]">Loading services...</div>
          ) : services.length > 0 ? (
            services.map((service, index) => {
            const Icon = getServiceIcon(index);
            const imageSrc = service.image || "/assets/funeralsamagri.jpeg";

            return (
              <div
                key={service.id || service._id}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-[#F5E9D9]">
                  <Image
                    src={resolveImagePath(imageSrc)}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#5A3E2B] via-transparent to-transparent"></div>

                  {/* Icon Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 p-3 rounded-full">
                    <Icon className="text-[#8B6A3E] text-2xl" />
                  </div>

                  {/* Rating */}
                  {service.rating && (
                    <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1">
                      <FaStar className="text-yellow-500 text-xs" />
                      <span className="text-xs text-[#5A3E2B] font-bold">
                        {service.rating}
                      </span>
                      {service.reviews && (
                        <span className="text-xs text-[#7B5E47]">
                          ({service.reviews})
                        </span>
                      )}
                    </div>
                  )}

                  {/* Service Name Overlay */}
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-lg font-serif text-white drop-shadow-lg">
                      {service.name}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-[#7B5E47] text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  {service.features && service.features.length > 0 && (
                    <div className="mb-4 space-y-2">
                      <p className="text-xs font-bold text-[#5A3E2B] uppercase tracking-wide">
                        विशेषताएं
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 bg-[#F5E9D9] text-[#8B6A3E] rounded-full"
                          >
                            ✓ {feature}
                          </span>
                        ))}
                        {service.features.length > 3 && (
                          <span className="text-xs px-2 py-1 bg-[#F5E9D9] text-[#8B6A3E] rounded-full">
                            +{service.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Price and Button */}
                  <div className="border-t border-[#e8dbc5] pt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#7B5E47] mb-1">
                        कीमत से शुरू
                      </p>
                      <p className="text-2xl font-bold text-[#8B6A3E]">
                        ₹{service.price}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        router.push(`/checkout?serviceId=${service._id}`)
                      }
                      className="flex items-center gap-2 bg-gradient-to-r from-[#8B6A3E] to-[#5A3E2B] hover:from-[#6B5A3E] hover:to-[#3A2E1B] text-white font-bold py-3 px-4 rounded-lg transition-all hover:shadow-lg"
                    >
                      <ShoppingCart size={18} />
                      खरीदें
                    </button>
                  </div>

                  {/* Contact Info */}
                  <div className="mt-4 pt-4 border-t border-[#e8dbc5] space-y-2 text-xs text-[#7B5E47]">
                    <div className="flex items-center gap-2">
                      <FaClock size={14} className="text-[#8B6A3E]" />
                      <span>तुरंत डिलीवरी उपलब्ध</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaWhatsapp size={14} className="text-green-500" />
                      <span>WhatsApp सपोर्ट उपलब्ध</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
          ) : (
            <div className="col-span-full text-center py-10 text-[#7B5E47]">
              No funeral services available currently.
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 px-6 bg-[#F5E9D9]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif text-[#5A3E2B] text-center mb-12">
            कैसे ऑर्डर करें
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "सेवा चुनें",
                desc: "अपनी आवश्यक सेवा चुनें",
              },
              {
                step: "2",
                title: "विवरण दें",
                desc: "अपनी जानकारी दर्ज करें",
              },
              {
                step: "3",
                title: "भुगतान करें",
                desc: "सुरक्षित भुगतान पूरा करें",
              },
              {
                step: "4",
                title: "डिलीवरी पाएं",
                desc: "तुरंत डिलीवरी प्राप्त करें",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-block w-16 h-16 rounded-full bg-[#8B6A3E] text-white font-bold text-2xl flex items-center justify-center mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-[#5A3E2B] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#7B5E47]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 24/7 Support */}
      <section className="py-12 px-6 bg-[#5A3E2B] text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-serif mb-6">24/7 सहायता</h2>
          <p className="text-lg mb-8 text-[#c9b696]">
            किसी भी समय हमसे संपर्क करें
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div>
              <FaPhoneAlt className="text-4xl text-[#E8DBC5] mx-auto mb-2" />
              <p className="text-lg">+91 1800 123 4567</p>
            </div>
            <div>
              <FaWhatsapp className="text-4xl text-green-400 mx-auto mb-2" />
              <p className="text-lg">+91 1800 123 4567</p>
            </div>
            <div>
              <FaEnvelope className="text-4xl text-[#E8DBC5] mx-auto mb-2" />
              <p className="text-lg">support@moksha.com</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default FuralServices;
