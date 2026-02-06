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
import mokshalogo from "../../public/assets/logoreal.jpeg";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: any) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-white to-[#F8F4EC] border-t border-[#E8DBC5]">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E8DBC5] rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8B6A3E] rounded-full opacity-5 blur-3xl"></div>

        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="dotPattern"
                x="0"
                y="0"
                width="50"
                height="50"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1" fill="#8B6A3E" />
                <circle cx="27" cy="27" r="1" fill="#8B6A3E" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotPattern)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          <div className="lg:w-2/5">
            <div className="flex items-center space-x-4 mb-8">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src={mokshalogo}
                  alt="Moksha Voyage"
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div>
                <h2 className="text-2xl font-light text-[#3A2A1F]">
                  Moksha Voyage
                </h2>
                <p className="text-sm text-[#6E4B3A]">
                  Compassionate End-of-Life Guidance
                </p>
              </div>
            </div>

            <p className="text-[#5A4030] leading-relaxed mb-8 max-w-lg">
              Providing compassionate guidance through life's most profound
              transitions. We honor traditions, respect cultural values, and
              ensure every detail is handled with dignity and care.
            </p>

            <div className="flex space-x-4">
              {[
                {
                  icon: <Facebook size={20} />,
                  color: "hover:bg-blue-100 hover:text-blue-600",
                  href: "#",
                },
                {
                  icon: <Instagram size={20} />,
                  color: "hover:bg-pink-100 hover:text-pink-600",
                  href: "#",
                },
                {
                  icon: <Twitter size={20} />,
                  color: "hover:bg-blue-100 hover:text-blue-400",
                  href: "#",
                },
                {
                  icon: <Youtube size={20} />,
                  color: "hover:bg-red-100 hover:text-red-600",
                  href: "#",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`w-10 h-10 rounded-full bg-white border border-[#E8DBC5] flex items-center justify-center text-[#6E4B3A] transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.color}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:w-3/5">
            <div className="bg-gradient-to-r from-white/80 to-[#F8F4EC]/80 backdrop-blur-sm rounded-2xl p-8 border border-[#E8DBC5] shadow-lg">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#8B6A3E]/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#8B6A3E]" />
                </div>
                <div>
                  <h3 className="text-xl font-light text-[#3A2A1F] mb-2">
                    Stay Connected
                  </h3>
                  <p className="text-[#6E4B3A]">
                    Receive compassionate guidance and updates
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-6 py-4 rounded-xl border-2 border-[#E8DBC5] bg-white/50 focus:border-[#8B6A3E] focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]/20 transition-all duration-300"
                    required
                  />
                  <button
                    type="submit"
                    className={`absolute right-2 top-2 px-6 py-2 rounded-lg transition-all duration-300 ${subscribed ? "bg-green-500" : "bg-[#8B6A3E] hover:bg-[#755735]"} text-white font-medium`}
                  >
                    {subscribed ? "Subscribed!" : "Subscribe"}
                  </button>
                </div>
                <p className="text-xs text-[#6E4B3A]/70">
                  By subscribing, you agree to receive compassionate updates. We
                  respect your privacy.
                </p>
              </form>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-0.5 bg-[#8B6A3E]"></div>
              <h3 className="text-lg font-medium text-[#3A2A1F]">
                Quick Links
              </h3>
            </div>

            <ul className="space-y-4">
              {[
                { name: "Home", link: "/" },
                { name: "About Us", link: "/about" },
                { name: "Services", link: "/services" },
                { name: "Testimonials", link: "/testimonials" },
                { name: "Resources", link: "/resources" },
                { name: "Contact", link: "/contact" },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.link}
                    className="group flex items-center text-[#6E4B3A] hover:text-[#8B6A3E] transition-all duration-300"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#E8DBC5] mr-3 group-hover:bg-[#8B6A3E] transition-all duration-300"></div>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-0.5 bg-[#8B6A3E]"></div>
              <h3 className="text-lg font-medium text-[#3A2A1F]">
                Our Services
              </h3>
            </div>

            <ul className="space-y-4">
              {[
                "End-of-Life Planning",
                "Ritual Guidance",
                "Documentation Support",
                "24/7 Compassionate Care",
                "Cultural Ceremonies",
                "Grief Counseling",
              ].map((service, i) => (
                <li key={i}>
                  <div className="group flex items-center text-[#6E4B3A] hover:text-[#8B6A3E] transition-all duration-300 cursor-pointer">
                    <div className="w-2 h-2 rounded-full bg-[#E8DBC5] mr-3 group-hover:bg-[#8B6A3E] transition-all duration-300"></div>
                    {service}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-0.5 bg-[#8B6A3E]"></div>
              <h3 className="text-lg font-medium text-[#3A2A1F]">
                Contact Info
              </h3>
            </div>

            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#8B6A3E]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#8B6A3E]" />
                </div>
                <div>
                  <p className="text-[#3A2A1F] font-medium mb-1">Visit Us</p>
                  <p className="text-[#6E4B3A] text-sm leading-relaxed">
                    Delhi NCR, India
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#8B6A3E]/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#8B6A3E]" />
                </div>
                <div>
                  <p className="text-[#3A2A1F] font-medium mb-1">Email Us</p>
                  <a
                    href="mailto:info@mokshavoyage.com"
                    className="text-[#6E4B3A] text-sm hover:text-[#8B6A3E] transition-colors"
                  >
                    info@mokshavoyage.com
                  </a>
                </div>
              </li>

              <li className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#8B6A3E]/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#8B6A3E]" />
                </div>
                <div>
                  <p className="text-[#3A2A1F] font-medium mb-1">Call Us</p>
                  <a
                    href="tel:+911234567890"
                    className="text-[#6E4B3A] text-sm hover:text-[#8B6A3E] transition-colors"
                  >
                    +91 123 456 7890
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-0.5 bg-[#8B6A3E]"></div>
              <h3 className="text-lg font-medium text-[#3A2A1F]">Our Values</h3>
            </div>

            <ul className="space-y-6">
              {[
                {
                  icon: <Heart size={20} />,
                  title: "Compassion",
                  desc: "Heart-centered care",
                },
                {
                  icon: <Shield size={20} />,
                  title: "Trust",
                  desc: "Reliable and transparent",
                },
                {
                  icon: <Leaf size={20} />,
                  title: "Respect",
                  desc: "Honoring all traditions",
                },
                {
                  icon: <Globe size={20} />,
                  title: "Service",
                  desc: "24/7 dedicated support",
                },
              ].map((value, i) => (
                <li key={i} className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E8DBC5] to-[#F8F4EC] flex items-center justify-center">
                    <div className="text-[#8B6A3E]">{value.icon}</div>
                  </div>
                  <div>
                    <p className="text-[#3A2A1F] font-medium">{value.title}</p>
                    <p className="text-[#6E4B3A] text-sm">{value.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#E8DBC5]">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <p className="text-[#6E4B3A] text-sm">
                © {new Date().getFullYear()} Moksha Voyage. All Rights Reserved.
              </p>
              <div className="hidden md:flex items-center space-x-6">
                <Link
                  href="/privacy"
                  className="text-[#6E4B3A] text-sm hover:text-[#8B6A3E] transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-[#6E4B3A] text-sm hover:text-[#8B6A3E] transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/faq"
                  className="text-[#6E4B3A] text-sm hover:text-[#8B6A3E] transition-colors"
                >
                  FAQ
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center text-[#6E4B3A] text-sm">
                <span className="mr-2">Made with</span>
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <span className="ml-2">for compassionate care</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 w-[300px] p-2 bg-gradient-to-r from-[#8B6A3E] to-[#A88B5E] rounded-xl text-white text-center flex items-center justify-center mx-auto lg:w-[500] lg:p-4">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5" />
              <span className="font-medium">24/7 Emergency Support:</span>
            </div>
            <a
              href="tel:+9118001234567"
              className="text-xl font-light hover:text-white/90 transition-colors"
            >
              +91 1800 123 4567
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
