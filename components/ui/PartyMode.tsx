"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { X } from "lucide-react";
import { playSound } from "@/lib/sound";

interface Props {
  isActive: boolean;
  onDisable: () => void;
}

export default function PartyMode({ isActive, onDisable }: Props) {
  useEffect(() => {
    if (!isActive) return;

    playSound("chime");
    setTimeout(() => playSound("boing"), 300);

    // Blast confetti repeatedly
    const interval = setInterval(() => {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6, x: Math.random() },
        colors: ["#FF4D00", "#B7F000", "#784CFF", "#FFE600", "#FF3388"],
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-pink-500 via-yellow-400 via-green-400 via-purple-500 to-red-500 text-carbon py-2 sm:py-2.5 px-3 sm:px-4 border-b-4 border-carbon shadow-brutal flex items-center justify-between animate-pulse">
        <div className="flex items-center gap-1.5 sm:gap-2 font-display font-black text-xs sm:text-sm md:text-base tracking-wider uppercase truncate mx-auto">
          <span className="text-lg sm:text-xl flex-shrink-0">🪩</span>
          <span className="truncate">SECRET DISCO CHAOS MODE ACTIVATED!</span>
          <span className="text-lg sm:text-xl flex-shrink-0">🎉</span>
        </div>
        <button
          type="button"
          onClick={() => {
            playSound("click");
            onDisable();
          }}
          className="p-1 sm:p-1.5 bg-white text-carbon hover:bg-carbon hover:text-white rounded-lg border-2 border-carbon font-bold text-[10px] sm:text-xs uppercase shadow-brutal-sm ml-2 flex items-center gap-1 flex-shrink-0 min-h-[32px]"
          aria-label="Stop disco party"
        >
          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Stop</span>
        </button>
      </div>

      {/* Floating silly party stickers */}
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden max-w-full">
        {["🪩", "🥔", "🍌", "🚀", "🎉", "🤡", "🦄", "⭐"].map((emoji, idx) => (
          <div
            key={idx}
            className="absolute text-4xl sm:text-5xl animate-bounce select-none pointer-events-none"
            style={{
              top: `${15 + (idx * 11) % 70}%`,
              left: `${8 + (idx * 13) % 85}%`,
              animationDuration: `${1.2 + (idx % 3) * 0.4}s`,
            }}
          >
            {emoji}
          </div>
        ))}
      </div>
    </>
  );
}
