import express from "express";
import type { Request, Response } from "express";
import userRoutes from "./routes/userRoutes.js";
import sequelize from "./config/database.js";
import Userfgdf from "./models/User.js";

const app = express();
const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Bienvenue sur mon serveur API");
});

const etudiants: { id: number; nom: string; prenom: string }[] = [
  { id: 1, nom: "Martin1", prenom: "Jean1" },
  { id: 2, nom: "Martin2", prenom: "Jean2" },
  { id: 3, nom: "Martin3", prenom: "Jean3" },
];

app.get("/api/data", (req: Request, res: Response) => {
  res.json(etudiants);
});

app.get("/api/hello/:name",(req: Request<{ name: string }>, res: Response) => {
    const { name } = req.params;
    res.json({message: `Bonjour ${name}`,
      timestamp: new Date().toISOString(),
    });
  }
);

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



