import { useState } from 'react';
import { isSoundMuted, toggleSound } from '../utils/sound';

export function SoundToggle() {
  const [muted, setMuted] = useState(isSoundMuted);

  const handleToggle = () => {
    const newMuted = toggleSound();
    setMuted(newMuted);
  };

  return (
    <button
      onClick={handleToggle}
      className="p-1.5 rounded-lg opacity-60 hover:opacity-100 transition-opacity"
      aria-label={muted ? 'Aktifkan suara' : 'Matikan suara'}
      aria-pressed={!muted}
    >
      <span className="text-lg" aria-hidden="true">
        {muted ? '🔇' : '🔊'}
      </span>
    </button>
  );
}
