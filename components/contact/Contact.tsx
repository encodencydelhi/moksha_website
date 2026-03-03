"use client";

import React, { useState, useEffect, useRef } from "react";
import Topbar from "@/components/topbar/Topbar";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Image from "next/image";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaPaperPlane,
  FaClock,
  FaGlobe,
  FaHeadset,
  FaChevronRight,
  FaRegBuilding,
} from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus({
        type: "success",
        message: "Thank you! Your message has been sent successfully.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const officeLocations = [
    {
      city: "Head Office",
      address: "12/52 Sunrise Industrial Area, Mohan Nagar, Ghaziabad",
      pincode: "201007",
      type: "main",
      icon: FaBuilding,
      color: "from-amber-500 to-orange-500",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&auto=format",
    },
    {
      city: "Ghaziabad",
      address: "KK-1, Surdas Marg, Sector 17A, Kavi Nagar Industrial Area",
      pincode: "201001",
      type: "branch",
      icon: FaRegBuilding,
      color: "from-blue-500 to-cyan-500",
      image:
        "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=400&auto=format",
    },
    {
      city: "Delhi",
      address: "Ground Floor, Main Market, E-1, opposite KFC, Kalkaji",
      pincode: "110019",
      type: "branch",
      icon: FaRegBuilding,
      color: "from-purple-500 to-pink-500",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&auto=format",
    },
    {
      city: "Mumbai",
      address: "212 Bussa Industrial Estate, Lower Parel",
      pincode: "400013",
      state: "Maharashtra",
      type: "branch",
      icon: FaRegBuilding,
      color: "from-emerald-500 to-teal-500",
      image:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&auto=format",
    },
  ];

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: "Main Venue",
      details: ["Hall No. 11, Bharat Mandapam", "Pragati Maidan, New Delhi"],
      extra: "India",
      bgImage:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&auto=format",
    },
    {
      icon: FaClock,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 10:00 AM - 4:00 PM",
      ],
      extra: "Closed on Sundays",
      bgImage:
        "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=400&auto=format",
    },
    {
      icon: FaHeadset,
      title: "Customer Support",
      details: ["+91-9654900525", "support@organicexpo.in"],
      extra: "24/7 Emergency Support",
      bgImage:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&auto=format",
    },
    {
      icon: FaGlobe,
      title: "Social Connect",
      details: ["Follow us for updates", "Live chat available"],
      extra: "Response within 1hr",
      bgImage:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&auto=format",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5E9D9]">
      <Topbar />
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[80vh] min-h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/chatgpt.png"
            alt="Corporate Office"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-black/8"></div>

        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #8B6A3E 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-white/70 text-sm mb-6">
                <span>Home</span>
                <FaChevronRight className="text-xs" />
                <span className="text-white font-medium">Contact</span>
              </div>

              {/* Title - Max 4xl */}
              <h1 className="text-4xl md:text-4xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
                Let's Connect
                <span className="block text-2xl md:text-2xl text-[#F5E9D9] mt-3 font-light">
                  Your Gateway to Corporate Excellence
                </span>
              </h1>

              {/* Description - Base text */}
              <p className="text-white/80 text-base md:text-base max-w-2xl mb-6 leading-relaxed">
                Whether you're looking for partnership opportunities, have
                questions about our services, or want to discuss your next
                corporate event - we're here to help.
              </p>

              {/* Stats - Base text */}
              <div className="flex flex-wrap gap-6 md:gap-8">
                <div className="bg-white/10 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/20">
                  <div className="text-2xl md:text-2xl font-bold text-white">
                    500+
                  </div>
                  <div className="text-white/70 text-xs">Events Hosted</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/20">
                  <div className="text-2xl md:text-2xl font-bold text-white">
                    50+
                  </div>
                  <div className="text-white/70 text-xs">
                    Corporate Partners
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/20">
                  <div className="text-2xl md:text-2xl font-bold text-white">
                    24/7
                  </div>
                  <div className="text-white/70 text-xs">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center animate-bounce">
            <div className="w-1 h-2 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </div>

      {/* Office Locations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-16">
        <div className="text-center mb-12">
          <span className="text-[#8B6A3E] text-xs font-semibold tracking-wider uppercase mb-2 block">
            Our Presence
          </span>
          <h2 className="text-3xl md:text-3xl font-bold text-gray-800 mb-3 tracking-tight">
            Office Locations
          </h2>
          <div className="w-16 h-0.5 bg-[#8B6A3E] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {officeLocations.map((location, index) => {
            const Icon = location.icon;
            const heights = [400, 350, 380, 420];
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                style={{ height: `${heights[index]}px` }}
              >
                <div className="absolute inset-0">
                  <Image
                    src={location.image}
                    alt={location.city}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>
                </div>

                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <div
                    className={`absolute top-4 right-4 w-10 h-10 rounded-xl bg-gradient-to-br ${location.color} flex items-center justify-center shadow-xl transform group-hover:rotate-12 transition-transform duration-300`}
                  >
                    <Icon className="text-white text-base" />
                  </div>

                  {location.type === "main" && (
                    <span className="absolute top-4 left-4 px-2 py-1 bg-[#8B6A3E] text-white text-xs font-bold rounded-full shadow-lg border-2 border-white/30">
                      HQ
                    </span>
                  )}

                  <div className="backdrop-blur-sm bg-white/10 rounded-xl p-3 border border-white/20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-bold text-lg text-white mb-1">
                      {location.city}
                    </h3>
                    <p className="text-white/90 text-xs leading-relaxed mb-2">
                      {location.address}
                    </p>
                    <div className="flex items-center justify-between pt-1 border-t border-white/20">
                      <span className="text-white/70 text-xs">
                        PIN: {location.pincode}
                      </span>
                      {location.state && (
                        <span className="text-white/70 text-xs">
                          {location.state}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer"
                style={{ height: "240px" }}
              >
                <div className="absolute inset-0">
                  <Image
                    src={info.bgImage}
                    alt={info.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/60"></div>
                </div>

                <div className="absolute inset-0 p-4 flex flex-col">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B6A3E] to-[#6B4E2E] flex items-center justify-center mb-3 shadow-xl">
                    <Icon className="text-white text-lg" />
                  </div>

                  <h3 className="font-bold text-base text-white mb-2">
                    {info.title}
                  </h3>
                  <div className="space-y-0.5">
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-white/80 text-xs">
                        {detail}
                      </p>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium border border-white/30">
                      {info.extra}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-white/50">
            <div className="mb-6">
              <h3 className="text-2xl md:text-2xl font-bold text-gray-800 mb-2 tracking-tight">
                Send us a message
              </h3>
              <p className="text-gray-600 text-sm">
                Our team will respond within 1-2 business days.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#8B6A3E]/20 focus:border-[#8B6A3E] transition-all text-sm shadow-sm"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#8B6A3E]/20 focus:border-[#8B6A3E] transition-all text-sm shadow-sm"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#8B6A3E]/20 focus:border-[#8B6A3E] transition-all text-sm shadow-sm"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#8B6A3E]/20 focus:border-[#8B6A3E] transition-all text-sm shadow-sm"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#8B6A3E]/20 focus:border-[#8B6A3E] transition-all text-sm shadow-sm"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#8B6A3E]/20 focus:border-[#8B6A3E] transition-all text-sm shadow-sm resize-none"
                  placeholder="Tell us about your inquiry..."
                />
              </div>

              {submitStatus.type && (
                <div
                  className={`p-3 rounded-xl text-xs font-medium ${
                    submitStatus.type === "success"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#8B6A3E] to-[#6B4E2E] hover:from-[#6B4E2E] hover:to-[#8B6A3E] text-white font-semibold py-3 px-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed group shadow-xl hover:shadow-2xl"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="group-hover:translate-x-1 transition-transform text-sm" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Side - Contact Cards */}
          <div className="space-y-5">
            {/* Emergency Contact Card */}
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-2xl p-6 text-white">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <FaHeadset className="text-xl" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Emergency Support</h4>
                  <p className="text-white/90 text-xs mb-2">
                    Available 24/7 for urgent inquiries
                  </p>
                  <a
                    href="tel:+919654900525"
                    className="text-lg font-bold hover:underline"
                  >
                    +91-9654900525
                  </a>
                </div>
              </div>
            </div>

            {/* Social Connect Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
              <h4 className="text-lg font-bold text-gray-800 mb-3">
                Connect With Us
              </h4>
              <p className="text-gray-600 text-xs mb-4">
                Follow us on social media for updates, events, and more.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: FaFacebook, color: "bg-[#1877F2]" },
                  { icon: FaTwitter, color: "bg-[#1DA1F2]" },
                  { icon: FaLinkedin, color: "bg-[#0A66C2]" },
                  { icon: FaYoutube, color: "bg-[#FF0000]" },
                ].map((social, i) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={i}
                      href="#"
                      className={`w-10 h-10 ${social.color} rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
                    >
                      <Icon className="text-white text-lg" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl shadow-xl p-5 hover:shadow-2xl transition-shadow">
                <div className="text-2xl font-bold text-[#8B6A3E] mb-1">
                  24/7
                </div>
                <div className="text-gray-600 text-xs font-medium">Support</div>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-5 hover:shadow-2xl transition-shadow">
                <div className="text-2xl font-bold text-[#8B6A3E] mb-1">
                  15min
                </div>
                <div className="text-gray-600 text-xs font-medium">
                  Avg Response
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}

      {/* Full Width Map */}
      <div className="w-full h-[400px] relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.534949739743!2d77.24169897530307!3d28.635675075660614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd4ef652492d%3A0x30a0a03d7b1764f5!2sBharat%20Mandapam%20(Pragati%20Maidan)!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          className="w-full h-full"
          title="Bharat Mandapam Location"
        ></iframe>

        <div className="absolute bottom-6 left-6 bg-white rounded-xl shadow-2xl p-4 max-w-xs">
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 bg-[#8B6A3E] rounded-lg flex items-center justify-center">
              <FaMapMarkerAlt className="text-white text-sm" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-sm mb-0.5">
                Bharat Mandapam
              </h4>
              <p className="text-gray-600 text-xs mb-1">
                Hall No. 11, Pragati Maidan, New Delhi
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8B6A3E] text-xs font-semibold hover:underline flex items-center gap-0.5"
              >
                Get Directions
                <FaChevronRight className="text-[10px]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
