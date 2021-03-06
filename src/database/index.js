import Sequelize from 'sequelize';

import Freelancer from '../app/models/freelancer';
import Establishment from '../app/models/Establishment';
import File from '../app/models/File';
import Speciality from '../app/models/Speciality';
import Announcements from '../app/models/Announcements';
import Job from '../app/models/Job';
import Address from '../app/models/Address';
import Chat from '../app/models/Chat';

import databaseConfig from '../config/database';
import InitialJob from '../app/models/Initialjob';

const models = [
  Freelancer,
  Establishment,
  File,
  Speciality,
  Announcements,
  Job,
  Address,
  Chat,
  InitialJob,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
