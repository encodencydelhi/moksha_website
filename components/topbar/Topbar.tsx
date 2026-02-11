"use client";

import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function TopInfoBar() {
  const [isMusicOn, setIsMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isAudioReady, setIsAudioReady] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio();
    const canPlayHandler = () => {
      setIsAudioReady(true);
    };

    const errorHandler = (e: any) => {
      console.error("Audio error:", e);
      setIsAudioReady(false);
    };

    audioRef.current.addEventListener("canplaythrough", canPlayHandler);
    audioRef.current.addEventListener("error", errorHandler);
    audioRef.current.src = "/audio/om.mp3";
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    audioRef.current.preload = "auto";

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("canplaythrough", canPlayHandler);
        audioRef.current.removeEventListener("error", errorHandler);
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current || !isAudioReady) {
      console.warn("Audio not ready yet");
      return;
    }

    const newState = !isMusicOn;
    setIsMusicOn(newState);

    try {
      if (newState) {
        await audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    } catch (error) {
      console.error("Error controlling audio:", error);
      setIsMusicOn(false);
    }
  };

  return (
    <>
      <div
        id="topbar"
        className="fixed top-0 left-0 w-full bg-[#2A1A0F] text-white z-[60] border-b border-white/10"
      >
        <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-6 py-3 flex items-center justify-between">
          {/* Left Section - Contact Info */}
          <div className="flex items-center gap-1 md:gap-4 flex-shrink">
            <div className="flex items-center gap-1 group">
              <Mail size={10} className="text-[#D4B996] flex-shrink-0" />
              <a
                href="mailto:info@mokshayatra.org"
                className="text-[10px] sm:text-xs text-white/90 hover:text-white transition-colors truncate max-w-[120px] sm:max-w-none"
              >
                info@mokshayatra.org
              </a>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 group">
              <Phone size={10} className="text-[#D4B996] flex-shrink-0" />
              <a
                href="tel:+919654900525"
                className="text-[10px] sm:text-xs text-white/90 hover:text-white transition-colors whitespace-nowrap"
              >
                +91 96549 00525
              </a>
            </div>
          </div>

          {/* Right Section - Buttons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Music Button */}
            <button
              onClick={toggleMusic}
              disabled={!isAudioReady}
              className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#8B6A3E] hover:bg-[#755735] transition-all duration-300 disabled:bg-gray-700/50 disabled:cursor-not-allowed flex-shrink-0"
              aria-label={isMusicOn ? "Turn music off" : "Turn music on"}
            >
              {isMusicOn ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 9l6 6M15 9l-6 6"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 5L6 9H3v6h3l5 4V5z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 5L6 9H3v6h3l5 4V5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 9a3 3 0 010 6m3-8a7 7 0 010 10"
                  />
                </svg>
              )}
            </button>

            {/* Mobile: Only Icons */}
            <div className="flex sm:hidden items-center gap-0.5">
              <Link
                href="/login"
                className="flex items-center justify-center w-6 h-6 rounded bg-[#8B6A3E] hover:bg-[#755735] text-white transition-colors flex-shrink-0"
                title="User Login"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </Link>

              <Link
                href="/vendor-login"
                className="flex items-center justify-center w-6 h-6 rounded bg-[#8B6A3E] hover:bg-[#755735] text-white transition-colors flex-shrink-0"
                title="Vendor Login"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </Link>

              <Link
                href="/login"
                className="flex items-center justify-center w-6 h-6 rounded bg-[#8B6A3E] hover:bg-[#755735] text-white transition-colors flex-shrink-0"
                title="Moksha Seva"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </Link>
            </div>

            {/* Desktop: Full Text Buttons */}
            <div className="hidden sm:flex items-center gap-1.5">
              <Link
                href="/login"
                className="text-[11px] sm:text-xs bg-[#8B6A3E] hover:bg-[#755735] text-white px-2 py-1 rounded transition-colors whitespace-nowrap"
              >
                User Login
              </Link>
              <div className="w-px h-3 bg-white/20"></div>
              <Link
                href="/vendor-login"
                className="text-[11px] sm:text-xs bg-[#8B6A3E] hover:bg-[#755735] text-white px-2 py-1 rounded transition-colors whitespace-nowrap"
              >
                Vendor Login
              </Link>
              <div className="w-px h-3 bg-white/20"></div>
              <Link
                href="/login"
                className="text-[11px] sm:text-xs bg-[#8B6A3E] hover:bg-[#755735] text-white px-2 py-1 rounded transition-colors whitespace-nowrap"
              >
                Moksha Seva
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Add padding to prevent content from being hidden under fixed topbar */}
      <style jsx global>{`
        body {
          padding-top: 36px;
        }
        @media (max-width: 640px) {
          body {
            padding-top: 32px;
          }
        }
      `}</style>
    </>
  );
}
