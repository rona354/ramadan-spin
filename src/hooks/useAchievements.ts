import { useState, useCallback } from 'react';
import { achievementBadges, type Badge } from '../data/badges';

const ACHIEVEMENTS_KEY = 'ramadan-spin-achievements';

interface AchievementsData {
  earned: string[];
  counters: {
    shares: number;
    spins: number;
  };
}

function getStoredData(): AchievementsData {
  const defaultData: AchievementsData = {
    earned: [],
    counters: { shares: 0, spins: 0 },
  };
  try {
    const stored = localStorage.getItem(ACHIEVEMENTS_KEY);
    if (!stored) return defaultData;
    const parsed = JSON.parse(stored);
    return {
      earned: Array.isArray(parsed.earned) ? parsed.earned : [],
      counters: {
        shares: typeof parsed.counters?.shares === 'number' ? parsed.counters.shares : 0,
        spins: typeof parsed.counters?.spins === 'number' ? parsed.counters.spins : 0,
      },
    };
  } catch {
    return defaultData;
  }
}

function saveData(data: AchievementsData): void {
  try {
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(data));
  } catch {
    // localStorage full or blocked
  }
}

export function useAchievements() {
  const [data, setData] = useState<AchievementsData>(getStoredData);
  const [newlyEarned, setNewlyEarned] = useState<Badge | null>(null);

  const award = useCallback((id: string): boolean => {
    const current = getStoredData();
    if (current.earned.includes(id)) return false;

    const badge = achievementBadges.find((b) => b.id === id);
    if (!badge) return false;

    const updated = { ...current, earned: [...current.earned, id] };
    saveData(updated);
    setData(updated);
    setNewlyEarned(badge);
    return true;
  }, []);

  const incrementCounter = useCallback((counter: 'shares' | 'spins'): Badge | null => {
    const current = getStoredData();
    const newCount = current.counters[counter] + 1;
    const updated = {
      ...current,
      counters: { ...current.counters, [counter]: newCount },
    };

    let earnedBadge: Badge | null = null;

    if (counter === 'shares' && newCount === 5 && !current.earned.includes('share-master')) {
      updated.earned = [...updated.earned, 'share-master'];
      earnedBadge = achievementBadges.find((b) => b.id === 'share-master') ?? null;
    }

    if (counter === 'spins' && newCount === 1 && !current.earned.includes('first-spin')) {
      updated.earned = [...updated.earned, 'first-spin'];
      earnedBadge = achievementBadges.find((b) => b.id === 'first-spin') ?? null;
    }

    saveData(updated);
    setData(updated);

    if (earnedBadge) {
      setNewlyEarned(earnedBadge);
    }

    return earnedBadge;
  }, []);

  const checkTimeBasedAchievement = useCallback((): Badge | null => {
    const current = getStoredData();
    const hour = new Date().getHours();

    if (hour >= 3 && hour < 5 && !current.earned.includes('early-bird')) {
      const updated = { ...current, earned: [...current.earned, 'early-bird'] };
      saveData(updated);
      setData(updated);
      const badge = achievementBadges.find((b) => b.id === 'early-bird') ?? null;
      if (badge) setNewlyEarned(badge);
      return badge;
    }

    if ((hour >= 22 || hour < 3) && !current.earned.includes('night-owl')) {
      const updated = { ...current, earned: [...current.earned, 'night-owl'] };
      saveData(updated);
      setData(updated);
      const badge = achievementBadges.find((b) => b.id === 'night-owl') ?? null;
      if (badge) setNewlyEarned(badge);
      return badge;
    }

    return null;
  }, []);

  const checkAllModes = useCallback((modesSpunToday: Set<string>): Badge | null => {
    const current = getStoredData();
    if (
      modesSpunToday.has('sahur') &&
      modesSpunToday.has('iftar') &&
      modesSpunToday.has('takjil') &&
      !current.earned.includes('all-modes')
    ) {
      const updated = { ...current, earned: [...current.earned, 'all-modes'] };
      saveData(updated);
      setData(updated);
      const badge = achievementBadges.find((b) => b.id === 'all-modes') ?? null;
      if (badge) setNewlyEarned(badge);
      return badge;
    }
    return null;
  }, []);

  const dismissNewBadge = useCallback(() => {
    setNewlyEarned(null);
  }, []);

  const earnedBadges = achievementBadges.filter((b) => data.earned.includes(b.id));
  const lockedBadges = achievementBadges.filter((b) => !data.earned.includes(b.id));

  return {
    earnedBadges,
    lockedBadges,
    allBadges: achievementBadges,
    counters: data.counters,
    newlyEarned,
    dismissNewBadge,
    award,
    incrementCounter,
    checkTimeBasedAchievement,
    checkAllModes,
  };
}
