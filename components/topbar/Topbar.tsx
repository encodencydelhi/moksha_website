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
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-1.5 flex items-center justify-between">
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
              className={`relative w-14 h-7 rounded-full transition-all duration-300 flex items-center border ${
                !isAudioReady
                  ? "bg-gray-700/50 border-gray-600/50 cursor-not-allowed"
                  : isMusicOn
                    ? "bg-green-600 border-green-500"
                    : "bg-gray-700 border-gray-600"
              }`}
              aria-label={isMusicOn ? "Turn music off" : "Turn music on"}
            >
              <div
                className={`absolute w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 flex items-center justify-center ${
                  isMusicOn ? "left-8" : "left-1"
                }`}
              >
                {/* Music Note Icon */}
                <svg
                  className={`w-3 h-3 transition-colors duration-300 ${
                    isMusicOn ? "text-green-600" : "text-gray-700"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                  />
                </svg>
              </div>

              <span
                className={`absolute text-xs font-medium transition-opacity duration-200 ${
                  isMusicOn ? "opacity-0" : "opacity-70"
                } left-2 text-white`}
              >
                OFF
              </span>
              <span
                className={`absolute text-xs font-medium transition-opacity duration-200 ${
                  isMusicOn ? "opacity-70" : "opacity-0"
                } right-2 text-white`}
              >
                ON
              </span>
            </button>

            <Link
              href="/login"
              className="text-xs bg-[#8B6A3E] hover:bg-[#755735] text-white px-2 py-1 rounded transition-colors whitespace-nowrap"
            >
              Customer Login
            </Link>

            <div className="hidden md:block w-px h-3 bg-white/20"></div>

            <Link
              href="/vendor-login"
              className="text-xs bg-[#8B6A3E] hover:bg-[#755735] text-white px-2 py-1 rounded transition-colors whitespace-nowrap"
            >
              Vendor Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
