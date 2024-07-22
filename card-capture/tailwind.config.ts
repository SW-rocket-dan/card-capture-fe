import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    screens: {
      xs: '350px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1800px',
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1700px',
      },
    },
    extend: {
      colors: {
        main: '#6F6CFF',
        'dark-main': '#5E5BFF',
        'light-main': '#DADAFC',
        border: '#DDDDDD',
        lightBorder: '#EEEEEE',
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
      letterSpacing: {
        'little-tight': '-0.018em',
      },
      boxShadow: {
        'drop-bold': '0px 4px 7px rgba(0, 0, 0, 0.3)',
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
  variants: {
    extend: {
      boxShadow: ['active'],
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
