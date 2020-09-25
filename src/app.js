import dotenv from 'dotenv';

import express from 'express';
import path from 'path';
import routes from './routes';
import chat from './chat';
import cors from 'cors';

import './database';

dotenv.config();

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    chat();
  }

  middlewares() {
    this.server.use(
      cors()
    );
    this.server.use(express.json());
    this.server.use(
      '/file',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
    
  }

  routes() {
    this.server.use(routes);
  }

}

export default new App().server;
