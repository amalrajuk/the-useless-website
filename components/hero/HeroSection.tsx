"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertOctagon, Sparkles, Eye, Users } from "lucide-react";
import { playSound } from "@/lib/sound";

interface Props {
  onDoNothingModal: () => void;
  onExploreClick: () => void;
}

export default function HeroSection({ onDoNothingModal, onExploreClick }: Props) {
  // Simulated live visitor counter
  const [visitorCount, setVisitorCount] = useState(42);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount((prev) => {
        // Randomly adjust between -2 and +3, keeping between 38 and 58
        const delta = Math.floor(Math.random() * 5) - 2;
        const next = prev + delta;
        return next < 35 ? 38 : next > 65 ? 54 : next;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Format visitor count with leading zeros (e.g., 000042)
  const formattedCount = String(visitorCount).padStart(6, "0");

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 md:pt-14 md:pb-20 border-b-4 border-carbon bg-paper">
      {/* Neo-brutalist background decorative grids & shapes */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "radial-gradient(#171717 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Floating silly sticker tags (Desktop) */}
      <div className="hidden lg:block absolute top-12 left-8 -rotate-6 pointer-events-none">
        <span className="inline-block bg-sunshine border-3 border-carbon px-3 py-1 font-mono text-xs font-black uppercase shadow-brutal tracking-wider">
          ★ 0% UTILITY GUARANTEE
        </span>
      </div>

      <div className="hidden lg:block absolute top-16 right-10 rotate-8 pointer-events-none">
        <span className="inline-block bg-secondary border-3 border-carbon px-3 py-1 font-mono text-xs font-black uppercase shadow-brutal tracking-wider">
          🔥 WASTING TIME SINCE 2026
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10 text-center">
        {/* Small top label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border-3 border-carbon shadow-brutal-sm mb-5 max-w-full"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse flex-shrink-0" />
          <span className="font-mono text-[10px] xs:text-xs md:text-sm font-black tracking-wider sm:tracking-widest text-carbon uppercase truncate">
            AN EXPERIMENT IN ABSOLUTELY NOTHING
          </span>
          <Sparkles className="w-3.5 h-3.5 text-accent flex-shrink-0" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-black text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-carbon uppercase leading-tight sm:leading-[0.95] max-w-5xl mx-auto break-words"
        >
          THE INTERNET&apos;S{" "}
          <span className="relative inline-block text-primary underline decoration-carbon decoration-wavy decoration-3 sm:decoration-4">
            MOST USELESS
          </span>{" "}
          WEBSITE.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 sm:mt-6 text-base sm:text-xl md:text-2xl font-bold text-carbon/80 max-w-2xl mx-auto leading-relaxed px-2"
        >
          We spent countless hours creating something that serves absolutely no purpose.
        </motion.p>

        {/* Live visitor counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 sm:mt-8 inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-white p-3 sm:px-5 sm:py-2.5 rounded-2xl border-3 border-carbon shadow-brutal max-w-full"
        >
          <div className="flex items-center gap-2 text-carbon">
            <Users className="w-4 h-4 text-primary animate-bounce flex-shrink-0" />
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider">
              People currently wasting their time:
            </span>
          </div>

          <div className="flex items-center gap-1 font-mono font-black text-xl sm:text-2xl tracking-widest bg-carbon text-secondary px-3 py-1 rounded-lg border-2 border-carbon">
            {formattedCount.split("").map((digit, i) => (
              <span key={i} className="inline-block transition-transform duration-300">
                {digit}
              </span>
            ))}
          </div>

          <span className="text-[10px] font-mono text-carbon/60 uppercase">
            (Locally simulated)
          </span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto w-full px-2"
        >
          <button
            type="button"
            onClick={() => {
              playSound("boing");
              onDoNothingModal();
            }}
            className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 bg-primary hover:bg-primary-hover text-white font-display font-black text-base sm:text-lg md:text-xl uppercase tracking-wider rounded-2xl border-4 border-carbon shadow-brutal-lg transition-all active:translate-x-1 active:translate-y-1 active:shadow-brutal hover:-translate-y-1 min-h-[48px] flex items-center justify-center"
            aria-label="Do absolutely nothing"
          >
            DO ABSOLUTELY NOTHING
          </button>

          <button
            type="button"
            onClick={() => {
              playSound("click");
              onExploreClick();
            }}
            className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 bg-secondary hover:bg-secondary-hover text-carbon font-display font-black text-base sm:text-lg md:text-xl uppercase tracking-wider rounded-2xl border-4 border-carbon shadow-brutal-lg transition-all active:translate-x-1 active:translate-y-1 active:shadow-brutal hover:-translate-y-1 min-h-[48px] flex items-center justify-center gap-2"
            aria-label="Explore useless features"
          >
            <Eye className="w-5 h-5 flex-shrink-0" />
            <span>I&apos;M CURIOUS</span>
          </button>
        </motion.div>
      </div>

      {/* Infinite scrolling announcement banner */}
      <div className="mt-10 sm:mt-12 bg-carbon text-white py-2.5 sm:py-3 border-y-4 border-carbon overflow-hidden select-none w-full">
        <div className="flex items-center whitespace-nowrap animate-marquee">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-6 sm:gap-8 mx-4">
              <span className="flex items-center gap-2 font-mono font-black text-xs sm:text-sm tracking-widest text-sunshine">
                <AlertOctagon className="w-4 h-4 text-primary flex-shrink-0" />
                WARNING: THIS WEBSITE MAY CAUSE PRODUCTIVITY LOSS.
              </span>
              <span className="font-mono text-xs font-bold text-white/70">★</span>
              <span className="font-mono font-bold text-xs sm:text-sm tracking-wider text-secondary">
                DO NOT USE FOR TAX PREPARATION.
              </span>
              <span className="font-mono text-xs font-bold text-white/70">★</span>
              <span className="font-mono font-bold text-xs sm:text-sm tracking-wider text-pink-400">
                RECOMMENDED BY 0% OF DOCTORS.
              </span>
              <span className="font-mono text-xs font-bold text-white/70">★</span>
              <span className="font-mono font-bold text-xs sm:text-sm tracking-wider text-cyanpop">
                YOUR TIME IS NON-REFUNDABLE.
              </span>
              <span className="font-mono text-xs font-bold text-white/70">★</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
