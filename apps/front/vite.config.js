import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  
  build: {
    outDir: '../out',
  },
  server: {
    proxy: {
      "/api": {
        target: "http://0.0.0.0:8081",
        changeOrigin: true 
      },
    }
  },
  plugins: [react()],
})
