"use client";
import { FaPhoneAlt, FaEnvelope, FaCalendarAlt } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function SacredJourney() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const circleStyles = [
    { width: "28px", height: "28px", left: "10%", top: "20%" },
    { width: "36px", height: "26px", left: "30%", top: "70%" },
    { width: "22px", height: "36px", left: "50%", top: "30%" },
    { width: "36px", height: "26px", left: "70%", top: "50%" },
    { width: "24px", height: "36px", left: "85%", top: "10%" },
  ];

  return (
    <section className="w-full relative py-7 md:py-8 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FCF9F3] via-[#F8F4EC] to-[#F5F1E9]"></div>

        {circleStyles.map((style, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#8B6A3E]/10"
            style={style}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <div
          className={`text-center mb-8 transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          <span className="text-[#8B6A3E] tracking-widest uppercase text-[11px] font-medium">
            Sacred Support
          </span>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-[#3A2A1F] leading-snug mt-2 mb-2">
            You Are Not Alone On This Journey
          </h2>

          <p className="text-xs sm:text-sm text-[#6E4B3A]/90 max-w-xl mx-auto font-light leading-relaxed">
            Our compassionate team stands beside you and supports you at every
            step.
          </p>
        </div>

        <div
          className={`transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-[#8B6A3E] text-white text-sm hover:bg-[#7A5A2E] transition">
              <FaPhoneAlt className="text-xs" />
              Call Now
            </button>

            <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-[#5C4033] text-white text-sm hover:opacity-90 transition">
              <FaEnvelope className="text-xs" />
              Message Us
            </button>

            <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-[#4A716C] text-white text-sm hover:opacity-90 transition">
              <FaCalendarAlt className="text-xs" />
              Schedule
            </button>
          </div>

          <div className="text-center mt-6">
            <p className="text-[12px] text-[#6E4B3A] font-light">
              24×7 Support • Compassionate Guidance • Cultural Sensitivity
            </p>
          </div>
        </div>

        <div
          className={`text-center mt-8 transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          <p className="text-sm sm:text-base font-light italic text-[#5A4030] px-4 max-w-lg mx-auto">
            "Compassionate support makes difficult moments easier."
          </p>
        </div>
      </div>
    </section>
  );
}
