"use client";

import { useEffect, useState } from "react";
import {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "@/lib/apiClient";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX } from "react-icons/fi";

interface Blog {
  _id?: string;
  title: string;
  excerpt?: string;
  description?: string;
  content: string;
  coverImage?: string;
  image?: string;
  category: string;
  isPublished?: boolean;
  isActive?: boolean;
  tags?: string[];
}

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getAllBlogs();
      const data = response.data;

      if (data.success) {
        setBlogs(data.data || []);
      } else {
        setError(data.message || "Failed to load blogs");
        setBlogs([]);
      }
    } catch (err) {
      console.error("Error loading blogs:", err);
      setError("Failed to load blogs");
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (blog: Blog) => {
    try {
      setError("");
      setSuccessMessage("");

      if (!blog.title || !blog.content) {
        setError("Please fill in all required fields");
        return;
      }

      const response = blog._id
        ? await updateBlog(blog._id, blog)
        : await createBlog(blog);

      const data = response.data;

      if (data.success) {
        setSuccessMessage(
          `Blog ${blog._id ? "updated" : "created"} successfully`,
        );
        setEditingBlog(null);
        setIsAddingNew(false);
        loadBlogs();
      } else {
        setError(data.message || "Failed to save blog");
      }
    } catch (err) {
      console.error("Error saving blog:", err);
      setError("Failed to save blog. Please check if the server is running.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      setError("");
      const response = await deleteBlog(id);
      const data = response.data;

      if (data.success) {
        setSuccessMessage("Blog deleted successfully");
        loadBlogs();
      } else {
        setError(data.message || "Failed to delete blog");
      }
    } catch (err) {
      console.error("Error deleting blog:", err);
      setError("Failed to delete blog. Please check if the server is running.");
    }
  };

  const startEdit = (blog: Blog) => {
    setEditingBlog({
      ...blog,
      title: blog.title || "",
      category: blog.category || "General",
      image: blog.image || "",
      description: blog.description || "",
      content: blog.content || "",
      isActive: blog.isActive !== undefined ? blog.isActive : true,
    });
    setIsAddingNew(false);
  };

  const addNew = () => {
    setEditingBlog({
      title: "",
      description: "",
      content: "",
      category: "General",
      isActive: true,
    });
    setIsAddingNew(true);
  };

  const closeEdit = () => {
    setEditingBlog(null);
    setIsAddingNew(false);
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="min-h-screen p-8 bg-[#FDF8F2] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B6A3E] mx-auto mb-4"></div>
          <p className="text-[#5A4030]">Loading blogs...</p>
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
            Blog Management
          </h1>
          <p className="text-[#7B5E47]">Create and manage your blog posts</p>
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
            Create New Blog Post
          </button>
        </div>

        {/* Edit Form */}
        {editingBlog && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-[#8B6A3E]">
            <h2 className="text-2xl font-bold text-[#3A2A1F] mb-6">
              {isAddingNew ? "Create Blog Post" : "Edit Blog Post"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-[#5A4030] mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={editingBlog.title || ""}
                  onChange={(e) =>
                    setEditingBlog({ ...editingBlog, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-[#e8dbc5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]"
                  placeholder="Enter blog title"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-[#5A4030] mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={editingBlog.category || ""}
                  onChange={(e) =>
                    setEditingBlog({ ...editingBlog, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-[#e8dbc5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]"
                  placeholder="Category"
                />
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-semibold text-[#5A4030] mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  value={editingBlog.image || ""}
                  onChange={(e) =>
                    setEditingBlog({ ...editingBlog, image: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-[#e8dbc5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]"
                  placeholder="Image URL"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-[#5A4030] mb-2">
                  Description *
                </label>
                <textarea
                  value={editingBlog.description || ""}
                  onChange={(e) =>
                    setEditingBlog({
                      ...editingBlog,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-[#e8dbc5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]"
                  placeholder="Enter description"
                  rows={3}
                />
              </div>

              {/* Content */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-[#5A4030] mb-2">
                  Content *
                </label>
                <textarea
                  value={editingBlog.content || ""}
                  onChange={(e) =>
                    setEditingBlog({ ...editingBlog, content: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-[#e8dbc5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]"
                  placeholder="Enter blog content"
                  rows={6}
                />
              </div>

              {/* Active */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={editingBlog.isActive}
                  onChange={(e) =>
                    setEditingBlog({
                      ...editingBlog,
                      isActive: e.target.checked,
                    })
                  }
                  className="w-4 h-4"
                />
                <label className="ml-2 text-sm font-semibold text-[#5A4030]">
                  Publish
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={() => handleSave(editingBlog)}
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
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2 border border-[#e8dbc5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]"
            />
          </div>
        </div>

        {/* Blogs List */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#7B5E47] text-lg">No blog posts found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#8B6A3E] hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#3A2A1F] mb-2">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-[#7B5E47] mb-2">
                      {blog.description}
                    </p>
                    <div className="flex gap-2 items-center text-xs">
                      <span className="px-2 py-1 bg-[#F5E9D9] text-[#8B6A3E] rounded">
                        {blog.category || "Uncategorized"}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-white ${
                          blog.isActive ? "bg-green-600" : "bg-gray-600"
                        }`}
                      >
                        {blog.isActive ? "Published" : "Draft"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 justify-end pt-4 border-t border-[#e8dbc5]">
                  <button
                    onClick={() => startEdit(blog)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <FiEdit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => blog._id && handleDelete(blog._id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    <FiTrash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
