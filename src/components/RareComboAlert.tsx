import type { RareCombo } from '../data/rareCombos';

interface RareComboAlertProps {
  combo: RareCombo;
  isNearMiss?: boolean;
}

export function RareComboAlert({ combo, isNearMiss = false }: RareComboAlertProps) {
  if (isNearMiss) {
    return (
      <div className="bg-card border border-white/20 rounded-xl p-4 text-center animate-pulse">
        <p className="text-white/60 text-sm">Hampir dapat...</p>
        <p className="text-lg font-bold text-white/80">
          {combo.emoji} {combo.name}
        </p>
        <p className="text-xs text-white/50 mt-1">Spin lagi untuk coba!</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-gold/20 to-green/20 border-2 border-gold rounded-xl p-4 text-center rare-combo-glow">
      <p className="text-gold text-xs font-medium mb-1">COMBO LEGENDARIS!</p>
      <p className="text-2xl font-bold text-white flex items-center justify-center gap-2">
        <span>{combo.emoji}</span>
        <span>{combo.name}</span>
      </p>
      <p className="text-white/70 text-sm mt-1">{combo.description}</p>
    </div>
  );
}
