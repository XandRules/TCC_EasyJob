// module.exports = {
//   dialect: 'postgres',
//   host: 'localhost',
//   username: 'postgres',
//   password: 'docker',
//   database: 'easyjob',
//   define: {
//     timestamps: true,
//     underscored: true,
//     underscoredAll: true,
//   },
// };

module.exports = {
  dialect: 'postgres',
  url : process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};