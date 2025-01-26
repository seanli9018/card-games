import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      animationDelay: {
        '100': '100ms',
        '200': '200ms',
        '500': '500ms',
        '1000': '1000ms',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ({ addUtilities, theme }: { addUtilities: any; theme: any }) => {
      const delays = theme ? theme('animationDelay') : {};
      const delayUtilities = Object.entries(delays).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [`.animate-delay-${key}`]: { 'animation-delay': value },
        }),
        {}
      );
      addUtilities(delayUtilities);
    },
  ],
} satisfies Config;
