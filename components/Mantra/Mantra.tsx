"use client";

import { useEffect, useState } from "react";

export default function MokshaShlokSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <section className="w-full relative overflow-hidden h-[600px] bg-[#F8F4EC]">
      {/* Background Base with subtle texture */}
      <div className="absolute inset-0 bg-[#F8F4EC]">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #8B6A3E 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-full flex items-center">
          {/* Container for both panels with blur effect in the middle */}
          <div className="w-full flex items-stretch gap-0 relative">
            {/* Center blur gradient overlay */}
            <div className="absolute left-1/2 top-0 bottom-0 w-32 -translate-x-1/2 z-20 pointer-events-none bg-gradient-to-r from-transparent via-[#F8F4EC]/60 to-transparent backdrop-blur-[1px]"></div>

            {/* Left side - Content */}
            <div
              className={`w-1/2 pr-8 transition-all duration-700 ${
                visible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
              }`}
            >
              {/* Main content with adjusted spacing for perfect fit */}
              <div className="relative">
                {/* Large decorative quote mark */}
                <div className="absolute -top-6 -left-4 text-8xl text-[#8B6A3E]/20 font-serif">
                  "
                </div>

                {/* OM Symbol with enhanced glow */}
                <div className="relative inline-block mb-3">
                  <div className="absolute inset-0 blur-xl bg-[#8B6A3E]/30 rounded-full"></div>
                  <div className="relative text-5xl text-[#8B6A3E] font-serif drop-shadow-md">
                    ॐ
                  </div>
                </div>

                {/* Title with elegant underline */}
                <div className="mb-4">
                  <h2 className="text-[#2A1A0F] text-4xl font-light tracking-wide mb-1 drop-shadow-sm">
                    Moksha
                  </h2>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-[2px] bg-[#8B6A3E]/60"></div>
                    <span className="text-[#8B6A3E] text-sm font-medium tracking-[0.25em] uppercase drop-shadow-sm">
                      Bhagavad Gītā 18.66
                    </span>
                  </div>
                </div>

                {/* Shlok with enhanced traditional styling */}
                <div className="mb-4 bg-gradient-to-r from-[#8B6A3E]/10 via-transparent to-transparent p-5 rounded-r-2xl border-l-4 border-[#8B6A3E]/50 shadow-sm">
                  <p className="text-[#3A2A1F] text-xl md:text-2xl font-bold leading-relaxed whitespace-pre-line drop-shadow-sm">
                    <span className="text-[#8B6A3E] text-3xl mr-1 drop-shadow">
                      ॥
                    </span>
                    सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।
                    {"\n"}
                    अहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः।
                    <span className="text-[#8B6A3E] text-3xl ml-1 drop-shadow">
                      ॥
                    </span>
                  </p>
                </div>

                {/* Sanskrit transliteration */}
                <div className="mb-4 text-[#4A3A2F]/80 text-sm italic font-medium">
                  <p>sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja</p>
                  <p>ahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ</p>
                </div>

                {/* Meaning with enhanced elegant styling */}
                <div className="relative mb-4 bg-[#8B6A3E]/5 p-4 rounded-lg">
                  <div className="absolute -left-2 top-0 text-3xl text-[#8B6A3E]/40">
                    ❝
                  </div>
                  <p className="text-[#2A1A0F] text-base italic font-medium leading-relaxed pl-6 pr-4 drop-shadow-sm">
                    Abandon all varieties of religion and just surrender unto
                    Me. I shall deliver you from all sinful reactions. Do not
                    fear.
                  </p>
                  <div className="absolute -right-2 bottom-0 text-3xl text-[#8B6A3E]/40">
                    ❞
                  </div>
                </div>

                {/* Decorative footer */}
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#8B6A3E]/50 to-transparent"></div>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-[#8B6A3E] rounded-full animate-pulse shadow-sm"></div>
                    <div className="w-2 h-2 bg-[#8B6A3E]/80 rounded-full"></div>
                    <div className="w-2 h-2 bg-[#8B6A3E]/60 rounded-full"></div>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#8B6A3E]/50 to-transparent"></div>
                </div>

                {/* Enhanced footer text */}
                <p className="text-center text-[#8B6A3E]/60 text-[10px] tracking-[0.4em] uppercase mt-3 font-medium">
                  Pause • Breathe • Reflect • Liberate
                </p>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="w-1/2 pl-8">
              <div
                className={`relative h-[520px] rounded-md overflow-hidden shadow-xl transition-all duration-700 ${
                  visible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4"
                }`}
              >
                <img
                  src="/assets/grahpravesh.jpg"
                  alt="Sacred"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />

                {/* Gradient overlays for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#8B6A3E]/50 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-l from-[#F8F4EC]/30 to-transparent"></div>

                {/* Decorative elements on image */}
                <div className="absolute top-6 right-6 text-6xl text-white/30 font-serif drop-shadow-lg">
                  ॐ
                </div>
                <div className="absolute bottom-6 left-6 text-white drop-shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-8 bg-[#8B6A3E] drop-shadow-lg"></div>
                    <div>
                      <p className="text-xs tracking-[0.3em] uppercase opacity-90 font-medium">
                        Divine
                      </p>
                      <p className="text-sm font-semibold">Liberation</p>
                    </div>
                  </div>
                </div>

                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#8B6A3E]/70 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
