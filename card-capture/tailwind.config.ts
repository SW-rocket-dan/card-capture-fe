import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        main: '#6F6CFF',
        border: '#DDDDDD',
        icon: '#8E99A3',
        editorbg: '#F0F0F0',
        itembg: '#F5F5F5',
        bannerbg: '#F5F5FB',
        gray1: '#666666',
        gray2: '#555555',
        gray3: '#707070',
        gray4: '#777777',
        gray5: '#999999',
        gray6: '#DDDDDD',
        gray7: '#AAAAAA',
        gray8: '#D9D9D9',
        'light-gray': '#F9F9F9',
        defaultBlack: '#111111',
        highlightBorder: '#E3746D',
      },
      fontFamily: {
        Pretendard: ['Pretendard'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
