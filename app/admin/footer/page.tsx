"use client";

import { useEffect, useState } from "react";
import { getFooterComponent, updateComponentByKey } from "@/lib/apiClient";

export default function AdminFooterPage() {
  const [footer, setFooter] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFooter = async () => {
      try {
        const res = await getFooterComponent();
        if (res.data?.success) {
          setFooter(res.data.data || {});
        } else {
          setError(res.data?.message || "Unable to load footer");
        }
      } catch (err: any) {
        setError(err?.response?.data?.message || "Unable to load footer");
      }
    };
    loadFooter();
  }, []);

  const handleChange = (key: string, value: any) => {
    setFooter((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSocialChange = (index: number, key: string, value: any) => {
    setFooter((prev: any) => {
      const socialLinks = [...(prev.socialLinks || [])];
      socialLinks[index] = { ...socialLinks[index], [key]: value };
      return { ...prev, socialLinks };
    });
  };

  const addSocialLink = () => {
    setFooter((prev: any) => ({
      ...prev,
      socialLinks: [
        ...(prev.socialLinks || []),
        { platform: "", url: "", icon: "" },
      ],
    }));
  };

  const removeSocialLink = (index: number) => {
    setFooter((prev: any) => ({
      ...prev,
      socialLinks: (prev.socialLinks || []).filter(
        (_: any, i: number) => i !== index,
      ),
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      if (!footer) return;
      const res = await updateComponentByKey("footer", footer);
      if (res.data?.success) {
        setMessage("Footer updated successfully");
      } else {
        setError(res.data?.message || "Failed to update footer");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update footer");
    }
  };

  if (!footer) {
    return <div className="p-8">Loading footer...</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-[#FDF8F2]">
      <h1 className="text-3xl font-bold mb-6">Edit Footer</h1>
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
          <h2 className="text-lg font-semibold mb-3">Footer Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              Copyright Text
              <input
                type="text"
                value={footer.copyright || ""}
                onChange={(e) => handleChange("copyright", e.target.value)}
                className="mt-1 w-full rounded border p-2"
              />
            </label>
            <label className="block">
              Address
              <input
                type="text"
                value={footer.address || ""}
                onChange={(e) => handleChange("address", e.target.value)}
                className="mt-1 w-full rounded border p-2"
              />
            </label>
            <label className="block">
              Phone
              <input
                type="text"
                value={footer.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="mt-1 w-full rounded border p-2"
              />
            </label>
            <label className="block">
              Email
              <input
                type="text"
                value={footer.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
                className="mt-1 w-full rounded border p-2"
              />
            </label>
          </div>
        </section>

        <section className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-3">Social Links</h2>
          {(footer.socialLinks || []).map((link: any, index: number) => (
            <div key={index} className="border p-4 mb-4 rounded">
              <h3 className="font-medium mb-2">Social Link {index + 1}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="block">
                  Platform
                  <input
                    type="text"
                    value={link.platform || ""}
                    onChange={(e) =>
                      handleSocialChange(index, "platform", e.target.value)
                    }
                    className="mt-1 w-full rounded border p-2"
                  />
                </label>
                <label className="block">
                  URL
                  <input
                    type="text"
                    value={link.url || ""}
                    onChange={(e) =>
                      handleSocialChange(index, "url", e.target.value)
                    }
                    className="mt-1 w-full rounded border p-2"
                  />
                </label>
                <label className="block">
                  Icon
                  <input
                    type="text"
                    value={link.icon || ""}
                    onChange={(e) =>
                      handleSocialChange(index, "icon", e.target.value)
                    }
                    className="mt-1 w-full rounded border p-2"
                  />
                </label>
              </div>
              <button
                type="button"
                onClick={() => removeSocialLink(index)}
                className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Remove Link
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSocialLink}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Social Link
          </button>
        </section>

        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Save Footer
        </button>
      </form>
    </div>
  );
}
