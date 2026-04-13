"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createBlog } from "@/lib/apiClient";
import { FiArrowLeft, FiSave } from "react-icons/fi";

export default function CreateBlogPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    category: "",
    author: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: [],
    status: "draft",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    setLoading(true);

    try {
      const response = await createBlog(formData);
      const data = response.data;
      if (data.success) {
        router.push("/admin/blog");
      } else {
        setError(data.message || "Failed to create blog");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Error creating blog");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-[#F5E9D9] rounded-lg transition-colors"
        >
          <FiArrowLeft className="w-5 h-5 text-[#5A3E2B]" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-[#2C1810]">
            Create Blog Post
          </h1>
          <p className="text-[#5A3E2B] mt-1">
            Add a new blog post to your website
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Form */}
      <div className="bg-white rounded-lg border border-[#E7D5C2] p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-[#2C1810] mb-2">
              Blog Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[#E7D5C2] rounded-lg focus:outline-none focus:border-[#8B6A3E]"
              placeholder="Enter blog title"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-[#2C1810] mb-2">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#E7D5C2] rounded-lg focus:outline-none focus:border-[#8B6A3E]"
              placeholder="blog-title (auto-generated)"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-[#2C1810] mb-2">
              Content *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={10}
              className="w-full px-4 py-2 border border-[#E7D5C2] rounded-lg focus:outline-none focus:border-[#8B6A3E] font-mono text-sm"
              placeholder="Enter blog content"
            />
          </div>

          {/* Category */}
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
              placeholder="Blog category"
            />
          </div>

          {/* Author */}
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
              placeholder="Author name"
            />
          </div>

          {/* Meta Title */}
          <div>
            <label className="block text-sm font-medium text-[#2C1810] mb-2">
              Meta Title (SEO)
            </label>
            <input
              type="text"
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#E7D5C2] rounded-lg focus:outline-none focus:border-[#8B6A3E]"
              placeholder="SEO meta title"
            />
          </div>

          {/* Meta Description */}
          <div>
            <label className="block text-sm font-medium text-[#2C1810] mb-2">
              Meta Description (SEO)
            </label>
            <textarea
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-[#E7D5C2] rounded-lg focus:outline-none focus:border-[#8B6A3E]"
              placeholder="SEO meta description"
            />
          </div>

          {/* Status */}
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

          {/* Submit Button */}
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
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 bg-[#8B6A3E] text-white rounded-lg hover:bg-[#5A3E2B] transition-colors disabled:opacity-50"
            >
              <FiSave className="w-4 h-4" />
              {loading ? "Creating..." : "Create Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
