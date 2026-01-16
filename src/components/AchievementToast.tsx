import { type Badge, tierColors } from '../data/badges';

interface AchievementToastProps {
  badge: Badge;
  onDismiss: () => void;
}

export function AchievementToast({ badge, onDismiss }: AchievementToastProps) {
  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-bounce"
      role="alert"
      aria-live="assertive"
    >
      <div
        className={`bg-gradient-to-r ${tierColors[badge.tier]} rounded-xl px-4 py-3 shadow-lg flex items-center gap-3 cursor-pointer`}
        onClick={onDismiss}
      >
        <div className="text-3xl">{badge.emoji}</div>
        <div>
          <div className="text-xs font-medium text-night/70">Achievement Unlocked!</div>
          <div className="font-bold text-night">{badge.name}</div>
        </div>
      </div>
    </div>
  );
}
