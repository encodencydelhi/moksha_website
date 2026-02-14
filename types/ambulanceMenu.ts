import { VendorConfig } from "@/types/vendor";
import {
  LayoutDashboard,
  Truck,
  Users,
  Package,
  Clock,
  DollarSign,
  AlertCircle,
  FileText,
} from "lucide-react";

export const ambulanceConfig: VendorConfig = {
  id: "ambulance",
  title: "Ambulance Service",
  subtitle: "Emergency response & patient transport",
  theme: {
    primary: "#DC2626", // Red for ambulance
    secondary: "#EF4444",
    accent: "#F59E0B",
  },
  menu: [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/vendor/dashboard",
    },
    {
      id: "active-trips",
      label: "Active Trips",
      icon: Truck,
      path: "/vendor/trips",
      badge: 3,
    },
    {
      id: "drivers",
      label: "Drivers",
      icon: Users,
      path: "/vendor/drivers",
    },
    {
      id: "vehicles",
      label: "Vehicles",
      icon: Package,
      path: "/vendor/vehicles",
    },
    {
      id: "emergencies",
      label: "Emergencies",
      icon: AlertCircle,
      path: "/vendor/emergencies",
    },
    {
      id: "schedule",
      label: "Schedule",
      icon: Clock,
      path: "/vendor/schedule",
    },
    {
      id: "earnings",
      label: "Earnings",
      icon: DollarSign,
      path: "/vendor/earnings",
    },
    {
      id: "documents",
      label: "Documents",
      icon: FileText,
      path: "/vendor/documents",
    },
  ],
  stats: [
    {
      title: "Active Trips",
      value: "8",
      icon: Truck,
      change: -2,
      bgColor: "#DC2626",
    },
    {
      title: "Available Vehicles",
      value: "15",
      icon: Package,
      change: 3,
      bgColor: "#EF4444",
    },
    {
      title: "Drivers On Duty",
      value: "12",
      icon: Users,
      change: 1,
      bgColor: "#F59E0B",
    },
    {
      title: "Response Time",
      value: "12 min",
      icon: Clock,
      change: -5,
      bgColor: "#2E7D32",
    },
  ],
  recentActivity: [
    {
      id: "1",
      title: "Emergency Trip - City Hospital",
      time: "10:30 AM",
      status: "in-progress",
      user: "Driver: Rajesh",
      amount: "₹1,500",
    },
    {
      id: "2",
      title: "Patient Transport",
      time: "09:15 AM",
      status: "completed",
      user: "Driver: Suresh",
      amount: "₹800",
    },
    {
      id: "3",
      title: "Dead Body Transport",
      time: "08:00 AM",
      status: "completed",
      user: "Driver: Mahesh",
      amount: "₹2,500",
    },
    {
      id: "4",
      title: "Vehicle Maintenance",
      time: "Yesterday",
      status: "pending",
      user: "MH01AB1234",
    },
  ],
  notifications: [
    {
      id: "n1",
      message: "Emergency call from City Hospital",
      time: "2 min ago",
      read: false,
    },
    {
      id: "n2",
      message: "Driver Rajesh reported for duty",
      time: "30 min ago",
      read: false,
    },
    {
      id: "n3",
      message: "Vehicle MH01AB1234 needs maintenance",
      time: "2 hours ago",
      read: true,
    },
  ],
};
