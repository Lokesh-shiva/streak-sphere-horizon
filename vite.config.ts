import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // Polyfill for process.env used by some libraries and Next.js
    'process.env': {},
    'process.platform': JSON.stringify(process.platform),
    'process.version': JSON.stringify(process.version),
    'process.browser': true,
    'process.cwd': JSON.stringify('/'),
    'process.env.NODE_ENV': JSON.stringify(mode)
  }
}));
