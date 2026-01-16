import { forwardRef } from 'react';
import type { BingoItem } from '../data/bingo';
import { config } from '../config';

interface BingoShareCardProps {
  card: BingoItem[];
  completed: Set<string>;
  lines: number[][];
}

export const BingoShareCard = forwardRef<HTMLDivElement, BingoShareCardProps>(
  function BingoShareCard({ card, completed, lines }, ref) {
    const bingoLineIndices = new Set(lines.flat());
    const hasBingo = lines.length > 0;

    return (
      <div
        ref={ref}
        className="w-full p-4 rounded-2xl bg-gradient-to-b from-primary to-night border border-gold/30"
      >
        <div className="text-center mb-3">
          <span className="text-2xl">🌙</span>
          <h2 className="text-gold font-bold">Ramadan Bingo</h2>
          {hasBingo && (
            <p className="text-gold text-sm animate-pulse">BINGO! 🎉</p>
          )}
        </div>

        <div className="grid grid-cols-5 gap-1 mb-3">
          {card.map((item, idx) => {
            const isCompleted = completed.has(item.id);
            const isInBingoLine = bingoLineIndices.has(idx);

            return (
              <div
                key={`${item.id}-${idx}`}
                className={`aspect-square rounded flex items-center justify-center text-lg ${
                  isCompleted
                    ? isInBingoLine
                      ? 'bg-gold text-night'
                      : 'bg-green/80'
                    : 'bg-card/50'
                }`}
              >
                {isCompleted ? '✓' : ''}
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-white/60 text-xs">{completed.size}/25 selesai</p>
          <p className="text-white/50 text-xs mt-2">{config.appUrl}</p>
          <p className="text-white/40 text-xs">#RamadanBingo</p>
        </div>
      </div>
    );
  }
);
