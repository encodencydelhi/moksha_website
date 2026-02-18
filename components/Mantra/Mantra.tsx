"use client";

import React, { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import shlokas from "@/types/shlokas.json";

function Mantra() {
  const [mantra, setMantra] = useState<any>(null);

  useEffect(() => {
    const filteredMantras = shlokas.filter((m: any) => m.id !== 5);

    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - start.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

    const index = dayOfYear % filteredMantras.length;
    setMantra(filteredMantras[index]);
  }, []);

  if (!mantra) return null;

  return (
    <section className="mt-12 relative w-full py-1 px-4 overflow-hidden">
      <div className="absolute w-[320px] h-[140px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="flex flex-col items-center gap-0.5 mb-0">
          <div className="flex items-center gap-2 px-4 py-1 rounded-full">
            <BookOpen className="w-4 h-4 text-[#8B6A3E]" />
            <span className="text-[#8B6A3E] text-xs font-semibold tracking-wide">
              Daily Wisdom
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
            Today&apos;s Sacred Teaching
          </h2>

          <div className="flex items-center gap-3 mt-0">
            <div className="w-10 h-px bg-[#8B6A3E]/40"></div>
            <span className="text-[#8B6A3E] text-lg">ॐ</span>
            <div className="w-10 h-px bg-[#8B6A3E]/40"></div>
          </div>
        </div>

        <div className="relative rounded-xl p-3 md:p-4 animate-fadeIn">
          {/* Title */}
          <h3 className="text-[#8B6A3E] font-semibold text-base mb-2">
            {mantra.title}
          </h3>

          {/* Sanskrit */}
          <p className="text-xl md:text-2xl font-serif text-gray-900 leading-relaxed tracking-wide">
            {mantra.sanskrit}
          </p>

          {/* Divider */}
          <div className="my-2 flex items-center justify-center">
            <div className="w-12 h-px bg-[#8B6A3E]/40"></div>
          </div>

          {/* Hindi Meaning */}
          <div className="rounded-lg p-2">
            <p className="text-gray-800 text-sm md:text-base italic leading-relaxed">
              {mantra.hindi}
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-2 text-xs text-gray-500">
          Pause for a moment. Breathe. Let the meaning settle within.
        </p>
      </div>
    </section>
  );
}

export default Mantra;
