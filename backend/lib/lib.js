/*
* 에러코드를 직접 생성하지 않고 간편한 http-errors 라이브러리를 이용한다.
* http-errors에서 기본 제공되는 error message 를 사용해보자.
*
* 데이터/Error 전송 포맷 설정 함수 생성
* */

// 에러
// 주어진 에러 객체를 기반으로 클라이언트에게 적절한 응답을 보낸다.
// 에러 객체의 상태 코드와 메시지를 포함한 JSON 응답을 생성한다.
export const Error = (err, req, res, next) => {
    res.status(err.statusCode).json({
        code: err.statusCode,
        result: false,
        msg: err.message,
        data: ''
    });
};

// 전송 포맷
// 데이터를 클라이언트에게 전송하기 위한 포맷을 정의한다.
// 주어진 데이터를 포함한 JSON 응답을 생성하여 클라이언트에게 전송한다.
export const Send = (res, data) => {
    res.status(200).json({
        code: 200,
        result: true,
        msg: '',
        data
    });
};