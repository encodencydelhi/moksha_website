"use client";
import React, { useEffect, useState } from "react";
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
} from "lucide-react";
import Image from "next/image";
import shlokas from "@/types/shlokas.json";
import Mantra from "../Mantra/Mantra";

function About() {
  const [mantra, setMantra] = useState<any>(null);
  const [currentMantraIndex, setCurrentMantraIndex] = useState(0);

  useEffect(() => {
    const filteredMantras = shlokas.filter((m) => m.id !== 5);

    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - start.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const index = dayOfYear % filteredMantras.length;
    setMantra(filteredMantras[index]);
    setCurrentMantraIndex(index);
  }, []);

  const changeMantra = (index: number) => {
    const filteredMantras = shlokas.filter((m) => m.id !== 5);
    setMantra(filteredMantras[index]);
    setCurrentMantraIndex(index);
  };

  const nextMantra = () => {
    const filteredMantras = shlokas.filter((m) => m.id !== 5);
    const nextIndex = (currentMantraIndex + 1) % filteredMantras.length;
    changeMantra(nextIndex);
  };

  const prevMantra = () => {
    const filteredMantras = shlokas.filter((m) => m.id !== 5);
    const prevIndex =
      (currentMantraIndex - 1 + filteredMantras.length) %
      filteredMantras.length;
    changeMantra(prevIndex);
  };

  const filteredMantras = shlokas.filter((m) => m.id !== 5);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF7F2] to-white">
      <Topbar />
      <Navbar />

      {/* Hero Section - Minimal & Elegant */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#8B6A3E] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#5A3E2B] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#8B6A3E]/5 rounded-full border border-[#8B6A3E]/10 mb-5">
            <Feather className="w-3.5 h-3.5 text-[#8B6A3E]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#8B6A3E]">
              Since 2015
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-light text-[#2C1810] mb-5 tracking-tight">
            About
            <span className="block text-5xl md:text-6xl font-serif text-[#8B6A3E] mt-2">
              Moksha Voyage
            </span>
          </h1>

          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Quote className="absolute -top-4 -left-8 w-6 h-6 text-[#8B6A3E]/20" />
              <p className="text-base md:text-lg text-[#5A3E2B]/80 italic leading-relaxed">
                "Where ancient wisdom meets modern souls, and every journey
                becomes a path to enlightenment."
              </p>
              <Quote className="absolute -bottom-4 -right-8 w-6 h-6 text-[#8B6A3E]/20 rotate-180" />
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section - Elegant & Airy */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-[#8B6A3E]/5 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <span className="text-sm tracking-[0.3em] uppercase text-[#8B6A3E] mb-3 block">
                Welcome to
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-[#2C1810] mb-4 leading-tight">
                Where Souls Find
                <span className="block text-[#8B6A3E]">Their Path</span>
              </h2>
              <p className="text-[#5A3E2B]/70 text-base leading-relaxed mb-6">
                Step into a world where travel meets transformation. We are
                India's premier spiritual and wellness travel company, dedicated
                to curating journeys that nourish the soul and awaken the
                spirit.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    icon: Globe,
                    label: "Sacred Journeys",
                    desc: "To 50+ destinations",
                  },
                  {
                    icon: Heart,
                    label: "Soul Healing",
                    desc: "Transformative experiences",
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-2 p-3 bg-white rounded-lg shadow-sm border border-[#8B6A3E]/10"
                    >
                      <div className="w-8 h-8 bg-[#8B6A3E]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-[#8B6A3E]" />
                      </div>
                      <div>
                        <h3 className="text-md font-medium text-[#2C1810]">
                          {item.label}
                        </h3>
                        <p className="text-[10px] text-[#5A3E2B]/70">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#8B6A3E]/20 to-transparent rounded-3xl blur-2xl"></div>
            <div className="relative grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <div className="h-40 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/assets/ambulance.avif"
                    alt="Spiritual Journey"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="h-28 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/assets/girl.jpg"
                    alt="Meditation"
                    width={300}
                    height={150}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="pt-6">
                <div className="h-32 rounded-xl overflow-hidden shadow-lg mb-3">
                  <Image
                    src="/assets/man1.jpg"
                    alt="Yoga"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="h-40 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/assets/downloadd.webp"
                    alt="Pilgrimage"
                    width={300}
                    height={250}
                    className="w-full h-full object-contain hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative h-[350px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/assets/grahpravesh.jpg"
                alt="Our Story"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-[#2C1810] text-sm italic">
                    "Every journey begins with a single step, and every soul has
                    a story to tell."
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="text-sm tracking-[0.3em] uppercase text-[#8B6A3E] mb-3 block">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#2C1810] mb-4 leading-tight">
              From a Vision to
              <span className="block text-[#8B6A3E]">a Movement</span>
            </h2>
            <p className="text-[#5A3E2B]/70 text-base leading-relaxed mb-6">
              Founded in 2015 by spiritual seekers turned travel enthusiasts,
              Moksha Voyage began as a small group organizing trips to Himalayan
              meditation centers. What started as personal spiritual quests
              evolved into a mission to help others find their path to
              enlightenment through authentic travel experiences.
            </p>

            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "8+", label: "Years", icon: Crown },
                { value: "200+", label: "Guides", icon: Gem },
                { value: "15+", label: "Countries", icon: Globe },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="text-center p-3 bg-[#FAF7F2] rounded-lg"
                  >
                    <Icon className="w-4 h-4 text-[#8B6A3E] mx-auto mb-1" />
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

      {/* Journey Highlights - Minimal Stats */}
      <section className="py-16 px-6 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-sm tracking-[0.3em] uppercase text-[#8B6A3E] mb-3 block">
              By The Numbers
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#2C1810]">
              Our Impact in
              <span className="block text-[#8B6A3E]">Sacred Numbers</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: MapPin,
                value: "50+",
                label: "Sacred Destinations",
                desc: "Across India & beyond",
              },
              {
                icon: Users2,
                value: "5,000+",
                label: "Happy Travelers",
                desc: "Souls transformed",
              },
              {
                icon: Mountain,
                value: "100+",
                label: "Retreats",
                desc: "Conducted worldwide",
              },
              {
                icon: Award,
                value: "98%",
                label: "Satisfaction",
                desc: "From our pilgrims",
              },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="group relative bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8B6A3E]/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <div className="w-10 h-10 bg-[#8B6A3E]/10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-[#8B6A3E]" />
                    </div>
                    <div className="text-2xl font-serif text-[#2C1810] mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-[#8B6A3E] mb-1">
                      {stat.label}
                    </div>
                    <div className="text-[9px] text-[#5A3E2B]/60">
                      {stat.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Spiritual Guides - Elegant Cards */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-sm tracking-[0.3em] uppercase text-[#8B6A3E] mb-3 block">
            Masters of Wisdom
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-[#2C1810]">
            Meet Your
            <span className="block text-[#8B6A3E]">Spiritual Guides</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Ravi Shankar",
              role: "Founder & Spiritual Director",
              description:
                "25+ years of meditation practice, studied under Himalayan masters",
              expertise: ["Vedanta", "Meditation", "Yoga Philosophy"],
              image: "/assets/man1.jpg",
              icon: Sun,
            },
            {
              name: "Priya Sharma",
              role: "Head of Wellness Journeys",
              description: "Certified Ayurvedic doctor & yoga therapist",
              expertise: ["Ayurveda", "Yoga Therapy", "Holistic Healing"],
              image: "/assets/man2.avif",
              icon: Moon,
            },
            {
              name: "Arjun Patel",
              role: "Pilgrimage Expert",
              description: "Guided 500+ pilgrims across sacred sites of India",
              expertise: ["Temple History", "Rituals", "Sacred Geography"],
              image: "/assets/girl.jpg",
              icon: Star,
            },
          ].map((guide, index) => {
            const Icon = guide.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={guide.image}
                    alt={guide.name}
                    fill
                    className="object-cover object-top group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                      <Icon className="w-2.5 h-2.5 text-white" />
                      <span className="text-[9px] text-white">
                        Spiritual Guide
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-serif text-[#2C1810] mb-1">
                    {guide.name}
                  </h3>
                  <p className="text-sm text-[#8B6A3E] mb-2">{guide.role}</p>
                  <p className="text-sm text-[#5A3E2B]/70 mb-3 leading-relaxed">
                    {guide.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {guide.expertise.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-[#8B6A3E]/5 text-[#8B6A3E] rounded-full text-[9px] border border-[#8B6A3E]/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section - Minimal & Powerful */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C1810] to-[#8B6A3E]"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/pattern.png')] bg-repeat"></div>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm mb-5">
            <Feather className="w-3.5 h-3.5 text-white" />
            <span className="text-[10px] tracking-wider text-white">
              Begin Your Journey
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
            Ready to Find Your
            <span className="block text-[#F5E9D9]">Inner Peace?</span>
          </h2>

          <p className="text-white/80 text-base mb-6 max-w-2xl mx-auto">
            Join thousands of souls who have discovered their path to
            enlightenment through our sacred journeys.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-6 py-3 bg-white text-[#2C1810] rounded-lg font-medium text-md hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              Explore Sacred Journeys
            </button>
            <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium text-md hover:bg-white/10 transition-all duration-300">
              Book Consultation
            </button>
          </div>

          <p className="text-white/60 mt-5 text-sm">
            ✦ Free spiritual guidance session with our experts ✦
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
