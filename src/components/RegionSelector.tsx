import { REGIONS, type Region } from '../data/sahur';

type RegionOption = Region | 'semua';

interface RegionSelectorProps {
  region: RegionOption;
  onChange: (region: RegionOption) => void;
}

export function RegionSelector({ region, onChange }: RegionSelectorProps) {
  const selected = REGIONS.find((r) => r.id === region) ?? REGIONS[0];

  return (
    <div className="relative">
      <select
        value={region}
        onChange={(e) => onChange(e.target.value as RegionOption)}
        aria-label="Pilih daerah"
        className="
          w-full py-2 px-4 pr-8
          bg-card border border-white/10 rounded-xl
          text-white text-sm font-medium
          appearance-none cursor-pointer
          transition-all duration-200
          hover:border-gold/30
          focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/30
        "
      >
        {REGIONS.map((r) => (
          <option key={r.id} value={r.id} className="bg-night">
            {r.emoji} {r.name}
          </option>
        ))}
      </select>
      <span
        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/50"
        aria-hidden="true"
      >
        {selected.emoji}
      </span>
    </div>
  );
}
