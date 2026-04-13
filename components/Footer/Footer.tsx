"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Heart,
  Leaf,
  Globe,
  Shield,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
} from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { getComponentByKey, resolveImagePath } from "@/lib/apiClient";
import defaultLogo from "../../public/assets/logoreal.jpeg";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [footerData, setFooterData] = useState({
    logo: defaultLogo,
    brandName: "Moksha Voyage",
    tagline: "Compassionate End-of-Life Guidance",
    description: "Providing respectful guidance with dignity, tradition and care for every family.",
    socialLinks: {
      facebook: "#",
      instagram: "#",
      twitter: "#",
      youtube: "#",
    },
    contactEmail: "info@mokshavoyage.com",
    contactPhone: "+91 123 456 7890",
    contactAddress: "Delhi NCR",
  });

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getComponentByKey("footer");
        const data = response.data;
        if (data.success && data.data) {
          const comp = data.data;
          
          setFooterData({
            logo: comp.customData?.logo || defaultLogo,
            brandName: comp.customData?.brandName || "Moksha Voyage",
            tagline: comp.customData?.tagline || "Compassionate End-of-Life Guidance",
            description: comp.customData?.description || "Providing respectful guidance with dignity, tradition and care for every family.",
            socialLinks: {
              facebook: comp.customData?.socialLinks?.facebook || "#",
              instagram: comp.customData?.socialLinks?.instagram || "#",
              twitter: comp.customData?.socialLinks?.twitter || "#",
              youtube: comp.customData?.socialLinks?.youtube || "#",
            },
            contactEmail: comp.customData?.email || "info@moksha.com",
            contactPhone: comp.customData?.phone || "+91-XXXXXXXXXX",
            contactAddress: comp.customData?.address || "Address not set",
          });
        }
      } catch (error) {
        console.error("Footer settings load failed:", error);
      }
    };
    load();
  }, []);

  const handleSubscribe = (e: any) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 2500);
    }
  };

  return (
    <footer className="relative overflow-hidden bg-[#3A2A1F] text-white">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8 mb-10">
          <div className="lg:w-2/5">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative w-14 h-14 overflow-hidden">
                <Image
                  src={typeof footerData.logo === "string" ? resolveImagePath(footerData.logo) : footerData.logo}
                  alt={footerData.brandName}
                  className="w-full h-full object-cover rounded"
                  width={100}
                  height={100}
                  priority
                />
              </div>
              <div>
                <h2 className="text-lg text-white">{footerData.brandName}</h2>
                <p className="text-xs text-white/70">
                  {footerData.tagline}
                </p>
              </div>
            </div>

            <p className="text-sm text-white/80 leading-relaxed mb-4 max-w-md">
              {footerData.description}
            </p>

            <div className="flex space-x-3">
              <a
                href={footerData.socialLinks.facebook}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                target="_blank"
                rel="noreferrer"
              >
                <Facebook size={16} />
              </a>
              <a
                href={footerData.socialLinks.instagram}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram size={16} />
              </a>
              <a
                href={footerData.socialLinks.twitter}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                target="_blank"
                rel="noreferrer"
              >
                <Twitter size={16} />
              </a>
              <a
                href={footerData.socialLinks.youtube}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                target="_blank"
                rel="noreferrer"
              >
                <Youtube size={16} />
              </a>
            </div>

            </div>

          <div className="lg:w-3/5">
            <div className="bg-white/10 rounded-xl p-5 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Mail className="w-4 h-4 text-[#E8DBC5]" />
                <h3 className="text-sm text-white">Stay Connected</h3>
              </div>

              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 rounded-md bg-white text-[#3A2A1F] text-sm outline-none"
                  required
                />
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-md text-sm border border-white/30 hover:bg-white hover:text-[#3A2A1F] transition ${
                    subscribed
                      ? "bg-green-500 text-white border-green-500"
                      : "text-white"
                  }`}
                >
                  {subscribed ? "Done" : "Join"}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 text-sm">
          <div>
            <h3 className="text-sm font-medium text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/services">Services</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-white mb-3">Services</h3>
            <ul className="space-y-2 text-white/80">
              <li>Ritual Guidance</li>
              <li>Planning Support</li>
              <li>Documentation</li>
              <li>24/7 Care</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-white mb-3">Contact</h3>
            <div className="space-y-2 text-white/80">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#E8DBC5]" />
                <span>{footerData.contactAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#E8DBC5]" />
                <span>{footerData.contactEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#E8DBC5]" />
                <span>{footerData.contactPhone}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-white mb-3">Values</h3>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-center gap-2">
                <Heart size={14} className="text-[#E8DBC5]" /> Compassion
              </li>
              <li className="flex items-center gap-2">
                <Shield size={14} className="text-[#E8DBC5]" /> Trust
              </li>
              <li className="flex items-center gap-2">
                <Leaf size={14} className="text-[#E8DBC5]" /> Respect
              </li>
              <li className="flex items-center gap-2">
                <Globe size={14} className="text-[#E8DBC5]" /> Service
              </li>
            </ul>
          </div>
        </div>


        <div className="text-center text-xs text-white/60 pt-6 border-t border-white/10">
          © {new Date().getFullYear()} Moksha Voyage • All rights reserved
        </div>
      </div>
    </footer>
  );
}
