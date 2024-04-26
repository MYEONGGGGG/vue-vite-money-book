/* Sequelize를 사용하여 PostgreSQL 데이터베이스에 연결하기 위한 설정 */
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// PostgreSQL 연결 정보
const config = {
    // docker-compose.yaml
    username: process.env.POSTGRES_USER, // PostgreSQL 컨테이너에 설정한 사용자 이름
    hostname: process.env.POSTGRES_HOSTNAME, // Docker Compose 내에서 PostgreSQL 컨테이너의 이름을 호스트로 사용
    database: process.env.POSTGRES_DB, // PostgreSQL 컨테이너에 설정한 데이터베이스 이름
    password: process.env.POSTGRES_PASSWORD, // PostgreSQL 컨테이너에 설정한 비밀번호
    dialect: 'postgres',
    port: process.env.POSTGRES_PORT // Docker Compose에서 PostgreSQL 컨테이너의 포트
};

console.log('[config] ', config);

// Sequelize 연결
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.hostname,
        dialect: config.dialect,
        port: config.port
    }
);

export default sequelize;



/* Postgre를 사용하여 PostgreSQL 데이터베이스에 연결하기 위한 설정 */
// import pg from 'pg';
// const { Pool } = pg;
//
// // PostgreSQL 연결 정보
// const pool = new Pool({
//     // docker-compose.yaml
//     user: 'cmeapp', // PostgreSQL 컨테이너에 설정한 사용자 이름
//     hostname: 'database-server', // Docker Compose 내에서 PostgreSQL 컨테이너의 이름을 호스트로 사용
//     database: 'cmedb', // PostgreSQL 컨테이너에 설정한 데이터베이스 이름
//     password: 'cmepwd', // PostgreSQL 컨테이너에 설정한 비밀번호
//     port: 5432, // Docker Compose에서 PostgreSQL 컨테이너의 포트
// });
//
// export default pool;
