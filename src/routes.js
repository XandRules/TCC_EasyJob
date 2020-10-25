import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import FreelancerController from "./app/controllers/FreelancerController";
import EstablishmentController from "./app/controllers/EstablishmentController";
import AnnouncementController from "./app/controllers/AnnouncementController";
import SpecialityController from "./app/controllers/SpecialityController";
import SessionController from "./app/controllers/SessionController";
import FileController from "./app/controllers/FileController";
import JobController from "./app/controllers/JobController";
import AddressController from "./app/controllers/AddressController";
import MailController from "./app/controllers/MailController";
import ChatController from "./app/controllers/ChatController";

import authMiddleware from "./app/middlewares/auth";
import InitialJobController from "./app/controllers/InitialJobController";

const routes = new Router();

const upload = multer(multerConfig);

routes.post("/freelancers", FreelancerController.store);
routes.post("/address", AddressController.store);
routes.post("/establishment", EstablishmentController.store);
routes.post("/sessionsfreelancer", SessionController.storeFreelancer);
routes.post("/sessionsestablishment", SessionController.storeEstablishment);
routes.get("/specialities", SpecialityController.index);
routes.post("/mail", MailController.sendMail);
routes.post("/specialities", SpecialityController.store);

routes.use(authMiddleware);

routes.get("/address", AddressController.index);
routes.get("/address/freelancer/:id", AddressController.freelancerAddress);
routes.get("/address/establish/:id", AddressController.establishAddress);
routes.put("/address/:id", AddressController.update);

routes.get('/chat', ChatController.index);
routes.get('/chat/index/:id_hash', ChatController.indexFromUser);
routes.get('/chat/userroom/:room', ChatController.indexChatFromUser);
routes.post('/create/chat', ChatController.create);

routes.get("/establishments", EstablishmentController.index);
routes.get("/establishments/:id", EstablishmentController.indexById);
routes.put("/easyjob/:id", EstablishmentController.update);

routes.get("/freelancers", FreelancerController.index);
routes.put("/freelancers/:id", FreelancerController.update);
routes.delete("/freelancers/:id", FreelancerController.delete);
routes.get("/freelancers/:id", FreelancerController.indexById);

routes.post("/announcement", AnnouncementController.store);
routes.get("/announcements", AnnouncementController.index);
routes.get("/announcements/:id", AnnouncementController.indexById);
routes.put("/announcements/:id", AnnouncementController.update);
routes.get("/announcements/search/:id", AnnouncementController.findAnnouncemetFromFreelancer);
routes.delete("/announcements/:id", AnnouncementController.delete);

routes.post("/jobs", JobController.store);
routes.get("/jobs", JobController.index);

routes.post("/initialjob", InitialJobController.store);
routes.get("/initialjob", InitialJobController.index);
routes.get("/initialjob/:id_hash", InitialJobController.indexById);

routes.post("/files", upload.single("file"), FileController.store);

export default routes;
