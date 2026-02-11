"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Topbar from "@/components/topbar/Topbar";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer/Footer";

interface GalleryVideo {
  id: number;
  src: string;
  alt: string;
  category: string;
  title: string;
  thumbnail?: string;
}

function MokshaVideoGallery() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [pageLoaded, setPageLoaded] = useState(false);

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
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [videoErrors, setVideoErrors] = useState<number[]>([]);

  const filteredVideos = useMemo(() => {
    return selectedCategory === "all"
      ? videos
      : videos.filter((video) => video.category === selectedCategory);
  }, [selectedCategory, videos]);

  useEffect(() => {
    setPageLoaded(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch((e) => console.log("Auto-play prevented:", e));
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 },
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [filteredVideos]);

  const handleVideoError = (id: number) => {
    if (!videoErrors.includes(id)) {
      setVideoErrors((prev) => [...prev, id]);
    }
  };

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

      <div className="container mx-auto px-3 sm:px-4 py-16 md:py-14">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-4xl font-bold text-black mb-2 tracking-tight">
            Moksha Video Gallery
          </h1>
          <div className="w-12 h-0.5 bg-[#8B6A3E] mx-auto mb-3"></div>
          <p className="text-[#8B6A3E] text-sm max-w-xl mx-auto">
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
                  ? "bg-[#8B6A3E] text-white border-[#8B6A3E]"
                  : "text-[#8B6A3E] border-[#8B6A3E] hover:bg-[#8B6A3E] hover:text-white"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filteredVideos.map((video, index) => (
            <div
              key={video.id}
              className="group relative overflow-hidden rounded-md shadow-sm hover:shadow transition-all duration-200 bg-[#8B6A3E]"
            >
              <div className="relative w-full h-36 sm:h-40 md:h-44 overflow-hidden">
                {videoErrors.includes(video.id) ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#8B6A3E] text-white p-4">
                    <svg
                      className="w-12 h-12 mb-2 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-xs text-center">Video unavailable</p>
                  </div>
                ) : (
                  <>
                    <video
                      ref={(el: any) => (videoRefs.current[index] = el)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onError={() => handleVideoError(video.id)}
                    >
                      <source src={video.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                    <div className="absolute inset-0 bg-gradient-to-t from-[#8B6A3E]/70 via-transparent to-transparent opacity-60"></div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors group-hover:scale-110">
                        <svg
                          className="w-5 h-5 text-[#8B6A3E] ml-0.5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-[#8B6A3E]/80 to-transparent">
                  <p className="text-white text-xs font-medium truncate">
                    {video.title}
                  </p>
                </div>
              </div>

              <div className="p-2 bg-white">
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      video.category === "events"
                        ? "bg-[#8B6A3E] text-white"
                        : video.category === "workspace"
                          ? "bg-[#8B6A3E] text-white"
                          : "bg-[#8B6A3E] text-white"
                    }`}
                  >
                    {video.category.charAt(0).toUpperCase() +
                      video.category.slice(1)}
                  </span>
                  <button
                    onClick={() => setSelectedVideo(video)}
                    className="text-[#8B6A3E] hover:text-[#6B4F2E] transition-colors p-0.5"
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
                <h3 className="text-sm font-medium text-[#8B6A3E] line-clamp-1">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="px-5 py-2 bg-[#8B6A3E] text-white text-sm font-medium rounded-full hover:bg-[#6B4F2E] transition-all duration-200 shadow-sm hover:shadow">
            View Complete Video Portfolio
          </button>
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 bg-[#8B6A3E]/95 z-50 flex items-center justify-center p-2 md:p-4">
          <div className="relative w-full max-w-4xl h-auto max-h-[90vh] bg-[#8B6A3E] rounded-lg overflow-hidden">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-2 right-2 z-10 text-white bg-[#8B6A3E]/60 hover:bg-[#8B6A3E]/80 w-8 h-8 rounded-full flex items-center justify-center transition-all"
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

            <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] bg-[#8B6A3E]">
              <video
                className="w-full h-full object-contain"
                controls
                autoPlay
                playsInline
                controlsList="nodownload"
                src={selectedVideo.src}
              >
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="p-3 sm:p-4 bg-white">
              <h2 className="text-base sm:text-lg font-bold text-[#8B6A3E] mb-1">
                {selectedVideo.title}
              </h2>
              <p className="text-[#8B6A3E] text-xs sm:text-sm">
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

export default MokshaVideoGallery;
