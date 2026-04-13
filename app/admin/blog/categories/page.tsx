"use client";

import React from "react";
import { FiPlus } from "react-icons/fi";

export default function BlogCategories() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#2C1810]">Blog Categories</h1>
          <p className="text-[#5A3E2B] mt-1">Manage blog categories and tags</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#8B6A3E] text-white rounded-lg hover:bg-[#5A3E2B] transition-colors">
          <FiPlus className="w-5 h-5" />
          Add Category
        </button>
      </div>

      <div className="bg-white rounded-lg border border-[#E7D5C2] p-8 text-center">
        <p className="text-[#5A3E2B]">Blog categories will be managed here</p>
      </div>
    </div>
  );
}
