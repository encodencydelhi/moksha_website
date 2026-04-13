"use client";

import React, { useState } from "react";
import { uploadGallery } from "@/lib/apiClient";
import { FiArrowLeft, FiUploadCloud, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function UploadGallery() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...droppedFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const handleRemove = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await uploadGallery(formData);
      const data = response.data;
      if (data.success) {
        router.push("/admin/gallery");
      } else {
        setError(data.message || "Upload failed");
      }
    } catch (err: any) {
      setError("Error uploading files");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#5A3E2B] hover:text-[#2C1810] mb-8"
      >
        <FiArrowLeft className="w-5 h-5" />
        Back
      </button>

      <h1 className="text-3xl font-bold text-[#2C1810] mb-2">
        Upload Gallery Items
      </h1>
      <p className="text-[#5A3E2B] mb-8">
        Upload images or videos to your gallery
      </p>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg border border-[#E7D5C2] p-8">
        {/* Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-[#E7D5C2] rounded-lg p-8 text-center mb-8 hover:border-[#8B6A3E] transition-colors cursor-pointer"
        >
          <FiUploadCloud className="w-12 h-12 text-[#8B6A3E] mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[#2C1810] mb-2">
            Drag and drop your files here
          </h3>
          <p className="text-[#5A3E2B] mb-4">or</p>
          <label className="inline-block px-6 py-2 bg-[#8B6A3E] text-white rounded-lg hover:bg-[#5A3E2B] transition-colors cursor-pointer">
            Select Files
            <input
              type="file"
              multiple
              onChange={handleFileSelect}
              accept="image/*,video/*"
              className="hidden"
            />
          </label>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mb-8">
            <h3 className="font-semibold text-[#2C1810] mb-4">
              Files to Upload
            </h3>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-[#FDF8F2] rounded-lg border border-[#E7D5C2]"
                >
                  <span className="text-sm text-[#2C1810]">{file.name}</span>
                  <button
                    onClick={() => handleRemove(index)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Button */}
        <div className="flex gap-3">
          <button
            onClick={() => router.back()}
            className="flex-1 px-6 py-2 border border-[#E7D5C2] text-[#2C1810] rounded-lg hover:bg-[#FDF8F2] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={files.length === 0 || uploading}
            className="flex-1 px-6 py-2 bg-[#8B6A3E] text-white rounded-lg hover:bg-[#5A3E2B] transition-colors disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload Files"}
          </button>
        </div>
      </div>
    </div>
  );
}
