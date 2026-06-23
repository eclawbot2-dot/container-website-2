import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0A',
        paper: '#F4F4F1',
        concrete: '#9B9B96',
        concretedark: '#5A5A55',
        hairline: '#1A1A1A',
        acid: '#E6FF00',
      },
      fontFamily: {
        grotesk: ['var(--font-grotesk)', 'Arial Black', 'Helvetica', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'Tahoma', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.05em',
        brutal: '-0.04em',
      },
      borderRadius: {
        none: '0',
      },
    },
  },
  plugins: [],
};

export default config;
