"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, FastForward, Zap } from "lucide-react";
import { playSound } from "@/lib/sound";
import { markFeatureExplored } from "@/lib/achievements";

export default function BackwardsCounter() {
  const [count, setCount] = useState(1000);
  const [isRunning, setIsRunning] = useState(true);
  const [speed, setSpeed] = useState<"normal" | "fast" | "turbo">("normal");

  useEffect(() => {
    markFeatureExplored("counter");
  }, []);

  useEffect(() => {
    if (!isRunning || count <= 0) return;

    const delay = speed === "turbo" ? 15 : speed === "fast" ? 60 : 180;
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          playSound("sadTrombone");
          return 0;
        }
        return prev - 1;
      });
    }, delay);

    return () => clearInterval(interval);
  }, [isRunning, count, speed]);

  const handleRestart = () => {
    playSound("click");
    setCount(1000);
    setIsRunning(true);
  };

  const handleSkipNearZero = () => {
    playSound("pew");
    setCount(5);
    setIsRunning(true);
  };

  return (
    <div className="bg-secondary/20 border-4 border-carbon rounded-3xl p-5 sm:p-6 md:p-8 shadow-brutal-lg flex flex-col items-center text-center relative overflow-hidden">
      {/* Header tag */}
      <div className="flex items-center justify-between w-full pb-4 border-b-3 border-carbon mb-5 sm:mb-6">
        <span className="font-mono text-xs font-black uppercase tracking-wider bg-carbon text-secondary px-2.5 py-1 rounded-lg border-2 border-carbon">
          Feature 02: Negative Chronology
        </span>
        <span className="font-mono text-[10px] sm:text-xs font-bold text-carbon/70 uppercase">
          {count === 0 ? "Target Reached" : isRunning ? "Depleting..." : "Paused"}
        </span>
      </div>

      <h3 className="font-display font-black text-2xl xs:text-3xl md:text-4xl text-carbon uppercase">
        BACKWARDS COUNTER
      </h3>
      <p className="font-mono text-xs sm:text-sm font-bold text-carbon/80 mt-1 uppercase tracking-wide">
        &ldquo;Counting down to absolutely nothing.&rdquo;
      </p>

      {/* Main Counter Display */}
      <div className="my-5 sm:my-8 w-full max-w-md bg-white border-4 border-carbon rounded-3xl p-5 sm:p-6 shadow-brutal-xl">
        {count > 0 ? (
          <div>
            <div className="font-mono font-black text-5xl xs:text-6xl sm:text-7xl lg:text-8xl text-carbon tracking-tight">
              {String(count).padStart(4, "0")}
            </div>
            <p className="font-mono text-[10px] sm:text-xs font-bold uppercase text-carbon/50 mt-2">
              Units of Nothing Remaining
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-2 py-2"
          >
            <div className="text-4xl animate-bounce">🎊</div>
            <h4 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-primary uppercase">
              Congratulations.
            </h4>
            <p className="font-mono font-bold text-sm sm:text-base text-carbon">
              Nothing happened.
            </p>
            <p className="text-xs font-semibold text-carbon/70">
              Zero surprises were delivered. As promised.
            </p>
          </motion.div>
        )}
      </div>

      {/* Interactive Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 w-full">
        {count > 0 ? (
          <>
            <button
              type="button"
              onClick={() => {
                playSound("click");
                setIsRunning(!isRunning);
              }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2.5 sm:px-4 sm:py-2.5 bg-white hover:bg-carbon hover:text-white text-carbon font-display font-black text-xs uppercase rounded-xl border-3 border-carbon shadow-brutal transition-transform active:translate-y-0.5 min-h-[44px]"
              aria-label={isRunning ? "Pause backwards countdown" : "Resume backwards countdown"}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isRunning ? "Pause" : "Resume"}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playSound("click");
                setSpeed((s) => (s === "normal" ? "fast" : s === "fast" ? "turbo" : "normal"));
              }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2.5 sm:px-4 sm:py-2.5 bg-sunshine hover:bg-yellow-400 text-carbon font-display font-black text-xs uppercase rounded-xl border-3 border-carbon shadow-brutal transition-transform active:translate-y-0.5 min-h-[44px]"
              aria-label={`Toggle speed. Current speed is ${speed}`}
            >
              <Zap className="w-4 h-4" />
              <span>Speed: {speed.toUpperCase()}</span>
            </button>

            <button
              type="button"
              onClick={handleSkipNearZero}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2.5 sm:px-4 sm:py-2.5 bg-paper hover:bg-carbon hover:text-white text-carbon font-display font-black text-xs uppercase rounded-xl border-3 border-carbon shadow-brutal transition-transform active:translate-y-0.5 min-h-[44px]"
              title="Skip straight to 5 to see the disappointment faster"
              aria-label="Skip countdown near zero"
            >
              <FastForward className="w-4 h-4" />
              <span>Fast-Forward</span>
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3 bg-secondary hover:bg-secondary-hover text-carbon font-display font-black text-xs sm:text-sm uppercase rounded-xl border-3 border-carbon shadow-brutal transition-transform active:translate-y-0.5 min-h-[44px]"
            aria-label="Restart countdown to nothing"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restart Countdown to Nothing</span>
          </button>
        )}
      </div>
    </div>
  );
}
