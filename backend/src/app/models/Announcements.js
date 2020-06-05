import Sequelize, { Model } from 'sequelize';

import bcrypt from 'bcryptjs';

class Announcement extends Model {
  static init(sequelize) {
    // migration de Establishment
    super.init(
      {
        description: Sequelize.STRING,
        period: Sequelize.STRING,
        amount: Sequelize.STRING,
        day_of_week: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'photo_id', as: 'photo' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}
export default Announcement;
