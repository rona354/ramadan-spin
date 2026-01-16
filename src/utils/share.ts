import html2canvas from 'html2canvas';
import type { MenuItem } from '../data/sahur';
import { config } from '../config';

export function getRamadanDay(): number {
  const ramadanStart = new Date(config.ramadanStartDate);
  const today = new Date();
  const diffTime = today.getTime() - ramadanStart.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.min(30, diffDays));
}

export function generateShareText(
  mode: 'sahur' | 'iftar' | 'takjil',
  results: MenuItem[],
  ramadanDay: number
): string {
  const modeLabels = {
    sahur: 'Sahurku',
    iftar: 'Menu Bukaku',
    takjil: 'Takjilku',
  };

  const menuItems = results.map((r) => `${r.emoji} ${r.name}`).join('\n');

  return `🌙 Ramadan Spin - Hari ${ramadanDay}

${modeLabels[mode]} hari ini:
${menuItems}

Spin menu kamu di:
${config.appUrl}

${config.hashtags.join(' ')}`;
}

export async function copyShareText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function shareToWhatsApp(text: string): void {
  const encoded = encodeURIComponent(text);
  window.open(`https://wa.me/?text=${encoded}`, '_blank', 'noopener,noreferrer');
}

export async function generateShareCard(element: HTMLElement): Promise<Blob> {
  const canvas = await html2canvas(element, {
    backgroundColor: '#0F1729',
    scale: 2,
  });

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Failed to create blob'))),
      'image/png'
    );
  });
}

export async function shareResult(element: HTMLElement) {
  const blob = await generateShareCard(element);
  const file = new File([blob], 'ramadan-spin.png', { type: 'image/png' });

  if (navigator.share && navigator.canShare({ files: [file] })) {
    await navigator.share({
      files: [file],
      title: 'Menu Ramadanku',
      text: `Spin menu kamu di ${config.appUrl}`,
    });
  } else {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ramadan-spin.png';
    a.click();
    URL.revokeObjectURL(url);
  }
}
