"use client";

import { useState, useEffect } from "react";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";
import {
  FaHandHoldingHeart,
  FaStar,
  FaPrayingHands,
  FaLeaf,
  FaUserCircle,
  FaHome,
  FaTachometerAlt,
  FaHandsHelping,
  FaBookOpen,
  FaLaptopCode,
  FaUsers,
  FaHistory,
  FaHeart,
  FaMedal,
  FaTools,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
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
    {
      name: "Home",
      href: "#home",
      icon: <FaHandHoldingHeart />,
      dropdown: [
        { name: "Main Home", href: "#home", icon: <FaHome /> },
        { name: "Dashboard", href: "#dashboard", icon: <FaTachometerAlt /> },
        { name: "Welcome Section", href: "#welcome", icon: <FaHandsHelping /> },
      ],
    },
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
      name: "About",
      href: "#about",
      icon: <FaPrayingHands />,
      dropdown: [
        { name: "Our Story", href: "#story", icon: <FaHistory /> },
        { name: "Mission & Vision", href: "#mission", icon: <FaStar /> },
        { name: "Our Team", href: "#team", icon: <FaUsers /> },
        { name: "Testimonials", href: "#testimonials", icon: <FaBookOpen /> },
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
    {
      name: "Contact",
      href: "#contact",
      icon: <FaUserCircle />,
      dropdown: [
        { name: "Get in Touch", href: "#contact", icon: <FaPhoneAlt /> },
        {
          name: "Email Us",
          href: "mailto:info@example.com",
          icon: <FaEnvelope />,
        },
        { name: "Visit Center", href: "#location", icon: <FaMapMarkerAlt /> },
        {
          name: "Book Consultation",
          href: "#consultation",
          icon: <FaHandHoldingHeart />,
        },
      ],
    },
  ];

  const toggleDropdown = (itemName: string) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName);
  };

  return (
    <>
      <nav
        className={`fixed ${
          hideTopBar ? "top-0" : "top-8"
        } left-0 w-full z-50 transition-all duration-50 ${
          scrolled
            ? "bg-white/95 backdrop-blur-lg shadow-sm py-0"
            : "bg-white py-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="absolute left-4 sm:left-30 z-10 top-1">
              <div className="w-20 h-20 sm:w-24 sm:h-24 overflow-hidden rounded">
                <img
                  src="/assets/logoreal.jpeg"
                  alt="Moksha Voyage Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-2 dropdown-container ml-auto">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className={`px-4 py-2 transition-colors duration-200 flex items-center gap-1 ${
                      activeLink === item.name.toLowerCase()
                        ? "text-[#8B6A3E]"
                        : "text-[#5A4030] hover:text-[#8B6A3E]"
                    }`}
                  >
                    <span className="font-medium">{item.name}</span>
                    <HiChevronDown
                      className={`transition-transform duration-200 ${
                        openDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`absolute right-0 mt-2 w-64 bg-white/10 border border-white/20 transition-all duration-200 z-50 rounded-lg shadow-2xl ${
                      openDropdown === item.name
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-2"
                    }`}
                  >
                    <div className="py-2">
                      {item.dropdown.map((subItem, index) => (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          onClick={() => {
                            setActiveLink(item.name.toLowerCase());
                            setOpenDropdown(null);
                          }}
                          className="flex items-center space-x-3 px-4 py-3 text-white hover:bg-white/20 transition-all duration-150 backdrop-blur-sm hover:backdrop-blur-md mx-2 rounded-md"
                        >
                          <span className="text-white/80">{subItem.icon}</span>
                          <span className="font-medium text-white">
                            {subItem.name}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
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

        {open && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl shadow-lg">
            <div className="px-4 py-6 space-y-1">
              {navItems.map((item) => (
                <div key={item.name} className="dropdown-container">
                  <button
                    onClick={() => {
                      if (item.dropdown.length > 0) {
                        toggleDropdown(item.name);
                      } else {
                        setOpen(false);
                        setActiveLink(item.name.toLowerCase());
                      }
                    }}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-[#5A4030] hover:bg-white/50"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    {item.dropdown.length > 0 && (
                      <HiChevronDown
                        className={`transition-transform duration-200 ${
                          openDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {openDropdown === item.name && item.dropdown.length > 0 && (
                    <div className="ml-8 mt-1 space-y-1 bg-white/20 backdrop-blur-md rounded-lg p-2">
                      {item.dropdown.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          onClick={() => {
                            setOpen(false);
                            setActiveLink(item.name.toLowerCase());
                            setOpenDropdown(null);
                          }}
                          className="flex items-center space-x-3 px-4 py-2 rounded-md text-[#5A4030] hover:bg-white/40 transition-all duration-150"
                        >
                          <span className="text-[#5A4030]/70">
                            {subItem.icon}
                          </span>
                          <span className="font-medium text-sm">
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
      </nav>

      <div className="h-20"></div>
    </>
  );
}
