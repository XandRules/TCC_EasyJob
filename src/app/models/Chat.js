import Sequelize, { Model } from 'sequelize';

class Chat extends Model {
  static init(sequelize) {
    // migration de freelancer
    super.init(
      {
        message: Sequelize.STRING,
        room : Sequelize.STRING,
        date: Sequelize.DATE,
        to_user: Sequelize.STRING,
        from_user: Sequelize.STRING,
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

    this.belongsTo(models.Announcement, {
      foreignKey: 'announcement_id',
      as: 'announcement',
    });
  }
}
export default Chat;
