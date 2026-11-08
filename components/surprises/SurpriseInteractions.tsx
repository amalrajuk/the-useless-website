"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb,
  Bell,
  RefreshCw,
  Bomb,
  ShieldAlert,
  TrendingDown,
} from "lucide-react";
import { playSound } from "@/lib/sound";
import { markFeatureExplored } from "@/lib/achievements";

const HOVER_LABELS = [
  "DON'T HOVER ME",
  "WHY ARE YOU LOOKING?",
  "I'M VERY SHY",
  "PLEASE CEASE AT ONCE",
  "YOUR CURSOR TICKLES",
  "WHAT DO YOU WANT?",
  "THIS IS MY PERSONAL SPACE",
  "ARE YOU STILL HERE?",
  "SERIOUSLY STOP",
  "YOU ARE SO PERSISTENT",
  "OKAY, I'M CALLING MY LAWYER",
  "I AM EMPTY INSIDE",
  "NO REFUNDS",
];

const USELESS_FACTS = [
  "If you laid all your blood vessels end to end, you would be dead.",
  "100% of people who confuse correlation with causation die eventually.",
  "Bananas are curved because they grow towards the sun, but this fact won't pay your rent.",
  "In 1998, absolutely nothing historic happened to a sandwich in Ohio.",
  "The plastic tips on shoelaces are called aglets. Their true purpose is to be forgotten immediately.",
  "Wombat poop is cube-shaped. You can do nothing with this information.",
  "If you shouted for 8 years, 7 months and 6 days, you would produce enough sound energy to heat one cup of coffee.",
  "A group of flamingos is called a 'flamboyance'. A group of programmers staring at broken code is called a 'standup'.",
  "You cannot breathe through your nose while smiling. (Congratulations, you just tested it and looked silly).",
];

