import type { HistoryEntry } from '../hooks/useHistory';

interface HistoryListProps {
  entries: HistoryEntry[];
}

const modeLabels = {
  sahur: 'Sahur',
  iftar: 'Buka',
  takjil: 'Takjil',
};

export function HistoryList({ entries }: HistoryListProps) {
  if (entries.length === 0) return null;

  return (
    <section className="bg-card rounded-2xl p-4 border border-gold/20" aria-label="Riwayat spin hari ini">
      <h3 className="text-sm font-medium text-white/70 mb-3 flex items-center gap-2">
        <span aria-hidden="true">📜</span> Riwayat Hari Ini
      </h3>
      <div className="space-y-2">
        {entries.map((entry, idx) => (
          <div
            key={entry.timestamp}
            className="flex items-center gap-3 bg-night/50 rounded-lg p-2 text-sm"
          >
            <span className="text-white/50 w-5 text-center">{idx + 1}.</span>
            <span className="text-gold text-xs font-medium w-12">{modeLabels[entry.mode]}</span>
            <div className="flex gap-1 flex-1">
              {entry.results.map((item) => (
                <span key={item.id} title={item.name} className="text-base">
                  {item.emoji}
                </span>
              ))}
            </div>
            <span className="text-white/40 text-xs">
              {new Date(entry.timestamp).toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
