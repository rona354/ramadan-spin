# Ramadan Spin

![License](https://img.shields.io/badge/license-MIT-green)
![Vercel](https://img.shields.io/badge/deployed-Vercel-black)
![React](https://img.shields.io/badge/React-19-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)

> Bingung mau makan apa? Spin aja!

*Indonesian Ramadan food decision spinner with gamification, achievements, and shareable results.*

**[Live Demo](https://ramadan-spin.vercel.app/)**

---

## About

Ramadan Spin adalah web app untuk Muslim Indonesia yang mengalami decision fatigue saat Ramadan. Terinspirasi dari kesederhanaan dan virality Wordle, ini adalah tool pertama yang gamifikasi keputusan makanan Ramadan.

## Features

**Menu Spin** — Slot machine untuk pilih menu sahur, buka puasa, atau takjil. Satu spin, keputusan selesai!

**Quiz Puasa** — Test pengetahuan Ramadan kamu dengan 6 tipe hasil personality.

**Ramadan Bingo** — Bingo card 5x5 aktivitas Ramadan yang bisa di-share.

**Challenge Friends** — Tantang teman untuk tebak hasil spin-mu via URL.

**Share Card** — Hasil spin jadi gambar cantik untuk Instagram/WhatsApp story.

**Fun Facts** — 240+ fakta menarik tentang makanan Indonesia muncul setiap spin.

**Rare Combos** — 12 kombinasi legendaris dengan "near miss" detection.

**Sound Effects** — Audio feedback satisfying dengan toggle mute.

**Daily Spin System** — 1 free spin per mode + 3 rerolls per hari. Bonus rerolls dari sharing!

**Streak & Achievements** — Badge system untuk engagement. Spin setiap hari, build your streak.

**Ramadan Day Counter** — Otomatis tracking hari ke-berapa Ramadan.

## Tech Stack

- **React 19** + **TypeScript** — Type-safe, modern React
- **Tailwind CSS v4** — Utility-first styling
- **Vite 7** — Lightning fast dev/build
- **html2canvas** — Share card generation

23+ components dengan custom hooks untuk gamification, accessibility (focus traps, ARIA labels), dan state management via localStorage.

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/rona354/ramadan-spin.git
cd ramadan-spin
npm install
npm run dev
```

Open http://localhost:5173

### Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Contributing

Contributions welcome! See [PLAN.md](./PLAN.md) for detailed architecture and product vision.

### Good First Contributions

| Area | File |
|------|------|
| Menu items (regional foods) | `src/data/sahur.ts`, `src/data/iftar.ts`, `src/data/takjil.ts` |
| Fun facts | `src/data/funFacts.ts` |
| Quiz questions | `src/data/quiz.ts` |
| Bingo items | `src/data/bingo.ts` |
| Rare combos | `src/data/rareCombos.ts` |

### Larger Contributions
- New game modes
- Performance optimizations
- Accessibility improvements

## Roadmap

- [x] Menu Spin (Sahur/Iftar/Takjil)
- [x] Share Card generation
- [x] Daily spin limit + bonus system
- [x] Ramadan Quiz
- [x] Ramadan Bingo
- [x] Achievement badges
- [x] Streak tracking
- [x] Challenge friends
- [ ] User-submitted menu items
- [ ] Regional variations (Jawa, Sumatra, Sulawesi, etc.)
- [ ] "Menu terpopuler hari ini" stats
- [ ] THR Splitter (menjelang Lebaran)

## License

MIT — See [LICENSE](./LICENSE)

---

*For detailed product vision, architecture decisions, and implementation notes, see [PLAN.md](./PLAN.md)*
