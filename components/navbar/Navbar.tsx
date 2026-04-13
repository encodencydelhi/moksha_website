"use client";
import { useState, useEffect } from "react";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";
import { useRouter } from "next/navigation";
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
  FaAmbulance,
  FaShoppingBasket,
  FaPhone,
  FaCarSide,
  FaPlaceOfWorship,
  FaMagic,
} from "react-icons/fa";
import { Cinzel, Inter } from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
});

import { getNavbarComponent, getAllServices, resolveImagePath } from "@/lib/apiClient";

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [hideTopBar, setHideTopBar] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [services, setServices] = useState<any[]>([]);
  const [navItems, setNavItems] = useState<any[]>([]);
  const [branding, setBranding] = useState({
    logo: "/assets/logoreal-removebg-preview.png",
    brandName: "Moksha Voyage",
  });

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

  const getIconForName = (name: string) => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes("home")) return <FaHandHoldingHeart />;
    if (nameLower.includes("about")) return <FaPrayingHands />;
    if (nameLower.includes("service")) return <FaStar />;
    if (nameLower.includes("blog") || nameLower.includes("article")) return <FaBookOpen />;
    if (nameLower.includes("gallery")) return <FaHeart />;
    if (nameLower.includes("contact")) return <FaUserCircle />;
    if (nameLower.includes("ambulance")) return <FaAmbulance />;
    if (nameLower.includes("flower") || nameLower.includes("decoration")) return <FaMagic />;
    if (nameLower.includes("pandit")) return <FaPrayingHands />;
    if (nameLower.includes("prayer")) return <FaPlaceOfWorship />;
    if (nameLower.includes("hearse") || nameLower.includes("van")) return <FaCarSide />;
    return <FaLeaf />;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [navRes, servicesRes] = await Promise.all([
          getNavbarComponent(),
          getAllServices()
        ]);

        if (navRes.data.success && navRes.data.data) {
          const data = navRes.data.data;
          
          if (data.logo) {
            setBranding(prev => ({ ...prev, logo: data.logo }));
          }
          if (data.brandName) {
            setBranding(prev => ({ ...prev, brandName: data.brandName }));
          }

          const items = data.navItems?.map((item: any) => ({
            ...item,
            icon: getIconForName(item.name),
            dropdown: item.dropdown?.map((sub: any) => ({
              ...sub,
              icon: getIconForName(sub.name)
            })) || []
          }));
          setNavItems(items || []);
        }

        if (servicesRes.data.success) {
          setServices(servicesRes.data.data);
        }
      } catch (err) {
        console.error("Navbar data fetch failed:", err);
      }
    };
    fetchData();
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

  const handleNavigation = (path: string, name: string) => {
    setActiveLink(name.toLowerCase());
    setOpenDropdown(null);
    setOpen(false);

    if (path.startsWith("#")) {
      const element = document.getElementById(path.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      router.push(path);
    }
  };

  const toggleDropdown = (itemName: string) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName);
  };

  return (
    <>
      <nav
        className={`fixed ${hideTopBar ? "top-0" : "top-11"} left-0 w-full z-50 transition-all duration-50 ${
          scrolled
            ? "bg-white backdrop-blur-lg shadow-sm py-0"
            : "bg-white py-0 "
        } ${inter.className}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-12">
            <div className="absolute top-1 left-4 sm:left-30 z-10">
              <button onClick={() => handleNavigation("/", "home")}>
                <div className="w-14 h-14 sm:w-30 sm:h-30 overflow-hidden rounded-md bg-white">
                  <img
                    src={resolveImagePath(branding.logo)}
                    alt={branding.brandName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>
            </div>
            <div className="hidden lg:flex items-center space-x-0 dropdown-container ml-auto h-full">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative group flex items-center h-full"
                >
                  {item.dropdown && item.dropdown.length > 0 ? (
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className={`px-4 py-2 transition-colors duration-200 flex items-center gap-1 h-full ${
                        activeLink === item.name.toLowerCase()
                          ? "text-[#8B6A3E]"
                          : "text-[#5A4030] hover:text-[#8B6A3E]"
                      } ${cinzel.className}`}
                    >
                      <span className="font-medium">{item.name}</span>
                      <HiChevronDown
                        className={`transition-transform duration-200 ${openDropdown === item.name ? "rotate-180" : ""}`}
                      />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleNavigation(item.path, item.name)}
                      className={`px-4 py-2 transition-colors duration-200 flex items-center gap-1 h-full ${
                        activeLink === item.name.toLowerCase()
                          ? "text-[#8B6A3E]"
                          : "text-[#5A4030] hover:text-[#8B6A3E]"
                      } ${cinzel.className}`}
                    >
                      <span className="font-medium">{item.name}</span>
                    </button>
                  )}

                  {item.dropdown && item.dropdown.length > 0 && (
                    <div
                      className={`absolute left-0 top-[100%] w-62 bg-white border border-gray-200 transition-all duration-200 z-50 rounded-lg shadow-2xl ${
                        openDropdown === item.name
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      }`}
                    >
                      <div className="py-2">
                        {item.dropdown.map((subItem: any) => (
                          <button
                            key={subItem.name}
                            onClick={() =>
                              handleNavigation(subItem.path, subItem.name)
                            }
                            className={`flex items-center space-x-2 w-full px-4 py-2 text-[#5A4030] hover:bg-gray-50 transition-all duration-150 ${cinzel.className}`}
                          >
                            <span className="text-[#5A4030]/80 w-5">
                              {subItem.icon}
                            </span>
                            <span className="font-medium text-[#5A4030] flex-1 text-left">
                              {subItem.name}
                            </span>
                          </button>
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
          } w-full max-h-[calc(100vh-48px)] overflow-y-auto bg-white/95 backdrop-blur-xl shadow-lg z-40 ${inter.className}`}
        >
          <div className="px-3 py-3 space-y-0.5">
            {navItems.map((item) => (
              <div key={item.name} className="dropdown-container">
                {item.dropdown && item.dropdown.length > 0 ? (
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-[#5A4030] hover:bg-gray-50 ${cinzel.className}`}
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
                  <button
                    onClick={() => handleNavigation(item.path, item.name)}
                    className={`flex items-center space-x-2 w-full px-3 py-2 rounded-lg text-[#5A4030] hover:bg-gray-50 ${cinzel.className}`}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span className="text-[15px] font-medium">{item.name}</span>
                  </button>
                )}

                {openDropdown === item.name && item.dropdown && item.dropdown.length > 0 && (
                  <div className="ml-5 mt-1 space-y-0.5 bg-white rounded-lg p-1.5 border border-gray-100">
                    {item.dropdown.map((subItem: any) => (
                      <button
                        key={subItem.name}
                        onClick={() => {
                          handleNavigation(subItem.path, subItem.name);
                          setOpen(false);
                        }}
                        className={`flex items-center space-x-2 w-full px-3 py-1.5 rounded-md text-[#5A4030] hover:bg-gray-100 transition-all duration-150 ${cinzel.className}`}
                      >
                        <span className="text-[#5A4030]/70">
                          {subItem.icon}
                        </span>
                        <span className="text-[14px] font-medium">
                          {subItem.name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="h-16 w-16"></div>
    </>
  );
}
