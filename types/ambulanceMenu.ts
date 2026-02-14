import { MenuItem } from "./vendor";

export const ambulanceMenu: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "📊",
    path: "/vendor/dashboard",
  },
  {
    id: "trips",
    label: "Active Trips",
    icon: "🚑",
    path: "/vendor/trips",
  },
  {
    id: "drivers",
    label: "Drivers",
    icon: "👨‍✈️",
    path: "/vendor/drivers",
  },
  {
    id: "vehicles",
    label: "Vehicles",
    icon: "🚐",
    path: "/vendor/vehicles",
  },
];
