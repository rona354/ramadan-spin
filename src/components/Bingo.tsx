import { useState, useEffect } from 'react';
import { generateBingoCard, checkBingo, type BingoItem } from '../data/bingo';
import { BingoShareCard } from './BingoShareCard';
import { useFocusTrap } from '../hooks/useFocusTrap';

const BINGO_STORAGE_KEY = 'ramadan-spin-bingo';
const MAX_STORAGE_SIZE = 10000;

interface BingoData {
  card: BingoItem[];
  completed: string[];
}

function isValidBingoItem(item: unknown): item is BingoItem {
  if (typeof item !== 'object' || item === null) return false;
  const obj = item as Record<string, unknown>;
  return (
    typeof obj.id === 'string' &&
    typeof obj.text === 'string' &&
    typeof obj.emoji === 'string' &&
    (obj.type === 'auto' || obj.type === 'manual')
  );
}

function isValidBingoData(data: unknown): data is BingoData {
  if (typeof data !== 'object' || data === null) return false;
  const obj = data as Record<string, unknown>;

  if (!Array.isArray(obj.card) || obj.card.length !== 25) return false;
  if (!obj.card.every(isValidBingoItem)) return false;
  if (!Array.isArray(obj.completed)) return false;
  if (!obj.completed.every((id): id is string => typeof id === 'string')) return false;
  if (obj.completed.length > 30) return false;

  return true;
}

function loadBingoData(): BingoData {
  try {
    const stored = localStorage.getItem(BINGO_STORAGE_KEY);
    if (stored && stored.length < MAX_STORAGE_SIZE) {
      const data = JSON.parse(stored);
      if (isValidBingoData(data)) return data;
    }
  } catch { /* corrupted data - regenerate */ }
  return { card: generateBingoCard(), completed: ['free'] };
}

function saveBingoData(data: BingoData) {
  localStorage.setItem(BINGO_STORAGE_KEY, JSON.stringify(data));
}

interface BingoProps {
  onClose: () => void;
  autoCompleted?: Set<string>;
}

export function Bingo({ onClose, autoCompleted = new Set() }: BingoProps) {
  const [data, setData] = useState<BingoData>(loadBingoData);
  const [showShare, setShowShare] = useState(false);
  const focusTrapRef = useFocusTrap<HTMLDivElement>(onClose);

  const completedSet = new Set([...data.completed, ...autoCompleted]);
  const { hasBingo, lines } = checkBingo(completedSet, data.card);
  const completedCount = completedSet.size;

  useEffect(() => {
    if (autoCompleted.size > 0) {
      const newCompleted = [...new Set([...data.completed, ...autoCompleted])];
      const newData = { ...data, completed: newCompleted };
      setData(newData);
      saveBingoData(newData);
    }
  }, [autoCompleted]);

  const toggleItem = (item: BingoItem) => {
    if (item.type === 'auto' || item.id === 'free') return;

    const newCompleted = data.completed.includes(item.id)
      ? data.completed.filter((id) => id !== item.id)
      : [...data.completed, item.id];

    const newData = { ...data, completed: newCompleted };
    setData(newData);
    saveBingoData(newData);
  };

  const resetBingo = () => {
    const newData = { card: generateBingoCard(), completed: ['free'] };
    setData(newData);
    saveBingoData(newData);
  };

  const bingoLineIndices = new Set(lines.flat());

  return (
    <div
      ref={focusTrapRef}
      className="fixed inset-0 bg-night/95 z-50 flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bingo-title"
    >
      <div className="w-full max-w-md md:max-w-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 id="bingo-title" className="text-gold font-bold text-lg">Ramadan Bingo</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white text-2xl" aria-label="Tutup bingo">
            ×
          </button>
        </div>

        <div className="flex items-center justify-between mb-4 text-sm">
          <span className="text-white/60">{completedCount}/25 selesai</span>
          {hasBingo && (
            <span className="text-gold font-bold animate-pulse">BINGO! 🎉</span>
          )}
        </div>

        {showShare ? (
          <div className="space-y-4">
            <BingoShareCard card={data.card} completed={completedSet} lines={lines} />
            <div className="flex gap-2">
              <button
                onClick={() => setShowShare(false)}
                className="flex-1 py-3 rounded-xl bg-card text-white"
              >
                Kembali
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-5 gap-1 mb-4">
              {data.card.map((item, idx) => {
                const isCompleted = completedSet.has(item.id);
                const isInBingoLine = bingoLineIndices.has(idx);

                return (
                  <button
                    key={`${item.id}-${idx}`}
                    onClick={() => toggleItem(item)}
                    disabled={item.type === 'auto'}
                    className={`aspect-square p-1 rounded-lg text-center transition-all ${
                      isCompleted
                        ? isInBingoLine
                          ? 'bg-gold text-night'
                          : 'bg-green/80 text-white'
                        : 'bg-card text-white/70 hover:bg-card/80'
                    } ${item.type === 'auto' ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <span className="text-lg block">{item.emoji}</span>
                    <span className="text-[8px] md:text-[10px] leading-tight block">{item.text}</span>
                  </button>
                );
              })}
            </div>

            <p className="text-white/50 text-xs text-center mb-4">
              Tap kotak manual untuk checklist. Auto = otomatis dari aktivitas.
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setShowShare(true)}
                className="flex-1 py-3 rounded-xl bg-gold text-night font-bold"
              >
                📤 Share Progress
              </button>
              <button
                onClick={resetBingo}
                className="py-3 px-4 rounded-xl bg-card text-white/60 hover:text-white"
              >
                🔄
              </button>
            </div>
          </>
        )}

        <button
          onClick={onClose}
          className="w-full mt-2 py-2 text-white/60 text-sm hover:text-white"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}
