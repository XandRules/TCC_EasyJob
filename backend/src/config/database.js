module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'easyjob',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
