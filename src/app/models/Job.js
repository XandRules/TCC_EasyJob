import Sequelize, { Model } from 'sequelize';

class Job extends Model {
  static init(sequelize) {
    // migration de freelancer
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
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

    this.belongsTo(models.Establishment, {
      foreignKey: 'establishment_id',
      as: 'establishment',
    });

    this.belongsTo(models.InitialJob, {
      foreignKey: 'initial_job_id',
      as: 'initial_job',
    });

    this.belongsTo(models.Announcement, {
      foreignKey: 'announcement_id',
      as: 'announcement',
    });
  }
}
export default Job;
