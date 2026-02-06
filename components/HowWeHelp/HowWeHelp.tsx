"use client";

import { useState, ReactElement } from "react";
import { motion } from "framer-motion";

interface CustomIconProps {
  name: string;
  className?: string;
}

const CustomIcon = ({ name, className = "w-6 h-6" }: CustomIconProps) => {
  const icons: Record<string, ReactElement> = {
    FaFireAlt: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
      </svg>
    ),
    FaGlobeAsia: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    ),
    FaPrayingHands: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.89 14.75c-.29-.29-.76-.29-1.06 0-.29.29-.29.77 0 1.06l3 3c.29.29.77.29 1.06 0 .29-.29.29-.77 0-1.06l-3-3zM12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z" />
      </svg>
    ),
    FaVideo: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
      </svg>
    ),
    FaArrowRight: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
      </svg>
    ),
    FaHandHoldingHeart: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 3c-2.76 0-5 2.24-5 5 0 1.06.39 2.32 1 3.62V21l6-4 6 4V11.62c.61-1.3 1-2.56 1-3.62 0-2.76-2.24-5-5-5zm0 2c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3z" />
      </svg>
    ),
    FaUsers: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
    FaClock: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
      </svg>
    ),
    FaStar: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ),
  };

  return icons[name] || <div className={className}>●</div>;
};

// Type definitions for card and stat items
interface CardItem {
  icon: string;
  title: string;
  desc: string;
  color: string;
  features: string[];
}

interface StatItem {
  icon: string;
  value: string;
  label: string;
}

