import Sequelize from 'sequelize';

import Freelancer from '../app/models/freelancer';

import databaseConfig from '../config/database';

const models = [Freelancer];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
