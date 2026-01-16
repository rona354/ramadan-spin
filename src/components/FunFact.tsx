interface FunFactProps {
  fact: string;
}

export function FunFact({ fact }: FunFactProps) {
  return (
    <div className="bg-primary/30 border border-gold/20 rounded-xl p-4 text-center">
      <p className="text-xs text-gold/80 mb-1">Tahukah kamu?</p>
      <p className="text-sm text-white/90">{fact}</p>
    </div>
  );
}
