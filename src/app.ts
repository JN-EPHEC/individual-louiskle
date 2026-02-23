import express from "express";
import userRoutes from "./routes/userRoutes.js";

import sequelize from "./config/database.js";

import { requestLogger } from './middlewares/logger.js'
import { errorHandler } from './middlewares/errorHandler.js'

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";


const app = express();
const PORT = 3000;

app.use(requestLogger);
app.use(errorHandler)

app.use(express.json());

app.use(express.static("public"));

app.use("/api/users", userRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

sequelize.sync().then(() => {
  console.log("La base de données a été synchronisée");

  app.listen(PORT, async () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
  });
})



