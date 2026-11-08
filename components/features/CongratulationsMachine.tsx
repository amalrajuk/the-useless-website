"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Award, Share2, Check, Printer } from "lucide-react";
import { playSound } from "@/lib/sound";
import { unlockAchievement, markFeatureExplored } from "@/lib/achievements";

export default function CongratulationsMachine() {
  const [name, setName] = useState("Distinguished Time Waster");
  const [hasGenerated, setHasGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [certSerial, setCertSerial] = useState("000-VOID-69420");
  const [awardTitle, setAwardTitle] = useState("Grand Duke of Absolute Non-Productivity");

  useEffect(() => {
    markFeatureExplored("certificate");
  }, []);

  const handleGenerate = () => {
    playSound("confetti");
    playSound("chime");

    // Blast confetti!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FF4D00", "#B7F000", "#784CFF", "#FFE600", "#FF3388"],
    });

    const titles = [
      "Grand Duke of Absolute Non-Productivity",
      "Supreme Chancellor of Pointless Scrolling",
      "Master of Zero Measurable Progress",
      "Doctor of Procrastination & Avoidance",
      "Honorary Knight of the Empty Spreadsheet",
    ];
    setAwardTitle(titles[Math.floor(Math.random() * titles.length)]);
    setCertSerial(
      "VOID-" + Math.floor(1000 + Math.random() * 9000) + "-FAIL-" + Math.floor(10 + Math.random() * 90)
    );
    setHasGenerated(true);

    unlockAchievement("certificate_master");
  };

  const handleShare = async () => {
    playSound("click");
    const shareText = `🏆 I just received an Official Certificate of Absolute Nothingness from The Internet's Most Useless Website! Serial #${certSerial}. We are incredibly disappointed.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Certificate of Absolute Nothingness",
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch (e) {
        // Fallback to clipboard
      }
    }

    // Fallback: Copy to clipboard
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-sunshine/20 border-4 border-carbon rounded-3xl p-5 sm:p-6 md:p-8 shadow-brutal-lg flex flex-col items-center text-center relative overflow-hidden">
      {/* Header tag */}
      <div className="flex items-center justify-between w-full pb-4 border-b-3 border-carbon mb-5 sm:mb-6">
        <span className="font-mono text-xs font-black uppercase tracking-wider bg-accent text-white px-2.5 py-1 rounded-lg border-2 border-carbon">
          Feature 07: Pointless Accolade
        </span>
        <span className="font-mono text-xs font-bold text-carbon/70 uppercase">
          Status: {hasGenerated ? "Awarded" : "Awaiting Hero"}
        </span>
      </div>

      <h3 className="font-display font-black text-2xl xs:text-3xl md:text-4xl text-carbon uppercase">
        CONGRATULATIONS MACHINE
      </h3>
      <p className="font-mono text-xs sm:text-sm font-bold text-carbon/70 mt-1 uppercase">
        Validate your total lack of accomplishment with high pomp
      </p>

      {/* Name Input Form */}
      <div className="mt-5 mb-3 flex items-center gap-2 max-w-sm w-full">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter recipient name"
          maxLength={35}
          aria-label="Recipient name for certificate"
          className="flex-1 px-3.5 py-2.5 bg-white border-3 border-carbon rounded-xl font-mono text-xs sm:text-sm font-bold text-carbon focus:outline-none focus:border-primary shadow-brutal-sm"
        />
      </div>

      {/* The Big Red Arcade Button */}
      <motion.button
        type="button"
        onClick={handleGenerate}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.94 }}
        className="my-3 px-6 py-4 sm:px-8 sm:py-5 bg-primary hover:bg-primary-hover text-white font-display font-black text-xl xs:text-2xl md:text-3xl uppercase tracking-widest rounded-2xl border-4 border-carbon shadow-brutal-xl active:translate-y-1 active:shadow-brutal flex items-center justify-center gap-2 sm:gap-3 min-h-[52px]"
        aria-label="Press for success and generate certificate"
      >
        <Award className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
        <span>PRESS FOR SUCCESS</span>
      </motion.button>

      {/* The Generated Official Diploma Certificate */}
      <AnimatePresence>
        {hasGenerated && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="my-5 w-full max-w-lg bg-paper border-4 sm:border-6 border-carbon rounded-3xl p-4 sm:p-6 md:p-8 shadow-brutal-xl relative text-carbon text-left overflow-hidden"
          >
            {/* Certificate Header Banner */}
            <div className="text-center pb-4 border-b-3 border-dashed border-carbon">
              <span className="font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-widest bg-carbon text-secondary px-2 py-0.5 sm:px-2.5 sm:py-1 rounded inline-block mb-2">
                OFFICIAL DECLARATION OF USELESSNESS
              </span>
              <h4 className="font-display font-black text-2xl sm:text-3xl text-carbon uppercase tracking-wide">
                CONGRATULATIONS!
              </h4>
              <p className="font-serif italic text-xs sm:text-sm text-carbon/80 mt-1">
                This certifies that the esteemed entity known as
              </p>
              <div className="font-display font-black text-xl sm:text-3xl text-primary uppercase underline decoration-carbon decoration-2 my-1 break-words">
                {name || "Anonymous Slacker"}
              </div>
              <p className="font-serif italic text-xs sm:text-sm text-carbon/80">
                has officially been conferred the title of:
              </p>
              <div className="font-mono font-black text-xs sm:text-sm text-carbon uppercase bg-secondary/50 px-2.5 py-1 rounded border border-carbon inline-block mt-1 break-words">
                {awardTitle}
              </div>
            </div>

            {/* Certificate Body Text */}
            <div className="py-4 text-center space-y-2">
              <p className="font-mono text-xs sm:text-sm font-bold text-carbon leading-relaxed">
                &ldquo;You successfully achieved absolutely nothing. We are incredibly disappointed. Well done!&rdquo;
              </p>
            </div>

            {/* Certificate Footer / Stamp */}
            <div className="pt-4 border-t-3 border-dashed border-carbon flex flex-col xs:flex-row items-center xs:items-end justify-between gap-3">
              <div className="text-[10px] font-mono font-bold text-carbon/70 text-center xs:text-left">
                <div>SERIAL: {certSerial}</div>
                <div>DATE: {new Date().toLocaleDateString()}</div>
                <div>VERIFIED: 0% UTILITY</div>
              </div>

              {/* Red Stamp */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-3 sm:border-4 border-red-600 border-dashed flex flex-col items-center justify-center text-red-600 rotate-12 font-black text-[8px] sm:text-[9px] uppercase tracking-tighter leading-none shadow-sm select-none flex-shrink-0">
                <span>OFFICIAL</span>
                <span className="font-display text-[10px] sm:text-xs">DISAPPROVAL</span>
                <span>SEAL</span>
              </div>
            </div>

            {/* Share and Copy Buttons */}
            <div className="mt-5 pt-3.5 border-t-2 border-carbon/20 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-5 sm:py-2.5 bg-carbon text-white hover:bg-primary font-display font-black text-xs uppercase rounded-xl border-2 border-carbon shadow-brutal-sm transition-transform active:translate-y-0.5 min-h-[40px]"
                aria-label="Share diploma"
              >
                {copied ? <Check className="w-4 h-4 text-secondary" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? "COPIED TO CLIPBOARD!" : "SHARE DIPLOMA"}</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2.5 sm:px-4 sm:py-2.5 bg-white text-carbon hover:bg-paper font-display font-black text-xs uppercase rounded-xl border-2 border-carbon shadow-brutal-sm transition-transform active:translate-y-0.5 min-h-[40px]"
                aria-label="Print or export diploma as PDF"
              >
                <Printer className="w-4 h-4" />
                <span>PRINT / PDF</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
