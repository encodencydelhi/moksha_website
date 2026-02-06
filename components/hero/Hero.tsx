"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Shield } from "lucide-react";

export default function Hero() {
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

  useEffect(() => {
    const nextIndex = (currentIndex + 1) % images.length;
    const img = new Image();
    img.src = images[nextIndex];
  }, [currentIndex, images]);

  return (
    <section className="relative w-full min-h-[40vh] sm:min-h-[60vh] md:min-h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        {images.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out ${
              i === currentIndex ? "opacity-100 z-0" : "opacity-0 z-0"
            }`}
            style={{
              backgroundImage: `url(${img})`,
              willChange: "opacity",
            }}
            aria-hidden={i !== currentIndex}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />

      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-black/30 hover:bg-black/50 transition-colors duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-black/30 hover:bg-black/50 transition-colors duration-200"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </button>

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-3 sm:top-4 right-3 sm:right-4 z-30 p-2 sm:p-2.5 rounded-full bg-black/30 hover:bg-black/50 transition-colors duration-200"
        aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        {isPlaying ? (
          <Pause className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
        ) : (
          <Play className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
        )}
      </button>

      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-1.5 sm:gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors duration-200 ${
              i === currentIndex ? "bg-white" : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="relative h-full flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-3xl text-center space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/20 backdrop-blur-sm">
            <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-200" />
            <span className="text-xs text-white font-medium tracking-wide">
              TRUSTED SINCE 2005
            </span>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif font-bold text-white leading-tight">
              Moksha
            </h1>
            <div className="h-px w-16 sm:w-20 bg-amber-200/50 mx-auto" />
            <h2 className="text-lg sm:text-2xl md:text-3xl font-light text-white/90 leading-snug">
              A Journey of Dignity,
              <br className="hidden sm:block" />
              <span className="text-amber-200 font-normal">
                {" "}
                Ritual & Remembrance
              </span>
            </h2>
          </div>

          <p className="max-w-xl mx-auto text-sm sm:text-base md:text-lg text-white/80 font-light leading-relaxed px-2 sm:px-0">
            End-to-end funeral, cremation & sacred ritual services — in India
            and across borders. Supporting you with compassion and expertise.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-amber-800 to-amber-700 text-white rounded-lg font-medium text-sm sm:text-base">
              Reach Out for Support
            </button>
            <button className="px-6 sm:px-8 py-2.5 sm:py-3 border border-white/40 text-white rounded-lg font-medium text-sm sm:text-base hover:bg-white/10">
              Speak to Our Care Team
            </button>
          </div>
        </div>
      </div>

      {currentIndex === 0 && (
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-4 h-6 sm:w-5 sm:h-8 border border-white/30 rounded-full flex justify-center">
            <div className="w-0.5 h-1.5 sm:h-2 bg-white/60 rounded-full mt-1.5 sm:mt-2" />
          </div>
        </div>
      )}
    </section>
  );
}
