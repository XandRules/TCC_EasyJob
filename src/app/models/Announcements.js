import Sequelize, { Model } from 'sequelize';

class Announcement extends Model {
  static init(sequelize) {
    // migration de Establishment
    super.init(
      {
        title: Sequelize.STRING,
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
    this.belongsTo(models.Freelancer, {
      foreignKey: 'freelancer_id',
      as: 'freelancer',
    });
    this.hasMany(models.File, {
      foreignKey: 'file_id',
      as: 'file',
    });

    this.belongsTo(models.Speciality, {
      foreignKey: 'speciality_id',
      as: 'speciality',
    });
  }
}
export default Announcement;
