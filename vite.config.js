import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@Api": "/src/api",
      "@Assets": "/src/assets",
      "@Components": "./src/components",
      "@Pages": "/src/pages",
      "@Config": "/src/config",
      "@Styles": "/src/styles",
      "@Routes": "/src/routes",
      "@Utils": "/src/utils",
      "@Constants": "/src/constants",
      "@Store": "/src/store",
    },
  },
});
