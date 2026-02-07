"use client";
import { useState, useEffect } from "react";

export default function Serving() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="w-full relative overflow-hidden py-10 md:py-12 lg:py-14">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FCF9F3] to-white"></div>
        <div className="absolute top-1/4 -left-24 w-72 h-72 bg-[#E8DBC5] rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-24 w-80 h-80 bg-[#D4C1A6] rounded-full opacity-15 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <div
            className={`relative transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
          >
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <div
                className="aspect-[4/4] sm:aspect-[4/3] bg-cover bg-center"
                style={{ backgroundImage: "url('/assets/p.jpg')" }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
                <div className="inline-flex items-center px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full mb-2">
                  <div className="w-2 h-2 bg-[#8B6A3E] rounded-full mr-2"></div>
                  <span className="text-xs font-medium">Trusted Service</span>
                </div>
                <p className="text-sm sm:text-base font-light">
                  Guiding Families with Compassion
                </p>
              </div>
            </div>

            <div className="absolute -top-3 -left-3 bg-white p-3 rounded-lg shadow border border-[#E8DBC5]">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#F8F4EC] flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-[#8B6A3E]"
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
                  <p className="text-sm font-light text-[#3A2A1F]">24/7</p>
                  <p className="text-[11px] text-[#6E4B3A]">Support</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-3 -right-3 bg-[#8B6A3E] p-3 rounded-lg shadow">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
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
                  <p className="text-sm font-light text-white">500+</p>
                  <p className="text-[11px] text-white/90">Families</p>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
          >
            <div className="mb-4">
              <div className="inline-flex items-center space-x-2 mb-3">
                <div className="w-8 h-0.5 bg-[#8B6A3E]"></div>
                <span className="text-[#8B6A3E] font-medium tracking-wide uppercase text-xs">
                  Our Promise
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#3A2A1F] leading-tight">
                <span className="block">Moksha Voyage</span>
                <span className="relative inline-block">
                  Peace of Mind
                  <svg
                    className="absolute -bottom-1 left-0 w-full h-2 text-[#E8DBC5]/70"
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

            <p className="text-[#6E4B3A] text-sm sm:text-base leading-relaxed font-light mb-5">
              At{" "}
              <span className="font-medium text-[#8B6A3E]">Moksha Voyage</span>,
              we guide families through life's most profound transitions with
              compassion and cultural sensitivity, ensuring every ritual is
              handled with dignity and respect.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg border border-[#E8DBC5]">
                <div className="w-5 h-5 rounded-full bg-[#8B6A3E]/10 flex items-center justify-center mt-0.5">
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
                <p className="text-[#5A4030] text-sm">
                  Complete ritual guidance and arrangements
                </p>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg border border-[#E8DBC5]">
                <div className="w-5 h-5 rounded-full bg-[#8B6A3E]/10 flex items-center justify-center mt-0.5">
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
                <p className="text-[#5A4030] text-sm">
                  Transparent and compassionate support
                </p>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg border border-[#E8DBC5]">
                <div className="w-5 h-5 rounded-full bg-[#8B6A3E]/10 flex items-center justify-center mt-0.5">
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
                <p className="text-[#5A4030] text-sm">
                  Respect for all traditions
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-6 py-2.5 bg-[#8B6A3E] text-white rounded-md text-sm font-medium">
                Our Services
              </button>
              <button className="px-6 py-2.5 border border-[#8B6A3E] text-[#8B6A3E] rounded-md text-sm font-medium">
                Contact Us
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[#E8DBC5] pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/60 rounded-lg border border-[#E8DBC5]">
              <div className="text-xl font-light text-[#8B6A3E] mb-1">15+</div>
              <div className="text-xs text-[#6E4B3A]">Years of Service</div>
            </div>
            <div className="text-center p-4 bg-white/60 rounded-lg border border-[#E8DBC5]">
              <div className="text-xl font-light text-[#8B6A3E] mb-1">50+</div>
              <div className="text-xs text-[#6E4B3A]">Cities</div>
            </div>
            <div className="text-center p-4 bg-white/60 rounded-lg border border-[#E8DBC5]">
              <div className="text-xl font-light text-[#8B6A3E] mb-1">98%</div>
              <div className="text-xs text-[#6E4B3A]">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
