import { Router } from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import SessionController from "../controllers/Session.controller";
import SessionValition from "../validations/session";

const sessionRouter = Router();

sessionRouter.post("/login", expressYupMiddleware({schemaValidator: SessionValition.loginSchema}), SessionController.login);

export default sessionRouter;
