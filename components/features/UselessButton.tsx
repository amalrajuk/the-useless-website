"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointer } from "lucide-react";
import { playSound } from "@/lib/sound";
import { unlockAchievement, markFeatureExplored } from "@/lib/achievements";

const RESPONSES = [
  "Nothing happened.",
  "Impressive. You clicked a button.",
  "Your finger has successfully completed its mission.",
  "Scientists are still investigating your click.",
  "Please stop. The button is getting nervous.",
  "You are now 0% more productive.",
  "A server in Iceland cooled down by 0.000000001°C.",
  "Somewhere, a digital pigeon nodded in approval.",
  "That click was sent directly to our Recycle Bin.",
  "Congratulations, you have burned 0.002 calories.",
  "The button felt that. It didn't care.",
  "Error: Click too majestic for system to process.",
  "You are currently breaking world records in time wasting.",
  "We recorded your click. It has been filed under 'Whatever'.",
  "Are you proud of yourself? Because we aren't.",
  "Click received. Forwarding to the Ministry of Pointless Tasks.",
  "The button wishes you would call your grandmother instead.",
  "Quantum particles shifted slightly to the left.",
  "Warning: Continued clicking may cause finger enlightenment.",
  "A pixel just blinked in sympathy.",
  "You have successfully altered zero timelines.",
  "The button is filing a restraining order.",
];

export default function UselessButton() {
  const [clickCount, setClickCount] = useState(0);
  const [currentResponse, setCurrentResponse] = useState<string>(
    "Go ahead. It won't hurt. Or do anything."
  );
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);

    // Pick random response different from previous
    let randIndex = Math.floor(Math.random() * RESPONSES.length);
    while (RESPONSES[randIndex] === currentResponse && RESPONSES.length > 1) {
      randIndex = Math.floor(Math.random() * RESPONSES.length);
    }
    setCurrentResponse(RESPONSES[randIndex]);

    // Play silly sound
    const sounds: ("boing" | "click" | "pew" | "squeak")[] = ["boing", "click", "pew", "squeak"];
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    playSound(randomSound);

    // Spawn floating particle
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newId = Date.now() + Math.random();
    setParticles((prev) => [...prev.slice(-10), { id: newId, x, y }]);

    // Explore feature
    markFeatureExplored("button");

    // Check achievement for 20 clicks
    if (nextCount >= 20) {
      unlockAchievement("button_destroyer");
    }
  };

  return (
    <div className="bg-white border-4 border-carbon rounded-3xl p-5 sm:p-6 md:p-8 shadow-brutal-lg flex flex-col items-center text-center relative overflow-hidden">
      {/* Neo-brutalist header tag */}
      <div className="flex items-center justify-between w-full pb-4 border-b-3 border-carbon mb-5 sm:mb-6">
        <span className="font-mono text-xs font-black uppercase tracking-wider bg-primary text-white px-2.5 py-1 rounded-lg border-2 border-carbon">
          Feature 01: Physical Non-Event
        </span>
        <span className="font-mono text-xs font-bold text-carbon/70">
          Clicks: <strong className="text-carbon font-black">{clickCount}</strong>
        </span>
      </div>

      <h3 className="font-display font-black text-2xl xs:text-3xl md:text-4xl text-carbon uppercase">
        THE USELESS BUTTON
      </h3>
      <p className="text-xs sm:text-sm font-semibold text-carbon/70 mt-1 max-w-md">
        Engineered with cutting-edge non-functionality. Guaranteed zero outcomes.
      </p>

      {/* The Giant Button Container */}
      <div className="my-6 sm:my-8 relative">
        <motion.button
          type="button"
          onClick={handleClick}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.94 }}
          className="relative px-8 py-5 xs:px-10 xs:py-7 md:px-14 md:py-9 bg-primary hover:bg-primary-hover text-white font-display font-black text-2xl xs:text-4xl md:text-5xl uppercase tracking-widest rounded-3xl border-4 border-carbon shadow-brutal-xl transition-colors select-none active:translate-x-1 active:translate-y-1 active:shadow-brutal min-h-[56px]"
          aria-label="Click me for a useless reaction"
        >
          CLICK ME
        </motion.button>

        {/* Floating click particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0.5, y: 0 }}
            animate={{ opacity: 0, scale: 1.5, y: -60 }}
            transition={{ duration: 0.8 }}
            className="absolute pointer-events-none font-mono text-[10px] sm:text-xs font-black text-primary bg-sunshine border-2 border-carbon px-2 py-0.5 rounded shadow-brutal-sm"
            style={{ left: Math.max(10, p.x - 20), top: p.y - 40 }}
          >
            +0 PRODUCTIVITY
          </motion.div>
        ))}
      </div>

      {/* Randomized Response Display Box */}
      <div className="w-full max-w-lg bg-paper border-3 border-carbon rounded-2xl p-3.5 sm:p-4 shadow-brutal min-h-[64px] sm:min-h-[70px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentResponse}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="font-mono font-bold text-sm sm:text-base md:text-lg text-carbon px-2"
          >
            &ldquo;{currentResponse}&rdquo;
          </motion.p>
        </AnimatePresence>
      </div>

      {clickCount > 0 && (
        <div className="mt-3.5 sm:mt-4 flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold font-mono text-carbon/60">
          <MousePointer className="w-3.5 h-3.5 text-primary flex-shrink-0" />
          <span>Total wasted energy: ~{(clickCount * 0.002).toFixed(3)} calories</span>
        </div>
      )}
    </div>
  );
}
