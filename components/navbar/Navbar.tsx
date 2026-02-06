"use client";

import { useState, useEffect } from "react";
import {
  HiMenu,
  HiX,
  HiOutlineUserCircle,
  HiOutlineCalendar,
} from "react-icons/hi";
import {
  FaHandHoldingHeart,
  FaPrayingHands,
  FaLeaf,
  FaStar,
} from "react-icons/fa";

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
        className={`fixed top-0 left-0 w-full z-50 ${
          scrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-[#E8DBC5]/30 py-1"
            : "bg-gradient-to-b from-white/90 via-white/80 to-transparent py-1"
        }`}
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-3 sm:border-4 border-white shadow-lg">
                <img
                  src="/assets/logoreal.jpeg"
                  alt="Moksha Voyage Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              <div className="flex items-center space-x-1 bg-white/50 backdrop-blur-sm rounded-full px-6 py-2 border border-[#E8DBC5] shadow-sm">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setActiveLink(item.name.toLowerCase())}
                    className={`flex items-center space-x-2 px-4 py-1 rounded-full ${
                      activeLink === item.name.toLowerCase()
                        ? "bg-gradient-to-br from-[#8B6A3E] to-[#A88B5E] text-white shadow-md"
                        : "text-[#6E4B3A]"
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

            <div className="flex items-center space-x-4">
              <div className="lg:hidden flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-3 py-2 border border-[#E8DBC5] shadow-sm">
                <HiOutlineCalendar className="w-4 h-4 text-[#8B6A3E]" />
                <span className="text-xs font-medium text-[#5A4030] hidden sm:block">
                  {dateString}
                </span>
              </div>
              <button
                onClick={() => setOpen(!open)}
                className="lg:hidden w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#F8F4EC] to-white border border-[#E8DBC5] flex items-center justify-center text-[#4A2F2A] shadow-sm"
                aria-label="Menu"
              >
                {open ? (
                  <HiX className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <HiMenu className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {open && (
          <div className="lg:hidden bg-white border-t border-[#E8DBC5] shadow-xl">
            <div className="px-3 sm:px-6 py-4">
              <div className="mb-4">
                <div className="text-sm font-medium text-[#6E4B3A] mb-2 px-1">
                  Navigation
                </div>
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => {
                        setOpen(false);
                        setActiveLink(item.name.toLowerCase());
                      }}
                      className={`flex items-center space-x-3 px-3 py-3 rounded-lg ${
                        activeLink === item.name.toLowerCase()
                          ? "bg-gradient-to-r from-[#8B6A3E] to-[#A88B5E] text-white"
                          : "text-[#5A4030] hover:bg-[#F8F4EC]"
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-medium">{item.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8DBC5]">
                <div className="text-sm font-medium text-[#6E4B3A] mb-2 px-1">
                  Today's Date
                </div>
                <div className="flex items-center space-x-3 px-3 py-2 bg-[#F8F4EC] rounded-lg">
                  <HiOutlineCalendar className="w-5 h-5 text-[#8B6A3E]" />
                  <span className="text-[#5A4030] font-medium">
                    {dateString}
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <button className="w-full py-3 bg-gradient-to-r from-[#8B6A3E] to-[#A88B5E] text-white rounded-lg font-medium">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <div className="fixed top-0 left-0 right-0 z-40 h-1">
        <div
          className="h-full bg-gradient-to-r from-[#8B6A3E] to-[#A88B5E]"
          style={{
            width: `${scrolled ? Math.min((window.scrollY / 500) * 100, 100) : 0}%`,
          }}
        />
      </div>

      <div className="h-16 sm:h-20 lg:h-18"></div>
    </>
  );
}
