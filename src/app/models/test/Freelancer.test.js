
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('freelancer', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
    birth: DataTypes.STRING,
    cpf: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  });
};