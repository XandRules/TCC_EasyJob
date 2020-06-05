import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import FreelancerController from './app/controllers/FreelancerController';
import EstablishmentController from './app/controllers/EstablishmentController';
import AnnouncementController from './app/controllers/AnnouncementController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/freelancers', FreelancerController.store);
routes.post('/establishment', EstablishmentController.store);
routes.post('/announcement', AnnouncementController.store);
routes.get('/establishments', EstablishmentController.index);
routes.post('/sessionsfreelancer', SessionController.storeFreelancer);
routes.post('/sessionsestablishment', SessionController.storeEstablishment);

routes.use(authMiddleware);

routes.put('/freelancers', FreelancerController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