export default function SurpriseInteractions() {
  // Hover button
  const [hoverIndex, setHoverIndex] = useState(0);

  // Reverse progress bar
  const [reverseProgress, setReverseProgress] = useState(87);

  // Do Not Click button
  const [clickCount, setClickCount] = useState(0);
  const [shakeScreen, setShakeScreen] = useState(false);
  const [selfDestructing, setSelfDestructing] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Random Useless Fact
  const [factIndex, setFactIndex] = useState(0);

  // Fake system toast notification
  const [showFakeSystemToast, setShowFakeSystemToast] = useState(false);

  useEffect(() => {
    // Reverse progress simulation
    const interval = setInterval(() => {
      setReverseProgress((prev) => {
        const next = prev - 3;
        if (next <= 0) return 98;
        return next;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const handleHoverButton = () => {
    playSound("click");
    setHoverIndex((prev) => (prev + 1) % HOVER_LABELS.length);
  };

  const handleDoNotClick = () => {
    markFeatureExplored("donotclick");
    const next = clickCount + 1;
    setClickCount(next);

    if (next === 1) {
      playSound("boing");
    } else if (next === 2) {
      playSound("wrongBuzzer");
    } else if (next === 3) {
      playSound("alarm");
      setShakeScreen(true);
      setTimeout(() => setShakeScreen(false), 800);
    } else if (next >= 4 && !selfDestructing) {
      playSound("alarm");
      setSelfDestructing(true);
      setCountdown(3);

      const countInterval = setInterval(() => {
        setCountdown((c) => {
          if (c <= 1) {
            clearInterval(countInterval);
            playSound("sadTrombone");
            setTimeout(() => {
              setSelfDestructing(false);
              setClickCount(0);
            }, 3000);
            return 0;
          }
          playSound("boing");
          return c - 1;
        });
      }, 1000);
    }
  };

  const handleNextFact = () => {
    playSound("click");
    setFactIndex((prev) => (prev + 1) % USELESS_FACTS.length);
  };

  const triggerFakeNotification = () => {
    playSound("pew");
    setShowFakeSystemToast(true);
    setTimeout(() => setShowFakeSystemToast(false), 4500);
  };

  return (
    <div className={`space-y-6 sm:space-y-8 overflow-hidden ${shakeScreen ? "animate-shake" : ""}`}>
      {/* Fake system notification popup */}
      <AnimatePresence>
        {showFakeSystemToast && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-white border-4 border-carbon shadow-brutal-xl rounded-2xl p-3.5 sm:p-4 max-w-sm flex items-start gap-3"
            role="status"
            aria-live="polite"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-sunshine rounded-xl border-2 border-carbon flex items-center justify-center text-lg sm:text-xl shadow-brutal-sm flex-shrink-0">
              🔔
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono font-black uppercase text-carbon/70">
                <span>System Update 2.0</span>
                <span>• Just Now</span>
              </div>
              <h5 className="font-display font-black text-xs sm:text-sm text-carbon uppercase mt-0.5 leading-tight">
                Productivity.exe Has Quit Unexpectedly
              </h5>
              <p className="text-xs font-semibold text-carbon/80 mt-1 leading-snug">
                Reason: Visitor decided looking at useless widgets was a higher priority.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center max-w-3xl mx-auto px-2">
        <span className="font-mono text-xs font-black uppercase tracking-wider bg-sunshine text-carbon px-2.5 py-1 rounded-lg border-2 border-carbon">
          Section 04: Miscellaneous Nonsense
        </span>
        <h3 className="font-display font-black text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-carbon uppercase mt-3">
          ADDITIONAL SURPRISE INTERACTIONS
        </h3>
        <p className="font-mono text-xs sm:text-sm font-bold text-carbon/70 mt-1 uppercase">
          Because who stops at just 8 useless features?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* SURPRISE 1: Shifty Hover Button */}
        <div className="bg-white border-4 border-carbon rounded-3xl p-5 sm:p-6 shadow-brutal flex flex-col items-center text-center justify-between min-h-[220px]">
          <div className="w-full flex items-center justify-between pb-3 border-b-2 border-carbon/20">
            <span className="text-xs font-mono font-black uppercase text-carbon">
              #01: The Evasive Label
            </span>
            <span className="text-[10px] font-mono bg-paper px-2 py-0.5 rounded border border-carbon font-bold">
              HOVER / TAP
            </span>
          </div>

          <p className="text-xs font-semibold text-carbon/70 my-2 px-2">
            Try moving your cursor over or tapping this button. It is deeply uncomfortable with attention.
          </p>

          <motion.button
            type="button"
            onMouseEnter={handleHoverButton}
            onClick={handleHoverButton}
            onTouchStart={handleHoverButton}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            aria-label={`Evasive button label: ${HOVER_LABELS[hoverIndex]}. Hover or tap to change.`}
            className="px-5 py-3.5 sm:px-6 sm:py-4 bg-accent hover:bg-accent-hover text-white font-display font-black text-base sm:text-lg uppercase rounded-2xl border-4 border-carbon shadow-brutal active:translate-y-0.5 transition-all w-full max-w-xs min-h-[48px] flex items-center justify-center truncate"
          >
            {HOVER_LABELS[hoverIndex]}
          </motion.button>

          <span className="text-[10px] font-mono text-carbon/50 mt-2">
            Changed {hoverIndex + 1} times
          </span>
        </div>

        {/* SURPRISE 2: Reverse Progress Bar */}
        <div className="bg-white border-4 border-carbon rounded-3xl p-5 sm:p-6 shadow-brutal flex flex-col items-center text-center justify-between min-h-[220px]">
          <div className="w-full flex items-center justify-between pb-3 border-b-2 border-carbon/20">
            <span className="text-xs font-mono font-black uppercase text-carbon">
              #02: Regressive Progress
            </span>
            <span className="text-[10px] font-mono bg-red-100 text-red-600 px-2 py-0.5 rounded border border-carbon font-bold flex items-center gap-1">
              <TrendingDown className="w-3 h-3" /> DECREASING
            </span>
          </div>

          <div className="w-full my-auto space-y-3 py-2">
            <div className="flex justify-between font-mono text-[11px] sm:text-xs font-black uppercase text-carbon">
              <span>Goal: Zero Accomplishment</span>
              <span className="text-primary">{reverseProgress}% Left</span>
            </div>

            <div className="w-full h-7 bg-paper border-3 border-carbon rounded-xl p-1 overflow-hidden shadow-inner">
              <motion.div
                animate={{ width: `${reverseProgress}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-gradient-to-r from-red-500 to-primary rounded-lg border border-carbon"
              />
            </div>

            <p className="text-[11px] sm:text-xs font-mono text-carbon/60">
              The more you look, the less you have achieved.
            </p>
          </div>

          <span className="text-[10px] font-mono text-carbon/50">
            Drain rate: ~2.5 un-accomplishments/sec
          </span>
        </div>

        {/* SURPRISE 3: DO NOT CLICK Button */}
        <div className="bg-sunshine/20 border-4 border-carbon rounded-3xl p-5 sm:p-6 shadow-brutal flex flex-col items-center text-center justify-between min-h-[260px] relative overflow-hidden">
          <div className="w-full flex items-center justify-between pb-3 border-b-2 border-carbon/20">
            <span className="text-xs font-mono font-black uppercase text-carbon flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span className="truncate">#03: Forbidden Trigger</span>
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono bg-red-600 text-white px-2 py-0.5 rounded border border-carbon font-bold animate-pulse flex-shrink-0">
              DANGER: {clickCount}
            </span>
          </div>

          {!selfDestructing ? (
            <div className="my-auto space-y-3 sm:space-y-4 py-2">
              <motion.button
                type="button"
                onClick={handleDoNotClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Do not click this button"
                className="px-6 py-4 sm:px-8 sm:py-5 bg-red-600 hover:bg-red-700 text-white font-display font-black text-xl sm:text-2xl uppercase tracking-wider rounded-2xl border-4 border-carbon shadow-brutal-lg flex items-center justify-center gap-2 sm:gap-3 mx-auto min-h-[52px]"
              >
                <Bomb className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce flex-shrink-0" />
                <span>DO NOT CLICK</span>
              </motion.button>

              <p className="text-xs font-mono font-bold text-carbon/80 max-w-xs mx-auto leading-snug">
                {clickCount === 0 && "We strictly advised against clicking this. Please comply."}
                {clickCount === 1 && "Hey! We literally wrote 'DO NOT CLICK'. Can you read?"}
                {clickCount === 2 && "Stop pushing your luck. Something terrible will happen."}
                {clickCount === 3 && "WARNING: CRITICAL SYSTEM DESTABILIZATION IMMINENT!"}
              </p>
            </div>
          ) : (
            <div className="my-auto space-y-2 py-2">
              <div className="text-3xl sm:text-4xl animate-bounce">🚨</div>
              <h4 className="font-display font-black text-xl sm:text-2xl text-red-600 uppercase">
                {countdown > 0
                  ? `SELF-DESTRUCT IN: ${countdown}`
                  : "BOOM! (NOTHING HAPPENED)"}
              </h4>
              <p className="text-xs font-mono text-carbon font-bold max-w-xs mx-auto">
                {countdown > 0
                  ? "Evacuate the tab immediately! Or just sit there."
                  : "All systems intact. You were worried for zero seconds."}
              </p>
            </div>
          )}

          <span className="text-[10px] font-mono text-carbon/50">
            Clicks ignored: {clickCount}
          </span>
        </div>

        {/* SURPRISE 4: Random Useless Fact Generator */}
        <div className="bg-white border-4 border-carbon rounded-3xl p-5 sm:p-6 shadow-brutal flex flex-col items-center text-center justify-between min-h-[260px]">
          <div className="w-full flex items-center justify-between pb-3 border-b-2 border-carbon/20">
            <span className="text-xs font-mono font-black uppercase text-carbon flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-sunshine flex-shrink-0" />
              <span className="truncate">#04: Inapplicable Trivia</span>
            </span>
            <span className="text-[10px] font-mono bg-secondary px-2 py-0.5 rounded border border-carbon font-bold flex-shrink-0">
              #{factIndex + 1}
            </span>
          </div>

          <div className="my-auto py-2 bg-paper p-3.5 sm:p-4 rounded-2xl border-2 border-carbon shadow-inner w-full">
            <AnimatePresence mode="wait">
              <motion.p
                key={factIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="font-mono font-bold text-xs sm:text-sm text-carbon leading-relaxed"
              >
                &ldquo;{USELESS_FACTS[factIndex]}&rdquo;
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="w-full flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-3">
            <button
              type="button"
              onClick={handleNextFact}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2.5 sm:px-4 sm:py-2.5 bg-secondary hover:bg-secondary-hover text-carbon font-display font-black text-xs uppercase rounded-xl border-2 border-carbon shadow-brutal-sm active:translate-y-0.5 min-h-[40px]"
              aria-label="Generate another useless fact"
            >
              <RefreshCw className="w-3.5 h-3.5 flex-shrink-0" />
              <span>More Useless Knowledge</span>
            </button>

            <button
              type="button"
              onClick={triggerFakeNotification}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 bg-white hover:bg-paper text-carbon font-display font-black text-xs uppercase rounded-xl border-2 border-carbon shadow-brutal-sm active:translate-y-0.5 min-h-[40px]"
              title="Spawn fake desktop notification"
              aria-label="Test fake system toast notification"
            >
              <Bell className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span>Test Toast</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
