import { useState, useRef, useEffect } from 'react';
import { SlotMachine } from './components/SlotMachine';
import { ShareCard } from './components/ShareCard';
import { ModeSelector } from './components/ModeSelector';
import { StreakBadge } from './components/StreakBadge';
import { HistoryList } from './components/HistoryList';
import { FunFact } from './components/FunFact';
import { RareComboAlert } from './components/RareComboAlert';
import { Quiz } from './components/Quiz';
import { Bingo } from './components/Bingo';
import { Challenge } from './components/Challenge';
import { ChallengeGuess } from './components/ChallengeGuess';
import { SoundToggle } from './components/SoundToggle';
import { AchievementBadges } from './components/AchievementBadges';
import { AchievementToast } from './components/AchievementToast';
import { Toast } from './components/Toast';
import { useSpinLimit } from './hooks/useSpinLimit';
import { useStreak } from './hooks/useStreak';
import { useHistory } from './hooks/useHistory';
import { useAchievements } from './hooks/useAchievements';
import { getSahurCombo, getRandomItem, getRandomItems } from './utils/random';
import { shareResult, generateShareText, copyShareText, shareToWhatsApp, getRamadanDay } from './utils/share';
import { playSound } from './utils/sound';
import { getRandomFact } from './data/funFacts';
import { checkRareCombo, getNearMissCombo, type RareCombo } from './data/rareCombos';
import { protein, carbs, sides, type MenuItem } from './data/sahur';
import { iftar } from './data/iftar';
import { takjil } from './data/takjil';
import type { QuizResult } from './data/quiz';
import { config } from './config';

type Mode = 'sahur' | 'iftar' | 'takjil';
type ActiveModal = 'quiz' | 'bingo' | 'challenge' | 'achievements' | null;

