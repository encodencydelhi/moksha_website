export type VendorCategory =
  | "pandit"
  | "ambulance"
  | "body_transport"
  | "freezer_box"
  | "shamshan_ghat"
  | "samagri_supplies"
  | "wood_supply"
  | "flower_garland"
  | "tent_seating"
  | "bhajan_mandali"
  | "catering"
  | "documentation_help";

export interface MenuItem {
  id: string;
  label: string;
  icon: any; // Lucide icon type
  path: string;
  badge?: number;
}

export interface StatCard {
  title: string;
  value: string;
  icon: any; // Lucide icon type
  change?: number;
  bgColor?: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  time: string;
  status: "pending" | "completed" | "in-progress" | "cancelled";
  user?: string;
  amount?: string;
}

export interface NotificationItem {
  id: string;
  message: string;
  time: string;
  read: boolean;
}

export interface VendorConfig {
  id: VendorCategory;
  title: string;
  subtitle: string;
  theme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  menu: MenuItem[];
  stats: StatCard[];
  recentActivity: ActivityItem[];
  notifications: NotificationItem[];
}
