import dotenv from 'dotenv';

import express from 'express';
import path from 'path';
import routes from './routes';
import cors from 'cors';

import './database';

dotenv.config();

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    console.log(process.env.NODE_ENV)
    this.server.use(
      cors({
        origin: process.env.APP_URL,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: '*',
        exposedHeaders: 'x-total-count',
      })
    );     
  
    this.server.use(cors());


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
