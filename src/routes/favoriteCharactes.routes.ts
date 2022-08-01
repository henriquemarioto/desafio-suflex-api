import Router from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import FavoriteCharacterController from "../controllers/FavoriteCharacter.controller";
import verifyCharacterAlreadyExistsMiddleware from "../middlewares/favoriteCharacter/verifyCharacterAlreadyExists";
import FavoriteCharacterValition from "../validations/favoriteCharacter";

const favoriteCharacterRouter = Router();

favoriteCharacterRouter.post("", expressYupMiddleware({schemaValidator: FavoriteCharacterValition.createSchema}), verifyCharacterAlreadyExistsMiddleware, FavoriteCharacterController.create);

favoriteCharacterRouter.get("", FavoriteCharacterController.list);

favoriteCharacterRouter.get("/:id", FavoriteCharacterController.retrieve);

favoriteCharacterRouter.patch("/:id", expressYupMiddleware({schemaValidator: FavoriteCharacterValition.updateSchema}), FavoriteCharacterController.update);

favoriteCharacterRouter.delete("/:id", FavoriteCharacterController.delete);

export default favoriteCharacterRouter;
