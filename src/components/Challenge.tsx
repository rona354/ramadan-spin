import { useState, useEffect } from 'react';
import type { MenuItem } from '../data/sahur';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface ChallengeProps {
  onClose: () => void;
  lastResult: MenuItem[] | null;
  mode: 'sahur' | 'iftar' | 'takjil';
}

const modeLabels = {
  sahur: 'Sahur',
  iftar: 'Buka',
  takjil: 'Takjil',
};

export function Challenge({ onClose, lastResult, mode }: ChallengeProps) {
  const [challengeUrl, setChallengeUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const focusTrapRef = useFocusTrap<HTMLDivElement>(onClose);

  const createChallenge = () => {
    if (!lastResult) return;

    const data = {
      m: mode,
      r: lastResult.map((item) => item.id),
      t: Date.now(),
    };
    const encoded = btoa(JSON.stringify(data));
    const url = `${window.location.origin}${window.location.pathname}?c=${encoded}`;
    setChallengeUrl(url);
  };

  const copyUrl = async () => {
    if (!challengeUrl) return;
    try {
      await navigator.clipboard.writeText(challengeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const shareWhatsApp = () => {
    if (!challengeUrl) return;
    const text = `🎯 Tebak Menu ${modeLabels[mode]}-ku!\n\nBisa tebak hasil spin-ku tidak?\n${challengeUrl}\n\n#RamadanSpin`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    if (lastResult) {
      createChallenge();
    }
  }, [lastResult]);

  if (!lastResult) {
    return (
      <div
        ref={focusTrapRef}
        className="fixed inset-0 bg-night/95 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="challenge-empty-title"
      >
        <div className="w-full max-w-sm text-center">
          <span className="text-6xl block mb-4" aria-hidden="true">🎯</span>
          <h2 id="challenge-empty-title" className="text-gold font-bold text-xl mb-2">Tebak Hasil Teman</h2>
          <p className="text-white/60 mb-4">
            Spin dulu untuk membuat tantangan!
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-card text-white"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={focusTrapRef}
      className="fixed inset-0 bg-night/95 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="challenge-title"
    >
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 id="challenge-title" className="text-gold font-bold text-lg">Tantang Teman!</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white text-2xl" aria-label="Tutup challenge">
            ×
          </button>
        </div>

        <div className="bg-card rounded-xl p-4 mb-4 text-center">
          <span className="text-4xl block mb-2">🎯</span>
          <p className="text-white font-medium mb-1">
            Menu {modeLabels[mode]}-mu sudah di-spin!
          </p>
          <p className="text-white/60 text-sm">
            Kirim link ke teman dan suruh mereka tebak hasilnya!
          </p>
        </div>

        <div className="bg-card/50 rounded-xl p-3 mb-4">
          <p className="text-white/60 text-xs mb-2">Link Challenge:</p>
          <p className="text-white text-xs break-all font-mono bg-night/50 p-2 rounded">
            {challengeUrl ? challengeUrl.slice(0, 60) + '...' : 'Loading...'}
          </p>
        </div>

        <div className="space-y-2">
          <button
            onClick={shareWhatsApp}
            className="w-full py-3 rounded-xl bg-[#25D366] text-white font-bold flex items-center justify-center gap-2"
          >
            <span>💬</span> Share ke WhatsApp
          </button>

          <button
            onClick={copyUrl}
            className="w-full py-3 rounded-xl bg-primary text-white font-medium"
          >
            {copied ? '✓ Copied!' : '📋 Copy Link'}
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 text-white/60 text-sm hover:text-white"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
