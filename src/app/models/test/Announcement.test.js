
var db = require("./index.js");

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('announcement', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    period: DataTypes.STRING,
    amount: DataTypes.STRING,
    day_of_week: DataTypes.STRING,
    city: DataTypes.STRING,
  });
};