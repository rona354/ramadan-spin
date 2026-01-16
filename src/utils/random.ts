import type { MenuItem, Region } from '../data/sahur';

export function filterByRegion(items: MenuItem[], region: Region | 'semua'): MenuItem[] {
  if (region === 'semua') return items;
  return items.filter((item) => !item.region || item.region === region);
}

export function getRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function getRandomItems<T>(items: T[], count: number): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, count);
}

export function getSahurCombo(
  protein: MenuItem[],
  carbs: MenuItem[],
  sides: MenuItem[]
): MenuItem[] {
  return [getRandomItem(protein), getRandomItem(carbs), getRandomItem(sides)];
}
