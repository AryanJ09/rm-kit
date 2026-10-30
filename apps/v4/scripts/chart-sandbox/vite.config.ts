import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"

const root = fileURLToPath(new URL("../..", import.meta.url))
export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  resolve: {
    alias: {
      "@": root,
    },
  },
  server: {
    host: "127.0.0.1",
    port: 6043,
    strictPort: true,
  },
})
