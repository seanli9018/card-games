import { Button } from '@/components';

export default function NotFound() {
  return (
    <main className="flex flex-col gap-8 items-center justify-center flex-1 max-w-screen-2xl mx-auto">
      <div className="flex flex-row justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-12 stroke-red-800 dark:stroke-red-300 pr-4"
        >
          <path
            fillRule="evenodd"
            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
            clipRule="evenodd"
          />
        </svg>
        <h1 className="text-3xl font-extrabold text-center">
          Oops! Looks like the page is not available!
        </h1>
      </div>
      <Button variant="secondary" size="small" buttonType="link" href="/">
        Back to home
      </Button>
    </main>
  );
}
