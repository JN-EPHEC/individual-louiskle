import { Router } from "express";
import type { Request, Response } from "express";
import User from "../models/User.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { nom, prenom } = req.body;
  console.log("Received data:", { nom, prenom });
  try {
    const newUser = await User.create({ nom, prenom });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.destroy({ where: { id: userId } });
    if (deletedUser) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


export default router;
