export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  safelist: [
    "dark:bg-gray-800",
    "dark:text-white",
    "dark:border-gray-700",
    "dark:border-white",
    "dark:text-violet-400",
    // Agrega aquí cualquier otra clase dark: que uses
  ],
  plugins: [],
};
