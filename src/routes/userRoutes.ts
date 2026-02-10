import { Router } from "express";
import type { Request, Response } from "express";

const router = Router();

const users: { id: number; nom: string; prenom: string }[] = [
  { id: 1, nom: "Dupont", prenom: "Alice" },
  { id: 2, nom: "Martin", prenom: "Bob" },
];

router.get("/", (req: Request, res: Response) => {
  res.json(users);
});

export default router;
