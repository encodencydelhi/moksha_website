"use client";
import React, { useState, useEffect, useRef } from "react";
import Topbar from "@/components/topbar/Topbar";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Image from "next/image";
import { FiHeart, FiCalendar, FiDownload, FiX, FiEye } from "react-icons/fi";
import { PiFlowerLotus } from "react-icons/pi";
import { FaFacebook, FaTwitter, FaPinterest, FaLinkedin } from "react-icons/fa";

interface GalleryImage {
  _id: string;
  url: string;
  title: string;
  description: string;
  type: "image" | "video";
  tags: string[];
  category?: string;
  createdAt: string;
  likes?: number;
}

import { getAllGallery } from "@/lib/apiClient";

function MokshaGallery() {
  const [galleryData, setGalleryData] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [columns, setColumns] = useState(4);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch gallery from API
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await getAllGallery();
        const data = response.data;
        if (data.success && data.data) {
          setGalleryData(
            data.data.map((item: any) => ({
              _id: item._id,
              url: item.url || item.thumbnail || "/assets/placeholder.jpg",
              title: item.title || "Untitled",
              description: item.description || "",
              type: item.type || "image",
              tags: item.tags || [],
              category: item.category?.name || "Gallery",
              createdAt: item.createdAt,
              likes: Math.floor(Math.random() * 300),
            })),
          );
        }
      } catch (error) {
        console.error("Error fetching gallery:", error);
        // Fallback to default images
        setGalleryData([
          {
            _id: "1",
            url: "/assets/bodytransport.jpeg",
            title: "Dignified Body Transport",
            description: "Respectful body transport services",
            type: "image",
            tags: ["services"],
            category: "Services",
            createdAt: new Date().toISOString(),
            likes: 189,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  // Update columns based on screen size
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) {
        setColumns(2);
      } else if (window.innerWidth < 1024) {
        setColumns(3);
      } else {
        setColumns(4);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const filteredImages =
    selectedCategory === "all"
      ? galleryData.filter((img) => img.type === "image")
      : galleryData.filter(
          (img) => img.category === selectedCategory && img.type === "image",
        );

  // Distribute images into columns
  const getMasonryColumns = () => {
    const columnHeights = new Array(columns).fill(0);
    const columnImages: GalleryImage[][] = Array.from(
      { length: columns },
      () => [],
    );

    filteredImages.forEach((image) => {
      const height = 350;
      const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
      columnImages[shortestColumn].push(image);
      columnHeights[shortestColumn] += height;
    });

    return columnImages;
  };

  const categories: Array<{ id: string; name: string }> = [
    { id: "all", name: "All Gallery" },
    ...(Array.from(
      new Map(
        galleryData.map((item) => [
          item.category,
          { id: item.category || "all", name: item.category || "Gallery" },
        ]),
      ).values(),
    ) as Array<{ id: string; name: string }>),
  ];

  const masonryColumns = getMasonryColumns();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FAF7F2] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#8B6A3E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#5A3E2B]">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF7F2] to-white">
      <Topbar />
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#8B6A3E] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#5A3E2B] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#8B6A3E]/5 rounded-full border border-[#8B6A3E]/10 mb-5">
            <PiFlowerLotus className="w-3.5 h-3.5 text-[#8B6A3E]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#8B6A3E]">
              Visual Stories
            </span>
          </div>

          <h1 className="flex items-center text-center justify-center text-4xl md:text-5xl font-light text-[#2C1810] mb-4 tracking-tight">
            Moksha
            <span className="block text-5xl md:text-6xl font-serif text-[#8B6A3E] mt-2">
              Gallery
            </span>
          </h1>

          <p className="text-base text-[#5A3E2B]/70 max-w-2xl mx-auto">
            A glimpse into our compassionate services and sacred facilities
            dedicated to dignified farewells.
          </p>
        </div>
      </section>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-[#8B6A3E] text-white shadow-md"
                  : "bg-white text-[#5A3E2B] border border-[#E7D5C2] hover:bg-[#F5E9D9]"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        {filteredImages.length > 0 ? (
          <div
            ref={containerRef}
            className="grid gap-4"
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            }}
          >
            {masonryColumns.map((column, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-4">
                {column.map((image) => (
                  <div
                    key={image._id}
                    className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 bg-white cursor-pointer hover:-translate-y-1 h-[350px]"
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="relative w-full h-full overflow-hidden">
                      <Image
                        src={image.url}
                        alt={image.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes={`(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw`}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="px-2 py-1 bg-[#8B6A3E] text-white rounded-full text-[10px] font-medium shadow-lg">
                          {image.category || "Gallery"}
                        </span>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <div className="space-y-2">
                          <div>
                            <h3 className="text-sm font-serif text-white mb-1 line-clamp-1">
                              {image.title}
                            </h3>
                            <p className="text-white/80 text-[10px] line-clamp-2 mb-2">
                              {image.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-white/20">
                            <span className="text-white/70 text-[9px] flex items-center gap-1">
                              <FiHeart className="w-2.5 h-2.5" />
                              {image.likes || 0}
                            </span>
                            <span className="text-white/70 text-[9px] flex items-center gap-1">
                              <FiCalendar className="w-2.5 h-2.5" />
                              {new Date(image.createdAt).getFullYear()}
                            </span>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImage(image);
                            }}
                            className="w-full mt-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-[9px] font-medium py-1.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-1 border border-white/30"
                          >
                            <FiEye className="w-3 h-3" />
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-[#E7D5C2] p-12 text-center">
            <p className="text-[#5A3E2B]">No gallery images available.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-20 text-gray-700 bg-white/90 hover:bg-white w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl"
              aria-label="Close modal"
            >
              <FiX className="w-5 h-5" />
            </button>

            <div className="flex flex-col lg:flex-row h-full">
              <div className="relative lg:w-3/5 h-[40vh] lg:h-[80vh] bg-black/5">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                  sizes="60vw"
                  priority
                />
              </div>

              <div className="lg:w-2/5 p-6 lg:p-8 bg-white overflow-y-auto">
                <div className="space-y-6">
                  <div>
                    <span className="inline-block px-3 py-1 bg-[#8B6A3E] text-white rounded-full text-xs font-medium mb-3">
                      {selectedImage.category || "Gallery"}
                    </span>
                    <h2 className="text-2xl lg:text-3xl font-serif text-[#2C1810] mb-2">
                      {selectedImage.title}
                    </h2>
                    <p className="text-[#5A3E2B]/70 text-sm">
                      {selectedImage.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#F5E9D9]">
                    <div>
                      <p className="text-[10px] text-[#5A3E2B]/60 mb-1">
                        Likes
                      </p>
                      <p className="text-sm font-medium text-[#2C1810] flex items-center gap-1">
                        <FiHeart className="w-4 h-4 text-red-500" />
                        {(selectedImage.likes || 0).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#5A3E2B]/60 mb-1">
                        Added
                      </p>
                      <p className="text-sm font-medium text-[#2C1810]">
                        {new Date(selectedImage.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-serif text-[#2C1810] mb-3">
                      Share
                    </h3>
                    <div className="flex gap-2">
                      {[
                        { icon: FaFacebook, color: "#1877F2" },
                        { icon: FaTwitter, color: "#1DA1F2" },
                        { icon: FaPinterest, color: "#E60023" },
                        { icon: FaLinkedin, color: "#0A66C2" },
                      ].map((social, idx) => {
                        const Icon = social.icon;
                        return (
                          <button
                            key={idx}
                            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#8B6A3E] hover:text-white transition-colors duration-200 flex items-center justify-center text-gray-600"
                            style={{ color: social.color }}
                          >
                            <Icon className="w-5 h-5" />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button className="w-full py-3 bg-[#8B6A3E] text-white rounded-lg hover:bg-[#5A3E2B] transition-colors duration-200 font-medium text-sm flex items-center justify-center gap-2">
                    <FiDownload className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default MokshaGallery;
