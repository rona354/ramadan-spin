export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    emoji: string;
    scores: Record<string, number>;
  }[];
}

export interface QuizResult {
  id: string;
  name: string;
  emoji: string;
  description: string;
  traits: string[];
  tip: string;
  color: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Jam berapa biasanya kamu sahur?',
    options: [
      {
        id: 'early',
        text: 'Jam 3 pagi, sebelum subuh',
        emoji: '🌙',
        scores: { planner: 2, disciplined: 2 },
      },
      {
        id: 'normal',
        text: 'Jam 4, pas-pasan',
        emoji: '⏰',
        scores: { balanced: 2, flexible: 1 },
      },
      {
        id: 'late',
        text: 'Last minute, 10 menit sebelum imsak',
        emoji: '🏃',
        scores: { spontan: 2, adventurer: 1 },
      },
      {
        id: 'skip',
        text: 'Sering skip sahur',
        emoji: '😴',
        scores: { minimalist: 2, daredevil: 1 },
      },
    ],
  },
  {
    id: 'q2',
    question: 'Menu buka puasa idealmu?',
    options: [
      {
        id: 'takjil',
        text: 'Takjil manis dulu, makan nanti',
        emoji: '🍧',
        scores: { traditionalist: 2, balanced: 1 },
      },
      {
        id: 'heavy',
        text: 'Langsung nasi + lauk lengkap',
        emoji: '🍛',
        scores: { practical: 2, disciplined: 1 },
      },
      {
        id: 'dates',
        text: 'Kurma + air putih, sunnah style',
        emoji: '🌴',
        scores: { spiritual: 2, minimalist: 1 },
      },
      {
        id: 'random',
        text: 'Tergantung mood!',
        emoji: '🎲',
        scores: { spontan: 2, adventurer: 1 },
      },
    ],
  },
  {
    id: 'q3',
    question: 'Ngabuburit biasanya ngapain?',
    options: [
      {
        id: 'mall',
        text: 'Jalan-jalan ke mall/cafe',
        emoji: '🛍️',
        scores: { social: 2, adventurer: 1 },
      },
      {
        id: 'home',
        text: 'Rebahan di rumah, nonton',
        emoji: '📺',
        scores: { minimalist: 2, flexible: 1 },
      },
      {
        id: 'mosque',
        text: 'Ngaji atau ke masjid',
        emoji: '🕌',
        scores: { spiritual: 2, disciplined: 1 },
      },
      {
        id: 'cook',
        text: 'Masak/siap-siap buka',
        emoji: '👨‍🍳',
        scores: { planner: 2, practical: 1 },
      },
    ],
  },
  {
    id: 'q4',
    question: 'Kalau beli takjil di pasar Ramadan...',
    options: [
      {
        id: 'list',
        text: 'Sudah ada list yang mau dibeli',
        emoji: '📝',
        scores: { planner: 2, practical: 1 },
      },
      {
        id: 'impulse',
        text: 'Beli semua yang menarik!',
        emoji: '🛒',
        scores: { spontan: 2, adventurer: 2 },
      },
      {
        id: 'same',
        text: 'Beli yang sama tiap hari',
        emoji: '🔄',
        scores: { traditionalist: 2, balanced: 1 },
      },
      {
        id: 'none',
        text: 'Jarang beli, bikin sendiri',
        emoji: '🏠',
        scores: { minimalist: 1, practical: 2 },
      },
    ],
  },
  {
    id: 'q5',
    question: 'Strategi puasamu?',
    options: [
      {
        id: 'plan',
        text: 'Menu seminggu sudah di-plan',
        emoji: '📅',
        scores: { planner: 3, disciplined: 1 },
      },
      {
        id: 'day',
        text: 'Lihat hari itu mau apa',
        emoji: '🤔',
        scores: { flexible: 2, balanced: 1 },
      },
      {
        id: 'feel',
        text: 'Ikut feeling aja',
        emoji: '💫',
        scores: { spontan: 2, adventurer: 1 },
      },
      {
        id: 'simple',
        text: 'Simpel aja, yang penting kenyang',
        emoji: '😌',
        scores: { minimalist: 2, practical: 1 },
      },
    ],
  },
  {
    id: 'q6',
    question: 'Tarawih biasanya...',
    options: [
      {
        id: 'full',
        text: '20 rakaat full, setiap malam',
        emoji: '🌟',
        scores: { spiritual: 2, disciplined: 2 },
      },
      {
        id: 'eight',
        text: '8 rakaat cukup',
        emoji: '✨',
        scores: { balanced: 2, practical: 1 },
      },
      {
        id: 'sometimes',
        text: 'Kadang-kadang aja',
        emoji: '🌙',
        scores: { flexible: 2, spontan: 1 },
      },
      {
        id: 'home',
        text: 'Di rumah sendiri lebih khusyuk',
        emoji: '🏠',
        scores: { minimalist: 1, spiritual: 1 },
      },
    ],
  },
];

