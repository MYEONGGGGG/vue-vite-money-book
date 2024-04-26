import express from 'express';
import sequelize from "./models/index.js";
import { createUserTable, getUsers } from "./models/user.js";

import { Error } from './lib/lib.js';
import httpError from 'http-errors';

const app = express();
const PORT = process.env.PORT || 3000;

// database
(async () => {
    try {
        console.log('CHECK: DB 연결을 시도합니다.');

        // DB 연결 확인
        await sequelize.authenticate();
        console.log('SUCCESS: DB 연결 상태가 정상입니다.');

        // 모델과 DB 동기화 완료
        await sequelize.sync();

        console.log('SUCCESS: PostgreSQL 연결 및 사용자 테이블 생성이 완료되었습니다.');
    } catch (err) {
        console.log('ERROR: PostgreSQL 연결 및 사용자 테이블 생성 중 오류가 발생하였습니다.');
    }
})();

// 미들웨어 등록
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// lib/lib.js 에서 생성해둔 Error 함수를 사용
app.use(Error);


// 라우트 정의
app.get('/', async (req, res) => {
    try {
        // 사용자 조회
        const users = await getUsers();
        res.json(users);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Error connecting to PostgreSQL');
    }
});

// Error 핸들러 생성: Express 내부에서 발생하는 404 에러 처리
// 요청을 잘못 된 경로로 시도 할 때 내부 404에러를 형식에 맞춰 처리한다.
app.use(() => {
    // 라이브러리 이용
    throw httpError(404);
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});