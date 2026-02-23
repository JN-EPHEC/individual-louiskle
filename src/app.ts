import express from "express";
import type { Request, Response } from "express";
import userRoutes from "./routes/userRoutes.js";
import sequelize from "./config/database.js";
import Userfgdf from "./models/User.js";
import { requestLogger } from './middlewares/logger.js'

const app = express();
const PORT = 3000;

app.use(requestLogger);
app.use(express.json());

app.use(express.static("public"));

app.use("/api/users", userRoutes);

sequelize.sync().then(() => {
  console.log("La base de données a été synchronisée");

  app.listen(PORT, async () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
  });
})



