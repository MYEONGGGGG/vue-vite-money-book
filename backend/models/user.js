import pool from './index.js'; // 데이터베이스 연결 설정 가져오기

// 사용자 테이블 생성 및 데이터 삽입 함수
const createUserTable = async () => {
    const client = await pool.connect();
    try {
        // 테이블 존재 여부 확인
        const tableExistsQuery = `
            SELECT EXISTS (
                SELECT FROM information_schema.tables
                WHERE table_name = 'users'
            );
        `;
        const { rows } = await client.query(tableExistsQuery);
        const tableExists = rows[0].exists;

        // 테이블이 존재하지 않으면
        if (!tableExists) {
            // 테이블 생성
            await client.query(`
                CREATE TABLE IF NOT EXISTS users (
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

            console.log('사용자 테이블 생성 및 데이터 삽입이 완료되었습니다.');
        } else {
            console.log('테이블이 이미 존재합니다.');
        }

    } catch (err) {
        console.error('테이블 생성 중 오류가 발생하였습니다 -', err);
    } finally {
        // 클라이언트 반환
        client.release();
    }
};

// 사용자 조회 함수
const getUsers = async () => {
    const client = await pool.connect();
    try {
        // 사용자 조회
        const result = await client.query('SELECT * FROM users');
        return result.rows;
    } catch (err) {
        console.error('오류 발생:', err);
        throw err;
    } finally {
        // 클라이언트 반환
        client.release();
    }
};

export { createUserTable, getUsers };