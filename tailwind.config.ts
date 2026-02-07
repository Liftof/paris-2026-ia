import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#171717',
          2: '#404040',
          3: '#737373',
          4: '#a3a3a3',
        },
        surface: {
          DEFAULT: '#fafafa',
          alt: '#f5f5f5',
        },
        accent: {
          DEFAULT: '#e63946',
          soft: '#fef2f2',
        },
        score: {
          solid: '#16a34a',
          mixed: '#d97706',
          fragile: '#dc2626',
        },
      },
      fontFamily: {
        body: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'Times New Roman', 'serif'],
        mono: ['Berkeley Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config
