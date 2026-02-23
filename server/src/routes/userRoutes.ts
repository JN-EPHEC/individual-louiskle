import { Router } from "express";
import type { Request, Response } from "express";
import * as userController from "../controllers/userController.js";

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Récupère la liste des utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Succès
 */
router.get("/", userController.getAllUsers);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 */
router.post("/", userController.createUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Supprime un utilisateur par ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 */
router.delete("/:id", userController.deleteUser);

export default router;