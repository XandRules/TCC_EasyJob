import Sequelize, { Model } from 'sequelize';

import bcrypt from 'bcryptjs';

class Establishment extends Model {
  static init(sequelize) {
    // migration de Establishment
    super.init(
      {
        company_name: Sequelize.STRING,
        social_reason: Sequelize.STRING,
        email: Sequelize.STRING,
        cnpj: Sequelize.STRING,
        bio: Sequelize.STRING,
        phone: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        active: Sequelize.STRING,
        terms_of_use: Sequelize.STRING,
        id_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (establishment) => {
      if (establishment.password) {
        establishment.password_hash = await bcrypt.hash(
          establishment.password,
          8
        );
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, {
      foreignKey: 'avatar_id', 
      as: 'avatar' 
    });

    this.belongsTo(models.Address, {
      foreignKey: 'address_id',
      as: 'address'
    });
    
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}
export default Establishment;
