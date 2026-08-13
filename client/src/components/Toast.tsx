import { useEffect } from 'react';

interface ToastProps {
  message: string;
  onDismiss: () => void;
}

function Toast({ message, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      role="status"
      className="fixed bottom-4 right-4 z-50 rounded-md bg-slate-900 px-4 py-3 text-sm text-white shadow-lg dark:bg-slate-100 dark:text-slate-900"
    >
      {message}
    </div>
  );
}

export default Toast;
