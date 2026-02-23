import { Router } from "express";
import type { Request, Response } from "express";
import * as userController from "../controllers/userController.js";

const router = Router();

/**
* @swagger
* /api/users:
*  get:
*    summary: Récupère la liste des utilisateurs
*    tags: [Users]
*    responses:
*      200:
*        description: Succès
*/
router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.delete("/:id", userController.deleteUser);

export default router;