export default function HowWeCanHelp() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const cards: CardItem[] = [
    {
      icon: "FaFireAlt",
      title: "Cremation & Last Rites",
      desc: "Respectful arrangements, traditional or electric cremation, and last rites as per custom and tradition.",
      color: "from-[#8B6A3E] to-[#A88B5E]",
      features: ["Traditional & Electric", "Complete Rituals", "24/7 Support"],
    },
    {
      icon: "FaGlobeAsia",
      title: "International Repatriation",
      desc: "Door-to-door body repatriation to/from India with complete legal and practical coordination.",
      color: "from-[#5C4033] to-[#7A5B46]",
      features: ["Global Network", "Legal Support", "Door-to-Door"],
    },
    {
      icon: "FaPrayingHands",
      title: "Rituals, Shraddh & Pooja",
      desc: "Asthi Visarjan, Tehrvi, Pind Daan, and all Shraddh rituals performed online or in person.",
      color: "from-[#4A716C] to-[#5E8B83]",
      features: ["Online/In-person", "Vedic Priests", "Complete Package"],
    },
    {
      icon: "FaVideo",
      title: "Online Streaming & Tributes",
      desc: "Virtual presence through live streaming, digital tributes, and memorial pages for loved ones.",
      color: "from-[#6B7D6E] to-[#8A9B8C]",
      features: ["Live Streaming", "Digital Memorials", "Global Access"],
    },
  ];

  const stats: StatItem[] = [
    { icon: "FaClock", value: "24/7", label: "Available Support" },
    { icon: "FaUsers", value: "500+", label: "Families Served" },
    {
      icon: "FaHandHoldingHeart",
      value: "100%",
      label: "Compassionate Care",
    },
    { icon: "FaStar", value: "15+", label: "Years Experience" },
  ];

  return (
    <section className="w-full relative py-20 md:py-10 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FCF9F3] via-white to-[#F8F4EC]"></div>

        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float-slow"
            style={{
              width: Math.random() * 100 + 50 + "px",
              height: Math.random() * 100 + 50 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              background: `radial-gradient(circle at 30% 30%, ${
                ["#E8DBC5", "#D4C1A6", "#8B6A3E"][i % 3]
              }20, transparent 70%)`,
              animationDelay: Math.random() * 5 + "s",
              animationDuration: Math.random() * 20 + 20 + "s",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-4 mb-8">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#8B6A3E] to-transparent"></div>
            <span className="text-[#8B6A3E] font-medium tracking-widest uppercase text-sm">
              Our Services
            </span>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#8B6A3E] to-transparent"></div>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-[#3A2A1F] leading-tight mb-6">
            <span className="block">Comprehensive</span>
            <span className="relative inline-block">
              Compassionate Care
              <svg
                className="absolute -bottom-3 left-0 w-full h-3 text-[#E8DBC5]/70"
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

          <p className="text-xl md:text-2xl text-[#6E4B3A]/80 max-w-3xl mx-auto font-light leading-relaxed">
            We provide end-to-end support through every aspect of the
            end-of-life journey, ensuring cultural sensitivity, dignity, and
            peace of mind.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6"
        >
          {stats.map((stat, index) => (
            <div key={index} className="relative group">
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-[#E8DBC5] ">
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E8DBC5] to-[#F8F4EC] flex items-center justify-center">
                    <div className="text-[#8B6A3E]">
                      <CustomIcon name={stat.icon} className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-3xl font-light text-[#8B6A3E]">
                      {stat.value}
                    </div>
                    <div className="text-sm text-[#6E4B3A]">{stat.label}</div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#8B6A3E]/20 to-transparent -translate-x-full  transition-transform duration-700"></div>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
              className="relative group"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.color} rounded-2xl opacity-0  transition-opacity duration-500 blur-xl`}
              ></div>

              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-[#E8DBC5] h-full overflow-hidden group-hover:border-transparent transition-all duration-500 ">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0  transition-opacity duration-500`}
                ></div>

                <div className="relative mb-8">
                  <div className="relative w-20 h-20 mx-auto">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${card.color} rounded-full blur-md opacity-0  transition-opacity duration-500`}
                    ></div>
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-white to-[#F8F4EC] border-4 border-white flex items-center justify-center shadow-lg">
                      <div className="text-3xl text-[#8B6A3E]  transition-all duration-500">
                        <CustomIcon name={card.icon} className="w-8 h-8" />
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-light text-[#3A2A1F] mb-4 text-center group-hover:text-[#3A2A1F] transition-colors duration-300">
                  {card.title}
                </h3>

                <p className="text-[#6E4B3A] leading-relaxed mb-6 text-center">
                  {card.desc}
                </p>

                <div className="space-y-3 mb-8">
                  {card.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full bg-gradient-to-br ${card.color} duration-500`}
                      ></div>
                      <span className="text-sm text-[#6E4B3A] group-hover:text-[#5A4030] transition-colors duration-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button className="inline-flex items-center space-x-2 text-[#8B6A3E] group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-[#8B6A3E] group-hover:to-[#A88B5E] px-6 py-3 rounded-lg border border-[#E8DBC5] group-hover:border-transparent transition-all duration-300">
                    <span className="font-medium">Learn More</span>
                    <CustomIcon
                      name="FaArrowRight"
                      className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300"
                    />
                  </button>
                </div>

                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#E8DBC5] rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#E8DBC5] rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="relative inline-block">
            <button className="group relative px-12 py-6 bg-gradient-to-br from-[#8B6A3E] to-[#A88B5E] text-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative z-10 flex items-center space-x-4">
                <span className="text-xl font-medium">
                  Explore All Services
                </span>
                <CustomIcon
                  name="FaArrowRight"
                  className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              <div className="absolute -top-2 -left-2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-bounce"></div>
              <div
                className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="absolute -bottom-2 -left-2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-bounce"
                style={{ animationDelay: "0.4s" }}
              ></div>
              <div
                className="absolute -bottom-2 -right-2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-bounce"
                style={{ animationDelay: "0.6s" }}
              ></div>
            </button>

            <div className="absolute -top-4 -right-4 w-8 h-8 border-2 border-[#8B6A3E]/30 rounded-full animate-spin-slow"></div>
            <div className="absolute -bottom-4 -left-4 w-8 h-8 border-2 border-[#8B6A3E]/30 rounded-full animate-spin-slow-reverse"></div>
          </div>

          <p className="text-[#6E4B3A] mt-8 text-lg font-light">
            Need immediate assistance?{" "}
            <a
              href="tel:+9118001234567"
              className="text-[#8B6A3E] font-medium hover:underline"
            >
              Call our 24/7 support line
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
