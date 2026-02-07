"use client";

import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import {
  FaHandHoldingHeart,
  FaStar,
  FaPrayingHands,
  FaLeaf,
  FaUserCircle,
} from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [hideTopBar, setHideTopBar] = useState(false);
  const [navTop, setNavTop] = useState(0);

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 20);
      if (currentScroll > 80 && currentScroll > lastScroll) {
        setHideTopBar(true);
      } else {
        setHideTopBar(false);
      }
      lastScroll = currentScroll;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const bar = document.getElementById("topbar");
    if (!bar) return;

    if (hideTopBar) {
      bar.style.transform = "translateY(-100%)";
    } else {
      bar.style.transform = "translateY(0)";
    }
  }, [hideTopBar]);

  useEffect(() => {
    const updateNavPosition = () => {
      const bar = document.getElementById("topbar");
      if (!bar) return;
      const height = bar.offsetHeight;
      setNavTop(hideTopBar ? 0 : height);
    };

    updateNavPosition();
    window.addEventListener("resize", updateNavPosition);
    return () => window.removeEventListener("resize", updateNavPosition);
  }, [hideTopBar]);

  const navItems = [
    { name: "Home", href: "#home", icon: <FaHandHoldingHeart /> },
    { name: "Services", href: "#services", icon: <FaStar /> },
    { name: "About", href: "#about", icon: <FaPrayingHands /> },
    { name: "Resources", href: "#resources", icon: <FaLeaf /> },
    { name: "Contact", href: "#contact", icon: <FaUserCircle /> },
  ];

  return (
    <>
      <nav
        style={{ top: navTop }}
        className={`fixed left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-lg shadow-sm py-2"
            : "bg-white py-2"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full overflow-hidden">
              <img
                src="/assets/logoreal.jpeg"
                alt="Moksha Voyage Logo"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setActiveLink(item.name.toLowerCase())}
                  className={`px-4 py-2 transition-colors duration-200 ${
                    activeLink === item.name.toLowerCase()
                      ? "text-[#8B6A3E]"
                      : "text-[#5A4030] hover:text-[#8B6A3E]"
                  }`}
                >
                  <span className="font-medium">{item.name}</span>
                </a>
              ))}
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-[#4A2F2A]"
            >
              {open ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden bg-white shadow-lg">
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    setOpen(false);
                    setActiveLink(item.name.toLowerCase());
                  }}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-[#5A4030] hover:bg-gray-50"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="h-[110px] md:h-[95px]"></div>
    </>
  );
}
