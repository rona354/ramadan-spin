import { useState, useEffect, useRef } from 'react';
import type { MenuItem } from '../data/sahur';
import { playSound } from '../utils/sound';

interface SlotMachineProps {
  items: MenuItem[];
  isSpinning: boolean;
  result: MenuItem | null;
  delay: number;
}

export function SlotMachine({ items, isSpinning, result, delay }: SlotMachineProps) {
  const [displayItem, setDisplayItem] = useState<MenuItem>(items[0]);
  const [stopped, setStopped] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isSpinning) return;

    let tickCount = 0;
    intervalRef.current = window.setInterval(() => {
      setDisplayItem(items[Math.floor(Math.random() * items.length)]);
      if (tickCount % 3 === 0) {
        playSound('tick');
      }
      tickCount++;
    }, 80);

    const stopTimeout = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (result) setDisplayItem(result);
      setStopped(true);
      playSound('stop');
    }, delay);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      clearTimeout(stopTimeout);
      setStopped(false);
    };
  }, [isSpinning, items, result, delay]);

  const current = stopped && result ? result : displayItem;

  return (
    <div
      role="status"
      aria-label={isSpinning && !stopped ? 'Sedang memilih...' : current.name}
      aria-busy={isSpinning && !stopped}
      className={`
        flex flex-col items-center justify-center
        w-24 h-28 rounded-xl
        bg-card border-2 border-gold/30
        ${isSpinning && !stopped ? 'slot-spinning' : ''}
        ${stopped ? 'result-bounce' : ''}
      `}
    >
      <span className="text-4xl mb-1" aria-hidden="true">{current.emoji}</span>
      <span className="text-xs text-center px-1 text-white/80 leading-tight">
        {current.name}
      </span>
    </div>
  );
}
