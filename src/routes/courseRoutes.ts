import { Router } from "express";
import type { Request, Response } from "express";
import Course from "../models/Course.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { titre, description } = req.body;
  console.log("Received data:", { titre, description });
  try {
    const newCourse = await Course.create({ titre, description });
    res.status(201).json(newCourse);
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const courseId = req.params.id;
  try {
    const deletedCourse = await Course.destroy({ where: { id: courseId } });
    if (deletedCourse) {
      res.status(200).json({ message: "Course deleted successfully" });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


export default router;
