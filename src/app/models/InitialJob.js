import Sequelize, { Model } from 'sequelize';

class InitialJob extends Model {
  static init(sequelize) {
    // migration de freelancer
    super.init(
      {
        to_user : Sequelize.STRING,
        from_user : Sequelize.STRING,   
        comment : Sequelize.STRING,  
        begin_time : Sequelize.STRING,
        end_time : Sequelize.STRING,        
        date: Sequelize.DATE,
        amount : Sequelize.INTEGER,
        accepted : Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Job, {
      foreignKey: 'job_id',
      as: 'job',
    });
  }
}
export default InitialJob;
