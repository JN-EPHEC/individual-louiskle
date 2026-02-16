import express from "express";
import type { Request, Response } from "express";
import userRoutes from "./routes/userRoutes.js";
import sequelize from "./config/database.js";
import Userfgdf from "./models/User.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static("public"));

/*
app.get("/", (req: Request, res: Response) => {
  res.send("Bienvenue sur mon serveur API");
});
*/

app.use("/api/users", userRoutes);

sequelize.sync().then(() => {
  console.log("La base de données a été synchronisée");

  Userfgdf.create({ nom: "Dupont", prenom: "Alice"}).then(() => {
    console.log("Utilisateur créé");
  });

  app.listen(PORT, async () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
  });
})



