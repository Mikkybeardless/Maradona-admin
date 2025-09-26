// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://ds.reconnaissancetechnologies.com",
        changeOrigin: true,
        secure: true,
        // ✨ KEEP `/api` in path
        rewrite: (path) => path, // <- No replacement
      },

      "/uploads": {
        target: "https://ds.reconnaissancetechnologies.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  esbuild: {
    drop: process.env.NODE_ENV === "production" ? ["console", "debugger"] : [],
  },
});
