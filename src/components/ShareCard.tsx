import { forwardRef } from 'react';
import type { MenuItem } from '../data/sahur';
import { config } from '../config';

interface ShareCardProps {
  mode: 'sahur' | 'iftar' | 'takjil';
  results: MenuItem[];
  ramadanDay: number;
}

const modeLabels = {
  sahur: 'MENU SAHURKU',
  iftar: 'MENU BUKAANKU',
  takjil: 'TAKJILKU',
};

export const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(
  function ShareCard({ mode, results, ramadanDay }, ref) {
    return (
      <div
        ref={ref}
        className="w-80 md:w-96 p-6 rounded-2xl bg-gradient-to-b from-primary to-night border border-gold/30"
      >
        <div className="text-center mb-4">
          <span className="text-2xl">🌙</span>
          <p className="text-white/70 text-xs mt-1">Hari ke-{ramadanDay} Ramadan</p>
          <h2 className="text-gold font-bold text-lg mt-1">
            {modeLabels[mode]} HARI INI
          </h2>
        </div>

        <div className="space-y-3 mb-6">
          {results.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 bg-card/50 rounded-lg p-3"
              role="listitem"
            >
              <span className="text-2xl" role="img" aria-label={item.name}>
                {item.emoji}
              </span>
              <span className="text-white font-medium">{item.name}</span>
            </div>
          ))}
        </div>

        <div className="text-center text-sm text-white/60">
          <p>Spin menu kamu di:</p>
          <p className="text-gold font-medium">{config.appUrl}</p>
          <p className="mt-2 text-xs">{config.hashtags.join(' ')}</p>
        </div>
      </div>
    );
  }
);
