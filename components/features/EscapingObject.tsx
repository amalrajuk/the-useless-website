"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playSound } from "@/lib/sound";
import { unlockAchievement, markFeatureExplored } from "@/lib/achievements";

export default function EscapingObject() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 }); // percentage
  const [dodgeCount, setDodgeCount] = useState(0);
  const [caught, setCaught] = useState(false);
  const [mood, setMood] = useState<"happy" | "scared" | "mocking">("happy");
  const lastTouchTime = useRef(0);

  useEffect(() => {
    markFeatureExplored("runaway");
  }, []);

  const dodge = useCallback(
    (clientX: number, clientY: number) => {
      if (caught) return;
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const currentPixelX = rect.left + (pos.x / 100) * rect.width;
      const currentPixelY = rect.top + (pos.y / 100) * rect.height;

      const dx = clientX - currentPixelX;
      const dy = clientY - currentPixelY;
      const dist = Math.hypot(dx, dy);

      // Trigger threshold: 110px
      if (dist < 110) {
        let newX = Math.random() * 75 + 12;
        let newY = Math.random() * 65 + 18;

        // Ensure it doesn't jump directly under cursor/finger
        while (
          Math.hypot(
            rect.left + (newX / 100) * rect.width - clientX,
            rect.top + (newY / 100) * rect.height - clientY
          ) < 120
        ) {
          newX = Math.random() * 75 + 12;
          newY = Math.random() * 65 + 18;
        }

        setPos({ x: newX, y: newY });
        const nextDodges = dodgeCount + 1;
        setDodgeCount(nextDodges);
        setMood(nextDodges % 2 === 0 ? "scared" : "mocking");
        playSound("squeak");

        if (nextDodges >= 8) {
          unlockAchievement("persistent_stalker");
        }
      }
    },
    [pos, dodgeCount, caught]
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    dodge(e.clientX, e.clientY);
  };

  const handleTouch = (e: React.TouchEvent) => {
    if (e.touches && e.touches[0]) {
      dodge(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleCatch = (e?: React.SyntheticEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const now = Date.now();
    if (now - lastTouchTime.current < 400) return; // Prevent duplicate touch+click
    lastTouchTime.current = now;

    if (caught) return;
    setCaught(true);
    playSound("boing");
    playSound("chime");
    unlockAchievement("persistent_stalker");

    const timer = setTimeout(() => {
      setCaught(false);
      setPos({ x: 50, y: 50 });
      setMood("happy");
    }, 4000);

    return () => clearTimeout(timer);
  };

  return (
    <div className="bg-white border-4 border-carbon rounded-3xl p-5 sm:p-6 md:p-8 shadow-brutal-lg flex flex-col items-center text-center relative overflow-hidden">
      {/* Header tag */}
      <div className="flex items-center justify-between w-full pb-4 border-b-3 border-carbon mb-4">
        <span className="font-mono text-xs font-black uppercase tracking-wider bg-accent text-white px-2.5 py-1 rounded-lg border-2 border-carbon">
          Feature 03: Elusive Entity
        </span>
        <span className="font-mono text-xs font-bold text-carbon/70">
          Dodges: <strong className="text-carbon font-black">{dodgeCount}</strong>
        </span>
      </div>

      <h3 className="font-display font-black text-2xl xs:text-3xl md:text-4xl text-carbon uppercase">
        THE ESCAPING OBJECT
      </h3>
      <p className="font-mono text-xs sm:text-sm font-bold text-primary mt-1 uppercase tracking-wider">
        &ldquo;TRY TO CATCH ME.&rdquo;
      </p>

      {/* Escaping Play Arena */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouch}
        onTouchMove={handleTouch}
        className="w-full h-64 sm:h-72 md:h-80 bg-paper border-4 border-carbon rounded-2xl relative overflow-hidden my-5 sm:my-6 select-none cursor-crosshair shadow-inner touch-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e5e5e5 1px, transparent 1px), linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        {/* Dodge count watermark */}
        <div className="absolute top-2.5 left-2.5 font-mono text-[10px] sm:text-[11px] font-black uppercase text-carbon/50 bg-white/80 px-2 py-0.5 rounded border border-carbon max-w-[85%] truncate">
          {dodgeCount === 0
            ? "Hover or tap near orb to test reflexes"
            : `Dodged ${dodgeCount} times • Speed: 99.9%`}
        </div>

        {/* The Escaping Character */}
        <motion.div
          animate={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 28,
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer touch-manipulation"
          onClick={handleCatch}
          onTouchStart={handleCatch}
        >
          <button
            type="button"
            aria-label="Escaping target character. Click or tap to catch."
            className={`w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full border-4 border-carbon shadow-brutal flex flex-col items-center justify-center transition-transform focus:outline-none ${
              caught ? "bg-red-400 rotate-12 scale-110" : "bg-sunshine hover:scale-105 active:scale-95"
            }`}
          >
            {/* Eyes */}
            <div className="flex gap-2 sm:gap-2.5 items-center">
              <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-white border-2 border-carbon rounded-full flex items-center justify-center">
                <div
                  className={`w-1.5 h-1.5 bg-carbon rounded-full ${
                    mood === "mocking" ? "translate-x-0.5" : ""
                  }`}
                />
              </div>
              <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-white border-2 border-carbon rounded-full flex items-center justify-center">
                <div
                  className={`w-1.5 h-1.5 bg-carbon rounded-full ${
                    mood === "mocking" ? "translate-x-0.5" : ""
                  }`}
                />
              </div>
            </div>

            {/* Mouth */}
            <div className="mt-0.5 text-xs font-black">
              {caught ? "😵" : mood === "mocking" ? "😜" : mood === "scared" ? "😱" : "🙂"}
            </div>

            {/* Running feet */}
            <div className="flex gap-3 sm:gap-4 -mb-2.5 text-[9px] sm:text-[10px]">
              <span className="inline-block animate-bounce">👟</span>
              <span
                className="inline-block animate-bounce"
                style={{ animationDelay: "0.15s" }}
              >
                👟
              </span>
            </div>
          </button>
        </motion.div>

        {/* Caught message overlay */}
        <AnimatePresence>
          {caught && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute inset-0 bg-carbon/85 backdrop-blur-xs flex flex-col items-center justify-center text-white p-4"
            >
              <span className="text-3xl sm:text-4xl animate-bounce mb-2">🎉</span>
              <h4 className="font-display font-black text-xl sm:text-2xl uppercase text-sunshine text-center">
                IMPOSSIBLE! YOU CAUGHT ME!
              </h4>
              <p className="font-mono text-xs font-bold text-white/90 mt-1 text-center max-w-xs">
                You possess superhuman click precision. Taking a 4-second breather.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="text-[11px] sm:text-xs font-mono font-bold text-carbon/60">
        Desktop: Move mouse quickly • Mobile: Tap near it to chase
      </p>
    </div>
  );
}
