"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, Sparkles, XCircle } from "lucide-react";
import { playSound } from "@/lib/sound";
import { unlockAchievement, markFeatureExplored } from "@/lib/achievements";

export default function FakeLoader() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    markFeatureExplored("loader");
  }, []);

  const handleStartLoad = () => {
    playSound("click");
    setFailed(false);
    setLoading(true);
    setProgress(0);
    setStatusMessage("Establishing connection to the Void...");

    // Stage 1: Quick climb to 42%
    setTimeout(() => {
      setProgress(42);
      setStatusMessage("Extracting vital uselessness...");
      playSound("pew");
    }, 800);

    // Stage 2: Climb to 88%
    setTimeout(() => {
      setProgress(88);
      setStatusMessage("Polishing digital insignificance...");
    }, 1800);

    // Stage 3: Tease 99%!
    setTimeout(() => {
      setProgress(99);
      setStatusMessage("Hold tight! 99% complete! Almost important...");
      playSound("boing");
    }, 2800);

    // Stage 4: CRUEL DROP TO 3%
    setTimeout(() => {
      setProgress(3);
      setStatusMessage("CRITICAL DROP: Packet tripped over a cable. Recalibrating...");
      playSound("wrongBuzzer");
    }, 4000);

    // Stage 5: Hopeless struggle to 24%
    setTimeout(() => {
      setProgress(24);
      setStatusMessage("Consulting backup nothingness...");
    }, 5100);

    // Stage 6: Final Failure
    setTimeout(() => {
      setLoading(false);
      setFailed(true);
      playSound("sadTrombone");
      unlockAchievement("doom_patient");
    }, 6400);
  };

  return (
    <div className="bg-white border-4 border-carbon rounded-3xl p-5 sm:p-6 md:p-8 shadow-brutal-lg flex flex-col items-center text-center relative overflow-hidden">
      {/* Header tag */}
      <div className="flex items-center justify-between w-full pb-4 border-b-3 border-carbon mb-5 sm:mb-6">
        <span className="font-mono text-xs font-black uppercase tracking-wider bg-carbon text-sunshine px-2.5 py-1 rounded-lg border-2 border-carbon">
          Feature 05: Futile Buffer
        </span>
        <span className="font-mono text-[10px] sm:text-xs font-bold text-carbon/70 uppercase">
          {loading ? "Buffering" : failed ? "Failed" : "Idle"}
        </span>
      </div>

      <h3 className="font-display font-black text-2xl xs:text-3xl md:text-4xl text-carbon uppercase">
        FAKE LOADING SCREEN
      </h3>
      <p className="font-mono text-xs sm:text-sm font-bold text-carbon/70 mt-1 uppercase">
        Engineered to disappoint at the last millisecond
      </p>

      {/* Main Display Box */}
      <div className="my-5 sm:my-6 w-full max-w-lg bg-paper border-4 border-carbon rounded-3xl p-5 sm:p-6 shadow-brutal-xl">
        {!loading && !failed && (
          <div className="py-4 sm:py-6 space-y-3 sm:space-y-4">
            <div className="text-4xl sm:text-5xl animate-bounce">⏳</div>
            <p className="font-semibold text-carbon text-sm sm:text-base">
              Ready to witness the high-stakes loading of something of supreme, monumental consequence?
            </p>
            <p className="text-[10px] sm:text-xs font-mono text-carbon/60 uppercase">
              (Spoiler alert: It doesn&apos;t exist)
            </p>
          </div>
        )}

        {loading && (
          <div className="py-3 sm:py-4 space-y-4 sm:space-y-5">
            <div className="flex items-center justify-between font-mono text-xs font-black uppercase">
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-primary flex-shrink-0" />
                <span className="truncate">Loading Assets...</span>
              </span>
              <span className="text-base sm:text-lg font-black text-primary ml-2">{progress}%</span>
            </div>

            {/* Brutalist Progress Bar */}
            <div className="w-full h-7 sm:h-8 bg-white border-3 border-carbon rounded-xl p-1 overflow-hidden shadow-inner">
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
                className={`h-full rounded-lg border border-carbon ${
                  progress === 99
                    ? "bg-sunshine"
                    : progress < 10
                    ? "bg-red-500"
                    : "bg-primary"
                }`}
              />
            </div>

            <div className="bg-white p-3 rounded-xl border-2 border-carbon font-mono text-xs font-bold text-carbon leading-snug min-h-[44px] flex items-center justify-center">
              {statusMessage}
            </div>
          </div>
        )}

        {failed && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="py-3 sm:py-4 space-y-3"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-100 border-3 border-red-500 rounded-2xl flex items-center justify-center mx-auto text-red-500">
              <XCircle className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <h4 className="font-display font-black text-xl sm:text-2xl text-red-600 uppercase tracking-wide">
              ERROR 404: IMPORTANT THING NOT FOUND.
            </h4>

            <p className="font-mono text-xs font-bold text-carbon/80 bg-white p-3 rounded-xl border-2 border-carbon leading-relaxed">
              Error Code: 0xUSELESS_NOTHING_DISCOVERED
              <br />
              Diagnosis: You waited 6.4 seconds for literally zero reason.
            </p>
          </motion.div>
        )}
      </div>

      {/* Trigger Button */}
      {!loading ? (
        <button
          type="button"
          onClick={handleStartLoad}
          className="inline-flex items-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-primary hover:bg-primary-hover text-white font-display font-black text-sm sm:text-base uppercase tracking-wider rounded-2xl border-4 border-carbon shadow-brutal transition-transform active:translate-y-0.5 min-h-[48px]"
          aria-label={failed ? "Try loading again (will also fail)" : "Load something important"}
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          <span>{failed ? "TRY AGAIN (WILL ALSO FAIL)" : "LOAD SOMETHING IMPORTANT"}</span>
        </button>
      ) : (
        <button
          type="button"
          disabled
          className="px-6 py-3.5 sm:px-8 sm:py-4 bg-gray-200 text-carbon/50 font-display font-black text-sm sm:text-base uppercase rounded-2xl border-4 border-carbon shadow-brutal opacity-70 cursor-not-allowed min-h-[48px]"
        >
          PLEASE SUFFER PATIENTLY...
        </button>
      )}
    </div>
  );
}
