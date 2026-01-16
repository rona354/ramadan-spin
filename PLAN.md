# Ramadan Spin — Project Plan

> **Created:** 2026-01-15
> **Status:** Ready for Implementation
> **Philosophy:** Simple, viral, useful, open-source

---

## 1. What We're Building

A collection of fun, useful Ramadan-themed web tools for Indonesian Muslims.

**Core Concept:**
```
┌──────────────────────────────────────────┐
│                                          │
│   Spin wheel / slot machine untuk        │
│   keputusan sehari-hari di bulan         │
│   Ramadan → Shareable result cards       │
│                                          │
└──────────────────────────────────────────┘
```

**Tagline:** "Bingung mau makan apa? Spin aja!"

---

## 2. Why This Matters

### Market Gap (Verified)
- **ZERO** viral Ramadan-specific web utility exists
- Existing Ramadan apps = utility-focused (prayer times, fasting trackers)
- No gamified decision-making tools for Indonesian Ramadan traditions
- Spin wheel apps exist generically, but none for Indonesian food/Ramadan context

### Pain Points (Validated)
1. **Decision fatigue:** "Sahur makan apa?" setiap hari
2. **Ngabuburit boredom:** 3-6pm waiting period needs entertainment
3. **Takjil choice paralysis:** Too many options at pasar Ramadan
4. **Family coordination:** What to cook for iftar bersama

### Viral Potential
- **Wordle proved:** Simple tools with shareable results go viral
- **Seasonal urgency:** Ramadan = 30-day window of relevance
- **Social sharing:** Food content performs well on WA/IG
- **Indonesian market:** 240M Muslims, high mobile engagement

---

## 3. Product Principles

1. **Fun first, useful second** — Entertainment drives sharing
2. **Indonesian-first** — Local food, local humor, Bahasa Indonesia
3. **Zero friction** — No login, no signup, instant use
4. **Shareable by design** — Every result is screenshot-worthy
5. **Open-source** — Community can contribute

---

## 4. Features (MVP)

### 4.1 Menu Spin (Primary Feature)

Three modes in one tool:

**A. Sahur Slot Machine**
```
┌─────────────────────────────────────────┐
│                                         │
│    🎰 MENU SAHUR HARI INI 🎰            │
│                                         │
│   ┌─────┐  ┌─────┐  ┌─────┐            │
│   │ 🍳  │  │ 🍚  │  │ 🌶️  │            │
│   │Telur│  │Nasi │  │Sambal│            │
│   └─────┘  └─────┘  └─────┘            │
│                                         │
│        [ 🎰 SPIN LAGI ]                 │
│                                         │
│        Sisa 2 spin hari ini             │
│                                         │
└─────────────────────────────────────────┘
```

**B. Iftar Roulette**
- Full meal suggestions
- Options: Masakan rumah, Beli di luar, Pesan online

**C. Takjil Picker**
- Indonesian takjil database
- Es Buah, Kolak, Gorengan, Es Kelapa, Cendol, Klepon, etc.

### 4.2 Shareable Result Card

```
┌─────────────────────────────────────────┐
│                                         │
│   🌙 MENU SAHURKU HARI INI              │
│                                         │
│   🍳 Telur Ceplok                       │
│   🍚 Nasi Putih                         │
│   🌶️ Sambal Terasi                      │
│                                         │
│   Spin menu kamu di:                    │
│   ramadanspin.vercel.app                │
│                                         │
│   #RamadanSpin #Sahur                   │
│                                         │
└─────────────────────────────────────────┘
```

### 4.3 Daily Limit (Gamification)
- 3 spins per day (creates scarcity)
- Resets at midnight
- "Spin lagi besok!" message

---

## 5. Menu Database

### Sahur Categories

**Protein:**
- Telur ceplok, Telur dadar, Telur rebus
- Tempe goreng, Tahu goreng
- Ayam goreng, Ikan goreng
- Sosis, Nugget
- Kornet

**Carbs:**
- Nasi putih, Nasi goreng
- Mie instan, Mie goreng
- Bubur ayam
- Roti bakar
- Lontong

