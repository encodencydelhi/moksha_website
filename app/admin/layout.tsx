"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getToken, getAdminData, logoutAdmin, removeToken } from "@/lib/auth";
import {
  FiHome,
  FiFileText,
  FiImage,
  FiBox,
  FiLayers,
  FiSettings,
  FiBarChart2,
  FiActivity,
  FiCreditCard,
  FiUsers,
  FiMenu,
  FiX,
  FiLogOut,
  FiChevronDown,
  FiHelpCircle,
  FiExternalLink,
} from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  submenu?: { label: string; href: string }[];
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminData, setAdminData] = useState<any>(null);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // First useEffect: Only run once on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Second useEffect: Check auth only after component is mounted (client-side only)
  useEffect(() => {
    if (!mounted) return; // Wait for component to mount

    const checkAuth = async () => {
      try {
        const token = getToken();
        const admin = getAdminData();

        if (!token || !admin) {
          // Clear any invalid data and redirect
          removeToken();
          router.push("/login");
          return;
        }

        setAdminData(admin);
        setIsAuthenticated(true);
        setLoading(false);
      } catch (error) {
        console.error("Auth check error:", error);
        removeToken();
        router.push("/login");
      }
    };

    checkAuth();
  }, [mounted, router]);

  // Show loading spinner while checking auth
  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#8B6A3E] to-[#3A2A1F] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E8DBC5] mx-auto mb-4"></div>
          <p className="text-[#E8DBC5]">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, don't render anything (router will redirect)
  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/login");
  };

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      icon: <FiHome className="w-5 h-5" />,
      href: "/admin",
    },
    {
      label: "Blog",
      icon: <FiFileText className="w-5 h-5" />,
      href: "/admin/blog",
      submenu: [
        { label: "All Posts", href: "/admin/blog" },
        { label: "Create Post", href: "/admin/blog/create" },
        { label: "Categories", href: "/admin/blog/categories" },
      ],
    },
    {
      label: "Gallery",
      icon: <FiImage className="w-5 h-5" />,
      href: "/admin/gallery",
      submenu: [
        { label: "All Images", href: "/admin/gallery" },
        { label: "Upload", href: "/admin/gallery/upload" },
        { label: "Videos", href: "/admin/gallery/videos" },
      ],
    },
    {
      label: "Services",
      icon: <FiBox className="w-5 h-5" />,
      href: "/admin/services",
      submenu: [
        { label: "All Services", href: "/admin/services" },
        { label: "Create Service", href: "/admin/services/create" },
        { label: "Categories", href: "/admin/services/categories" },
      ],
    },
    {
      label: "Categories",
      icon: <FiLayers className="w-5 h-5" />,
      href: "/admin/categories",
    },
    {
      label: "FAQ",
      icon: <FiHelpCircle className="w-5 h-5" />,
      href: "/admin/faq",
    },
    {
      label: "Website Content",
      icon: <FiFileText className="w-5 h-5" />,
      href: "/admin/content",
      submenu: [
        { label: "Navbar", href: "/admin/content/navbar" },
        { label: "Footer", href: "/admin/content/footer" },
        { label: "Hero Section", href: "/admin/content/hero" },
        { label: "About Page", href: "/admin/content/about" },
        { label: "Contact Page", href: "/admin/content/contact" },
        { label: "Our Mission", href: "/admin/content/compassion" },
        { label: "How We Help", href: "/admin/content/how-we-help" },
        { label: "Serving Section", href: "/admin/content/serving" },
        { label: "Sacred Journey", href: "/admin/content/sacred-journey" },
        { label: "Mantra / Shlok", href: "/admin/content/mantra" },
      ],
    },
    {
      label: "Settings",
      icon: <FiSettings className="w-5 h-5" />,
      href: "/admin/settings",
      submenu: [
        { label: "General", href: "/admin/settings/general" },
        { label: "Razorpay Keys", href: "/admin/settings/razorpay" },
        { label: "Email Settings", href: "/admin/settings/email" },
        { label: "Social Links", href: "/admin/settings/social" },
      ],
    },
    {
      label: "Analytics",
      icon: <FiBarChart2 className="w-5 h-5" />,
      href: "/admin/analytics",
    },
    {
      label: "Activity Log",
      icon: <FiActivity className="w-5 h-5" />,
      href: "/admin/activity-log",
    },
    {
      label: "Payments",
      icon: <FiCreditCard className="w-5 h-5" />,
      href: "/admin/payments",
    },
    {
      label: "Users",
      icon: <FiUsers className="w-5 h-5" />,
      href: "/admin/users",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#8B6A3E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#5A3E2B]">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-[#FDF8F2]">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-20"
          } bg-[#2C1810] text-white transition-all duration-300 overflow-y-auto fixed left-0 top-0 h-full z-40 md:relative`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[#5A3E2B]">
          <h1 className="text-xl font-bold text-[#F5E9D9]">
            {sidebarOpen ? "Moksha" : "M"}
          </h1>
          <p className="text-xs text-[#8B6A3E]">
            {sidebarOpen ? "CMS Admin" : ""}
          </p>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <div key={item.href}>
              <button
                onClick={() => {
                  if (item.submenu) {
                    setExpandedMenu(
                      expandedMenu === item.href ? null : item.href,
                    );
                  } else {
                    router.push(item.href);
                  }
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-[#5A3E2B] transition-colors text-[#F5E9D9] group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#8B6A3E] group-hover:text-[#F5E9D9]">
                    {item.icon}
                  </span>
                  {sidebarOpen && <span className="text-sm">{item.label}</span>}
                </div>
                {sidebarOpen && item.submenu && (
                  <FiChevronDown
                    className={`w-4 h-4 transition-transform ${expandedMenu === item.href ? "rotate-180" : ""
                      }`}
                  />
                )}
              </button>

              {/* Submenu */}
              {sidebarOpen && item.submenu && expandedMenu === item.href && (
                <div className="ml-4 mt-2 space-y-1 border-l border-[#5A3E2B]">
                  {item.submenu.map((subitem) => (
                    <Link
                      key={subitem.href}
                      href={subitem.href}
                      className="block px-4 py-2 text-xs text-[#8B6A3E] hover:text-[#F5E9D9] hover:bg-[#5A3E2B] rounded transition-colors"
                    >
                      {subitem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Admin Footer Info */}

      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-[#E7D5C2] px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden md:block p-2 hover:bg-[#F5E9D9] rounded-lg transition-colors text-[#5A3E2B]"
            >
              {sidebarOpen ? (
                <FiX className="w-5 h-5" />
              ) : (
                <FiMenu className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-[#F5E9D9] rounded-lg transition-colors text-[#5A3E2B]"
            >
              {mobileMenuOpen ? (
                <FiX className="w-5 h-5" />
              ) : (
                <FiMenu className="w-5 h-5" />
              )}
            </button>

            <h2 className="text-xl font-semibold text-[#2C1810]">
              Moksha CMS Admin
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/"
              target="_blank"
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 border border-[#8B6A3E]/30 rounded-lg text-xs font-medium text-[#8B6A3E] hover:bg-[#8B6A3E]/5 transition-all"
            >
              <FiExternalLink size={14} />
              View Site
            </Link>

            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-3 p-1.5 hover:bg-[#F5E9D9] rounded-xl transition-all border border-transparent hover:border-[#8B6A3E]/20"
              >
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-bold text-[#2C1810]">
                    {adminData?.name || "Admin"}
                  </p>
                  <p className="text-[10px] text-[#8B6A3E] uppercase tracking-wider font-semibold">
                    {adminData?.role || "Administrator"}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B6A3E] to-[#5A3E2B] flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white">
                  {(adminData?.name || "A").charAt(0).toUpperCase()}
                </div>
                <FiChevronDown className={`w-4 h-4 text-[#8B6A3E] transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {userDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setUserDropdownOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E7D5C2] rounded-xl shadow-xl z-20 overflow-hidden py-1">
                    <div className="px-4 py-3 border-b border-gray-50 md:hidden">
                      <p className="text-sm font-bold text-gray-800">{adminData?.name}</p>
                      <p className="text-xs text-gray-500">{adminData?.email}</p>
                    </div>
                    <Link
                      href="/admin/settings/general"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#5A3E2B] hover:bg-[#F5E9D9] transition-colors"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <FiSettings className="w-4 h-4" />
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-50 mt-1"
                    >
                      <FiLogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-[#E7D5C2] p-4 z-40">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 text-sm text-[#5A3E2B] hover:bg-[#F5E9D9] rounded transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-auto">{children}</main>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
}
