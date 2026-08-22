import { useCallback, useRef, useState } from 'react';

interface UseSubmitGuardOptions {
  resetOnSuccess?: boolean;
}

export function useSubmitGuard<Args extends unknown[]>(
  onSubmit: (...args: Args) => Promise<void>,
  options?: UseSubmitGuardOptions,
) {
  const resetOnSuccess = options?.resetOnSuccess ?? false;
  const submittingRef = useRef(false);
  const [submitting, setSubmitting] = useState(false);

  const guardedSubmit = useCallback(
    async (...args: Args) => {
      if (submittingRef.current) return;
      submittingRef.current = true;
      setSubmitting(true);

      try {
        await onSubmit(...args);
        if (resetOnSuccess) {
          submittingRef.current = false;
          setSubmitting(false);
        }
      } catch {
        // onSubmit ya ha dejado su propio estado de error (p. ej. setErrors);
        // aquí solo rearmamos el botón para que se pueda reintentar.
        submittingRef.current = false;
        setSubmitting(false);
      }
    },
    [onSubmit, resetOnSuccess],
  );

  return { submitting, guardedSubmit };
}
