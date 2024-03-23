import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

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
