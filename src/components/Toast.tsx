import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onDismiss: () => void;
  duration?: number;
}

export function Toast({ message, type, onDismiss, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [onDismiss, duration]);

  const bgColor = type === 'success' ? 'bg-green' : 'bg-red-500';
  const icon = type === 'success' ? '✓' : '✗';

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 ${bgColor} text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-bounce`}
      role="alert"
      aria-live="polite"
    >
      <span>{icon}</span>
      <span>{message}</span>
    </div>
  );
}
