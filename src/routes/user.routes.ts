import Router from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import UserController from "../controllers/User.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureUserIdExistsMiddleware from "../middlewares/user/ensureUserExists.middleware";
import verifyNameAlreadyExistsMiddleware from "../middlewares/user/verifyUserAlreadyExists.middleware";
import UserValidations from "../validations/user";
import validUuidParamsSchema from "../validations/validUuidParams.validation";

const userRouter = Router();

userRouter.post(
  "",
  expressYupMiddleware({
    schemaValidator: UserValidations.creteUserSchema,
  }),
  verifyNameAlreadyExistsMiddleware,
  UserController.create
);

userRouter.get("", UserController.list);

userRouter.get("/me", ensureAuthMiddleware, UserController.retrieveSelf);

userRouter.get(
  "/:id",
  expressYupMiddleware({ schemaValidator: validUuidParamsSchema }),
  ensureUserIdExistsMiddleware,
  UserController.retrieve
);

userRouter.patch(
  "/me",
  ensureAuthMiddleware,
  expressYupMiddleware({
    schemaValidator: UserValidations.updateUserSchema,
  }),
  ensureUserIdExistsMiddleware,
  verifyNameAlreadyExistsMiddleware,
  UserController.update
);

userRouter.delete(
  "/me",
  ensureAuthMiddleware,
  expressYupMiddleware({ schemaValidator: validUuidParamsSchema }),
  ensureUserIdExistsMiddleware,
  UserController.delete
);

export default userRouter;
