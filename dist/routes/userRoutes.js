import { Router } from "express";
const router = Router();
const users = [
    { id: 1, nom: "Dupont", prenom: "Alice" },
    { id: 2, nom: "Martin", prenom: "Bob" },
];
router.get("/", (req, res) => {
    res.json(users);
});
export default router;
//# sourceMappingURL=userRoutes.js.map