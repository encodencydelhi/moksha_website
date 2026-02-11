"use client";
import { useState, useEffect } from "react";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";
import Link from "next/link";

import {
  FaHandHoldingHeart,
  FaStar,
  FaPrayingHands,
  FaLeaf,
  FaUserCircle,
  FaBookOpen,
  FaLaptopCode,
  FaHistory,
  FaHeart,
  FaMedal,
  FaTools,
} from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [hideTopBar, setHideTopBar] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openDropdown &&
        !(event.target as Element).closest(".dropdown-container")
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  const navItems = [
    { name: "Home", href: "/", icon: <FaHandHoldingHeart /> },
    { name: "About", href: "/about", icon: <FaPrayingHands /> },
    {
      name: "Services",
      href: "#services",
      icon: <FaStar />,
      dropdown: [
        {
          name: "Spiritual Guidance",
          href: "#spiritual",
          icon: <FaPrayingHands />,
        },
        { name: "Yoga & Meditation", href: "#yoga", icon: <FaLeaf /> },
        { name: "Ayurvedic Treatments", href: "#ayurveda", icon: <FaHeart /> },
        { name: "Retreat Packages", href: "#retreats", icon: <FaMedal /> },
        { name: "Custom Services", href: "#custom", icon: <FaTools /> },
      ],
    },
    {
      name: "Resources",
      href: "#resources",
      icon: <FaLeaf />,
      dropdown: [
        { name: "Blog & Articles", href: "#blog", icon: <FaBookOpen /> },
        {
          name: "Guided Meditations",
          href: "#meditations",
          icon: <FaPrayingHands />,
        },
        { name: "E-books", href: "#ebooks", icon: <FaLaptopCode /> },
        { name: "Video Library", href: "#videos", icon: <FaLeaf /> },
      ],
    },
    { name: "Blog", href: "/blog", icon: <FaBookOpen /> },
    {
      name: "Moksha Gallery",
      href: "/mokshagallery",
      icon: <FaHeart />,
      dropdown: [
        { name: "Moksha Galley", href: "/mokshagallery", icon: <FaLeaf /> },
        {
          name: "Moksha Vedio Gallery",
          href: "/mokshavediogallery",
          icon: <FaHistory />,
        },
      ],
    },
    { name: "Contact", href: "/contact", icon: <FaUserCircle /> },
  ];

  const toggleDropdown = (itemName: string) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName);
  };

  return (
    <>
      <nav
        className={`fixed ${hideTopBar ? "top-0" : "top-11"} left-0 w-full z-50 transition-all duration-50 ${
          scrolled
            ? "bg-white/95 backdrop-blur-lg shadow-sm py-0"
            : "bg-white py-0 "
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-12">
            <div className="absolute top-1 left-4 sm:left-30 z-10">
              <a href="/">
                {" "}
                <div className="w-14 h-14 sm:w-30 sm:h-30 overflow-hidden rounded-md">
                  <img
                    src="/assets/logoreal.jpeg"
                    alt="Moksha Voyage Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </a>
            </div>

            <div className="hidden lg:flex items-center space-x-0 dropdown-container ml-auto h-full">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative group flex items-center h-full"
                >
                  {item.dropdown ? (
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className={`px-4 py-2 transition-colors duration-200 flex items-center gap-1 h-full ${
                        activeLink === item.name.toLowerCase()
                          ? "text-[#8B6A3E]"
                          : "text-[#5A4030] hover:text-[#8B6A3E]"
                      }`}
                    >
                      <span className="font-medium">{item.name}</span>
                      <HiChevronDown
                        className={`transition-transform duration-200 ${openDropdown === item.name ? "rotate-180" : ""}`}
                      />
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => {
                        setActiveLink(item.name.toLowerCase());
                        setOpenDropdown(null);
                      }}
                      className={`px-4 py-2 transition-colors duration-200 flex items-center gap-1 h-full ${
                        activeLink === item.name.toLowerCase()
                          ? "text-[#8B6A3E]"
                          : "text-[#5A4030] hover:text-[#8B6A3E]"
                      }`}
                    >
                      <span className="font-medium">{item.name}</span>
                    </a>
                  )}

                  {item.dropdown && (
                    <div
                      className={`absolute left-0 top-[100%] w-52 bg-white border border-gray-200 transition-all duration-200 z-50 rounded-lg shadow-2xl ${
                        openDropdown === item.name
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      }`}
                    >
                      <div className="py-2">
                        {item.dropdown.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            onClick={() => {
                              setActiveLink(item.name.toLowerCase());
                              setOpenDropdown(null);
                            }}
                            className="flex items-center space-x-2 px-1 py-1.5 text-[#5A4030] hover:bg-gray-50 transition-all duration-150 mx-2 rounded-md"
                          >
                            <span className="text-[#5A4030]/80">
                              {subItem.icon}
                            </span>
                            <span className="font-medium text-[#5A4030]">
                              {subItem.name}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-[#4A2F2A] ml-auto"
            >
              {open ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div
          className={`lg:hidden fixed left-0 ${
            hideTopBar ? "top-12" : "top-22"
          } w-full max-h-[calc(100vh-48px)] overflow-y-auto bg-white/95 backdrop-blur-xl shadow-lg z-40`}
        >
          <div className="px-3 py-3 space-y-0.5">
            {navItems.map((item) => (
              <div key={item.name} className="dropdown-container">
                {item.dropdown ? (
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-[#5A4030] hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-base">{item.icon}</span>
                      <span className="text-[15px] font-medium">
                        {item.name}
                      </span>
                    </div>
                    <HiChevronDown
                      className={`transition-transform duration-200 ${
                        openDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center space-x-2 w-full px-3 py-2 rounded-lg text-[#5A4030] hover:bg-gray-50"
                  >
                    <span className="text-base">{item.icon}</span>
                    <span className="text-[15px] font-medium">{item.name}</span>
                  </a>
                )}

                {openDropdown === item.name && item.dropdown && (
                  <div className="ml-5 mt-1 space-y-0.5 bg-white rounded-lg p-1.5 border border-gray-100">
                    {item.dropdown.map((subItem) => (
                      <a
                        key={subItem.name}
                        href={subItem.href}
                        onClick={() => {
                          setOpen(false);
                          setOpenDropdown(null);
                        }}
                        className="flex items-center space-x-2 px-3 py-1.5 rounded-md text-[#5A4030] hover:bg-gray-100 transition-all duration-150"
                      >
                        <span className="text-[#5A4030]/70">
                          {subItem.icon}
                        </span>
                        <span className="text-[14px] font-medium">
                          {subItem.name}
                        </span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="h-12 lg:h-14"></div>
    </>
  );
}
