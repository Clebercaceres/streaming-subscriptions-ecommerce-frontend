import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
    },
  },
  define: {
    __API_URL__: JSON.stringify(
      process.env.VITE_API_URL || 'http://localhost:5001/api'
    ),
    __IMAGES_URL__: JSON.stringify(
      process.env.VITE_IMAGES_URL || 'http://localhost:5001/images'
    ),
  },
})
