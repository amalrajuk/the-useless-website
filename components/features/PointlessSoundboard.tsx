"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { playSound, isAudioMuted, toggleAudioMuted, onMuteChange } from "@/lib/sound";
import { unlockAchievement, markFeatureExplored } from "@/lib/achievements";

interface SoundPad {
  id: string;
  name: string;
  emoji: string;
  soundType:
    | "boing"
    | "sadTrombone"
    | "applause"
    | "wrongBuzzer"
    | "dramatic"
    | "pew"
    | "squeak"
    | "alarm";
  color: string;
  desc: string;
}

const PADS: SoundPad[] = [
  {
    id: "boing",
    name: "Cartoon Boing",
    emoji: "🦘",
    soundType: "boing",
    color: "bg-sunshine",
    desc: "Physics defying spring",
  },
  {
    id: "sadTrombone",
    name: "Sad Trombone",
    emoji: "🎺",
    soundType: "sadTrombone",
    color: "bg-red-400 text-white",
    desc: "Wah-wah-waaah of defeat",
  },
  {
    id: "applause",
    name: "Tiny Applause",
    emoji: "👏",
    soundType: "applause",
    color: "bg-secondary",
    desc: "Polite golf clap",
  },
  {
    id: "wrongBuzzer",
    name: "Wrong Answer",
    emoji: "❌",
    soundType: "wrongBuzzer",
    color: "bg-primary text-white",
    desc: "Game show humiliation",
  },
  {
    id: "dramatic",
    name: "Dun-Dun-Duuun",
    emoji: "😱",
    soundType: "dramatic",
    color: "bg-accent text-white",
    desc: "Orchestral plot twist",
  },
  {
    id: "pew",
    name: "Space Laser",
    emoji: "🔫",
    soundType: "pew",
    color: "bg-cyanpop",
    desc: "Retro 8-bit zap",
  },
  {
    id: "squeak",
    name: "Squeaky Toy",
    emoji: "🐤",
    soundType: "squeak",
    color: "bg-pink-300",
    desc: "Dog toy panic",
  },
  {
    id: "alarm",
    name: "Siren Alert",
    emoji: "🚨",
    soundType: "alarm",
    color: "bg-red-500 text-white",
    desc: "Emergency nothing",
  },
];

export default function PointlessSoundboard() {
  const [muted, setMuted] = useState(false);
  const [activePad, setActivePad] = useState<string | null>(null);
  const [playedPads, setPlayedPads] = useState<Set<string>>(new Set());

  useEffect(() => {
    markFeatureExplored("soundboard");
    setMuted(isAudioMuted());
    const unsub = onMuteChange((m) => setMuted(m));
    return () => unsub();
  }, []);

  const handlePlay = (pad: SoundPad) => {
    setActivePad(pad.id);
    playSound(pad.soundType);

    setPlayedPads((prev) => {
      const updated = new Set(prev).add(pad.id);
      if (updated.size >= PADS.length) {
        unlockAchievement("sound_maestro");
      }
      return updated;
    });

    setTimeout(() => {
      setActivePad((cur) => (cur === pad.id ? null : cur));
    }, 600);
  };

  const handleToggleMute = () => {
    const next = toggleAudioMuted();
    setMuted(next);
  };

  return (
    <div className="bg-white border-4 border-carbon rounded-3xl p-5 sm:p-6 md:p-8 shadow-brutal-lg flex flex-col items-center text-center relative overflow-hidden">
      {/* Header tag */}
      <div className="flex items-center justify-between w-full pb-4 border-b-3 border-carbon mb-5 sm:mb-6">
        <span className="font-mono text-xs font-black uppercase tracking-wider bg-carbon text-secondary px-2.5 py-1 rounded-lg border-2 border-carbon">
          Feature 08: Auditory Futility
        </span>
        <button
          type="button"
          onClick={handleToggleMute}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1 rounded-lg border-2 border-carbon text-[11px] sm:text-xs font-mono font-bold uppercase min-h-[36px] ${
            muted ? "bg-red-100 text-red-600" : "bg-secondary text-carbon"
          }`}
          aria-label={muted ? "Unmute sound effects" : "Mute sound effects"}
        >
          {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          <span>{muted ? "Muted" : "Sound On"}</span>
        </button>
      </div>

      <h3 className="font-display font-black text-2xl xs:text-3xl md:text-4xl text-carbon uppercase">
        POINTLESS SOUND MACHINE
      </h3>
      <p className="font-mono text-xs sm:text-sm font-bold text-carbon/70 mt-1 uppercase">
        Synthesized in real-time. Zero external audio downloads.
      </p>

      {/* Audio Visualizer Simulator */}
      <div className="my-5 sm:my-6 flex items-center justify-center gap-1.5 h-9 sm:h-10 w-full max-w-xs bg-paper border-2 border-carbon rounded-xl px-4">
        {[40, 75, 20, 90, 60, 30, 85, 45, 95, 35, 70, 50].map((h, i) => (
          <motion.div
            key={i}
            animate={{
              height: activePad && !muted ? `${Math.max(10, Math.random() * h)}%` : "15%",
            }}
            transition={{ duration: 0.15 }}
            className={`w-2 rounded-full border border-carbon ${
              activePad ? "bg-primary" : "bg-carbon/20"
            }`}
          />
        ))}
      </div>

      {/* 8-Pad Soundboard Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 w-full max-w-2xl my-2">
        {PADS.map((pad) => {
          const isPlaying = activePad === pad.id;
          return (
            <motion.button
              key={pad.id}
              type="button"
              onClick={() => handlePlay(pad)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Play ${pad.name}: ${pad.desc}`}
              className={`p-3 sm:p-4 rounded-2xl border-3 border-carbon shadow-brutal flex flex-col items-center justify-between min-h-[96px] sm:min-h-[110px] transition-all ${
                pad.color
              } ${isPlaying ? "translate-x-0.5 translate-y-0.5 shadow-brutal-hover ring-4 ring-carbon" : ""}`}
            >
              <span className="text-2xl sm:text-3xl mb-1">{pad.emoji}</span>
              <div className="font-display font-black text-xs sm:text-sm uppercase leading-tight">
                {pad.name}
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono font-semibold opacity-80 mt-1 truncate max-w-full">
                {pad.desc}
              </span>
            </motion.button>
          );
        })}
      </div>

      <p className="text-[11px] sm:text-xs font-mono font-bold text-carbon/60 mt-3 sm:mt-4">
        Played {playedPads.size} of {PADS.length} sounds • No audio is auto-played.
      </p>
    </div>
  );
}
