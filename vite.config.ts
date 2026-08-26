import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// Production-safe Vite config for Cloudflare Pages and local development.
// Keep deployment concerns out of the config; Pages runs the normal Vite build.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
  build: {
    outDir: "dist",
    sourcemap: false,
  },
})
