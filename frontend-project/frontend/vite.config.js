import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig(({ mode }) => ({
  plugins: [react()],

  // 🔥 Dev → "/"   |   Build for Django → "/static/"
  base: mode === "development" ? "/" : "/static/",

  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
}));
