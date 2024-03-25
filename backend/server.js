import express from 'express';
import { Pool } from 'pg';

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL 연결 정보
const pool = new Pool({
    // docker-compose.yaml
    user: 'cmeapp', // PostgreSQL 컨테이너에 설정한 사용자 이름
    host: 'database-server', // Docker Compose 내에서 PostgreSQL 컨테이너의 이름을 호스트로 사용
    database: 'cmedb', // PostgreSQL 컨테이너에 설정한 데이터베이스 이름
    password: 'cmepwd', // PostgreSQL 컨테이너에 설정한 비밀번호
    port: 9966, // Docker Compose에서 PostgreSQL 컨테이너의 포트
});

// 미들웨어 추가
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우트 정의
app.get('/', (req, res) => {
    res.send('Express 서버가 실행 중입니다.');
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
