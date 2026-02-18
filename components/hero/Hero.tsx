"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Shield } from "lucide-react";
import shlokas from "@/types/shlokas.json";

export default function Hero() {
  // ---------------- IMAGES ----------------
  const images = useMemo(
    () => [
      "/assets/three.jpg",
      "/assets/one.jpg",
      "/assets/two.jpg",
      "/assets/four.jpg",
    ],
    [],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // ---------------- DAILY MANTRA STATE ----------------
  const [mantra, setMantra] = useState<any>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ---------------- FIX: Memoize slideMantras to prevent re-creation ----------------
  const slideMantras = useMemo(() => {
    return [shlokas[0], shlokas[1], shlokas[2], shlokas[3]];
  }, []);
  useEffect(() => {
    setMantra(slideMantras[currentIndex] || shlokas[0]);
  }, [currentIndex, slideMantras]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  // ---------------- AUDIO SETUP ----------------
  useEffect(() => {
    if (!mantra || !audioRef.current) return;

    const audio = audioRef.current;

    // Reset states
    setAudioError(false);
    setAudioLoading(true);

    // Set up audio event listeners
    const handleCanPlay = () => {
      console.log("Audio can play now");
      setAudioLoading(false);
    };

    const handlePlay = () => {
      console.log("Audio playing");
      setAudioPlaying(true);
    };

    const handlePause = () => {
      console.log("Audio paused");
      setAudioPlaying(false);
    };

    const handleEnded = () => {
      console.log("Audio ended");
      setAudioPlaying(false);
    };

    const handleError = (e: Event) => {
      const target = e.target as HTMLAudioElement;
      console.error("Audio error details:", {
        error: target.error,
        src: target.src,
        networkState: target.networkState,
        readyState: target.readyState,
      });
      setAudioError(true);
      setAudioLoading(false);
      setAudioPlaying(false);
    };

    const handleLoadedMetadata = () => {
      console.log("Audio metadata loaded");
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    // Set audio source
    if (mantra.audio) {
      audio.src = mantra.audio;
      audio.load();
    } else {
      setAudioError(true);
      setAudioLoading(false);
    }

    // Cleanup
    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.pause();
    };
  }, [mantra]); // ✅ Sirf mantra change pe trigger hoga

  // ---------------- AUDIO CONTROL ----------------
  const toggleAudio = async () => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    try {
      if (audio.paused) {
        setAudioLoading(true);

        // Ensure audio is loaded
        if (audio.readyState < 3) {
          await audio.load();
        }

        // Play with user interaction
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("Playback started successfully");
              setAudioLoading(false);
            })
            .catch((error) => {
              console.log("Playback failed:", error);
              setAudioError(true);
              setAudioLoading(false);
            });
        }
      } else {
        audio.pause();
      }
    } catch (err) {
      console.log("Audio error:", err);
      setAudioError(true);
      setAudioLoading(false);
    }
  };

  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[40vh] overflow-hidden">
      <div className="absolute inset-0">
        {images.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
              i === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === currentIndex ? "bg-white" : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="relative h-full flex items-center justify-center px-6 py-24">
        <div className="max-w-3xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm">
            <Shield className="w-4 h-4 text-amber-200" />
            <span className="text-xs text-white font-medium">
              TRUSTED SINCE 2005
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white">
            Moksha Voyage
          </h1>

          <h2 className="text-xl md:text-3xl text-white/90">
            A Journey of Dignity,
            <span className="text-amber-200"> Ritual & Remembrance</span>
          </h2>

          {mantra && (
            <div
              key={currentIndex}
              className="mt-1 rounded-xl p-6  animate-fadeIn"
            >
              <h3 className="text-amber-200 text-lg font-semibold mb-3 flex items-center justify-center gap-2">
                <span>🌼</span>
                {currentIndex === 0
                  ? "Morning Mantra"
                  : currentIndex === 1
                    ? "Evening Mantra"
                    : currentIndex === 2
                      ? "Peace Mantra"
                      : "Blessing Mantra"}
                <span>🌼</span>
              </h3>

              <p className="text-white text-2xl font-serif leading-relaxed">
                {mantra.sanskrit}
              </p>

              <p className="text-white/80 text-sm mt-3 italic">
                {mantra.hindi}
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
    </section>
  );
}
