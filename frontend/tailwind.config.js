/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      // NEW: Updated color palette
      colors: {
        'primary': '#2563eb', // Electric Blue
        'primary-hover': '#1d4ed8', // A darker blue for hover
        'secondary': '#9ca3af', // A lighter gray for text
        'light': '#f9fafb',
        'dark': '#111827',
        'dark-accent': '#1f2937',
      },
      fontSize: { /* Font sizes remain the same */ },
    },
  },
  plugins: [],
}