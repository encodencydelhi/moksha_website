"use client";

import { useRouter, useParams } from "next/navigation";
import { getBlogById, updateBlog } from "@/lib/apiClient";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiSave } from "react-icons/fi";

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const blogId = params.id as string;

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    category: "",
    author: "",
    metaTitle: "",
    metaDescription: "",
    status: "draft",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getBlogById(blogId);
        const data = response.data;
        if (data.success) {
          setFormData(data.data || data.blog);
        } else {
          setError("Failed to load blog");
        }
      } catch (err) {
        setError("Error loading blog");
      } finally {
        setLoading(false);
      }
    };

    if (blogId) fetchBlog();
  }, [blogId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const response = await updateBlog(blogId, formData);
      const data = response.data;
      if (data.success) {
        router.push("/admin/blog");
      } else {
        setError(data.message || "Failed to update blog");
      }
    } catch (err: any) {
      setError("Error updating blog");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center">
        <div className="w-8 h-8 border-4 border-[#8B6A3E] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-[#F5E9D9] rounded-lg transition-colors"
        >
          <FiArrowLeft className="w-5 h-5 text-[#5A3E2B]" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-[#2C1810]">Edit Blog Post</h1>
          <p className="text-[#5A3E2B] mt-1">Update blog post details</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg border border-[#E7D5C2] p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#2C1810] mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#E7D5C2] rounded-lg focus:outline-none focus:border-[#8B6A3E]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C1810] mb-2">
              Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={10}
              className="w-full px-4 py-2 border border-[#E7D5C2] rounded-lg focus:outline-none focus:border-[#8B6A3E] font-mono text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#2C1810] mb-2">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#E7D5C2] rounded-lg focus:outline-none focus:border-[#8B6A3E]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2C1810] mb-2">
                Author
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#E7D5C2] rounded-lg focus:outline-none focus:border-[#8B6A3E]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C1810] mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#E7D5C2] rounded-lg focus:outline-none focus:border-[#8B6A3E]"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4 border-t border-[#E7D5C2]">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-[#E7D5C2] text-[#2C1810] rounded-lg hover:bg-[#FDF8F2] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-[#8B6A3E] text-white rounded-lg hover:bg-[#5A3E2B] transition-colors disabled:opacity-50"
            >
              <FiSave className="w-4 h-4" />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
