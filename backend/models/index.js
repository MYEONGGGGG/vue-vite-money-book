import pg from 'pg';

const { Pool } = pg;

// PostgreSQL 연결 정보
const pool = new Pool({
    // docker-compose.yaml
    user: 'cmeapp', // PostgreSQL 컨테이너에 설정한 사용자 이름
    host: 'localhost', // Docker Compose 내에서 PostgreSQL 컨테이너의 이름을 호스트로 사용
    database: 'cmedb', // PostgreSQL 컨테이너에 설정한 데이터베이스 이름
    password: 'cmepwd', // PostgreSQL 컨테이너에 설정한 비밀번호
    port: 5432, // Docker Compose에서 PostgreSQL 컨테이너의 포트
});

export default pool;
