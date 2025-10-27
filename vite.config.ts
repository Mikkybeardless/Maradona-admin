// vite.config.js
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  // Load .env variables based on current mode
  const env = loadEnv(mode, process.cwd(), "");

  // Extract the API base URL
  const API_BASE_URL = env.VITE_API_URL;

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: API_BASE_URL,
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path,
        },
        "/uploads": {
          target: API_BASE_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    esbuild: {
      drop: mode === "production" ? ["console", "debugger"] : [],
    },
  };
});
