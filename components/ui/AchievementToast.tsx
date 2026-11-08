"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, Sparkles } from "lucide-react";
import { Achievement } from "@/lib/achievements";

interface Props {
  achievement: Achievement | null;
  onClose: () => void;
}

export default function AchievementToast({ achievement, onClose }: Props) {
  useEffect(() => {
    if (!achievement) return;
    const timer = setTimeout(() => {
      onClose();
    }, 5500);
    return () => clearTimeout(timer);
  }, [achievement, onClose]);

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, y: -30, scale: 0.9, rotate: 2 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed top-18 sm:top-20 right-3 sm:right-6 md:right-8 z-50 max-w-sm w-[calc(100vw-1.5rem)] bg-secondary border-4 border-carbon shadow-brutal-lg p-3.5 sm:p-4 rounded-xl"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start gap-2.5 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white border-2 border-carbon rounded-lg flex items-center justify-center text-xl sm:text-2xl shadow-brutal-sm flex-shrink-0 animate-bounce">
              {achievement.icon}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-black uppercase tracking-wider text-carbon/80 mb-0.5">
                <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary flex-shrink-0" />
                <span className="truncate">Achievement Unlocked!</span>
                <Sparkles className="w-3 h-3 text-accent flex-shrink-0" />
              </div>
              <h4 className="font-display font-black text-base sm:text-lg text-carbon leading-tight truncate">
                {achievement.title}
              </h4>
              <p className="text-[11px] sm:text-xs font-medium text-carbon/90 mt-0.5 sm:mt-1 leading-snug">
                {achievement.description}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1 hover:bg-carbon hover:text-white rounded border border-carbon transition-colors flex-shrink-0 min-h-[28px] min-w-[28px] flex items-center justify-center"
              aria-label="Dismiss achievement toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
