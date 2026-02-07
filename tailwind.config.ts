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
        primary: '#1E40AF',
        palette: {
          red: '#EF4444',
          blue: '#3B82F6',
          yellow: '#EAB308',
        },
        accent: {
          green: '#10B981',
          orange: '#F59E0B',
        },
        gray: {
          dark: '#1F2937',
          light: '#F9FAFB',
        },
      },
      fontFamily: {
        mono: ['Berkeley Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['Berkeley Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config