export const quizResults: QuizResult[] = [
  {
    id: 'perencana-matang',
    name: 'Si Perencana Matang',
    emoji: '📋',
    description: 'Kamu tipe yang suka persiapan! Menu seminggu sudah ready, sahur on time, dan Ramadan terasa terstruktur.',
    traits: ['Terorganisir', 'Disiplin', 'Reliable'],
    tip: 'Jangan lupa sisakan ruang untuk spontanitas - kadang rezeki datang tidak terencana!',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    id: 'spontan-berkah',
    name: 'Si Spontan Berkah',
    emoji: '🎲',
    description: 'Go with the flow adalah motto-mu! Ramadan penuh kejutan dan setiap hari adalah petualangan baru.',
    traits: ['Fleksibel', 'Adventurous', 'Easy-going'],
    tip: 'Sedikit planning bisa bantu - minimal tahu mau buka apa biar tidak kelaparan!',
    color: 'from-orange-500 to-yellow-400',
  },
  {
    id: 'spiritual-warrior',
    name: 'Spiritual Warrior',
    emoji: '🕌',
    description: 'Ramadan adalah waktu untuk mendekatkan diri. Ibadah first, makan second!',
    traits: ['Fokus ibadah', 'Konsisten', 'Tenang'],
    tip: 'Tetap jaga nutrisi ya - tubuh yang sehat = ibadah lebih khusyuk!',
    color: 'from-green-500 to-emerald-400',
  },
  {
    id: 'balanced-muslim',
    name: 'The Balanced One',
    emoji: '⚖️',
    description: 'Seimbang dalam segala hal! Tidak ekstrem, tapi konsisten. Makan cukup, ibadah cukup.',
    traits: ['Seimbang', 'Stabil', 'Practical'],
    tip: 'Perfect balance! Pertahankan dan jangan ragu explore hal baru.',
    color: 'from-purple-500 to-pink-400',
  },
  {
    id: 'minimalist-puasa',
    name: 'Minimalist Ramadan',
    emoji: '🧘',
    description: 'Less is more! Sahur simpel, buka secukupnya, yang penting niat dan kualitas.',
    traits: ['Simpel', 'Efisien', 'Low-maintenance'],
    tip: 'Pastikan nutrisi tetap terpenuhi walau simpel - kesehatan itu penting!',
    color: 'from-gray-500 to-slate-400',
  },
  {
    id: 'social-ramadan',
    name: 'Social Ramadan Star',
    emoji: '🦋',
    description: 'Ramadan = quality time! Buka bareng, ngabuburit sama teman, dan selalu ada di group iftar.',
    traits: ['Social', 'Extrovert', 'Connector'],
    tip: 'Jangan lupa waktu me-time dan refleksi diri juga ya!',
    color: 'from-pink-500 to-rose-400',
  },
];

export function calculateQuizResult(answers: Record<string, string>): QuizResult {
  const scores: Record<string, number> = {};

  Object.entries(answers).forEach(([questionId, optionId]) => {
    const question = quizQuestions.find((q) => q.id === questionId);
    const option = question?.options.find((o) => o.id === optionId);

    if (option) {
      Object.entries(option.scores).forEach(([trait, score]) => {
        scores[trait] = (scores[trait] || 0) + score;
      });
    }
  });

  const maxTrait = Object.entries(scores).reduce(
    (max, [trait, score]) => (score > max.score ? { trait, score } : max),
    { trait: '', score: 0 }
  );

  const resultMap: Record<string, string> = {
    planner: 'perencana-matang',
    disciplined: 'perencana-matang',
    spontan: 'spontan-berkah',
    adventurer: 'spontan-berkah',
    daredevil: 'spontan-berkah',
    spiritual: 'spiritual-warrior',
    balanced: 'balanced-muslim',
    flexible: 'balanced-muslim',
    traditionalist: 'balanced-muslim',
    minimalist: 'minimalist-puasa',
    practical: 'minimalist-puasa',
    social: 'social-ramadan',
  };

  const resultId = resultMap[maxTrait.trait] || 'balanced-muslim';
  return quizResults.find((r) => r.id === resultId) || quizResults[3];
}
