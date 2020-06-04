import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import FreelancerController from './app/controllers/FreelancerController';
import EstablishmentController from './app/controllers/EstablishmentController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/freelancers', FreelancerController.store);
routes.post('/establishment', EstablishmentController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/freelancers', FreelancerController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
