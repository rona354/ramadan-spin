import { useState, useEffect } from 'react';
import { protein, carbs, sides, type MenuItem } from '../data/sahur';
import { iftar } from '../data/iftar';
import { takjil } from '../data/takjil';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface ChallengeData {
  m: 'sahur' | 'iftar' | 'takjil';
  r: string[];
  t: number;
}

interface ChallengeGuessProps {
  encodedData: string;
  onClose: () => void;
}

const allItems = [...protein, ...carbs, ...sides, ...iftar, ...takjil];
const validItemIds = new Set(allItems.map(item => item.id));

const modeLabels = {
  sahur: 'Sahur',
  iftar: 'Buka',
  takjil: 'Takjil',
};

const MAX_ENCODED_LENGTH = 1024;
const MAX_ITEMS = 10;

function isValidChallengeData(data: unknown): data is ChallengeData {
  if (typeof data !== 'object' || data === null) return false;

  const obj = data as Record<string, unknown>;

  if (!['sahur', 'iftar', 'takjil'].includes(obj.m as string)) return false;
  if (typeof obj.t !== 'number' || obj.t < 0 || obj.t > Date.now() + 86400000) return false;
  if (!Array.isArray(obj.r) || obj.r.length === 0 || obj.r.length > MAX_ITEMS) return false;
  if (!obj.r.every(id => typeof id === 'string' && validItemIds.has(id))) return false;

  return true;
}

function decodeChallenge(encoded: string): ChallengeData | null {
  if (typeof encoded !== 'string' || encoded.length > MAX_ENCODED_LENGTH) return null;

  try {
    const decoded = atob(encoded);
    const data = JSON.parse(decoded);
    return isValidChallengeData(data) ? data : null;
  } catch {
    return null;
  }
}

function getItemById(id: string): MenuItem | undefined {
  return allItems.find((item) => item.id === id);
}

export function ChallengeGuess({ encodedData, onClose }: ChallengeGuessProps) {
  const [challenge, setChallenge] = useState<ChallengeData | null>(null);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const focusTrapRef = useFocusTrap<HTMLDivElement>(onClose);

  useEffect(() => {
    const data = decodeChallenge(encodedData);
    setChallenge(data);
  }, [encodedData]);

  if (!challenge) {
    return (
      <div
        ref={focusTrapRef}
        className="fixed inset-0 bg-night/95 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
      >
        <div className="w-full max-w-sm text-center">
          <span className="text-4xl block mb-4" aria-hidden="true">❌</span>
          <p className="text-white mb-4">Link tidak valid</p>
          <button onClick={onClose} className="py-3 px-6 rounded-xl bg-card text-white">
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const actualResults = challenge.r.map(getItemById).filter(Boolean) as MenuItem[];
  const mode = challenge.m;

  const getOptionsForIndex = (index: number): MenuItem[] => {
    if (mode === 'sahur') {
      if (index === 0) return protein;
      if (index === 1) return carbs;
      if (index === 2) return sides;
    }
    if (mode === 'iftar') return iftar;
    return takjil;
  };

  const handleGuess = (index: number, itemId: string) => {
    const newGuesses = [...guesses];
    newGuesses[index] = itemId;
    setGuesses(newGuesses);
  };

  const handleReveal = () => {
    let correct = 0;
    actualResults.forEach((item, idx) => {
      if (guesses[idx] === item.id) correct++;
    });
    setCorrectCount(correct);
    setRevealed(true);
  };

  const canReveal = guesses.filter(Boolean).length === actualResults.length;

  if (revealed) {
    return (
      <div
        ref={focusTrapRef}
        className="fixed inset-0 bg-night/95 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="guess-result-title"
      >
        <div className="w-full max-w-sm">
          <div className="text-center mb-6">
            <span className="text-5xl block mb-2" aria-hidden="true">
              {correctCount === actualResults.length ? '🎉' : correctCount > 0 ? '😊' : '😅'}
            </span>
            <h2 id="guess-result-title" className="text-gold font-bold text-2xl">
              {correctCount}/{actualResults.length} Benar!
            </h2>
            <p className="text-white/60">
              {correctCount === actualResults.length
                ? 'Perfect! Kamu telepati!'
                : correctCount > 0
                  ? 'Lumayan! Hampir ketebak!'
                  : 'Yah, coba lagi!'}
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {actualResults.map((item, idx) => {
              const isCorrect = guesses[idx] === item.id;
              const guessedItem = getItemById(guesses[idx]);

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl ${
                    isCorrect ? 'bg-green/20 border border-green' : 'bg-card'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{item.emoji}</span>
                      <span className="text-white font-medium">{item.name}</span>
                    </div>
                    <span>{isCorrect ? '✓' : '✗'}</span>
                  </div>
                  {!isCorrect && guessedItem && (
                    <p className="text-white/50 text-sm mt-1">
                      Tebakanmu: {guessedItem.emoji} {guessedItem.name}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-gold text-night font-bold"
          >
            Coba Spin Sendiri!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={focusTrapRef}
      className="fixed inset-0 bg-night/95 z-50 flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="guess-title"
    >
      <div className="w-full max-w-sm py-4">
        <div className="text-center mb-6">
          <span className="text-4xl block mb-2" aria-hidden="true">🎯</span>
          <h2 id="guess-title" className="text-gold font-bold text-xl">Tebak Menu {modeLabels[mode]}!</h2>
          <p className="text-white/60 text-sm">
            Temanmu sudah spin. Bisa tebak hasilnya?
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {actualResults.map((_, idx) => {
            const options = getOptionsForIndex(idx);
            const label = mode === 'sahur'
              ? ['Protein', 'Karbo', 'Side'][idx]
              : `Item ${idx + 1}`;

            return (
              <div key={idx}>
                <p className="text-white/60 text-sm mb-2">{label}:</p>
                <select
                  value={guesses[idx] || ''}
                  onChange={(e) => handleGuess(idx, e.target.value)}
                  className="w-full p-3 rounded-xl bg-card text-white border border-white/10 focus:border-gold outline-none"
                >
                  <option value="">Pilih tebakan...</option>
                  {options.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.emoji} {item.name}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleReveal}
          disabled={!canReveal}
          className={`w-full py-3 rounded-xl font-bold ${
            canReveal
              ? 'bg-gold text-night'
              : 'bg-white/10 text-white/50 cursor-not-allowed'
          }`}
        >
          Reveal Jawaban!
        </button>

        <button
          onClick={onClose}
          className="w-full mt-2 py-2 text-white/60 text-sm hover:text-white"
        >
          Skip, Langsung Spin
        </button>
      </div>
    </div>
  );
}
