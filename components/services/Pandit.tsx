"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Topbar from "../topbar/Topbar";
import Navbar from "../navbar/Navbar";
import Footer from "../Footer/Footer";
import Image from "next/image";
import {
  FaStar,
  FaPhoneAlt,
  FaClock,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaQuoteLeft,
} from "react-icons/fa";
import {
  GiIncense,
  GiFlowerPot,
  GiCandleHolder,
  GiPrayerBeads,
  GiStarSwirl,
} from "react-icons/gi";
import { RiCustomerService2Fill } from "react-icons/ri";
import { PiFlowerLotus } from "react-icons/pi";
import { MdVerified } from "react-icons/md";
import { ShoppingCart, Loader } from "lucide-react";
import { getAllServices, resolveImagePath } from "@/lib/apiClient";

const grihaPraveshImagePath = "/assets/logoreal.jpeg";

export default function PanditServices() {
  const router = useRouter();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedServiceForBooking, setSelectedServiceForBooking] =
    useState<any>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getAllServices({ pageCategory: "pandit" });
        const data = response.data;
        if (data.success && data.data) {
          setServices(
            data.data.map((srv: any) => ({
              ...srv,
              id: srv._id,
              name: srv.name,
              description: srv.description,
              image: srv.image || grihaPraveshImagePath,
              price: srv.price,
              features: srv.features || [],
              icon: GiIncense,
              rating: 5.0,
              reviews: "N/A",
              panditName: "Moksha Voyage",
              experience: "Trusted Pandit",
              location: "Available Remote/Local",
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

  const handleBuyNow = (service: any) => {
    router.push(`/checkout?serviceId=${service.id}`);
  };

  const handleBookNow = (service: any) => {
    setSelectedServiceForBooking(service);
    setShowBookingForm(true);
  };

  const handleViewDetails = (service: any) => {
    setSelectedService(service);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getServiceIcon = (index: number) => {
    const icons = [
      GiIncense,
      GiFlowerPot,
      GiCandleHolder,
      RiCustomerService2Fill,
    ];
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

      {/* Hero Section with Background Image */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={grihaPraveshImagePath}
            alt="Pandit Services Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#8B5E3C]/80 to-[#5A3E2B]/90"></div>
        </div>

        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C89B6D] rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-2 border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-2 border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border-2 border-white rounded-full"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 text-[#F5E9D9] mb-4">
              <PiFlowerLotus className="text-2xl" />
              <span className="text-sm tracking-widest">श्री गणेशाय नमः</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 leading-tight">
              Priest Services
              <span className="block text-xl md:text-2xl font-light text-[#F5E9D9] mt-3">
                Traditional Vedic Rituals by Experienced Pandits
              </span>
            </h1>

            <p className="text-base md:text-lg text-white mb-6 max-w-2xl mx-auto">
              Book verified pandits for authentic Hindu ceremonies performed
              with proper Vedic traditions and rituals at your preferred
              location.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <div>
                <div className="text-2xl text-white">50+</div>
                <div className="text-sm text-[#F5E9D9]">Expert Pandits</div>
              </div>
              <div>
                <div className="text-2xl text-white">15+</div>
                <div className="text-sm text-[#F5E9D9]">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl text-white">10K+</div>
                <div className="text-sm text-[#F5E9D9]">Happy Families</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="#FDF8F2"
            />
          </svg>
        </div>
      </section>

      {/* Services Grid from API */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-[#5A3E2B] mb-4">
            पंडित द्वारा प्रदान की जाने वाली सेवाएं
          </h2>
          <div className="w-16 h-1 bg-[#8B6A3E] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.length > 0 ? (
            services.map((service, index) => {
              const Icon = getServiceIcon(index);

              return (
                <div
                  key={service.id}
                  className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative h-48 overflow-hidden bg-[#F5E9D9]">
                    <Image
                      src={resolveImagePath(service.image || "/assets/logoreal.jpeg")}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#5A3E2B] via-transparent to-transparent"></div>

                    <div className="absolute top-4 left-4 bg-white/90 p-3 rounded-full">
                      <Icon className="text-[#8B6A3E] text-2xl" />
                    </div>

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

                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-lg font-serif text-white drop-shadow-lg">
                        {service.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-[#7B5E47] text-sm mb-4 leading-relaxed">
                      {service.description}
                    </p>

                    {service.features && service.features.length > 0 && (
                      <div className="mb-4 space-y-2">
                        <p className="text-xs font-bold text-[#5A3E2B] uppercase tracking-wide">
                          सेवा में शामिल
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {service.features.slice(0, 3).map((feature: any, idx: number) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 bg-[#F5E9D9] text-[#8B6A3E] rounded-full"
                            >
                              ✓ {feature}
                            </span>
                          ))}
                          {service.features.length > 3 && (
                            <span className="text-xs px-2 py-1 bg-[#F5E9D9] text-[#8B6A3E] rounded-full">
                              +{service.features.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="border-t border-[#e8dbc5] pt-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-[#7B5E47] mb-1">मूल्य</p>
                        <p className="text-2xl font-bold text-[#8B6A3E]">
                          ₹{service.price}
                        </p>
                      </div>
                      <button
                        onClick={() => handleBuyNow(service)}
                        className="flex items-center gap-2 bg-gradient-to-r from-[#8B6A3E] to-[#5A3E2B] hover:from-[#6B5A3E] hover:to-[#3A2E1B] text-white font-bold py-3 px-4 rounded-lg transition-all hover:shadow-lg"
                      >
                        <ShoppingCart size={18} />
                        बुक करें
                      </button>
                    </div>

                    <div className="mt-4 pt-4 border-t border-[#e8dbc5] space-y-2 text-xs text-[#7B5E47]">
                      <div className="flex items-center gap-2">
                        <FaClock size={14} className="text-[#8B6A3E]" />
                        <span>तुरंत उपलब्ध</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaWhatsapp size={14} className="text-green-500" />
                        <span>24/7 सपोर्ट</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-10 text-[#7B5E47]">
              No pandit services available currently.
            </div>
          )}
        </div>
      </section>

      {/* Service Details Modal (if selected) */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-serif text-[#5A3E2B] mb-4">
                {selectedService.name}
              </h2>
              <p className="text-[#7B5E47] mb-4">
                {selectedService.description}
              </p>
              <div className="space-y-2 mb-4">
                <p>
                  <strong>Location:</strong> {selectedService.location}
                </p>
                <p>
                  <strong>Price:</strong> ₹{selectedService.price}
                </p>
                <p>
                  <strong>Pandit:</strong> {selectedService.panditName} (
                  {selectedService.experience})
                </p>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 bg-[#8B6A3E] text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Form Modal */}
      {showBookingForm && selectedServiceForBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-serif text-[#5A3E2B] mb-4">
                Book {selectedServiceForBooking.name}
              </h2>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Preferred Date"
                  className="w-full p-2 border rounded"
                />
                <textarea
                  placeholder="Address"
                  className="w-full p-2 border rounded"
                  rows={3}
                ></textarea>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-[#8B6A3E] text-white py-2 rounded"
                  >
                    Confirm Booking
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Why Choose Us Section */}
      <section className="py-12 bg-[#F5E9D9] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-48 h-48 bg-[#C89B6D] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#8B5E3C] rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-serif text-[#5A3E2B] mb-3">
              Why Choose Moksha Voyage?
            </h2>
            <div className="w-16 h-0.5 bg-[#C89B6D] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: MdVerified,
                title: "Verified Pandits",
                desc: "All pandits are verified for authenticity and experience",
              },
              {
                icon: GiPrayerBeads,
                title: "Vedic Rituals",
                desc: "All ceremonies performed as per traditional Vedic methods",
              },
              {
                icon: FaStar,
                title: "Satisfaction Guaranteed",
                desc: "10,000+ families have trusted us",
              },
              {
                icon: PiFlowerLotus,
                title: "Sacred Locations",
                desc: "Services at holy sites across India",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="text-center p-4 bg-white/50 rounded-lg backdrop-blur-sm hover:bg-white transition-all duration-300"
                >
                  <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#8B5E3C] flex items-center justify-center">
                    <Icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-lg text-[#5A3E2B] mb-1">{item.title}</h3>
                  <p className="text-sm text-[#7B5E47]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-serif text-[#5A3E2B] mb-3">
            What Our Devotees Say
          </h2>
          <div className="w-16 h-0.5 bg-[#C89B6D] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: "Rajesh Kumar",
              location: "Delhi",
              text: "The pandit was very knowledgeable and conducted the Griha Pravesh ceremony perfectly. Highly recommended!",
              rating: 5,
            },
            {
              name: "Priya Sharma",
              location: "Mumbai",
              text: "Thank you for arranging such an experienced pandit for my father's Shraddh ceremony. Everything was done as per rituals.",
              rating: 5,
            },
            {
              name: "Amit Patel",
              location: "Ahmedabad",
              text: "Booked Satyanarayan Katha for our family gathering. The pandit was punctual and the ceremony was beautiful.",
              rating: 5,
            },
          ].map((testimonial, idx) => (
            <div
              key={idx}
              className="relative bg-white p-5 rounded-lg shadow-sm"
            >
              <FaQuoteLeft className="absolute top-3 right-3 text-2xl text-[#C89B6D] opacity-20" />
              <div className="flex gap-1 text-yellow-500 mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-sm" />
                ))}
              </div>
              <p className="text-[#7B5E47] mb-3 italic text-sm">
                "{testimonial.text}"
              </p>
              <div>
                <p className="text-[#5A3E2B] text-sm">{testimonial.name}</p>
                <p className="text-sm text-[#7B5E47]">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 24/7 Support */}
      <section className="py-12 px-6 bg-[#5A3E2B] text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-serif mb-6">आपात सेवा</h2>
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

      {/* CTA Section */}
      <section className="relative py-16 bg-gradient-to-r from-[#8B5E3C] to-[#5A3E2B] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src={grihaPraveshImagePath}
            alt="Pandit Services Background"
            fill
            className="object-cover opacity-10"
          />
        </div>

        <div className="relative max-w-4xl mx-auto text-center px-6">
          <PiFlowerLotus className="text-5xl mx-auto mb-4 opacity-50" />
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
            Ready to Perform Sacred Rituals?
          </h2>
          <p className="text-base md:text-lg text-white mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Book verified pandits for your religious ceremonies. Get blessings
            and perform rituals with complete Vedic authenticity.
          </p>
          <button className="px-8 py-3 bg-white text-[#8B5E3C] rounded-lg font-medium text-base hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Book a Pandit Now
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
