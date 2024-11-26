import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          500: '#0077ED',
          600: '#0066CC',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          700: '#374151',
          800: '#1F2937',
        }
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      typography: {
        DEFAULT: {
          css: {
            code: {
              backgroundColor: '#f3f4f6',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config;
