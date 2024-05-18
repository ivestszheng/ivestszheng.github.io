/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./docs/**/*.{html,js,vue,ts,md}",
    "./docs/.vitepress/**/*.{html,js,vue,ts,md}",
  ],
  options: {
    safelist: ["html", "body"],
  },
};
