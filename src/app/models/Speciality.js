import Sequelize, { Model } from 'sequelize';

class Speciality extends Model {
  static init(sequelize) {
    super.init(
      {
        speciality_function: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}
export default Speciality;
