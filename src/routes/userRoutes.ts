import { Router } from "express";
import type { Request, Response } from "express";
import * as userController from "../controllers/userController.js";

const router = Router();

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.delete("/:id", userController.deleteUser);

export default router;
