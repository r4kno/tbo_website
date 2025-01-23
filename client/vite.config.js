import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/SharedServices': {
        target: 'http://api.tektravels.com',
        changeOrigin: true,
      },
      '/api': {
        target: 'http://api.tektravels.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
