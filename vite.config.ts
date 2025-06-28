import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/login': {
        target: 'http://91.220.155.234:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => `FrontTestingService-auth${path}`,
      },
      '/api': {
        target: 'http://91.220.155.234:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => `/FrontTestingService-back${path.replace('/api', '')}`,
      },
    },
  },
})
