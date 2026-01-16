export interface Badge {
  id: string;
  name: string;
  description: string;
  emoji: string;
  requirement: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export const streakBadges: Badge[] = [
  {
    id: 'streak-3',
    name: 'Pemula Rajin',
    description: '3 hari berturut-turut spin!',
    emoji: '🌱',
    requirement: 3,
    tier: 'bronze',
  },
  {
    id: 'streak-7',
    name: 'Seminggu Istiqomah',
    description: 'Seminggu penuh konsisten!',
    emoji: '🔥',
    requirement: 7,
    tier: 'silver',
  },
  {
    id: 'streak-14',
    name: 'Setengah Jalan',
    description: '2 minggu - setengah Ramadan!',
    emoji: '⭐',
    requirement: 14,
    tier: 'gold',
  },
  {
    id: 'streak-21',
    name: '3 Minggu Warrior',
    description: 'Hampir sampai garis finish!',
    emoji: '💎',
    requirement: 21,
    tier: 'gold',
  },
  {
    id: 'streak-30',
    name: 'Ramadan Champion',
    description: 'Full 30 hari! Masyaallah!',
    emoji: '🏆',
    requirement: 30,
    tier: 'platinum',
  },
];

export const achievementBadges: Badge[] = [
  {
    id: 'first-spin',
    name: 'Spinner Pertama',
    description: 'Selamat datang di Ramadan Spin!',
    emoji: '🎰',
    requirement: 1,
    tier: 'bronze',
  },
  {
    id: 'share-master',
    name: 'Social Butterfly',
    description: 'Sudah share 5 kali!',
    emoji: '🦋',
    requirement: 5,
    tier: 'silver',
  },
  {
    id: 'rare-hunter',
    name: 'Rare Combo Hunter',
    description: 'Dapat combo langka!',
    emoji: '🎯',
    requirement: 1,
    tier: 'gold',
  },
  {
    id: 'all-modes',
    name: 'Triple Threat',
    description: 'Spin di semua mode dalam 1 hari!',
    emoji: '🎪',
    requirement: 1,
    tier: 'silver',
  },
  {
    id: 'early-bird',
    name: 'Early Bird Sahur',
    description: 'Spin antara jam 3-5 pagi!',
    emoji: '🐦',
    requirement: 1,
    tier: 'bronze',
  },
  {
    id: 'night-owl',
    name: 'Night Owl',
    description: 'Spin setelah jam 10 malam!',
    emoji: '🦉',
    requirement: 1,
    tier: 'bronze',
  },
];

export function getStreakBadge(streak: number): Badge | null {
  const earned = streakBadges.filter((b) => streak >= b.requirement);
  return earned.length > 0 ? earned[earned.length - 1] : null;
}

export function getNextStreakBadge(streak: number): Badge | null {
  return streakBadges.find((b) => b.requirement > streak) ?? null;
}

export function getStreakProgress(streak: number): { current: Badge | null; next: Badge | null; progress: number } {
  const current = getStreakBadge(streak);
  const next = getNextStreakBadge(streak);

  if (!next) {
    return { current, next: null, progress: 100 };
  }

  const prevRequirement = current?.requirement ?? 0;
  const progress = ((streak - prevRequirement) / (next.requirement - prevRequirement)) * 100;

  return { current, next, progress };
}

export const tierColors = {
  bronze: 'from-amber-700 to-amber-500',
  silver: 'from-gray-400 to-gray-200',
  gold: 'from-yellow-500 to-yellow-300',
  platinum: 'from-purple-500 to-pink-500',
};
