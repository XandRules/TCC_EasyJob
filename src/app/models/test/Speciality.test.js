
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('speciality', {
    speciality_function: DataTypes.STRING,
  });
};