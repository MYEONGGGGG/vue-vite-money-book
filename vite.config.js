import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  // 개발 서버 설정
  server: {
    // 포트: 개발 서버가 사용할 포트 설정, 기본 포트인 3000번이 충돌하지 않는 한도내에서 원하는 포트로 설정할 수 있다.
    port: 1995,

    // 호스트: 개발서버에서 엑세스할 수 있는 호스트를 설정, 기본값은 'localhost' 이지만 로컬 네트워크에서 접근할 수 있다.
    // host: '0.0.0.0',
    // 1) 설정 후 결과
    // Local: http://localhost:1995/
    // Network: http://로컬 네트워크 IP:1995/

    host: 'localhost',
    // 2) 설정 후 결과
    // Local: http://localhost:1995/

    // 에러 처리 설정: 개발 중 발생하는 에러에 대한 처리 방법 설정
    hmr: {
      overlay: true // 브라우저 오류 메시지를 자세하게 표시
    }
  },

  // 모듈 해석하는 방법 설정(확장자, 경로 등)
  resolve: {
    // 모듈을 가리키는 별칭 설정
    alias: {
      // './src' 경로를 '@'로 매핑
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  // 개발 환경 설정
  build: {
    // 디버그용 소스맵
    sourcemap: true, // 개발 환경에서만 true 설정 권장
    // 최소화
    minify: 'false', // 코드 최소화: 'terser 코드를 압축', 'esbuild 빠르고 효율적인 빌드 속도 제공', 'false 비활성화(개발 환경에서 주로 사용)'

    // 최소화 추가 설정
    // *minify: 'terser' 설정(배포 환경) 시, 사용 권장
    // terserOptions: {
    //   // 코드 압축 관련 설정
    //   compress: {
    //     drop_console: true, // build 시, 콘솔 로그 문장 제거
    //     drop_debugger: true // build 시, 디버거 문을 제거(코드 크기를 줄이고, 보안을 강화할 수 있음)
    //   }
    // }
  }

})
