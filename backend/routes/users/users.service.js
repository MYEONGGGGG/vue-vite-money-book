// /**
//  * 실제 비지니스 코드 작성
//  *  - 비즈니스 로직(Business Logic)
//  *    크게 두가지 영역으로 나뉜다.
//  *    1. 중복 데이터가 존재하는지 검사하는 과정(데이터를 가공하는 과정) = Logic 영역, Model 영역
//  *    2. 가공된 데이터를 단순히 표시해주는 것.
//  *    */
//
// import httpError from 'http-errors';
// import { IdFind, UserCreate } from './users.repository.js';
// import { Send, Password, CreateSalt } from '../../lib/lib.js';
//
// export const CheckUserId = async (req, res, next) => {
//   try {
//       // 아이디 찾는 값을 params 에서 가져온다.
//       const { id } = req.params;
//
//       // users.repository.js의 IdFind()에 해당 유저가 존재 하는지 함수에 넣어 확인한다.
//       // IdFind() 함수는 async 라서 await 를 사용해야한다.
//       const check = await IdFind(id);
//       if (!check) {
//           // id가 존재하지 않을 경우, Send() 함수에 넣어 전송한다.
//           return Send(res, true);
//       } else {
//           // id가 이미 존재할 경우, 409 에러를 발생시킨다.
//           throw httpError(409);
//       }
//
//   } catch (e) {
//       next(e);
//   }
// };
//
// export const CreateUser = async (req, res, next) => {
//   try {
//       const { id, pwd } = req.body;
//       const userCheck = await IdFind(id);
//
//       // 아이디가 존재하지 않을 경우, 아이디를 생성하고 Send() 함수에 넣어 전송한다.
//       if (!userCheck) {
//           const salt = CreateSalt();
//           const password = Password({ pwd, salt });
//           const result = await UserCreate({ id, password, salt });
//           if (result) {
//               return Send(res, '');
//           } else {
//               throw httpError(500);
//           }
//
//       // 아이디가 존재할 경우, 409 에러를 발생시킨다.
//       } else {
//           throw httpError(409);
//       }
//
//   } catch (e) {
//       next(e);
//   }
// };