/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#062D24',
          light: '#0A3D32',
          dark: '#041E18',
        },
        accent: {
          DEFAULT: '#D4AF37',
          light: '#E5C158',
          dark: '#B3912B',
        },
        sage: {
          DEFAULT: '#4A7856',
          light: '#6B9A77',
        },
        cream: {
          DEFAULT: '#FDFBF7',
          dark: '#F5F2EA',
        },
        sand: '#D9C7A3',
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        // Original keys for backward compatibility
        bg: '#0B3D2E',
        textGold: '#D4AF37',
        text2: '#F7F6F2',
        sandBeige: '#D9C7A3',
        Black: '#1A1A1A',
        lightGreen: '#4A7856'
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-outfit)', 'sans-serif'],
        arabic: ['var(--font-amiri)', 'serif'],
      },
      backgroundImage: {
        'islamic-pattern': "url('/patterns/islamic-pattern.svg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'subtle-zoom': 'subtleZoom 20s infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        subtleZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
};