**Sides:**
- Sambal terasi, Sambal matah
- Kerupuk, Emping
- Acar, Lalapan
- Sayur asem, Sayur bayam

**Quick Options:**
- Kurma + air putih (minimalis)
- Susu + roti
- Oatmeal + pisang

### Takjil Options
- Es buah
- Es kelapa muda
- Kolak pisang
- Kolak ubi
- Es cendol
- Es dawet
- Gorengan (pisang, tahu, tempe, bakwan)
- Klepon
- Onde-onde
- Kue cucur
- Bubur sumsum
- Es campur
- Sop buah
- Kurma
- Siomay
- Batagor

### Iftar Meals
- Nasi padang
- Soto ayam
- Bakso
- Mie ayam
- Gado-gado
- Nasi goreng
- Ayam geprek
- Nasi uduk
- Sate
- Rendang
- Pecel lele
- Warteg style

---

## 6. Technical Stack

### Dependencies (Minimal)

| Package | Purpose | Size |
|---------|---------|------|
| React 18 or Preact | UI framework | ~3-42KB |
| Tailwind CSS | Styling | ~10KB |
| html2canvas | Share card generation | ~40KB |
| **Total** | | **~55KB** |

### Architecture

```
┌─────────────────────────────────────────┐
│  React/Preact App (useState)            │
│           │                             │
│           ▼                             │
│  localStorage (spin count, history)     │
│           │                             │
│           ▼                             │
│  html2canvas (share card generation)    │
└─────────────────────────────────────────┘
```

### No Backend Needed
- All data client-side
- Menu database as JSON
- Spin count in localStorage
- Share via native Web Share API or download image

---

## 7. Project Structure

```
ramadan-spin/
├── public/
│   ├── favicon.ico
│   ├── og-image.png          # Social share preview
│   └── manifest.json         # PWA manifest
├── src/
│   ├── main.tsx              # Entry point
│   ├── App.tsx               # Main app + routing
│   ├── components/
│   │   ├── SlotMachine.tsx   # Spinning animation
│   │   ├── MenuResult.tsx    # Display result
│   │   ├── ShareCard.tsx     # Shareable image
│   │   ├── SpinButton.tsx    # Main CTA
│   │   └── ModeSelector.tsx  # Sahur/Iftar/Takjil tabs
│   ├── data/
│   │   ├── sahur.json        # Sahur menu items
│   │   ├── iftar.json        # Iftar menu items
│   │   └── takjil.json       # Takjil items
│   ├── hooks/
│   │   └── useSpinLimit.ts   # Daily spin limit logic
│   ├── utils/
│   │   ├── random.ts         # Random selection logic
│   │   └── share.ts          # Share functionality
│   └── index.css             # Tailwind + custom styles
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── package.json
└── PLAN.md
```

**Estimated lines of code: ~400-500**

---

## 8. UI Design

### Color Palette

```css
:root {
  /* Ramadan Theme */
  --primary: #1E3A5F;        /* Deep night blue */
  --secondary: #F4C430;      /* Gold/crescent */
  --accent: #2E8B57;         /* Islamic green */

  /* Backgrounds */
  --bg: #0F1729;             /* Dark sky */
  --bg-card: #1A2744;        /* Card background */

  /* Text */
  --text: #FFFFFF;
  --text-muted: #94A3B8;

  /* Fun colors for slots */
  --slot-1: #FF6B6B;         /* Coral */
  --slot-2: #4ECDC4;         /* Teal */
  --slot-3: #FFE66D;         /* Yellow */
}
```

### Typography

```css
font-family: 'Plus Jakarta Sans', system-ui, sans-serif;

/* Scale */
--text-hero: 48px;      /* Main result */
--text-h1: 24px;        /* Section titles */
--text-body: 16px;
--text-caption: 14px;
```

### Main Screen Wireframe

