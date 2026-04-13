"use client";

import React, { useState, useEffect } from "react";
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
  FaHeadset,
  FaChevronRight,
  FaRegBuilding,
  FaStar,
  FaClock,
} from "react-icons/fa";
import { MdVerified, MdEmail } from "react-icons/md";
import { PiFlowerLotus } from "react-icons/pi";
import { getComponentByKey, submitContactForm } from "@/lib/apiClient";

function Contact() {
  const [cmsData, setCmsData] = useState<any>(null);
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

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getComponentByKey("contact_page");
        if (res.data?.success && res.data?.data?.customData) {
          setCmsData(res.data.data.customData);
        }
      } catch (err: any) {
        if (err.response?.status !== 404) {
          console.error("Contact page data fetch failed:", err.message);
        }
      }
    };
    loadData();
  }, []);

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
      if (!formData.firstName || !formData.email || !formData.message) {
        throw new Error("First name, email and message are required");
      }

      const response = await submitContactForm(formData);
      const data = response.data;

      if (!data.success) {
        throw new Error(data.message || "Failed to submit enquiry");
      }

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
    } catch (error: any) {
      setSubmitStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getIcon = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes("address")) return FaMapMarkerAlt;
    if (t.includes("phone")) return FaPhoneAlt;
    if (t.includes("email")) return MdEmail;
    if (t.includes("hour") || t.includes("clock") || t.includes("work")) return FaClock;
    return FaMapMarkerAlt;
  };

  return (
    <div className="min-h-screen bg-[#FDF8F2]">
      <Topbar />
      <Navbar />

      <section className="relative h-[600px] md:h-[650px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/chatgpt.png"
            alt="Contact Us"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-lg">
              <div className="flex items-center gap-2 text-[#5A3E2B] mb-3">
                <PiFlowerLotus className="text-2xl" />
                <span className="text-sm tracking-widest">संपर्क करें</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-serif text-[#5A3E2B] mb-4 leading-tight">
                {cmsData?.header?.title?.split(" ")[0] || "Contact"}
                <span className="text-[#C89B6D]"> {cmsData?.header?.title?.split(" ").slice(1).join(" ") || "With Us"}</span>
              </h1>

              <p className="text-[#5A3E2B] text-lg max-w-md font-light leading-relaxed">
                {cmsData?.header?.subtitle || "Get in touch with our team for any inquiries or assistance. We're here to help you 24/7."}
              </p>

              <button className="mt-6 px-6 py-3 bg-[#5A3E2B] text-white rounded-lg font-medium hover:bg-black hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Get in Touch
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#FDF8F2" />
          </svg>
        </div>
      </section>

      <section className="py-6 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(cmsData?.infoCards || [
            { type: "Address", value: "A-53, Sector 6, Noida, Uttar Pradesh 201301", icon: "MapPin" },
            { type: "Phone", value: "+91 1800 123 4567", subValue: "24/7 Helpline", icon: "Phone" },
            { type: "Email", value: "support@mokshavoyage.com", subValue: "General Inquiries", icon: "Mail" },
            { type: "Working Hours", value: "Monday - Sunday", subValue: "Open 24 Hours", icon: "Clock" },
          ]).map((card: any, index: number) => {
            const Icon = getIcon(card.type);
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-[#E8DBC5] hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-[#8B5E3C]/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="text-[#8B5E3C] text-xl" />
                </div>
                <h3 className="font-serif text-lg text-[#5A3E2B] mb-2">{card.type}</h3>
                <p className="text-sm text-[#7B5E47] mb-1 font-medium">{card.value}</p>
                {card.subValue && <p className="text-xs text-[#8B5E3C]">{card.subValue}</p>}
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="mb-6">
              <h3 className="text-2xl font-serif text-[#5A3E2B] mb-2">{cmsData?.form?.title || "Send us a message"}</h3>
              <p className="text-sm text-[#7B5E47]">{cmsData?.form?.subtitle || "Our team will respond within 1-2 business days."}</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full px-3 py-3 bg-[#FDF8F2] border border-[#E7D5C2] rounded-lg text-sm" placeholder="First Name *" />
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full px-3 py-3 bg-[#FDF8F2] border border-[#E7D5C2] rounded-lg text-sm" placeholder="Last Name *" />
              </div>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-3 bg-[#FDF8F2] border border-[#E7D5C2] rounded-lg text-sm" placeholder="Email Address *" />
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-3 py-3 bg-[#FDF8F2] border border-[#E7D5C2] rounded-lg text-sm" placeholder="Phone Number" />
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-3 py-3 bg-[#FDF8F2] border border-[#E7D5C2] rounded-lg text-sm" placeholder="Subject *" />
              <textarea name="message" value={formData.message} onChange={handleChange} required rows={4} className="w-full px-3 py-3 bg-[#FDF8F2] border border-[#E7D5C2] rounded-lg text-sm resize-none" placeholder="Tell us about your inquiry..." />
              {submitStatus.type && <div className={`p-3 rounded-lg text-sm font-medium ${submitStatus.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{submitStatus.message}</div>}
              <button type="submit" disabled={isSubmitting} className="w-full bg-[#5A3E2B] text-white font-medium py-3 rounded-lg transition-all flex items-center justify-center gap-2">
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          <div className="space-y-5">
             <div className="w-full h-[450px] rounded-xl overflow-hidden shadow-lg border border-[#E8DBC5]">
                <iframe
                  src={cmsData?.googleMapUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.534949739743!2d77.24169897530307!3d28.635675075660614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd4ef652492d%3A0x30a0a03d7b1764f5!2sBharat%20Mandapam!5e0!3m2!1sen!2sin!4v1700000000000"}
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Location Map"
                ></iframe>
             </div>
             <div className="bg-white rounded-xl shadow-lg p-6 border border-[#E8DBC5]">
                <h4 className="text-xl font-serif text-[#5A3E2B] mb-2">Emergency Support</h4>
                <p className="text-[#7B5E47] text-sm mb-3">Available 24/7 for urgent inquiries</p>
                <a href={`tel:${cmsData?.infoCards?.[1]?.value || "+91 1800 123 4567"}`} className="text-2xl font-bold text-[#8B5E3C] hover:underline">
                  {cmsData?.infoCards?.[1]?.value || "+91 1800 123 4567"}
                </a>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Contact;
