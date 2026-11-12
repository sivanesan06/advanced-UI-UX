/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#070b14',
          card: 'rgba(15, 23, 42, 0.75)',
          border: 'rgba(56, 189, 248, 0.2)',
          glow: '#00f0ff',
          neonBlue: '#0ea5e9',
          neonGreen: '#10b981',
          neonAmber: '#f59e0b',
          neonRed: '#ef4444',
          accent: '#06b6d4'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Rajdhani', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px -3px rgba(6, 182, 212, 0.45)',
        'glow-blue': '0 0 25px -3px rgba(59, 130, 246, 0.45)',
        'glow-green': '0 0 20px -3px rgba(16, 185, 129, 0.45)',
        'glow-amber': '0 0 20px -3px rgba(245, 158, 11, 0.45)',
        'glow-red': '0 0 30px 2px rgba(239, 68, 68, 0.55)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}

