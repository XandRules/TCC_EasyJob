import 'dotenv/config';

import express from 'express';
import path from 'path';
import routes from './routes';
import cors from 'cors';

import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(
      cors({
        origin: ['http://localhost:3000', process.env.APP_URL],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: '*',
        exposedHeaders: 'x-total-count',
      })
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