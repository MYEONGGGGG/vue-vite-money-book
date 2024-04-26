import pool from './index.js'; // 데이터베이스 연결 설정 가져오기
import { DataTypes } from 'sequelize';
import sequelize from "./index.js"; // 데이터 타입 정의를 위해 객체 가져오기

// User 모델 정의: DB에서 User 테이블과 매핑된다.
const User = sequelize.define('USer', {
    // 속성 정의
    index: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userName: { type: DataTypes.STRING, allowNull: true, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    telNo: { type: DataTypes.STRING, allowNull: false }
}, {
    sequelize, timestamps: true, freezeTableName: true, tableName: 'users'
});

// 테이블 생성 및 초기 데이터 삽입
const createUserTable = async () => {
  try {
      // 테이블 존재하는지 확인
      const tableExists = await User.sync();

      // 테이블 미존재 시, 생성 및 기초 데이터 삽입
      if (!tableExists) {
          await User.sync();

          await User.bulkCreate([
              { userName: 'user1', password: 'pwd111', email: 'user1@mail.com', telNo: '010-1111-1111' },
              { userName: 'user2', password: 'pwd222', email: 'user2@mail.com', telNo: '010-2222-2222' },
          ]);
      } else {
          console.log('[createUserTable] already created table');
      }
  } catch (e) {
      console.error('[createUserTable] Error', e);
  }
}

// 사용자 조회
const getUsers = async () => {
    try {
        // 모든 사용자 조회 및 반환
        const all = await User.findAll();
        return all;
    } catch (err) {
        console.error('[getUsers] Error: ', err);
        throw err;
    }
};

export { createUserTable, getUsers };





// 쿼리문을 이용한 사용자 테이블 생성 및 데이터 삽입 함수
// const createUserTable = async () => {
//     let client;
//     try {
//         client = await pool.connect();
//
//         if (client) {
//             console.log('[createUserTable] 클라이언트 연결에 성공하였습니다.');
//
//             // 테이블 존재 여부 확인
//             const tableExistsQuery = `
//             SELECT EXISTS (
//                 SELECT FROM information_schema.tables
//                 WHERE table_name = 'users'
//             );
//         `;
//             const { rows } = await client.query(tableExistsQuery);
//             const tableExists = rows[0].exists;
//
//             // 테이블이 존재하지 않으면
//             if (!tableExists) {
//                 // 테이블 생성
//                 await client.query(`
//                 CREATE TABLE IF NOT EXISTS users (
//                     id SERIAL PRIMARY KEY,
//                     username VARCHAR(50) UNIQUE NOT NULL,
//                     email VARCHAR(100) UNIQUE NOT NULL
//                     )
//             `);
//
//                 // 데이터 삽입
//                 await client.query(`
//             INSERT INTO users (username, email)
//             VALUES ('user1', 'user1@example.com'),
//                    ('user2', 'user2@example.com')
//             `);
//
//                 console.log('[createUserTable] 사용자 테이블 생성 및 데이터 삽입이 완료되었습니다.');
//             } else {
//                 console.log('[createUserTable] 테이블이 이미 존재합니다.');
//             }
//
//         } else {
//             console.log('[createUserTable] 클라이언트 연결에 실패하였습니다.');
//         }
//
//     } catch (err) {
//         console.error('[createUserTable] ERROR: ', err);
//     } finally {
//         // 클라이언트 반환
//         if (client) client.release();
//     }
// };

// 쿼리문을 이용한 사용자 조회 함수
// const getUsers = async () => {
//     let client;
//     try {
//         client = await pool.connect();
//
//         if (client) {
//             // 사용자 조회
//             const result = await client.query('SELECT * FROM users');
//             return result.rows;
//         } else {
//             console.error('[getUsers] 클라이언트 연결 실패');
//             return [];
//         }
//
//     } catch (err) {
//         console.error('[getUsers] ERROR: ', err);
//         throw err;
//     } finally {
//         // 클라이언트 반환
//         if (client) client.release();
//     }
// };
//
// export { createUserTable, getUsers };