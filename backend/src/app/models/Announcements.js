import Sequelize, { Model } from 'sequelize';

class Announcement extends Model {
  static init(sequelize) {
    // migration de Establishment
    super.init(
      {
        description: Sequelize.STRING,
        period: Sequelize.STRING,
        amount: Sequelize.STRING,
        day_of_week: Sequelize.STRING,
        freelancer_id: Sequelize.INTEGER,
        speciality_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Freelancer, {
      foreignKey: 'freelancer_id',
      as: 'freelancer',
    });
    this.hasMany(models.File, {
      foreignKey: 'file_id',
    });

    this.belongsTo(models.Speciality, {
      foreignKey: 'speciality_id',
      as: 'speciality',
    });
  }
}
export default Announcement;
