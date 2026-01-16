type Mode = 'sahur' | 'iftar' | 'takjil';

interface ModeSelectorProps {
  mode: Mode;
  onChange: (mode: Mode) => void;
}

const modes: { value: Mode; label: string; emoji: string; ariaLabel: string }[] = [
  { value: 'sahur', label: 'Sahur', emoji: '🌙', ariaLabel: 'Pilih mode menu sahur' },
  { value: 'iftar', label: 'Buka', emoji: '🌅', ariaLabel: 'Pilih mode menu buka puasa' },
  { value: 'takjil', label: 'Takjil', emoji: '🍧', ariaLabel: 'Pilih mode takjil' },
];

export function ModeSelector({ mode, onChange }: ModeSelectorProps) {
  return (
    <div className="flex gap-2 p-1 bg-card rounded-xl" role="tablist" aria-label="Pilih jenis menu">
      {modes.map((m) => (
        <button
          key={m.value}
          onClick={() => onChange(m.value)}
          role="tab"
          aria-selected={mode === m.value}
          aria-label={m.ariaLabel}
          className={`
            flex-1 py-2 px-4 rounded-lg text-sm font-medium
            transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50
            ${
              mode === m.value
                ? 'bg-gold text-night'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }
          `}
        >
          <span className="mr-1" aria-hidden="true">{m.emoji}</span>
          {m.label}
        </button>
      ))}
    </div>
  );
}
