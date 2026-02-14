"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface VendorUser {
  name: string;
  email: string;
  role: "vendor";
  category: "ambulance" | "pandit";
}

interface AuthContextType {
  user: VendorUser | null;
  role: string | null;
  vendorCategory: string | null;
  isLoading: boolean;
  login: (data: VendorUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const USERS = {
  pandit: {
    name: "Pandit Ji",
    email: "pandit@service.com",
    role: "vendor" as const,
    category: "pandit" as const,
  },
  ambulance: {
    name: "Ambulance Partner",
    email: "ambulance@service.com",
    role: "vendor" as const,
    category: "ambulance" as const,
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<VendorUser | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [vendorCategory, setVendorCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /* load from localStorage */
  useEffect(() => {
    const u = localStorage.getItem("user");
    const r = localStorage.getItem("role");
    const c = localStorage.getItem("category");

    if (u && r) {
      setUser(JSON.parse(u));
      setRole(r);
      setVendorCategory(c);
    }

    setIsLoading(false);
  }, []);

  const login = (data: VendorUser) => {
    setUser(data);
    setRole("vendor");
    setVendorCategory(data.category);

    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("role", "vendor");
    localStorage.setItem("category", data.category);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setVendorCategory(null);

    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("category");
  };

  return (
    <AuthContext.Provider
      value={{ user, role, vendorCategory, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)!;
