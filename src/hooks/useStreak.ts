import { useState, useCallback } from 'react';

const STREAK_KEY = 'ramadan-spin-streak';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastSpinDate: string;
}

function getStoredStreak(): StreakData {
  const defaultData: StreakData = {
    currentStreak: 0,
    longestStreak: 0,
    lastSpinDate: '',
  };
  try {
    const stored = localStorage.getItem(STREAK_KEY);
    if (!stored) return defaultData;
    const parsed = JSON.parse(stored);
    if (
      typeof parsed.currentStreak !== 'number' ||
      typeof parsed.longestStreak !== 'number' ||
      typeof parsed.lastSpinDate !== 'string'
    ) {
      return defaultData;
    }
    return parsed;
  } catch {
    return defaultData;
  }
}

function isYesterday(dateStr: string): boolean {
  const date = new Date(dateStr);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
}

function isToday(dateStr: string): boolean {
  return dateStr === new Date().toDateString();
}

export function useStreak() {
  const [streakData, setStreakData] = useState<StreakData>(getStoredStreak);

  const recordSpin = useCallback(() => {
    const today = new Date().toDateString();
    const current = getStoredStreak();

    if (isToday(current.lastSpinDate)) {
      return current;
    }

    let newStreak: number;
    if (isYesterday(current.lastSpinDate)) {
      newStreak = current.currentStreak + 1;
    } else if (current.lastSpinDate === '') {
      newStreak = 1;
    } else {
      newStreak = 1;
    }

    const newData: StreakData = {
      currentStreak: newStreak,
      longestStreak: Math.max(current.longestStreak, newStreak),
      lastSpinDate: today,
    };

    localStorage.setItem(STREAK_KEY, JSON.stringify(newData));
    setStreakData(newData);
    return newData;
  }, []);

  const hasSpunToday = isToday(streakData.lastSpinDate);

  return {
    currentStreak: streakData.currentStreak,
    longestStreak: streakData.longestStreak,
    hasSpunToday,
    recordSpin,
  };
}
