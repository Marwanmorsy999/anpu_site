import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    fs: {
      strict: false,
    },
    // Allow all origins and hosts for the preview
    cors: true,
    allowedHosts: ["all"],
    // Explicitly allow the preview host
    origin: "http://5173-iqne3ply414krh1j3nkqp.e2b.app",
  },
})
