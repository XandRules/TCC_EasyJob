import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import FreelancerController from './app/controllers/FreelancerController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/freelancers', FreelancerController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/freelancers', FreelancerController.update);

export default routes;
