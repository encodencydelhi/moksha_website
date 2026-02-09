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
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-1.5 group">
              <Mail size={12} className="text-[#D4B996] flex-shrink-0" />
              <a
                href="mailto:info@mokshayatra.org"
                className="text-xs text-white/90 hover:text-white transition-colors whitespace-nowrap"
              >
                info@mokshayatra.org
              </a>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 group">
              <Phone size={12} className="text-[#D4B996] flex-shrink-0" />
              <a
                href="tel:+919654900525"
                className="text-xs text-white/90 hover:text-white transition-colors whitespace-nowrap"
              >
                +91 96549 00525
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMusic}
              disabled={!isAudioReady}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-[#8B6A3E] hover:bg-[#755735] transition-all duration-300 disabled:bg-gray-700/50 disabled:cursor-not-allowed"
              aria-label={isMusicOn ? "Turn music off" : "Turn music on"}
            >
              {isMusicOn ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-white"
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
                  className="w-4 h-4 text-white"
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
            <Link
              href="/login"
              className="text-xs bg-[#8B6A3E] hover:bg-[#755735] text-white px-2 py-1 rounded transition-colors whitespace-nowrap"
            >
              User Login
            </Link>
            <div className="hidden md:block w-px h-3 bg-white/20"></div>
            <Link
              href="/vendor-login"
              className="text-xs bg-[#8B6A3E] hover:bg-[#755735] text-white px-2 py-1 rounded transition-colors whitespace-nowrap"
            >
              Vendor Login
            </Link>
            <div className="hidden md:block w-px h-3 bg-white/20"></div>
            <Link
              href="/login"
              className="text-xs bg-[#8B6A3E] hover:bg-[#755735] text-white px-2 py-1 rounded transition-colors whitespace-nowrap"
            >
              Moksha Seva
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
