import Sequelize, {
  Model
} from 'sequelize';

import bcrypt from 'bcryptjs';

class Freelancer extends Model {
  static init(sequelize) {
    // migration de freelancer
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password_hash: Sequelize.STRING,
      phone: Sequelize.STRING,
      cpf: Sequelize.STRING,
      bio: Sequelize.STRING,
      birth: Sequelize.STRING,
      gender: Sequelize.STRING,
      active: Sequelize.STRING,
      terms_of_use: Sequelize.STRING,
      password: Sequelize.VIRTUAL,
      speciality_id: Sequelize.NUMBER,
      avatar_id: Sequelize.NUMBER,
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (freelancer) => {
      if (freelancer.password) {
        freelancer.password_hash = await bcrypt.hash(freelancer.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, {
      foreignKey: 'avatar_id',
      as: 'avatar'
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}
export default Freelancer;
