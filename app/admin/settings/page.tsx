"use client";

import { useEffect, useState } from "react";
import {
  getSettings,
  getHeroComponent,
  updateSettings,
  updateComponentByKey,
} from "@/lib/apiClient";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await getSettings();
        if (res.data?.success) {
          setSettings(res.data.data || {});
        } else {
          setError(res.data?.message || "Unable to load settings");
        }
      } catch (err: any) {
        setError(err?.response?.data?.message || "Unable to load settings");
      }
    };

    loadSettings();
  }, []);

  const handleChange = (key: string, value: any) => {
    setSettings((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      if (!settings) return;
      const res = await updateSettings(settings);
      if (res.data?.success) {
        setMessage("Settings saved successfully");
      } else {
        setError(res.data?.message || "Failed to save settings");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to save settings");
    }
  };

  if (!settings) {
    return <div className="p-8">Loading settings...</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-[#FDF8F2]">
      <h1 className="text-3xl font-bold mb-6">Admin Settings</h1>
      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {message}
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <section className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-3">Topbar / Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              Email
              <input
                type="email"
                value={settings.topbarEmail || settings.contactEmail || ""}
                onChange={(e) => handleChange("topbarEmail", e.target.value)}
                className="mt-1 w-full rounded border p-2"
              />
            </label>
            <label className="block">
              Phone
              <input
                type="text"
                value={settings.topbarPhone || settings.contactPhone || ""}
                onChange={(e) => handleChange("topbarPhone", e.target.value)}
                className="mt-1 w-full rounded border p-2"
              />
            </label>
            <label className="block md:col-span-2">
              WhatsApp Number
              <input
                type="text"
                value={settings.whatsappNumber || ""}
                onChange={(e) => handleChange("whatsappNumber", e.target.value)}
                className="mt-1 w-full rounded border p-2"
              />
            </label>
          </div>
        </section>

        <section className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-3">Hero Section</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              Heading
              <input
                type="text"
                value={settings.heroHeading || ""}
                onChange={(e) => handleChange("heroHeading", e.target.value)}
                className="mt-1 w-full rounded border p-2"
              />
            </label>
            <label className="block">
              Subheading
              <input
                type="text"
                value={settings.heroSubtitle || ""}
                onChange={(e) => handleChange("heroSubtitle", e.target.value)}
                className="mt-1 w-full rounded border p-2"
              />
            </label>
            <label className="block md:col-span-2">
              Trust Badge Text
              <input
                type="text"
                value={settings.heroTrustBadge || ""}
                onChange={(e) => handleChange("heroTrustBadge", e.target.value)}
                className="mt-1 w-full rounded border p-2"
              />
            </label>
          </div>
          <p className="text-xs mt-2 text-gray-500">
            Hero slide images and items are managed in Components - Hero
            endpoint.
          </p>
        </section>

        <section className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-3">Footer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              Address
              <input
                type="text"
                value={settings.footerAddress || ""}
                onChange={(e) => handleChange("footerAddress", e.target.value)}
                className="mt-1 w-full rounded border p-2"
              />
            </label>
            <label className="block">
              Copyright Text
              <input
                type="text"
                value={settings.footerCopyright || ""}
                onChange={(e) =>
                  handleChange("footerCopyright", e.target.value)
                }
                className="mt-1 w-full rounded border p-2"
              />
            </label>
          </div>
        </section>
        <section className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-3">WhatsApp Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              WhatsApp API Key
              <input
                type="text"
                value={settings.whatsappApiKey || ""}
                onChange={(e) => handleChange("whatsappApiKey", e.target.value)}
                className="mt-1 w-full rounded border p-2"
              />
            </label>
            <label className="block">
              WhatsApp Business Number
              <input
                type="text"
                value={settings.whatsappBusinessNumber || ""}
                onChange={(e) =>
                  handleChange("whatsappBusinessNumber", e.target.value)
                }
                className="mt-1 w-full rounded border p-2"
              />
            </label>
            <label className="block">
              Auto Reply Message
              <textarea
                value={settings.whatsappAutoReply || ""}
                onChange={(e) =>
                  handleChange("whatsappAutoReply", e.target.value)
                }
                className="mt-1 w-full rounded border p-2"
                rows={3}
              ></textarea>
            </label>
          </div>
        </section>

        <section className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-3">Razorpay Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              Razorpay Key ID
              <input
                type="text"
                value={settings.razorpayKeyId || ""}
                onChange={(e) => handleChange("razorpayKeyId", e.target.value)}
                className="mt-1 w-full rounded border p-2"
              />
            </label>
            <label className="block">
              Razorpay Key Secret
              <input
                type="password"
                value={settings.razorpayKeySecret || ""}
                onChange={(e) =>
                  handleChange("razorpayKeySecret", e.target.value)
                }
                className="mt-1 w-full rounded border p-2"
              />
            </label>
            <label className="block">
              Currency
              <select
                value={settings.currency || "INR"}
                onChange={(e) => handleChange("currency", e.target.value)}
                className="mt-1 w-full rounded border p-2"
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
              </select>
            </label>
          </div>
        </section>

        <section className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-3">Call Section</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              Call Section Number
              <input
                type="text"
                value={settings.callSectionNumber || ""}
                onChange={(e) =>
                  handleChange("callSectionNumber", e.target.value)
                }
                className="mt-1 w-full rounded border p-2"
              />
            </label>
            <label className="block">
              Call Section Message
              <textarea
                value={settings.callSectionMessage || ""}
                onChange={(e) =>
                  handleChange("callSectionMessage", e.target.value)
                }
                className="mt-1 w-full rounded border p-2"
                rows={2}
              ></textarea>
            </label>
          </div>
        </section>

        <section className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-3">Email Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              SMTP Host
              <input
                type="text"
                value={settings.smtpHost || ""}
                onChange={(e) => handleChange("smtpHost", e.target.value)}
                className="mt-1 w-full rounded border p-2"
              />
            </label>
            <label className="block">
              SMTP Port
              <input
                type="number"
                value={settings.smtpPort || ""}
                onChange={(e) => handleChange("smtpPort", e.target.value)}
                className="mt-1 w-full rounded border p-2"
              />
            </label>
            <label className="block">
              SMTP User
              <input
                type="text"
                value={settings.smtpUser || ""}
                onChange={(e) => handleChange("smtpUser", e.target.value)}
                className="mt-1 w-full rounded border p-2"
              />
            </label>
            <label className="block">
              SMTP Password
              <input
                type="password"
                value={settings.smtpPassword || ""}
                onChange={(e) => handleChange("smtpPassword", e.target.value)}
                className="mt-1 w-full rounded border p-2"
              />
            </label>
            <label className="block md:col-span-2">
              Invoice Email Template
              <textarea
                value={settings.invoiceEmailTemplate || ""}
                onChange={(e) =>
                  handleChange("invoiceEmailTemplate", e.target.value)
                }
                className="mt-1 w-full rounded border p-2"
                rows={4}
                placeholder="Use name, amount, service etc."
              ></textarea>
            </label>
          </div>
        </section>

        <section className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-3">OTP Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              OTP Expiry (minutes)
              <input
                type="number"
                value={settings.otpExpiryMinutes || 10}
                onChange={(e) =>
                  handleChange("otpExpiryMinutes", e.target.value)
                }
                className="mt-1 w-full rounded border p-2"
              />
            </label>
            <label className="block">
              OTP Length
              <input
                type="number"
                value={settings.otpLength || 6}
                onChange={(e) => handleChange("otpLength", e.target.value)}
                className="mt-1 w-full rounded border p-2"
              />
            </label>
          </div>
        </section>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save All Settings
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-500">
        Make sure to log in as admin (via /login) to use the protected update
        API.
      </p>
    </div>
  );
}
