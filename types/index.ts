export type UserRole = "vendor" | "admin" | null;
export type VendorCategory = "ambulance" | "pandit" | null;

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  vendorCategory?: VendorCategory;
  phone?: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  role: UserRole;
  vendorCategory: VendorCategory;
  isLoading: boolean;
}
