const dotenv = require('dotenv');
dotenv.config();

console.log(process.env)

module.exports = {
  development: {
    host: 'localhost',
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: Number(process.env.POSTGRES_PORT),
    dialect: 'postgres',
  },
};
