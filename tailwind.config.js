// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
     extend: {
      animation: {
        'glow-spin': 'spin 3s linear infinite',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      colors: {
        'gradient-start': '#4f46e5',
        'gradient-middle1': '#06b6d4',
        'gradient-middle2': '#facc15',
        'gradient-end': '#ec4899',
      }
    },
  },
  plugins: [],
}
