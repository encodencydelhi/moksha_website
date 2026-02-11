"use client";
import React, { useState } from "react";
import Topbar from "@/components/topbar/Topbar";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Image from "next/image";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  title: string;
}

function Blog() {
  const [images] = useState<GalleryImage[]>([
    {
      id: 1,
      src: "/assets/four.jpg",
      alt: "Corporate Event",
      category: "events",
      title: "Corporate Conference",
    },
    {
      id: 2,
      src: "/assets/one.jpg",
      alt: "Office Workspace",
      category: "workspace",
      title: "Modern Office",
    },
    {
      id: 3,
      src: "/assets/two.jpg",
      alt: "Business Meeting",
      category: "meetings",
      title: "Team Strategy",
    },
    {
      id: 4,
      src: "/assets/two.jpg",
      alt: "Product Launch",
      category: "events",
      title: "Product Launch",
    },
    {
      id: 5,
      src: "/assets/two.jpg",
      alt: "Design Studio",
      category: "workspace",
      title: "Creative Studio",
    },
    {
      id: 6,
      src: "/assets/one.jpg",
      alt: "Client Presentation",
      category: "meetings",
      title: "Client Presentation",
    },
    {
      id: 7,
      src: "/assets/b.jpg",
      alt: "Networking Event",
      category: "events",
      title: "Industry Networking",
    },
    {
      id: 8,
      src: "/assets/a.jpg",
      alt: "Executive Office",
      category: "workspace",
      title: "Executive Suite",
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages =
    selectedCategory === "all"
      ? images
      : images.filter((img) => img.category === selectedCategory);

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "events", name: "Corporate Events" },
    { id: "workspace", name: "Workspace Design" },
    { id: "meetings", name: "Business Meetings" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5E9D9" }}>
      <Topbar />
      <Navbar />

      <div className="container mx-auto px-3 sm:px-4 py-6 md:py-14">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 tracking-tight">
            Professional Portfolio
          </h1>
          <div className="w-12 h-0.5 bg-gray-800 mx-auto mb-3"></div>
          <p className="text-gray-700 text-sm max-w-xl mx-auto">
            Curated collection of corporate photography
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-1.5 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                selectedCategory === category.id
                  ? "bg-gray-800 text-white border-gray-800"
                  : "text-gray-700 border-gray-300 hover:border-gray-800 hover:bg-gray-50"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-md shadow-sm hover:shadow transition-all duration-200 bg-white"
            >
              <div className="relative h-36 w-full overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-400"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </div>

              <div className="p-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-sm">
                    {image.category.charAt(0).toUpperCase() +
                      image.category.slice(1).substring(0, 3)}
                  </span>
                  <button
                    onClick={() => setSelectedImage(image)}
                    className="text-gray-500 hover:text-gray-800 transition-colors p-0.5"
                    title="View"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                </div>
                <h3 className="text-sm font-medium text-gray-800 line-clamp-1">
                  {image.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="px-5 py-2 bg-gray-800 text-white text-xs font-medium rounded-full hover:bg-gray-900 transition-all duration-200 shadow-sm hover:shadow">
            View Complete Portfolio
          </button>
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2">
          <div className="relative max-w-3xl w-full max-h-[80vh] bg-white rounded-lg overflow-hidden">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 z-10 text-gray-700 bg-white/90 hover:bg-white w-7 h-7 rounded-full flex items-center justify-center transition-all shadow-sm"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="relative h-[45vh]">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                sizes="85vw"
              />
            </div>
            <div className="p-3 bg-white">
              <h2 className="text-lg font-bold text-gray-800 mb-1">
                {selectedImage.title}
              </h2>
              <p className="text-gray-600 text-xs">
                Professional {selectedImage.category} photography
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Blog;
