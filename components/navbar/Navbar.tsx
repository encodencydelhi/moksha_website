"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  HiMenu,
  HiX,
  HiPhone,
  HiOutlineUserCircle,
  HiOutlineCalendar,
} from "react-icons/hi";
import {
  FaHandHoldingHeart,
  FaPrayingHands,
  FaLeaf,
  FaStar,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dateString = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const navItems = [
    { name: "Home", href: "#home", icon: <FaHandHoldingHeart /> },
    { name: "Services", href: "#services", icon: <FaStar /> },
    { name: "About", href: "#about", icon: <FaPrayingHands /> },
    { name: "Resources", href: "#resources", icon: <FaLeaf /> },
    { name: "Contact", href: "#contact", icon: <HiOutlineUserCircle /> },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-[#E8DBC5]/30 py-1"
            : "bg-gradient-to-b from-white/90 via-white/80 to-transparent py-1"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#8B6A3E] to-[#A88B5E] rounded-full blur opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src="/assets/logoreal.jpeg"
                    alt="Moksha Voyage Logo"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
            </motion.div>

            <div className="hidden lg:flex items-center space-x-8">
              <div className="flex items-center space-x-1 bg-white/50 backdrop-blur-sm rounded-full px-6 py-2 border border-[#E8DBC5] shadow-sm">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setActiveLink(item.name.toLowerCase())}
                    className={`flex items-center space-x-2 px-4 py-1 rounded-full transition-all duration-300 ${
                      activeLink === item.name.toLowerCase()
                        ? "bg-gradient-to-br from-[#8B6A3E] to-[#A88B5E] text-white shadow-md"
                        : "text-[#6E4B3A] hover:text-[#8B6A3E] hover:bg-[#F8F4EC]"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </a>
                ))}
              </div>

              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-full px-5 py-3 border border-[#E8DBC5] shadow-sm">
                <HiOutlineCalendar className="w-5 h-5 text-[#8B6A3E]" />
                <span className="text-sm font-medium text-[#5A4030]">
                  {dateString}
                </span>
              </div>
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#F8F4EC] to-white border border-[#E8DBC5] flex items-center justify-center text-[#4A2F2A] shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
            >
              {open ? (
                <HiX className="w-6 h-6" />
              ) : (
                <>
                  <HiMenu className="w-6 h-6" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#8B6A3E] rounded-full"></div>
                </>
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden bg-gradient-to-b from-white to-[#F8F4EC] border-t border-[#E8DBC5] shadow-xl"
            >
              <div className="px-4 sm:px-6 py-6">
                <div className="space-y-3 mb-8">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => {
                        setOpen(false);
                        setActiveLink(item.name.toLowerCase());
                      }}
                      className={`flex items-center space-x-4 px-4 py-4 rounded-xl transition-all duration-300 ${
                        activeLink === item.name.toLowerCase()
                          ? "bg-gradient-to-br from-[#8B6A3E] to-[#A88B5E] text-white shadow-md"
                          : "bg-white/80 border border-[#E8DBC5] text-[#6E4B3A] hover:bg-[#F8F4EC]"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F8F4EC] to-white flex items-center justify-center">
                        <span
                          className={`text-xl ${activeLink === item.name.toLowerCase() ? "text-white" : "text-[#8B6A3E]"}`}
                        >
                          {item.icon}
                        </span>
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </motion.a>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-[#E8DBC5] shadow-sm"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-[#8B6A3E]/10 flex items-center justify-center">
                        <HiOutlineCalendar className="w-5 h-5 text-[#8B6A3E]" />
                      </div>
                      <div>
                        <div className="text-xs text-[#6E4B3A]">
                          Today's Date
                        </div>
                        <div className="text-sm font-medium text-[#5A4030]">
                          {dateString}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div className="fixed top-0 left-0 right-0 z-40 h-1">
        <motion.div
          className="h-full bg-gradient-to-r from-[#8B6A3E] to-[#A88B5E]"
          style={{
            width: `${scrolled ? Math.min((window.scrollY / 500) * 100, 100) : 0}%`,
          }}
        />
      </div>

      <div className="h-20 md:h-18"></div>
    </>
  );
}
