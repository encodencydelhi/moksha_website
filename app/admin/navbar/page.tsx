"use client";

import { useEffect, useState } from "react";
import { getNavbarComponent, updateComponentByKey } from "@/lib/apiClient";

export default function AdminNavbarPage() {
  const [navbar, setNavbar] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadNavbar = async () => {
      try {
        const res = await getNavbarComponent();
        if (res.data?.success) {
          setNavbar(res.data.data || {});
        } else {
          setError(res.data?.message || "Unable to load navbar");
        }
      } catch (err: any) {
        setError(err?.response?.data?.message || "Unable to load navbar");
      }
    };
    loadNavbar();
  }, []);

  const handleChange = (key: string, value: any) => {
    setNavbar((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleMenuChange = (index: number, key: string, value: any) => {
    setNavbar((prev: any) => {
      const menuItems = [...(prev.menuItems || [])];
      menuItems[index] = { ...menuItems[index], [key]: value };
      return { ...prev, menuItems };
    });
  };

  const addMenuItem = () => {
    setNavbar((prev: any) => ({
      ...prev,
      menuItems: [
        ...(prev.menuItems || []),
        { label: "", href: "", isActive: true },
      ],
    }));
  };

  const removeMenuItem = (index: number) => {
    setNavbar((prev: any) => ({
      ...prev,
      menuItems: (prev.menuItems || []).filter(
        (_: any, i: number) => i !== index,
      ),
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      if (!navbar) return;
      const res = await updateComponentByKey("navbar", navbar);
      if (res.data?.success) {
        setMessage("Navbar updated successfully");
      } else {
        setError(res.data?.message || "Failed to update navbar");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update navbar");
    }
  };

  if (!navbar) {
    return <div className="p-8">Loading navbar...</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-[#FDF8F2]">
      <h1 className="text-3xl font-bold mb-6">Edit Navbar</h1>
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
          <h2 className="text-lg font-semibold mb-3">Navbar Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              Logo URL
              <input
                type="text"
                value={navbar.logo || ""}
                onChange={(e) => handleChange("logo", e.target.value)}
                className="mt-1 w-full rounded border p-2"
              />
            </label>
            <label className="block">
              Logo Alt Text
              <input
                type="text"
                value={navbar.logoAlt || ""}
                onChange={(e) => handleChange("logoAlt", e.target.value)}
                className="mt-1 w-full rounded border p-2"
              />
            </label>
          </div>
        </section>

        <section className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-3">Menu Items</h2>
          {(navbar.menuItems || []).map((item: any, index: number) => (
            <div key={index} className="border p-4 mb-4 rounded">
              <h3 className="font-medium mb-2">Menu Item {index + 1}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  Label
                  <input
                    type="text"
                    value={item.label || ""}
                    onChange={(e) =>
                      handleMenuChange(index, "label", e.target.value)
                    }
                    className="mt-1 w-full rounded border p-2"
                  />
                </label>
                <label className="block">
                  Href
                  <input
                    type="text"
                    value={item.href || ""}
                    onChange={(e) =>
                      handleMenuChange(index, "href", e.target.value)
                    }
                    className="mt-1 w-full rounded border p-2"
                  />
                </label>
              </div>
              <button
                type="button"
                onClick={() => removeMenuItem(index)}
                className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Remove Item
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addMenuItem}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Menu Item
          </button>
        </section>

        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Save Navbar
        </button>
      </form>
    </div>
  );
}
