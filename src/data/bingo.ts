export interface BingoItem {
  id: string;
  text: string;
  emoji: string;
  type: 'auto' | 'manual';
  autoTrigger?: string;
}

export const bingoItems: BingoItem[] = [
  { id: 'first-spin', text: 'Spin pertama!', emoji: '🎰', type: 'auto', autoTrigger: 'first_spin' },
  { id: 'sahur-spin', text: 'Spin pas sahur (3-5 AM)', emoji: '🌙', type: 'auto', autoTrigger: 'sahur_time' },
  { id: 'share-wa', text: 'Share ke WhatsApp', emoji: '💬', type: 'auto', autoTrigger: 'share_whatsapp' },
  { id: 'share-image', text: 'Download gambar hasil', emoji: '📤', type: 'auto', autoTrigger: 'share_image' },
  { id: 'rare-combo', text: 'Dapat combo langka!', emoji: '✨', type: 'auto', autoTrigger: 'rare_combo' },
  { id: 'streak-3', text: '3 hari streak', emoji: '🔥', type: 'auto', autoTrigger: 'streak_3' },
  { id: 'streak-7', text: '7 hari streak', emoji: '🌟', type: 'auto', autoTrigger: 'streak_7' },
  { id: 'all-modes', text: 'Spin semua mode 1 hari', emoji: '🎪', type: 'auto', autoTrigger: 'all_modes' },
  { id: 'night-spin', text: 'Spin malam (10 PM+)', emoji: '🦉', type: 'auto', autoTrigger: 'night_time' },

  { id: 'takjil-tetangga', text: 'Dapat takjil dari tetangga', emoji: '🏘️', type: 'manual' },
  { id: 'masak-sendiri', text: 'Masak sahur sendiri', emoji: '👨‍🍳', type: 'manual' },
  { id: 'buka-bareng', text: 'Buka bareng teman', emoji: '👥', type: 'manual' },
  { id: 'tarawih-full', text: 'Tarawih 20 rakaat', emoji: '🕌', type: 'manual' },
  { id: 'ngaji-hatam', text: 'Khatam Al-Quran', emoji: '📖', type: 'manual' },
  { id: 'infaq', text: 'Infaq/sedekah', emoji: '💝', type: 'manual' },
  { id: 'itikaf', text: "I'tikaf di masjid", emoji: '🌃', type: 'manual' },
  { id: 'sahur-keluarga', text: 'Sahur bareng keluarga', emoji: '👨‍👩‍👧', type: 'manual' },
  { id: 'pasar-ramadan', text: 'Belanja di pasar Ramadan', emoji: '🛒', type: 'manual' },
  { id: 'menu-spin-match', text: 'Makan sesuai hasil spin!', emoji: '🎯', type: 'manual' },
  { id: 'kolak-homemade', text: 'Bikin kolak sendiri', emoji: '🍌', type: 'manual' },
  { id: 'gorengan-sore', text: 'Goreng gorengan sendiri', emoji: '🍤', type: 'manual' },
  { id: 'subuh-jamaah', text: 'Subuh berjamaah', emoji: '🌅', type: 'manual' },
  { id: 'lailatul-qadar', text: 'Ibadah malam Lailatul Qadar', emoji: '🌙', type: 'manual' },
  { id: 'zakat-fitrah', text: 'Bayar zakat fitrah', emoji: '💰', type: 'manual' },
  { id: 'tadarus', text: 'Tadarus bareng', emoji: '📚', type: 'manual' },
  { id: 'sahur-simple', text: 'Sahur cuma kurma+air', emoji: '🌴', type: 'manual' },
  { id: 'ngabuburit', text: 'Ngabuburit jalan-jalan', emoji: '🚶', type: 'manual' },
  { id: 'bagi-takjil', text: 'Bagi-bagi takjil', emoji: '🎁', type: 'manual' },
  { id: 'puasa-sunnah', text: 'Puasa sunnah sebelum Ramadan', emoji: '📅', type: 'manual' },
];

export function generateBingoCard(): BingoItem[] {
  const shuffled = [...bingoItems].sort(() => Math.random() - 0.5);
  const card = shuffled.slice(0, 25);

  const centerIndex = 12;
  card[centerIndex] = {
    id: 'free',
    text: 'FREE! 🌙',
    emoji: '⭐',
    type: 'manual',
  };

  return card;
}

export function checkBingo(completed: Set<string>, card: BingoItem[]): { hasBingo: boolean; lines: number[][] } {
  const grid: boolean[][] = [];
  for (let i = 0; i < 5; i++) {
    grid.push([]);
    for (let j = 0; j < 5; j++) {
      const item = card[i * 5 + j];
      grid[i].push(completed.has(item.id) || item.id === 'free');
    }
  }

  const lines: number[][] = [];

  for (let i = 0; i < 5; i++) {
    if (grid[i].every(Boolean)) {
      lines.push(Array.from({ length: 5 }, (_, j) => i * 5 + j));
    }
  }

  for (let j = 0; j < 5; j++) {
    if (grid.every((row) => row[j])) {
      lines.push(Array.from({ length: 5 }, (_, i) => i * 5 + j));
    }
  }

  if (grid.every((row, i) => row[i])) {
    lines.push([0, 6, 12, 18, 24]);
  }

  if (grid.every((row, i) => row[4 - i])) {
    lines.push([4, 8, 12, 16, 20]);
  }

  return { hasBingo: lines.length > 0, lines };
}
