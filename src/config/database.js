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

const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();
