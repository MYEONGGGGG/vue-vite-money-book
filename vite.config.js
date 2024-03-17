import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // 설정 옵션들
  plugins: [vue()],

  // 개발 서버 포트 설정
  server: {
    port: 1995,
  },

  // build 시에 모든 console.log 제거
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }

})
