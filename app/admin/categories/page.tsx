"use client";

import React, { useState, useEffect } from "react";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/apiClient";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX } from "react-icons/fi";

interface Category {
  _id?: string;
  name: string;
  description: string;
  isActive: boolean;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getAllCategories();
      const data = response.data;

      if (data.success) {
        setCategories(data.data || []);
      } else {
        setError("Failed to load categories");
        setCategories([]);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (category: Category) => {
    try {
      setError("");
      setSuccessMessage("");

      if (!category.name || !category.description) {
        setError("Please fill in all required fields");
        return;
      }

      const response = category._id
        ? await updateCategory(category._id, category)
        : await createCategory(category);

      const data = response.data;

      if (data.success) {
        setSuccessMessage(
          `Category ${category._id ? "updated" : "created"} successfully`,
        );
        setEditingCategory(null);
        setIsAddingNew(false);
        fetchCategories();
      } else {
        setError(data.message || "Failed to save category");
      }
    } catch (err) {
      console.error("Error saving category:", err);
      setError("Failed to save category");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      setError("");
      const response = await deleteCategory(id);
      const data = response.data;

      if (data.success) {
        setSuccessMessage("Category deleted successfully");
        fetchCategories();
      } else {
        setError("Failed to delete category");
      }
    } catch (err) {
      console.error("Error deleting category:", err);
      setError("Failed to delete category");
    }
  };

  const startEdit = (category: Category) => {
    setEditingCategory({ ...category });
    setIsAddingNew(false);
  };

  const addNew = () => {
    setEditingCategory({
      name: "",
      description: "",
      isActive: true,
    });
    setIsAddingNew(true);
  };

  const closeEdit = () => {
    setEditingCategory(null);
    setIsAddingNew(false);
  };

  const filteredCategories = categories.filter(
    (cat) =>
      cat.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="min-h-screen p-8 bg-[#FDF8F2] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B6A3E] mx-auto mb-4"></div>
          <p className="text-[#5A4030]">Loading categories...</p>
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
            Category Management
          </h1>
          <p className="text-[#7B5E47]">Organize your services and content</p>
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
        <div className="mb-6">
          <button
            onClick={addNew}
            className="flex items-center gap-2 px-6 py-3 bg-[#8B6A3E] text-white rounded-lg hover:bg-[#6B5A3E] transition"
          >
            <FiPlus size={20} />
            Create New Category
          </button>
        </div>

        {/* Edit Form */}
        {editingCategory && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-[#8B6A3E]">
            <h2 className="text-2xl font-bold text-[#3A2A1F] mb-6">
              {isAddingNew ? "Create Category" : "Edit Category"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-[#5A4030] mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  value={editingCategory.name || ""}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-[#e8dbc5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]"
                  placeholder="Category name"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-[#5A4030] mb-2">
                  Description *
                </label>
                <textarea
                  value={editingCategory.description || ""}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-[#e8dbc5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]"
                  placeholder="Category description"
                  rows={4}
                />
              </div>

              {/* Active */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={editingCategory.isActive}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
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
                onClick={() => handleSave(editingCategory)}
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
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2 border border-[#e8dbc5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]"
            />
          </div>
        </div>

        {/* Categories Table */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#7B5E47] text-lg">No categories found</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#F5E9D9] border-b border-[#e8dbc5]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#3A2A1F]">
                    Category Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#3A2A1F]">
                    Description
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-[#3A2A1F]">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-[#3A2A1F]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8dbc5]">
                {filteredCategories.map((category) => (
                  <tr
                    key={category._id}
                    className="hover:bg-[#FDF8F2] transition"
                  >
                    <td className="px-6 py-4 text-sm font-semibold text-[#3A2A1F]">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#7B5E47]">
                      {category.description}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                          category.isActive ? "bg-green-600" : "bg-gray-600"
                        }`}
                      >
                        {category.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center flex gap-2 justify-center">
                      <button
                        onClick={() => startEdit(category)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Edit"
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        onClick={() =>
                          category._id && handleDelete(category._id)
                        }
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
