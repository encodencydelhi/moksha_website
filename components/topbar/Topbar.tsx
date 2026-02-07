"use client";

import { Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function TopInfoBar() {
  return (
    <div
      id="topbar"
      className="fixed top-0 left-0 w-full bg-[#2A1A0F] text-white z-[60] border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-1.5 md:py-2 flex flex-col md:flex-row items-center justify-between gap-1.5 md:gap-0">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4">
          <div className="flex items-center gap-1.5 group">
            <Mail size={13} className="text-[#D4B996]" />
            <a
              href="mailto:info@namogange.org"
              className="text-xs text-white/90 hover:text-white transition-colors"
            >
              info@mokshayatra.org
            </a>
          </div>
          <div className="flex items-center gap-1.5 group">
            <Phone size={13} className="text-[#D4B996]" />
            <a
              href="tel:+919654900525"
              className="text-xs text-white/90 hover:text-white transition-colors"
            >
              +91 96549 00525
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center md:justify-end gap-3 md:gap-4">
          <Link
            href="/login"
            className="text-xs bg-[#8B6A3E] hover:bg-[#755735] text-white px-2.5 py-1 rounded transition-colors"
          >
            Customer Login
          </Link>

          <div className="hidden md:block w-px h-3 bg-white/20"></div>

          <Link
            href="/login"
            className="text-xs bg-[#8B6A3E] hover:bg-[#755735] text-white px-2.5 py-1 rounded transition-colors"
          >
            Vendor Login
          </Link>
        </div>
      </div>
    </div>
  );
}
