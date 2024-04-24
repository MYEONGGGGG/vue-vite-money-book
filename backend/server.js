import express from 'express';

import { createUserTable, getUsers } from "./models/user.js";
// import userRouter from './routes/users/users.route.js';

import { Error } from './lib/lib.js';
import httpError from 'http-errors';

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL 연결 및 사용자 테이블 생성
(async () => {
    try {
        // 사용자 테이블 생성 및 데이터 삽입
        await createUserTable();
        console.log('SUCCESS: PostgreSQL 연결 및 사용자 테이블 생성이 완료되었습니다.');
    } catch (err) {
        console.log('ERROR: PostgreSQL 연결 및 사용자 테이블 생성 중 오류가 발생하였습니다.');
    }
})();

// 미들웨어 등록
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// user url routing 설정
// app.use('/user', userRouter);

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
// app.use((req, res, next) => {
// 404 오류 페이지 렌더링 라우트 정의
//     res.status(404).send('죄송합니다. 요청하신 페이지를 찾을 수 없습니다.');
// });

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
