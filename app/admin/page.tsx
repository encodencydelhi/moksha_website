"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";
import Link from "next/link";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
    } else {
      router.push("/admin/dashboard");
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FDF8F2]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B6A3E] mx-auto mb-4"></div>
        <p className="text-[#5A4030]">Redirecting to dashboard...</p>

        {/* Admin Navigation Links */}
        <div className="mt-8 space-x-4">
          <Link
            href="/admin/inquiries"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 inline-block"
          >
            Inquiries
          </Link>
          <Link
            href="/admin/settings"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 inline-block"
          >
            Settings
          </Link>
          <Link
            href="/admin/hero"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 inline-block"
          >
            Edit Hero
          </Link>
          <Link
            href="/admin/navbar"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 inline-block"
          >
            Edit Navbar
          </Link>
        </div>
      </div>
    </div>
  );
}
