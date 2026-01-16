import { useState, useCallback } from 'react';
import type { MenuItem } from '../data/sahur';

const HISTORY_KEY = 'ramadan-spin-history';

type Mode = 'sahur' | 'iftar' | 'takjil';

export interface HistoryEntry {
  mode: Mode;
  results: MenuItem[];
  timestamp: number;
}

interface HistoryData {
  date: string;
  entries: HistoryEntry[];
}

function getStoredHistory(): HistoryData {
  const today = new Date().toDateString();
  const defaultData: HistoryData = { date: today, entries: [] };

  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (!stored) return defaultData;
    const parsed = JSON.parse(stored);

    if (parsed.date !== today) {
      return defaultData;
    }

    if (!Array.isArray(parsed.entries)) {
      return defaultData;
    }

    return parsed;
  } catch {
    return defaultData;
  }
}

export function useHistory() {
  const [historyData, setHistoryData] = useState<HistoryData>(getStoredHistory);

  const addEntry = useCallback((mode: Mode, results: MenuItem[]) => {
    const today = new Date().toDateString();
    const current = getStoredHistory();

    const newEntry: HistoryEntry = {
      mode,
      results,
      timestamp: Date.now(),
    };

    const newData: HistoryData = {
      date: today,
      entries: [...current.entries, newEntry],
    };

    localStorage.setItem(HISTORY_KEY, JSON.stringify(newData));
    setHistoryData(newData);
  }, []);

  return {
    entries: historyData.entries,
    addEntry,
  };
}
