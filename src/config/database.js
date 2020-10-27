// module.exports = {
//   dialect: 'postgres',
//   host: 'localhost',
//   username: 'postgres',
//   password: 'docker',
//   database: 'easyjob',
//   port: 5433,
//   define: {
//     timestamps: true,
//     underscored: true,
//     underscoredAll: true,
//   },
// };

require('dotenv/config')

module.exports = {
  dialect: 'postgres',
  url : process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};