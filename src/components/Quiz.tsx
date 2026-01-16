import { useState } from 'react';
import { quizQuestions, calculateQuizResult, type QuizResult } from '../data/quiz';
import { QuizResultCard } from './QuizResultCard';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface QuizProps {
  onClose: () => void;
  onShare: (result: QuizResult) => void;
}

export function Quiz({ onClose, onShare }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const focusTrapRef = useFocusTrap<HTMLDivElement>(onClose);

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswer = (optionId: string) => {
    const newAnswers = { ...answers, [question.id]: optionId };
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      const quizResult = calculateQuizResult(newAnswers);
      setResult(quizResult);
    }
  };

  if (result) {
    return (
      <div
        ref={focusTrapRef}
        className="fixed inset-0 bg-night/95 z-50 flex items-center justify-center p-4 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quiz-result-title"
      >
        <div className="w-full max-w-sm">
          <h2 id="quiz-result-title" className="sr-only">Hasil Quiz Tipe Puasa</h2>
          <QuizResultCard result={result} />
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => onShare(result)}
              className="flex-1 py-3 rounded-xl bg-gold text-night font-bold hover:bg-gold/90"
            >
              📤 Share Hasil
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-card text-white font-medium hover:bg-card/80"
            >
              Tutup
            </button>
          </div>
          <button
            onClick={() => {
              setCurrentQuestion(0);
              setAnswers({});
              setResult(null);
            }}
            className="w-full mt-2 py-2 text-white/60 text-sm hover:text-white"
          >
            Ulangi Quiz
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
      aria-labelledby="quiz-title"
    >
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 id="quiz-title" className="text-gold font-bold text-lg">Tipe Puasa-mu</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white text-2xl" aria-label="Tutup quiz">
            ×
          </button>
        </div>

        <div className="h-1 bg-card rounded-full mb-6 overflow-hidden">
          <div
            className="h-full bg-gold transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-white/60 text-sm mb-2">
          Pertanyaan {currentQuestion + 1}/{quizQuestions.length}
        </p>

        <h3 className="text-white text-xl font-medium mb-6">{question.question}</h3>

        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswer(option.id)}
              className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                answers[question.id] === option.id
                  ? 'bg-gold text-night'
                  : 'bg-card text-white hover:bg-card/80 border border-white/10'
              }`}
            >
              <span className="text-xl mr-3">{option.emoji}</span>
              <span>{option.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
