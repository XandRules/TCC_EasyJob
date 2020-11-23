
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('freelancer', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
<<<<<<< HEAD
    password_hash: DataTypes.STRING,
    phone: DataTypes.STRING,
    cpf: DataTypes.STRING,
    bio: DataTypes.STRING,
    birth: DataTypes.STRING,
    gender: DataTypes.STRING,
    active: DataTypes.STRING,
    terms_of_use: DataTypes.STRING,
    password: DataTypes.VIRTUAL,
    speciality_id: DataTypes.NUMBER,
    avatar_id: DataTypes.NUMBER,
    id_hash: DataTypes.STRING,
=======
    gender: DataTypes.STRING,
    birth: DataTypes.STRING,
    cpf: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    active: DataTypes.BOOLEAN
>>>>>>> add classes de teste
  });
};