```
┌─────────────────────────────────────────┐
│  🌙 Ramadan Spin                    ⋮   │
├─────────────────────────────────────────┤
│                                         │
│   ┌─────────────────────────────────┐   │
│   │  [Sahur] [Iftar] [Takjil]       │   │
│   └─────────────────────────────────┘   │
│                                         │
│         ┌─────┐ ┌─────┐ ┌─────┐         │
│         │     │ │     │ │     │         │
│         │ 🍳  │ │ 🍚  │ │ 🌶️  │         │
│         │     │ │     │ │     │         │
│         └─────┘ └─────┘ └─────┘         │
│                                         │
│           Telur + Nasi + Sambal         │
│                                         │
│    ┌─────────────────────────────────┐  │
│    │                                 │  │
│    │       🎰 SPIN MENU!             │  │
│    │                                 │  │
│    └─────────────────────────────────┘  │
│                                         │
│         Sisa 2 spin hari ini            │
│                                         │
│    ┌────────────┐  ┌────────────┐       │
│    │ 📤 Share   │  │ 🔄 Reset   │       │
│    └────────────┘  └────────────┘       │
│                                         │
└─────────────────────────────────────────┘
```

### Slot Machine Animation

```
State: Idle
┌─────┐ ┌─────┐ ┌─────┐
│ 🍳  │ │ 🍚  │ │ 🌶️  │
└─────┘ └─────┘ └─────┘

State: Spinning (CSS animation)
┌─────┐ ┌─────┐ ┌─────┐
│ 🔄  │ │ 🔄  │ │ 🔄  │  <- blur/scroll effect
└─────┘ └─────┘ └─────┘

State: Revealing (sequential stop)
┌─────┐ ┌─────┐ ┌─────┐
│ 🍳  │ │ 🔄  │ │ 🔄  │  <- stop one by one
└─────┘ └─────┘ └─────┘

State: Complete (with bounce)
┌─────┐ ┌─────┐ ┌─────┐
│ 🍳  │ │ 🍚  │ │ 🌶️  │  <- celebration effect
└─────┘ └─────┘ └─────┘
```

---

## 9. Key Implementation Details

### Spin Limit Hook

```typescript
const SPIN_KEY = 'ramadan-spin-count';
const MAX_SPINS = 3;

export function useSpinLimit() {
  const [spinsLeft, setSpinsLeft] = useState(() => {
    const stored = localStorage.getItem(SPIN_KEY);
    if (!stored) return MAX_SPINS;

    const { count, date } = JSON.parse(stored);
    const today = new Date().toDateString();

    // Reset if new day
    if (date !== today) return MAX_SPINS;
    return MAX_SPINS - count;
  });

  const spin = () => {
    if (spinsLeft <= 0) return false;

    const today = new Date().toDateString();
    const stored = localStorage.getItem(SPIN_KEY);
    const current = stored ? JSON.parse(stored) : { count: 0, date: today };

    if (current.date !== today) {
      current.count = 0;
      current.date = today;
    }

    current.count++;
    localStorage.setItem(SPIN_KEY, JSON.stringify(current));
    setSpinsLeft(MAX_SPINS - current.count);
    return true;
  };

  return { spinsLeft, spin, canSpin: spinsLeft > 0 };
}
```

### Random Menu Selection

```typescript
interface MenuItem {
  id: string;
  name: string;
  emoji: string;
  category: 'protein' | 'carb' | 'side';
}

function getRandomMenu(items: MenuItem[], count: number): MenuItem[] {
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// For slot machine: one from each category
function getSahurCombo(data: SahurData): MenuItem[] {
  return [
    getRandomOne(data.protein),
    getRandomOne(data.carbs),
    getRandomOne(data.sides),
  ];
}
```

### Share Card Generation

```typescript
import html2canvas from 'html2canvas';

async function generateShareCard(elementId: string): Promise<Blob> {
  const element = document.getElementById(elementId);
  if (!element) throw new Error('Element not found');

  const canvas = await html2canvas(element, {
    backgroundColor: '#0F1729',
    scale: 2, // Higher quality
  });

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob!), 'image/png');
  });
}

async function shareResult(elementId: string) {
  const blob = await generateShareCard(elementId);

  if (navigator.share && navigator.canShare({ files: [new File([blob], 'menu.png')] })) {
    // Native share (mobile)
    await navigator.share({
      files: [new File([blob], 'ramadan-spin.png', { type: 'image/png' })],
      title: 'Menu Sahurku Hari Ini',
      text: 'Spin menu kamu di ramadanspin.vercel.app',
    });
  } else {
    // Fallback: download image
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ramadan-spin.png';
    a.click();
    URL.revokeObjectURL(url);
  }
}
```

