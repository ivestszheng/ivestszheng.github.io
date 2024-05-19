/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./docs/*.{html,vue,js,ts,md}",
    // "./docs/**/*.{html,vue,js,ts,md}", 这样写是不行的
    "./docs/.vitepress/*.{html,vue,js,ts,md}",
    "./docs/pages/*.md",
  ],
  options: {
    safelist: ["html", "body"],
  },
};
