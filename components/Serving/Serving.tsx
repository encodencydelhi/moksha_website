"use client";
import { useState, useEffect } from "react";

export default function Serving() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="w-full relative overflow-hidden py-16 md:py-12">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FCF9F3] to-white"></div>
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#E8DBC5] rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#D4C1A6] rounded-full opacity-15 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div
            className={`relative ${isVisible ? "opacity-100" : "opacity-0"}`}
          >
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div
                  className="aspect-[5/5] bg-cover bg-center"
                  style={{ backgroundImage: "url('/assets/p.jpg')" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#8B6A3E]/10 to-transparent"></div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
                  <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-3">
                    <div className="w-2 h-2 bg-[#8B6A3E] rounded-full mr-2"></div>
                    <span className="text-sm font-medium">Trusted Service</span>
                  </div>
                  <p className="text-lg lg:text-xl font-light">
                    Guiding Families with Compassion Since 2010
                  </p>
                </div>
              </div>

              <div className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-lg border border-[#E8DBC5]">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#F8F4EC] flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-[#8B6A3E]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-light text-[#3A2A1F]">24/7</p>
                    <p className="text-xs text-[#6E4B3A]">Support</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-[#8B6A3E] p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-light text-white">500+</p>
                    <p className="text-xs text-white/90">Families</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 w-24 h-24 border-2 border-[#E8DBC5] rounded-2xl -rotate-12 opacity-60"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-[#8B6A3E]/20 rounded-2xl rotate-12 opacity-60"></div>
            </div>
          </div>

          <div className={`${isVisible ? "opacity-100" : "opacity-0"}`}>
            <div className="mb-6">
              <div className="inline-flex items-center space-x-2 mb-4">
                <div className="w-10 h-0.5 bg-[#8B6A3E]"></div>
                <span className="text-[#8B6A3E] font-medium tracking-wide uppercase text-sm">
                  Our Promise
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#3A2A1F] leading-tight">
                <span className="block">Moksha Voyage</span>
                <span className="relative inline-block">
                  Peace of Mind
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-[#E8DBC5]/70"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,5 Q25,0 50,5 T100,5"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </span>
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-[#6E4B3A] text-lg leading-relaxed font-light">
                At{" "}
                <span className="font-medium text-[#8B6A3E]">
                  Moksha Voyage
                </span>
                , we guide families through life's most profound transitions
                with unwavering compassion and cultural sensitivity. Our
                dedicated team ensures every detail is handled with the dignity
                and respect your loved one deserves.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-white/50 rounded-xl border border-[#E8DBC5]">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-[#8B6A3E]/10 flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-[#8B6A3E]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-[#5A4030] font-light">
                    Complete guidance through end-of-life rituals and
                    arrangements
                  </p>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-white/50 rounded-xl border border-[#E8DBC5]">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-[#8B6A3E]/10 flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-[#8B6A3E]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-[#5A4030] font-light">
                    Transparent communication and compassionate support
                    throughout
                  </p>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-white/50 rounded-xl border border-[#E8DBC5]">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-[#8B6A3E]/10 flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-[#8B6A3E]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-[#5A4030] font-light">
                    Utmost respect for diverse cultural and religious traditions
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="px-8 py-3 bg-[#8B6A3E] text-white rounded-lg font-medium">
                  Our Services
                </button>
                <button className="px-8 py-3 border border-[#8B6A3E] text-[#8B6A3E] rounded-lg font-medium">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20  border-t border-[#E8DBC5]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white/50 rounded-xl border border-[#E8DBC5]">
              <div className="text-3xl font-light text-[#8B6A3E] mb-2">15+</div>
              <div className="text-[#6E4B3A]">Years of Trusted Service</div>
            </div>
            <div className="text-center p-6 bg-white/50 rounded-xl border border-[#E8DBC5]">
              <div className="text-3xl font-light text-[#8B6A3E] mb-2">50+</div>
              <div className="text-[#6E4B3A]">Cities Across India</div>
            </div>
            <div className="text-center p-6 bg-white/50 rounded-xl border border-[#E8DBC5]">
              <div className="text-3xl font-light text-[#8B6A3E] mb-2">98%</div>
              <div className="text-[#6E4B3A]">Family Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
