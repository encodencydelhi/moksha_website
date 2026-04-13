"use client";
import React, { useEffect, useState } from "react";
import { getComponentByKey, resolveImagePath } from "@/lib/apiClient";
import Topbar from "@/components/topbar/Topbar";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import {
  Compass,
  Target,
  Globe,
  Award,
  Users2,
  MapPin,
  Heart,
  Mountain,
  Sparkles,
  Quote,
  Infinity,
  Leaf,
  Sun,
  Moon,
  Wind,
  Droplet,
  Eye,
  Feather,
  Star,
  Crown,
  Gem,
  Shield,
  Clock,
  FileText,
  Lock,
  HandHeart,
  Phone,
  Calendar,
  CheckCircle,
  TrendingUp,
  Users,
  BookOpen,
  Briefcase,
  Coffee,
  Home,
  Truck,
  Droplets,
  Film,
  Camera,
  ScrollText,
  Scale,
  FileCheck,
  UserCheck,
  Globe2,
  PhoneCall,
  MessageCircle,
  Video,
  HeartHandshake,
  Landmark,
  TreePine,
  Church,
  Flower2,
  Utensils,
  Wifi,
  Map,
  Ship,
  Plane,
  Train,
  Car,
  Building2,
  Warehouse,
  Hospital,
  Ambulance,
  Mic,
  Headphones,
  Radio,
  MonitorSmartphone,
  HardDrive,
  Cloud,
  ShieldCheck,
  Fingerprint,
  KeyRound,
  Mail,
  Send,
  Share2,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  StarHalf,
  MessageSquareQuote,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import shlokas from "@/types/shlokas.json";
import Mantra from "../Mantra/Mantra";

function About() {
  const [cmsData, setCmsData] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getComponentByKey("about_page");
        if (response.data?.success && response.data?.data?.customData) {
          setCmsData(response.data.data.customData);
        }
      } catch (error: any) {
        // Silently fail if 404 (handled by backend fallback)
        if (error.response?.status !== 404) {
          console.error("About page data fetch failed:", error.message);
        }
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF7F2] to-white">
      <Topbar />
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#8B6A3E] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#5A3E2B] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#8B6A3E]/10 rounded-full border border-[#8B6A3E]/20 mb-6">
            <Feather className="w-3.5 h-3.5 text-[#8B6A3E]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#8B6A3E] font-medium">
              {cmsData?.hero?.tag || "A Promise Born from Loss"}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#2C1810] mb-6 tracking-tight">
            {cmsData?.hero?.title || "About"}
            <span className="block text-5xl md:text-6xl lg:text-7xl font-serif text-[#8B6A3E] mt-3">
              {cmsData?.hero?.titleHighlight || "Moksha Voyage"}
            </span>
          </h1>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <Quote className="absolute -top-6 -left-8 w-8 h-8 text-[#8B6A3E]/20" />
              <p className="text-lg md:text-xl text-[#5A3E2B]/90 italic leading-relaxed font-light px-8">
                {cmsData?.hero?.quote || "Moksha Voyage was founded not in a boardroom, but in the quiet, aching moments following a deeply personal family loss. That pain revealed a universal truth: families are left to navigate their most sacred duty entirely alone."}
              </p>
              <Quote className="absolute -bottom-6 -right-8 w-8 h-8 text-[#8B6A3E]/20 rotate-180" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="py-10 px-6 bg-[#8B6A3E]/5 border-y border-[#8B6A3E]/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              icon: Clock,
              value: "24/7",
              label: "Care Coordination",
              desc: "365 days a year",
            },
            {
              icon: Globe,
              value: "30M+",
              label: "NRI Community",
              desc: "Global Indian diaspora",
            },
            {
              icon: Users,
              value: "500+",
              label: "Verified Providers",
              desc: "Across India",
            },
            {
              icon: Shield,
              value: "100%",
              label: "Transparency",
              desc: "No hidden charges",
            },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#8B6A3E]/10 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#8B6A3E]" />
                </div>
                <div>
                  <div className="text-2xl font-serif text-[#2C1810]">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#8B6A3E] font-medium">
                    {stat.label}
                  </div>
                  <div className="text-[10px] text-[#5A3E2B]/60">
                    {stat.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Founder's Story */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={resolveImagePath(cmsData?.founder?.image) || "/assets/grahpravesh.jpg"}
                alt="Founder's Story"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-xl">
                  <p className="text-[#2C1810] text-base italic">
                    {cmsData?.founder?.founderQuote || '"The frantic calls to unknown service providers, the fear of being misled during vulnerability, the profound disconnect of trying to honour a loved one from thousands of miles away."'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#8B6A3E]/10 rounded-full border border-[#8B6A3E]/20 mb-6">
              <Heart className="w-4 h-4 text-[#8B6A3E]" />
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#8B6A3E] font-medium">
                Founder's Story
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-serif text-[#2C1810] mb-6 leading-tight">
              {cmsData?.founder?.title || "A Promise Born"}
              <span className="block text-[#8B6A3E] mt-2">{cmsData?.founder?.titleHighlight || "from Loss"}</span>
            </h2>

            <div className="space-y-4 text-[#5A3E2B]/80 leading-relaxed">
              <p className="text-base">
                {cmsData?.founder?.description || "Our founder experienced firsthand the devastating combination of grief and logistical chaos — the frantic calls to unknown service providers, the fear of being misled during vulnerability, and the profound disconnect of trying to honour a loved one from thousands of miles away."}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {(cmsData?.founder?.stats || [
                { icon: Calendar, value: "Since 2015", label: "Founded" },
                { icon: TrendingUp, value: "12,000 Cr", label: "Market Size" },
                { icon: Users, value: "30M+", label: "NRI Served" },
              ]).map((stat: any, idx: number) => {
                const Icon = stat.icon || Users;
                return (
                  <div
                    key={idx}
                    className="text-center p-4 bg-[#FAF7F2] rounded-lg border border-[#8B6A3E]/10"
                  >
                    <div className="text-lg font-serif text-[#2C1810]">
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-[#5A3E2B]/70">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission - 3 Cards Layout */}
      <section className="py-20 px-6 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#8B6A3E]/10 rounded-full border border-[#8B6A3E]/20 mb-6">
              <Target className="w-4 h-4 text-[#8B6A3E]" />
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#8B6A3E] font-medium">
                Our Purpose
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-[#2C1810] mb-4">
              Vision, Mission & Promise
            </h2>
            <p className="text-base text-[#5A3E2B]/70 max-w-2xl mx-auto">
              Guided by compassion and driven by transparency, we're
              transforming end-of-life care in India and beyond.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {(cmsData?.visionMission || [
              { title: "Our Vision", desc: "A world where every person can experience a dignified, peaceful end-of-life journey.", icon: <Eye /> },
              { title: "Our Mission", desc: "To build a trusted, transparent digital ecosystem connecting families with verified services.", icon: <Target /> },
              { title: "Our Promise", desc: "Every family will receive the same standard of care, respect, and transparency we would want for our own.", icon: <Heart /> },
            ]).map((item: any, i: number) => (
              <div
                key={i}
                className={`rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[#8B6A3E]/10 group ${
                  (i as number) === 2 ? "bg-gradient-to-br from-[#8B6A3E] to-[#5A3E2B] text-white" : "bg-white"
                }`}
              >
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${
                  (i as number) === 2 ? "bg-white/20" : "bg-[#8B6A3E]/10"
                }`}>
                  {(i as number) === 0 ? <Eye className={`w-8 h-8 ${(i as number) === 2 ? "text-white" : "text-[#8B6A3E]"}`} /> : 
                   (i as number) === 1 ? <Target className={`w-8 h-8 ${(i as number) === 2 ? "text-white" : "text-[#8B6A3E]"}`} /> : 
                   <Heart className={`w-8 h-8 ${(i as number) === 2 ? "text-white" : "text-[#8B6A3E]"}`} />}
                </div>
                <h3 className={`text-2xl font-serif mb-4 ${(i as number) === 2 ? "text-white" : "text-[#2C1810]"}`}>
                  {item.title}
                </h3>
                <p className={`text-sm leading-relaxed ${(i as number) === 2 ? "text-white/90 italic" : "text-[#5A3E2B]/80"}`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE HELP SECTION - 4 Cards Layout */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#8B6A3E]/10 rounded-full border border-[#8B6A3E]/20 mb-6">
            <HeartHandshake className="w-4 h-4 text-[#8B6A3E]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#8B6A3E] font-medium">
              Our Services
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-[#2C1810] mb-4">
            How We Help
          </h2>
          <p className="text-base text-[#5A3E2B]/70 max-w-2xl mx-auto">
            Comprehensive support through every step of the journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Ambulance,
              title: "Cremation Services",
              desc: "End-to-end cremation coordination with verified providers, ritual materials, and ground booking.",
              features: ["Cremation Ground", "Pandit Services", "Samagri"],
              color: "from-[#8B6A3E] to-[#A88B5E]",
            },
            {
              icon: Globe2,
              title: "NRI Services",
              desc: "Dedicated local representatives managing all logistics for families abroad with real-time updates.",
              features: ["Family Rep", "Legal Docs", "Repatriation"],
              color: "from-[#5C4033] to-[#7A5B46]",
            },
            {
              icon: Heart,
              title: "Grief Support",
              desc: "Professional counselling, peer support communities, and post-funeral ritual guidance.",
              features: ["Counselling", "Peer Groups", "Ritual Guidance"],
              color: "from-[#4A716C] to-[#5E8B83]",
            },
            {
              icon: Video,
              title: "Digital Legacy",
              desc: "Permanent digital memorials, document vault, and video tributes to preserve memories.",
              features: ["Digital Memorials", "Document Vault", "Obituary"],
              color: "from-[#6B7D6E] to-[#8A9B8C]",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[#E8DBC5] overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity`}
                ></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-[#8B6A3E]/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-[#8B6A3E]" />
                  </div>
                  <h3 className="text-xl font-serif text-[#2C1810] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#5A3E2B]/70 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.features.map((feature, fidx) => (
                      <span
                        key={fidx}
                        className="px-2 py-1 bg-[#8B6A3E]/5 text-[10px] text-[#8B6A3E] rounded-full border border-[#8B6A3E]/10"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Core Objectives */}
      <section className="py-24 px-6 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-[#2C1810] mb-4">
              Our Core <span className="text-[#8B6A3E]">Objectives</span>
            </h2>
            <div className="w-24 h-1 bg-[#8B6A3E] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {(cmsData?.objectives || [
              { title: "SIMPLIFY", desc: "Transform complexity into clear steps." },
              { title: "CONNECT", desc: "Build a verified 24/7 network." },
              { title: "PROTECT", desc: "Guarantee pricing transparency." },
              { title: "HONOUR", desc: "Create lasting digital legacies." },
              { title: "SERVE", desc: "Embed social impact via Seva Fund." },
            ]).map((obj: any, i: number) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-sm border border-[#F5E9D9] hover:shadow-xl transition-all duration-300 text-center group"
              >
                <div className="text-[#8B6A3E] font-bold text-sm tracking-widest mb-4 group-hover:scale-110 transition-transform">
                  {obj.title}
                </div>
                <p className="text-xs text-[#5A3E2B]/70 leading-relaxed">
                  {obj.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#8B6A3E]/10 rounded-full border border-[#8B6A3E]/20 mb-6">
            <MessageSquareQuote className="w-4 h-4 text-[#8B6A3E]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#8B6A3E] font-medium">
              Real Stories
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-[#2C1810] mb-4">
            What Families Say
          </h2>
          <p className="text-base text-[#5A3E2B]/70 max-w-2xl mx-auto">
            Verified testimonials from families we've served
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[#E8DBC5] group overflow-hidden">
            <div className="relative w-full h-56 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1887&auto=format&fit=crop"
                alt="Family"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-white ml-1">5.0</span>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="text-[10px] px-3 py-1.5 bg-[#8B6A3E] text-white rounded-full">
                  Verified
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-3">
                <p className="text-lg font-serif text-[#2C1810] font-medium">
                  Priya Sharma
                </p>
                <p className="text-xs text-[#5A3E2B]/60">
                  London, UK · NRI Services
                </p>
              </div>

              <div className="relative">
                <Quote className="absolute -top-2 -left-1 w-4 h-4 text-[#8B6A3E]/30" />
                <p className="text-sm text-[#5A3E2B]/80 italic leading-relaxed pl-4">
                  "Living in London when my father passed in Delhi, I was
                  paralysed. Moksha Voyage became my eyes, my hands, and my
                  voice in India. I never felt alone, not for a single moment."
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[#E8DBC5] group overflow-hidden">
            <div className="relative w-full h-56 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1887&auto=format&fit=crop"
                alt="Family"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-white ml-1">5.0</span>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="text-[10px] px-3 py-1.5 bg-[#8B6A3E] text-white rounded-full">
                  Verified
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-3">
                <p className="text-lg font-serif text-[#2C1810] font-medium">
                  Desai Family
                </p>
                <p className="text-xs text-[#5A3E2B]/60">
                  Mumbai · Full Cremation Package
                </p>
              </div>

              <div className="relative">
                <Quote className="absolute -top-2 -left-1 w-4 h-4 text-[#8B6A3E]/30" />
                <p className="text-sm text-[#5A3E2B]/80 italic leading-relaxed pl-4">
                  "We were terrified of being overcharged. Moksha Voyage gave us
                  a complete itemised price list before confirming. The pandit
                  they arranged was extraordinary."
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[#E8DBC5] group overflow-hidden">
            <div className="relative w-full h-56 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1594819047050-99defca82545?q=80&w=1887&auto=format&fit=crop"
                alt="Family"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-white ml-1">5.0</span>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="text-[10px] px-3 py-1.5 bg-[#8B6A3E] text-white rounded-full">
                  Verified
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-3">
                <p className="text-lg font-serif text-[#2C1810] font-medium">
                  Arjun Nair
                </p>
                <p className="text-xs text-[#5A3E2B]/60">
                  Singapore · Elder Care Coordination
                </p>
              </div>

              <div className="relative">
                <Quote className="absolute -top-2 -left-1 w-4 h-4 text-[#8B6A3E]/30" />
                <p className="text-sm text-[#5A3E2B]/80 italic leading-relaxed pl-4">
                  "When the time came, they were there within the hour. All
                  documentation, rituals, coordination handled completely. In
                  the most difficult moment, they were my calm."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Reviews Row */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-[#E8DBC5] hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-sm text-[#8B6A3E] font-medium">
                March 2024
              </span>
            </div>
            <p className="text-base text-[#5A3E2B]/90 italic leading-relaxed mb-4">
              "The real-time tracking gave us peace of mind being 10,000 miles
              away. Every step was documented, every update shared."
            </p>
            <p className="text-sm font-medium text-[#2C1810]">
              — Meera Krishnan, Dubai
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-[#E8DBC5] hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-sm text-[#8B6A3E] font-medium">
                February 2024
              </span>
            </div>
            <p className="text-base text-[#5A3E2B]/90 italic leading-relaxed mb-4">
              "As a shelter home manager, Moksha Seva stepped in without
              hesitation for our residents who had no one. They gave dignity to
              the forgotten."
            </p>
            <p className="text-sm font-medium text-[#2C1810]">
              — Anjali Srivastava, Varanasi
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B6A3E] text-white rounded-lg text-sm font-medium hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            View All Reviews
            <ThumbsUp className="w-4 h-4" />
          </button>
          <p className="text-xs text-[#8B6A3E]/60 mt-4">
            Trusted by 500+ families across the globe
          </p>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 px-6 bg-white border-y border-[#8B6A3E]/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {[
            { icon: ShieldCheck, text: "Verified Providers" },
            { icon: Lock, text: "Blockchain Audit Trail" },
            { icon: Clock, text: "15 Min Response SLA" },
            { icon: Heart, text: "Moksha Seva Fund" },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-3 justify-center">
                <Icon className="w-8 h-8 text-[#8B6A3E]" />
                <span className="text-sm font-medium text-[#5A3E2B]">
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Accolades & Partnerships */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#8B6A3E]/10 rounded-full border border-[#8B6A3E]/20 mb-6">
            <Award className="w-4 h-4 text-[#8B6A3E]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#8B6A3E] font-medium">
              Recognition
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-[#2C1810] mb-4">
            Accolades & Partnerships
          </h2>
          <p className="text-base text-[#5A3E2B]/70 max-w-2xl mx-auto">
            Trusted by institutions, recognized by industry, committed to
            excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Press Mentions */}
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[#8B6A3E]/10 group">
            <div className="w-16 h-16 bg-[#8B6A3E]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Award className="w-8 h-8 text-[#8B6A3E]" />
            </div>
            <h3 className="text-2xl font-serif text-[#2C1810] mb-4">
              Press Mentions
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-[#FAF7F2] rounded-lg border border-[#8B6A3E]/10">
                <p className="text-sm font-medium text-[#2C1810]">
                  The Economic Times
                </p>
                <p className="text-xs text-[#5A3E2B]/60">
                  "Revolutionizing End-of-Life Care in India"
                </p>
              </div>
              <div className="p-4 bg-[#FAF7F2] rounded-lg border border-[#8B6A3E]/10">
                <p className="text-sm font-medium text-[#2C1810]">
                  Forbes India
                </p>
                <p className="text-xs text-[#5A3E2B]/60">
                  "30 Under 30: Social Impact"
                </p>
              </div>
              <div className="p-4 bg-[#FAF7F2] rounded-lg border border-[#8B6A3E]/10">
                <p className="text-sm font-medium text-[#2C1810]">YourStory</p>
                <p className="text-xs text-[#5A3E2B]/60">
                  "Tech for Good: Moksha Voyage Story"
                </p>
              </div>
            </div>
          </div>

          {/* Key Partnerships */}
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[#8B6A3E]/10 group">
            <div className="w-16 h-16 bg-[#8B6A3E]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Gem className="w-8 h-8 text-[#8B6A3E]" />
            </div>
            <h3 className="text-2xl font-serif text-[#2C1810] mb-4">
              Key Partnerships
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-[#FAF7F2] rounded-lg border border-[#8B6A3E]/10">
                <p className="text-sm font-medium text-[#2C1810]">
                  Government MoU
                </p>
                <p className="text-xs text-[#5A3E2B]/60">
                  Ministry of Social Justice
                </p>
              </div>
              <div className="p-4 bg-[#FAF7F2] rounded-lg border border-[#8B6A3E]/10">
                <p className="text-sm font-medium text-[#2C1810]">
                  Healthcare Network
                </p>
                <p className="text-xs text-[#5A3E2B]/60">
                  Apollo Hospitals · Fortis
                </p>
              </div>
              <div className="p-4 bg-[#FAF7F2] rounded-lg border border-[#8B6A3E]/10">
                <p className="text-sm font-medium text-[#2C1810]">
                  Registered Body
                </p>
                <p className="text-xs text-[#5A3E2B]/60">
                  FCRA-compliant · Section 80G
                </p>
              </div>
            </div>
          </div>

          {/* Awards & Recognition */}
          <div className="bg-gradient-to-br from-[#8B6A3E]/5 to-[#5A3E2B]/5 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[#8B6A3E]/10 group">
            <div className="w-16 h-16 bg-[#8B6A3E]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Star className="w-8 h-8 text-[#8B6A3E]" />
            </div>
            <h3 className="text-2xl font-serif text-[#2C1810] mb-4">Awards</h3>
            <div className="space-y-4">
              <div className="p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-[#8B6A3E]/10">
                <p className="text-sm font-medium text-[#2C1810]">
                  Social Impact Innovation
                </p>
                <p className="text-xs text-[#5A3E2B]/60">
                  India Startup Awards — 2023
                </p>
              </div>
              <div className="p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-[#8B6A3E]/10">
                <p className="text-sm font-medium text-[#2C1810]">
                  Best Startup in Elder Care
                </p>
                <p className="text-xs text-[#5A3E2B]/60">ET Now — 2024</p>
              </div>
              <div className="p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-[#8B6A3E]/10">
                <p className="text-sm font-medium text-[#2C1810]">
                  Innovation in Death Tech
                </p>
                <p className="text-xs text-[#5A3E2B]/60">NASSCOM — 2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Moksha Seva Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-[#8B6A3E]/10 to-[#5A3E2B]/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#8B6A3E]/20 rounded-full border border-[#8B6A3E]/30 mb-6">
            <HandHeart className="w-4 h-4 text-[#8B6A3E]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#8B6A3E] font-medium">
              Social Impact
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-[#2C1810] mb-4">
            Moksha Seva Fund
          </h2>
          <p className="text-base text-[#5A3E2B]/80 mb-8 max-w-2xl mx-auto">
            Through the Moksha Seva Fund, a portion of every Moksha Voyage
            transaction provides completely FREE compassionate end-of-life care
            for the elderly and underprivileged who have no one else. Your
            journey helps fund another's dignity.
          </p>
          <button className="px-8 py-3 bg-[#8B6A3E] text-white rounded-lg text-sm font-medium hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Support Moksha Seva
          </button>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C1810] to-[#8B6A3E]"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/pattern.png')] bg-repeat"></div>
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto text-center px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm mb-8">
            <Phone className="w-4 h-4 text-white" />
            <span className="text-xs tracking-wider text-white font-medium">
              24/7 Immediate Support
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4">
            No One Should Navigate This Journey
            <span className="block text-[#F5E9D9] mt-2">
              Alone or Without Dignity
            </span>
          </h2>

          <p className="text-white/80 text-lg mb-10 max-w-3xl mx-auto">
            Get immediate support, plan ahead for your family, or learn how
            Moksha Voyage works.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-[#2C1810] rounded-lg text-base font-medium hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Get Immediate Support
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg text-base font-medium hover:bg-white/10 transition-all duration-300">
              Plan Ahead for Your Family
            </button>
            <button className="px-8 py-4 bg-[#F5E9D9] text-[#2C1810] rounded-lg text-base font-medium hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Learn More →
            </button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-white/80">
              <Shield className="w-5 h-5" />
              <span className="text-sm">Radical Pricing Transparency</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm">Verified Network</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Clock className="w-5 h-5" />
              <span className="text-sm">24/7 Care Coordinators</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
