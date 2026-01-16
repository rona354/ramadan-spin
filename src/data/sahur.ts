export interface MenuItem {
  id: string;
  name: string;
  emoji: string;
}

export const protein: MenuItem[] = [
  { id: 'telur-ceplok', name: 'Telur Ceplok', emoji: '🍳' },
  { id: 'telur-dadar', name: 'Telur Dadar', emoji: '🍳' },
  { id: 'telur-rebus', name: 'Telur Rebus', emoji: '🥚' },
  { id: 'tempe-goreng', name: 'Tempe Goreng', emoji: '🟫' },
  { id: 'tahu-goreng', name: 'Tahu Goreng', emoji: '🟨' },
  { id: 'ayam-goreng', name: 'Ayam Goreng', emoji: '🍗' },
  { id: 'ikan-goreng', name: 'Ikan Goreng', emoji: '🐟' },
  { id: 'sosis', name: 'Sosis', emoji: '🌭' },
  { id: 'nugget', name: 'Nugget', emoji: '🍗' },
  { id: 'kornet', name: 'Kornet', emoji: '🥫' },
];

export const carbs: MenuItem[] = [
  { id: 'nasi-putih', name: 'Nasi Putih', emoji: '🍚' },
  { id: 'nasi-goreng', name: 'Nasi Goreng', emoji: '🍛' },
  { id: 'mie-instan', name: 'Mie Instan', emoji: '🍜' },
  { id: 'mie-goreng', name: 'Mie Goreng', emoji: '🍝' },
  { id: 'bubur-ayam', name: 'Bubur Ayam', emoji: '🥣' },
  { id: 'roti-bakar', name: 'Roti Bakar', emoji: '🍞' },
  { id: 'lontong', name: 'Lontong', emoji: '🍙' },
  { id: 'oatmeal', name: 'Oatmeal', emoji: '🥣' },
];

export const sides: MenuItem[] = [
  { id: 'sambal-terasi', name: 'Sambal Terasi', emoji: '🌶️' },
  { id: 'sambal-matah', name: 'Sambal Matah', emoji: '🌶️' },
  { id: 'kerupuk', name: 'Kerupuk', emoji: '🥠' },
  { id: 'emping', name: 'Emping', emoji: '🥠' },
  { id: 'acar', name: 'Acar', emoji: '🥒' },
  { id: 'lalapan', name: 'Lalapan', emoji: '🥬' },
  { id: 'sayur-asem', name: 'Sayur Asem', emoji: '🥗' },
  { id: 'sayur-bayam', name: 'Sayur Bayam', emoji: '🥬' },
];
