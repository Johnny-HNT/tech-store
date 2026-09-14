/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void: {
          950: '#07080B',
          900: '#0B0D12',
          800: '#12141C',
          700: '#1A1D28',
          600: '#242836',
        },
        ink: {
          100: '#F3F4F8',
          300: '#C7CADA',
          500: '#8B92A6',
          700: '#5B6274',
        },
        signal: {
          blue: '#4C6FFF',
          violet: '#9D5CFF',
          cyan: '#3EE6D8',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(157,92,255,0.25), 0 8px 40px -8px rgba(76,111,255,0.35)',
        'glow-lg': '0 0 0 1px rgba(157,92,255,0.3), 0 20px 60px -12px rgba(76,111,255,0.45)',
      },
      backgroundImage: {
        'grid-fade': 'radial-gradient(ellipse at top, rgba(76,111,255,0.12), transparent 60%)',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-18px,0)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        drift: 'drift 7s ease-in-out infinite',
        'drift-slow': 'drift 11s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
