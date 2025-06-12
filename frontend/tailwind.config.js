/** @type {import('tailwindcss').Config} */
export default {
  // This line tells Tailwind to scan all your HTML and JSX files for class names.
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // This makes 'sans' the default font, which is cleaner.
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
