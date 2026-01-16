import { useState, useCallback } from 'react';

const SPIN_KEY = 'ramadan-spin-limit-v2';
const MAX_REROLLS = 3;

type Mode = 'sahur' | 'iftar' | 'takjil';

interface FreeSpins {
  sahur: boolean;
  iftar: boolean;
  takjil: boolean;
}

interface SpinData {
  date: string;
  freeSpins: FreeSpins;
  rerollsUsed: number;
  bonusRerolls: number;
}

type SpinResult = { used: 'free' } | { used: 'reroll' };

function getDefaultData(): SpinData {
  return {
    date: new Date().toDateString(),
    freeSpins: { sahur: true, iftar: true, takjil: true },
    rerollsUsed: 0,
    bonusRerolls: 0,
  };
}

function getStoredData(): SpinData {
  const defaultData = getDefaultData();
  try {
    const stored = localStorage.getItem(SPIN_KEY);
    if (!stored) return defaultData;

    const parsed = JSON.parse(stored);
    if (typeof parsed.date !== 'string') return defaultData;

    if (parsed.date !== new Date().toDateString()) {
      return defaultData;
    }

    return {
      date: parsed.date,
      freeSpins: {
        sahur: parsed.freeSpins?.sahur ?? true,
        iftar: parsed.freeSpins?.iftar ?? true,
        takjil: parsed.freeSpins?.takjil ?? true,
      },
      rerollsUsed: typeof parsed.rerollsUsed === 'number' ? parsed.rerollsUsed : 0,
      bonusRerolls: typeof parsed.bonusRerolls === 'number' ? parsed.bonusRerolls : 0,
    };
  } catch {
    return defaultData;
  }
}

function saveData(data: SpinData): void {
  localStorage.setItem(SPIN_KEY, JSON.stringify(data));
}

export function useSpinLimit() {
  const [data, setData] = useState<SpinData>(getStoredData);

  const hasFreeSpinFor = useCallback((mode: Mode): boolean => {
    const current = getStoredData();
    return current.freeSpins[mode];
  }, []);

  const rerollsLeft = Math.max(0, MAX_REROLLS - data.rerollsUsed + data.bonusRerolls);

  const canSpin = useCallback((mode: Mode): boolean => {
    const current = getStoredData();
    if (current.freeSpins[mode]) return true;
    const available = MAX_REROLLS - current.rerollsUsed + current.bonusRerolls;
    return available > 0;
  }, []);

  const spin = useCallback((mode: Mode): SpinResult | false => {
    const current = getStoredData();

    if (current.freeSpins[mode]) {
      const newData: SpinData = {
        ...current,
        freeSpins: { ...current.freeSpins, [mode]: false },
      };
      saveData(newData);
      setData(newData);
      return { used: 'free' };
    }

    const available = MAX_REROLLS - current.rerollsUsed + current.bonusRerolls;
    if (available <= 0) return false;

    const newData: SpinData = {
      ...current,
      rerollsUsed: current.rerollsUsed + 1,
    };
    saveData(newData);
    setData(newData);
    return { used: 'reroll' };
  }, []);

  const addBonusReroll = useCallback(() => {
    const current = getStoredData();
    const newData: SpinData = {
      ...current,
      bonusRerolls: current.bonusRerolls + 1,
    };
    saveData(newData);
    setData(newData);
  }, []);

  const freeSpinsStatus = {
    sahur: data.freeSpins.sahur,
    iftar: data.freeSpins.iftar,
    takjil: data.freeSpins.takjil,
  };

  return {
    hasFreeSpinFor,
    rerollsLeft,
    canSpin,
    spin,
    addBonusReroll,
    freeSpinsStatus,
  };
}
