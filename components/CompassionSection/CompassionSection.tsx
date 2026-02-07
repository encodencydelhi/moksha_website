"use client";

import { useState, useEffect } from "react";

export default function CompassionSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="w-full relative overflow-hidden h-[450px]">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-no-repeat"
            style={{
              backgroundImage: "url('/assets/chatgpt.png')",
              backgroundPosition: "right center",
              backgroundSize: "contain",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#F8F4EC] via-[#F8F4EC]/95 to-[#F8F4EC]/0"></div>

          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/0 to-transparent"></div>

          <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-5"></div>
        </div>

        <div className="absolute top-10 left-10 w-64 h-64 bg-[#E8DBC5] rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#D4C1A6] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-full flex items-center">
          <div
            className={`max-w-xl ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"} transition-all duration-700`}
          >
            <div className="inline-flex items-center space-x-2 mb-4">
              <div className="w-10 h-0.5 bg-[#8B6A3E]"></div>
              <span className="text-[#8B6A3E] font-medium tracking-wide uppercase text-xs">
                Our Mission
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-normal text-[#3A2A1F] leading-snug mb-4">
              <span className="block mb-1">Compassionate Guidance</span>
              <span className="block font-light">with Peace of Mind</span>
            </h2>

            <div className="mb-6">
              <svg
                className="w-24 h-2 text-[#E8DBC5]/80 mb-4"
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
            </div>

            <p className="text-[#6E4B3A] text-sm leading-relaxed mb-8 max-w-lg font-normal">
              At{" "}
              <span className="font-semibold text-[#8B6A3E]">
                Moksha Voyage
              </span>
              , we provide compassionate support through life's most challenging
              transitions. Our dedicated team offers cultural sensitivity,
              transparency, and deep respect for your traditions.
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <button className="px-5 py-2.5 bg-[#8B6A3E] text-white text-sm rounded-md font-medium hover:bg-[#7A5A2E] transition-colors">
                Learn More
              </button>
              <button className="px-5 py-2.5 border border-[#8B6A3E] text-[#8B6A3E] text-sm rounded-md font-medium hover:bg-[#8B6A3E]/5 transition-colors">
                Contact Our Team
              </button>
            </div>

            <div className="mt-8 flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#8B6A3E]/10 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-[#8B6A3E]"
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
                <span className="text-xs text-[#5A4030]">24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#8B6A3E]/10 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-[#8B6A3E]"
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
                <span className="text-xs text-[#5A4030]">
                  Cultural Sensitivity
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
