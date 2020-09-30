import Sequelize, { Model } from 'sequelize';

class Address extends Model {
  static init(sequelize) {
    // migration de freelancer
    super.init(
      {
        public_place: Sequelize.STRING,
        uf: Sequelize.STRING,
        number: Sequelize.NUMBER,
        city: Sequelize.STRING,
        neighborhood: Sequelize.STRING,
        cep : Sequelize.STRING,
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
      foreignKey: 'establish_id',
      as: 'establish',
    });
  }

}
export default Address;
