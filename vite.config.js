import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "build" ? "/entity-managment" : "/",
  build: {
    rollupOptions: {
      input: "index.html",
    },
  },
}));
