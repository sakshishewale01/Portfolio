/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: 'var(--bg-primary)',
          surface: 'var(--bg-surface)',
          elevated: 'var(--bg-surface-elevated)',
        },
        border: {
          DEFAULT: 'var(--border-subtle)',
          hover: 'var(--border-hover)',
        },
        foreground: {
          DEFAULT: 'var(--text-primary)',
          muted: 'var(--text-muted)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          glow: 'var(--accent-glow)',
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'fluid-h1': ['clamp(2.25rem, 4.5vw + 1rem, 4.25rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'fluid-h2': ['clamp(1.75rem, 3vw + 0.75rem, 2.75rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'fluid-h3': ['clamp(1.35rem, 2vw + 0.5rem, 1.85rem)', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'fluid-body': ['clamp(0.95rem, 0.4vw + 0.85rem, 1.075rem)', { lineHeight: '1.6' }],
        'fluid-small': ['clamp(0.8rem, 0.25vw + 0.75rem, 0.875rem)', { lineHeight: '1.5' }],
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '14px',
        'xl': '20px',
        '2xl': '24px',
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.35)',
        'card': '0 8px 30px rgba(0, 0, 0, 0.45)',
        'glow': '0 0 25px -5px var(--accent-glow)',
        'glow-lg': '0 0 50px -10px var(--accent-glow)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.45' },
        },
      },
    },
  },
  plugins: [],
}
