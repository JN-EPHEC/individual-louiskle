
import type { Request, Response } from "express";
import User from "../models/User.js";

export const getAllUsers = async (req: Request, res: Response) => {
    const users = await User.findAll();
    res.status(200).json(users);
}

export const createUser = async (req: Request, res: Response) => {
    const { nom, prenom } = req.body;
    console.log("Received data:", { nom, prenom });
    const newUser = await User.create({ nom, prenom });
    res.status(201).json(newUser);
}

export const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const deletedUser = await User.destroy({ where: { id: userId } });
    if (deletedUser) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
}