import { defineConfig } from 'vite'

export default defineConfig({
  base: '/', // Set to '/' for custom domain, or '/repo-name/' for GitHub Pages without custom domain
  server: {
    port: 8427, // Unusual port to avoid conflicts
    strictPort: false, // If port is taken, Vite will try the next available port
    open: true // Automatically open browser on server start
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
})