---

## 10. Viral Mechanics

### 1. Shareable Result Cards
- Beautiful, Instagram-story-ready design
- Includes URL for organic discovery
- Hashtag suggestions

### 2. Daily Scarcity
- 3 spins per day creates:
  - Reason to return tomorrow
  - Decision commitment ("This is my menu!")
  - FOMO if friends share

### 3. Social Proof
- "X orang sudah spin hari ini" counter
- Can be faked initially, then real with analytics

### 4. Seasonal Urgency
- 30-day Ramadan window
- "Spesial Ramadan 1447H" branding
- Creates natural time pressure

---

## 11. Launch Strategy

### Timeline

```
Day 1-2: Setup + Core spin mechanic
Day 3-4: Share card + 3 modes (sahur/iftar/takjil)
Day 5:   Polish + PWA + Deploy
Day 6:   Soft launch (share with friends)
Day 7+:  Iterate based on feedback
```

### Distribution

1. **Personal networks** - Share to WA groups, IG stories
2. **Reddit** - r/indonesia, r/indogaming
3. **Twitter/X** - Indonesian Muslim tech community
4. **TikTok** - Short demo video
5. **Kaskus** - Ramadan threads

### Success Metrics

| Metric | Target (Week 1) |
|--------|-----------------|
| Unique visitors | 1,000 |
| Total spins | 5,000 |
| Shares | 500 |
| Return visitors | 30% |

---

## 12. Future Expansion (Post-MVP)

### Phase 2: More Tools
- [ ] "Tipe Puasamu" personality quiz
- [ ] Ramadan Bingo generator
- [ ] THR Splitter (closer to Lebaran)

### Phase 3: Community
- [ ] User-submitted menu items
- [ ] Regional variations (Jawa, Sumatra, etc.)
- [ ] "Menu terpopuler hari ini" stats

### Phase 4: Gamification
- [ ] Streak tracking (spin every day)
- [ ] Achievement badges
- [ ] Leaderboard (most consistent spinner)

---

## 13. Open Source Strategy

### License
MIT License - free to use, modify, distribute

### Community Contributions Welcome
- Menu database expansion
- Regional food variations
- Translations
- Bug fixes
- Feature suggestions

### Repository Structure
```
README.md           # How to use, contribute
CONTRIBUTING.md     # Contribution guidelines
LICENSE             # MIT
PLAN.md             # This document
src/                # Source code
```

---

## 14. Technical Notes

### PWA Considerations
- Add to Home Screen support
- Offline capability (menu data cached)
- App-like experience on mobile

### Performance Targets
- First Contentful Paint: < 1.5s
- Time to Interactive: < 2s
- Lighthouse score: 90+

### Browser Support
- Chrome, Safari, Firefox (latest 2 versions)
- Mobile-first design
- Works without JavaScript (basic fallback)

---

## 15. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Low engagement | Focus on shareability first |
| Too simple | That's the point - simplicity wins |
| Copied by others | First mover + brand building |
| Seasonal (only Ramadan) | Can expand to year-round halal food |
| Offensive content | Review menu items carefully |

---

## Appendix: Research Summary

### Why This Will Work

1. **Proven pattern:** Wordle grew from 90 to 2M users with simple mechanics
2. **Gap confirmed:** No Indonesian Ramadan food spinner exists
3. **Pain point real:** Decision fatigue is universal
4. **Viral mechanics:** Shareable results + daily limit
5. **Low risk:** 5-7 days to build, minimal cost

### Competitive Landscape

| Existing | Gap |
|----------|-----|
| Muslim Pro | Utility, not fun |
| Wheel of Names | Generic, not Ramadan |
| Food picker apps | Not Indonesian-specific |
| Ramadan games | Shallow, not useful |

### Sources
- Wordle viral analysis
- Indonesian Ramadan traditions research
- Spin wheel mechanics study
- TikTok Ramadan trends
- Reddit r/indonesia community insights

---

*Dokumen ini adalah single source of truth untuk Ramadan Spin project.*
