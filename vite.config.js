import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 8427, // Unusual port to avoid conflicts
    strictPort: false, // If port is taken, Vite will try the next available port
    open: true // Automatically open browser on server start
  }
})
