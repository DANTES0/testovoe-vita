import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/FrontTestingService-auth/': {
        target: 'http://91.220.155.234:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
        },
      },
      '/FrontTestingService-back/': {
        target: 'http://91.220.155.234:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
        },
      },
    },
  },
})
