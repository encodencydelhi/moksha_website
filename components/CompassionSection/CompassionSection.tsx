"use client";

import { useState, useEffect } from "react";

export default function CompassionSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="w-full relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8F4EC] via-white/95 to-[#F8F4EC]/80"></div>
        <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-5"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#E8DBC5] rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D4C1A6] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div
            className={`transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
          >
            <div className="inline-flex items-center space-x-2 mb-6">
              <div className="w-12 h-0.5 bg-[#8B6A3E]"></div>
              <span className="text-[#8B6A3E] font-medium tracking-wide uppercase text-sm">
                Our Mission
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#3A2A1F] leading-tight mb-8">
              <span className="block">Compassionate</span>
              <span className="block">Guidance with</span>
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

            <p className="text-[#6E4B3A] text-lg leading-relaxed mb-10 max-w-2xl font-light">
              At{" "}
              <span className="font-medium text-[#8B6A3E]">Moksha Voyage</span>,
              we provide compassionate support through life's most challenging
              transitions. Our dedicated team manages every aspect of the
              end-of-life journey with cultural sensitivity, transparency, and
              deep respect for your traditions and emotional needs.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-[#8B6A3E]/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#8B6A3E]"></div>
                  </div>
                </div>
                <p className="text-[#5A4030]">
                  Complete management of rituals and arrangements with utmost
                  dignity
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-[#8B6A3E]/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#8B6A3E]"></div>
                  </div>
                </div>
                <p className="text-[#5A4030]">
                  24/7 compassionate support and transparent communication
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-[#8B6A3E]/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#8B6A3E]"></div>
                  </div>
                </div>
                <p className="text-[#5A4030]">
                  Cultural and religious sensitivity honoring diverse traditions
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group relative px-8 py-4 bg-[#8B6A3E] text-white rounded-lg overflow-hidden transition-all duration-300 hover:bg-[#755735] hover:shadow-2xl hover:-translate-y-1">
                <span className="relative z-10 font-medium">Learn More</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
              <button className="px-8 py-4 border border-[#8B6A3E] text-[#8B6A3E] rounded-lg transition-all duration-300 hover:bg-[#8B6A3E]/5 hover:shadow-lg font-medium">
                Contact Our Team
              </button>
            </div>
          </div>

          <div
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
          >
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div
                  className="aspect-[5/5] bg-cover bg-center object-cover"
                  style={{ backgroundImage: "url('/assets/miss.jpg')" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                      <span className="text-sm font-medium">
                        Compassionate Care
                      </span>
                    </div>
                    <p className="text-xl font-light">
                      Every detail handled with dignity and respect
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#8B6A3E]/10 rounded-2xl rotate-12"></div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 border-2 border-[#E8DBC5] rounded-2xl -rotate-6"></div>

              <div className="absolute -bottom-8 right-8 bg-white p-5 rounded-xl shadow-2xl max-w-xs border border-[#E8DBC5]">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                          backgroundImage: "url('/assets/promise.webp')",
                        }}
                      ></div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#8B6A3E] rounded-full border-2 border-white flex items-center justify-center">
                      <svg
                        className="w-2.5 h-2.5 text-white"
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

                  <div>
                    <p className="text-2xl font-light text-[#3A2A1F]">24/7</p>
                    <p className="text-sm text-[#6E4B3A]">Support Available</p>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        <svg
                          className="w-3 h-3 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                          className="w-3 h-3 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                          className="w-3 h-3 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                          className="w-3 h-3 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                          className="w-3 h-3 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <span className="text-xs text-gray-500 ml-1">5.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
