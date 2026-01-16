import type { MenuItem } from './sahur';

export interface RareCombo {
  id: string;
  name: string;
  description: string;
  items: string[];
  emoji: string;
}

export const rareCombos: RareCombo[] = [
  {
    id: 'anak-kos-legend',
    name: 'Combo Anak Kos Legend',
    description: 'Budget terbatas, rasa unlimited!',
    items: ['mie-instan', 'telur-ceplok', 'sambal-terasi'],
    emoji: '🎓',
  },
  {
    id: 'sultan-sahur',
    name: 'Sultan Sahur',
    description: 'Sahur mewah ala raja!',
    items: ['ayam-goreng', 'nasi-goreng', 'sambal-matah'],
    emoji: '👑',
  },
  {
    id: 'healthy-warrior',
    name: 'Healthy Warrior',
    description: 'Sehat dan bergizi untuk puasa penuh energi!',
    items: ['telur-rebus', 'oatmeal', 'lalapan'],
    emoji: '💪',
  },
  {
    id: 'nostalgia-90an',
    name: 'Nostalgia 90an',
    description: 'Flashback masa kecil!',
    items: ['sosis', 'nasi-putih', 'kerupuk'],
    emoji: '📺',
  },
  {
    id: 'minang-sejati',
    name: 'Minang Sejati',
    description: 'Padang dalam satu piring!',
    items: ['ayam-goreng', 'nasi-putih', 'sambal-terasi'],
    emoji: '🏔️',
  },
  {
    id: 'jawa-klasik',
    name: 'Jawa Klasik',
    description: 'Tradisi Jawa yang timeless!',
    items: ['tempe-goreng', 'nasi-putih', 'sayur-asem'],
    emoji: '🎭',
  },
  {
    id: 'protein-bomb',
    name: 'Protein Bomb',
    description: 'Gym bro approved!',
    items: ['telur-rebus', 'ayam-goreng', 'tempe-goreng'],
    emoji: '🏋️',
  },
  {
    id: 'comfort-food',
    name: 'Comfort Food Supreme',
    description: 'Peluk hangat dalam bentuk makanan!',
    items: ['bubur-ayam', 'telur-dadar', 'kerupuk'],
    emoji: '🤗',
  },
  {
    id: 'carb-loading',
    name: 'Carb Loading Master',
    description: 'Energi untuk maraton puasa!',
    items: ['nasi-goreng', 'mie-instan', 'roti-bakar'],
    emoji: '⚡',
  },
  {
    id: 'simple-blessed',
    name: 'Simple but Blessed',
    description: 'Sederhana tapi penuh berkah!',
    items: ['telur-ceplok', 'nasi-putih', 'sambal-terasi'],
    emoji: '✨',
  },
  {
    id: 'seafood-lover',
    name: 'Seafood Lover',
    description: 'Aroma laut di meja makan!',
    items: ['ikan-goreng', 'nasi-putih', 'sambal-matah'],
    emoji: '🐟',
  },
  {
    id: 'vegetarian-power',
    name: 'Vegetarian Power',
    description: 'Hijau dan bertenaga!',
    items: ['tahu-goreng', 'tempe-goreng', 'sayur-bayam'],
    emoji: '🥬',
  },
];

export function checkRareCombo(items: MenuItem[]): RareCombo | null {
  const itemIds = items.map((item) => item.id);

  for (const combo of rareCombos) {
    const matches = combo.items.every((comboItem) => itemIds.includes(comboItem));
    if (matches) {
      return combo;
    }
  }

  return null;
}

export function getNearMissCombo(items: MenuItem[]): RareCombo | null {
  const itemIds = items.map((item) => item.id);

  for (const combo of rareCombos) {
    const matchCount = combo.items.filter((comboItem) => itemIds.includes(comboItem)).length;
    if (matchCount === 2) {
      return combo;
    }
  }

  return null;
}
