import { Router } from 'express';

import FreelancerController from './app/controllers/FreelancerController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/freelancers', FreelancerController.store);
routes.post('/sessions', SessionController.store);

export default routes;
