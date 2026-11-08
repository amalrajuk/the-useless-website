// Achievement System with LocalStorage Persistence

import { playSound } from "./sound";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
}

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_click",
    title: "First Click",
    description: "You clicked something. Groundbreaking work.",
    icon: "👆",
    unlocked: false,
  },
  {
    id: "time_waster",
    title: "Time Waster",
    description: "Stayed on this pointless site for 30 whole seconds.",
    icon: "⏳",
    unlocked: false,
  },
  {
    id: "dedicated_loser",
    title: "Dedicated Loser",
    description: "Stayed for 2 minutes. Your productivity called 911.",
    icon: "💀",
    unlocked: false,
  },
  {
    id: "button_destroyer",
    title: "Button Destroyer",
    description: "Clicked the useless button 20 times. The button hates you.",
    icon: "💥",
    unlocked: false,
  },
  {
    id: "math_defier",
    title: "Math Defier",
    description: "Attempted to solve life's problems with a broken calculator.",
    icon: "🥔",
    unlocked: false,
  },
  {
    id: "persistent_stalker",
    title: "Persistent Stalker",
    description: "Chased the escaping orb 8 times. It is still faster than you.",
    icon: "🏃‍♂️",
    unlocked: false,
  },
  {
    id: "doom_patient",
    title: "Glutton for Punishment",
    description: "Waited for the fake loading screen to fail as prophesied.",
    icon: "⏳",
    unlocked: false,
  },
  {
    id: "secret_disco",
    title: "Secret Chaos Agent",
    description: "Found the secret by clicking the logo 7 times. Party on!",
    icon: "🪩",
    unlocked: false,
  },
  {
    id: "certificate_master",
    title: "Certified Pointless",
    description: "Generated an official diploma of absolute nothingness.",
    icon: "📜",
    unlocked: false,
  },
  {
    id: "sound_maestro",
    title: "Soundboard Maestro",
    description: "Tested every silly sound effect. Your neighbors love you.",
    icon: "🎺",
    unlocked: false,
  },
  {
    id: "professional_expert",
    title: "Professional Nothing Expert",
    description: "Interacted with every useless feature on the page.",
    icon: "👑",
    unlocked: false,
  },
];

const STORAGE_KEY = "useless_website_achievements";
const EXPLORED_KEY = "useless_explored_features";

type Listener = (achievements: Achievement[], newlyUnlocked?: Achievement) => void;
const listeners: Listener[] = [];

export function getAchievements(): Achievement[] {
  if (typeof window === "undefined") return INITIAL_ACHIEVEMENTS;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_ACHIEVEMENTS;
    const parsed: Record<string, { unlocked: boolean; unlockedAt: number }> = JSON.parse(raw);

    return INITIAL_ACHIEVEMENTS.map((ach) => {
      const saved = parsed[ach.id];
      if (saved && saved.unlocked) {
        return { ...ach, unlocked: true, unlockedAt: saved.unlockedAt };
      }
      return ach;
    });
  } catch (err) {
    console.error("Error loading achievements:", err);
    return INITIAL_ACHIEVEMENTS;
  }
}

export function unlockAchievement(id: string): Achievement | null {
  if (typeof window === "undefined") return null;

  try {
    const current = getAchievements();
    const target = current.find((a) => a.id === id);
    if (!target || target.unlocked) return null; // already unlocked

    const now = Date.now();
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    parsed[id] = { unlocked: true, unlockedAt: now };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));

    const updatedAchievement = { ...target, unlocked: true, unlockedAt: now };
    const allUpdated = current.map((a) => (a.id === id ? updatedAchievement : a));

    // Play chime sound
    playSound("chime");

    // Notify listeners
    listeners.forEach((fn) => fn(allUpdated, updatedAchievement));

    // Check if professional expert can be unlocked
    const unlockedCount = allUpdated.filter((a) => a.unlocked && a.id !== "professional_expert").length;
    if (unlockedCount >= 9 && !allUpdated.find((a) => a.id === "professional_expert")?.unlocked) {
      setTimeout(() => {
        unlockAchievement("professional_expert");
      }, 1000);
    }

    return updatedAchievement;
  } catch (err) {
    console.error("Error unlocking achievement:", err);
    return null;
  }
}

export function markFeatureExplored(featureId: string) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(EXPLORED_KEY);
    const set = new Set<string>(raw ? JSON.parse(raw) : []);
    set.add(featureId);
    localStorage.setItem(EXPLORED_KEY, JSON.stringify(Array.from(set)));

    // Required features: button, counter, runaway, weather, loader, calculator, certificate, soundboard, donotclick
    const required = [
      "button",
      "counter",
      "runaway",
      "weather",
      "loader",
      "calculator",
      "certificate",
      "soundboard",
      "donotclick",
    ];
    const allExplored = required.every((f) => set.has(f));
    if (allExplored) {
      unlockAchievement("professional_expert");
    }
  } catch (e) {
    console.error(e);
  }
}

export function resetAchievements(): Achievement[] {
  if (typeof window === "undefined") return INITIAL_ACHIEVEMENTS;
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(EXPLORED_KEY);
    const resetList = INITIAL_ACHIEVEMENTS.map((a) => ({ ...a, unlocked: false, unlockedAt: undefined }));
    listeners.forEach((fn) => fn(resetList));
    return resetList;
  } catch (err) {
    console.error("Error resetting achievements:", err);
    return INITIAL_ACHIEVEMENTS;
  }
}

export function subscribeAchievements(listener: Listener) {
  listeners.push(listener);
  return () => {
    const idx = listeners.indexOf(listener);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}
