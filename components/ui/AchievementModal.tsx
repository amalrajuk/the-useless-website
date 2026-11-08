"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, RefreshCw, CheckCircle2, Lock } from "lucide-react";
import { Achievement } from "@/lib/achievements";
import { playSound } from "@/lib/sound";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  achievements: Achievement[];
  onReset: () => void;
}

export default function AchievementModal({
  isOpen,
  onClose,
  achievements,
  onReset,
}: Props) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        playSound("click");
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;
  const percentage = Math.round((unlockedCount / totalCount) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-carbon/60 backdrop-blur-sm"
          onClick={() => {
            playSound("click");
            onClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[88vh] sm:max-h-[85vh] bg-paper border-4 border-carbon shadow-brutal-xl rounded-2xl flex flex-col overflow-hidden"
          >
            {/* Modal Header */}
            <div className="bg-primary text-white p-3.5 sm:p-5 md:p-6 border-b-4 border-carbon flex items-center justify-between">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white text-carbon rounded-xl border-2 border-carbon flex items-center justify-center shadow-brutal-sm flex-shrink-0">
                  <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-primary fill-primary" />
                </div>
                <div>
                  <h3
                    id="modal-title"
                    className="font-display font-black text-xl sm:text-2xl tracking-wide uppercase leading-tight"
                  >
                    Useless Hall of Fame
                  </h3>
                  <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white/90">
                    Track your meaningless accomplishments
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  playSound("click");
                  onClose();
                }}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-white text-carbon hover:bg-carbon hover:text-white rounded-xl border-2 border-carbon flex items-center justify-center shadow-brutal-sm transition-transform active:translate-y-0.5 flex-shrink-0"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="p-3 sm:p-4 md:px-6 bg-white border-b-4 border-carbon">
              <div className="flex justify-between items-center text-xs sm:text-sm font-black uppercase mb-1.5 sm:mb-2">
                <span className="truncate">Progress: {unlockedCount} of {totalCount} Badges</span>
                <span className="bg-secondary px-2 py-0.5 rounded border-2 border-carbon text-[10px] sm:text-xs flex-shrink-0 ml-2">
                  {percentage}% Wasteful
                </span>
              </div>
              <div className="w-full h-4 sm:h-5 bg-background border-2 border-carbon rounded-full overflow-hidden p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-secondary rounded-full border border-carbon"
                />
              </div>
            </div>

            {/* Achievements List */}
            <div className="p-3 sm:p-4 md:p-6 overflow-y-auto space-y-2.5 sm:space-y-3 flex-1">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className={`p-3 rounded-xl border-3 border-carbon flex items-start gap-2.5 sm:gap-3 transition-all ${
                    ach.unlocked
                      ? "bg-secondary/30 shadow-brutal-sm"
                      : "bg-white/60 opacity-60"
                  }`}
                >
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl border-2 border-carbon flex items-center justify-center text-xl sm:text-2xl flex-shrink-0 ${
                      ach.unlocked ? "bg-secondary shadow-brutal-sm" : "bg-gray-200"
                    }`}
                  >
                    {ach.unlocked ? ach.icon : <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <h4 className="font-display font-black text-sm sm:text-base text-carbon">
                        {ach.title}
                      </h4>
                      {ach.unlocked && (
                        <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-black uppercase px-1.5 py-0.2 bg-primary text-white rounded border border-carbon">
                          <CheckCircle2 className="w-3 h-3" /> Unlocked
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-carbon/80 mt-0.5 font-medium leading-snug">
                      {ach.description}
                    </p>
                    {ach.unlocked && ach.unlockedAt && (
                      <p className="text-[9px] sm:text-[10px] font-mono text-carbon/50 mt-1">
                        Unlocked on: {new Date(ach.unlockedAt).toLocaleTimeString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:p-4 bg-background border-t-4 border-carbon flex flex-col xs:flex-row items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  if (confirm("Are you sure you want to erase all your pointless progress?")) {
                    playSound("wrongBuzzer");
                    onReset();
                  }
                }}
                className="w-full xs:w-auto inline-flex items-center justify-center gap-2 px-3 py-2 bg-white hover:bg-red-500 hover:text-white text-carbon text-xs font-bold uppercase rounded-lg border-2 border-carbon shadow-brutal-sm transition-all min-h-[40px]"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset All Progress
              </button>

              <button
                type="button"
                onClick={() => {
                  playSound("click");
                  onClose();
                }}
                className="w-full xs:w-auto px-5 py-2 bg-carbon text-white hover:bg-primary font-bold text-xs uppercase rounded-lg border-2 border-carbon shadow-brutal-sm transition-all min-h-[40px]"
              >
                Close Cabinet
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
