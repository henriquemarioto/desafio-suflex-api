import Router from "express";
import favoriteCharacterRouter from "./favoriteCharactes.routes";
import sessionRouter from "./session.routes";
import userRouter from "./user.routes";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/session", sessionRouter);
routes.use("/favoritecharacter", favoriteCharacterRouter);

export default routes;
