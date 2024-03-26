import express from 'express';
import pg from 'pg';
const { Pool } = pg;

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL 연결 정보
const pool = new Pool({
    // docker-compose.yaml
    user: 'cmeapp', // PostgreSQL 컨테이너에 설정한 사용자 이름
    host: 'localhost', // Docker Compose 내에서 PostgreSQL 컨테이너의 이름을 호스트로 사용
    database: 'cmedb', // PostgreSQL 컨테이너에 설정한 데이터베이스 이름
    password: 'cmepwd', // PostgreSQL 컨테이너에 설정한 비밀번호
    port: 5432, // Docker Compose에서 PostgreSQL 컨테이너의 포트
});

// 미들웨어 추가
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 테이블 생성 및 데이터 삽입
(async () => {
    const client = await pool.connect();
    try {
        // 특정 테이블 존재 여부 확인
        const tableExistsQuery = `
            SELECT EXISTS (
                SELECT FROM information_schema.tables
                WHERE table_name = 'users'
            );
        `;
        const { rows } = await client.query(tableExistsQuery);
        const tableExists = rows[0].exists;

        // 테이블이 존재하지 않으면 테이블 생성 및 데이터 삽입
        if (!tableExists) {
            await client.query(`
                CREATE TABLE users (
                    id SERIAL PRIMARY KEY,
                    username VARCHAR(50) UNIQUE NOT NULL,
                    email VARCHAR(100) UNIQUE NOT NULL
                )
            `);

            // 데이터 삽입
            await client.query(`
                INSERT INTO users (username, email)
                VALUES ('user1', 'user1@example.com'),
                       ('user2', 'user2@example.com')
            `);

            console.log('테이블 생성 및 데이터 삽입이 완료되었습니다.');
        } else {
            console.log('테이블이 이미 존재합니다.');
        }
    } catch (err) {
        console.error('오류 발생:', err);
    } finally {
        // 클라이언트 반환
        client.release();
    }
})();

// 라우트 정의
app.get('/', async (req, res) => {
    try {
        // 데이터베이스에 연결된 클라이언트 가져오기
        const client = await pool.connect();

        // 생성한 테이블에서 데이터 조회
        const result = await client.query('SELECT id, username, email FROM users');

        // 조회 결과
        let message = '[Connected to PostgreSQL] 총 건수: ' + result.rowCount;
        for (let i=0; i<result.rowCount; i++) {
            message = message + ' (' + (i+1) + ') id: ' + result.rows[i].id + 'username: ' + result.rows[i].username + 'email: ' + result.rows[i].email;
        }

        // Express 에서 클라이언트에게 HTTP 응답 보내기(서버 -> 클라이언트로 데이터 전송)
        res.send(message);

        // 클라이언트 반환(연결 해제)
        client.release();
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Error connecting to PostgreSQL');
    }
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
