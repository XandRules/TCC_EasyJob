
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('establish', {
    company_name: DataTypes.STRING,
    email: DataTypes.STRING,
    social_reason: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  });
};