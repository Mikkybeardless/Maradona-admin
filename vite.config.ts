// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const API_BASE_URL = process.env.VITE_API_URL;
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: API_BASE_URL,
        changeOrigin: true,
        secure: true,
        // ✨ KEEP `/api` in path
        rewrite: (path) => path, // <- No replacement
      },

      "/uploads": {
        target: API_BASE_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  esbuild: {
    drop: process.env.NODE_ENV === "production" ? ["console", "debugger"] : [],
  },
});
