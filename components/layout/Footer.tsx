"use client";

import React from "react";
import { ArrowUp, RefreshCw, AlertOctagon, Sparkles } from "lucide-react";
import { playSound } from "@/lib/sound";

interface Props {
  onResetAchievements: () => void;
  onOpenAchievements: () => void;
}

export default function Footer({ onResetAchievements, onOpenAchievements }: Props) {
  const scrollToTop = () => {
    playSound("click");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-carbon text-white border-t-6 border-carbon pt-12 pb-10 sm:pt-16 sm:pb-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 text-center space-y-6 sm:space-y-8 relative z-10">
        {/* Main brutalist statement */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 bg-secondary text-carbon font-mono text-[10px] sm:text-xs font-black uppercase px-3 py-1 rounded-full border-2 border-carbon shadow-brutal-sm">
            <AlertOctagon className="w-3.5 h-3.5 flex-shrink-0" />
            <span>DEAD END REACHED</span>
          </div>

          <h3 className="font-display font-black text-2xl xs:text-3xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight leading-tight px-2">
            YOU&apos;VE REACHED THE END.
            <br />
            <span className="text-secondary underline decoration-wavy decoration-primary">
              THERE IS NOTHING HERE EITHER.
            </span>
          </h3>

          <p className="font-mono text-sm sm:text-base md:text-lg font-bold text-white/70 max-w-xl mx-auto px-2">
            Designed for absolutely no reason.
          </p>
        </div>

        {/* Action Controls in Footer */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4">
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 bg-primary hover:bg-primary-hover text-white font-display font-black text-xs sm:text-sm uppercase rounded-2xl border-3 border-white shadow-brutal transition-transform active:translate-y-1 min-h-[44px]"
            aria-label="Scroll back to the top of the page"
          >
            <ArrowUp className="w-4 h-4" />
            <span>Back to Top</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playSound("click");
              onOpenAchievements();
            }}
            className="inline-flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 bg-secondary hover:bg-secondary-hover text-carbon font-display font-black text-xs sm:text-sm uppercase rounded-2xl border-3 border-white shadow-brutal transition-transform active:translate-y-1 min-h-[44px]"
            aria-label="View all trophies"
          >
            <Sparkles className="w-4 h-4" />
            <span>View All Trophies</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (confirm("Reset all unlocked useless achievements?")) {
                playSound("wrongBuzzer");
                onResetAchievements();
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-3.5 bg-white/10 hover:bg-red-600 text-white font-mono font-bold text-[11px] sm:text-xs uppercase rounded-2xl border-2 border-white/40 transition-colors min-h-[44px]"
            aria-label="Reset all achievements"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Achievements</span>
          </button>
        </div>

        {/* Separator line */}
        <div className="w-full border-t-2 border-white/20 my-6 sm:my-8" />

        {/* Bottom credits and statement */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 font-mono text-[11px] sm:text-xs text-white/60">
          <div className="flex items-center gap-2 font-black text-white/90">
            <span>Made with 100% unnecessary effort.</span>
          </div>

          <div className="text-center sm:text-right">
            <div>© {new Date().getFullYear()} The Internet&apos;s Most Useless Website.</div>
            <div className="text-[10px] text-white/40 mt-0.5">
              Zero rights reserved. None needed. No cookies were harmed.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
