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

}
export default Address;
