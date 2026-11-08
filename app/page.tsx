"use client";

import React, { useState, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import Footer from "@/components/layout/Footer";

// Features A through J
import UselessButton from "@/components/features/UselessButton";
import BackwardsCounter from "@/components/features/BackwardsCounter";
import EscapingObject from "@/components/features/EscapingObject";
import UselessWeather from "@/components/features/UselessWeather";
import FakeLoader from "@/components/features/FakeLoader";
import UselessCalculator from "@/components/features/UselessCalculator";
import CongratulationsMachine from "@/components/features/CongratulationsMachine";
import PointlessSoundboard from "@/components/features/PointlessSoundboard";

// Additional Surprise Interactions
import SurpriseInteractions from "@/components/surprises/SurpriseInteractions";

// Modals, Overlays and Toasts
import AchievementToast from "@/components/ui/AchievementToast";
import AchievementModal from "@/components/ui/AchievementModal";
import AnnoyingPopup from "@/components/ui/AnnoyingPopup";
import DoNothingModal from "@/components/ui/DoNothingModal";
import PartyMode from "@/components/ui/PartyMode";

import { useAchievements } from "@/lib/useAchievements";

export default function Home() {
  const {
    achievements,
    unlockedCount,
    totalCount,
    newToast,
    clearToast,
    reset,
  } = useAchievements();

  const [isCabinetOpen, setIsCabinetOpen] = useState(false);
  const [isDoNothingOpen, setIsDoNothingOpen] = useState(false);
  const [isPartyActive, setIsPartyActive] = useState(false);

  const featuresRef = useRef<HTMLDivElement>(null);

  const handleExploreScroll = () => {
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-paper text-carbon overflow-x-hidden">
      {/* Secret Party / Disco Chaos Overlay */}
      <PartyMode
        isActive={isPartyActive}
        onDisable={() => setIsPartyActive(false)}
      />

      {/* Main Neo-brutalist Navigation Bar */}
      <Navbar
        onOpenAchievements={() => setIsCabinetOpen(true)}
        unlockedCount={unlockedCount}
        totalAchievements={totalCount}
        onTriggerParty={() => setIsPartyActive(true)}
        onDoNothingModal={() => setIsDoNothingOpen(true)}
      />

      {/* Hero Section */}
      <HeroSection
        onDoNothingModal={() => setIsDoNothingOpen(true)}
        onExploreClick={handleExploreScroll}
      />

      {/* Main Content Sections */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-16 space-y-12 sm:space-y-16">
        {/* Features Intro Banner */}
        <div ref={featuresRef} className="text-center max-w-3xl mx-auto pt-2 sm:pt-4 px-2">
          <span className="font-mono text-xs font-black uppercase tracking-wider bg-secondary text-carbon px-2.5 py-1 rounded-lg border-2 border-carbon">
            The Interactive Suite of Futilities
          </span>
          <h2 className="font-display font-black text-2xl xs:text-3xl sm:text-5xl md:text-6xl text-carbon uppercase mt-3 tracking-tight">
            PROUDLY ACCOMPLISHING NOTHING
          </h2>
          <p className="font-mono text-xs sm:text-sm md:text-base font-bold text-carbon/70 mt-2 uppercase">
            Click, explore, test your patience, and harvest useless achievements.
          </p>
        </div>

        {/* 2-Column Responsive Neo-Brutalist Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* FEATURE A: THE USELESS BUTTON */}
          <UselessButton />

          {/* FEATURE B: BACKWARDS COUNTER */}
          <BackwardsCounter />

          {/* FEATURE C: THE ESCAPING OBJECT */}
          <EscapingObject />

          {/* FEATURE D: USELESS WEATHER FORECAST */}
          <UselessWeather />

          {/* FEATURE E: FAKE LOADING SCREEN */}
          <FakeLoader />

          {/* FEATURE F: USELESS CALCULATOR */}
          <UselessCalculator />

          {/* FEATURE I: CONGRATULATIONS MACHINE */}
          <CongratulationsMachine />

          {/* FEATURE J: POINTLESS SOUND MACHINE */}
          <PointlessSoundboard />
        </div>

        {/* SECTION 4: SURPRISE INTERACTIONS */}
        <div className="pt-6 sm:pt-8 border-t-4 border-carbon">
          <SurpriseInteractions />
        </div>
      </main>

      {/* Footer */}
      <Footer
        onResetAchievements={reset}
        onOpenAchievements={() => setIsCabinetOpen(true)}
      />

      {/* Achievement Unlock Toast Notification */}
      <AchievementToast achievement={newToast} onClose={clearToast} />

      {/* Achievements Trophy Cabinet Modal */}
      <AchievementModal
        isOpen={isCabinetOpen}
        onClose={() => setIsCabinetOpen(false)}
        achievements={achievements}
        onReset={reset}
      />

      {/* Zen Nothingness Modal ("DO ABSOLUTELY NOTHING") */}
      <DoNothingModal
        isOpen={isDoNothingOpen}
        onClose={() => setIsDoNothingOpen(false)}
      />

      {/* FEATURE H: Occasional Annoying Neo-brutalist Popups */}
      <AnnoyingPopup />
    </div>
  );
}
