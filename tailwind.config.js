/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./docs/**/*.js",
    "./docs/**/*.vue",
    "./docs/**/*.ts",
    "./docs/**/*.md",
  ],
  options: {
    safelist: ["html", "body"],
  },
}

