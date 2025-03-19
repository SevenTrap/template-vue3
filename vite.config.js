import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { mars3dPlugin } from "vite-plugin-mars3d";

export default defineConfig({
  plugins: [vue(), mars3dPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 5176,
  },
});
