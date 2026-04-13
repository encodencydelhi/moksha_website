"use client";

import { useEffect, useState } from "react";
import {
  getAllVideoGallery,
  createVideoGallery,
  updateVideoGallery,
  deleteVideoGallery,
} from "@/lib/apiClient";

export default function AdminVideoGalleryPage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [editingVideo, setEditingVideo] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const res = await getAllVideoGallery();
      if (res.data?.success) {
        setVideos(res.data.data || []);
      } else {
        setError(res.data?.message || "Unable to load video gallery");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Unable to load video gallery");
    }
  };

  const handleSave = async (video: any) => {
    setError("");
    setMessage("");
    try {
      if (video._id) {
        const res = await updateVideoGallery(video._id, video);
        if (res.data?.success) {
          setMessage("Video updated successfully");
          loadVideos();
          setEditingVideo(null);
        } else {
          setError(res.data?.message || "Failed to update video");
        }
      } else {
        const res = await createVideoGallery(video);
        if (res.data?.success) {
          setMessage("Video created successfully");
          loadVideos();
          setEditingVideo(null);
        } else {
          setError(res.data?.message || "Failed to create video");
        }
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to save video");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video?")) return;
    try {
      const res = await deleteVideoGallery(id);
      if (res.data?.success) {
        setMessage("Video deleted successfully");
        loadVideos();
      } else {
        setError(res.data?.message || "Failed to delete video");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to delete video");
    }
  };

  const startEdit = (video: any) => {
    setEditingVideo({ ...video });
  };

  const addNew = () => {
    setEditingVideo({
      title: "",
      videoUrl: "",
      thumbnail: "",
      description: "",
      category: "",
      isActive: true,
    });
  };

  return (
    <div className="min-h-screen p-8 bg-[#FDF8F2]">
      <h1 className="text-3xl font-bold mb-6">Manage Video Gallery</h1>
      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {message}
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <button
        onClick={addNew}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add New Video
      </button>

      {editingVideo && (
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-lg font-semibold mb-3">
            {editingVideo._id ? "Edit Video" : "Add Video"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              Title
              <input
                type="text"
                value={editingVideo.title || ""}
                onChange={(e) =>
                  setEditingVideo({ ...editingVideo, title: e.target.value })
                }
                className="mt-1 w-full rounded border p-2"
              />
            </label>
            <label className="block">
              Category
              <input
                type="text"
                value={editingVideo.category || ""}
                onChange={(e) =>
                  setEditingVideo({ ...editingVideo, category: e.target.value })
                }
                className="mt-1 w-full rounded border p-2"
              />
            </label>
            <label className="block">
              Video URL
              <input
                type="text"
                value={editingVideo.videoUrl || ""}
                onChange={(e) =>
                  setEditingVideo({ ...editingVideo, videoUrl: e.target.value })
                }
                className="mt-1 w-full rounded border p-2"
              />
            </label>
            <label className="block">
              Thumbnail URL
              <input
                type="text"
                value={editingVideo.thumbnail || ""}
                onChange={(e) =>
                  setEditingVideo({
                    ...editingVideo,
                    thumbnail: e.target.value,
                  })
                }
                className="mt-1 w-full rounded border p-2"
              />
            </label>
            <label className="block">
              Active
              <input
                type="checkbox"
                checked={editingVideo.isActive || false}
                onChange={(e) =>
                  setEditingVideo({
                    ...editingVideo,
                    isActive: e.target.checked,
                  })
                }
                className="mt-1"
              />
            </label>
            <label className="block md:col-span-2">
              Description
              <textarea
                value={editingVideo.description || ""}
                onChange={(e) =>
                  setEditingVideo({
                    ...editingVideo,
                    description: e.target.value,
                  })
                }
                className="mt-1 w-full rounded border p-2"
                rows={3}
              />
            </label>
          </div>
          <div className="mt-4 space-x-2">
            <button
              onClick={() => handleSave(editingVideo)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => setEditingVideo(null)}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div key={video._id} className="bg-white p-4 rounded shadow">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-32 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-semibold">{video.title}</h3>
            <p className="text-sm text-gray-600">{video.category}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => startEdit(video)}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(video._id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
