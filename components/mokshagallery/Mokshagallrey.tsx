"use client";
import React, { useState, useEffect, useRef } from "react";
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
  description: string;
  photographer: string;
  likes: number;
  date: string;
  height: number;
}

function MokshaGallery() {
  const [images] = useState<GalleryImage[]>([
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80",
      alt: "Corporate Event",
      category: "events",
      title: "Tech Innovation Summit 2024",
      description: "Annual technology conference with industry leaders",
      photographer: "John Smith",
      likes: 234,
      date: "2024",
      height: 380,
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?w=1200&auto=format&fit=crop&q=80",
      alt: "Modern Office",
      category: "workspace",
      title: "Minimalist Executive Suite",
      description: "Contemporary office design with natural lighting",
      photographer: "Sarah Johnson",
      likes: 567,
      date: "2024",
      height: 520,
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&auto=format&fit=crop&q=80",
      alt: "Business Meeting",
      category: "meetings",
      title: "Strategic Planning Session",
      description: "Executive team brainstorming new initiatives",
      photographer: "Michael Chen",
      likes: 189,
      date: "2024",
      height: 420,
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&auto=format&fit=crop&q=80",
      alt: "Product Launch",
      category: "events",
      title: "Next-Gen Product Reveal",
      description: "Flagship product launch with live demonstrations",
      photographer: "Emma Davis",
      likes: 892,
      date: "2023",
      height: 480,
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&fit=crop&q=80",
      alt: "Creative Studio",
      category: "workspace",
      title: "Design Innovation Lab",
      description: "Creative workspace for digital designers",
      photographer: "David Kim",
      likes: 445,
      date: "2024",
      height: 350,
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&auto=format&fit=crop&q=80",
      alt: "Client Presentation",
      category: "meetings",
      title: "Investor Pitch Meeting",
      description: "Presenting quarterly results to stakeholders",
      photographer: "Lisa Wang",
      likes: 278,
      date: "2024",
      height: 560,
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&auto=format&fit=crop&q=80",
      alt: "Networking Event",
      category: "events",
      title: "Industry Networking Gala",
      description: "Annual networking mixer for professionals",
      photographer: "James Wilson",
      likes: 623,
      date: "2023",
      height: 400,
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200&auto=format&fit=crop&q=80",
      alt: "Executive Office",
      category: "workspace",
      title: "CEO Corner Office",
      description: "Luxurious executive workspace with city views",
      photographer: "Robert Brown",
      likes: 734,
      date: "2024",
      height: 520,
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&auto=format&fit=crop&q=80",
      alt: "Corporate Workshop",
      category: "events",
      title: "Leadership Development Workshop",
      description: "Interactive session for emerging leaders",
      photographer: "Amanda Lee",
      likes: 345,
      date: "2024",
      height: 390,
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80",
      alt: "Team Collaboration",
      category: "workspace",
      title: "Cross-functional Team Meeting",
      description: "Collaborative session across departments",
      photographer: "Thomas Anderson",
      likes: 412,
      date: "2024",
      height: 440,
    },
    {
      id: 11,
      src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&auto=format&fit=crop&q=80",
      alt: "Business Strategy",
      category: "meetings",
      title: "Strategic Planning Retreat",
      description: "Off-site strategy session for leadership",
      photographer: "Jennifer Martinez",
      likes: 567,
      date: "2023",
      height: 580,
    },
    {
      id: 12,
      src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80",
      alt: "Award Ceremony",
      category: "events",
      title: "Industry Excellence Awards",
      description: "Annual awards celebrating achievements",
      photographer: "Christopher Taylor",
      likes: 891,
      date: "2024",
      height: 420,
    },
    {
      id: 13,
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80",
      alt: "Modern Workspace",
      category: "workspace",
      title: "Open Concept Office",
      description: "Modern workspace with collaborative areas",
      photographer: "Patricia White",
      likes: 678,
      date: "2024",
      height: 460,
    },
    {
      id: 14,
      src: "https://images.unsplash.com/photo-1527192491265-7e15af55a1f2?w=1200&auto=format&fit=crop&q=80",
      alt: "Business Discussion",
      category: "meetings",
      title: "Client Negotiation Meeting",
      description: "High-stakes business discussion",
      photographer: "Daniel Garcia",
      likes: 234,
      date: "2024",
      height: 370,
    },
    {
      id: 15,
      src: "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?w=1200&auto=format&fit=crop&q=80",
      alt: "Team Building",
      category: "events",
      title: "Annual Company Retreat",
      description: "Team building activities and workshops",
      photographer: "Michelle Rodriguez",
      likes: 723,
      date: "2023",
      height: 500,
    },
    {
      id: 16,
      src: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1200&auto=format&fit=crop&q=80",
      alt: "Creative Office",
      category: "workspace",
      title: "Startup Office Space",
      description: "Vibrant workspace for tech startup",
      photographer: "Kevin Zhang",
      likes: 556,
      date: "2024",
      height: 410,
    },
    {
      id: 17,
      src: "https://images.unsplash.com/photo-1552581234-26160f608093?w=1200&auto=format&fit=crop&q=80",
      alt: "Business Workshop",
      category: "meetings",
      title: "Professional Development Seminar",
      description: "Skills enhancement workshop for professionals",
      photographer: "Rachel Green",
      likes: 389,
      date: "2024",
      height: 540,
    },
    {
      id: 18,
      src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&auto=format&fit=crop&q=80",
      alt: "Corporate Training",
      category: "events",
      title: "Corporate Training Session",
      description: "Interactive training for employee development",
      photographer: "William Turner",
      likes: 445,
      date: "2024",
      height: 430,
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [columns, setColumns] = useState(4);
  const containerRef = useRef<HTMLDivElement>(null);

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
      ? images
      : images.filter((img) => img.category === selectedCategory);

  // Distribute images into columns for masonry layout
  const getMasonryColumns = () => {
    const columnHeights = new Array(columns).fill(0);
    const columnImages: GalleryImage[][] = Array.from(
      { length: columns },
      () => [],
    );

    filteredImages.forEach((image) => {
      const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
      columnImages[shortestColumn].push(image);
      columnHeights[shortestColumn] += image.height;
    });

    return columnImages;
  };

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "events", name: "Corporate Events" },
    { id: "workspace", name: "Workspace Design" },
    { id: "meetings", name: "Business Meetings" },
  ];

  const masonryColumns = getMasonryColumns();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5E9D9" }}>
      <Topbar />
      <Navbar />

      <div className="container mx-auto px-3 sm:px-4 py-16 md:py-14">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 tracking-tight">
            Moksha Portfolio
          </h1>
          <div className="w-16 h-0.5 bg-gray-800 mx-auto mb-4"></div>
          <p className="text-gray-700 text-base max-w-2xl mx-auto">
            Curated collection of premium corporate photography capturing
            moments that define modern business excellence
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                selectedCategory === category.id
                  ? "bg-[#8B6A3E] text-white border-[#8B6A3E] shadow-md"
                  : "text-gray-700 border-gray-300 hover:border-[#8B6A3E] hover:text-[#8B6A3E] hover:bg-white/50"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Pinterest-style masonry grid */}
        <div
          ref={containerRef}
          className="grid gap-5"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          }}
        >
          {masonryColumns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-5">
              {column.map((image) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 bg-white cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                  style={{
                    height: `${image.height}px`,
                  }}
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes={`(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw`}
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Hover overlay with detailed info */}
                    <div className="absolute inset-x-0 bottom-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                      <div className="space-y-2">
                        {/* Category tag */}
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-1 bg-[#8B6A3E] text-white rounded-full text-xs font-medium shadow-lg">
                            {image.category.charAt(0).toUpperCase() +
                              image.category.slice(1)}
                          </span>
                          <span className="text-white/90 text-xs font-medium bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
                            {image.date}
                          </span>
                        </div>

                        {/* Title and description */}
                        <div>
                          <h3 className="text-base font-bold text-white line-clamp-1 mb-1">
                            {image.title}
                          </h3>
                          <p className="text-white/80 text-xs line-clamp-2 mb-2">
                            {image.description}
                          </p>
                        </div>

                        {/* Photographer and likes */}
                        <div className="flex items-center justify-between pt-1 border-t border-white/20">
                          <span className="text-white/70 text-xs flex items-center gap-1">
                            <svg
                              className="w-3 h-3"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                            </svg>
                            {image.photographer}
                          </span>
                          <span className="text-white/70 text-xs flex items-center gap-1">
                            <svg
                              className="w-3 h-3"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                            </svg>
                            {image.likes}
                          </span>
                        </div>

                        {/* View button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(image);
                          }}
                          className="w-full mt-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-xs font-medium py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-1 border border-white/30"
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
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="px-6 py-2.5 bg-[#8B6A3E] text-white text-sm font-medium rounded-full hover:bg-gray-900 transition-all duration-200 shadow-md hover:shadow-lg inline-flex items-center gap-2 group">
            <span>View Complete Portfolio</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Enhanced Modal with more information */}
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
              <svg
                className="w-5 h-5"
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

            <div className="flex flex-col lg:flex-row h-full">
              {/* Image section */}
              <div className="relative lg:w-3/5 h-[40vh] lg:h-[80vh] bg-black/5">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  sizes="60vw"
                  priority
                />
              </div>

              {/* Details section */}
              <div className="lg:w-2/5 p-6 lg:p-8 bg-white overflow-y-auto">
                <div className="space-y-6">
                  <div>
                    <span className="inline-block px-3 py-1 bg-[#8B6A3E] text-white rounded-full text-xs font-medium mb-3">
                      {selectedImage.category.charAt(0).toUpperCase() +
                        selectedImage.category.slice(1)}
                    </span>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                      {selectedImage.title}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      {selectedImage.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Photographer</p>
                      <p className="text-sm font-medium text-gray-800">
                        {selectedImage.photographer}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Year</p>
                      <p className="text-sm font-medium text-gray-800">
                        {selectedImage.date}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Likes</p>
                      <p className="text-sm font-medium text-gray-800 flex items-center gap-1">
                        <svg
                          className="w-4 h-4 text-red-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                        </svg>
                        {selectedImage.likes.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Category</p>
                      <p className="text-sm font-medium text-gray-800">
                        Corporate {selectedImage.category}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">
                      Share this image
                    </h3>
                    <div className="flex gap-2">
                      {["facebook", "twitter", "pinterest", "linkedin"].map(
                        (social) => (
                          <button
                            key={social}
                            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#8B6A3E] hover:text-white transition-colors duration-200 flex items-center justify-center text-gray-600"
                          >
                            <span className="sr-only">{social}</span>
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                            </svg>
                          </button>
                        ),
                      )}
                    </div>
                  </div>

                  <button className="w-full py-3 bg-[#8B6A3E] text-white rounded-lg hover:bg-gray-900 transition-colors duration-200 font-medium text-sm">
                    Download High Resolution
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
