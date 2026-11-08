"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Compass } from "lucide-react";
import { playSound } from "@/lib/sound";
import { markFeatureExplored } from "@/lib/achievements";

const FORECASTS = [
  {
    condition: "100% chance of absolutely nothing.",
    temp: "42° KF",
    subtext: "Pack zero umbrellas and zero plans.",
    icon: "☁️",
    humidity: "100% Void",
    wind: "0 mph back",
    uv: "None (Inside)",
  },
  {
    condition: "Sunny with a chance of confusion.",
    temp: "Room Temp ± 90°",
    subtext: "Expect sudden bouts of staring blankly into space.",
    icon: "☀️",
    humidity: "Dry Humor",
    wind: "Indecision",
    uv: "Existential",
  },
  {
    condition: "Heavy rain of imaginary problems.",
    temp: "-0° C",
    subtext: "78% probability of overthinking an email sent 4 years ago.",
    icon: "🌧️",
    humidity: "High",
    wind: "Anxiety",
    uv: "0.0",
  },
  {
    condition: "Cloudy with no visible purpose.",
    temp: "98.6° Lukewarm",
    subtext: "The sky has checked out for the weekend.",
    icon: "⛅",
    humidity: "Undefined",
    wind: "Wrong Way",
    uv: "Irrelevant",
  },
  {
    condition: "99% Boredom with isolated yawns.",
    temp: "77° Shrug",
    subtext: "Atmospheric pressure is crushing your motivation.",
    icon: "🥱",
    humidity: "Stagnation",
    wind: "Sighs",
    uv: "Low battery",
  },
  {
    condition: "Scattered existential dread.",
    temp: "0 Chill",
    subtext: "Clear intervals of eating snacks directly from the fridge.",
    icon: "🌪️",
    humidity: "Saline",
    wind: "Spiraling",
    uv: "Dark mode",
  },
];

export default function UselessWeather() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    markFeatureExplored("weather");
  }, []);

  const handleNextForecast = () => {
    playSound("click");
    setIndex((prev) => (prev + 1) % FORECASTS.length);
  };

  const current = FORECASTS[index];

  return (
    <div className="bg-sunshine/20 border-4 border-carbon rounded-3xl p-5 sm:p-6 md:p-8 shadow-brutal-lg flex flex-col items-center text-center relative overflow-hidden">
      {/* Header tag */}
      <div className="flex items-center justify-between w-full pb-4 border-b-3 border-carbon mb-5 sm:mb-6">
        <span className="font-mono text-xs font-black uppercase tracking-wider bg-sunshine text-carbon px-2.5 py-1 rounded-lg border-2 border-carbon">
          Feature 04: Absurd Meteorology
        </span>
        <span className="font-mono text-xs font-bold text-carbon/70 uppercase">
          Nowhere, Void
        </span>
      </div>

      <h3 className="font-display font-black text-2xl xs:text-3xl md:text-4xl text-carbon uppercase">
        USELESS WEATHER FORECAST
      </h3>
      <p className="font-mono text-xs sm:text-sm font-bold text-carbon/70 mt-1 uppercase">
        Accurate to within ±100% of pure nonsense
      </p>

      {/* Weather Card Box */}
      <div className="my-5 sm:my-6 w-full max-w-md bg-white border-4 border-carbon rounded-3xl p-4 sm:p-6 shadow-brutal-xl relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b-2 border-carbon/20">
          <div className="flex items-center gap-1.5 text-xs font-mono font-black text-carbon uppercase">
            <Compass className="w-3.5 h-3.5 text-primary animate-spin" />
            <span className="truncate">Bureau of Absurdity</span>
          </div>
          <span className="text-[9px] sm:text-[10px] font-mono bg-secondary px-2 py-0.5 rounded border border-carbon font-bold flex-shrink-0">
            SIMULATED
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="py-3 sm:py-4 space-y-3 sm:space-y-4"
          >
            {/* Giant Weather Emoji & Temp */}
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <span className="text-5xl sm:text-6xl md:text-7xl animate-bounce">{current.icon}</span>
              <div className="text-left">
                <div className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-carbon leading-none">
                  {current.temp}
                </div>
                <div className="text-[10px] sm:text-xs font-mono font-bold text-carbon/60 uppercase mt-1">
                  Feels like: Disappointment
                </div>
              </div>
            </div>

            {/* Condition headline */}
            <div className="bg-paper p-3 rounded-xl border-2 border-carbon">
              <h4 className="font-display font-black text-base sm:text-lg md:text-xl text-primary uppercase leading-snug">
                &ldquo;{current.condition}&rdquo;
              </h4>
              <p className="text-xs font-semibold text-carbon/80 mt-1">
                {current.subtext}
              </p>
            </div>

            {/* Weather Metrics Grid */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-2 border-t-2 border-carbon/20 text-left">
              <div className="p-1.5 sm:p-2 bg-gray-50 rounded-lg border border-carbon overflow-hidden">
                <span className="text-[9px] font-mono text-carbon/60 block font-bold truncate">
                  HUMIDITY
                </span>
                <span className="font-mono text-[10px] sm:text-xs font-black text-carbon truncate block">
                  {current.humidity}
                </span>
              </div>
              <div className="p-1.5 sm:p-2 bg-gray-50 rounded-lg border border-carbon overflow-hidden">
                <span className="text-[9px] font-mono text-carbon/60 block font-bold truncate">
                  WIND
                </span>
                <span className="font-mono text-[10px] sm:text-xs font-black text-carbon truncate block">
                  {current.wind}
                </span>
              </div>
              <div className="p-1.5 sm:p-2 bg-gray-50 rounded-lg border border-carbon overflow-hidden">
                <span className="text-[9px] font-mono text-carbon/60 block font-bold truncate">
                  UV INDEX
                </span>
                <span className="font-mono text-[10px] sm:text-xs font-black text-carbon truncate block">
                  {current.uv}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Disclaimer */}
        <div className="mt-2.5 text-[9px] sm:text-[10px] font-mono text-carbon/50 bg-paper/50 p-1.5 rounded">
          ⚠️ Disclaimer: This weather will not affect outside conditions.
        </div>
      </div>

      <button
        type="button"
        onClick={handleNextForecast}
        className="inline-flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3 bg-sunshine hover:bg-yellow-400 text-carbon font-display font-black text-xs sm:text-sm uppercase rounded-xl border-3 border-carbon shadow-brutal transition-transform active:translate-y-0.5 min-h-[44px]"
        aria-label="Refresh fake radar and get another weather forecast"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Consult Fake Radar</span>
      </button>
    </div>
  );
}
