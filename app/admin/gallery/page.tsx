"use client";

import React, { useState, useEffect } from "react";
import {
  getAllGallery,
  createGallery,
  updateGallery,
  deleteGallery,
} from "@/lib/apiClient";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX } from "react-icons/fi";

interface GalleryItem {
  _id?: string;
  title: string;
  description: string;
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  tags?: string[];
  isActive: boolean;
}

export default function GalleryManagement() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getAllGallery();
      const data = response.data;

      if (data.success) {
        setGallery(data.data || []);
      } else {
        setError("Failed to load gallery items");
      }
    } catch (err) {
      console.error("Error loading gallery:", err);
      setError("Failed to load gallery items");
      // Use fallback data
      setGallery([
        {
          _id: "1",
          title: "Sample Gallery Item",
          description: "This is a sample gallery item",
          type: "image",
          url: "/assets/logoreal.jpeg",
          isActive: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (item: GalleryItem) => {
    try {
      setError("");
      setSuccessMessage("");

      if (!item.title || !item.url) {
        setError("Please fill in all required fields");
        return;
      }

      const response = item._id
        ? await updateGallery(item._id, item)
        : await createGallery(item);

      const data = response.data;

      if (data.success) {
        setSuccessMessage(
          `Gallery item ${item._id ? "updated" : "created"} successfully`,
        );
        setEditingItem(null);
        setIsAddingNew(false);
        loadGallery();
      } else {
        setError(data.message || "Failed to save gallery item");
      }
    } catch (err) {
      console.error("Error saving gallery item:", err);
      setError("Failed to save gallery item");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;

    try {
      setError("");
      const response = await deleteGallery(id);
      const data = response.data;

      if (data.success) {
        setSuccessMessage("Gallery item deleted successfully");
        loadGallery();
      } else {
        setError("Failed to delete gallery item");
      }
    } catch (err) {
      console.error("Error deleting gallery item:", err);
      setError("Failed to delete gallery item");
    }
  };

  const startEdit = (item: GalleryItem) => {
    setEditingItem({ ...item });
    setIsAddingNew(false);
  };

  const addNew = () => {
    setEditingItem({
      title: "",
      description: "",
      type: "image",
      url: "",
      isActive: true,
    });
    setIsAddingNew(true);
  };

  const closeEdit = () => {
    setEditingItem(null);
    setIsAddingNew(false);
  };

  const filteredGallery = gallery.filter(
    (item) =>
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="min-h-screen p-8 bg-[#FDF8F2] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B6A3E] mx-auto mb-4"></div>
          <p className="text-[#5A4030]">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-[#FDF8F2]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#3A2A1F] mb-2">
            Gallery Management
          </h1>
          <p className="text-[#7B5E47]">
            Manage your gallery images and videos
          </p>
        </div>

        {/* Messages */}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center justify-between">
            <span>{successMessage}</span>
            <button
              onClick={() => setSuccessMessage("")}
              className="text-green-700 hover:text-green-900"
            >
              <FiX />
            </button>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => setError("")}
              className="text-red-700 hover:text-red-900"
            >
              <FiX />
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mb-6 flex gap-4">
          <button
            onClick={addNew}
            className="flex items-center gap-2 px-6 py-3 bg-[#8B6A3E] text-white rounded-lg hover:bg-[#6B5A3E] transition"
          >
            <FiPlus size={20} />
            Add New Gallery Item
          </button>
        </div>

        {/* Edit Form */}
        {editingItem && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-[#8B6A3E]">
            <h2 className="text-2xl font-bold text-[#3A2A1F] mb-6">
              {isAddingNew ? "Add Gallery Item" : "Edit Gallery Item"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-[#5A4030] mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={editingItem.title || ""}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-[#e8dbc5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]"
                  placeholder="Enter title"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-semibold text-[#5A4030] mb-2">
                  Type *
                </label>
                <select
                  value={editingItem.type}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      type: e.target.value as "image" | "video",
                    })
                  }
                  className="w-full px-4 py-2 border border-[#e8dbc5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]"
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>

              {/* URL */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-[#5A4030] mb-2">
                  {editingItem.type === "image" ? "Image URL" : "Video URL"} *
                </label>
                <input
                  type="text"
                  value={editingItem.url || ""}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, url: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-[#e8dbc5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]"
                  placeholder="Enter URL"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-[#5A4030] mb-2">
                  Description
                </label>
                <textarea
                  value={editingItem.description || ""}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-[#e8dbc5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]"
                  placeholder="Enter description"
                  rows={3}
                />
              </div>

              {/* Active */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={editingItem.isActive}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      isActive: e.target.checked,
                    })
                  }
                  className="w-4 h-4"
                />
                <label className="ml-2 text-sm font-semibold text-[#5A4030]">
                  Active
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={() => handleSave(editingItem)}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                onClick={closeEdit}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <FiSearch
              className="absolute left-4 top-3 text-[#8B6A3E]"
              size={20}
            />
            <input
              type="text"
              placeholder="Search gallery items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2 border border-[#e8dbc5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]"
            />
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredGallery.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#7B5E47] text-lg">No gallery items found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition border border-[#e8dbc5]"
              >
                {/* Image */}
                <div className="w-full h-48 overflow-hidden bg-[#F5E9D9]">
                  {item.type === "image" ? (
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#8B6A3E] text-white">
                      <span className="text-3xl">🎥</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-[#3A2A1F] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#7B5E47] mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Type Badge */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-[#F5E9D9] text-[#8B6A3E] text-xs font-semibold rounded-full">
                      {item.type === "image" ? "🖼️ Image" : "🎥 Video"}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(item)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      <FiEdit2 size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => item._id && handleDelete(item._id)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      <FiTrash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
