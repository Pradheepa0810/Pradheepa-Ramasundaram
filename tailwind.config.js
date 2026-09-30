/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "var(--color-cream)",
        cobalt: {
          light: "var(--color-cobalt-light)",
          DEFAULT: "var(--color-cobalt)",
          dark: "var(--color-cobalt-dark)",
        },
        coral: {
          light: "var(--color-coral-light)",
          DEFAULT: "var(--color-coral)",
          dark: "var(--color-coral-dark)",
        },
        tangerine: {
          light: "var(--color-tangerine-light)",
          DEFAULT: "var(--color-tangerine)",
          dark: "var(--color-tangerine-dark)",
        },
        olive: {
          light: "var(--color-olive-light)",
          DEFAULT: "var(--color-olive)",
          dark: "var(--color-olive-dark)",
        },
        espresso: "var(--color-espresso)",
        paper: "var(--color-paper)",
        lavender: "var(--color-lavender)",
        sunshine: "var(--color-sunshine)",
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'retro': '4px 4px 0px 0px var(--color-espresso)',
        'retro-lg': '8px 8px 0px 0px var(--color-espresso)',
        'retro-xl': '12px 12px 0px 0px var(--color-espresso)',
        'retro-hover': '2px 2px 0px 0px var(--color-espresso)',
        'soft': '0 20px 40px -15px rgba(26, 24, 20, 0.08)',
      }
    },
  },
  plugins: [],
}
