import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@Api": "/src/api",
      "@Assets": "/src/assets",
      "@Components": "/src/components",
      "@Config": "/src/config",
      "@Constants": "/src/constants",
      "@Pages": "/src/pages",
      "@Routes": "/src/routes",
      "@Store": "/src/store",
      "@Styles": "/src/styles",
      "@Utils": "/src/utils",
      "@Context": "/src/context",
    },
  },
});
