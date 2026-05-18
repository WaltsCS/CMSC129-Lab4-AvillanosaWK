// vite.config.mjs

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "frontend",
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/tasks": "http://localhost:3001",
    },
  },
});