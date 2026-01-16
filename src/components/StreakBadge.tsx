import { getStreakProgress, tierColors } from '../data/badges';

interface StreakBadgeProps {
  currentStreak: number;
  longestStreak: number;
  onOpenAchievements?: () => void;
  achievementCount?: number;
}

export function StreakBadge({ currentStreak, longestStreak, onOpenAchievements, achievementCount = 0 }: StreakBadgeProps) {
  const { current, next, progress } = getStreakProgress(currentStreak);

  if (currentStreak === 0 && longestStreak === 0) {
    return (
      <div className="flex items-center justify-center gap-3">
        <p className="text-white/50 text-sm">Spin pertamamu untuk mulai streak!</p>
        {onOpenAchievements && (
          <button
            onClick={onOpenAchievements}
            className="flex items-center gap-1 px-2 py-1 rounded-full bg-card text-white/60 hover:text-white transition-colors"
            aria-label="Lihat achievements"
          >
            <span>🏆</span>
            {achievementCount > 0 && <span className="text-xs">{achievementCount}</span>}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-center gap-3">
        {current && (
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${tierColors[current.tier]} text-night font-medium shadow-lg`}
          >
            <span className="text-xl">{current.emoji}</span>
            <span className="text-sm">{current.name}</span>
          </div>
        )}

        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-card text-white/80">
          <span className="text-lg">🔥</span>
          <span className="font-bold">{currentStreak}</span>
          <span className="text-white/60 text-sm">hari</span>
        </div>

        {onOpenAchievements && (
          <button
            onClick={onOpenAchievements}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-card text-white/60 hover:text-white transition-colors"
            aria-label="Lihat achievements"
          >
            <span>🏆</span>
            {achievementCount > 0 && <span className="text-sm">{achievementCount}</span>}
          </button>
        )}
      </div>

      {next && (
        <div className="max-w-xs mx-auto">
          <div className="flex items-center justify-between text-xs text-white/60 mb-1">
            <span>Next: {next.emoji} {next.name}</span>
            <span>{next.requirement - currentStreak} hari lagi</span>
          </div>
          <div className="h-2 bg-card rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${tierColors[next.tier]} transition-all duration-500`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {!next && currentStreak >= 30 && (
        <p className="text-center text-gold text-sm animate-pulse">
          🏆 Ramadan Champion! Masyaallah!
        </p>
      )}
    </div>
  );
}
