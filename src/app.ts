import "express-async-errors";
import "dotenv/config";
import express from "express";
import errorHandlingMiddleware from "./middlewares/errorHandling.middleware";
import routes from "./routes";

import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";

const app = express();

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(routes);
app.use(errorHandlingMiddleware);

export default app;