function App() {
  const [mode, setMode] = useState<Mode>('sahur');
  const [isSpinning, setIsSpinning] = useState(false);
  const [results, setResults] = useState<MenuItem[] | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [funFact, setFunFact] = useState<string | null>(null);
  const [rareCombo, setRareCombo] = useState<RareCombo | null>(null);
  const [nearMissCombo, setNearMissCombo] = useState<RareCombo | null>(null);
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [challengeData, setChallengeData] = useState<string | null>(null);
  const [bingoTriggers, setBingoTriggers] = useState<Set<string>>(new Set());

  const { canSpin, spin, addBonusReroll, rerollsLeft, freeSpinsStatus } = useSpinLimit();
  const { currentStreak, longestStreak, recordSpin } = useStreak();
  const {
    earnedBadges,
    lockedBadges,
    newlyEarned,
    dismissNewBadge,
    award,
    incrementCounter,
    checkTimeBasedAchievement,
    checkAllModes,
  } = useAchievements();
  const [bonusToast, setBonusToast] = useState(false);
  const { entries: historyEntries, addEntry: addHistoryEntry } = useHistory();
  const [modesSpunToday, setModesSpunToday] = useState<Set<string>>(new Set());
  const [errorToast, setErrorToast] = useState<string | null>(null);
  const shareCardRef = useRef<HTMLDivElement>(null);
  const resultSectionRef = useRef<HTMLDivElement>(null);
  const ramadanDay = getRamadanDay();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const challenge = params.get('c');
    if (challenge) {
      setChallengeData(challenge);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (results && !isSpinning && resultSectionRef.current) {
      resultSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [results, isSpinning]);

  const addBingoTrigger = (trigger: string) => {
    setBingoTriggers((prev) => new Set([...prev, trigger]));
  };

  const handleSpin = () => {
    if (!canSpin(mode) || isSpinning) return;

    const result = spin(mode);
    if (!result) return;

    const streakData = recordSpin();
    setIsSpinning(true);
    setResults(null);
    setCopied(false);
    setFunFact(null);
    setRareCombo(null);
    setNearMissCombo(null);

    incrementCounter('spins');
    checkTimeBasedAchievement();

    const updatedModes = new Set(modesSpunToday).add(mode);
    setModesSpunToday(updatedModes);
    checkAllModes(updatedModes);

    addBingoTrigger('first_spin');

    if (streakData.currentStreak >= 3) addBingoTrigger('streak_3');
    if (streakData.currentStreak >= 7) addBingoTrigger('streak_7');
    if (updatedModes.size === 3) addBingoTrigger('all_modes');

    const hour = new Date().getHours();
    if (hour >= 3 && hour < 5) addBingoTrigger('sahur_time');
    if (hour >= 22 || hour < 3) addBingoTrigger('night_time');

    let newResults: MenuItem[];
    if (mode === 'sahur') {
      newResults = getSahurCombo(protein, carbs, sides);
    } else if (mode === 'iftar') {
      newResults = [getRandomItem(iftar)];
    } else {
      newResults = getRandomItems(takjil, 3);
    }

    setTimeout(() => {
      setResults(newResults);
      addHistoryEntry(mode, newResults);

      if (mode === 'sahur') {
        const rare = checkRareCombo(newResults);
        if (rare) {
          setRareCombo(rare);
          addBingoTrigger('rare_combo');
          award('rare-hunter');
        } else {
          const nearMiss = getNearMissCombo(newResults);
          if (nearMiss) setNearMissCombo(nearMiss);
        }
      }

      const randomItem = newResults[Math.floor(Math.random() * newResults.length)];
      const fact = getRandomFact(randomItem.id);
      if (fact) setFunFact(fact);
    }, 100);

    const spinDuration = mode === 'sahur' ? 2500 : 1500;

    setTimeout(() => {
      setIsSpinning(false);
      playSound('win');
    }, spinDuration);
  };

  const grantBonusReroll = () => {
    addBonusReroll();
    incrementCounter('shares');
    setBonusToast(true);
    setTimeout(() => setBonusToast(false), 2000);
  };

  const handleShareImage = async () => {
    if (!shareCardRef.current || !results || isSharing) return;
    setIsSharing(true);
    try {
      await shareResult(shareCardRef.current);
      grantBonusReroll();
      addBingoTrigger('share_image');
    } catch {
      setErrorToast('Gagal membuat gambar. Coba lagi.');
    } finally {
      setIsSharing(false);
    }
  };

  const handleCopyText = async () => {
    if (!results) return;
    const text = generateShareText(mode, results, ramadanDay);
    const success = await copyShareText(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      grantBonusReroll();
    } else {
      setErrorToast('Gagal menyalin teks. Coba lagi.');
    }
  };

  const handleWhatsAppShare = () => {
    if (!results) return;
    const text = generateShareText(mode, results, ramadanDay);
    shareToWhatsApp(text);
    grantBonusReroll();
    addBingoTrigger('share_whatsapp');
  };

  const handleQuizShare = (_result: QuizResult) => {
    setActiveModal(null);
    grantBonusReroll();
  };

  const getSlotData = () => {
    if (mode === 'sahur') {
      return [
        { items: protein, result: results?.[0] ?? null, delay: 800 },
        { items: carbs, result: results?.[1] ?? null, delay: 1400 },
        { items: sides, result: results?.[2] ?? null, delay: 2000 },
      ];
    }
    if (mode === 'iftar') {
      return [{ items: iftar, result: results?.[0] ?? null, delay: 1000 }];
    }
    return [
      { items: takjil, result: results?.[0] ?? null, delay: 600 },
      { items: takjil, result: results?.[1] ?? null, delay: 900 },
      { items: takjil, result: results?.[2] ?? null, delay: 1200 },
    ];
  };

  if (challengeData) {
    return (
      <ChallengeGuess
        encodedData={challengeData}
        onClose={() => setChallengeData(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-night flex flex-col items-center px-4 py-8">
      <header className="text-center mb-6">
        <div className="flex items-center justify-center gap-3">
          <h1 className="text-3xl md:text-4xl font-bold text-gold flex items-center gap-2">
            <span aria-hidden="true">🌙</span> Ramadan Spin
          </h1>
          <SoundToggle />
        </div>
        <p className="text-white/60 text-sm mt-2">Bingung mau makan apa? Spin aja!</p>
        <p className="text-white/60 text-xs mt-1">Hari ke-{ramadanDay} Ramadan {config.ramadanYear}</p>
        <div className="mt-3">
          <StreakBadge
            currentStreak={currentStreak}
            longestStreak={longestStreak}
            onOpenAchievements={() => setActiveModal('achievements')}
            achievementCount={earnedBadges.length}
          />
        </div>
      </header>

      <main className="w-full max-w-sm md:max-w-md space-y-4">
        <ModeSelector mode={mode} onChange={setMode} />

        <section className="bg-card rounded-2xl p-6 border border-gold/20" aria-label="Slot machine">
          <h2 className="text-center text-lg font-semibold mb-4 text-gold">
            {mode === 'sahur' && '🎰 Menu Sahur'}
            {mode === 'iftar' && '🎰 Menu Buka'}
            {mode === 'takjil' && '🎰 Pilih Takjil'}
          </h2>

          <div className="flex justify-center gap-3 mb-6" role="group" aria-label="Hasil spin">
            {getSlotData().map((slot, idx) => (
              <SlotMachine
                key={`${mode}-${idx}`}
                items={slot.items}
                isSpinning={isSpinning}
                result={slot.result}
                delay={slot.delay}
              />
            ))}
          </div>

          <button
            onClick={handleSpin}
            disabled={!canSpin(mode) || isSpinning}
            className={`
              w-full py-4 rounded-xl font-bold text-lg
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-gold/50
              ${
                canSpin(mode) && !isSpinning
                  ? 'bg-gold text-night hover:bg-gold/90 btn-glow'
                  : 'bg-white/10 text-white/60 cursor-not-allowed'
              }
            `}
          >
            {isSpinning
              ? '🎰 Spinning...'
              : canSpin(mode)
                ? freeSpinsStatus[mode]
                  ? '🎰 SPIN! (Free)'
                  : '🎰 SPIN! (Reroll)'
                : 'Habis untuk hari ini'}
          </button>

          <div className="text-center text-sm text-white/50 mt-3 space-y-1" aria-live="polite">
            <p>
              Free:{' '}
              <span className={freeSpinsStatus.sahur ? 'text-green' : 'text-white/30'}>Sahur</span>
              {' · '}
              <span className={freeSpinsStatus.iftar ? 'text-green' : 'text-white/30'}>Iftar</span>
              {' · '}
              <span className={freeSpinsStatus.takjil ? 'text-green' : 'text-white/30'}>Takjil</span>
            </p>
            <p>Reroll: {rerollsLeft}</p>
          </div>

          {bonusToast && (
            <p className="text-center text-sm text-gold mt-2 animate-pulse">
              +1 Reroll dari share!
            </p>
          )}
        </section>

        {results && !isSpinning && (
          <section ref={resultSectionRef} className="space-y-4 fade-in" aria-label="Hasil dan share">
            {rareCombo && <RareComboAlert combo={rareCombo} />}
            {!rareCombo && nearMissCombo && <RareComboAlert combo={nearMissCombo} isNearMiss />}

            <div className="flex justify-center">
              <ShareCard ref={shareCardRef} mode={mode} results={results} ramadanDay={ramadanDay} />
            </div>

            {funFact && <FunFact fact={funFact} />}

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleCopyText}
                className="py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/80 transition-colors flex items-center justify-center gap-1 focus:outline-none focus:ring-2 focus:ring-gold/50 text-sm"
                aria-label="Copy teks untuk share"
              >
                <span aria-hidden="true">{copied ? '✓' : '📋'}</span>
                {copied ? 'Copied!' : 'Copy'}
              </button>

              <button
                onClick={handleWhatsAppShare}
                className="py-3 rounded-xl bg-[#25D366] text-white font-medium hover:bg-[#25D366]/80 transition-colors flex items-center justify-center gap-1 focus:outline-none focus:ring-2 focus:ring-gold/50 text-sm"
                aria-label="Share ke WhatsApp"
              >
                <span aria-hidden="true">💬</span>
                WhatsApp
              </button>

              <button
                onClick={handleShareImage}
                disabled={isSharing}
                className={`py-3 rounded-xl text-white font-medium transition-colors flex items-center justify-center gap-1 focus:outline-none focus:ring-2 focus:ring-gold/50 text-sm ${
                  isSharing ? 'bg-green/50 cursor-wait' : 'bg-green hover:bg-green/90'
                }`}
                aria-label="Share sebagai gambar"
              >
                <span aria-hidden="true">{isSharing ? '⏳' : '📤'}</span>
                {isSharing ? '...' : 'Image'}
              </button>
            </div>

            <button
              onClick={() => setActiveModal('challenge')}
              className="w-full py-3 rounded-xl bg-card border border-gold/30 text-gold font-medium hover:bg-card/80 flex items-center justify-center gap-2"
            >
              <span>🎯</span> Tantang Teman Tebak!
            </button>
          </section>
        )}

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setActiveModal('quiz')}
            className="py-3 rounded-xl bg-card border border-white/10 text-white font-medium hover:bg-card/80 flex items-center justify-center gap-2"
          >
            <span>🧠</span> Quiz Puasa
          </button>
          <button
            onClick={() => setActiveModal('bingo')}
            className="py-3 rounded-xl bg-card border border-white/10 text-white font-medium hover:bg-card/80 flex items-center justify-center gap-2"
          >
            <span>🎱</span> Bingo
          </button>
        </div>

        <HistoryList entries={historyEntries} />
      </main>

      <footer className="mt-auto pt-8 text-center text-white/60 text-xs">
        <p>Ramadan {config.ramadanYear} / {config.gregorianYear}</p>
      </footer>

      {activeModal === 'quiz' && (
        <Quiz onClose={() => setActiveModal(null)} onShare={handleQuizShare} />
      )}

      {activeModal === 'bingo' && (
        <Bingo onClose={() => setActiveModal(null)} autoCompleted={bingoTriggers} />
      )}

      {activeModal === 'challenge' && (
        <Challenge
          onClose={() => setActiveModal(null)}
          lastResult={results}
          mode={mode}
        />
      )}

      {activeModal === 'achievements' && (
        <AchievementBadges
          earnedBadges={earnedBadges}
          lockedBadges={lockedBadges}
          onClose={() => setActiveModal(null)}
        />
      )}

      {newlyEarned && (
        <AchievementToast badge={newlyEarned} onDismiss={dismissNewBadge} />
      )}

      {errorToast && (
        <Toast message={errorToast} type="error" onDismiss={() => setErrorToast(null)} />
      )}
    </div>
  );
}

export default App;
