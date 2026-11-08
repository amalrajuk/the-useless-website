"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldAlert } from "lucide-react";
import { playSound } from "@/lib/sound";

const POPUP_MESSAGES = [
  {
    title: "WHY ARE YOU STILL HERE?",
    body: "Seriously. There is nothing to gain here. Your plants need watering. Your laundry needs folding.",
    button: "I accept my fate",
  },
  {
    title: "YOUR PRODUCTIVITY CALLED.",
    body: "It wants a full refund with interest. It's currently in tears talking to customer support.",
    button: "Leave me alone",
  },
  {
    title: "THIS WEBSITE MISSES YOU ALREADY.",
    body: "Even though you're literally looking right at it. We have severe attachment issues.",
    button: "That's weird",
  },
  {
    title: "YOU HAVE BETTER THINGS TO DO.",
    body: "Think of your unfinished projects, your unread books, your unachieved dreams. But no, you're here.",
    button: "I like wasting time",
  },
  {
    title: "INTERRUPTION PROTOCOL ACTIVATED.",
    body: "We noticed you were having fun doing nothing. That violates Section 0 of our Pointless Guidelines.",
    button: "Resume doing nothing",
  },
];

export default function AnnoyingPopup() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [mutedSession, setMutedSession] = useState(false);

  useEffect(() => {
    if (mutedSession) return;

    // First popup after 40 seconds
    const timer1 = setTimeout(() => {
      setCurrentMessageIndex(Math.floor(Math.random() * POPUP_MESSAGES.length));
      setIsOpen(true);
      playSound("wrongBuzzer");
    }, 40000);

    // Subsequent popups every 95 seconds
    const interval = setInterval(() => {
      if (!mutedSession) {
        setCurrentMessageIndex(Math.floor(Math.random() * POPUP_MESSAGES.length));
        setIsOpen(true);
        playSound("boing");
      }
    }, 95000);

    return () => {
      clearTimeout(timer1);
      clearInterval(interval);
    };
  }, [mutedSession]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        playSound("click");
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    playSound("click");
    setIsOpen(false);
  };

  const current = POPUP_MESSAGES[currentMessageIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-carbon/50 backdrop-blur-xs pointer-events-auto"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="annoying-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-sunshine border-4 border-carbon shadow-brutal-xl rounded-2xl overflow-hidden p-5 sm:p-6"
          >
            {/* Top alert bar */}
            <div className="flex items-center justify-between pb-3.5 border-b-3 border-carbon mb-4">
              <div className="flex items-center gap-2">
                <span className="p-1 sm:p-1.5 bg-primary text-white rounded-lg border-2 border-carbon">
                  <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                </span>
                <span className="font-mono text-[10px] sm:text-xs font-black uppercase tracking-wider text-carbon truncate">
                  Unsolicited Annoyance #00{currentMessageIndex + 1}
                </span>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="w-8 h-8 bg-white hover:bg-carbon hover:text-white rounded-lg border-2 border-carbon flex items-center justify-center shadow-brutal-sm transition-colors flex-shrink-0"
                aria-label="Dismiss annoying popup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Popup content */}
            <div className="space-y-3">
              <h3
                id="annoying-title"
                className="font-display font-black text-xl sm:text-2xl md:text-3xl text-carbon uppercase leading-tight"
              >
                {current.title}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-carbon/90 leading-relaxed bg-white/70 p-3 sm:p-3.5 rounded-xl border-2 border-carbon">
                {current.body}
              </p>
            </div>

            {/* Action buttons */}
            <div className="mt-5 sm:mt-6 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="w-full py-3 px-4 bg-primary text-white hover:bg-primary-hover font-display font-black uppercase text-xs sm:text-sm rounded-xl border-3 border-carbon shadow-brutal transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-brutal-hover min-h-[44px]"
              >
                {current.button}
              </button>

              <button
                type="button"
                onClick={() => {
                  setMutedSession(true);
                  handleClose();
                }}
                className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-carbon/70 hover:text-carbon text-center py-1 underline min-h-[32px] flex items-center justify-center"
              >
                Stop interrupting me for this session
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
