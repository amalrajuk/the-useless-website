"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Trophy, Sparkles, Wifi, WifiOff } from "lucide-react";
import { isAudioMuted, toggleAudioMuted, playSound, onMuteChange } from "@/lib/sound";
import { unlockAchievement } from "@/lib/achievements";

interface Props {
  onOpenAchievements: () => void;
  unlockedCount: number;
  totalAchievements: number;
  onTriggerParty: () => void;
  onDoNothingModal: () => void;
}

export default function Navbar({
  onOpenAchievements,
  unlockedCount,
  totalAchievements,
  onTriggerParty,
  onDoNothingModal,
}: Props) {
  const [muted, setMuted] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "lost" | "searching">("connected");

  useEffect(() => {
    setMuted(isAudioMuted());
    const unsub = onMuteChange((newMuted) => setMuted(newMuted));

    // Fluctuate connection status randomly
    const interval = setInterval(() => {
      const rand = Math.random();
      if (rand < 0.2) {
        setConnectionStatus("lost");
      } else if (rand < 0.35) {
        setConnectionStatus("searching");
      } else {
        setConnectionStatus("connected");
      }
    }, 12000);

    return () => {
      unsub();
      clearInterval(interval);
    };
  }, []);

  const handleLogoClick = () => {
    playSound("click");
    const next = logoClicks + 1;
    setLogoClicks(next);

    if (next >= 7) {
      setLogoClicks(0);
      unlockAchievement("secret_disco");
      onTriggerParty();
    } else {
      playSound("squeak");
    }
  };

  const handleToggleSound = () => {
    const isNowMuted = toggleAudioMuted();
    setMuted(isNowMuted);
    if (!isNowMuted) {
      playSound("click");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-paper border-b-4 border-carbon">
      {/* Top micro-announcement banner */}
      <div className="bg-carbon text-secondary py-1 px-3 text-[10px] sm:text-[11px] font-mono font-bold tracking-wider sm:tracking-widest flex items-center justify-between overflow-hidden select-none">
        <div className="flex items-center gap-2 truncate">
          <span className="w-2 h-2 rounded-full bg-secondary animate-ping flex-shrink-0" />
          <span className="truncate">OFFICIAL DOMAIN OF ZERO PRODUCTIVITY • 100% UNNECESSARY CODE • 0 COOKIES</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-white/80 flex-shrink-0">
          <span>SERVER: VOID-NODE-42</span>
          <span>LATENCY: ∞ ms</span>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-1.5 sm:gap-4">
        {/* Logo with secret click counter */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={handleLogoClick}
            className="group relative flex items-center gap-1.5 sm:gap-2 bg-primary text-white px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl border-3 border-carbon shadow-brutal transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-brutal-hover"
            title="Click 7 times for a surprise..."
            aria-label="Useless.net logo. Click 7 times for secret disco mode."
          >
            <span className="font-display font-black text-lg xs:text-xl md:text-2xl tracking-tight uppercase group-hover:rotate-6 transition-transform inline-block">
              USELESS<span className="text-secondary">.NET</span>
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono bg-carbon px-1 py-0.5 rounded text-white font-bold hidden sm:inline-block">
              v0.0.0
            </span>

            {logoClicks > 0 && (
              <span className="absolute -top-2.5 -right-2 bg-sunshine text-carbon text-[9px] font-black px-1.5 py-0.2 rounded-full border-2 border-carbon animate-bounce">
                {logoClicks}/7
              </span>
            )}
          </button>

          {/* Fake Connection indicator (Desktop) */}
          <div
            className={`hidden lg:flex items-center gap-2 px-3 py-1 rounded-lg border-2 border-carbon text-xs font-mono font-bold ${
              connectionStatus === "connected"
                ? "bg-secondary text-carbon"
                : connectionStatus === "searching"
                ? "bg-sunshine text-carbon"
                : "bg-red-500 text-white"
            }`}
          >
            {connectionStatus === "connected" && (
              <>
                <Wifi className="w-3.5 h-3.5 animate-pulse" />
                <span>Connected to Nothing</span>
              </>
            )}
            {connectionStatus === "searching" && (
              <>
                <Wifi className="w-3.5 h-3.5 animate-spin" />
                <span>Searching for Void...</span>
              </>
            )}
            {connectionStatus === "lost" && (
              <>
                <WifiOff className="w-3.5 h-3.5" />
                <span>Lost to Nothing</span>
              </>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Quick "Do Nothing" CTA */}
          <button
            type="button"
            onClick={() => {
              playSound("boing");
              onDoNothingModal();
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary hover:bg-secondary-hover text-carbon font-display font-black text-xs uppercase rounded-xl border-3 border-carbon shadow-brutal transition-transform active:translate-y-0.5"
            aria-label="Open Zen Nothingness mode"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Do Nothing</span>
          </button>

          {/* Achievement Cabinet Button */}
          <button
            type="button"
            onClick={() => {
              playSound("click");
              onOpenAchievements();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-white hover:bg-paper text-carbon font-display font-black text-xs uppercase rounded-xl border-3 border-carbon shadow-brutal transition-transform active:translate-y-0.5"
            aria-label={`Open achievements cabinet. ${unlockedCount} of ${totalAchievements} unlocked.`}
          >
            <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary fill-primary flex-shrink-0" />
            <span className="hidden xs:inline">Trophies</span>
            <span className="bg-primary text-white px-1.5 py-0.2 rounded font-mono text-[10px] sm:text-[11px] font-bold">
              {unlockedCount}/{totalAchievements}
            </span>
          </button>

          {/* Audio Mute/Unmute Toggle */}
          <button
            type="button"
            onClick={handleToggleSound}
            className={`p-1.5 sm:p-2 rounded-xl border-3 border-carbon shadow-brutal transition-transform active:translate-y-0.5 ${
              muted ? "bg-red-100 text-red-600" : "bg-white text-carbon hover:bg-secondary/40"
            }`}
            title={muted ? "Unmute sound effects" : "Mute sound effects"}
            aria-label={muted ? "Unmute sound effects" : "Mute sound effects"}
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
