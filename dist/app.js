import express from "express";
import userRoutes from "./routes/userRoutes.js";
const app = express();
const PORT = 3000;
app.get("/", (req, res) => {
    res.send("Bienvenue sur mon serveur API");
});
const etudiants = [
    { id: 1, nom: "Martin1", prenom: "Jean1" },
    { id: 2, nom: "Martin2", prenom: "Jean2" },
    { id: 3, nom: "Martin3", prenom: "Jean3" },
];
app.get("/api/data", (req, res) => {
    res.json(etudiants);
});
app.get("/api/hello/:name", (req, res) => {
    const { name } = req.params;
    res.json({ message: `Bonjour ${name}`,
        timestamp: new Date().toISOString(),
    });
});
app.use("/api/users", userRoutes);
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map