import axios from "axios";

const apiBaseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

const api = axios.create({
  baseURL: apiBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("moksha_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const authLogin = (payload: { email: string; password: string }) =>
  api.post("/auth/login", payload);

export const authSignup = (payload: {
  name: string;
  email: string;
  password: string;
}) => api.post("/auth/signup", payload);

export const requestOTP = (payload: { email: string }) =>
  api.post("/auth/otp/request", payload);

export const verifyOTP = (payload: { email: string; otp: string }) =>
  api.post("/auth/otp/verify", payload);

export const getMe = () => api.get("/auth/me");

export const logout = () => api.post("/auth/logout");

// --- Setting APIs ---
export const getSettings = (params?: any) => api.get("/settings", { params });
export const getSettingsBySection = (section: string) =>
  api.get(`/settings/section/${section}`);
export const getSettingsByKey = (key: string) =>
  api.get(`/settings/key/${key}`);
export const updateSettings = (payload: any) => api.post("/settings", payload);
export const getWhatsappLink = () => api.get("/settings/whatsapp-link");

// --- Blog APIs ---
export const getAllBlogs = () => api.get("/blog");
export const getBlogById = (id: string) => api.get(`/blog/${id}`);
export const createBlog = (payload: any) => api.post("/blog", payload);
export const updateBlog = (id: string, payload: any) =>
  api.put(`/blog/${id}`, payload);
export const deleteBlog = (id: string) => api.delete(`/blog/${id}`);

// --- Gallery APIs ---
export const getAllGallery = () => api.get("/gallery");
export const getGalleryById = (id: string) => api.get(`/gallery/${id}`);
export const createGallery = (payload: any) => api.post("/gallery", payload);
export const updateGallery = (id: string, payload: any) =>
  api.put(`/gallery/${id}`, payload);
export const deleteGallery = (id: string) => api.delete(`/gallery/${id}`);
export const uploadGallery = (formData: FormData) =>
  api.post("/gallery/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// --- Services APIs ---
export const getAllServices = (params?: any) =>
  api.get("/services", { params });
export const getServiceByPageKey = (pageKey: string) =>
  api.get(`/services/${pageKey}`);
export const getServiceBySlug = (slug: string) =>
  api.get(`/services/slug/${slug}`);
export const createService = (payload: any) => api.post("/services", payload);
export const updateService = (id: string, payload: any) =>
  api.put(`/services/${id}`, payload);
export const deleteService = (id: string) => api.delete(`/services/${id}`);

// --- Upload API ---
export const uploadImage = (formData: FormData) =>
  api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// --- Components (CMS) APIs ---
export const getAllComponents = () => api.get("/components");
export const getComponentByKey = (key: string) => api.get(`/components/${key}`);
export const getBulkComponents = (keys: string[]) =>
  api.post("/components/bulk", { keys });
export const getHeroComponent = () => api.get("/components/hero");
export const getTopbarComponent = () => api.get("/components/topbar");
export const getNavbarComponent = () => api.get("/components/navbar");
export const getFooterComponent = () => api.get("/components/footer");
export const getSideIconsComponent = () => api.get("/components/sideicons");
export const getAboutComponent = () => api.get("/components/about");
export const updateComponentByKey = (key: string, payload: any) =>
  api.put(`/components/${key}`, payload);

// --- Video Gallery APIs ---
export const getAllVideoGallery = () => api.get("/gallery", { params: { type: "video" } });
export const createVideoGallery = (payload: any) => api.post("/gallery", { ...payload, type: "video" });
export const updateVideoGallery = (id: string, payload: any) =>
  api.put(`/gallery/${id}`, payload);
export const deleteVideoGallery = (id: string) => api.delete(`/gallery/${id}`);

// --- Analytics APIs ---
export const trackVisit = (payload: { page: string; sessionId?: string }) =>
  api.post("/analytics/track", payload);
export const getDashboardStats = () => api.get("/analytics/dashboard-stats");
export const getVisits = (params?: any) =>
  api.get("/analytics/visits", { params });

// --- Social Clicks APIs ---
export const trackSocialClick = (platform: string) =>
  api.post("/social-clicks/track", { platform });

export const recordClickAnalytics = (iconName: string) =>
  api.post("/click-analytics/create", { iconName });

export const getSocialClicks = (params?: any) =>
  api.get("/social-clicks", { params });

// --- Contact APIs ---
export const submitContact = (payload: any) => api.post("/contact", payload);
export const submitContactForm = (payload: any) =>
  api.post("/contacts", payload);
export const getAllEnquiries = () => api.get("/contact");

// --- FAQ APIs ---
export const getAllFAQs = () => api.get("/faqs");
export const adminGetAllFAQs = () => api.get("/faqs/admin/all");
export const createFAQ = (payload: any) => api.post("/faqs", payload);
export const updateFAQ = (id: string, payload: any) =>
  api.put(`/faqs/${id}`, payload);
export const deleteFAQ = (id: string) => api.delete(`/faqs/${id}`);
export const reorderFAQs = (payload: any) =>
  api.post("/faqs/admin/reorder", payload);

// --- Category APIs ---
export const getAllCategories = () => api.get("/categories");
export const createCategory = (payload: any) =>
  api.post("/categories", payload);
export const updateCategory = (id: string, payload: any) =>
  api.put(`/categories/${id}`, payload);
export const deleteCategory = (id: string) => api.delete(`/categories/${id}`);

// --- Payment APIs ---
export const getPaymentConfig = () => api.get("/payments/config");
export const getPayments = (params?: any) => api.get("/payments", { params });
export const createRazorpayOrder = (payload: any) =>
  api.post("/payments/create-order", payload);
export const verifyRazorpayPayment = (payload: any) =>
  api.post("/payments/verify", payload);
export const getActivityLogs = (params?: any) =>
  api.get("/activity-log", { params });

// --- Image Path Helper ---
export const resolveImagePath = (path: any) => {
  if (!path) return "/assets/image.webp";
  if (typeof path !== "string") return path; // Safely return Next.js StaticImageData objects
  if (path.startsWith("http")) return path;

  // If it's a backend upload (starts with /uploads)
  if (path.startsWith("/uploads") || path.startsWith("uploads/")) {
    const serverBase = apiBaseURL.replace("/api", "");
    const cleanPath = path.startsWith("/") ? path : `/${path}`;

    // Safety check: sometimes paths might already be absolute but not start with http (unlikely but safe)
    if (cleanPath.startsWith("//")) return `http:${cleanPath}`;

    // Properly encode the path parts (to handle special characters like spaces or parentheses)
    // Next.js Image component sometimes fails when URLs contain literal parentheses.
    const encodedPath = cleanPath
      .split("/")
      .map((part) =>
        encodeURIComponent(part)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/'/g, "%27"),
      )
      .join("/")
      .replace(/%2F/g, "/"); // Restore slashes if any were encoded (though they shouldn't be by split)

    return `${serverBase}${encodedPath}`;
  }

  // Otherwise, it's likely a frontend public asset (starts with /assets, etc.)
  return path;
};

export default api;
