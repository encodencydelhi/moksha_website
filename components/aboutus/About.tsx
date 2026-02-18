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
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import Image from "next/image";
import shlokas from "@/types/shlokas.json";

function About() {
  // ---------------- DAILY MANTRA STATE ----------------
  const [mantra, setMantra] = useState<any>(null);
  const [currentMantraIndex, setCurrentMantraIndex] = useState(0);

  // ---------------- GET TODAY MANTRA ----------------
  useEffect(() => {
    // Filter out Shanti Mantra (id: 5) as requested
    const filteredMantras = shlokas.filter((m) => m.id !== 5);

    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - start.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const index = dayOfYear % filteredMantras.length;
    setMantra(filteredMantras[index]);
    setCurrentMantraIndex(index);
  }, []);

  // ---------------- CHANGE MANTRA ----------------
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
    <div className="min-h-screen bg-white">
      <Topbar />
      <Navbar />

      {/* Hero Section */}
      <section
        className="py-18 md:py-14 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#F5E9D9" }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
            About <span className="text-[#8B6A3E]">Moksha Voyage</span>
          </h1>
          <div className="w-12 h-0.5 bg-gray-800 mx-auto mb-3"></div>
          <p className="text-gray-700 text-sm max-w-xl mx-auto">
            "Journey to Enlightenment: Transforming Souls Through Spiritual
            Travel"
          </p>
        </div>
      </section>

      {/* Daily Mantra Section - New Addition */}

      {/* Welcome Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                Welcome to <span className="text-[#8B6A3E]">Moksha Voyage</span>
              </h2>
              <div className="space-y-3 text-gray-700">
                <p className="text-sm md:text-base">
                  Step into a world where travel meets transformation at{" "}
                  <strong className="text-[#8B6A3E]">Moksha Voyage</strong> –
                  India's Premier Spiritual & Wellness Travel Company.
                </p>
                <p className="text-sm md:text-base">
                  We bring together spiritual seekers, yoga enthusiasts,
                  meditation practitioners, and wellness travelers to experience
                  sacred journeys that nourish the soul.
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <div className="flex items-center bg-[#8B6A3E]/10 px-3 py-1.5 rounded-lg border border-[#8B6A3E]/20">
                  <div className="w-6 h-6 bg-[#8B6A3E] rounded-full flex items-center justify-center mr-2">
                    <Globe className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-xs font-medium text-gray-800">
                    Sacred Journeys
                  </span>
                </div>
                <div className="flex items-center bg-[#8B6A3E]/10 px-3 py-1.5 rounded-lg border border-[#8B6A3E]/20">
                  <div className="w-6 h-6 bg-[#8B6A3E] rounded-full flex items-center justify-center mr-2">
                    <Heart className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-xs font-medium text-gray-800">
                    Soul Transformations
                  </span>
                </div>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/assets/old.png"
                alt="Welcome to Moksha Voyage"
                width={400}
                height={250}
                className="w-full h-40 md:h-56 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 tracking-tight">
              Our <span className="text-[#8B6A3E]">Purpose</span>
            </h2>
            <div className="w-12 h-0.5 bg-gray-800 mx-auto mb-3"></div>
            <p className="text-gray-600 text-sm">
              Guiding souls towards inner peace and spiritual awakening
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                icon: <Target className="w-6 h-6" />,
                title: "Our Mission",
                description:
                  "To facilitate transformative spiritual journeys that connect individuals with ancient wisdom, sacred spaces, and inner peace.",
                bgColor: "bg-[#8B6A3E]",
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "Our Vision",
                description:
                  "To become the world's most trusted spiritual travel companion, making sacred journeys accessible to every seeker.",
                bgColor: "bg-[#8B6A3E]/90",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm"
              >
                <div
                  className={`w-10 h-10 ${item.bgColor} rounded-lg flex items-center justify-center mb-3`}
                >
                  <div className="text-white">{item.icon}</div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {mantra && (
        <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#8B6A3E]/5 mb-4">
                <BookOpen className="w-4 h-4 text-[#8B6A3E]" />
                <span className="text-[#8B6A3E] font-medium text-sm">
                  Daily Wisdom
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 tracking-tight">
                Today's <span className="text-[#8B6A3E]">Sacred Mantra</span>
              </h2>
              <div className="w-12 h-0.5 bg-gray-300 mx-auto"></div>
            </div>

            <div className="relative">
              {/* Navigation Buttons */}
              <button
                onClick={prevMantra}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 md:-translate-x-16 p-2 rounded-full bg-[#8B6A3E]/5 hover:bg-[#8B6A3E]/10 text-[#8B6A3E] transition-colors hidden md:block"
                aria-label="Previous mantra"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextMantra}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 md:translate-x-16 p-2 rounded-full bg-[#8B6A3E]/5 hover:bg-[#8B6A3E]/10 text-[#8B6A3E] transition-colors hidden md:block"
                aria-label="Next mantra"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Mantra Card */}
              <div className="bg-gradient-to-br from-[#FDF8F0] to-[#FAF3E8] rounded-xl p-6 md:p-8 border border-[#8B6A3E]/10 shadow-sm">
                <div className="text-center space-y-6">
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-[#8B6A3E]/80">
                    {mantra.title}
                  </h3>

                  {/* Sanskrit Text */}
                  <div className="relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-px bg-[#8B6A3E]/20"></div>
                    <p className="text-2xl md:text-3xl font-serif text-gray-800 leading-relaxed pt-4">
                      {mantra.sanskrit}
                    </p>
                  </div>

                  {/* Hindi Translation */}
                  <div className="bg-white/80 rounded-lg p-4 border border-[#8B6A3E]/5">
                    <p className="text-gray-600 text-sm md:text-base italic">
                      {mantra.hindi}
                    </p>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex items-center justify-between md:hidden">
                    <button
                      onClick={prevMantra}
                      className="p-2 rounded-full bg-[#8B6A3E]/5 hover:bg-[#8B6A3E]/10 text-[#8B6A3E] transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <span className="text-xs text-gray-400">
                      {currentMantraIndex + 1} / {filteredMantras.length}
                    </span>

                    <button
                      onClick={nextMantra}
                      className="p-2 rounded-full bg-[#8B6A3E]/5 hover:bg-[#8B6A3E]/10 text-[#8B6A3E] transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Dots Indicator */}
                  <div className="flex justify-center gap-2 mt-4">
                    {filteredMantras.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => changeMantra(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentMantraIndex
                            ? "w-4 bg-[#8B6A3E]/60"
                            : "bg-[#8B6A3E]/20 hover:bg-[#8B6A3E]/30"
                        }`}
                        aria-label={`Go to mantra ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Story Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                Our <span className="text-[#8B6A3E]">Story</span>
              </h2>
              <div className="space-y-3 text-gray-700 mb-4">
                <p className="text-sm md:text-base">
                  Founded in 2015 by spiritual seekers turned travel
                  enthusiasts, Moksha Voyage began as a small group organizing
                  trips to Himalayan meditation centers.
                </p>
                <p className="text-sm md:text-base">
                  What started as personal spiritual quests evolved into a
                  mission to help others find their path to enlightenment
                  through authentic travel experiences.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "8+", label: "Years of Service" },
                  { value: "200+", label: "Spiritual Guides" },
                  { value: "15+", label: "Countries Served" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-2 bg-[#8B6A3E]/10 rounded-lg border border-[#8B6A3E]/20"
                  >
                    <div className="text-lg font-bold text-[#8B6A3E] mb-1">
                      {stat.value}
                    </div>
                    <div className="text-gray-700 text-xs">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <Image
                src="/assets/girl.jpg"
                alt="Our Story"
                width={400}
                height={250}
                className="w-full h-40 md:h-56 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 tracking-tight">
              Journey <span className="text-[#8B6A3E]">Highlights</span>
            </h2>
            <div className="w-12 h-0.5 bg-gray-800 mx-auto mb-3"></div>
            <p className="text-gray-600 text-sm">
              Transforming lives through sacred travel experiences
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                icon: <MapPin className="w-4 h-4" />,
                value: "50+",
                label: "Sacred Destinations",
              },
              {
                icon: <Users2 className="w-4 h-4" />,
                value: "5,000+",
                label: "Happy Travelers",
              },
              {
                icon: <Mountain className="w-4 h-4" />,
                value: "100+",
                label: "Retreats Conducted",
              },
              {
                icon: <Award className="w-4 h-4" />,
                value: "98%",
                label: "Satisfaction Rate",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg p-3 text-center bg-white shadow-sm border border-gray-100"
              >
                <div className="relative z-10">
                  <div className="w-8 h-8 bg-[#8B6A3E]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <div className="text-[#8B6A3E]">{stat.icon}</div>
                  </div>
                  <div className="text-lg font-bold text-gray-900 mb-1 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-xs font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 tracking-tight">
              Our Spiritual <span className="text-[#8B6A3E]">Guides</span>
            </h2>
            <div className="w-12 h-0.5 bg-gray-800 mx-auto mb-3"></div>
            <p className="text-gray-600 text-sm">
              Experienced mentors who illuminate your spiritual path
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                name: "Ravi Shankar",
                role: "Founder & Spiritual Director",
                description:
                  "25+ years of meditation practice, studied under Himalayan masters",
                expertise: ["Vedanta", "Meditation", "Yoga Philosophy"],
                image: "/assets/man1.jpg",
              },
              {
                name: "Priya Sharma",
                role: "Head of Wellness Journeys",
                description: "Certified Ayurvedic doctor & yoga therapist",
                expertise: ["Ayurveda", "Yoga Therapy", "Holistic Healing"],
                image: "/assets/man2.avif",
              },
              {
                name: "Arjun Patel",
                role: "Pilgrimage Expert",
                description:
                  "Guided 500+ pilgrims across sacred sites of India",
                expertise: ["Temple History", "Rituals", "Sacred Geography"],
                image: "/assets/girl.jpg",
              },
            ].map((guide, index) => (
              <div
                key={index}
                className="group bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={guide.image}
                    alt={guide.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover object-top"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                </div>

                <div className="p-3 text-center">
                  <div className="relative -mt-8 mb-3">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#8B6A3E] rounded-lg border-4 border-white shadow-sm">
                      <span className="text-white font-bold text-sm">
                        {guide.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                  </div>

                  <div className="mt-1">
                    <h3 className="font-bold text-gray-900 text-sm mb-1 tracking-tight">
                      {guide.name}
                    </h3>
                    <p className="text-[#8B6A3E] text-xs font-medium mb-2">
                      {guide.role}
                    </p>
                    <p className="text-gray-600 text-xs mb-3 leading-relaxed">
                      {guide.description}
                    </p>
                    <div className="flex flex-wrap justify-center gap-1">
                      {guide.expertise.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-[#8B6A3E]/10 text-[#8B6A3E] rounded-full text-xs font-medium border border-[#8B6A3E]/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 tracking-tight">
            Begin Your <span className="text-[#8B6A3E]">Spiritual Journey</span>
          </h2>
          <div className="w-12 h-0.5 bg-gray-800 mx-auto mb-3"></div>
          <p className="text-gray-700 mb-6 max-w-xl mx-auto text-sm">
            Discover inner peace, find your purpose, and transform your soul
            with our curated spiritual journeys.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <button className="px-5 py-2 bg-[#8B6A3E] text-white font-medium rounded-lg hover:bg-[#8B6A3E]/90 transition-colors duration-200 text-sm">
              Explore Journeys
            </button>
            <button className="px-5 py-2 bg-white border border-[#8B6A3E] text-[#8B6A3E] font-medium rounded-lg hover:bg-[#8B6A3E]/10 transition-colors duration-200 text-sm">
              Book a Consultation
            </button>
          </div>
          <p className="text-[#8B6A3E] mt-4 text-xs">
            Free spiritual guidance session with our experts
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
