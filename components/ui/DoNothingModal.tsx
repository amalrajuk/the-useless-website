"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RefreshCw } from "lucide-react";
import { playSound } from "@/lib/sound";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function DoNothingModal({ isOpen, onClose }: Props) {
  const [seconds, setSeconds] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSeconds(0);
      setFailed(false);
      return;
    }

    document.body.style.overflow = "hidden";

    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // Fail if cursor moves aggressively or key pressed
    let moveCount = 0;
    const handleMouseMove = () => {
      moveCount++;
      if (moveCount > 8) {
        setFailed(true);
        playSound("wrongBuzzer");
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        playSound("click");
        onClose();
        return;
      }
      setFailed(true);
      playSound("wrongBuzzer");
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      clearInterval(timer);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleRestart = () => {
    playSound("click");
    setFailed(false);
    setSeconds(0);
  };

  const formattedTime = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
    seconds % 60
  ).padStart(2, "0")}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-carbon/75 backdrop-blur-md"
          onClick={() => {
            playSound("click");
            onClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="zen-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-paper border-4 border-carbon shadow-brutal-xl rounded-2xl overflow-hidden p-5 sm:p-6 text-center max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center pb-3 border-b-3 border-carbon mb-5">
              <span className="font-mono text-[10px] sm:text-xs font-black uppercase tracking-wider bg-secondary text-carbon px-2.5 py-1 rounded border-2 border-carbon">
                禅 Nothingness Chamber
              </span>
              <button
                type="button"
                onClick={() => {
                  playSound("click");
                  onClose();
                }}
                className="w-8 h-8 rounded-lg border-2 border-carbon flex items-center justify-center bg-white hover:bg-carbon hover:text-white transition-colors flex-shrink-0"
                aria-label="Exit chamber"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!failed ? (
              <div className="space-y-5">
                <div className="text-4xl sm:text-5xl animate-bounce">🧘</div>

                <div>
                  <h3
                    id="zen-modal-title"
                    className="font-display font-black text-2xl sm:text-3xl text-carbon uppercase leading-tight"
                  >
                    You Are Doing Absolutely Nothing
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-carbon/70 mt-2 px-2">
                    Do not move your mouse. Do not touch your keyboard. Do not think productive thoughts.
                  </p>
                </div>

                <div className="bg-white p-5 sm:p-6 rounded-2xl border-3 border-carbon shadow-brutal inline-block w-full">
                  <span className="text-[10px] sm:text-xs font-mono font-bold uppercase text-carbon/60 block mb-1">
                    Time Spent Achieving Zero:
                  </span>
                  <div className="font-mono font-black text-4xl sm:text-6xl text-primary tracking-widest">
                    {formattedTime}
                  </div>
                </div>

                <p className="text-[10px] sm:text-xs font-mono text-carbon/60 px-2">
                  Warning: Excessive movement will cause immediate disqualification from doing nothing.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="text-4xl sm:text-5xl animate-wiggle">🤦‍♂️</div>

                <div>
                  <h3
                    id="zen-modal-title"
                    className="font-display font-black text-2xl sm:text-3xl text-primary uppercase leading-tight"
                  >
                    YOU FAILED AT DOING NOTHING!
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-carbon/80 mt-2">
                    You moved your mouse or pressed a button! You couldn&apos;t even do nothing properly.
                  </p>
                </div>

                <div className="bg-red-50 p-3 sm:p-4 rounded-xl border-2 border-red-500 text-carbon font-mono text-xs sm:text-sm font-bold">
                  Final Score: Managed to do nothing for only {seconds} seconds.
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center">
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-secondary hover:bg-secondary-hover font-display font-black text-xs sm:text-sm uppercase rounded-xl border-3 border-carbon shadow-brutal min-h-[44px]"
                  >
                    <RefreshCw className="w-4 h-4" /> Try Doing Nothing Again
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playSound("click");
                      onClose();
                    }}
                    className="px-5 py-3 bg-carbon text-white hover:bg-primary font-display font-black text-xs sm:text-sm uppercase rounded-xl border-3 border-carbon shadow-brutal min-h-[44px]"
                  >
                    I Give Up
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
