import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [], // Remove any externalization
    },
  },
  optimizeDeps: {
    include: ["react-icons/io5"], // Explicitly include react-icons
  },
});
