import { type Badge, tierColors } from '../data/badges';

interface AchievementBadgesProps {
  earnedBadges: Badge[];
  lockedBadges: Badge[];
  onClose: () => void;
}

export function AchievementBadges({ earnedBadges, lockedBadges, onClose }: AchievementBadgesProps) {
  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="badges-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <div className="bg-card rounded-2xl p-6 max-w-sm md:max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 id="badges-title" className="text-xl font-bold text-gold">
            <span aria-hidden="true">🏆</span> Achievements
          </h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl"
            aria-label="Tutup"
          >
            ×
          </button>
        </div>

        {earnedBadges.length > 0 && (
          <section className="mb-6">
            <h3 className="text-sm font-semibold text-white/60 mb-3">
              Unlocked ({earnedBadges.length})
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {earnedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className={`bg-gradient-to-br ${tierColors[badge.tier]} rounded-xl p-3 text-center`}
                >
                  <div className="text-2xl" aria-hidden="true">{badge.emoji}</div>
                  <div className="text-xs font-medium text-night mt-1">{badge.name}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {lockedBadges.length > 0 && (
          <section>
            <h3 className="text-sm font-semibold text-white/60 mb-3">
              Locked ({lockedBadges.length})
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {lockedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="bg-white/5 rounded-xl p-3 text-center opacity-50"
                >
                  <div className="text-2xl grayscale" aria-hidden="true">{badge.emoji}</div>
                  <div className="text-xs font-medium text-white/40 mt-1">{badge.name}</div>
                  <div className="text-[10px] text-white/30 mt-1">{badge.description}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {earnedBadges.length === 0 && (
          <p className="text-center text-white/40 py-8">
            Belum ada achievement. Terus spin untuk unlock!
          </p>
        )}
      </div>
    </div>
  );
}
