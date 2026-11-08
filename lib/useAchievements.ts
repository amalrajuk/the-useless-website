"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Achievement,
  getAchievements,
  unlockAchievement,
  resetAchievements,
  subscribeAchievements,
  markFeatureExplored,
} from "./achievements";

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [newToast, setNewToast] = useState<Achievement | null>(null);

  useEffect(() => {
    setAchievements(getAchievements());

    const unsubscribe = subscribeAchievements((updated, newlyUnlocked) => {
      setAchievements(updated);
      if (newlyUnlocked) {
        setNewToast(newlyUnlocked);
      }
    });

    // Time-based achievement tracking
    const timer30 = setTimeout(() => {
      unlockAchievement("time_waster");
    }, 30000);

    const timer120 = setTimeout(() => {
      unlockAchievement("dedicated_loser");
    }, 120000);

    // Global first interaction listener (click or touch)
    let triggeredFirst = false;
    const handleFirstInteraction = () => {
      if (triggeredFirst) return;
      triggeredFirst = true;
      unlockAchievement("first_click");
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });

    return () => {
      unsubscribe();
      clearTimeout(timer30);
      clearTimeout(timer120);
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, []);

  const clearToast = useCallback(() => {
    setNewToast(null);
  }, []);

  const unlock = useCallback((id: string) => {
    return unlockAchievement(id);
  }, []);

  const explore = useCallback((featureId: string) => {
    markFeatureExplored(featureId);
  }, []);

  const reset = useCallback(() => {
    const fresh = resetAchievements();
    setAchievements(fresh);
  }, []);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;

  return {
    achievements,
    unlockedCount,
    totalCount,
    newToast,
    clearToast,
    unlock,
    explore,
    reset,
  };
}
