'use client'; // Error boundaries must be Client Components
import { useEffect } from 'react';
import { logError } from '@/utils';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    logError('Global error boundary, please see error details below.', error);
  }, [error]);

  return (
    // global-error must include html and body tags
    <html>
      <body>
        <h2>Oops! Something went wrong...</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
