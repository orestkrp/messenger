import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        purple: "#836FFF",
        "purple-light": "#9989fa",
        navi: "#211951",
        mint: "#15F5BA",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")({ strategy: "class" })],
};
export default config;
