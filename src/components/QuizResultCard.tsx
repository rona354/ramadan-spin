import { forwardRef } from 'react';
import type { QuizResult } from '../data/quiz';
import { config } from '../config';

interface QuizResultCardProps {
  result: QuizResult;
}

export const QuizResultCard = forwardRef<HTMLDivElement, QuizResultCardProps>(
  function QuizResultCard({ result }, ref) {
    return (
      <div
        ref={ref}
        className={`w-full p-6 rounded-2xl bg-gradient-to-br ${result.color} shadow-2xl`}
      >
        <div className="text-center mb-4">
          <span className="text-5xl">{result.emoji}</span>
        </div>

        <h2 className="text-2xl font-bold text-white text-center mb-2">
          {result.name}
        </h2>

        <p className="text-white/90 text-center text-sm mb-4">
          {result.description}
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {result.traits.map((trait) => (
            <span
              key={trait}
              className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium"
            >
              {trait}
            </span>
          ))}
        </div>

        <div className="bg-white/10 rounded-xl p-3">
          <p className="text-white/70 text-xs mb-1">Tips untuk kamu:</p>
          <p className="text-white text-sm">{result.tip}</p>
        </div>

        <div className="text-center mt-4 pt-4 border-t border-white/20">
          <p className="text-white/60 text-xs">Cari tau tipe puasamu di:</p>
          <p className="text-white font-medium text-sm">{config.appUrl}</p>
          <p className="text-white/50 text-xs mt-1">#RamadanSpin #TipePuasaku</p>
        </div>
      </div>
    );
  }
);
