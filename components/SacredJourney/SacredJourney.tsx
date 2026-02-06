"use client";
import { FaPhoneAlt, FaEnvelope, FaCalendarAlt } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function SacredJourney() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const circleStyles = [
    { width: "45px", height: "45px", left: "10%", top: "20%" },
    { width: "60px", height: "35px", left: "30%", top: "70%" },
    { width: "35px", height: "55px", left: "50%", top: "30%" },
    { width: "55px", height: "40px", left: "70%", top: "50%" },
    { width: "40px", height: "60px", left: "85%", top: "10%" },
    { width: "50px", height: "50px", left: "5%", top: "60%" },
    { width: "65px", height: "35px", left: "25%", top: "15%" },
    { width: "35px", height: "65px", left: "65%", top: "75%" },
    { width: "55px", height: "45px", left: "40%", top: "85%" },
    { width: "45px", height: "55px", left: "90%", top: "40%" },
    { width: "60px", height: "40px", left: "15%", top: "90%" },
    { width: "40px", height: "60px", left: "75%", top: "25%" },
    { width: "50px", height: "50px", left: "55%", top: "65%" },
    { width: "30px", height: "70px", left: "95%", top: "80%" },
    { width: "70px", height: "30px", left: "20%", top: "45%" },
  ];

  return (
    <section className="w-full relative py-4 md:py-10 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FCF9F3] via-[#F8F4EC] to-[#F5F1E9]"></div>

        {circleStyles.map((style, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#8B6A3E]/10"
            style={style}
          />
        ))}

        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="circlePattern"
                x="0"
                y="0"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="50" cy="50" r="2" fill="#8B6A3E" />
                <circle cx="25" cy="25" r="1.5" fill="#8B6A3E" />
                <circle cx="75" cy="75" r="1.5" fill="#8B6A3E" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circlePattern)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#8B6A3E] to-transparent"></div>
            <span className="text-[#8B6A3E] font-medium tracking-widest uppercase text-sm">
              Sacred Support
            </span>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#8B6A3E] to-transparent"></div>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-[#3A2A1F] leading-tight mb-6">
            <span className="block">You Are Not Alone</span>
            <span className="block">On This Sacred Journey</span>
          </h2>

          <p className="text-xl md:text-2xl text-[#6E4B3A]/90 max-w-3xl mx-auto font-light leading-relaxed">
            Our compassionate team stands beside you, providing guidance and
            support through every step of this profound journey.
          </p>
        </div>

        <div className={`relative ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-white/90 to-[#F8F4EC]/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-[#E8DBC5] shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-64 h-64 bg-[#8B6A3E] rounded-full -translate-x-32 -translate-y-32"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#8B6A3E] rounded-full translate-x-32 translate-y-32"></div>
              </div>

              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-light text-[#3A2A1F] text-center mb-10">
                  Reach Out for Compassionate Guidance
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#8B6A3E] to-[#A88B5E] p-1">
                    <div className="relative bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
                        <FaPhoneAlt className="text-2xl text-white" />
                      </div>
                      <p className="text-white text-lg font-medium mb-2">
                        Call Now
                      </p>
                      <p className="text-white/80 text-sm">Immediate Support</p>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#5C4033] to-[#7A5B46] p-1">
                    <div className="relative bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
                        <FaEnvelope className="text-2xl text-white" />
                      </div>
                      <p className="text-white text-lg font-medium mb-2">
                        Message Us
                      </p>
                      <p className="text-white/80 text-sm">
                        Private Consultation
                      </p>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#4A716C] to-[#5E8B83] p-1">
                    <div className="relative bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
                        <FaCalendarAlt className="text-2xl text-white" />
                      </div>
                      <p className="text-white text-lg font-medium mb-2">
                        Schedule Call
                      </p>
                      <p className="text-white/80 text-sm">Plan Ahead</p>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-10 pt-8 border-t border-[#E8DBC5]">
                  <p className="text-[#6E4B3A] text-lg font-light">
                    <span className="font-medium text-[#8B6A3E]">
                      24×7 Support
                    </span>{" "}
                    •<span className="mx-4">Compassionate Guidance</span> •
                    <span className="mx-4">Cultural Sensitivity</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`text-center mt-16 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="inline-block max-w-2xl">
            <div className="relative">
              <svg
                className="absolute -top-4 -left-4 w-8 h-8 text-[#8B6A3E]/20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-2xl md:text-3xl font-light italic text-[#5A4030] px-8">
                "In moments of profound transition, compassionate support makes
                all the difference."
              </p>
              <svg
                className="absolute -bottom-4 -right-4 w-8 h-8 text-[#8B6A3E]/20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21.947 19.481c-1.378-2.427-3.485-4.506-6.186-6.157.828-1.625 1.294-3.228 1.294-4.824 0-3.038-2.461-5.5-5.5-5.5s-5.5 2.462-5.5 5.5c0 3.038 2.461 5.5 5.5 5.5.728 0 1.423-.143 2.06-.401.288.579.607 1.125.954 1.632-1.218.882-2.27 2.014-3.014 3.36-1.158 2.103-1.5 4.234-1.5 5.91h14c0-1.676-.342-3.807-1.5-5.91z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
