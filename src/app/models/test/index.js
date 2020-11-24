var fs = require("fs");

var DataTypes = require('sequelize');
var sequelize = new DataTypes
('easyjob-test', 'postgres', 'docker', {
     host: 'localhost',
     dialect: 'postgres' , 
     port: '5433',
     define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
      }
    });

var db = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return(file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize["import"](__dirname + '/' + file);
    db[model.name] = model;
  });

db.DataTypes = DataTypes;
db.sequelize = sequelize;

module.exports = db;
