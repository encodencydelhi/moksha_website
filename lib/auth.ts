// Admin authentication utilities

import api, { authLogin, logout, getMe } from "./apiClient";

const TOKEN_KEY = "moksha_token";
const ADMIN_KEY = "moksha_admin_data";

export interface AdminData {
  id: string;
  name: string;
  email: string;
  role: "superadmin" | "admin" | "editor";
  avatar?: string;
  permissions?: {
    canManageBlog?: boolean;
    canManageGallery?: boolean;
    canManageServices?: boolean;
    canManageCategories?: boolean;
    canManageUsers?: boolean;
    canManagePayments?: boolean;
    canManageSettings?: boolean;
    canViewAnalytics?: boolean;
    canManageAdmins?: boolean;
  };
}

export interface LoginResponse {
  success: boolean;
  token: string;
  admin: AdminData;
  message?: string;
}

// Get stored token
export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

// Set token
export function setToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

// Remove token
export function removeToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_KEY);
  }
}

// Get stored admin data
export function getAdminData(): AdminData | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(ADMIN_KEY);
  return data ? JSON.parse(data) : null;
}

// Set admin data
export function setAdminData(admin: AdminData): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
  }
}

// Login admin
export async function loginAdmin(
  email: string,
  password: string,
): Promise<LoginResponse> {
  try {
    const response = await authLogin({ email, password });
    const data = response.data;

    if (data.success && data.token) {
      setToken(data.token);
      setAdminData(data.admin);
    }

    return data;
  } catch (error: any) {
    return {
      success: false,
      token: "",
      admin: {} as AdminData,
      message: error.response?.data?.message || error.message || "Login failed",
    };
  }
}

// Logout admin
export async function logoutAdmin(): Promise<void> {
  try {
    await logout();
  } catch (error) {
    console.error("Logout error:", error);
  }
  removeToken();
}

// Verify token with backend
export async function verifyToken(token: string): Promise<boolean> {
  try {
    const response = await getMe();
    return response.data.success;
  } catch (error) {
    return false;
  }
}

// Check if admin is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const token = getToken();
  if (!token) return false;

  return await verifyToken(token);
}

// Get current admin
export async function getCurrentAdmin(): Promise<AdminData | null> {
  try {
    const response = await getMe();
    if (response.data.success) {
      setAdminData(response.data.data);
      return response.data.data;
    }
  } catch (error) {
    console.error("Error fetching current admin:", error);
  }

  return null;
}

// Check permission
export function hasPermission(
  permission: keyof AdminData["permissions"],
): boolean {
  const admin = getAdminData();
  if (!admin) return false;

  if (admin.role === "superadmin") return true;

  return admin.permissions?.[permission] ?? false;
}
