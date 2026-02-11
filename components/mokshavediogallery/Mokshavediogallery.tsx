"use client";
import React, { useState } from "react";
import Topbar from "@/components/topbar/Topbar";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer/Footer";

interface GalleryVideo {
  id: number;
  src: string;
  alt: string;
  category: string;
  title: string;
}

function mokshavediogallery() {
  const [videos] = useState<GalleryVideo[]>([
    {
      id: 1,
      src: "/vedio/vedio.mp4",
      alt: "Corporate Event",
      category: "events",
      title: "Corporate Conference",
    },
    {
      id: 2,
      src: "/vedio/vedio.mp4",
      alt: "Office Workspace",
      category: "workspace",
      title: "Modern Office Tour",
    },
    {
      id: 3,
      src: "/vedio/vedio.mp4",
      alt: "Business Meeting",
      category: "meetings",
      title: "Team Strategy Session",
    },
    {
      id: 4,
      src: "/vedio/vedio.mp4",
      alt: "Product Launch",
      category: "events",
      title: "Product Launch Event",
    },
    {
      id: 5,
      src: "/vedio/vedio.mp4",
      alt: "Design Studio",
      category: "workspace",
      title: "Creative Studio Walkthrough",
    },
    {
      id: 6,
      src: "/vedio/vedio.mp4",
      alt: "Client Presentation",
      category: "meetings",
      title: "Client Presentation",
    },
    {
      id: 7,
      src: "/vedio/vedio.mp4",
      alt: "Networking Event",
      category: "events",
      title: "Industry Networking",
    },
    {
      id: 8,
      src: "/vedio/vedio.mp4",
      alt: "Executive Office",
      category: "workspace",
      title: "Executive Suite Tour",
    },
    {
      id: 9,
      src: "/vedio/vedio.mp4",
      alt: "Annual Conference",
      category: "events",
      title: "Annual Corporate Conference",
    },
    {
      id: 10,
      src: "/vedio/vedio.mp4",
      alt: "Workspace Design",
      category: "workspace",
      title: "Workspace Design Concept",
    },
    {
      id: 11,
      src: "/vedio/vedio.mp4",
      alt: "Board Meeting",
      category: "meetings",
      title: "Board Meeting Highlights",
    },
    {
      id: 12,
      src: "/vedio/vedio.mp4",
      alt: "Company Party",
      category: "events",
      title: "Company Annual Party",
    },
    {
      id: 13,
      src: "/vedio/vedio.mp4",
      alt: "Coworking Space",
      category: "workspace",
      title: "Coworking Space Tour",
    },
    {
      id: 14,
      src: "/vedio/vedio.mp4",
      alt: "Team Brainstorming",
      category: "meetings",
      title: "Team Brainstorming Session",
    },
    {
      id: 15,
      src: "/vedio/vedio.mp4",
      alt: "Award Ceremony",
      category: "events",
      title: "Employee Award Ceremony",
    },
    {
      id: 16,
      src: "/vedio/vedio.mp4",
      alt: "Reception Area",
      category: "workspace",
      title: "Reception Area Showcase",
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedVideo, setSelectedVideo] = useState<GalleryVideo | null>(null);

  const filteredVideos =
    selectedCategory === "all"
      ? videos
      : videos.filter((video) => video.category === selectedCategory);

  const categories = [
    { id: "all", name: "All Videos" },
    { id: "events", name: "Corporate Events" },
    { id: "workspace", name: "Workspace Tours" },
    { id: "meetings", name: "Business Meetings" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5E9D9" }}>
      <Topbar />
      <Navbar />

      <div className="container mx-auto px-3 sm:px-4 py-6 md:py-14">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 tracking-tight">
            Moksha Video Gallery
          </h1>
          <div className="w-12 h-0.5 bg-gray-800 mx-auto mb-3"></div>
          <p className="text-gray-700 text-sm max-w-xl mx-auto">
            Curated collection of corporate video productions
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-1.5 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                selectedCategory === category.id
                  ? "bg-[#8B6A3E] text-white border-gray-900"
                  : "text-gray-700 border-gray-300 hover:border-gray-800 hover:bg-gray-50"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="group relative overflow-hidden rounded-md shadow-sm hover:shadow transition-all duration-200 bg-white"
            >
              <div className="relative h-36 w-full overflow-hidden">
                <video
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-400"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source src={video.src} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                    <svg
                      className="w-5 h-5 text-gray-800 ml-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="p-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-sm">
                    {video.category.charAt(0).toUpperCase() +
                      video.category.slice(1).substring(0, 3)}
                  </span>
                  <button
                    onClick={() => setSelectedVideo(video)}
                    className="text-gray-500 hover:text-gray-800 transition-colors p-0.5"
                    title="View Video"
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
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="px-5 py-2 bg-[#8B6A3E] text-white text-sm font-medium rounded-full hover:bg-gray-900 transition-all duration-200 shadow-sm hover:shadow">
            View Complete Video Portfolio
          </button>
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2">
          <div className="relative max-w-3xl w-full max-h-[80vh] bg-black rounded-lg overflow-hidden">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-2 right-2 z-10 text-white bg-black/50 hover:bg-black/70 w-8 h-8 rounded-full flex items-center justify-center transition-all"
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
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="relative h-[45vh]">
              <video
                className="object-contain w-full h-full"
                controls
                autoPlay
                src={selectedVideo.src}
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="p-3 bg-white">
              <h2 className="text-lg font-bold text-gray-800 mb-1">
                {selectedVideo.title}
              </h2>
              <p className="text-gray-600 text-xs">
                Professional {selectedVideo.category} video production
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default mokshavediogallery;
