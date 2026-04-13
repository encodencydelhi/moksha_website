"use client";

import { useEffect, useState } from "react";
import {
  adminGetAllFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
} from "@/lib/apiClient";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiChevronUp,
  FiChevronDown,
  FiX,
} from "react-icons/fi";

interface FAQ {
  _id?: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
}

const categories = ["General", "Services", "Payment", "Booking", "Technical"];

export default function AdminFAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await adminGetAllFAQs();
      const data = response.data;

      if (data.success) {
        setFaqs(data.data || []);
      } else {
        setError("Failed to load FAQs");
        setFaqs([]);
      }
    } catch (err) {
      console.error("Error loading FAQs:", err);
      setError("Failed to load FAQs");
      setFaqs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (faq: FAQ) => {
    try {
      setError("");
      setSuccessMessage("");

      if (!faq.question || !faq.answer) {
        setError("Please fill in all required fields");
        return;
      }

      const response = faq._id
        ? await updateFAQ(faq._id, faq)
        : await createFAQ(faq);

      const data = response.data;

      if (data.success) {
        setSuccessMessage(
          `FAQ ${faq._id ? "updated" : "created"} successfully`,
        );
        setEditingFAQ(null);
        setIsAddingNew(false);
        loadFAQs();
      } else {
        setError(data.message || "Failed to save FAQ");
      }
    } catch (err) {
      console.error("Error saving FAQ:", err);
      setError("Failed to save FAQ");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;

    try {
      setError("");
      const response = await deleteFAQ(id);
      const data = response.data;

      if (data.success) {
        setSuccessMessage("FAQ deleted successfully");
        loadFAQs();
      } else {
        setError("Failed to delete FAQ");
      }
    } catch (err) {
      console.error("Error deleting FAQ:", err);
      setError("Failed to delete FAQ");
    }
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newFaqs = [...faqs];
    [newFaqs[index].order, newFaqs[index - 1].order] = [
      newFaqs[index - 1].order,
      newFaqs[index].order,
    ];
    setFaqs(newFaqs.sort((a, b) => a.order - b.order));
  };

  const moveDown = (index: number) => {
    if (index === faqs.length - 1) return;
    const newFaqs = [...faqs];
    [newFaqs[index].order, newFaqs[index + 1].order] = [
      newFaqs[index + 1].order,
      newFaqs[index].order,
    ];
    setFaqs(newFaqs.sort((a, b) => a.order - b.order));
  };

  const startEdit = (faq: FAQ) => {
    setEditingFAQ({ ...faq });
    setIsAddingNew(false);
  };

  const addNew = () => {
    const maxOrder =
      faqs.length > 0 ? Math.max(...faqs.map((f) => f.order)) : 0;
    setEditingFAQ({
      question: "",
      answer: "",
      category: "General",
      order: maxOrder + 1,
      isActive: true,
    });
    setIsAddingNew(true);
  };

  const closeEdit = () => {
    setEditingFAQ(null);
    setIsAddingNew(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen p-8 bg-[#FDF8F2] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B6A3E] mx-auto mb-4"></div>
          <p className="text-[#5A4030]">Loading FAQs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-[#FDF8F2]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#3A2A1F] mb-2">
            FAQ Management
          </h1>
          <p className="text-[#7B5E47]">Manage frequently asked questions</p>
        </div>

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

        <div className="mb-6">
          <button
            onClick={addNew}
            className="flex items-center gap-2 px-6 py-3 bg-[#8B6A3E] text-white rounded-lg hover:bg-[#6B5A3E] transition"
          >
            <FiPlus size={20} />
            Add New FAQ
          </button>
        </div>

        {editingFAQ && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-[#8B6A3E]">
            <h2 className="text-2xl font-bold text-[#3A2A1F] mb-6">
              {isAddingNew ? "Create FAQ" : "Edit FAQ"}
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#5A4030] mb-2">
                  Question *
                </label>
                <input
                  type="text"
                  value={editingFAQ.question || ""}
                  onChange={(e) =>
                    setEditingFAQ({ ...editingFAQ, question: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-[#e8dbc5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]"
                  placeholder="Enter question"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#5A4030] mb-2">
                  Answer *
                </label>
                <textarea
                  value={editingFAQ.answer || ""}
                  onChange={(e) =>
                    setEditingFAQ({ ...editingFAQ, answer: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-[#e8dbc5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]"
                  placeholder="Enter answer"
                  rows={5}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#5A4030] mb-2">
                    Category
                  </label>
                  <select
                    value={editingFAQ.category || "General"}
                    onChange={(e) =>
                      setEditingFAQ({ ...editingFAQ, category: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-[#e8dbc5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6A3E]"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingFAQ.isActive}
                      onChange={(e) =>
                        setEditingFAQ({
                          ...editingFAQ,
                          isActive: e.target.checked,
                        })
                      }
                      className="w-4 h-4"
                    />
                    <span className="ml-2 text-sm font-semibold text-[#5A4030]">
                      Active
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => handleSave(editingFAQ)}
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

        {faqs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#7B5E47] text-lg">No FAQs found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {faqs
              .sort((a, b) => a.order - b.order)
              .map((faq, index) => (
                <div
                  key={faq._id}
                  className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#8B6A3E] hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#3A2A1F] mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-sm text-[#7B5E47] mb-3">
                        {faq.answer}
                      </p>
                      <div className="flex gap-2 items-center text-xs">
                        <span className="px-2 py-1 bg-[#F5E9D9] text-[#8B6A3E] rounded">
                          {faq.category}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-white text-xs ${
                            faq.isActive ? "bg-green-600" : "bg-gray-600"
                          }`}
                        >
                          {faq.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end pt-4 border-t border-[#e8dbc5]">
                    <button
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                      className="p-2 text-[#8B6A3E] hover:bg-[#F5E9D9] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Move up"
                    >
                      <FiChevronUp size={18} />
                    </button>
                    <button
                      onClick={() => moveDown(index)}
                      disabled={index === faqs.length - 1}
                      className="p-2 text-[#8B6A3E] hover:bg-[#F5E9D9] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Move down"
                    >
                      <FiChevronDown size={18} />
                    </button>
                    <button
                      onClick={() => startEdit(faq)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      <FiEdit2 size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => faq._id && handleDelete(faq._id)}
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
