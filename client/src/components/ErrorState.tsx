interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

function ErrorState({ message, onRetry, retryLabel }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 p-16 text-center dark:border-red-900 dark:bg-red-950/40">
      <h2 className="text-lg font-medium text-red-700 dark:text-red-300">{message}</h2>
      {onRetry && retryLabel && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-700 hover:bg-red-100 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-900/40"
        >
          {retryLabel}
        </button>
      )}
    </div>
  );
}

export default ErrorState;
