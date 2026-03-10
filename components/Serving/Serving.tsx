"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { PiFlowerLotus, PiHeart, PiHandHeart, PiStar } from "react-icons/pi";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { FiClock, FiUsers, FiMapPin, FiAward } from "react-icons/fi";
import { BsShieldCheck, BsHeart, BsHandThumbsUp } from "react-icons/bs";

export default function Serving() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const themeColor = "#8B6A3E";
  const themeColorLight = "#F5E9D9";
  const themeColorDark = "#5A3E2B";

  return (
    <section className="w-full relative overflow-hidden py-16 md:py-20 lg:py-24 bg-gradient-to-b from-[#FAF7F2] to-white">
      {/* Background Patterns */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-[#8B6A3E]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-24 w-[500px] h-[500px] bg-[#5A3E2B]/5 rounded-full blur-3xl"></div>

        {/* Mandala Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-2 border-[#8B6A3E] rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-2 border-[#8B6A3E] rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border-2 border-[#8B6A3E] rounded-full"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#8B6A3E]/5 rounded-full border border-[#8B6A3E]/10 mb-4">
            <PiFlowerLotus className="w-3.5 h-3.5 text-[#8B6A3E]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#8B6A3E]">
              Who We Serve
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-3xl font-light text-[#2C1810] mb-3">
            Serving Humanity
            <span className="block text-4xl md:text-4xl lg:text-4xl font-serif text-[#8B6A3E] mt-2">
              Beyond Boundaries
            </span>
          </h2>

          <p className="text-[#5A3E2B]/70 text-sm max-w-2xl mx-auto">
            Families in India · Global NRI Community · Senior Citizens · Shelter
            Homes & NGO Partners
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Image with Stats */}
          <div
            className={`relative transition-all duration-700 transform ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative h-[400px] md:h-[450px]">
                <Image
                  src="/assets/pandit.avif"
                  alt="Serving with Compassion"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>

              {/* Stats Badges */}
              <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 flex-1">
                  <div className="text-[#8B6A3E] font-bold text-sm">30M+</div>
                  <div className="text-[9px] text-[#5A3E2B]">NRI Community</div>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 flex-1">
                  <div className="text-[#8B6A3E] font-bold text-sm">24/7</div>
                  <div className="text-[9px] text-[#5A3E2B]">Care Support</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div
            className={`transition-all duration-700 delay-300 transform ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            {/* Title */}
            <div className="mb-6">
              <h3 className="text-2xl md:text-3xl font-serif text-[#2C1810] mb-3">
                NRI Community
                <span className="block text-[#8B6A3E]">
                  Our Beachhead Market
                </span>
              </h3>

              <p className="text-[#5A3E2B]/70 text-sm leading-relaxed">
                <span className="font-medium text-[#8B6A3E]">30M+ Indians</span>{" "}
                living in the UK, USA, UAE, Canada, Australia, Singapore, and
                the Gulf. Distance transforms grief into paralysis. We become
                your eyes, hands, and voice in India.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                {
                  icon: PiHandHeart,
                  title: "Pain Point Intensity",
                  desc: "Managing sacred duties from thousands of miles away",
                },
                {
                  icon: BsShieldCheck,
                  title: "Financial Capacity",
                  desc: "3-5x average domestic transaction value",
                },
                {
                  icon: PiHeart,
                  title: "Community Referral",
                  desc: "Intensely community-networked diaspora",
                },
                {
                  icon: FiAward,
                  title: "Recurring Relationship",
                  desc: "Elder-care check-ins & pre-planning",
                },
              ].map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={idx}
                    className="group p-3 bg-white rounded-lg border border-[#E8DBC5] hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#8B6A3E]/10 flex items-center justify-center group-hover:bg-[#8B6A3E] transition-colors duration-300">
                        <Icon className="w-4 h-4 text-[#8B6A3E] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-[#2C1810] mb-0.5">
                          {feature.title}
                        </h4>
                        <p className="text-[10px] text-[#5A3E2B]/60">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Testimonial - NRI Story */}
            <div className="bg-gradient-to-r from-[#F5E9D9] to-white rounded-lg p-4 mb-6 border-l-4 border-[#8B6A3E]">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-[#8B6A3E] flex items-center justify-center">
                    <FaQuoteRight className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-[#5A3E2B]/80 italic mb-2">
                    "Living in London when my father passed in Delhi, I was
                    paralysed. Moksha Voyage became my eyes, my hands, and my
                    voice in India. I never felt alone, not for a single
                    moment."
                  </p>
                  <p className="text-[10px] font-medium text-[#8B6A3E]">
                    — Priya Sharma, London, UK
                  </p>
                </div>
              </div>
            </div>

            {/* Grief Support Ecosystem */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-[#2C1810] mb-2">
                Grief Support Ecosystem
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-[#8B6A3E]/5 text-[10px] text-[#5A3E2B] rounded-full border border-[#8B6A3E]/10">
                  Professional Counselling
                </span>
                <span className="px-2 py-1 bg-[#8B6A3E]/5 text-[10px] text-[#5A3E2B] rounded-full border border-[#8B6A3E]/10">
                  Peer Support Groups
                </span>
                <span className="px-2 py-1 bg-[#8B6A3E]/5 text-[10px] text-[#5A3E2B] rounded-full border border-[#8B6A3E]/10">
                  Children & Grief Resources
                </span>
                <span className="px-2 py-1 bg-[#8B6A3E]/5 text-[10px] text-[#5A3E2B] rounded-full border border-[#8B6A3E]/10">
                  Ritual Continuity Support
                </span>
                <span className="px-2 py-1 bg-[#8B6A3E]/5 text-[10px] text-[#5A3E2B] rounded-full border border-[#8B6A3E]/10">
                  Crisis Intervention 24/7
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 px-5 py-3 bg-[#8B6A3E] text-white rounded-lg text-sm font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                <span>Find Support Now</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
              <button className="flex-1 px-5 py-3 border border-[#8B6A3E] text-[#8B6A3E] rounded-lg text-sm font-medium hover:bg-[#F5E9D9] transition-all duration-300 flex items-center justify-center gap-2">
                <span>Join Support Community</span>
                <PiHandHeart className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Stats - Updated with PDF numbers */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: FiClock,
              value: "24/7",
              label: "Care Coordination",
              desc: "365 days a year",
            },
            {
              icon: FiMapPin,
              value: "50+",
              label: "Cities Across India",
              desc: "Verified provider network",
            },
            {
              icon: FiUsers,
              value: "30M+",
              label: "NRI Community",
              desc: "Global Indian diaspora",
            },
            {
              icon: PiStar,
              value: "100%",
              label: "Transparency",
              desc: "No hidden charges",
            },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#8B6A3E]/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="w-10 h-10 mx-auto mb-2 bg-[#8B6A3E]/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-[#8B6A3E]" />
                  </div>
                  <div className="text-xl font-serif text-[#2C1810] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-[#8B6A3E] mb-0.5">
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

        {/* Moksha Seva Fund Banner */}
        <div className="mt-12 p-6 bg-gradient-to-r from-[#8B6A3E]/10 to-transparent rounded-xl border border-[#8B6A3E]/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#8B6A3E] flex items-center justify-center flex-shrink-0">
                <PiHandHeart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-base font-serif text-[#8B6A3E]">
                  Moksha Seva Fund
                </h4>
                <p className="text-xs text-[#5A3E2B]/70 max-w-2xl">
                  A portion of every transaction provides completely FREE
                  end-of-life care for the elderly and underprivileged who have
                  no one else.
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-[#8B6A3E] text-white rounded-lg text-xs font-medium hover:shadow-lg whitespace-nowrap">
              Donate to Seva
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
